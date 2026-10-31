import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_PAGES,
  INITIAL_TEAM_MEMBERS,
  INITIAL_INSIGHT_ARTICLES,
  INITIAL_JOBS,
  INITIAL_JOB_IMPORT_REPORT,
  DISCIPLINE_EXPERTISE_CARDS,
  HOME_EMPLOYER_SERVICES,
  SEARCH_PROCESS_STAGES,
  DETAILED_INDUSTRIES,
  type SiteSettingsConfig,
  type PageContentRecord,
  type TeamMemberRecord,
  type InsightArticleRecord,
  type DisciplineExpertiseCard,
  type EmployerServiceBlock,
  type SearchStageRecord,
  type DetailedIndustrySection,
  type InternalCareerOpening,
  type FullCmsStore,
} from '../data/siteContent';
import { type JobListingRecord, type JobImportReport } from '../utils/validation';
import { ONE_TWENTY_VACANCY_LEADS, mergeJobsIdempotently } from '../data/oneTwentyVacancyLeads';

interface SiteContentContextValue {
  siteSettings: SiteSettingsConfig;
  pages: PageContentRecord[];
  teamMembers: TeamMemberRecord[];
  articles: InsightArticleRecord[];
  jobs: JobListingRecord[];
  jobImportReport: JobImportReport;
  disciplineCards: DisciplineExpertiseCard[];
  employerServices: EmployerServiceBlock[];
  searchStages: SearchStageRecord[];
  industries: DetailedIndustrySection[];
  internalCareerOpenings: InternalCareerOpening[];
  cmsUpdatedAt: string;
  cmsSyncing: boolean;
  isSyncing?: boolean;
  lastSavedAt?: string;
  referenceDateIso: string;
  setReferenceDateIso: (dateIso: string) => void;
  getPageConfig: (slug: string) => PageContentRecord;
  updateSiteSettings: (next: Partial<SiteSettingsConfig>) => Promise<void>;
  updatePageConfig: (slug: string, next: Partial<PageContentRecord>) => Promise<void>;
  updateTeamMember: (slug: string, next: Partial<TeamMemberRecord>) => Promise<void>;
  updateJob: (id: string, next: Partial<JobListingRecord>, auditAction?: string) => Promise<void>;
  bulkUpdateJobs: (
    ids: string[],
    next: Partial<JobListingRecord>,
    auditAction?: string
  ) => Promise<void>;
  runIdempotentJobImport: () => Promise<JobImportReport>;
  addJob: (job: JobListingRecord) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateArticle: (slug: string, next: Partial<InsightArticleRecord>) => Promise<void>;
  addArticle: (article: InsightArticleRecord) => Promise<void>;
  deleteArticle: (slug: string) => Promise<void>;
  updateDisciplineCard: (id: string, next: Partial<DisciplineExpertiseCard>) => Promise<void>;
  updateEmployerService: (id: string, next: Partial<EmployerServiceBlock>) => Promise<void>;
  updateSearchStage: (step: string, next: Partial<SearchStageRecord>) => Promise<void>;
  addInternalCareerOpening: (opening: InternalCareerOpening) => Promise<void>;
  deleteInternalCareerOpening: (id: string) => Promise<void>;
  resetAllContentToDefaults: () => Promise<void>;
}

