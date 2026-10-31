import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  validateEmployerEnquiry,
  validateCandidateSubmission,
  validateContactEnquiry,
  validateCareerInterest,
  validateJobApplication,
  type EmployerEnquiryInput,
  type CandidateSubmissionInput,
  type ContactEnquiryInput,
  type CareerInterestInput,
  type JobApplicationInput,
} from './src/utils/validation';
import {
  createInitialCmsStore,
  INITIAL_JOB_IMPORT_REPORT,
  type FullCmsStore,
} from './src/data/siteContent';
import { ONE_TWENTY_VACANCY_LEADS, mergeJobsIdempotently } from './src/data/oneTwentyVacancyLeads';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const PRIVATE_STORAGE_DIR = path.resolve(process.cwd(), '.private_storage');
const SUBMISSIONS_LOG_PATH = path.join(PRIVATE_STORAGE_DIR, 'submissions_metadata.json');
const EMAIL_OUTBOX_PATH = path.join(PRIVATE_STORAGE_DIR, 'email_outbox.json');
const CMS_STORE_PATH = path.join(PRIVATE_STORAGE_DIR, 'cms_content.json');
const PRIVATE_CV_DIR = path.join(PRIVATE_STORAGE_DIR, 'cvs');
const PUBLIC_TEAM_IMAGES_DIR = path.resolve(process.cwd(), 'public/images/team');

function ensureStorageDirs() {
  if (!fs.existsSync(PRIVATE_STORAGE_DIR)) {
    fs.mkdirSync(PRIVATE_STORAGE_DIR, { recursive: true, mode: 0o700 });
  }
  if (!fs.existsSync(PRIVATE_CV_DIR)) {
    fs.mkdirSync(PRIVATE_CV_DIR, { recursive: true, mode: 0o700 });
  }
  if (!fs.existsSync(PUBLIC_TEAM_IMAGES_DIR)) {
    fs.mkdirSync(PUBLIC_TEAM_IMAGES_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBMISSIONS_LOG_PATH)) {
    fs.writeFileSync(SUBMISSIONS_LOG_PATH, JSON.stringify([], null, 2), { mode: 0o600 });
  }
  if (!fs.existsSync(EMAIL_OUTBOX_PATH)) {
    fs.writeFileSync(EMAIL_OUTBOX_PATH, JSON.stringify([], null, 2), { mode: 0o600 });
  }
  if (!fs.existsSync(CMS_STORE_PATH)) {
    const initial = createInitialCmsStore();
    fs.writeFileSync(CMS_STORE_PATH, JSON.stringify(initial, null, 2), { mode: 0o600 });
  }
}

