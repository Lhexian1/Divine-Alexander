import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  FileText,
  ShieldCheck,
  Loader2,
  Building2,
  Briefcase,
  UserCheck,
  Compass,
} from 'lucide-react';
import {
  validateEmployerEnquiry,
  validateCandidateSubmission,
  validateContactEnquiry,
  validateCareerInterest,
  validateJobApplication,
  validateCvFile,
  type CvFileMetadata,
} from '../utils/validation';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = typeof reader.result === 'string' ? reader.result : '';
      const base64 = res.includes(',') ? res.split(',')[1] : res;
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// ============================================================================
// 1. EMPLOYER ENQUIRY FORM — Corporate Executive Search Mandate Brief
//    (Distinct Corporate Architecture for Hiring Organizations & Boards)
// ============================================================================
export const EmployerEnquiryForm: React.FC<{ onNavigate?: (path: string) => void }> = ({
  onNavigate,
}) => {
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [positionToFill, setPositionToFill] = useState('');
  const [seniorityLevel, setSeniorityLevel] = useState('');
  const [employmentLocation, setEmploymentLocation] = useState('');
  const [numberOfPositions, setNumberOfPositions] = useState('1');
  const [hiringTimeline, setHiringTimeline] = useState('Immediate (Within 30–60 days)');
  const [preferredEngagementModel, setPreferredEngagementModel] = useState(
    'Retained Executive Search'
  );
  const [preferredContactMethod, setPreferredContactMethod] = useState('Business Email');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    submissionId: string;
    notice?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload = {
      fullName,
      businessEmail,
      companyName,
      jobTitle,
      industry,
      positionToFill,
      seniorityLevel,
      employmentLocation,
      numberOfPositions,
      hiringTimeline,
      preferredEngagementModel,
      preferredContactMethod,
      additionalInfo,
      privacyAccepted,
      honeypot,
    };

    const validation = validateEmployerEnquiry(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      setServerError(
        'We could not submit your enquiry. Please review the required fields and try again.'
      );
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/submissions/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors || {});
        setServerError(
          data.message ||
            'We could not submit your enquiry. Please review the required fields and try again.'
        );
      } else {
        setSuccessData({
          message: data.message,
          submissionId: data.submissionId,
          notice: data.record?.configurationNotice,
        });
      }
    } catch {
      setServerError(
        'We could not submit your information right now. Please try again, or use the published contact method.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 bg-white border-2 border-[#1E3A8A] rounded-sm space-y-4"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Employer Enquiry Received
            </h3>
            <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
              {successData.message}
            </p>
            <p className="text-xs font-mono-tabular text-[#475569]">
              Reference ID: {successData.submissionId}
            </p>
            {successData.notice && (
              <p className="text-xs text-[#475569] bg-[#EFF6FF] p-3 border border-[#CBD5E1] rounded-sm">
                System note: {successData.notice}
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuccessData(null);
            setPositionToFill('');
            setAdditionalInfo('');
          }}
          className="px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm transition-colors cursor-pointer"
        >
          Submit Another Hiring Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border-2 border-[#082F49] rounded-sm overflow-hidden shadow-lg"
    >
      {/* Corporate Mandate Header Bar */}
      <div className="bg-gradient-to-r from-[#082F49] via-[#0F2350] to-[#1E3A8A] text-white p-6 md:p-8 border-b-4 border-[#FACC15]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] uppercase text-[#FEF08A]">
            <Building2 className="w-4 h-4" aria-hidden="true" />
            <span>CORPORATE HIRING MANDATE BRIEF · FOR EMPLOYERS &amp; BOARDS</span>
          </span>
          <span className="text-[11px] font-mono-tabular px-2.5 py-1 bg-white/10 border border-white/20 rounded-xs text-[#BAE6FD]">
            Direct Client Consultation
          </span>
        </div>
        <h3 className="font-editorial text-2xl md:text-3xl font-bold text-white">
          Tell Us About Your Hiring Needs
        </h3>
        <p className="text-xs sm:text-sm text-[#E0F2FE] leading-relaxed mt-2 max-w-3xl">
          Complete this organizational brief to specify the leadership or specialist position you are looking to fill, your preferred search model, and target hiring timeline.
        </p>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {serverError && (
          <div
            role="alert"
            className="p-4 bg-[#0A1633] text-[#F8FAFC] border border-[#FACC15] rounded-sm flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 text-[#FDE047] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Honeypot field hidden from human visitors */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="emp-company-website-hp">Leave this field blank</label>
          <input
            id="emp-company-website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Part A: Organization & Sponsoring Executive */}
        <div className="space-y-4">
          <div className="border-b border-[#7DD3FC] pb-2 flex items-center justify-between">
            <h4 className="font-editorial text-xl font-bold text-[#082F49]">
              Organization &amp; Sponsoring Executive
            </h4>
            <span className="text-xs font-semibold text-[#0369A1]">Client Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="emp-company-name" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Company / Organization Name *
              </label>
              <input
                id="emp-company-name"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
                placeholder="Organization name"
              />
              {errors.companyName && <p className="mt-1 text-xs text-red-700">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="emp-industry" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Industry Sector *
              </label>
              <select
                id="emp-industry"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
              >
                <option value="">Select Industry</option>
                <option value="Healthcare and Healthcare Technology">Healthcare &amp; Healthcare Technology</option>
                <option value="Pharmaceuticals and Biotechnology">Pharmaceuticals &amp; Biotechnology</option>
                <option value="Medical Devices and Life Sciences">Medical Devices &amp; Life Sciences</option>
                <option value="Procurement and Supply Chain">Procurement &amp; Supply Chain</option>
                <option value="Technology and Digital Leadership">Technology &amp; Digital Leadership</option>
                <option value="Financial Services, Banking and Risk">Financial Services, Banking &amp; Risk</option>
                <option value="Manufacturing and Industrial Operations">Manufacturing &amp; Industrial Operations</option>
                <option value="Consumer Goods, Retail and Commercial">Consumer Goods, Retail &amp; Commercial</option>
                <option value="Energy and Natural Resources">Energy &amp; Natural Resources</option>
                <option value="Professional and Business Services">Professional &amp; Business Services</option>
                <option value="Other">Other Sector</option>
              </select>
              {errors.industry && <p className="mt-1 text-xs text-red-700">{errors.industry}</p>}
            </div>

            <div>
              <label htmlFor="emp-full-name" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Your Full Name *
              </label>
              <input
                id="emp-full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
                placeholder="e.g. Eleanor Vance"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="emp-job-title" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Your Job Title / Board Role *
              </label>
              <input
                id="emp-job-title"
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
                placeholder="e.g. Chief Human Resources Officer"
              />
              {errors.jobTitle && <p className="mt-1 text-xs text-red-700">{errors.jobTitle}</p>}
            </div>

            <div>
              <label htmlFor="emp-business-email" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Business Email *
              </label>
              <input
                id="emp-business-email"
                type="email"
                required
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
                placeholder="name@organization.com"
              />
              {errors.businessEmail && (
                <p className="mt-1 text-xs text-red-700">{errors.businessEmail}</p>
              )}
            </div>

            <div>
              <label htmlFor="emp-contact-method" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Preferred Consultation Method
              </label>
              <select
                id="emp-contact-method"
                value={preferredContactMethod}
                onChange={(e) => setPreferredContactMethod(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
              >
                <option value="Business Email">Business Email</option>
                <option value="Video Consultation">Scheduled Video Consultation</option>
                <option value="Telephone">Telephone</option>
              </select>
            </div>
          </div>
        </div>

        {/* Part B: Executive Mandate & Role Specifications */}
        <div className="space-y-4">
          <div className="border-b border-[#7DD3FC] pb-2 flex items-center justify-between">
            <h4 className="font-editorial text-xl font-bold text-[#082F49]">
              Position &amp; Search Mandate Specifications
            </h4>
            <span className="text-xs font-semibold text-[#0369A1]">Role Scope</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="emp-position" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Position to Be Filled *
              </label>
              <input
                id="emp-position"
                type="text"
                required
                value={positionToFill}
                onChange={(e) => setPositionToFill(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
                placeholder="e.g. Vice President, Clinical Development"
              />
              {errors.positionToFill && (
                <p className="mt-1 text-xs text-red-700">{errors.positionToFill}</p>
              )}
            </div>

            <div>
              <label htmlFor="emp-seniority" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Seniority Level *
              </label>
              <select
                id="emp-seniority"
                required
                value={seniorityLevel}
                onChange={(e) => setSeniorityLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
              >
                <option value="">Select Seniority Level</option>
                <option value="Board / Non-Executive Director">Board / Non-Executive Director</option>
                <option value="C-Suite (CEO, CFO, COO, CMO, CTO, CHRO)">C-Suite Executive</option>
                <option value="Executive Vice President / Senior Vice President">EVP / SVP</option>
                <option value="Vice President">Vice President</option>
                <option value="Executive Director / Senior Director">Executive Director / Senior Director</option>
                <option value="General Manager / Department Head">General Manager / Department Head</option>
                <option value="Senior Specialist / Technical Principal">Senior Specialist / Technical Principal</option>
              </select>
              {errors.seniorityLevel && (
                <p className="mt-1 text-xs text-red-700">{errors.seniorityLevel}</p>
              )}
            </div>

            <div>
              <label htmlFor="emp-location" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Employment Location / Work Arrangement
              </label>
              <input
                id="emp-location"
                type="text"
                value={employmentLocation}
                onChange={(e) => setEmploymentLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
                placeholder="e.g. Boston, MA (Hybrid) or US Remote"
              />
            </div>

            <div>
              <label htmlFor="emp-positions-count" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Number of Positions (Optional)
              </label>
              <input
                id="emp-positions-count"
                type="text"
                value={numberOfPositions}
                onChange={(e) => setNumberOfPositions(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
              />
            </div>

            <div>
              <label htmlFor="emp-timeline" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Hiring Timeline
              </label>
              <select
                id="emp-timeline"
                value={hiringTimeline}
                onChange={(e) => setHiringTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
              >
                <option value="Immediate (Within 30–60 days)">Immediate (Within 30–60 days)</option>
                <option value="Near-term (60–90 days)">Near-term (60–90 days)</option>
                <option value="Strategic / Confidential Succession">Strategic / Confidential Succession</option>
                <option value="Exploratory / Talent Mapping">Exploratory / Talent Mapping</option>
              </select>
            </div>

            <div>
              <label htmlFor="emp-model" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Preferred Engagement Model
              </label>
              <select
                id="emp-model"
                value={preferredEngagementModel}
                onChange={(e) => setPreferredEngagementModel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
              >
                <option value="To be discussed">To be discussed during consultation</option>
                <option value="Retained Executive Search">Retained Executive Search</option>
                <option value="Confidential Search Assignment">Confidential Search Assignment</option>
                <option value="Specialist Permanent Placement">Specialist Permanent Placement</option>
                <option value="Talent Mapping & Market Research">Talent Mapping &amp; Market Research</option>
              </select>
            </div>
          </div>
        </div>

        {/* Part C: Mandate Context */}
        <div>
          <label htmlFor="emp-additional-info" className="block text-xs font-bold text-[#082F49] mb-1.5">
            Recruitment Requirements &amp; Additional Information
          </label>
          <textarea
            id="emp-additional-info"
            rows={4}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm focus:outline-none focus:border-[#082F49]"
            placeholder="Outline key responsibilities, reporting structure, required qualifications, or confidentiality considerations..."
          />
        </div>

        <div className="pt-2 border-t border-[#E0F2FE]">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#1E3A8A]"
            />
            <span className="text-xs text-[#475569] leading-relaxed">
              I acknowledge the{' '}
              <button
                type="button"
                onClick={() => onNavigate?.('/privacy')}
                className="text-[#1E3A8A] underline font-medium cursor-pointer"
              >
                Privacy Policy
              </button>{' '}
              and understand that submitting an enquiry does not automatically establish a formal recruitment mandate until scope and commercial terms are mutually agreed. *
            </span>
          </label>
          {errors.privacyAccepted && (
            <p className="mt-1 text-xs text-red-700">{errors.privacyAccepted}</p>
          )}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-[#082F49] hover:bg-[#1E3A8A] disabled:opacity-60 rounded-sm transition-colors cursor-pointer"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            <span>{submitting ? 'Submitting Mandate Brief...' : 'Submit Employer Enquiry'}</span>
          </button>
          <span className="text-xs text-[#475569]">
            All employer briefs are reviewed confidentially by our senior search consultants.
          </span>
        </div>
      </div>
    </form>
  );
};

// ============================================================================
// 2. CANDIDATE CV SUBMISSION FORM — Confidential Executive Career Dossier
//    (Significantly Different Visual & Functional Design + Optional CV Upload)
// ============================================================================
export const CandidateCvForm: React.FC<{
  onNavigate?: (path: string) => void;
  relatedJobTitle?: string;
  relatedEmployer?: string;
}> = ({ onNavigate, relatedJobTitle, relatedEmployer }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [currentEmployer, setCurrentEmployer] = useState('');
  const [professionalFunction, setProfessionalFunction] = useState('');
  const [industrySpecialization, setIndustrySpecialization] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [targetPositions, setTargetPositions] = useState(relatedJobTitle || '');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [careerInterests, setCareerInterests] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvMeta, setCvMeta] = useState<CvFileMetadata | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [futureOpportunitiesConsent, setFutureOpportunitiesConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    submissionId: string;
    privateCvStored: boolean;
    notice?: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedFile(null);
      setCvMeta(null);
      return;
    }
    const meta: CvFileMetadata = {
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    };
    const err = validateCvFile(meta);
    if (err) {
      setErrors((prev) => ({ ...prev, cvFile: err }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.cvFile;
        return next;
      });
    }
    setSelectedFile(file);
    setCvMeta(meta);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload = {
      fullName,
      email,
      phone,
      currentJobTitle,
      currentEmployer,
      professionalFunction,
      industrySpecialization,
      yearsExperience,
      targetPositions,
      preferredLocation,
      linkedInUrl,
      careerInterests,
      cvFile: cvMeta,
      privacyAccepted,
      futureOpportunitiesConsent,
      honeypot,
    };

    const validation = validateCandidateSubmission(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      setServerError(
        'Your profile could not be submitted. Please check your details and try again.'
      );
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      let cvBase64: string | undefined;
      if (selectedFile) {
        cvBase64 = await fileToBase64(selectedFile);
      }

      const res = await fetch('/api/submissions/candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, cvBase64 }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors || {});
        setServerError(
          data.message ||
            'Your profile could not be submitted. Please check your details and try again.'
        );
      } else {
        setSuccessData({
          message: data.message,
          submissionId: data.submissionId,
          privateCvStored: Boolean(data.record?.privateCvStored),
          notice: data.record?.configurationNotice,
        });
      }
    } catch {
      setServerError(
        'We could not submit your information right now. Please try again, or use the published contact method.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 bg-white border-2 border-[#1E3A8A] rounded-sm space-y-4"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Candidate Registration Confirmed
            </h3>
            <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
              {successData.message}
            </p>
            <p className="text-xs font-mono-tabular text-[#475569]">
              Reference ID: {successData.submissionId} · Private Vault CV Stored:{' '}
              {successData.privateCvStored ? 'Yes (Restricted Access)' : 'No CV Attached (Optional)'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuccessData(null);
            setSelectedFile(null);
            setCvMeta(null);
          }}
          className="px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm transition-colors cursor-pointer"
        >
          Update or Submit Another Profile
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-gradient-to-br from-[#FEF9C3] via-[#FFFFFF] to-[#E0F2FE] border-2 border-[#38BDF8] rounded-2xl overflow-hidden shadow-xl"
    >
      {/* Candidate Dossier Header Banner (Bright Yellow & Sky Blue Identity) */}
      <div className="bg-gradient-to-r from-[#FEF08A] via-[#FEF9C3] to-[#BAE6FD] p-6 md:p-8 border-b-2 border-[#38BDF8]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
            <UserCheck className="w-4 h-4" aria-hidden="true" />
            <span>CONFIDENTIAL CANDIDATE DOSSIER · FOR EXECUTIVES &amp; SPECIALISTS</span>
          </span>
          <span className="text-[11px] font-bold px-3 py-1 bg-white border border-[#38BDF8] rounded-full text-[#082F49]">
            Résumé / CV Upload Optional
          </span>
        </div>
        <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#082F49]">
          {relatedJobTitle
            ? 'Share My Profile with Alexanders Career Strategy'
            : 'Introduce Yourself & Register Your Career Interests'}
        </h3>
        <p className="text-xs sm:text-sm text-[#082F49]/90 leading-relaxed mt-2 max-w-3xl">
          {relatedJobTitle && relatedEmployer ? (
            <>
              You are sharing your career profile with <strong>Alexanders Career Strategy</strong> for consideration in our executive search work (referenced role interest: <em>{relatedJobTitle}</em>). <strong>Attaching a CV is optional for job seekers.</strong>
            </>
          ) : (
            <>
              Share your leadership background, functional specialization, and preferred career opportunities. <strong>Uploading a résumé / CV is optional for job seekers</strong>—you may register your profile today and share documents later.
            </>
          )}
        </p>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {serverError && (
          <div
            role="alert"
            className="p-4 bg-[#0A1633] text-[#F8FAFC] border border-[#FACC15] rounded-sm flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 text-[#FDE047] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{serverError}</span>
          </div>
        )}

        <div className="hidden" aria-hidden="true">
          <label htmlFor="cand-website-hp">Leave blank</label>
          <input
            id="cand-website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Candidate Section A: Career Trajectory & Target Roles */}
        <div className="p-5 bg-white/90 border border-[#7DD3FC] rounded-xl space-y-5">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#0369A1] uppercase tracking-wider">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Career Trajectory &amp; Target Leadership Roles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="cand-current-title" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Current or Most Recent Job Title *
              </label>
              <input
                id="cand-current-title"
                type="text"
                required
                value={currentJobTitle}
                onChange={(e) => setCurrentJobTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="e.g. Vice President, Clinical Development"
              />
              {errors.currentJobTitle && (
                <p className="mt-1 text-xs text-red-700">{errors.currentJobTitle}</p>
              )}
            </div>

            <div>
              <label htmlFor="cand-employer" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Current or Most Recent Employer (Optional)
              </label>
              <input
                id="cand-employer"
                type="text"
                value={currentEmployer}
                onChange={(e) => setCurrentEmployer(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="Organization name"
              />
            </div>

            <div>
              <label htmlFor="cand-function" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Primary Functional Discipline *
              </label>
              <select
                id="cand-function"
                required
                value={professionalFunction}
                onChange={(e) => setProfessionalFunction(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
              >
                <option value="">Select Function</option>
                <option value="Executive / C-Suite Leadership">Executive / C-Suite Leadership</option>
                <option value="Clinical Development & Medical Affairs">Clinical Development &amp; Medical Affairs</option>
                <option value="Regulatory Affairs & Quality Assurance">Regulatory Affairs &amp; Quality Assurance</option>
                <option value="Accounting & Finance">Accounting &amp; Finance</option>
                <option value="Risk, Legal & Compliance">Risk, Legal &amp; Compliance</option>
                <option value="Technology, Data & Cybersecurity">Technology, Data &amp; Cybersecurity</option>
                <option value="Procurement, Supply Chain & Operations">Procurement, Supply Chain &amp; Operations</option>
                <option value="Human Resources & Talent">Human Resources &amp; Talent</option>
                <option value="Sales, Marketing & Commercial">Sales, Marketing &amp; Commercial</option>
                <option value="Engineering & Manufacturing">Engineering &amp; Manufacturing</option>
              </select>
              {errors.professionalFunction && (
                <p className="mt-1 text-xs text-red-700">{errors.professionalFunction}</p>
              )}
            </div>

            <div>
              <label htmlFor="cand-industry" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Current Industry Specialization *
              </label>
              <select
                id="cand-industry"
                required
                value={industrySpecialization}
                onChange={(e) => setIndustrySpecialization(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
              >
                <option value="">Select Industry</option>
                <option value="Pharmaceuticals & Biotechnology">Pharmaceuticals &amp; Biotechnology</option>
                <option value="Healthcare & Healthcare Technology">Healthcare &amp; Healthcare Technology</option>
                <option value="Medical Devices & Life Sciences">Medical Devices &amp; Life Sciences</option>
                <option value="Financial Services, Banking & Insurance">Financial Services, Banking &amp; Insurance</option>
                <option value="Technology & Software">Technology &amp; Software</option>
                <option value="Procurement, Logistics & Supply Chain">Procurement, Logistics &amp; Supply Chain</option>
                <option value="Manufacturing, Industrial & Energy">Manufacturing, Industrial &amp; Energy</option>
                <option value="Consumer Goods, Retail & Professional Services">Consumer Goods, Retail &amp; Professional Services</option>
              </select>
              {errors.industrySpecialization && (
                <p className="mt-1 text-xs text-red-700">{errors.industrySpecialization}</p>
              )}
            </div>

            <div>
              <label htmlFor="cand-target-positions" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Target Positions / Preferred Next Role *
              </label>
              <input
                id="cand-target-positions"
                type="text"
                required
                value={targetPositions}
                onChange={(e) => setTargetPositions(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="e.g. VP Clinical Development, Chief Medical Officer"
              />
              {errors.targetPositions && (
                <p className="mt-1 text-xs text-red-700">{errors.targetPositions}</p>
              )}
            </div>

            <div>
              <label htmlFor="cand-location" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Preferred US Locations or Remote Preference *
              </label>
              <input
                id="cand-location"
                type="text"
                required
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="e.g. Greater Boston, MA (Hybrid) or US Remote"
              />
              {errors.preferredLocation && (
                <p className="mt-1 text-xs text-red-700">{errors.preferredLocation}</p>
              )}
            </div>

            <div>
              <label htmlFor="cand-experience" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Years of Leadership Experience (Optional)
              </label>
              <input
                id="cand-experience"
                type="text"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="e.g. 15+ years"
              />
            </div>

            <div>
              <label htmlFor="cand-linkedin" className="block text-xs font-bold text-[#082F49] mb-1.5">
                LinkedIn Profile URL (Optional)
              </label>
              <input
                id="cand-linkedin"
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="https://www.linkedin.com/in/your-profile"
              />
              {errors.linkedInUrl && (
                <p className="mt-1 text-xs text-red-700">{errors.linkedInUrl}</p>
              )}
            </div>
          </div>
        </div>

        {/* Candidate Section B: Direct Confidential Contact Details */}
        <div className="p-5 bg-white/90 border border-[#7DD3FC] rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#0369A1] uppercase tracking-wider">
            <Briefcase className="w-4 h-4" aria-hidden="true" />
            <span>Confidential Candidate Contact Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="cand-full-name" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Full Name *
              </label>
              <input
                id="cand-full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="Dr. Marcus Hale"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="cand-email" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Direct Email Address *
              </label>
              <input
                id="cand-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="cand-phone" className="block text-xs font-bold text-[#082F49] mb-1.5">
                Mobile / Direct Phone (Optional)
              </label>
              <input
                id="cand-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </div>

        {/* Candidate Section C: Optional Private Vault CV Upload */}
        <div className="p-5 bg-[#FEF08A]/50 border-2 border-dashed border-[#0369A1] rounded-xl space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <label htmlFor="cand-cv-upload" className="block text-xs sm:text-sm font-extrabold text-[#082F49]">
                CV / Résumé Document Upload (Optional for Job Seekers — PDF, DOC, DOCX, Max 5 MB)
              </label>
              <p className="text-xs text-[#334155] mt-0.5">
                Uploading a CV is completely optional. If attached, your file is stored in restricted private storage and never exposed via public URLs.
              </p>
            </div>
            <ShieldCheck className="w-5 h-5 text-[#0369A1] shrink-0" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label
              htmlFor="cand-cv-upload"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#082F49] bg-white border border-[#0369A1] rounded-full hover:bg-[#082F49] hover:text-white transition-colors cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Choose Optional CV File</span>
            </label>
            <input
              id="cand-cv-upload"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="sr-only"
            />
            {cvMeta ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0369A1]">
                <FileText className="w-4 h-4" aria-hidden="true" />
                {cvMeta.fileName} ({(cvMeta.sizeBytes / 1024).toFixed(1)} KB)
              </span>
            ) : (
              <span className="text-xs text-[#475569]">No file selected (Optional)</span>
            )}
          </div>
          {errors.cvFile && <p className="text-xs text-red-700">{errors.cvFile}</p>}
        </div>

        <div>
          <label htmlFor="cand-interests" className="block text-xs font-bold text-[#082F49] mb-1.5">
            Career Interests &amp; Executive Summary (Optional)
          </label>
          <textarea
            id="cand-interests"
            rows={3}
            value={careerInterests}
            onChange={(e) => setCareerInterests(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#7DD3FC] rounded-md focus:outline-none focus:border-[#0369A1]"
            placeholder="Share key leadership achievements, therapeutic or functional focus, and what you value in your next appointment..."
          />
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={futureOpportunitiesConsent}
              onChange={(e) => setFutureOpportunitiesConsent(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#0369A1]"
            />
            <span className="text-xs text-[#334155] leading-relaxed">
              I consent to Alexanders Career Strategy securely storing my profile and optional CV for consideration regarding relevant future executive search opportunities.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#0369A1]"
            />
            <span className="text-xs text-[#334155] leading-relaxed">
              I acknowledge the{' '}
              <button
                type="button"
                onClick={() => onNavigate?.('/privacy')}
                className="text-[#0369A1] underline font-bold cursor-pointer"
              >
                Privacy Notice
              </button>{' '}
              and understand that candidate registration does not guarantee an interview, representation, or placement, and is separate from any third-party employer’s application system. *
            </span>
          </label>
          {errors.privacyAccepted && (
            <p className="mt-1 text-xs text-red-700">{errors.privacyAccepted}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-extrabold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border-2 border-[#0369A1] rounded-full disabled:opacity-60 transition-all shadow-sm cursor-pointer"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            <span>{submitting ? 'Processing Securely...' : 'Submit Candidate Profile'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

// ============================================================================
// 3. GENERAL CONTACT FORM — RMA 5-Step Numbered Executive Contact Architecture
//    Matches https://rmasearchfirm.com/contact & Screenshots (264) and (265)
// ============================================================================
const RMA_ORGANIZATION_TYPES = [
  'Corporation',
  'Global Corporation',
  'Government',
  'Nonprofit',
  'Association',
  'Cooperative',
  'Small Business',
  'Start-Up',
  'Private Equity',
  'Private Holdings',
  'Staffing or Employment Agency',
  'Educational Institute',
  'Research Institution',
  'Tribal Nation',
  'Other',
];

export const GeneralContactForm: React.FC<{ onNavigate?: (path: string) => void }> = ({
  onNavigate,
}) => {
  // 1. Contact Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [workPhone, setWorkPhone] = useState('');

  // 2. Client Type
  const [clientType, setClientType] = useState<'Employer' | 'Job Seeker'>('Employer');

  // 3A. Employer — Company Information
  const [positionTitle, setPositionTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [organizationType, setOrganizationType] = useState('Corporation');
  const [otherOrganizationType, setOtherOrganizationType] = useState('');

  // 3B. Job Seeker — Candidate Profile (Significantly Different + Optional Résumé Upload)
  const [candidateCurrentTitle, setCandidateCurrentTitle] = useState('');
  const [candidateTargetLevel, setCandidateTargetLevel] = useState(
    'C-Suite / Executive Leadership (CEO, COO, CFO, CTO, CMO)'
  );
  const [candidateSpecialization, setCandidateSpecialization] = useState('');
  const [candidatePreferredLocation, setCandidatePreferredLocation] = useState('');
  const [candidateLinkedIn, setCandidateLinkedIn] = useState('');
  const [selectedCvFile, setSelectedCvFile] = useState<File | null>(null);
  const [cvMeta, setCvMeta] = useState<CvFileMetadata | null>(null);

  // 4. Subject & Message
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // 5. Contact Authorization & CAPTCHA
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaChecking, setCaptchaChecking] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    submissionId: string;
  } | null>(null);

  const handleCaptchaToggle = () => {
    if (captchaVerified) {
      setCaptchaVerified(false);
      return;
    }
    setCaptchaChecking(true);
    window.setTimeout(() => {
      setCaptchaChecking(false);
      setCaptchaVerified(true);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.captcha;
        return next;
      });
    }, 320);
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedCvFile(null);
      setCvMeta(null);
      return;
    }
    const meta: CvFileMetadata = {
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    };
    const err = validateCvFile(meta);
    if (err) {
      setErrors((prev) => ({ ...prev, cvFile: err }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.cvFile;
        return next;
      });
    }
    setSelectedCvFile(file);
    setCvMeta(meta);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const fieldErrors: Record<string, string> = {};

    if (!firstName.trim() || !lastName.trim()) {
      fieldErrors.fullName = 'Please enter both your First and Last name.';
    }
    if (!email.trim()) {
      fieldErrors.email = 'Please enter your email address.';
    } else if (confirmEmail.trim() && email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      fieldErrors.confirmEmail = 'Confirm Email does not match Enter Email.';
    }
    if (!consentAccepted) {
      fieldErrors.privacyAccepted =
        'Please check the Contact Authorization box to confirm your consent before submitting.';
    }
    if (!captchaVerified) {
      fieldErrors.captcha = 'Please complete the CAPTCHA verification ("I\'m not a robot").';
    }

    const effectiveSubject =
      subject.trim() ||
      (clientType === 'Employer'
        ? `Employer Executive Search Inquiry${companyName ? ` — ${companyName}` : ''}`
        : `Job Seeker Career Introduction${candidateCurrentTitle ? ` — ${candidateCurrentTitle}` : ''}`);

    const structuredDetails =
      clientType === 'Employer'
        ? [
            `Client Type: Employer`,
            `Mobile Phone: ${mobilePhone || 'Not provided'}`,
            `Work Phone: ${workPhone || 'Not provided'}`,
            `Position / Title: ${positionTitle || 'Not specified'}`,
            `Company Name: ${companyName || 'Not specified'}`,
            `Industry: ${industry || 'Not specified'}`,
            `Organization Type: ${organizationType}${otherOrganizationType ? ` (${otherOrganizationType})` : ''}`,
          ].join(' | ')
        : [
            `Client Type: Job Seeker`,
            `Mobile Phone: ${mobilePhone || 'Not provided'}`,
            `Work Phone: ${workPhone || 'Not provided'}`,
            `Current / Recent Title: ${candidateCurrentTitle || 'Not specified'}`,
            `Target Seniority Level: ${candidateTargetLevel || 'Not specified'}`,
            `Industry / Functional Focus: ${candidateSpecialization || 'Not specified'}`,
            `Preferred U.S. Location: ${candidatePreferredLocation || 'Not specified'}`,
            `LinkedIn URL: ${candidateLinkedIn || 'Not provided'}`,
            `Optional Résumé / CV: ${cvMeta ? `${cvMeta.fileName} (${(cvMeta.sizeBytes / 1024).toFixed(1)} KB)` : 'Not attached (Optional)'}`,
          ].join(' | ');

    const effectiveMessage =
      message.trim().length >= 10
        ? `${message.trim()}\n\n---\n${structuredDetails}`
        : `${message.trim() ? `${message.trim()}\n\n` : ''}${structuredDetails}`;

    const payload = {
      fullName,
      email: email.trim(),
      organization:
        clientType === 'Employer'
          ? companyName.trim() || organizationType
          : candidateCurrentTitle.trim() || 'Executive Candidate',
      enquiryType:
        clientType === 'Employer' ? 'Employer Search Enquiry' : 'Candidate Introduction',
      subject: effectiveSubject,
      message: effectiveMessage,
      privacyAccepted: consentAccepted,
      honeypot,
    };

    const validation = validateContactEnquiry(payload);
    const mergedErrors = { ...validation.errors, ...fieldErrors };

    if (Object.keys(mergedErrors).length > 0) {
      setErrors(mergedErrors);
      setServerError(
        'Please complete the required fields, check the Contact Authorization consent, and verify the CAPTCHA box.'
      );
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      let cvBase64: string | undefined;
      if (selectedCvFile) {
        cvBase64 = await fileToBase64(selectedCvFile);
      }

      const res = await fetch('/api/submissions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          cvFile: cvMeta,
          cvBase64,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors || {});
        setServerError(
          data.message ||
            'We could not submit your message. Please check your information and try again.'
        );
      } else {
        setSuccessData({
          message: data.message,
          submissionId: data.submissionId,
        });
      }
    } catch {
      setServerError(
        'We could not submit your message. Please check your information and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 md:p-12 bg-white border border-[#DCE1E9] shadow-sm space-y-5"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-7 h-7 text-[#0E6482] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="text-2xl font-normal text-[#0E6482]">
              Thank You — Contact Inquiry Received
            </h3>
            <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
              {successData.message}
            </p>
            <p className="text-xs font-mono-tabular text-[#475569]">
              Reference ID: {successData.submissionId}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuccessData(null);
            setSubject('');
            setMessage('');
            setCaptchaVerified(false);
          }}
          className="px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white bg-[#0E6482] hover:bg-[#09485E] transition-colors cursor-pointer"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-testid="rma-five-step-contact-form"
      className="bg-white px-6 sm:px-10 md:px-14 py-10 md:py-14 border border-[#E2E8F0] shadow-xs space-y-10 text-[#1E293B]"
    >
      {serverError && (
        <div
          role="alert"
          className="p-4 bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5] flex items-start gap-3 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-hp">Leave blank</label>
        <input
          id="contact-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* =================================================================== */}
      {/* 1. Contact Information:                                             */}
      {/* =================================================================== */}
      <div className="space-y-6">
        <div className="border-b border-[#E2E8F0] pb-4">
          <h3 className="text-[24px] md:text-[26px] font-normal text-[#0A4B78] tracking-tight">
            1. Contact Information:
          </h3>
        </div>

        {/* Name (Required) — First & Last */}
        <div className="space-y-1.5">
          <label className="block text-[14px] font-bold text-[#1E293B]">
            Name <span className="text-[#C0392B] italic font-normal text-[13px]">(Required)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                id="contact-first-name"
                type="text"
                required
                aria-label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
              <span className="block mt-1 text-[13px] text-[#334155]">First</span>
            </div>
            <div>
              <input
                id="contact-last-name"
                type="text"
                required
                aria-label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
              <span className="block mt-1 text-[13px] text-[#334155]">Last</span>
            </div>
          </div>
          {errors.fullName && <p className="text-xs text-[#C0392B] mt-1">{errors.fullName}</p>}
        </div>

        {/* Email (Required) — Enter Email & Confirm Email */}
        <div className="space-y-1.5">
          <label className="block text-[14px] font-bold text-[#1E293B]">
            Email <span className="text-[#C0392B] italic font-normal text-[13px]">(Required)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                id="contact-email"
                type="email"
                required
                aria-label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
              <span className="block mt-1 text-[13px] text-[#334155]">Enter Email</span>
            </div>
            <div>
              <input
                id="contact-confirm-email"
                type="email"
                required
                aria-label="Confirm Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
              <span className="block mt-1 text-[13px] text-[#334155]">Confirm Email</span>
            </div>
          </div>
          {errors.email && <p className="text-xs text-[#C0392B] mt-1">{errors.email}</p>}
          {errors.confirmEmail && (
            <p className="text-xs text-[#C0392B] mt-1">{errors.confirmEmail}</p>
          )}
        </div>

        {/* Mobile Phone & Work Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-mobile-phone"
              className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
            >
              Mobile Phone
            </label>
            <input
              id="contact-mobile-phone"
              type="tel"
              value={mobilePhone}
              onChange={(e) => setMobilePhone(e.target.value)}
              placeholder="(999) 999-9999"
              className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] placeholder:text-[#64748B] focus:outline-none focus:border-[#0A4B78]"
            />
          </div>
          <div>
            <label
              htmlFor="contact-work-phone"
              className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
            >
              Work Phone
            </label>
            <input
              id="contact-work-phone"
              type="tel"
              value={workPhone}
              onChange={(e) => setWorkPhone(e.target.value)}
              placeholder="(999) 999-9999"
              className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] placeholder:text-[#64748B] focus:outline-none focus:border-[#0A4B78]"
            />
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. Client Type:                                                     */}
      {/* =================================================================== */}
      <div className="space-y-5">
        <div className="border-b border-[#E2E8F0] pb-4">
          <h3 className="text-[24px] md:text-[26px] font-normal text-[#0A4B78] tracking-tight">
            2. Client Type:
          </h3>
        </div>

        <fieldset className="space-y-2.5">
          <legend className="text-[14px] font-bold text-[#1E293B] mb-2">
            Are you an Employer or are you a Job Seeker?{' '}
            <span className="text-[#C0392B] italic font-normal text-[13px]">(Required)</span>
          </legend>

          <label className="flex items-center gap-2.5 text-[14px] text-[#1E293B] cursor-pointer">
            <input
              type="radio"
              name="clientType"
              value="Employer"
              checked={clientType === 'Employer'}
              onChange={() => setClientType('Employer')}
              className="w-4 h-4 accent-[#0066CC] cursor-pointer"
            />
            <span>Employer</span>
          </label>

          <label className="flex items-center gap-2.5 text-[14px] text-[#1E293B] cursor-pointer">
            <input
              type="radio"
              name="clientType"
              value="Job Seeker"
              checked={clientType === 'Job Seeker'}
              onChange={() => setClientType('Job Seeker')}
              className="w-4 h-4 accent-[#0066CC] cursor-pointer"
            />
            <span>Job Seeker</span>
          </label>
        </fieldset>
      </div>

      {/* =================================================================== */}
      {/* 3. Company Information (Employer) OR Candidate Information          */}
      {/* =================================================================== */}
      {clientType === 'Employer' ? (
        <div className="space-y-5" data-testid="employer-company-info-section">
          <div className="border-b border-[#E2E8F0] pb-4">
            <h3 className="text-[24px] md:text-[26px] font-normal text-[#0A4B78] tracking-tight">
              3. Company Information:
            </h3>
          </div>

          <div className="space-y-4">
            <div className="w-full md:w-7/12">
              <label
                htmlFor="emp-position-title"
                className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
              >
                Your Position / Title:
              </label>
              <input
                id="emp-position-title"
                type="text"
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
            </div>

            <div className="w-full md:w-7/12">
              <label
                htmlFor="emp-company-name"
                className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
              >
                Company Name:
              </label>
              <input
                id="emp-company-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
            </div>

            <div className="w-full md:w-7/12">
              <label
                htmlFor="emp-industry"
                className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
              >
                Industry:
              </label>
              <input
                id="emp-industry"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
            </div>

            <div className="w-full md:w-7/12">
              <label
                htmlFor="emp-organization-type"
                className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
              >
                Organization Type:
              </label>
              <select
                id="emp-organization-type"
                value={organizationType}
                onChange={(e) => setOrganizationType(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              >
                {RMA_ORGANIZATION_TYPES.map((orgType) => (
                  <option key={orgType} value={orgType}>
                    {orgType}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-7/12">
              <label
                htmlFor="emp-other-org"
                className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
              >
                Other:
              </label>
              <input
                id="emp-other-org"
                type="text"
                value={otherOrganizationType}
                onChange={(e) => setOtherOrganizationType(e.target.value)}
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5" data-testid="jobseeker-profile-info-section">
          <div className="border-b border-[#E2E8F0] pb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[24px] md:text-[26px] font-normal text-[#0A4B78] tracking-tight">
              3. Job Seeker / Candidate Profile (Résumé Optional):
            </h3>
            <span className="px-3 py-1 text-xs font-bold text-[#0A4B78] bg-[#F0F7FF] border border-[#BAE6FD]">
              Confidential Candidate Track · CV Optional
            </span>
          </div>

          <div className="p-5 bg-[#F8FAFC] border border-[#DCE1E9] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="js-current-title"
                  className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
                >
                  Current or Most Recent Executive Title:
                </label>
                <input
                  id="js-current-title"
                  type="text"
                  value={candidateCurrentTitle}
                  onChange={(e) => setCandidateCurrentTitle(e.target.value)}
                  placeholder="e.g., Chief Operating Officer, VP of Clinical Operations"
                  className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
                />
              </div>

              <div>
                <label
                  htmlFor="js-target-level"
                  className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
                >
                  Target Executive Level:
                </label>
                <select
                  id="js-target-level"
                  value={candidateTargetLevel}
                  onChange={(e) => setCandidateTargetLevel(e.target.value)}
                  className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
                >
                  <option value="Board of Directors / Advisory Board">
                    Board of Directors / Advisory Board
                  </option>
                  <option value="CEO / President / General Manager">
                    CEO / President / General Manager
                  </option>
                  <option value="C-Suite / Executive Leadership (CEO, COO, CFO, CTO, CMO)">
                    C-Suite / Executive Leadership (COO, CFO, CTO, CMO, CHRO)
                  </option>
                  <option value="EVP / SVP / Vice President">EVP / SVP / Vice President</option>
                  <option value="Senior Director / Functional Head">
                    Senior Director / Functional Head
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="js-specialization"
                  className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
                >
                  Industry &amp; Functional Specialization:
                </label>
                <input
                  id="js-specialization"
                  type="text"
                  value={candidateSpecialization}
                  onChange={(e) => setCandidateSpecialization(e.target.value)}
                  placeholder="e.g., Biopharma, Medical Devices, Enterprise SaaS, Private Equity"
                  className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
                />
              </div>

              <div>
                <label
                  htmlFor="js-location"
                  className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
                >
                  Preferred U.S. Location / Work Arrangement:
                </label>
                <input
                  id="js-location"
                  type="text"
                  value={candidatePreferredLocation}
                  onChange={(e) => setCandidatePreferredLocation(e.target.value)}
                  placeholder="e.g., Boston, New York, Nationwide Hybrid / Remote"
                  className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
                />
              </div>
            </div>

            <div className="w-full md:w-7/12">
              <label
                htmlFor="js-linkedin"
                className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
              >
                LinkedIn Profile URL (Optional):
              </label>
              <input
                id="js-linkedin"
                type="url"
                value={candidateLinkedIn}
                onChange={(e) => setCandidateLinkedIn(e.target.value)}
                placeholder="https://www.linkedin.com/in/your-profile"
                className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
              />
            </div>

            {/* Optional Résumé / CV Upload for Job Seekers */}
            <div className="p-4 bg-white border border-dashed border-[#0A4B78] space-y-2">
              <label
                htmlFor="js-optional-cv"
                className="block text-[14px] font-bold text-[#0A4B78]"
              >
                Optional Résumé / CV Upload (PDF, DOC, DOCX — Completely Optional for Job Seekers)
              </label>
              <p className="text-xs text-[#475569]">
                You may submit this form with or without attaching a résumé. Any uploaded CV is stored privately.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <label
                  htmlFor="js-optional-cv"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0E6482] hover:bg-[#09485E] cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Choose Optional Résumé File</span>
                </label>
                <input
                  id="js-optional-cv"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleCvFileChange}
                  className="sr-only"
                />
                <span className="text-xs text-[#334155]">
                  {cvMeta
                    ? `${cvMeta.fileName} (${(cvMeta.sizeBytes / 1024).toFixed(1)} KB)`
                    : 'No file selected (Résumé is optional)'}
                </span>
              </div>
              {errors.cvFile && <p className="text-xs text-[#C0392B]">{errors.cvFile}</p>}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. Subject & Message:                                               */}
      {/* =================================================================== */}
      <div className="space-y-5">
        <div className="border-b border-[#E2E8F0] pb-4">
          <h3 className="text-[24px] md:text-[26px] font-normal text-[#0A4B78] tracking-tight">
            4. Subject &amp; Message:
          </h3>
        </div>

        <div className="w-full md:w-7/12">
          <label
            htmlFor="contact-subject"
            className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
          >
            Subject:
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-[42px] px-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
          />
          {errors.subject && <p className="mt-1 text-xs text-[#C0392B]">{errors.subject}</p>}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-[14px] font-bold text-[#1E293B] mb-1.5"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            rows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 text-sm bg-white border border-[#D1D5DB] focus:outline-none focus:border-[#0A4B78]"
          />
          {errors.message && <p className="mt-1 text-xs text-[#C0392B]">{errors.message}</p>}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 5. Contact Authorization:                                           */}
      {/* =================================================================== */}
      <div className="space-y-5">
        <div className="border-b border-[#E2E8F0] pb-4">
          <h3 className="text-[24px] md:text-[26px] font-normal text-[#0A4B78] tracking-tight">
            5. Contact Authorization:
          </h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              id="contact-authorization-checkbox"
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#0A4B78] cursor-pointer"
            />
            <span className="text-[14px] text-[#334155]">
              Consent to receiving Emails, Phone Calls, Text Messages &amp; Other Types of Messages.
            </span>
          </label>

          {/* Bordered Disclosure Box Matching Screenshot (265).png */}
          <div className="p-4 bg-[#FAFBFD] border border-[#DCE1E9] text-[13px] text-[#4A5568] leading-relaxed">
            By checking this box, and submitting the form, I confirm that I am the authorized user
            of the email address, the subscriber and primary owner of the phone number entered, and
            I hereby consent to receive emails, calls, and/or text messages, and/or other types of
            messages from Alexanders Career Strategy and the employees who work at Alexanders Career
            Strategy, including using automated call technology or recorded calls, at the phone
            number provided above, including if this number is a wireless or mobile phone number.{' '}
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/privacy')}
                className="text-[#0A4B78] underline hover:text-[#082F49] cursor-pointer"
              >
                Privacy Policy
              </button>
            )}
          </div>
          {errors.privacyAccepted && (
            <p className="text-xs text-[#C0392B]">{errors.privacyAccepted}</p>
          )}
        </div>

        {/* CAPTCHA Widget Matching Screenshot (265).png */}
        <div className="space-y-2 pt-2">
          <span className="block text-[14px] font-bold text-[#1E293B]">CAPTCHA</span>
          <div
            role="group"
            aria-label="CAPTCHA Verification"
            className="w-full max-w-[304px] h-[78px] bg-[#F9F9F9] border border-[#D3D3D3] rounded-[3px] shadow-2xs px-3.5 flex items-center justify-between select-none"
          >
            <button
              type="button"
              onClick={handleCaptchaToggle}
              aria-pressed={captchaVerified}
              data-testid="recaptcha-checkbox-btn"
              className="flex items-center gap-3 cursor-pointer text-left focus:outline-none"
            >
              <span
                className={`w-[28px] h-[28px] rounded-[2px] border-2 flex items-center justify-center transition-colors ${
                  captchaVerified
                    ? 'border-[#16A34A] bg-white text-[#16A34A]'
                    : 'border-[#C1C1C1] bg-white hover:border-[#888888]'
                }`}
              >
                {captchaChecking ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#0E6482]" />
                ) : captchaVerified ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
              </span>
              <span className="text-[14px] font-normal text-[#222222]">I&apos;m not a robot</span>
            </button>

            <div className="flex flex-col items-center justify-center text-center leading-tight">
              <svg className="w-8 h-8" viewBox="0 0 64 64" aria-hidden="true">
                <path
                  fill="#1C3AA9"
                  d="M32 10c8.5 0 15.8 4.8 19.5 11.9l4.5-4.5V32H41.4l5.3-5.3C43.9 21.3 38.4 17.5 32 17.5c-7.4 0-13.7 4.9-15.8 11.7l-7.1-2.2C12.2 17.1 21.3 10 32 10z"
                />
                <path
                  fill="#4285F4"
                  d="M54 32c0 12.2-9.8 22-22 22-8.5 0-15.8-4.8-19.5-11.9L8 46.6V32h14.6l-5.3 5.3c2.8 5.4 8.3 9.2 14.7 9.2 7.4 0 13.7-4.9 15.8-11.7L54 32z"
                />
              </svg>
              <span className="text-[10px] font-semibold text-[#555555] mt-0.5">reCAPTCHA</span>
              <span className="text-[8px] text-[#777777]">Privacy - Terms</span>
            </div>
          </div>
          {errors.captcha && <p className="text-xs text-[#C0392B]">{errors.captcha}</p>}
        </div>

        {/* Solid Teal-Blue SUBMIT Button Matching Screenshot (265).png */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={submitting}
            data-testid="contact-submit-btn"
            className="inline-flex items-center justify-center gap-2 px-10 py-3.5 min-w-[165px] text-[13px] font-bold uppercase tracking-[0.18em] text-white bg-[#136382] hover:bg-[#0D4A63] disabled:opacity-60 transition-colors cursor-pointer"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            <span>{submitting ? 'SUBMITTING...' : 'SUBMIT'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};


// ============================================================================
// 4. CAREERS AT ALEXANDERS CAREER STRATEGY INTEREST FORM
// ============================================================================
export const CareerInterestForm: React.FC<{ onNavigate?: (path: string) => void }> = ({
  onNavigate,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvMeta, setCvMeta] = useState<CvFileMetadata | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    submissionId: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedFile(null);
      setCvMeta(null);
      return;
    }
    const meta: CvFileMetadata = {
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    };
    const err = validateCvFile(meta);
    if (err) {
      setErrors((prev) => ({ ...prev, cvFile: err }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.cvFile;
        return next;
      });
    }
    setSelectedFile(file);
    setCvMeta(meta);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      currentJobTitle,
      areaOfInterest,
      linkedInUrl,
      introduction,
      cvFile: cvMeta,
      privacyAccepted,
      honeypot,
    };

    const validation = validateCareerInterest(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      setServerError(
        'We could not submit your information right now. Please try again, or use the published contact method.'
      );
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      let cvBase64: string | undefined;
      if (selectedFile) {
        cvBase64 = await fileToBase64(selectedFile);
      }

      const res = await fetch('/api/submissions/career-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, cvBase64 }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors || {});
        setServerError(
          data.message ||
            'We could not submit your information right now. Please try again, or use the published contact method.'
        );
      } else {
        setSuccessData({
          message: data.message,
          submissionId: data.submissionId,
        });
      }
    } catch {
      setServerError(
        'We could not submit your information right now. Please try again, or use the published contact method.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 bg-white border-2 border-[#1E3A8A] rounded-sm space-y-4"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Career Expression of Interest Received
            </h3>
            <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
              {successData.message}
            </p>
            <p className="text-xs font-mono-tabular text-[#475569]">
              Reference ID: {successData.submissionId}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSuccessData(null)}
          className="px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm transition-colors cursor-pointer"
        >
          Submit Another Expression of Interest
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 md:p-10 bg-white border border-[#CBD5E1] rounded-sm space-y-6"
    >
      <div className="space-y-2 border-b border-[#CBD5E1] pb-5">
        <h3 className="font-editorial text-2xl md:text-3xl font-semibold text-[#0A1633]">
          Register Your Interest in Joining Alexanders Career Strategy
        </h3>
        <p className="text-sm text-[#475569] leading-relaxed">
          Share your background and area of interest below. Submitting an expression of interest does not guarantee employment, representation, or an interview, and we will review your information if a relevant internal opportunity becomes available.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-4 bg-[#0A1633] text-[#F8FAFC] border border-[#FACC15] rounded-sm flex items-start gap-3 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-[#FDE047] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="career-hp">Leave blank</label>
        <input
          id="career-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="career-first-name" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            First Name *
          </label>
          <input
            id="career-first-name"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="First name"
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-700">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="career-last-name" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Last Name *
          </label>
          <input
            id="career-last-name"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="Last name"
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-700">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="career-email" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Email Address *
          </label>
          <input
            id="career-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="name@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="career-phone" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Phone Number (Optional)
          </label>
          <input
            id="career-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label htmlFor="career-current-title" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Current Job Title (Optional)
          </label>
          <input
            id="career-current-title"
            type="text"
            value={currentJobTitle}
            onChange={(e) => setCurrentJobTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="e.g. Executive Search Researcher"
          />
        </div>

        <div>
          <label htmlFor="career-area" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Area of Interest *
          </label>
          <select
            id="career-area"
            required
            value={areaOfInterest}
            onChange={(e) => setAreaOfInterest(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
          >
            <option value="">Select Area of Interest</option>
            <option value="Executive Search Consulting">Executive Search Consulting</option>
            <option value="Talent Research & Market Intelligence">Talent Research &amp; Market Intelligence</option>
            <option value="Candidate Engagement & Relations">Candidate Engagement &amp; Relations</option>
            <option value="Client Relationship Development">Client Relationship Development</option>
            <option value="Search Operations & Coordination">Search Operations &amp; Coordination</option>
          </select>
          {errors.areaOfInterest && (
            <p className="mt-1 text-xs text-red-700">{errors.areaOfInterest}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="career-linkedin" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            LinkedIn URL (Optional)
          </label>
          <input
            id="career-linkedin"
            type="url"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="https://www.linkedin.com/in/your-profile"
          />
          {errors.linkedInUrl && <p className="mt-1 text-xs text-red-700">{errors.linkedInUrl}</p>}
        </div>
      </div>

      {/* Private CV Upload */}
      <div className="p-4 bg-[#EFF6FF] border border-[#CBD5E1] rounded-sm space-y-2">
        <label htmlFor="career-cv-upload" className="block text-xs font-semibold text-[#0A1633]">
          Optional CV Upload (PDF, DOC, DOCX — Max 5 MB)
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="career-cv-upload"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1E3A8A] bg-white border border-[#1E3A8A] rounded-sm hover:bg-[#1E3A8A] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Select Optional CV File</span>
          </label>
          <input
            id="career-cv-upload"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="sr-only"
          />
          <span className="text-xs text-[#475569]">
            {cvMeta ? `${cvMeta.fileName} (${(cvMeta.sizeBytes / 1024).toFixed(1)} KB)` : 'No file chosen (Optional)'}
          </span>
        </div>
        {errors.cvFile && <p className="text-xs text-red-700">{errors.cvFile}</p>}
      </div>

      <div>
        <label htmlFor="career-intro" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
          Short Introduction (Optional)
        </label>
        <textarea
          id="career-intro"
          rows={3}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Tell us about your interest in executive search and talent strategy..."
        />
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#1E3A8A]"
          />
          <span className="text-xs text-[#475569] leading-relaxed">
            I acknowledge the{' '}
            <button
              type="button"
              onClick={() => onNavigate?.('/privacy')}
              className="text-[#1E3A8A] underline font-medium cursor-pointer"
            >
              Privacy Policy
            </button>{' '}
            and consent to Alexanders Career Strategy storing my expression of interest for potential internal opportunities. *
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1 text-xs text-red-700">{errors.privacyAccepted}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] disabled:opacity-60 rounded-sm transition-colors cursor-pointer"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          <span>{submitting ? 'Submitting...' : 'Submit Career Interest'}</span>
        </button>
      </div>
    </form>
  );
};

// ============================================================================
// 5. ALEXANDERS CAREER STRATEGY OPPORTUNITY APPLICATION FORM (Resume Optional!)
// ============================================================================
export const OpportunityApplicationForm: React.FC<{
  jobReference: string;
  jobTitle: string;
  targetEmployer: string;
  defaultArrangement?: string;
  onNavigate?: (path: string) => void;
}> = ({
  jobReference,
  jobTitle,
  targetEmployer,
  defaultArrangement = 'Hybrid',
  onNavigate,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [preferredArrangement, setPreferredArrangement] = useState(defaultArrangement);
  const [salaryExpectations, setSalaryExpectations] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [candidateFeedback, setCandidateFeedback] = useState('');

  const [selectedCvFile, setSelectedCvFile] = useState<File | null>(null);
  const [cvMeta, setCvMeta] = useState<CvFileMetadata | null>(null);

  const [selectedSupportingFile, setSelectedSupportingFile] = useState<File | null>(null);
  const [supportingMeta, setSupportingMeta] = useState<CvFileMetadata | null>(null);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    submissionId: string;
    jobReference: string;
    adminEmailDispatchedTo?: string;
    candidateConfirmationDispatchedTo?: string;
  } | null>(null);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedCvFile(null);
      setCvMeta(null);
      return;
    }
    const meta: CvFileMetadata = {
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    };
    const err = validateCvFile(meta);
    if (err) {
      setErrors((prev) => ({ ...prev, cvFile: err }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.cvFile;
        return next;
      });
    }
    setSelectedCvFile(file);
    setCvMeta(meta);
  };

  const handleSupportingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedSupportingFile(null);
      setSupportingMeta(null);
      return;
    }
    const meta: CvFileMetadata = {
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    };
    const err = validateCvFile(meta);
    if (err) {
      setErrors((prev) => ({ ...prev, supportingDocFile: err }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.supportingDocFile;
        return next;
      });
    }
    setSelectedSupportingFile(file);
    setSupportingMeta(meta);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload = {
      jobReference,
      jobTitle,
      targetEmployer,
      fullName,
      email,
      phone,
      currentLocation,
      preferredArrangement,
      salaryExpectations,
      linkedInUrl,
      coverLetter,
      candidateFeedback,
      cvFile: cvMeta,
      supportingDocFile: supportingMeta,
      privacyAccepted,
      honeypot,
    };

    const validation = validateJobApplication(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      setServerError(
        'Please complete the required candidate details and accept the privacy consent notice.'
      );
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      let cvBase64: string | undefined;
      if (selectedCvFile) {
        cvBase64 = await fileToBase64(selectedCvFile);
      }
      let supportingDocBase64: string | undefined;
      if (selectedSupportingFile) {
        supportingDocBase64 = await fileToBase64(selectedSupportingFile);
      }

      const res = await fetch('/api/submissions/job-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, cvBase64, supportingDocBase64 }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors || {});
        setServerError(
          data.message || 'We could not submit your application right now. Please try again.'
        );
      } else {
        setSuccessData({
          message: data.message,
          submissionId: data.submissionId,
          jobReference,
          adminEmailDispatchedTo: data.record?.adminEmailDispatchedTo,
          candidateConfirmationDispatchedTo: data.record?.candidateConfirmationDispatchedTo,
        });
      }
    } catch {
      setServerError(
        'We could not submit your application right now. Please verify your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 bg-white border-2 border-[#1E3A8A] rounded-sm space-y-4"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <p className="text-xs font-mono-tabular font-semibold text-[#1E3A8A]">
              APPLICATION CONFIRMED · {successData.jobReference}
            </p>
            <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Application Routed to Alexanders Career Strategy
            </h3>
            <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
              {successData.message}
            </p>
            <div className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm text-xs text-[#1E293B] space-y-1 font-mono-tabular">
              <p>Submission ID: {successData.submissionId}</p>
              <p>Job Reference: {successData.jobReference}</p>
              <p>
                Private CV Status:{' '}
                {cvMeta ? `Stored in Restricted Administrator Vault (${cvMeta.fileName})` : 'Submitted without CV (Optional)'}
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuccessData(null);
            setSelectedCvFile(null);
            setCvMeta(null);
            setSelectedSupportingFile(null);
            setSupportingMeta(null);
          }}
          className="px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm transition-colors cursor-pointer"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 md:p-10 bg-white border border-[#CBD5E1] rounded-sm space-y-6"
    >
      <div className="space-y-2 border-b border-[#CBD5E1] pb-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#1E3A8A] font-semibold">
          <span>ALEXANDERS CAREER STRATEGY APPLICATION FORM</span>
          <span aria-hidden="true">·</span>
          <span>REF: {jobReference}</span>
        </div>
        <h3 className="font-editorial text-2xl md:text-3xl font-semibold text-[#0A1633]">
          Apply / Register Interest: {jobTitle} — {targetEmployer}
        </h3>
        <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
          All applications are submitted directly through Alexanders Career Strategy and routed to our designated administrator—never redirected to external job boards. <strong>Résumé / CV upload is optional for job seekers.</strong>
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-4 bg-red-50 border border-red-300 rounded-sm flex items-start gap-3 text-xs md:text-sm text-red-900"
        >
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="app-hp-field">Leave blank</label>
        <input
          id="app-hp-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm text-xs">
        <div>
          <span className="block text-[#475569] font-semibold">Job Reference</span>
          <span className="font-mono-tabular font-semibold text-[#1E3A8A] text-sm">
            {jobReference}
          </span>
        </div>
        <div>
          <span className="block text-[#475569] font-semibold">Opportunity Title</span>
          <span className="font-semibold text-[#0A1633]">{jobTitle}</span>
        </div>
        <div>
          <span className="block text-[#475569] font-semibold">Target Employer Profile</span>
          <span className="font-semibold text-[#0A1633]">{targetEmployer}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="app-full-name" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Full Name *
          </label>
          <input
            id="app-full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="Dr. / Mr. / Ms. Full Name"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="app-email" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Email Address *
          </label>
          <input
            id="app-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="name@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="app-phone" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Phone Number *
          </label>
          <input
            id="app-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="app-location" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Current Location (City, State) *
          </label>
          <input
            id="app-location"
            type="text"
            required
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="e.g. San Francisco, CA"
          />
          {errors.currentLocation && (
            <p className="mt-1 text-xs text-red-700">{errors.currentLocation}</p>
          )}
        </div>

        <div>
          <label htmlFor="app-arrangement" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Preferred Work Arrangement *
          </label>
          <select
            id="app-arrangement"
            value={preferredArrangement}
            onChange={(e) => setPreferredArrangement(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
          >
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Flexible">Flexible / Open to Relocation</option>
          </select>
          {errors.preferredArrangement && (
            <p className="mt-1 text-xs text-red-700">{errors.preferredArrangement}</p>
          )}
        </div>

        <div>
          <label htmlFor="app-salary" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            Salary Expectations (Optional)
          </label>
          <input
            id="app-salary"
            type="text"
            value={salaryExpectations}
            onChange={(e) => setSalaryExpectations(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="e.g. $300,000–$380,000 base + bonus"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="app-linkedin" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
            LinkedIn Profile URL (Optional)
          </label>
          <input
            id="app-linkedin"
            type="url"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
            placeholder="https://www.linkedin.com/in/your-profile"
          />
          {errors.linkedInUrl && <p className="mt-1 text-xs text-red-700">{errors.linkedInUrl}</p>}
        </div>
      </div>

      {/* Optional Résumé/CV Upload & Optional Supporting Document */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#EFF6FF] border border-[#CBD5E1] rounded-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3A8A]">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Résumé / CV Upload (Optional for Job Seekers · PDF, DOC, DOCX ≤ 5 MB)</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <label
              htmlFor="app-cv-upload"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1E3A8A] bg-white border border-[#1E3A8A] rounded-sm hover:bg-[#1E3A8A] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Attach Optional Résumé / CV</span>
            </label>
            <input
              id="app-cv-upload"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleCvChange}
              className="sr-only"
            />
            <span className="text-xs text-[#1E293B] inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#475569]" aria-hidden="true" />
              {cvMeta
                ? `${cvMeta.fileName} (${(cvMeta.sizeBytes / 1024).toFixed(1)} KB)`
                : 'Optional — No CV selected'}
            </span>
          </div>
          {errors.cvFile && <p className="text-xs text-red-700">{errors.cvFile}</p>}
        </div>

        <div className="p-4 bg-[#EFF6FF] border border-[#CBD5E1] rounded-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
            <FileText className="w-4 h-4 text-[#1E3A8A]" aria-hidden="true" />
            <span>Supporting Document / Cover Letter File (Optional ≤ 5 MB)</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <label
              htmlFor="app-supporting-upload"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1E293B] bg-white border border-[#CBD5E1] rounded-sm hover:border-[#1E3A8A] transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Attach Supporting File</span>
            </label>
            <input
              id="app-supporting-upload"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleSupportingChange}
              className="sr-only"
            />
            <span className="text-xs text-[#475569]">
              {supportingMeta
                ? `${supportingMeta.fileName} (${(supportingMeta.sizeBytes / 1024).toFixed(1)} KB)`
                : 'Optional'}
            </span>
          </div>
          {errors.supportingDocFile && (
            <p className="text-xs text-red-700">{errors.supportingDocFile}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="app-cover-letter" className="block text-xs font-semibold text-[#1E293B] mb-1.5">
          Cover Letter / Executive Summary (Where Applicable)
        </label>
        <textarea
          id="app-cover-letter"
          rows={3}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Outline your relevant leadership achievements, functional scope, and alignment with this opportunity..."
        />
      </div>

      <div>
        <label htmlFor="app-feedback" className="block text-xs font-semibold text-[#1E3A8A] mb-1.5">
          Candidate Feedback: Do these opportunities align with your career goals? If this role doesn’t meet your salary expectations or preferred location, let us know:
        </label>
        <textarea
          id="app-feedback"
          rows={2}
          value={candidateFeedback}
          onChange={(e) => setCandidateFeedback(e.target.value)}
          className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm focus:outline-none focus:border-[#1E3A8A]"
          placeholder="Share any feedback on target compensation, preferred cities/remote flexibility, or alternative executive roles..."
        />
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#1E3A8A]"
          />
          <span className="text-xs text-[#475569] leading-relaxed">
            I have read and acknowledge the{' '}
            <button
              type="button"
              onClick={() => onNavigate?.('/privacy')}
              className="text-[#1E3A8A] underline font-medium cursor-pointer"
            >
              Privacy Policy
            </button>{' '}
            and provide explicit consent for Alexanders Career Strategy to process, store in restricted storage, and review my application, optional CV, and supporting documents for reference{' '}
            <strong className="font-mono-tabular text-[#0A1633]">{jobReference}</strong> and relevant executive search opportunities. *
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1 text-xs text-red-700">{errors.privacyAccepted}</p>
        )}
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] disabled:opacity-60 rounded-sm transition-colors cursor-pointer"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          <span>
            {submitting
              ? 'Saving Application & Notifying Administrator...'
              : `Submit Application (${jobReference})`}
          </span>
        </button>
        <span className="text-xs text-[#475569]">
          Résumé upload is optional · Stored securely in restricted vault
        </span>
      </div>
    </form>
  );
};
