import React, { useState, useEffect } from 'react';
import {
  X,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Database,
  Plus,
  Trash2,
  Upload,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import {
  hasVerifiedExternalApplicationUrl,
  isJobVerifiedActive,
  type JobListingRecord,
} from '../utils/validation';
import type { InsightArticle } from '../data/siteContent';

interface ContentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStandalonePage?: boolean;
}

interface SubmissionVaultItem {
  id: string;
  type: string;
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
}

interface EmailOutboxEntry {
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

interface SystemStatusResponse {
  ok: boolean;
  timestamp: string;
  integrations: {
    supabaseConfigured: boolean;
    resendConfigured: boolean;
    employerInboxConfigured: boolean;
    candidateInboxConfigured: boolean;
    siteUrlConfigured: boolean;
    privateLocalVaultActive: boolean;
    dynamicCmsBackendActive?: boolean;
  };
  submissionCount: number;
  recentSubmissions: SubmissionVaultItem[];
  emailOutbox?: EmailOutboxEntry[];
}

export const ContentManagerModal: React.FC<ContentManagerModalProps> = ({
  isOpen,
  onClose,
  isStandalonePage = false,
}) => {
  const {
    siteSettings,
    pages,
    teamMembers,
    jobs,
    jobImportReport,
    articles,
    disciplineCards,
    employerServices,
    searchStages,
    internalCareerOpenings,
    isSyncing,
    lastSavedAt,
    updateSiteSettings,
    updatePageConfig,
    updateTeamMember,
    updateJob,
    bulkUpdateJobs,
    runIdempotentJobImport,
    addJob,
    deleteJob,
    updateArticle,
    addArticle,
    deleteArticle,
    updateDisciplineCard,
    updateEmployerService,
    updateSearchStage,
    addInternalCareerOpening,
    deleteInternalCareerOpening,
    resetAllContentToDefaults,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<
    'pages' | 'jobs' | 'team' | 'articles' | 'services' | 'brand' | 'status'
  >(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('tab');
      if (t === 'jobs' || t === 'pages' || t === 'team' || t === 'articles' || t === 'services' || t === 'brand' || t === 'status') {
        return t;
      }
    }
    return 'pages';
  });
  const [selectedPageSlug, setSelectedPageSlug] = useState<string>('/');
  const [sysStatus, setSysStatus] = useState<SystemStatusResponse | null>(null);
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string | null>(null);
  const [adminJobQuery, setAdminJobQuery] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('all');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<string>('all');
  const [adminEmployerFilter, setAdminEmployerFilter] = useState<string>('all');
  const [adminVerificationFilter, setAdminVerificationFilter] = useState<string>('all');
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [pendingBulkAction, setPendingBulkAction] = useState<'approve' | 'close' | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [adminVisibleJobsCount, setAdminVisibleJobsCount] = useState<number>(20);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [savingSubId, setSavingSubId] = useState<string | null>(null);

