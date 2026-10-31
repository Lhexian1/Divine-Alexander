export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface CvFileMetadata {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export const MAX_CV_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];
export const ALLOWED_CV_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const SUPERSEDED_EMAILS = new Set([
  'divinecareerstrategy@gmail.com',
  'piersfishersearch@gmail.com',
  'piersfisherexecutivesearch@gmail.com',
]);

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isValidOptionalUrl(url?: string): boolean {
  if (!url || !url.trim()) return true;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function validateCvFile(file?: CvFileMetadata | null): string | null {
  if (!file) return null;
  const lowerName = file.fileName.toLowerCase().trim();
  const hasAllowedExt = ALLOWED_CV_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  const hasAllowedMime = !file.mimeType || ALLOWED_CV_MIMES.includes(file.mimeType);

  if (!hasAllowedExt || !hasAllowedMime) {
    return 'Accepted file formats are PDF, DOC, or DOCX only.';
  }
  if (file.sizeBytes <= 0) {
    return 'The selected CV file appears to be empty.';
  }
  if (file.sizeBytes > MAX_CV_FILE_SIZE_BYTES) {
    return 'CV file size must not exceed 5 MB.';
  }
  return null;
}

export interface EmployerEnquiryInput {
  fullName: string;
  businessEmail: string;
  companyName: string;
  jobTitle: string;
  industry: string;
  positionToFill: string;
  seniorityLevel: string;
  employmentLocation?: string;
  numberOfPositions?: string;
  hiringTimeline?: string;
  preferredEngagementModel?: string;
  preferredContactMethod?: string;
  additionalInfo?: string;
  privacyAccepted: boolean;
  honeypot?: string;
}

export function validateEmployerEnquiry(input: EmployerEnquiryInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Spam check triggered.';
    return { valid: false, errors };
  }

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!isValidEmail(input.businessEmail)) {
    errors.businessEmail = 'Please enter a valid business email address.';
  }
  if (!input.companyName || input.companyName.trim().length < 2) {
    errors.companyName = 'Please enter your organization or company name.';
  }
  if (!input.jobTitle || input.jobTitle.trim().length < 2) {
    errors.jobTitle = 'Please enter your job title.';
  }
  if (!input.industry || input.industry.trim().length < 2) {
    errors.industry = 'Please select or enter your industry.';
  }
  if (!input.positionToFill || input.positionToFill.trim().length < 2) {
    errors.positionToFill = 'Please specify the position to be filled.';
  }
  if (!input.seniorityLevel || input.seniorityLevel.trim().length < 2) {
    errors.seniorityLevel = 'Please select the seniority level.';
  }
  if (!input.privacyAccepted) {
    errors.privacyAccepted = 'You must acknowledge the privacy notice before submitting.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface CandidateSubmissionInput {
  fullName: string;
  email: string;
  phone?: string;
  currentJobTitle: string;
  currentEmployer?: string;
  professionalFunction: string;
  industrySpecialization: string;
  yearsExperience?: string;
  targetPositions: string;
  preferredLocation: string;
  linkedInUrl?: string;
  careerInterests?: string;
  cvFile?: CvFileMetadata | null;
  privacyAccepted: boolean;
  futureOpportunitiesConsent?: boolean;
  honeypot?: string;
}

export function validateCandidateSubmission(input: CandidateSubmissionInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Spam check triggered.';
    return { valid: false, errors };
  }

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.currentJobTitle || input.currentJobTitle.trim().length < 2) {
    errors.currentJobTitle = 'Please enter your current or most recent job title.';
  }
  if (!input.professionalFunction || input.professionalFunction.trim().length < 2) {
    errors.professionalFunction = 'Please specify your primary professional function.';
  }
  if (!input.industrySpecialization || input.industrySpecialization.trim().length < 2) {
    errors.industrySpecialization = 'Please select or enter your industry specialization.';
  }
  if (!input.targetPositions || input.targetPositions.trim().length < 2) {
    errors.targetPositions = 'Please specify your target positions or preferred role.';
  }
  if (!input.preferredLocation || input.preferredLocation.trim().length < 2) {
    errors.preferredLocation = 'Please enter your preferred US location or remote preference.';
  }
  if (!isValidOptionalUrl(input.linkedInUrl)) {
    errors.linkedInUrl = 'Please enter a valid URL starting with https:// or http://.';
  }

  const cvError = validateCvFile(input.cvFile);
  if (cvError) {
    errors.cvFile = cvError;
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted = 'You must acknowledge the privacy notice and data handling terms.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ContactEnquiryInput {
  fullName: string;
  email: string;
  organization?: string;
  enquiryType: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
  honeypot?: string;
}