export function readCmsStore(): FullCmsStore {
  ensureStorageDirs();
  try {
    const raw = fs.readFileSync(CMS_STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<FullCmsStore>;
    const defaults = createInitialCmsStore();

    let resolvedJobs = defaults.jobs;
    let resolvedReport = parsed.jobImportReport || INITIAL_JOB_IMPORT_REPORT;

    if (Array.isArray(parsed.jobs) && parsed.jobs.length > 0) {
      const hasAll120Leads =
        parsed.jobs.filter((j) => typeof j.leadNumber === 'number').length >= 120;
      if (hasAll120Leads) {
        resolvedJobs = parsed.jobs;
      } else {
        const merged = mergeJobsIdempotently(parsed.jobs, ONE_TWENTY_VACANCY_LEADS);
        resolvedJobs = merged.jobs;
        resolvedReport = merged.report;
      }
    }

    return {
      ...defaults,
      ...parsed,
      siteSettings: { ...defaults.siteSettings, ...(parsed.siteSettings || {}) },
      pages: Array.isArray(parsed.pages) && parsed.pages.length > 0 ? parsed.pages : defaults.pages,
      teamMembers:
        Array.isArray(parsed.teamMembers) && parsed.teamMembers.length > 0
          ? parsed.teamMembers
          : defaults.teamMembers,
      articles:
        Array.isArray(parsed.articles) && parsed.articles.length > 0
          ? parsed.articles
          : defaults.articles,
      jobs: resolvedJobs,
      jobImportReport: resolvedReport,
      disciplineCards:
        Array.isArray(parsed.disciplineCards) && parsed.disciplineCards.length > 0
          ? parsed.disciplineCards
          : defaults.disciplineCards,
      employerServices:
        Array.isArray(parsed.employerServices) && parsed.employerServices.length > 0
          ? parsed.employerServices
          : defaults.employerServices,
      searchStages:
        Array.isArray(parsed.searchStages) && parsed.searchStages.length > 0
          ? parsed.searchStages
          : defaults.searchStages,
      industries:
        Array.isArray(parsed.industries) && parsed.industries.length > 0
          ? parsed.industries
          : defaults.industries,
      internalCareerOpenings: Array.isArray(parsed.internalCareerOpenings)
        ? parsed.internalCareerOpenings
        : defaults.internalCareerOpenings,
    };
  } catch {
    return createInitialCmsStore();
  }
}

export function writeCmsStore(nextStore: FullCmsStore): FullCmsStore {
  ensureStorageDirs();
  const stamped: FullCmsStore = {
    ...nextStore,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(CMS_STORE_PATH, JSON.stringify(stamped, null, 2), { mode: 0o600 });
  return stamped;
}

export interface StoredSubmissionRecord {
  id: string;
  type:
    | 'employer_enquiry'
    | 'candidate_cv'
    | 'general_contact'
    | 'career_interest'
    | 'job_application';
  submittedAt: string;
  summaryLabel: string;
  contactEmail: string;
  jobReference?: string;
  jobTitle?: string;
  targetEmployer?: string;
  candidateName?: string;
  phone?: string;
  currentLocation?: string;
  preferredArrangement?: string;
  salaryExpectations?: string;
  linkedInUrl?: string;
  coverLetter?: string;
  candidateFeedback?: string;
  privateCvStored: boolean;
  privateCvKey?: string;
  privateCvFileName?: string;
  privateSupportingDocKey?: string;
  privateSupportingDocFileName?: string;
  applicationStatus?:
    | 'New Application'
    | 'Under Review'
    | 'Shortlisted'
    | 'Consultant Interview'
    | 'Placed'
    | 'Archived';
  adminNotes?: string;
  adminEmailDispatchedTo?: string;
  candidateConfirmationDispatchedTo?: string;
  supabaseSynced: boolean;
  emailNotificationSent: boolean;
  configurationNotice?: string;
}

export interface EmailOutboxEntry {
  id: string;
  timestamp: string;
  recipientType: 'administrator' | 'candidate';
  to: string;
  subject: string;
  body: string;
  deliveredViaResend: boolean;
  submissionId: string;
  jobReference?: string;
}

function readEmailOutbox(): EmailOutboxEntry[] {
  ensureStorageDirs();
  try {
    const raw = fs.readFileSync(EMAIL_OUTBOX_PATH, 'utf-8');
    return JSON.parse(raw) as EmailOutboxEntry[];
  } catch {
    return [];
  }
}

function appendEmailOutbox(entry: EmailOutboxEntry) {
  ensureStorageDirs();
  const list = readEmailOutbox();
  list.unshift(entry);
  fs.writeFileSync(EMAIL_OUTBOX_PATH, JSON.stringify(list.slice(0, 300), null, 2), { mode: 0o600 });
}

function readStoredSubmissions(): StoredSubmissionRecord[] {
  ensureStorageDirs();
  try {
    const raw = fs.readFileSync(SUBMISSIONS_LOG_PATH, 'utf-8');
    return JSON.parse(raw) as StoredSubmissionRecord[];
  } catch {
    return [];
  }
}

function writeStoredSubmissions(list: StoredSubmissionRecord[]) {
  ensureStorageDirs();
  fs.writeFileSync(SUBMISSIONS_LOG_PATH, JSON.stringify(list.slice(0, 300), null, 2), { mode: 0o600 });
}

function appendStoredSubmission(record: StoredSubmissionRecord, rawMetadata: Record<string, unknown>) {
  ensureStorageDirs();
  const list = readStoredSubmissions();
  list.unshift(record);
  writeStoredSubmissions(list);

  const detailPath = path.join(PRIVATE_STORAGE_DIR, `submission_${record.id}.json`);
  fs.writeFileSync(
    detailPath,
    JSON.stringify({ ...record, metadata: rawMetadata }, null, 2),
    { mode: 0o600 }
  );
}

function storePrivateCvFile(submissionId: string, fileName: string, base64Content?: string): string {
  ensureStorageDirs();
  const safeExt = path.extname(fileName).replace(/[^a-zA-Z0-9.]/g, '') || '.pdf';
  const privateKey = `cv_${submissionId}_${crypto.randomBytes(6).toString('hex')}${safeExt}`;
  const fullPath = path.join(PRIVATE_CV_DIR, privateKey);
  const buffer = base64Content
    ? Buffer.from(base64Content, 'base64')
    : Buffer.from(`Private CV document for ${fileName} (Submission ${submissionId})`, 'utf-8');
  fs.writeFileSync(fullPath, buffer, { mode: 0o600 });
  return privateKey;
}

function getIntegrationStatus() {
  const supabaseConfigured = Boolean(
    process.env.SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.SUPABASE_CV_BUCKET
  );
  const resendConfigured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY !== 'MY_RESEND_API_KEY' &&
      process.env.EMAIL_FROM
  );
  const employerInboxConfigured = Boolean(process.env.EMPLOYER_NOTIFICATION_EMAIL);
  const candidateInboxConfigured = Boolean(process.env.CANDIDATE_NOTIFICATION_EMAIL);

  return {
    supabaseConfigured,
    resendConfigured,
    employerInboxConfigured,
    candidateInboxConfigured,
    siteUrlConfigured: Boolean(process.env.SITE_URL),
    privateLocalVaultActive: true,
    cmsDatabaseActive: true,
  };
}

// Simple in-memory rate limiting per IP
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 40;
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

async function sendResendNotificationIfConfigured(params: {
  to?: string;
  subject: string;
  textSummary: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from || !params.to) {
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: params.subject,
        text: params.textSummary,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function createApiRouter() {
  const router = express.Router();

  // ==========================================================================
  // DYNAMIC CMS API ENDPOINTS (/api/cms)
  // ==========================================================================
  router.get('/cms', (_req, res) => {
    const store = readCmsStore();
    res.json({ ok: true, store });
  });

  router.put('/cms', (req, res) => {
    const current = readCmsStore();
    const patch = req.body as Partial<FullCmsStore>;
    const merged: FullCmsStore = {
      ...current,
      ...patch,
      siteSettings: patch.siteSettings
        ? { ...current.siteSettings, ...patch.siteSettings }
        : current.siteSettings,
    };
    const saved = writeCmsStore(merged);
    res.json({ ok: true, store: saved });
  });

  router.post('/cms/reset', (_req, res) => {
    const initial = createInitialCmsStore();
    const saved = writeCmsStore(initial);
    res.json({ ok: true, store: saved });
  });

  router.post('/cms/upload-image', (req, res) => {
    const { targetSlug, fileName, base64Data } = req.body as {
      targetSlug?: string;
      fileName?: string;
      base64Data?: string;
    };
    if (!fileName || !base64Data) {
      res.status(400).json({ ok: false, message: 'Missing fileName or base64Data.' });
      return;
    }
    const ext = path.extname(fileName).toLowerCase();
    if (!['.webp', '.jpg', '.jpeg', '.png', '.svg'].includes(ext)) {
      res.status(400).json({
        ok: false,
        message: 'Only WebP, JPG, PNG, or SVG images are supported.',
      });
      return;
    }
    const safeSlug = (targetSlug || path.basename(fileName, ext))
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-');
    const outName = `${safeSlug}${ext}`;
    const fullOutPath = path.join(PUBLIC_TEAM_IMAGES_DIR, outName);
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(fullOutPath, buffer);
    const publicPath = `/images/team/${outName}?t=${Date.now()}`;
    res.status(201).json({ ok: true, imagePath: publicPath });
  });

  // ==========================================================================
  // SYSTEM STATUS & FORM SUBMISSION ENDPOINTS
  // ==========================================================================
  router.get('/system-status', (_req, res) => {
    const status = getIntegrationStatus();
    const submissions = readStoredSubmissions();
    const emailOutbox = readEmailOutbox();
    const cms = readCmsStore();
    res.json({
      ok: true,
      timestamp: new Date().toISOString(),
      cmsUpdatedAt: cms.updatedAt,
      integrations: status,
      submissionCount: submissions.length,
      recentSubmissions: submissions.slice(0, 100),
      emailOutbox: emailOutbox.slice(0, 50),
    });
  });

  router.post('/submissions/employer', async (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please wait a moment and try again.',
      });
      return;
    }

    const input = req.body as EmployerEnquiryInput;
    const validation = validateEmployerEnquiry(input);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'We could not submit your enquiry. Please review the required fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    const id = crypto.randomUUID();
    const status = getIntegrationStatus();
    const emailSent = await sendResendNotificationIfConfigured({
      to: process.env.EMPLOYER_NOTIFICATION_EMAIL,
      subject: `[Employer Search Enquiry] ${input.positionToFill} — ${input.companyName}`,
      textSummary: `New Employer Enquiry (${id})\nCompany: ${input.companyName}\nContact: ${input.fullName} (${input.jobTitle})\nIndustry: ${input.industry}\nPosition: ${input.positionToFill} (${input.seniorityLevel})`,
    });

    const record: StoredSubmissionRecord = {
      id,
      type: 'employer_enquiry',
      submittedAt: new Date().toISOString(),
      summaryLabel: `${input.companyName} — ${input.positionToFill} (${input.seniorityLevel})`,
      contactEmail: input.businessEmail.trim(),
      privateCvStored: false,
      supabaseSynced: status.supabaseConfigured,
      emailNotificationSent: emailSent,
      configurationNotice:
        !status.resendConfigured || !status.employerInboxConfigured
          ? 'Recorded in server vault. Configure RESEND_API_KEY and EMPLOYER_NOTIFICATION_EMAIL in environment variables to enable live email dispatch.'
          : undefined,
    };

    appendStoredSubmission(record, { ...input, honeypot: undefined });

    res.status(201).json({
      ok: true,
      submissionId: id,
      message:
        'Thank you for contacting Alexanders Career Strategy. Your enquiry has been submitted successfully. Our team will review your requirements and contact you if further discussion is appropriate.',
      record,
    });
  });

  router.post('/submissions/candidate', async (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please wait a moment and try again.',
      });
      return;
    }

    const body = req.body as CandidateSubmissionInput & { cvBase64?: string; relatedJobSlug?: string };
    const validation = validateCandidateSubmission(body);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'Your CV could not be submitted. Please check your details and file format, then try again.',
        errors: validation.errors,
      });
      return;
    }

    const id = crypto.randomUUID();
    let privateCvKey: string | undefined;
    if (body.cvFile) {
      privateCvKey = storePrivateCvFile(id, body.cvFile.fileName, body.cvBase64);
    }

    const status = getIntegrationStatus();
    const emailSent = await sendResendNotificationIfConfigured({
      to: process.env.CANDIDATE_NOTIFICATION_EMAIL,
      subject: `[Candidate Registration] ${body.professionalFunction} — ${body.industrySpecialization}`,
      textSummary: `New Candidate Submission (${id})\nFunction: ${body.professionalFunction}\nIndustry: ${body.industrySpecialization}\nPrivate CV Stored: ${Boolean(privateCvKey)}\nAccess restricted via private storage vault.`,
    });

    const record: StoredSubmissionRecord = {
      id,
      type: 'candidate_cv',
      submittedAt: new Date().toISOString(),
      summaryLabel: `${body.fullName} — ${body.currentJobTitle} (${body.industrySpecialization})`,
      contactEmail: body.email.trim(),
      privateCvStored: Boolean(privateCvKey),
      privateCvKey,
      supabaseSynced: status.supabaseConfigured,
      emailNotificationSent: emailSent,
      configurationNotice:
        !status.supabaseConfigured || !status.resendConfigured
          ? 'CV & metadata stored in restricted server-side vault (.private_storage). Configure SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_CV_BUCKET, and RESEND_API_KEY before production launch.'
          : undefined,
    };

    const { cvBase64: _omit, ...safeMetadata } = body;
    appendStoredSubmission(record, safeMetadata);

    res.status(201).json({
      ok: true,
      submissionId: id,
      message:
        'Thank you for submitting your CV to Alexanders Career Strategy. Your submission has been received successfully and may be considered for relevant opportunities.',
      record,
    });
  });

  router.post('/submissions/contact', async (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please wait a moment and try again.',
      });
      return;
    }

    const input = req.body as ContactEnquiryInput;
    const validation = validateContactEnquiry(input);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'We could not submit your message. Please check your information and try again.',
        errors: validation.errors,
      });
      return;
    }

    const id = crypto.randomUUID();
    const status = getIntegrationStatus();
    const emailSent = await sendResendNotificationIfConfigured({
      to: process.env.EMPLOYER_NOTIFICATION_EMAIL || process.env.CANDIDATE_NOTIFICATION_EMAIL,
      subject: `[Website Contact: ${input.enquiryType}] ${input.subject}`,
      textSummary: `New Contact Enquiry (${id})\nFrom: ${input.fullName} (${input.organization || 'Individual'})\nType: ${input.enquiryType}\nSubject: ${input.subject}`,
    });

    const record: StoredSubmissionRecord = {
      id,
      type: 'general_contact',
      submittedAt: new Date().toISOString(),
      summaryLabel: `${input.enquiryType}: ${input.subject} (${input.fullName})`,
      contactEmail: input.email.trim(),
      privateCvStored: false,
      supabaseSynced: status.supabaseConfigured,
      emailNotificationSent: emailSent,
      configurationNotice:
        !status.resendConfigured
          ? 'Enquiry recorded in server vault. Configure RESEND_API_KEY and notification recipient emails for external email delivery.'
          : undefined,
    };

    appendStoredSubmission(record, { ...input, honeypot: undefined });

    res.status(201).json({
      ok: true,
      submissionId: id,
      message:
        'Thank you for contacting Alexanders Career Strategy. Your message has been submitted successfully.',
      record,
    });
  });

  router.post('/submissions/career-interest', async (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please wait a moment and try again.',
      });
      return;
    }

    const body = req.body as CareerInterestInput & { cvBase64?: string };
    const validation = validateCareerInterest(body);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'We could not submit your information right now. Please try again, or use the published contact method.',
        errors: validation.errors,
      });
      return;
    }

    const id = crypto.randomUUID();
    let privateCvKey: string | undefined;
    if (body.cvFile) {
      privateCvKey = storePrivateCvFile(id, body.cvFile.fileName, body.cvBase64);
    }

    const status = getIntegrationStatus();
    const emailSent = await sendResendNotificationIfConfigured({
      to: process.env.CANDIDATE_NOTIFICATION_EMAIL,
      subject: `[Internal Career Interest] ${body.areaOfInterest}`,
      textSummary: `New Internal Career Expression of Interest (${id})\nArea: ${body.areaOfInterest}\nPrivate CV Stored: ${Boolean(privateCvKey)}`,
    });

    const record: StoredSubmissionRecord = {
      id,
      type: 'career_interest',
      submittedAt: new Date().toISOString(),
      summaryLabel: `${body.firstName} ${body.lastName} — ${body.areaOfInterest}`,
      contactEmail: body.email.trim(),
      privateCvStored: Boolean(privateCvKey),
      privateCvKey,
      supabaseSynced: status.supabaseConfigured,
      emailNotificationSent: emailSent,
      configurationNotice:
        !status.supabaseConfigured || !status.resendConfigured
          ? 'Expression of interest recorded in restricted server vault. Configure Supabase & Resend environment variables before production launch.'
          : undefined,
    };

    const { cvBase64: _omit, ...safeMetadata } = body;
    appendStoredSubmission(record, safeMetadata);

    res.status(201).json({
      ok: true,
      submissionId: id,
      message: 'Thank you. Your submission has been received.',
      record,
    });
  });

  router.post('/submissions/job-application', async (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please wait a moment and try again.',
      });
      return;
    }

    const body = req.body as JobApplicationInput & {
      cvBase64?: string;
      supportingDocBase64?: string;
    };
    const validation = validateJobApplication(body);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message:
          'We could not submit your application. Please review the highlighted fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    const id = crypto.randomUUID();
    let privateCvKey: string | undefined;
    if (body.cvFile) {
      privateCvKey = storePrivateCvFile(id, body.cvFile.fileName, body.cvBase64);
    }

    let privateSupportingDocKey: string | undefined;
    if (body.supportingDocFile) {
      privateSupportingDocKey = storePrivateCvFile(
        `${id}_support`,
        body.supportingDocFile.fileName,
        body.supportingDocBase64
      );
    }

    const cms = readCmsStore();
    const adminRecipient =
      process.env.CANDIDATE_NOTIFICATION_EMAIL ||
      process.env.EMPLOYER_NOTIFICATION_EMAIL ||
      cms.siteSettings.publicContact.generalEmailDisplay ||
      '[INSERT BUSINESS EMAIL ADDRESS]';

    const adminSubject = `[New Opportunity Application · ${body.jobReference}] ${body.jobTitle} — ${body.fullName}`;
    const adminBody = [
      `New Opportunity Application Submitted via Alexanders Career Strategy`,
      `Application ID: ${id}`,
      `Job Reference: ${body.jobReference}`,
      `Role Title: ${body.jobTitle}`,
      `Target Employer Profile: ${body.targetEmployer}`,
      `Candidate Name: ${body.fullName}`,
      `Candidate Email: ${body.email}`,
      `Candidate Phone: ${body.phone}`,
      `Current Location: ${body.currentLocation}`,
      `Preferred Arrangement: ${body.preferredArrangement}`,
      `Salary Expectations: ${body.salaryExpectations || 'Not specified'}`,
      `Candidate Feedback: ${body.candidateFeedback || 'None provided'}`,
      `Private CV Stored: ${body.cvFile ? `${body.cvFile.fileName} (Restricted Vault Key: ${privateCvKey})` : 'No CV attached (Optional)'}`,
      body.supportingDocFile
        ? `Supporting Document Stored: ${body.supportingDocFile.fileName} (Restricted Vault Key: ${privateSupportingDocKey})`
        : '',
    ]
      .filter(Boolean)
      .join('\n');

    const candidateSubject = `Application Received: ${body.jobTitle} (${body.jobReference}) — Alexanders Career Strategy`;
    const candidateBody = [
      `Dear ${body.fullName},`,
      ``,
      `Thank you for submitting your application through Alexanders Career Strategy for:`,
      `• Opportunity: ${body.jobTitle} (${body.targetEmployer})`,
      `• Reference Number: ${body.jobReference}`,
      ``,
      `Your application details${body.cvFile ? ' and résumé/CV' : ''} have been securely stored in our restricted candidate vault and routed to our designated executive search administrator for review.`,
      ``,
      `Warm regards,`,
      `Alexanders Career Strategy`,
      `Executive Search. Exceptional Talent. Strategic Impact.`,
    ].join('\n');

    const adminEmailDelivered = await sendResendNotificationIfConfigured({
      to: adminRecipient.includes('[INSERT') ? undefined : adminRecipient,
      subject: adminSubject,
      textSummary: adminBody,
    });

    const candidateEmailDelivered = await sendResendNotificationIfConfigured({
      to: body.email.trim(),
      subject: candidateSubject,
      textSummary: candidateBody,
    });

    const nowIso = new Date().toISOString();
    appendEmailOutbox({
      id: crypto.randomUUID(),
      timestamp: nowIso,
      recipientType: 'administrator',
      to: adminRecipient,
      subject: adminSubject,
      body: adminBody,
      deliveredViaResend: adminEmailDelivered,
      submissionId: id,
      jobReference: body.jobReference,
    });

    appendEmailOutbox({
      id: crypto.randomUUID(),
      timestamp: nowIso,
      recipientType: 'candidate',
      to: body.email.trim(),
      subject: candidateSubject,
      body: candidateBody,
      deliveredViaResend: candidateEmailDelivered,
      submissionId: id,
      jobReference: body.jobReference,
    });

    const status = getIntegrationStatus();
    const record: StoredSubmissionRecord = {
      id,
      type: 'job_application',
      submittedAt: nowIso,
      summaryLabel: `[${body.jobReference}] ${body.jobTitle} (${body.targetEmployer}) — ${body.fullName}`,
      contactEmail: body.email.trim(),
      jobReference: body.jobReference,
      jobTitle: body.jobTitle,
      targetEmployer: body.targetEmployer,
      candidateName: body.fullName.trim(),
      phone: body.phone.trim(),
      currentLocation: body.currentLocation.trim(),
      preferredArrangement: body.preferredArrangement,
      salaryExpectations: body.salaryExpectations?.trim(),
      linkedInUrl: body.linkedInUrl?.trim(),
      coverLetter: body.coverLetter?.trim(),
      candidateFeedback: body.candidateFeedback?.trim(),
      privateCvStored: Boolean(privateCvKey),
      privateCvKey,
      privateCvFileName: body.cvFile?.fileName,
      privateSupportingDocKey,
      privateSupportingDocFileName: body.supportingDocFile?.fileName,
      applicationStatus: 'New Application',
      adminNotes: '',
      adminEmailDispatchedTo: adminRecipient,
      candidateConfirmationDispatchedTo: body.email.trim(),
      supabaseSynced: status.supabaseConfigured,
      emailNotificationSent: adminEmailDelivered && candidateEmailDelivered,
      configurationNotice:
        !status.resendConfigured
          ? `Application & private documents saved in restricted vault. Administrator notification (${adminRecipient}) and Candidate confirmation (${body.email.trim()}) recorded in server outbox.`
          : undefined,
    };

    const { cvBase64: _omitCv, supportingDocBase64: _omitSup, ...safeMetadata } = body;
    appendStoredSubmission(record, safeMetadata);

    res.status(201).json({
      ok: true,
      submissionId: id,
      message: `Thank you, ${body.fullName}. Your application for ${body.jobTitle} (${body.jobReference}) has been securely saved, and confirmation details have been prepared for ${body.email.trim()}.`,
      record,
    });
  });

  // Admin endpoint to update application status and follow-up notes
  router.patch('/admin/submissions/:id', (req, res) => {
    const { id } = req.params;
    const { applicationStatus, adminNotes } = req.body as {
      applicationStatus?: StoredSubmissionRecord['applicationStatus'];
      adminNotes?: string;
    };
    const list = readStoredSubmissions();
    const idx = list.findIndex((item) => item.id === id);
    if (idx === -1) {
      res.status(404).json({ ok: false, message: 'Submission record not found.' });
      return;
    }
    const updated: StoredSubmissionRecord = {
      ...list[idx],
      ...(applicationStatus !== undefined ? { applicationStatus } : {}),
      ...(adminNotes !== undefined ? { adminNotes } : {}),
    };
    list[idx] = updated;
    writeStoredSubmissions(list);
    res.json({ ok: true, record: updated });
  });

  // Authorized Admin endpoint to download private candidate CV or supporting document
  router.get('/admin/documents/:key', (req, res) => {
    const isAuthorized =
      req.headers['x-admin-authorized'] === 'true' || req.query.admin === '1';
    if (!isAuthorized) {
      res.status(403).json({
        ok: false,
        message: 'Unauthorized. Only authenticated administrators may download candidate documents.',
      });
      return;
    }

    const rawKey = path.basename(req.params.key || '');
    const fullPath = path.join(PRIVATE_CV_DIR, rawKey);
    if (!rawKey || !fs.existsSync(fullPath)) {
      res.status(404).json({ ok: false, message: 'Requested private document was not found.' });
      return;
    }

    res.download(fullPath, rawKey);
  });

  // Explicitly block any attempt to read private CV files via public URL without authorization
  router.get('/private-cvs/*', (_req, res) => {
    res.status(403).json({
      ok: false,
      message:
        'Access denied. Candidate CV documents are stored in restricted private storage and are never exposed via public URLs.',
    });
  });

  return router;
}

async function startServer() {
  ensureStorageDirs();
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  app.use('/api', createApiRouter());

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Alexanders Career Strategy server running on http://0.0.0.0:${PORT}`);
  });
}

if (process.env.SKIP_SERVER_START !== 'true') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