  // New Job creation state
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobEmployer, setNewJobEmployer] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Boston, Massachusetts');
  const [newJobWorkplace, setNewJobWorkplace] = useState('Hybrid');
  const [newJobSpecialization, setNewJobSpecialization] = useState('Clinical Development');
  const [newJobIndustry, setNewJobIndustry] = useState('Pharmaceuticals & Biotechnology');
  const [newJobSeniority, setNewJobSeniority] = useState('Vice President');
  const [newJobApplyUrl, setNewJobApplyUrl] = useState('https://');
  const [newJobSalary, setNewJobSalary] = useState('');
  const [newJobDeadline, setNewJobDeadline] = useState('');
  const [newJobSummary, setNewJobSummary] = useState('');

  // New Article creation state
  const [showNewArticleForm, setShowNewArticleForm] = useState(false);
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState('Executive Search Strategy');
  const [newArtReadingTime, setNewArtReadingTime] = useState('4 min read');
  const [newArtExcerpt, setNewArtExcerpt] = useState('');
  const [newArtBody, setNewArtBody] = useState('');

  // New Internal Career Opening state
  const [newCareerTitle, setNewCareerTitle] = useState('');
  const [newCareerDept, setNewCareerDept] = useState('Executive Search & Research');
  const [newCareerLocation, setNewCareerLocation] = useState('United States (Hybrid / Remote)');
  const [newCareerSummary, setNewCareerSummary] = useState('');

  const refreshSystemStatus = () => {
    fetch('/api/system-status')
      .then((r) => r.json())
      .then((d: SystemStatusResponse) => {
        setSysStatus(d);
        const drafts: Record<string, string> = {};
        for (const s of d.recentSubmissions || []) {
          drafts[s.id] = s.adminNotes || '';
        }
        setNoteDrafts((prev) => ({ ...drafts, ...prev }));
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isOpen || isStandalonePage) {
      refreshSystemStatus();
    }
  }, [isOpen, isStandalonePage, activeTab]);

  const handleUpdateSubmissionAdminRecord = async (
    id: string,
    patch: {
      applicationStatus?: SubmissionVaultItem['applicationStatus'];
      adminNotes?: string;
    }
  ) => {
    setSavingSubId(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        refreshSystemStatus();
      }
    } finally {
      setSavingSubId(null);
    }
  };

  if (!isOpen && !isStandalonePage) return null;

  const currentPageRecord = pages.find((p) => p.slug === selectedPageSlug) || pages[0];

  const handleFileUpload = async (
    file: File,
    targetSlug: string,
    onPathReady: (publicPath: string) => void
  ) => {
    setUploadStatusMsg(`Uploading ${file.name}...`);
    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const res = typeof reader.result === 'string' ? reader.result : '';
          const parts = res.split(',');
          resolve(parts.length > 1 ? parts[1] : res);
        };
        reader.onerror = () => reject(new Error('Failed to read image file'));
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/cms/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          base64Data,
          targetSlug,
        }),
      });
      const data = await response.json();
      if (response.ok && data.publicPath) {
        onPathReady(data.publicPath);
        setUploadStatusMsg(`Saved to ${data.publicPath}`);
        setTimeout(() => setUploadStatusMsg(null), 4000);
      } else {
        setUploadStatusMsg(data.message || 'Image upload failed.');
      }
    } catch {
      setUploadStatusMsg('Could not upload image.');
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim() || !newJobEmployer.trim() || !newJobApplyUrl.trim()) return;
    const slug = `${newJobEmployer}-${newJobTitle}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const record: JobListingRecord = {
      id: `job-${Date.now()}`,
      slug,
      title: newJobTitle.trim(),
      employer: newJobEmployer.trim(),
      industry: newJobIndustry,
      specialization: newJobSpecialization,
      seniority: newJobSeniority,
      location: newJobLocation.trim() || 'United States',
      workplaceType: newJobWorkplace,
      employmentType: 'Full time',
      salaryDisclosed: Boolean(newJobSalary.trim()),
      salaryText: newJobSalary.trim() || 'Not disclosed by employer',
      summary:
        newJobSummary.trim() ||
        `Senior opportunity with ${newJobEmployer.trim()}. Review the official employer career listing for full qualifications and application instructions.`,
      responsibilities: [
        'Lead strategic and operational priorities aligned with the employer’s published role specification',
        'Collaborate with executive, clinical, or functional stakeholders across the organization',
      ],
      qualifications: [
        'Demonstrated senior leadership or specialist domain experience required by the hiring organization',
      ],
      officialApplyUrl: newJobApplyUrl.trim(),
      officialSourceUrl: newJobApplyUrl.trim(),
      applyButtonLabel: `Apply on ${newJobEmployer.trim()}’s Website`,
      postedAt: new Date().toISOString().slice(0, 10),
      applicationDeadline: newJobDeadline.trim() || undefined,
      lastCheckedAt: new Date().toISOString().slice(0, 10),
      status: 'active',
      featuredOrder: jobs.length + 1,
      verificationNote: 'Added via Dynamic Content Management Studio.',
    };
    addJob(record);
    setNewJobTitle('');
    setNewJobEmployer('');
    setNewJobSalary('');
    setNewJobDeadline('');
    setNewJobSummary('');
    setShowNewJobForm(false);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle.trim() || !newArtExcerpt.trim()) return;
    const slug = newArtTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const paragraphs = newArtBody
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const newArticle: InsightArticle = {
      slug,
      title: newArtTitle.trim(),
      category: newArtCategory.trim() || 'Executive Search Strategy',
      readingTime: newArtReadingTime.trim() || '4 min read',
      excerpt: newArtExcerpt.trim(),
      imagePath: '/images/executive-meeting.svg',
      imageAlt: newArtTitle.trim(),
      authorVerified: false,
      publishDateVerified: false,
      status: 'published',
      seoTitle: newArtTitle.trim(),
      seoDescription: newArtExcerpt.trim(),
      paragraphs:
        paragraphs.length > 0
          ? paragraphs
          : [newArtExcerpt.trim()],
    };
    addArticle(newArticle);
    setNewArtTitle('');
    setNewArtExcerpt('');
    setNewArtBody('');
    setShowNewArticleForm(false);
  };

  const handleCreateInternalOpening = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareerTitle.trim() || !newCareerSummary.trim()) return;
    addInternalCareerOpening({
      id: `internal-${Date.now()}`,
      title: newCareerTitle.trim(),
      department: newCareerDept.trim(),
      location: newCareerLocation.trim(),
      summary: newCareerSummary.trim(),
      published: true,
    });
    setNewCareerTitle('');
    setNewCareerSummary('');
  };

  const studioContent = (
    <div
      className={
        isStandalonePage
          ? 'max-w-[1280px] mx-auto my-8 bg-[#F8FAFC] text-[#0A1633] border-2 border-[#FACC15] rounded-sm overflow-hidden flex flex-col'
          : 'w-full max-w-6xl bg-[#F8FAFC] text-[#0A1633] border-2 border-[#FACC15] rounded-sm overflow-hidden max-h-[92vh] flex flex-col'
      }
    >
      {/* Header */}
      <div className="bg-[#0F2350] text-[#F8FAFC] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#FACC15]/30">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#FDE047]">
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Dynamic Website CMS · Server-Persisted Content Engine (/api/cms)</span>
            {isSyncing && (
              <span className="inline-flex items-center gap-1 text-[#FACC15]">
                <RefreshCw className="w-3 h-3 animate-spin" /> Saving...
              </span>
            )}
            {!isSyncing && lastSavedAt && (
              <span className="font-mono-tabular text-[#FDE047]/80">
                · Saved {new Date(lastSavedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
          <h2 className="font-editorial text-2xl font-semibold">
            Dynamic Content Management &amp; Launch Studio
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {uploadStatusMsg && (
            <span className="text-xs font-mono-tabular text-[#FDE047] bg-[#1E3A8A] px-3 py-1 rounded-sm border border-[#FACC15]/40">
              {uploadStatusMsg}
            </span>
          )}
          <button
            type="button"
            onClick={resetAllContentToDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FDE047] border border-[#FACC15]/50 hover:bg-[#1E3A8A] rounded-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Defaults</span>
          </button>
          {!isStandalonePage && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Content Studio"
              className="inline-flex items-center justify-center w-8 h-8 text-[#F8FAFC] hover:bg-[#1E3A8A] rounded-sm"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#0A1633] text-[#F8FAFC] px-6 py-2.5 flex flex-wrap gap-2 border-b border-[#1E293B]">
        {[
          { id: 'pages', label: `Pages & Heroes (${pages.length})` },
          { id: 'jobs', label: `Jobs & Vacancies (${jobs.length})` },
          { id: 'team', label: `Meet Our Team (${teamMembers.length})` },
          { id: 'articles', label: `Insights Articles (${articles.length})` },
          { id: 'services', label: 'Services, Process & Internal Careers' },
          { id: 'brand', label: 'Brand & SEO Settings' },
          { id: 'status', label: 'Submissions Vault & Launch Status' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-[#FACC15] text-[#0A1633]'
                : 'text-[#F8FAFC]/80 hover:text-[#FDE047]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="p-6 overflow-y-auto space-y-6 flex-1">
        {/* TAB 1: PAGES & HEROES */}
        {activeTab === 'pages' && currentPageRecord && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-[#CBD5E1] rounded-sm">
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                  Live Page Hero, CTA &amp; SEO Editor
                </h3>
                <p className="text-xs text-[#475569]">
                  Changes made here immediately update the live page and persist to the backend CMS store.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="cms-page-select" className="text-xs font-semibold text-[#1E293B]">
                  Select Page:
                </label>
                <select
                  id="cms-page-select"
                  value={selectedPageSlug}
                  onChange={(e) => setSelectedPageSlug(e.target.value)}
                  className="px-3 py-2 text-xs font-semibold bg-[#F8FAFC] border border-[#1E3A8A] rounded-sm"
                >
                  {pages.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title} ({p.slug})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cms-hero-kicker"
                    className="block text-xs font-semibold text-[#1E293B] mb-1"
                  >
                    Hero Kicker / Eyebrow
                  </label>
                  <input
                    id="cms-hero-kicker"
                    type="text"
                    value={currentPageRecord.heroKicker}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, { heroKicker: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cms-hero-heading"
                    className="block text-xs font-semibold text-[#1E293B] mb-1"
                  >
                    Hero H1 Heading
                  </label>
                  <input
                    id="cms-hero-heading"
                    type="text"
                    value={currentPageRecord.heroHeading}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, { heroHeading: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-hero-supporting"
                  className="block text-xs font-semibold text-[#1E293B] mb-1"
                >
                  Hero Supporting Copy
                </label>
                <textarea
                  id="cms-hero-supporting"
                  rows={3}
                  value={currentPageRecord.heroText}
                  onChange={(e) =>
                    updatePageConfig(currentPageRecord.slug, {
                      heroText: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cms-hero-image"
                    className="block text-xs font-semibold text-[#1E293B] mb-1"
                  >
                    Hero Image Path or URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="cms-hero-image"
                      type="text"
                      value={currentPageRecord.heroImage}
                      onChange={(e) =>
                        updatePageConfig(currentPageRecord.slug, { heroImage: e.target.value })
                      }
                      className="flex-1 px-3 py-2 text-xs font-mono-tabular bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(
                              file,
                              `hero-${currentPageRecord.slug.replace(/[^a-z0-9]/gi, '') || 'home'}`,
                              (publicPath) =>
                                updatePageConfig(currentPageRecord.slug, {
                                  heroImage: publicPath,
                                })
                            );
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cms-hero-caption"
                    className="block text-xs font-semibold text-[#1E293B] mb-1"
                  >
                    Hero Image Caption
                  </label>
                  <input
                    id="cms-hero-caption"
                    type="text"
                    value={currentPageRecord.heroImageCaption || ''}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, {
                        heroImageCaption: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 border-t border-[#EFF6FF]">
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={currentPageRecord.primaryCtaLabel || ''}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, {
                        primaryCtaLabel: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Primary CTA Destination
                  </label>
                  <input
                    type="text"
                    value={currentPageRecord.primaryCtaUrl || ''}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, { primaryCtaUrl: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono-tabular bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Secondary CTA Label
                  </label>
                  <input
                    type="text"
                    value={currentPageRecord.secondaryCtaLabel || ''}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, {
                        secondaryCtaLabel: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Secondary CTA Destination
                  </label>
                  <input
                    type="text"
                    value={currentPageRecord.secondaryCtaUrl || ''}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, {
                        secondaryCtaUrl: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono-tabular bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#EFF6FF]">
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={currentPageRecord.seoTitle}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, { seoTitle: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    SEO Meta Description
                  </label>
                  <input
                    type="text"
                    value={currentPageRecord.seoDescription}
                    onChange={(e) =>
                      updatePageConfig(currentPageRecord.slug, {
                        seoDescription: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: JOBS & VACANCIES CRUD */}
        {activeTab === 'jobs' &&
          (() => {
            const adminCategories = Array.from(
              new Set(jobs.map((j) => j.category || j.industry))
            ).sort();
            const adminEmployers = Array.from(new Set(jobs.map((j) => j.employer))).sort();

            const filteredAdminJobs = jobs.filter((j) => {
              if (adminJobQuery.trim()) {
                const q = adminJobQuery.toLowerCase();
                const matchesText =
                  (j.jobReference || '').toLowerCase().includes(q) ||
                  j.title.toLowerCase().includes(q) ||
                  j.employer.toLowerCase().includes(q) ||
                  j.location.toLowerCase().includes(q) ||
                  (j.category || j.industry || '').toLowerCase().includes(q);
                if (!matchesText) return false;
              }
              if (adminStatusFilter !== 'all' && j.status !== adminStatusFilter) {
                return false;
              }
              if (
                adminCategoryFilter !== 'all' &&
                (j.category || j.industry) !== adminCategoryFilter
              ) {
                return false;
              }
              if (adminEmployerFilter !== 'all' && j.employer !== adminEmployerFilter) {
                return false;
              }
              if (adminVerificationFilter === 'awaiting_verification') {
                if (isJobVerifiedActive(j)) return false;
              } else if (adminVerificationFilter === 'verified') {
                if (!isJobVerifiedActive(j)) return false;
              } else if (adminVerificationFilter === 'missing_application_url') {
                if (hasVerifiedExternalApplicationUrl(j)) return false;
              }
              return true;
            });

            const displayedAdminJobs = filteredAdminJobs.slice(0, adminVisibleJobsCount);

            const toggleSelectJob = (id: string) => {
              setSelectedJobIds((prev) =>
                prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
              );
            };

            const selectAllVisible = () => {
              setSelectedJobIds(displayedAdminJobs.map((j) => j.id));
            };

            const clearSelection = () => {
              setSelectedJobIds([]);
              setPendingBulkAction(null);
            };

            const confirmAndExecuteBulkAction = async () => {
              if (!pendingBulkAction || selectedJobIds.length === 0) return;
              const today = new Date().toISOString().slice(0, 10);
              if (pendingBulkAction === 'approve') {
                await bulkUpdateJobs(
                  selectedJobIds,
                  {
                    status: 'active',
                    verificationStatus: 'verified',
                    lastVerifiedAt: today,
                    verifiedBy: 'Designated Administrator',
                  },
                  `Bulk approved ${selectedJobIds.length} listings to Active (Verified)`
                );
              } else if (pendingBulkAction === 'close') {
                await bulkUpdateJobs(
                  selectedJobIds,
                  {
                    status: 'closed',
                    verificationStatus: 'archived',
                  },
                  `Bulk closed ${selectedJobIds.length} listings`
                );
              }
              setPendingBulkAction(null);
              setSelectedJobIds([]);
            };

            return (
              <div className="space-y-5">
                {/* Idempotent Import Report Banner */}
                <div
                  data-testid="admin-import-report"
                  className="p-4 bg-[#E0F2FE] border border-[#38BDF8] rounded-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0369A1] uppercase tracking-wider">
                      <Database className="w-4 h-4" aria-hidden="true" />
                      <span>120 U.S. Executive &amp; Senior-Level Vacancy Leads — Idempotent Import Report</span>
                    </div>
                    <p className="text-xs text-[#082F49] font-mono-tabular">
                      <strong>{jobImportReport.considered} source records considered</strong> ·{' '}
                      Inserted: <strong>{jobImportReport.inserted}</strong> · Updated:{' '}
                      <strong>{jobImportReport.updated}</strong> · Skipped:{' '}
                      <strong>{jobImportReport.skipped}</strong> · Duplicates Prevented:{' '}
                      <strong>{jobImportReport.duplicates}</strong> · Total Database Records:{' '}
                      <strong>{jobs.length}</strong>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => runIdempotentJobImport()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#0369A1] rounded-sm cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#0369A1]" aria-hidden="true" />
                      <span>Run Idempotent Import Check</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewJobForm((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span>{showNewJobForm ? 'Cancel New Vacancy' : 'Add New Job Vacancy'}</span>
                    </button>
                  </div>
                </div>

                {showNewJobForm && (
                  <form
                    onSubmit={handleCreateJob}
                    className="p-5 bg-white border-2 border-[#FACC15] rounded-sm space-y-4"
                  >
                    <h4 className="font-editorial text-xl font-semibold text-[#0A1633]">
                      Create New Verified Job Listing
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newJobTitle}
                          onChange={(e) => setNewJobTitle(e.target.value)}
                          placeholder="e.g., Chief Medical Officer"
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Employer Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newJobEmployer}
                          onChange={(e) => setNewJobEmployer(e.target.value)}
                          placeholder="e.g., Vertex Pharmaceuticals"
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Official Employer Apply URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={newJobApplyUrl}
                          onChange={(e) => setNewJobApplyUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={newJobLocation}
                          onChange={(e) => setNewJobLocation(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Workplace Type
                        </label>
                        <select
                          value={newJobWorkplace}
                          onChange={(e) => setNewJobWorkplace(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        >
                          <option value="Hybrid">Hybrid</option>
                          <option value="Flexible / Hybrid">Flexible / Hybrid</option>
                          <option value="Site-based">Site-based</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Specialization
                        </label>
                        <select
                          value={newJobSpecialization}
                          onChange={(e) => setNewJobSpecialization(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        >
                          <option value="Clinical Development">Clinical Development</option>
                          <option value="Strategy & Business Development">
                            Strategy &amp; Business Development
                          </option>
                          <option value="Executive Leadership">Executive Leadership</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Industry
                        </label>
                        <select
                          value={newJobIndustry}
                          onChange={(e) => setNewJobIndustry(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        >
                          <option value="Pharmaceuticals & Biotechnology">
                            Pharmaceuticals &amp; Biotechnology
                          </option>
                          <option value="Medical Devices & Life Sciences">
                            Medical Devices &amp; Life Sciences
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Disclosed Salary (leave blank if undisclosed)
                        </label>
                        <input
                          type="text"
                          value={newJobSalary}
                          onChange={(e) => setNewJobSalary(e.target.value)}
                          placeholder="e.g., $320,000 - $380,000"
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                          Application Deadline (optional YYYY-MM-DD)
                        </label>
                        <input
                          type="date"
                          value={newJobDeadline}
                          onChange={(e) => setNewJobDeadline(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                        Role Summary
                      </label>
                      <textarea
                        rows={2}
                        value={newJobSummary}
                        onChange={(e) => setNewJobSummary(e.target.value)}
                        placeholder="Concise summary of the role and leadership mandate..."
                        className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm"
                    >
                      Publish Job Listing to Board
                    </button>
                  </form>
                )}

                {/* Admin Search, Status, Category, Employer & Verification Filters */}
                <div className="bg-white p-4 border border-[#CBD5E1] rounded-sm space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <input
                      type="search"
                      value={adminJobQuery}
                      onChange={(e) => setAdminJobQuery(e.target.value)}
                      placeholder="Search profiles by Reference (e.g. ACS-LEAD-001), Title, Employer, or Location..."
                      aria-label="Filter jobs in administrator studio"
                      className="flex-1 px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                    <span className="text-xs font-mono-tabular font-semibold text-[#082F49]">
                      Matching {filteredAdminJobs.length} of {jobs.length} Total Jobs
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-[#EFF6FF]">
                    <div>
                      <label
                        htmlFor="admin-filter-status"
                        className="block text-[11px] font-semibold text-[#475569] mb-1"
                      >
                        Status Filter
                      </label>
                      <select
                        id="admin-filter-status"
                        value={adminStatusFilter}
                        onChange={(e) => setAdminStatusFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                      >
                        <option value="all">All Statuses</option>
                        <option value="draft">Draft</option>
                        <option value="verification_required">Verification Required</option>
                        <option value="active">Active (Verified)</option>
                        <option value="paused">Paused</option>
                        <option value="filled">Filled</option>
                        <option value="closed">Closed</option>
                        <option value="previously_identified">Previously Identified</option>
                        <option value="representative">Representative</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-filter-category"
                        className="block text-[11px] font-semibold text-[#475569] mb-1"
                      >
                        Category / Industry
                      </label>
                      <select
                        id="admin-filter-category"
                        value={adminCategoryFilter}
                        onChange={(e) => setAdminCategoryFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                      >
                        <option value="all">All Categories</option>
                        {adminCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-filter-employer"
                        className="block text-[11px] font-semibold text-[#475569] mb-1"
                      >
                        Employer
                      </label>
                      <select
                        id="admin-filter-employer"
                        value={adminEmployerFilter}
                        onChange={(e) => setAdminEmployerFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                      >
                        <option value="all">All Employers</option>
                        {adminEmployers.map((emp) => (
                          <option key={emp} value={emp}>
                            {emp}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-filter-verification"
                        className="block text-[11px] font-semibold text-[#475569] mb-1"
                      >
                        Verification Requirement
                      </label>
                      <select
                        id="admin-filter-verification"
                        value={adminVerificationFilter}
                        onChange={(e) => setAdminVerificationFilter(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                      >
                        <option value="all">All Verification States</option>
                        <option value="awaiting_verification">Awaiting Verification</option>
                        <option value="verified">Verified Active Only</option>
                        <option value="missing_application_url">
                          Application Link Required (Missing URL)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Bulk Selection & Actions Bar */}
                  <div className="pt-3 border-t border-[#EFF6FF] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={selectAllVisible}
                        className="px-3 py-1.5 font-semibold text-[#082F49] bg-[#E0F2FE] hover:bg-[#BAE6FD] border border-[#7DD3FC] rounded-sm cursor-pointer"
                      >
                        Select Visible ({displayedAdminJobs.length})
                      </button>
                      {selectedJobIds.length > 0 && (
                        <button
                          type="button"
                          onClick={clearSelection}
                          className="px-3 py-1.5 font-semibold text-[#475569] bg-[#F8FAFC] hover:bg-[#E2E8F0] border border-[#CBD5E1] rounded-sm cursor-pointer"
                        >
                          Clear Selection ({selectedJobIds.length} selected)
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={selectedJobIds.length === 0}
                        onClick={() => setPendingBulkAction('approve')}
                        className="px-3.5 py-1.5 text-xs font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] disabled:opacity-50 border border-[#0369A1] rounded-sm cursor-pointer"
                      >
                        Bulk Approve Selected ({selectedJobIds.length})
                      </button>
                      <button
                        type="button"
                        disabled={selectedJobIds.length === 0}
                        onClick={() => setPendingBulkAction('close')}
                        className="px-3.5 py-1.5 text-xs font-bold text-red-900 bg-red-50 hover:bg-red-100 disabled:opacity-50 border border-red-300 rounded-sm cursor-pointer"
                      >
                        Bulk Close Selected ({selectedJobIds.length})
                      </button>
                    </div>
                  </div>

                  {/* Confirmation Step for Bulk Actions */}
                  {pendingBulkAction && selectedJobIds.length > 0 && (
                    <div
                      role="alertdialog"
                      aria-label="Confirm bulk action"
                      className="p-4 bg-[#FEF9C3] border-2 border-[#0369A1] rounded-sm flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="text-xs text-[#082F49] space-y-0.5">
                        <p className="font-bold">
                          Confirm Bulk Action:{' '}
                          {pendingBulkAction === 'approve'
                            ? `Approve & Publish ${selectedJobIds.length} Selected Role(s) as Active`
                            : `Close & Archive ${selectedJobIds.length} Selected Role(s)`}
                        </p>
                        <p className="text-[#475569]">
                          {pendingBulkAction === 'approve'
                            ? 'This will mark the selected roles as Active (Verified) and record today as the verification timestamp.'
                            : 'This will mark the selected roles as Closed and hide them from the public job board.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={confirmAndExecuteBulkAction}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-[#0369A1] hover:bg-[#082F49] rounded-sm cursor-pointer"
                        >
                          Confirm Bulk {pendingBulkAction === 'approve' ? 'Approve' : 'Close'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingBulkAction(null)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#082F49] bg-white border border-[#CBD5E1] rounded-sm cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Jobs List */}
                <div className="space-y-3">
                  {displayedAdminJobs.map((job) => {
                    const isSelected = selectedJobIds.includes(job.id);
                    const isExpanded = expandedJobId === job.id;
                    const hasValidApplyUrl = hasVerifiedExternalApplicationUrl(job);
                    const isVerified = isJobVerifiedActive(job);

                    return (
                      <div
                        key={job.id}
                        className="p-4 bg-white border border-[#CBD5E1] rounded-sm space-y-3"
                      >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectJob(job.id)}
                              aria-label={`Select ${job.title} at ${job.employer}`}
                              className="mt-1 w-4 h-4 accent-[#0369A1] cursor-pointer"
                            />
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1E3A8A]">
                                <span className="font-mono-tabular">
                                  {job.jobReference || job.id}
                                </span>
                                <span>·</span>
                                <span>{job.employer}</span>
                                <span>·</span>
                                <span>{job.category || job.industry}</span>
                                <span>·</span>
                                <span>
                                  {job.location} ({job.workArrangement || job.workplaceType})
                                </span>
                                {!hasValidApplyUrl && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold">
                                    <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                                    Application link required
                                  </span>
                                )}
                                {isVerified && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold">
                                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                    Verified ({job.lastVerifiedAt || 'Active'})
                                  </span>
                                )}
                              </div>
                              <h4 className="font-editorial text-lg font-semibold text-[#0A1633]">
                                {job.title}
                              </h4>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              aria-label={`Status for ${job.title}`}
                              value={job.status}
                              onChange={(e) =>
                                updateJob(job.id, {
                                  status: e.target.value as JobListingRecord['status'],
                                })
                              }
                              className="px-2.5 py-1.5 text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                            >
                              <option value="draft">Draft</option>
                              <option value="verification_required">Verification Required</option>
                              <option value="active">Active (Verified)</option>
                              <option value="paused">Paused</option>
                              <option value="filled">Filled</option>
                              <option value="closed">Closed</option>
                              <option value="previously_identified">
                                Previously Identified Posting
                              </option>
                              <option value="representative">Representative Opportunity</option>
                            </select>

                            <button
                              type="button"
                              onClick={() =>
                                setExpandedJobId(isExpanded ? null : job.id)
                              }
                              className="px-3 py-1.5 text-xs font-semibold text-[#082F49] bg-[#E0F2FE] hover:bg-[#BAE6FD] border border-[#7DD3FC] rounded-sm cursor-pointer"
                            >
                              {isExpanded ? 'Hide Full Editor' : 'Edit Full Details'}
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteJob(job.id)}
                              aria-label={`Delete ${job.title}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 rounded-sm cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Quick Inline Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                          <input
                            type="text"
                            value={job.title}
                            onChange={(e) => updateJob(job.id, { title: e.target.value })}
                            aria-label={`Edit title for ${job.title}`}
                            placeholder="Job Title"
                            className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                          />
                          <input
                            type="text"
                            value={job.employer}
                            onChange={(e) =>
                              updateJob(job.id, {
                                employer: e.target.value,
                                employerName: e.target.value,
                              })
                            }
                            aria-label={`Edit employer for ${job.title}`}
                            placeholder="Employer"
                            className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                          />
                          <input
                            type="text"
                            value={job.salaryText}
                            onChange={(e) =>
                              updateJob(job.id, {
                                salaryText: e.target.value,
                                salaryDisclosed:
                                  !e.target.value.trim().toLowerCase().includes('not disclosed') &&
                                  !e.target.value.trim().toLowerCase().includes('confirmed during') &&
                                  Boolean(e.target.value.trim()),
                              })
                            }
                            aria-label={`Edit salary for ${job.title}`}
                            placeholder="Salary Range or Salary not disclosed"
                            className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm font-mono-tabular"
                          />
                          <input
                            type="text"
                            value={job.location}
                            onChange={(e) => updateJob(job.id, { location: e.target.value })}
                            aria-label={`Edit location for ${job.title}`}
                            placeholder="Location"
                            className="px-2.5 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                          />
                        </div>

                        {/* Expanded Full Field Editor */}
                        {isExpanded && (
                          <div className="pt-3 border-t border-[#EFF6FF] space-y-3 text-xs bg-[#F8FAFC] p-4 rounded-sm">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Category / Industry
                                </label>
                                <input
                                  type="text"
                                  value={job.category || job.industry}
                                  onChange={(e) =>
                                    updateJob(job.id, {
                                      category: e.target.value,
                                      industry: e.target.value,
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Work Arrangement
                                </label>
                                <input
                                  type="text"
                                  value={job.workArrangement || job.workplaceType}
                                  onChange={(e) =>
                                    updateJob(job.id, {
                                      workArrangement: e.target.value,
                                      workplaceType: e.target.value,
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Employment Type
                                </label>
                                <input
                                  type="text"
                                  value={job.employmentType}
                                  onChange={(e) =>
                                    updateJob(job.id, { employmentType: e.target.value })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Direct Employer Application URL
                                </label>
                                <input
                                  type="url"
                                  value={job.applicationUrl || ''}
                                  onChange={(e) =>
                                    updateJob(job.id, {
                                      applicationUrl: e.target.value.trim() || null,
                                      officialApplyUrl: e.target.value.trim(),
                                    })
                                  }
                                  placeholder="https://careers.employer.com/..."
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm font-mono-tabular"
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Source URL / Vacancy Reference
                                </label>
                                <input
                                  type="text"
                                  value={job.sourceUrl || job.vacancyReference || ''}
                                  onChange={(e) =>
                                    updateJob(job.id, {
                                      sourceUrl: e.target.value,
                                      vacancyReference: e.target.value,
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block font-semibold text-[#1E293B] mb-1">
                                    Verified By
                                  </label>
                                  <input
                                    type="text"
                                    value={job.verifiedBy || ''}
                                    onChange={(e) =>
                                      updateJob(job.id, { verifiedBy: e.target.value })
                                    }
                                    placeholder="Admin name"
                                    className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block font-semibold text-[#1E293B] mb-1">
                                    Last Verified Date
                                  </label>
                                  <input
                                    type="date"
                                    value={job.lastVerifiedAt || ''}
                                    onChange={(e) =>
                                      updateJob(job.id, { lastVerifiedAt: e.target.value || null })
                                    }
                                    className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Company Overview
                                </label>
                                <textarea
                                  rows={3}
                                  value={job.companyOverview || ''}
                                  onChange={(e) =>
                                    updateJob(job.id, { companyOverview: e.target.value })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Role Overview
                                </label>
                                <textarea
                                  rows={3}
                                  value={job.roleOverview || job.summary}
                                  onChange={(e) =>
                                    updateJob(job.id, {
                                      roleOverview: e.target.value,
                                      summary: e.target.value,
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Responsibilities (one per line)
                                </label>
                                <textarea
                                  rows={4}
                                  value={(job.responsibilities || []).join('\n')}
                                  onChange={(e) =>
                                    updateJob(job.id, {
                                      responsibilities: e.target.value
                                        .split('\n')
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-[#1E293B] mb-1">
                                  Qualifications (one per line)
                                </label>
                                <textarea
                                  rows={4}
                                  value={(job.qualifications || []).join('\n')}
                                  onChange={(e) =>
                                    updateJob(job.id, {
                                      qualifications: e.target.value
                                        .split('\n')
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-sm"
                                />
                              </div>
                            </div>

                            {job.auditLog && job.auditLog.length > 0 && (
                              <div className="pt-2 border-t border-[#CBD5E1]">
                                <p className="text-[11px] font-bold text-[#475569] mb-1">
                                  Audit Trail:
                                </p>
                                <ul className="space-y-1 text-[11px] text-[#475569] font-mono-tabular max-h-24 overflow-y-auto">
                                  {job.auditLog.slice(0, 5).map((entry, idx) => (
                                    <li key={idx}>
                                      [{entry.timestamp.slice(0, 19).replace('T', ' ')}]{' '}
                                      <strong>{entry.actor}:</strong> {entry.action}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {adminVisibleJobsCount < filteredAdminJobs.length && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setAdminVisibleJobsCount((prev) => prev + 20)}
                        className="px-6 py-2 text-xs font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#0369A1] rounded-sm cursor-pointer"
                      >
                        Show More Admin Jobs ({displayedAdminJobs.length} of{' '}
                        {filteredAdminJobs.length})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

        {/* TAB 3: TEAM DIRECTORY & PORTRAIT UPLOAD */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-[#CBD5E1] rounded-sm">
              <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                Meet Our Team Directory &amp; Portrait Uploader
              </h3>
              <p className="text-xs text-[#475569]">
                Upload real photographs directly to <code className="font-mono-tabular">/public/images/team/</code> or edit biographies, specialties, and approved contact links. Photographs display plainly and unblurred.
              </p>
            </div>

            {teamMembers.map((member) => (
              <div
                key={member.slug}
                className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-editorial text-xl font-semibold text-[#0A1633]">
                      {member.name}
                    </h4>
                    <p className="text-xs text-[#475569] font-mono-tabular">
                      Target path: {member.imagePath}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm cursor-pointer">
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Upload Portrait File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, member.slug, (publicPath) =>
                              updateTeamMember(member.slug, {
                                imagePath: publicPath,
                                photoSuppliedByOwner: true,
                              })
                            );
                          }
                        }}
                      />
                    </label>

                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={member.photoSuppliedByOwner}
                        onChange={(e) =>
                          updateTeamMember(member.slug, {
                            photoSuppliedByOwner: e.target.checked,
                          })
                        }
                      />
                      <span>Show Portrait Photo</span>
                    </label>

                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={member.roleVerifiedByOwner}
                        onChange={(e) =>
                          updateTeamMember(member.slug, {
                            roleVerifiedByOwner: e.target.checked,
                          })
                        }
                      />
                      <span>Specialty Confirmed</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                      Specialty / Title
                    </label>
                    <input
                      type="text"
                      value={member.suggestedSpecialtyTitle}
                      onChange={(e) =>
                        updateTeamMember(member.slug, {
                          suggestedSpecialtyTitle: e.target.value,
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                      Approved Public Email
                    </label>
                    <input
                      type="email"
                      value={member.approvedPublicEmail || ''}
                      onChange={(e) =>
                        updateTeamMember(member.slug, {
                          approvedPublicEmail: e.target.value.trim() || undefined,
                        })
                      }
                      placeholder="None supplied"
                      className="w-full px-3 py-1.5 text-xs font-mono-tabular bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                      Portrait Image Path
                    </label>
                    <input
                      type="text"
                      value={member.imagePath}
                      onChange={(e) =>
                        updateTeamMember(member.slug, { imagePath: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono-tabular bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                    Profile Biography
                  </label>
                  <textarea
                    rows={2}
                    value={member.suggestedProfileCopy}
                    onChange={(e) =>
                      updateTeamMember(member.slug, { suggestedProfileCopy: e.target.value })
                    }
                    className="w-full px-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: INSIGHTS ARTICLES CRUD */}
        {activeTab === 'articles' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-[#CBD5E1] rounded-sm">
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                  Insights &amp; Editorial Hub Manager
                </h3>
                <p className="text-xs text-[#475569]">
                  Publish new executive search perspectives, edit existing article copy, or toggle between Published and Draft Review.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewArticleForm((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>{showNewArticleForm ? 'Cancel' : 'Publish New Article'}</span>
              </button>
            </div>

            {showNewArticleForm && (
              <form
                onSubmit={handleCreateArticle}
                className="p-5 bg-white border-2 border-[#FACC15] rounded-sm space-y-4"
              >
                <h4 className="font-editorial text-xl font-semibold text-[#0A1633]">
                  New Editorial Perspective
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newArtTitle}
                      onChange={(e) => setNewArtTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newArtCategory}
                      onChange={(e) => setNewArtCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                      Reading Time
                    </label>
                    <input
                      type="text"
                      value={newArtReadingTime}
                      onChange={(e) => setNewArtReadingTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Card Excerpt *
                  </label>
                  <input
                    type="text"
                    required
                    value={newArtExcerpt}
                    onChange={(e) => setNewArtExcerpt(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Full Article Paragraphs (one paragraph per line)
                  </label>
                  <textarea
                    rows={4}
                    value={newArtBody}
                    onChange={(e) => setNewArtBody(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] rounded-sm"
                >
                  Save &amp; Publish Article
                </button>
              </form>
            )}

            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.slug}
                  className="p-4 bg-white border border-[#CBD5E1] rounded-sm space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-[#1E3A8A]">{art.category}</span>
                      <h4 className="font-editorial text-lg font-semibold text-[#0A1633]">
                        {art.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={art.status || 'published'}
                        onChange={(e) =>
                          updateArticle(art.slug, {
                            status: e.target.value as 'published' | 'draft_review',
                          })
                        }
                        className="px-2.5 py-1 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                      >
                        <option value="published">Published</option>
                        <option value="draft_review">Draft Review</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => deleteArticle(art.slug)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={art.excerpt}
                    onChange={(e) => updateArticle(art.slug, { excerpt: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES, SEARCH STAGES & INTERNAL CAREERS */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Internal Careers Manager */}
            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-4">
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                  Internal Careers at Alexanders Career Strategy (/careers)
                </h3>
                <p className="text-xs text-[#475569]">
                  When zero openings exist, <code className="font-mono-tabular">/careers</code> displays the honest &ldquo;No Current Vacancies&rdquo; notice. Add an internal opening below to advertise a live role at the firm.
                </p>
              </div>

              <form
                onSubmit={handleCreateInternalOpening}
                className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2"
              >
                <input
                  type="text"
                  required
                  value={newCareerTitle}
                  onChange={(e) => setNewCareerTitle(e.target.value)}
                  placeholder="Role Title (e.g., Executive Search Associate)"
                  className="px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
                <input
                  type="text"
                  value={newCareerDept}
                  onChange={(e) => setNewCareerDept(e.target.value)}
                  placeholder="Department"
                  className="px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
                <input
                  type="text"
                  required
                  value={newCareerSummary}
                  onChange={(e) => setNewCareerSummary(e.target.value)}
                  placeholder="Brief role summary..."
                  className="px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm"
                >
                  + Add Internal Opening
                </button>
              </form>

              {internalCareerOpenings.length > 0 && (
                <div className="space-y-2 pt-2">
                  {internalCareerOpenings.map((op) => (
                    <div
                      key={op.id}
                      className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="text-[#0A1633]">{op.title}</strong> · {op.department} ({op.location})
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteInternalCareerOpening(op.id)}
                        className="text-red-700 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Employer Services */}
            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-3">
              <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                Homepage Employer Services ({employerServices.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {employerServices.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2"
                  >
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => updateEmployerService(srv.id, { title: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs font-semibold bg-white border border-[#CBD5E1] rounded-sm"
                    />
                    <textarea
                      rows={2}
                      value={srv.whatItInvolves}
                      onChange={(e) =>
                        updateEmployerService(srv.id, { whatItInvolves: e.target.value })
                      }
                      className="w-full px-2.5 py-1 text-xs bg-white border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Functional Discipline Cards */}
            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-3">
              <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                Functional Discipline Cards ({disciplineCards.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {disciplineCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2"
                  >
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updateDisciplineCard(card.id, { title: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs font-semibold bg-white border border-[#CBD5E1] rounded-sm"
                    />
                    <input
                      type="text"
                      value={card.summary}
                      onChange={(e) => updateDisciplineCard(card.id, { summary: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Search Methodology Stages */}
            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-3">
              <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                Search Methodology Stages ({searchStages.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchStages.map((stage) => (
                  <div
                    key={stage.step}
                    className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2"
                  >
                    <input
                      type="text"
                      value={stage.title}
                      onChange={(e) => updateSearchStage(stage.step, { title: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs font-semibold bg-white border border-[#CBD5E1] rounded-sm"
                    />
                    <textarea
                      rows={2}
                      value={stage.description}
                      onChange={(e) =>
                        updateSearchStage(stage.step, { description: e.target.value })
                      }
                      className="w-full px-2.5 py-1 text-xs bg-white border border-[#CBD5E1] rounded-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BRAND & GLOBAL SEO SETTINGS */}
        {activeTab === 'brand' && (
          <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-4">
            <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Centralized Brand &amp; Global SEO Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="studio-brand-name"
                  className="block text-xs font-semibold text-[#1E293B] mb-1"
                >
                  Brand Name
                </label>
                <input
                  id="studio-brand-name"
                  type="text"
                  value={siteSettings.brandName}
                  onChange={(e) => updateSiteSettings({ brandName: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="studio-tagline"
                  className="block text-xs font-semibold text-[#1E293B] mb-1"
                >
                  Tagline
                </label>
                <input
                  id="studio-tagline"
                  type="text"
                  value={siteSettings.tagline}
                  onChange={(e) => updateSiteSettings({ tagline: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="studio-market"
                  className="block text-xs font-semibold text-[#1E293B] mb-1"
                >
                  Primary Market
                </label>
                <input
                  id="studio-market"
                  type="text"
                  value={siteSettings.primaryMarket}
                  onChange={(e) => updateSiteSettings({ primaryMarket: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="studio-site-url"
                  className="block text-xs font-semibold text-[#1E293B] mb-1"
                >
                  Canonical SITE_URL
                </label>
                <input
                  id="studio-site-url"
                  type="url"
                  value={siteSettings.canonicalSiteUrl}
                  onChange={(e) => updateSiteSettings({ canonicalSiteUrl: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: LAUNCH READINESS & SUBMISSIONS VAULT */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                Backend Integration &amp; Production Launch Checklist
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Honest verification of active server capabilities versus external cloud credentials requiring owner configuration in <code className="font-mono-tabular">.env</code> or Netlify Environment Variables prior to public launch.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#0A1633]">
                      Dynamic Server CMS Engine (/api/cms) &amp; Private CV Vault
                    </p>
                    <p className="text-[#475569]">
                      Active &amp; persisted on the backend. Supports live editing of all pages, jobs, team profiles, portraits, and articles plus restricted private CV storage.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm flex items-start gap-2.5">
                  {sysStatus?.integrations.supabaseConfigured ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-[#0A1633]">
                      Supabase Postgres &amp; Private Storage Bucket
                    </p>
                    <p className="text-[#475569]">
                      {sysStatus?.integrations.supabaseConfigured
                        ? 'Configured via environment variables.'
                        : 'Awaiting owner credentials: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_CV_BUCKET.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm flex items-start gap-2.5">
                  {sysStatus?.integrations.resendConfigured ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-[#0A1633]">
                      Resend Transactional Email Notifications
                    </p>
                    <p className="text-[#475569]">
                      {sysStatus?.integrations.resendConfigured
                        ? 'Configured via RESEND_API_KEY.'
                        : 'Awaiting owner credentials: RESEND_API_KEY, EMAIL_FROM, EMPLOYER_NOTIFICATION_EMAIL, CANDIDATE_NOTIFICATION_EMAIL.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#0A1633]">
                      Real Team Member Portraits (public/images/team/*.webp)
                    </p>
                    <p className="text-[#475569]">
                      Upload real portraits anytime in the &ldquo;Meet Our Team&rdquo; tab above.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrator Candidate Applications & Submissions Vault */}
            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-editorial text-xl font-semibold text-[#0A1633] inline-flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#1E3A8A]" />
                    <span>
                      Administrator Candidate Applications &amp; Submissions Vault (
                      {sysStatus?.submissionCount ?? 0})
                    </span>
                  </h3>
                  <p className="text-xs text-[#475569]">
                    Review submitted job applications, download authorized candidate CVs and supporting documents from restricted storage, update application status, and record consultant follow-up notes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={refreshSystemStatus}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] bg-[#F8FAFC] border border-[#1E3A8A]/30 rounded-sm hover:bg-[#EFF6FF]"
                >
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Refresh Vault</span>
                </button>
              </div>

              {sysStatus && sysStatus.recentSubmissions.length > 0 ? (
                <div className="space-y-4 text-xs">
                  {sysStatus.recentSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-mono-tabular text-[11px] font-semibold px-2 py-0.5 bg-[#1E3A8A] text-[#F8FAFC] rounded-sm">
                              {sub.type}
                            </span>
                            {sub.jobReference && (
                              <span className="font-mono-tabular text-[11px] font-semibold px-2 py-0.5 bg-[#0A1633] text-[#FDE047] rounded-sm">
                                {sub.jobReference}
                              </span>
                            )}
                            <span className="font-mono-tabular text-[#475569]">
                              {new Date(sub.submittedAt).toLocaleString()}
                            </span>
                          </div>
                          <h4 className="font-editorial text-lg font-semibold text-[#0A1633]">
                            {sub.summaryLabel}
                          </h4>
                          <p className="text-xs text-[#1E293B]">
                            Contact: <strong className="font-mono-tabular">{sub.contactEmail}</strong>
                            {sub.phone ? ` · Phone: ${sub.phone}` : ''}
                            {sub.currentLocation ? ` · Location: ${sub.currentLocation}` : ''}
                            {sub.preferredArrangement
                              ? ` · Preferred: ${sub.preferredArrangement}`
                              : ''}
                          </p>
                          {sub.salaryExpectations && (
                            <p className="text-xs text-[#1E293B] mt-0.5">
                              Salary Expectations: <strong>{sub.salaryExpectations}</strong>
                            </p>
                          )}
                          {sub.candidateFeedback && (
                            <p className="text-xs text-[#1E293B] mt-1 bg-white p-2 border border-[#CBD5E1] rounded-sm">
                              <strong>Candidate Feedback / Notes:</strong> {sub.candidateFeedback}
                            </p>
                          )}
                          {sub.coverLetter && (
                            <p className="text-xs text-[#475569] mt-1 bg-white p-2 border border-[#CBD5E1] rounded-sm">
                              <strong>Cover Letter:</strong> {sub.coverLetter}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={`status-${sub.id}`}
                              className="text-[11px] font-semibold text-[#1E293B]"
                            >
                              Status:
                            </label>
                            <select
                              id={`status-${sub.id}`}
                              value={sub.applicationStatus || 'New Application'}
                              onChange={(e) =>
                                handleUpdateSubmissionAdminRecord(sub.id, {
                                  applicationStatus:
                                    e.target.value as SubmissionVaultItem['applicationStatus'],
                                })
                              }
                              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-[#1E3A8A] rounded-sm"
                            >
                              <option value="New Application">New Application</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Consultant Interview">Consultant Interview</option>
                              <option value="Placed">Placed</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {sub.privateCvKey && (
                              <a
                                href={`/api/admin/documents/${encodeURIComponent(sub.privateCvKey)}?admin=1`}
                                download
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm"
                              >
                                Download Authorized CV ({sub.privateCvFileName || 'CV'})
                              </a>
                            )}
                            {sub.privateSupportingDocKey && (
                              <a
                                href={`/api/admin/documents/${encodeURIComponent(sub.privateSupportingDocKey)}?admin=1`}
                                download
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm"
                              >
                                Download Supporting Document (
                                {sub.privateSupportingDocFileName || 'Attachment'})
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Follow-up notes editor */}
                      <div className="pt-2 border-t border-[#CBD5E1] flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                        <input
                          type="text"
                          value={noteDrafts[sub.id] ?? sub.adminNotes ?? ''}
                          onChange={(e) =>
                            setNoteDrafts((prev) => ({ ...prev, [sub.id]: e.target.value }))
                          }
                          placeholder="Add administrator follow-up notes, interview takeaways, or availability checks..."
                          aria-label={`Follow-up notes for ${sub.summaryLabel}`}
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded-sm"
                        />
                        <button
                          type="button"
                          disabled={savingSubId === sub.id}
                          onClick={() =>
                            handleUpdateSubmissionAdminRecord(sub.id, {
                              adminNotes: noteDrafts[sub.id] ?? sub.adminNotes ?? '',
                            })
                          }
                          className="px-3.5 py-1.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm shrink-0"
                        >
                          {savingSubId === sub.id ? 'Saving...' : 'Save Follow-Up Note'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#475569]">
                  No form submissions recorded in this session yet. Submit any application or form on the site to see real-time backend persistence here.
                </p>
              )}
            </div>

            {/* Automated Email Outbox Log (Administrator & Candidate Notifications) */}
            <div className="p-5 bg-white border border-[#CBD5E1] rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                  Automated Email Dispatch Outbox ({sysStatus?.emailOutbox?.length ?? 0})
                </h3>
                <span className="text-xs font-mono-tabular text-[#475569]">
                  Administrator &amp; Candidate Confirmation Log
                </span>
              </div>
              <p className="text-xs text-[#475569]">
                Every opportunity application dispatches a new-application notification to the designated business email (<code className="font-mono-tabular">[INSERT BUSINESS EMAIL ADDRESS]</code> / configured inbox) and an immediate confirmation email to the candidate.
              </p>

              {sysStatus?.emailOutbox && sysStatus.emailOutbox.length > 0 ? (
                <div className="space-y-2.5 text-xs">
                  {sysStatus.emailOutbox.map((mail) => (
                    <div
                      key={mail.id}
                      className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-1"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                          [{mail.recipientType.toUpperCase()} EMAIL] To: {mail.to}
                        </span>
                        <span className="font-mono-tabular text-[#475569]">
                          {new Date(mail.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-semibold text-[#0A1633]">Subject: {mail.subject}</p>
                      <pre className="text-[11px] text-[#1E293B] whitespace-pre-wrap font-sans bg-white p-2 border border-[#CBD5E1] rounded-sm">
                        {mail.body}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#475569]">
                  No automated emails dispatched yet. Submit an opportunity application to inspect the administrator and candidate email dispatches.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isStandalonePage) {
    return <div className="bg-[#F8FAFC] py-6 px-4">{studioContent}</div>;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dynamic Content and Launch Readiness Studio"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
    >
      {studioContent}
    </div>
  );
};