export function validateContactEnquiry(input: ContactEnquiryInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Spam check triggered.';
    return { valid: false, errors };
  }

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.enquiryType || input.enquiryType.trim().length < 2) {
    errors.enquiryType = 'Please select an enquiry type.';
  }
  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject = 'Please provide a clear subject line.';
  }
  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }
  if (!input.privacyAccepted) {
    errors.privacyAccepted = 'You must acknowledge the privacy notice before submitting.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface CareerInterestInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  currentJobTitle?: string;
  areaOfInterest: string;
  linkedInUrl?: string;
  introduction?: string;
  cvFile?: CvFileMetadata | null;
  privacyAccepted: boolean;
  honeypot?: string;
}

export function validateCareerInterest(input: CareerInterestInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Spam check triggered.';
    return { valid: false, errors };
  }

  if (!input.firstName || input.firstName.trim().length < 1) {
    errors.firstName = 'Please enter your first name.';
  }
  if (!input.lastName || input.lastName.trim().length < 1) {
    errors.lastName = 'Please enter your last name.';
  }
  if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.areaOfInterest || input.areaOfInterest.trim().length < 2) {
    errors.areaOfInterest = 'Please select an area of interest.';
  }
  if (!isValidOptionalUrl(input.linkedInUrl)) {
    errors.linkedInUrl = 'Please enter a valid LinkedIn URL starting with https://.';
  }

  const cvError = validateCvFile(input.cvFile);
  if (cvError) {
    errors.cvFile = cvError;
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted = 'You must acknowledge the privacy notice and consent terms.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface JobApplicationInput {
  jobReference: string;
  jobTitle: string;
  targetEmployer: string;
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  preferredArrangement: string;
  salaryExpectations?: string;
  linkedInUrl?: string;
  coverLetter?: string;
  candidateFeedback?: string;
  cvFile?: CvFileMetadata | null;
  supportingDocFile?: CvFileMetadata | null;
  privacyAccepted: boolean;
  honeypot?: string;
}

