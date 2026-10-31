import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowLeft,
  MapPin,
  Briefcase,
  Building2,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import {
  filterAndSortJobs,
  isJobVerifiedActive,
  hasVerifiedExternalApplicationUrl,
  type JobListingRecord,
} from '../utils/validation';
import { OpportunityApplicationForm } from './Forms';
import { DynamicTypewriter, DynamicSpotlightCarousel } from './DynamicMotionElements';

interface JobsBoardViewProps {
  selectedJobSlug?: string;
  onNavigate: (path: string) => void;
}

const INITIAL_VISIBLE_JOBS = 6;
const LOAD_MORE_STEP = 6;

export const JobsBoardView: React.FC<JobsBoardViewProps> = ({ selectedJobSlug, onNavigate }) => {
  const { jobs, referenceDateIso, getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/jobs');

  const [keyword, setKeyword] = useState('');
  const [employerFilter, setEmployerFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [seniorityFilter, setSeniorityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [workplaceFilter, setWorkplaceFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'reference' | 'relevance' | 'newest'>('reference');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_JOBS);

  const [applyModalJob, setApplyModalJob] = useState<JobListingRecord | null>(null);

  // Reset visible count to 6 whenever any search or filter criterion changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_JOBS);
  }, [
    keyword,
    employerFilter,
    industryFilter,
    seniorityFilter,
    locationFilter,
    workplaceFilter,
    salaryFilter,
    sortBy,
  ]);

  const uniqueEmployers = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.employer))).sort(),
    [jobs]
  );
  const uniqueIndustries = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category || j.industry))).sort(),
    [jobs]
  );
  const uniqueSeniorities = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.seniority))).sort(),
    [jobs]
  );
  const uniqueLocations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location))).sort(),
    [jobs]
  );

  const handleClearFilters = () => {
    setKeyword('');
    setEmployerFilter('all');
    setIndustryFilter('all');
    setSeniorityFilter('all');
    setLocationFilter('all');
    setWorkplaceFilter('all');
    setSalaryFilter('all');
    setSortBy('reference');
    setVisibleCount(INITIAL_VISIBLE_JOBS);
  };

  // If a specific job slug or jobReference is selected, render the Unique Role Detail Page
  if (selectedJobSlug) {
    const normalizedSlug = selectedJobSlug.toLowerCase();
    const job = jobs.find(
      (j) =>
        j.slug.toLowerCase() === normalizedSlug ||
        (j.jobReference && j.jobReference.toLowerCase() === normalizedSlug) ||
        j.id.toLowerCase() === normalizedSlug
    );

    if (!job) {
      return (
        <div className="max-w-[1280px] mx-auto px-6 py-20 space-y-6">
          <h1 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
            Opportunity Profile Not Found
          </h1>
          <p className="text-base text-[#475569]">
            The requested opportunity profile could not be found in the catalogue.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/jobs')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Executive Opportunity Search</span>
          </button>
        </div>
      );
    }

    const refCode = job.jobReference || job.id.toUpperCase();
    const isVerified = isJobVerifiedActive(job);
    const hasExternalUrl = hasVerifiedExternalApplicationUrl(job);
    const externalUrl = (job.applicationUrl || job.officialApplyUrl || '').trim();
    const categoryLabel = job.category || job.industry;
    const arrangementLabel = job.workArrangement || job.workplaceType;
    const salaryDisplayLabel = job.salaryDisclosed ? job.salaryText : 'Salary not disclosed';

    return (
      <div className="bg-[#F8FAFC]/82 min-h-screen">
        {/* Top Back Navigation & Header with Full-Bleed Background Photograph */}
        <div className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-12 border-b border-[#FACC15]/30">
          <img
            src={
              pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
                ? pageConfig.heroImage
                : '/src/assets/images/regenerated_image_1793268848419.jpg'
            }
            alt="Selected senior leadership and specialist vacancies"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 space-y-5">
            <button
              type="button"
              onClick={() => onNavigate('/jobs')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FDE047] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Executive Opportunity Search</span>
            </button>

            <div className="space-y-3">
              {/* Verification Status Banner */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="font-mono-tabular font-semibold text-[#FDE047]">{refCode}</span>
                <span aria-hidden="true" className="text-[#FDE047]">·</span>
                <span className="text-[#FDE047]">Employer: {job.employer}</span>
                <span aria-hidden="true" className="text-[#FDE047]">·</span>
                <span className="text-[#FDE047]">{categoryLabel}</span>
                <span aria-hidden="true" className="text-[#FDE047]">·</span>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Verified Active Listing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-[#082F49] border border-[#FACC15] font-bold">
                    <AlertCircle className="w-3.5 h-3.5 text-[#0369A1]" aria-hidden="true" />
                    Job information awaiting verification
                  </span>
                )}
              </div>

              <h1 className="font-editorial text-3xl md:text-5xl font-semibold text-[#F8FAFC] max-w-4xl">
                {job.title} — {job.employer}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[#F8FAFC]/90 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FACC15]" aria-hidden="true" />
                  {job.location} ({arrangementLabel})
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                  Employment Type: {job.employmentType}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  Salary: {salaryDisplayLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Full Profile Details & Separated On-Site CV Registration */}
          <div className="lg:col-span-2 space-y-8">
            {!isVerified && (
              <div
                role="status"
                className="p-4 bg-[#FEF9C3] border border-[#38BDF8] rounded-xl flex items-start gap-3 text-xs md:text-sm text-[#082F49]"
              >
                <AlertCircle className="w-5 h-5 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="font-bold text-[#082F49]">Job information awaiting verification</p>
                  <p className="text-[#1E293B]">
                    This opportunity profile is currently stored as an editorial vacancy lead draft pending administrator verification of live employer availability, compensation, and direct application link.
                  </p>
                </div>
              </div>
            )}

            <section className="p-8 bg-white border border-[#CBD5E1] rounded-sm space-y-6">
              {job.companyOverview && (
                <div className="space-y-2 border-b border-[#EFF6FF] pb-5">
                  <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                    Company Overview ({job.employer})
                  </h2>
                  <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
                    {job.companyOverview}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  Role Overview
                </h2>
                <p className="text-base text-[#1E293B] leading-relaxed">
                  {job.roleOverview || job.summary}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#EFF6FF]">
                <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  Key Responsibilities
                </h2>
                <ul className="space-y-2.5 text-sm md:text-base text-[#1E293B]">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#1E3A8A] font-mono-tabular font-semibold mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#EFF6FF]">
                <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  Required Experience &amp; Qualifications
                </h2>
                <ul className="space-y-2.5 text-sm md:text-base text-[#1E293B]">
                  {job.qualifications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#EAB308] font-semibold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#EFF6FF] text-xs text-[#475569] space-y-1.5">
                <p>
                  <strong>Job Reference:</strong>{' '}
                  <span className="font-mono-tabular font-semibold text-[#0A1633]">{refCode}</span>
                </p>
                <p>
                  <strong>Industry Category:</strong> {categoryLabel}
                </p>
                <p>
                  <strong>Employment Type &amp; Work Arrangement:</strong> {job.employmentType} ·{' '}
                  {arrangementLabel}
                </p>
                <p>
                  <strong>Salary / Compensation:</strong> {salaryDisplayLabel}
                </p>
                {job.vacancyReference && (
                  <p>
                    <strong>Vacancy Reference Note:</strong> {job.vacancyReference}
                  </p>
                )}
              </div>
            </section>

            {/* Clearly Separated Alexanders Career Strategy Candidate CV / Interest Registration */}
            <div id="apply-form" className="space-y-3">
              <div className="p-4 bg-[#E0F2FE] border border-[#7DD3FC] rounded-xl text-xs text-[#082F49]">
                <strong>Alexanders Career Strategy Candidate Advisory &amp; CV Registration:</strong>{' '}
                Separate from any direct employer portal link, you may submit your executive profile or optional CV to Alexanders Career Strategy below regarding reference{' '}
                <span className="font-mono-tabular font-bold">{refCode}</span>.
              </div>
              <OpportunityApplicationForm
                jobReference={refCode}
                jobTitle={job.title}
                targetEmployer={job.employer}
                defaultArrangement={arrangementLabel}
                onNavigate={onNavigate}
              />
            </div>
          </div>

          {/* Right Column: Application Information & Summary */}
          <aside className="space-y-6">
            <div className="p-6 bg-white border border-[#CBD5E1] rounded-sm space-y-5 sticky top-24">
              <div className="space-y-1 border-b border-[#EFF6FF] pb-4">
                <p className="text-xs font-mono-tabular font-semibold text-[#1E3A8A]">
                  REFERENCE: {refCode}
                </p>
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  Application Information
                </h3>
              </div>

              {/* Employer Direct Application Status vs Separated On-Site Registration */}
              <div className="space-y-3">
                {isVerified && hasExternalUrl ? (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs md:text-sm font-bold text-[#F8FAFC] bg-[#0369A1] hover:bg-[#082F49] rounded-full transition-colors text-center shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Apply on Employer Website</span>
                  </a>
                ) : (
                  <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-center space-y-1">
                    <p className="text-xs font-bold text-[#082F49]">
                      Application details coming soon
                    </p>
                    <p className="text-[11px] text-[#475569]">
                      Direct employer application URL is awaiting verification.
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-[#EFF6FF] space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0369A1]">
                    Alexanders Career Strategy Representation
                  </p>
                  <a
                    href="#apply-form"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-colors text-center"
                  >
                    <FileText className="w-4 h-4 shrink-0 text-[#0369A1]" aria-hidden="true" />
                    <span>Register CV with Alexanders ({refCode})</span>
                  </a>
                </div>
              </div>

              <dl className="pt-4 border-t border-[#EFF6FF] space-y-2.5 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Status:</dt>
                  <dd className="font-semibold text-[#082F49] text-right">
                    {isVerified ? 'Verified Active' : 'Job information awaiting verification'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Job Reference:</dt>
                  <dd className="font-mono-tabular font-semibold text-[#1E3A8A] text-right">
                    {refCode}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Employer:</dt>
                  <dd className="font-medium text-[#0A1633] text-right">{job.employer}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Category:</dt>
                  <dd className="font-medium text-[#0A1633] text-right">{categoryLabel}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Employment Type:</dt>
                  <dd className="font-medium text-[#0A1633] text-right">{job.employmentType}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Location:</dt>
                  <dd className="font-medium text-[#0A1633] text-right">{job.location}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Arrangement:</dt>
                  <dd className="font-medium text-[#0A1633] text-right">{arrangementLabel}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#475569]">Salary:</dt>
                  <dd className="font-mono-tabular text-[#0A1633] text-right">
                    {salaryDisplayLabel}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Main Opportunities Directory — Filter across the complete database
  const filteredJobs = filterAndSortJobs(
    jobs,
    {
      keyword,
      employer: employerFilter,
      industry: industryFilter,
      seniority: seniorityFilter,
      location: locationFilter,
      workplaceType: workplaceFilter,
      salaryRange: salaryFilter,
      includeExpired: true,
      includeArchived: false,
      sortBy,
    },
    referenceDateIso
  );

  // Always show 6 cards initially and reveal +6 on each "Show More" click
  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMoreJobs = visibleCount < filteredJobs.length;
  const shownCount = Math.min(visibleCount, filteredJobs.length);

  const rawHeroKicker = pageConfig?.heroKicker || 'Executive & Specialist Opportunity Search';
  const safeHeroKicker = rawHeroKicker.includes('100')
    ? 'Executive & Specialist Opportunity Search'
    : rawHeroKicker;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE]/82 via-[#FFFFFF]/82 to-[#FEF08A]/82">
      {/* Hero Header with Full-Bleed Background Photograph */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#BAE6FD] via-[#FFFFFF] to-[#FEF08A] text-[#082F49] py-14 border-b border-[#7DD3FC]">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : '/src/assets/images/regenerated_image_1793268848419.jpg'
          }
          alt="Selected senior leadership and specialist vacancies"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#BAE6FD]/90 via-[#FFFFFF]/84 to-[#FEF08A]/86 backdrop-blur-[1px]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 space-y-4">
          <p className="text-xs md:text-sm font-extrabold tracking-[0.22em] uppercase text-[#0369A1]">
            {safeHeroKicker}
          </p>
          <h1 className="font-editorial text-3xl md:text-5xl font-bold text-[#082F49]">
            {pageConfig?.heroHeading || 'Executive Search Opportunity Profiles'}
          </h1>
          <div>
            <DynamicTypewriter
              variant="light-blue-badge"
              prefix="EXECUTIVE SEARCH"
              phrases={[
                '120+ U.S. Executive & Senior-Level Vacancy Leads',
                'C-Suite · EVP · SVP · Vice President · Director Mandates',
                'Technology · Healthcare · Biopharma · Finance · Supply Chain',
                'Search, Filter & Explore 6 Opportunities at a Time',
              ]}
            />
          </div>
        </div>
      </section>

      <DynamicSpotlightCarousel onNavigate={onNavigate} />

      <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">
        {/* Comprehensive Search & Filters Panel */}
        <section
          aria-label="Search and filter executive opportunity profiles"
          className="p-6 bg-white border border-[#7DD3FC] rounded-2xl shadow-md space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="jobs-keyword-search" className="sr-only">
                Search by title, reference number, employer, or keyword
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#0369A1] absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="jobs-keyword-search"
                  type="search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search by job title, reference (e.g. ACS-LEAD-001), employer, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-full focus:outline-none focus:border-[#0369A1]"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2.5 text-xs md:text-sm font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-colors whitespace-nowrap cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pt-3 border-t border-[#E0F2FE]">
            <div>
              <label htmlFor="filter-employer" className="block text-[11px] font-bold text-[#0369A1] mb-1">
                Employer
              </label>
              <select
                id="filter-employer"
                value={employerFilter}
                onChange={(e) => setEmployerFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#F8FAFC] border border-[#7DD3FC] rounded-lg"
              >
                <option value="all">All Employers</option>
                {uniqueEmployers.map((emp) => (
                  <option key={emp} value={emp}>
                    {emp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-industry" className="block text-[11px] font-bold text-[#0369A1] mb-1">
                Category / Industry
              </label>
              <select
                id="filter-industry"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#F8FAFC] border border-[#7DD3FC] rounded-lg"
              >
                <option value="all">All Categories &amp; Industries</option>
                {uniqueIndustries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-seniority" className="block text-[11px] font-bold text-[#0369A1] mb-1">
                Seniority Level
              </label>
              <select
                id="filter-seniority"
                value={seniorityFilter}
                onChange={(e) => setSeniorityFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#F8FAFC] border border-[#7DD3FC] rounded-lg"
              >
                <option value="all">All Seniority Levels</option>
                {uniqueSeniorities.map((sen) => (
                  <option key={sen} value={sen}>
                    {sen}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-location" className="block text-[11px] font-bold text-[#0369A1] mb-1">
                Location
              </label>
              <select
                id="filter-location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#F8FAFC] border border-[#7DD3FC] rounded-lg"
              >
                <option value="all">All U.S. Locations</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-workplace" className="block text-[11px] font-bold text-[#0369A1] mb-1">
                Work Arrangement
              </label>
              <select
                id="filter-workplace"
                value={workplaceFilter}
                onChange={(e) => setWorkplaceFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#F8FAFC] border border-[#7DD3FC] rounded-lg"
              >
                <option value="all">All Arrangements</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label htmlFor="filter-salary" className="block text-[11px] font-bold text-[#0369A1] mb-1">
                Salary Availability
              </label>
              <select
                id="filter-salary"
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-[#F8FAFC] border border-[#7DD3FC] rounded-lg"
              >
                <option value="all">All Salary Profiles</option>
                <option value="disclosed">Published Range Available</option>
                <option value="300k_plus">$300,000+ Published Range</option>
                <option value="unconfirmed">Salary Not Disclosed</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E0F2FE] flex flex-wrap items-center justify-between gap-4 text-xs text-[#082F49]">
            <p
              data-testid="jobs-result-count"
              className="font-mono-tabular text-[#082F49] font-bold text-xs md:text-sm"
            >
              Showing {shownCount} of {filteredJobs.length} opportunities
            </p>
            <div className="inline-flex items-center gap-2">
              <label htmlFor="jobs-sort-select" className="font-semibold">
                Sort Order:
              </label>
              <select
                id="jobs-sort-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'reference' | 'relevance' | 'newest')
                }
                className="px-2.5 py-1 bg-[#F8FAFC] border border-[#7DD3FC] rounded-lg text-xs"
              >
                <option value="reference">Reference Code Order</option>
                <option value="relevance">Catalogue Order</option>
                <option value="newest">Newest Reported Date</option>
              </select>
            </div>
          </div>
        </section>

        {/* Opportunity Cards List (6 at a time) */}
        {visibleJobs.length === 0 ? (
          <div className="p-12 bg-white border border-[#7DD3FC] rounded-2xl text-center space-y-4">
            <h2 className="font-editorial text-2xl font-semibold text-[#082F49]">
              No opportunity profiles match your current filters.
            </h2>
            <p className="text-sm text-[#475569] max-w-lg mx-auto">
              Try clearing one or more filters or share your preferred role, compensation, and location with our team directly.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-6 py-2.5 text-xs font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div data-testid="jobs-card-list" className="grid grid-cols-1 gap-5">
              {visibleJobs.map((job, idx) => {
                const refCode = job.jobReference || job.id.toUpperCase();
                const isYellowCard = idx % 2 === 0;
                const isVerified = isJobVerifiedActive(job);
                const hasExternalUrl = hasVerifiedExternalApplicationUrl(job);
                const externalUrl = (job.applicationUrl || job.officialApplyUrl || '').trim();
                const categoryLabel = job.category || job.industry;
                const arrangementLabel = job.workArrangement || job.workplaceType;
                const salaryDisplayLabel = job.salaryDisclosed
                  ? job.salaryText
                  : 'Salary not disclosed';

                return (
                  <article
                    key={job.id}
                    data-testid="job-card"
                    className={`kinetic-card p-6 md:p-7 border border-[#7DD3FC] rounded-2xl shadow-md flex flex-col lg:flex-row items-start justify-between gap-6 ${
                      isYellowCard
                        ? 'bg-gradient-to-r from-[#FFFFFF] via-[#FEF9C3] to-[#E0F2FE] text-[#082F49]'
                        : 'bg-gradient-to-r from-[#FFFFFF] via-[#E0F2FE] to-[#FEF9C3] text-[#082F49]'
                    }`}
                  >
                    <div className="space-y-3 flex-1">
                      {/* Metadata Line */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#082F49]">
                        <span className="font-mono-tabular font-extrabold text-[#0369A1]">
                          {refCode}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-extrabold text-[#082F49] inline-flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-[#0369A1]" aria-hidden="true" />
                          {job.employer}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#0369A1]">{categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold">{job.seniority}</span>
                        {!isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 text-[#0369A1] border border-[#7DD3FC] text-[11px] font-bold">
                            <AlertCircle className="w-3 h-3 text-[#0369A1]" aria-hidden="true" />
                            Job information awaiting verification
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" aria-hidden="true" />
                            Verified Active
                          </span>
                        )}
                      </div>

                      <h2 className="font-editorial text-2xl md:text-3xl font-bold text-[#082F49]">
                        <a
                          href={`/jobs/${job.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/jobs/${job.slug}`);
                          }}
                          className="hover:underline transition-colors"
                        >
                          {job.title} — {job.employer}
                        </a>
                      </h2>

                      <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold text-[#082F49]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#7DD3FC]">
                          <MapPin className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                          {job.location} ({arrangementLabel})
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#7DD3FC]">
                          <Clock className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                          {job.employmentType}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono-tabular px-3 py-1 rounded-full bg-[#FEF08A] text-[#082F49] border border-[#38BDF8]/40">
                          <Briefcase className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                          Salary: {salaryDisplayLabel}
                        </span>
                      </div>

                      <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
                        {job.roleOverview || job.summary}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-2.5 pt-2 lg:pt-0 lg:border-l lg:border-[#7DD3FC] lg:pl-6">
                      <a
                        href={`/jobs/${job.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/jobs/${job.slug}`);
                        }}
                        className="w-full inline-flex items-center justify-center px-4 py-3 text-xs font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all text-center shadow-xs"
                      >
                        View Details
                      </a>

                      {isVerified && hasExternalUrl ? (
                        <a
                          href={externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#0369A1] hover:bg-[#082F49] rounded-full transition-all text-center shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>Apply on Employer Website</span>
                        </a>
                      ) : (
                        <span className="w-full inline-flex items-center justify-center px-4 py-2 text-[11px] font-semibold text-[#475569] bg-white/80 border border-[#CBD5E1] rounded-full text-center">
                          Application details coming soon
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => setApplyModalJob(job)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-[#0369A1] bg-white hover:bg-[#E0F2FE] border border-[#7DD3FC] rounded-full transition-all text-center cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0 text-[#0369A1]" aria-hidden="true" />
                        <span>Register CV ({refCode})</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Directly below the 6th visible card (and subsequent batches of 6): Show More button */}
            <div className="pt-2 pb-6 flex flex-col items-center justify-center gap-3 text-center">
              <p className="text-xs font-mono-tabular font-bold text-[#082F49]">
                Showing {shownCount} of {filteredJobs.length} opportunities
              </p>
              {hasMoreJobs ? (
                <button
                  type="button"
                  data-testid="show-more-jobs-btn"
                  onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-extrabold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border-2 border-[#0369A1] rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Show More</span>
                  <ChevronDown className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                </button>
              ) : (
                <p
                  data-testid="jobs-end-of-list"
                  className="text-xs font-semibold text-[#0369A1] bg-white/90 px-5 py-2 rounded-full border border-[#7DD3FC]"
                >
                  You’ve reached the end — all {filteredJobs.length} matching opportunities are displayed.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Alexanders Career Strategy Application Form */}
      {applyModalJob && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Apply for ${applyModalJob.title} (${applyModalJob.jobReference || applyModalJob.id})`}
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl my-8 bg-[#F8FAFC] rounded-sm border-2 border-[#FACC15] p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-3">
              <span className="text-xs font-mono-tabular font-semibold text-[#1E3A8A]">
                ALEXANDERS CAREER STRATEGY APPLICATION · {applyModalJob.jobReference || applyModalJob.id}
              </span>
              <button
                type="button"
                onClick={() => setApplyModalJob(null)}
                className="px-3 py-1 text-xs font-semibold text-[#0A1633] bg-[#CBD5E1] hover:bg-[#FACC15] rounded-sm cursor-pointer"
              >
                Close Application Window
              </button>
            </div>
            <OpportunityApplicationForm
              jobReference={applyModalJob.jobReference || applyModalJob.id}
              jobTitle={applyModalJob.title}
              targetEmployer={applyModalJob.employer}
              defaultArrangement={applyModalJob.workArrangement || applyModalJob.workplaceType}
              onNavigate={(p) => {
                setApplyModalJob(null);
                onNavigate(p);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