const STORAGE_KEY = 'acs_dynamic_content_v6';

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsConfig>(INITIAL_SITE_SETTINGS);
  const [pages, setPages] = useState<PageContentRecord[]>(INITIAL_PAGES);
  const [teamMembers, setTeamMembers] = useState<TeamMemberRecord[]>(INITIAL_TEAM_MEMBERS);
  const [articles, setArticles] = useState<InsightArticleRecord[]>(INITIAL_INSIGHT_ARTICLES);
  const [jobs, setJobs] = useState<JobListingRecord[]>(INITIAL_JOBS);
  const [jobImportReport, setJobImportReport] = useState<JobImportReport>(INITIAL_JOB_IMPORT_REPORT);
  const [disciplineCards, setDisciplineCards] = useState<DisciplineExpertiseCard[]>(DISCIPLINE_EXPERTISE_CARDS);
  const [employerServices, setEmployerServices] = useState<EmployerServiceBlock[]>(HOME_EMPLOYER_SERVICES);
  const [searchStages, setSearchStages] = useState<SearchStageRecord[]>(SEARCH_PROCESS_STAGES);
  const [industries, setIndustries] = useState<DetailedIndustrySection[]>(DETAILED_INDUSTRIES);
  const [internalCareerOpenings, setInternalCareerOpenings] = useState<InternalCareerOpening[]>([]);
  const [cmsUpdatedAt, setCmsUpdatedAt] = useState<string>(() => new Date().toISOString());
  const [cmsSyncing, setCmsSyncing] = useState<boolean>(false);
  const [referenceDateIso, setReferenceDateIso] = useState<string>('2026-10-29');

  const applyStoreState = useCallback((store: Partial<FullCmsStore>) => {
    if (store.siteSettings) setSiteSettings({ ...INITIAL_SITE_SETTINGS, ...store.siteSettings });
    if (Array.isArray(store.pages) && store.pages.length > 0) setPages(store.pages);
    if (Array.isArray(store.teamMembers) && store.teamMembers.length > 0) setTeamMembers(store.teamMembers);
    if (Array.isArray(store.articles) && store.articles.length > 0) {
      const existingSlugs = new Set(store.articles.map((a) => a.slug));
      const missingDefaults = INITIAL_INSIGHT_ARTICLES.filter((a) => !existingSlugs.has(a.slug));
      setArticles([...missingDefaults, ...store.articles]);
    }
    if (Array.isArray(store.jobs) && store.jobs.length > 0) {
      const hasAll120Leads =
        store.jobs.filter((j) => typeof j.leadNumber === 'number').length >= 120;
      if (hasAll120Leads) {
        setJobs(store.jobs);
        if (store.jobImportReport) {
          setJobImportReport(store.jobImportReport);
        }
      } else {
        const merged = mergeJobsIdempotently(store.jobs, ONE_TWENTY_VACANCY_LEADS);
        setJobs(merged.jobs);
        setJobImportReport(merged.report);
      }
    }
    if (Array.isArray(store.disciplineCards) && store.disciplineCards.length > 0) {
      setDisciplineCards(store.disciplineCards);
    }
    if (Array.isArray(store.employerServices) && store.employerServices.length > 0) {
      setEmployerServices(store.employerServices);
    }
    if (Array.isArray(store.searchStages) && store.searchStages.length > 0) {
      setSearchStages(store.searchStages);
    }
    if (Array.isArray(store.industries) && store.industries.length > 0) {
      setIndustries(store.industries);
    }
    if (Array.isArray(store.internalCareerOpenings)) {
      setInternalCareerOpenings(store.internalCareerOpenings);
    }
    if (store.updatedAt) setCmsUpdatedAt(store.updatedAt);
  }, []);

  // Load live CMS state from backend API on mount
  useEffect(() => {
    let active = true;
    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.ok && data.store) {
          applyStoreState(data.store);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.store));
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {
        // Fallback to localStorage if backend unreachable
        try {
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached && active) {
            applyStoreState(JSON.parse(cached));
          }
        } catch {
          // ignore
        }
      });
    return () => {
      active = false;
    };
  }, [applyStoreState]);

  const syncToBackend = async (patch: Partial<FullCmsStore>) => {
    setCmsSyncing(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (data?.ok && data.store) {
        applyStoreState(data.store);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.store));
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore network error in static preview
    } finally {
      setCmsSyncing(false);
    }
  };

  const getPageConfig = useCallback(
    (slug: string): PageContentRecord => {
      const found = pages.find((p) => p.slug === slug);
      if (found) return found;
      const fallback = INITIAL_PAGES.find((p) => p.slug === slug) || INITIAL_PAGES[0];
      return fallback;
    },
    [pages]
  );

  const updateSiteSettings = async (next: Partial<SiteSettingsConfig>) => {
    const updated = { ...siteSettings, ...next };
    setSiteSettings(updated);
    await syncToBackend({ siteSettings: updated });
  };

  const updatePageConfig = async (slug: string, next: Partial<PageContentRecord>) => {
    const updated = pages.map((p) => (p.slug === slug ? { ...p, ...next } : p));
    setPages(updated);
    await syncToBackend({ pages: updated });
  };

  const updateTeamMember = async (slug: string, next: Partial<TeamMemberRecord>) => {
    const updated = teamMembers.map((m) => (m.slug === slug ? { ...m, ...next } : m));
    setTeamMembers(updated);
    await syncToBackend({ teamMembers: updated });
  };

  const updateJob = async (
    id: string,
    next: Partial<JobListingRecord>,
    auditAction?: string
  ) => {
    const nowIso = new Date().toISOString();
    const updated = jobs.map((j) => {
      if (j.id !== id) return j;
      const nextStatus = next.status ?? j.status;
      const isNowActive = nextStatus === 'active' || next.verificationStatus === 'verified';
      const nextVerificationStatus =
        next.verificationStatus ??
        (nextStatus === 'active'
          ? 'verified'
          : nextStatus === 'draft'
          ? 'draft'
          : nextStatus === 'closed' || nextStatus === 'filled' || nextStatus === 'paused'
          ? 'archived'
          : j.verificationStatus || 'verificationRequired');

      const logEntry = {
        timestamp: nowIso,
        actor: next.verifiedBy || j.verifiedBy || 'Administrator',
        action:
          auditAction ||
          (next.status && next.status !== j.status
            ? `Status updated from ${j.status} to ${next.status}`
            : `Updated listing fields (${Object.keys(next).join(', ')})`),
      };

      return {
        ...j,
        ...next,
        verificationStatus: nextVerificationStatus,
        lastVerifiedAt:
          next.lastVerifiedAt !== undefined
            ? next.lastVerifiedAt
            : isNowActive && !j.lastVerifiedAt
            ? nowIso.slice(0, 10)
            : j.lastVerifiedAt,
        verifiedBy:
          next.verifiedBy !== undefined
            ? next.verifiedBy
            : isNowActive && !j.verifiedBy
            ? 'Designated Administrator'
            : j.verifiedBy,
        updatedAt: nowIso,
        auditLog: [logEntry, ...(j.auditLog || []).slice(0, 19)],
      };
    });
    setJobs(updated);
    await syncToBackend({ jobs: updated });
  };

  const bulkUpdateJobs = async (
    ids: string[],
    next: Partial<JobListingRecord>,
    auditAction?: string
  ) => {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    const nowIso = new Date().toISOString();
    const updated = jobs.map((j) => {
      if (!idSet.has(j.id)) return j;
      const nextStatus = next.status ?? j.status;
      const isNowActive = nextStatus === 'active' || next.verificationStatus === 'verified';
      const nextVerificationStatus =
        next.verificationStatus ??
        (nextStatus === 'active'
          ? 'verified'
          : nextStatus === 'draft'
          ? 'draft'
          : nextStatus === 'closed' || nextStatus === 'filled' || nextStatus === 'paused'
          ? 'archived'
          : j.verificationStatus || 'verificationRequired');

      const logEntry = {
        timestamp: nowIso,
        actor: next.verifiedBy || j.verifiedBy || 'Designated Administrator',
        action: auditAction || `Bulk update applied (${nextStatus})`,
      };

      return {
        ...j,
        ...next,
        verificationStatus: nextVerificationStatus,
        lastVerifiedAt:
          next.lastVerifiedAt !== undefined
            ? next.lastVerifiedAt
            : isNowActive
            ? nowIso.slice(0, 10)
            : j.lastVerifiedAt,
        verifiedBy:
          next.verifiedBy !== undefined
            ? next.verifiedBy
            : isNowActive
            ? 'Designated Administrator'
            : j.verifiedBy,
        updatedAt: nowIso,
        auditLog: [logEntry, ...(j.auditLog || []).slice(0, 19)],
      };
    });
    setJobs(updated);
    await syncToBackend({ jobs: updated });
  };

  const runIdempotentJobImport = async (): Promise<JobImportReport> => {
    const merged = mergeJobsIdempotently(jobs, ONE_TWENTY_VACANCY_LEADS);
    setJobs(merged.jobs);
    setJobImportReport(merged.report);
    await syncToBackend({ jobs: merged.jobs, jobImportReport: merged.report });
    return merged.report;
  };

  const addJob = async (job: JobListingRecord) => {
    const updated = [job, ...jobs];
    setJobs(updated);
    await syncToBackend({ jobs: updated });
  };

  const deleteJob = async (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    await syncToBackend({ jobs: updated });
  };

  const updateArticle = async (slug: string, next: Partial<InsightArticleRecord>) => {
    const updated = articles.map((a) => (a.slug === slug ? { ...a, ...next } : a));
    setArticles(updated);
    await syncToBackend({ articles: updated });
  };

  const addArticle = async (article: InsightArticleRecord) => {
    const updated = [article, ...articles];
    setArticles(updated);
    await syncToBackend({ articles: updated });
  };

  const deleteArticle = async (slug: string) => {
    const updated = articles.filter((a) => a.slug !== slug);
    setArticles(updated);
    await syncToBackend({ articles: updated });
  };

  const updateDisciplineCard = async (id: string, next: Partial<DisciplineExpertiseCard>) => {
    const updated = disciplineCards.map((c) => (c.id === id ? { ...c, ...next } : c));
    setDisciplineCards(updated);
    await syncToBackend({ disciplineCards: updated });
  };

  const updateEmployerService = async (id: string, next: Partial<EmployerServiceBlock>) => {
    const updated = employerServices.map((s) => (s.id === id ? { ...s, ...next } : s));
    setEmployerServices(updated);
    await syncToBackend({ employerServices: updated });
  };

  const updateSearchStage = async (step: string, next: Partial<SearchStageRecord>) => {
    const updated = searchStages.map((s) => (s.step === step ? { ...s, ...next } : s));
    setSearchStages(updated);
    await syncToBackend({ searchStages: updated });
  };

  const addInternalCareerOpening = async (opening: InternalCareerOpening) => {
    const updated = [opening, ...internalCareerOpenings];
    setInternalCareerOpenings(updated);
    await syncToBackend({ internalCareerOpenings: updated });
  };

  const deleteInternalCareerOpening = async (id: string) => {
    const updated = internalCareerOpenings.filter((o) => o.id !== id);
    setInternalCareerOpenings(updated);
    await syncToBackend({ internalCareerOpenings: updated });
  };

  const resetAllContentToDefaults = async () => {
    setCmsSyncing(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
      const res = await fetch('/api/cms/reset', { method: 'POST' });
      const data = await res.json();
      if (data?.ok && data.store) {
        applyStoreState(data.store);
      }
    } catch {
      setSiteSettings(INITIAL_SITE_SETTINGS);
      setPages(INITIAL_PAGES);
      setTeamMembers(INITIAL_TEAM_MEMBERS);
      setArticles(INITIAL_INSIGHT_ARTICLES);
      setJobs(INITIAL_JOBS);
      setJobImportReport(INITIAL_JOB_IMPORT_REPORT);
      setDisciplineCards(DISCIPLINE_EXPERTISE_CARDS);
      setEmployerServices(HOME_EMPLOYER_SERVICES);
      setSearchStages(SEARCH_PROCESS_STAGES);
      setIndustries(DETAILED_INDUSTRIES);
      setInternalCareerOpenings([]);
    } finally {
      setReferenceDateIso('2026-10-29');
      setCmsSyncing(false);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        siteSettings,
        pages,
        teamMembers,
        articles,
        jobs,
        jobImportReport,
        disciplineCards,
        employerServices,
        searchStages,
        industries,
        internalCareerOpenings,
        cmsUpdatedAt,
        cmsSyncing,
        isSyncing: cmsSyncing,
        lastSavedAt: cmsUpdatedAt,
        referenceDateIso,
        setReferenceDateIso,
        getPageConfig,
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
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return ctx;
}