export function validateJobApplication(input: JobApplicationInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.form = 'Spam check triggered.';
    return { valid: false, errors };
  }

  if (!input.jobReference || input.jobReference.trim().length < 3) {
    errors.jobReference = 'Job reference number is required.';
  }
  if (!input.jobTitle || input.jobTitle.trim().length < 2) {
    errors.jobTitle = 'Role title is required.';
  }
  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.phone || input.phone.trim().length < 6) {
    errors.phone = 'Please enter a contact telephone number.';
  }
  if (!input.currentLocation || input.currentLocation.trim().length < 2) {
    errors.currentLocation = 'Please enter your current location.';
  }
  if (!input.preferredArrangement || input.preferredArrangement.trim().length < 2) {
    errors.preferredArrangement = 'Please select your preferred work arrangement.';
  }
  if (!isValidOptionalUrl(input.linkedInUrl)) {
    errors.linkedInUrl = 'Please enter a valid URL starting with https:// or http://.';
  }

  if (input.cvFile) {
    const cvErr = validateCvFile(input.cvFile);
    if (cvErr) {
      errors.cvFile = cvErr;
    }
  }

  if (input.supportingDocFile) {
    const supErr = validateCvFile(input.supportingDocFile);
    if (supErr) {
      errors.supportingDocFile = supErr;
    }
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted =
      'You must consent to Alexanders Career Strategy processing your application and candidate information.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export type JobLifecycleStatus =
  | 'draft'
  | 'verification_required'
  | 'active'
  | 'paused'
  | 'filled'
  | 'closed'
  | 'representative'
  | 'previously_identified'
  | 'expired'
  | 'unverified';

export type JobVerificationStatus =
  | 'draft'
  | 'verificationRequired'
  | 'verified'
  | 'archived';

export interface JobAuditEntry {
  timestamp: string;
  actor: string;
  action: string;
}

export interface JobImportReport {
  considered: number;
  inserted: number;
  updated: number;
  skipped: number;
  duplicates: number;
  importedAt: string;
}

export interface JobListingRecord {
  id: string;
  slug: string;
  leadNumber?: number;
  sourceKey?: string;
  jobReference?: string;
  vacancyReference?: string;
  title: string;
  employer: string;
  employerName?: string;
  category?: string;
  officialSourceUrl: string;
  officialApplyUrl: string;
  applicationUrl?: string | null;
  sourceUrl?: string | null;
  applyButtonLabel: string;
  sourceType: 'employer_ats' | 'employer_careers' | 'acs_catalogue' | 'public_vacancy_lead';
  location: string;
  workplaceType: 'Hybrid' | 'Site-based' | 'Remote' | 'Flexible / Hybrid' | 'On-site' | string;
  workArrangement?: string;
  employmentType: 'Full-time' | string;
  employmentTypeNote?: string;
  salaryText: string;
  salaryDisplay?: string;
  salaryDisclosed: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string;
  postedAt?: string | null; // ISO date YYYY-MM-DD if verified
  applicationDeadline?: string | null; // ISO date YYYY-MM-DD if verified
  deadlineAt?: string | null;
  lastCheckedAt: string; // ISO date YYYY-MM-DD
  status: JobLifecycleStatus;
  verificationStatus?: JobVerificationStatus;
  lastVerifiedAt?: string | null;
  verifiedBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
  featuredOrder?: number;
  publicationStatusNote?: string;
  applicationRouteNote?: string;
  companyOverview?: string;
  roleOverview?: string;
  specialization: string;
  industry: string;
  seniority: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  expiryDate?: string;
  verificationNote?: string;
  auditLog?: JobAuditEntry[];
}

export function isJobPubliclyVisible(job: JobListingRecord, includeArchived: boolean = false): boolean {
  if (includeArchived) return true;
  if (
    job.status === 'paused' ||
    job.status === 'filled' ||
    job.status === 'closed' ||
    job.status === 'expired' ||
    job.verificationStatus === 'archived'
  ) {
    return false;
  }
  return true;
}

export function isJobVerifiedActive(job: JobListingRecord): boolean {
  return job.status === 'active' || job.verificationStatus === 'verified';
}

export function hasVerifiedExternalApplicationUrl(job: JobListingRecord): boolean {
  const url = (job.applicationUrl ?? job.officialApplyUrl ?? '').trim();
  if (!url) return false;
  if (url.includes('TO BE VERIFIED') || url.startsWith('/jobs/')) return false;
  return /^https?:\/\//i.test(url);
}

export function isJobExpired(job: JobListingRecord, referenceDateIso: string = '2026-10-29'): boolean {
  if (
    job.status === 'expired' ||
    job.status === 'closed' ||
    job.status === 'paused' ||
    job.status === 'filled' ||
    job.status === 'unverified' ||
    job.verificationStatus === 'archived'
  ) {
    return true;
  }
  const refDay = referenceDateIso.slice(0, 10);
  if (job.applicationDeadline && job.applicationDeadline.slice(0, 10) < refDay) {
    return true;
  }
  if (job.expiryDate && job.expiryDate.slice(0, 10) < refDay) {
    return true;
  }
  return false;
}

export interface JobFilterCriteria {
  keyword?: string;
  employer?: string;
  location?: string;
  specialization?: string;
  workplaceType?: string;
  industry?: string;
  category?: string;
  seniority?: string;
  salaryRange?: string; // 'all' | 'disclosed' | '300k_plus' | 'unconfirmed'
  publicationStatus?: string; // 'all' | 'previously_identified' | 'representative' | 'active' | 'verification_required' | 'draft'
  includeExpired?: boolean;
  includeArchived?: boolean;
  sortBy?: 'relevance' | 'newest' | 'reference';
}

export function filterAndSortJobs(
  jobs: JobListingRecord[],
  criteria: JobFilterCriteria,
  referenceDateIso: string = '2026-10-29'
): JobListingRecord[] {
  const kw = (criteria.keyword || '').trim().toLowerCase();
  const emp = (criteria.employer || '').trim().toLowerCase();
  const loc = (criteria.location || '').trim().toLowerCase();
  const spec = (criteria.specialization || '').trim().toLowerCase();
  const wp = (criteria.workplaceType || '').trim().toLowerCase();
  const ind = (criteria.industry || criteria.category || '').trim().toLowerCase();
  const sen = (criteria.seniority || '').trim().toLowerCase();
  const sal = criteria.salaryRange || 'all';
  const pubStatus = (criteria.publicationStatus || 'all').trim().toLowerCase();

  const filtered = jobs.filter((job) => {
    if (!isJobPubliclyVisible(job, Boolean(criteria.includeArchived))) {
      return false;
    }

    const expired = isJobExpired(job, referenceDateIso);
    if (!criteria.includeExpired && expired) {
      return false;
    }

    if (kw) {
      const haystack = [
        job.jobReference || '',
        job.vacancyReference || '',
        job.title,
        job.employer,
        job.location,
        job.specialization,
        job.industry,
        job.category || '',
        job.seniority,
        job.summary,
        job.roleOverview || '',
        job.companyOverview || '',
        ...job.responsibilities,
        ...job.qualifications,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(kw)) return false;
    }

    if (emp && emp !== 'all') {
      if (job.employer.toLowerCase() !== emp && !job.employer.toLowerCase().includes(emp)) {
        return false;
      }
    }

    if (loc && loc !== 'all') {
      if (!job.location.toLowerCase().includes(loc)) return false;
    }

    if (spec && spec !== 'all') {
      if (job.specialization.toLowerCase() !== spec) return false;
    }

    if (wp && wp !== 'all') {
      const jobWp = (job.workArrangement || job.workplaceType || '').toLowerCase();
      if (wp === 'on-site') {
        if (!jobWp.includes('on-site') && !jobWp.includes('site-based')) return false;
      } else if (wp === 'hybrid') {
        if (!jobWp.includes('hybrid')) return false;
      } else if (wp === 'remote') {
        if (!jobWp.includes('remote')) return false;
      } else if (jobWp !== wp) {
        return false;
      }
    }

    if (ind && ind !== 'all') {
      const jobInd = job.industry.toLowerCase();
      const jobCat = (job.category || '').toLowerCase();
      if (jobInd !== ind && jobCat !== ind) return false;
    }

    if (sen && sen !== 'all') {
      if (job.seniority.toLowerCase() !== sen) return false;
    }

    if (pubStatus && pubStatus !== 'all') {
      if (job.status.toLowerCase() !== pubStatus) return false;
    }

    if (sal === 'disclosed' && !job.salaryDisclosed) {
      return false;
    }

    if (sal === 'unconfirmed' && job.salaryDisclosed) {
      return false;
    }

    if (sal === '300k_plus') {
      if (!job.salaryDisclosed || (job.salaryMax ?? 0) < 300000) return false;
    }

    return true;
  });

  if (criteria.sortBy === 'newest') {
    return [...filtered].sort((a, b) => {
      const dateA = a.postedAt || '0000-00-00';
      const dateB = b.postedAt || '0000-00-00';
      return dateB.localeCompare(dateA);
    });
  }

  if (criteria.sortBy === 'reference') {
    return [...filtered].sort((a, b) => {
      const orderA = a.leadNumber ?? 9999;
      const orderB = b.leadNumber ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return (a.jobReference || a.id).localeCompare(b.jobReference || b.id);
    });
  }

  return filtered;
}

export function sanitizePublicTeamEmail(email?: string): string | undefined {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  if (SUPERSEDED_EMAILS.has(normalized)) {
    return undefined;
  }
  return email.trim();
}
