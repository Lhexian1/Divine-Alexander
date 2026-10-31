import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmployerEnquiry,
  validateCandidateSubmission,
  validateContactEnquiry,
  validateCareerInterest,
  validateJobApplication,
  validateCvFile,
  isJobExpired,
  filterAndSortJobs,
  sanitizePublicTeamEmail,
  type JobListingRecord,
} from './validation';
import { HUNDRED_OPPORTUNITY_PROFILES } from '../data/hundredOpportunities';
import { ONE_TWENTY_VACANCY_LEADS, mergeJobsIdempotently } from '../data/oneTwentyVacancyLeads';

const sampleJobs: JobListingRecord[] = [
  {
    id: 'job-servier',
    slug: 'servier-vp-clinical-development',
    title: 'Vice President, Clinical Development',
    employer: 'Servier',
    officialSourceUrl: 'https://jobs.servier.com/job/Boston-Vice-President%2C-Clinical-Development-MA-02210/1350751455/',
    officialApplyUrl: 'https://jobs.servier.com/job/Boston-Vice-President%2C-Clinical-Development-MA-02210/1350751455/',
    applyButtonLabel: 'Apply on Servier’s Official Careers Site',
    sourceType: 'employer_careers',
    location: 'Boston, Massachusetts',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    salaryText: '$342,000–$433,000',
    salaryDisclosed: true,
    salaryMin: 342000,
    salaryMax: 433000,
    postedAt: '2026-10-21',
    lastCheckedAt: '2026-10-23',
    status: 'active',
    specialization: 'Clinical Development',
    industry: 'Pharmaceuticals & Biotechnology',
    seniority: 'Vice President',
    summary: 'Senior oncology clinical-development leadership across a substantial part of the oncology portfolio.',
    responsibilities: ['Set clinical-development strategy'],
    qualifications: ['MD or equivalent'],
  },
  {
    id: 'job-agilent',
    slug: 'agilent-vp-strategy-business-development',
    title: 'Vice President, Strategy & Business Development – Advanced Therapeutics Division',
    employer: 'Agilent',
    officialSourceUrl: 'https://agilent.wd5.myworkdayjobs.com/en-US/Agilent_Careers/job/Vice-President--Strategy---Business-Development---Advanced-Therapeutics-Division_4040500',
    officialApplyUrl: 'https://agilent.wd5.myworkdayjobs.com/en-US/Agilent_Careers/job/Vice-President--Strategy---Business-Development---Advanced-Therapeutics-Division_4040500',
    applyButtonLabel: 'Apply on Agilent’s Official Careers Site',
    sourceType: 'employer_ats',
    location: 'Santa Clara, California; Boston, Massachusetts; Boulder, Colorado; US Remote',
    workplaceType: 'Remote',
    employmentType: 'Full-time',
    salaryText: 'Not disclosed by employer',
    salaryDisclosed: false,
    postedAt: '2026-10-17',
    applicationDeadline: '2026-10-30',
    lastCheckedAt: '2026-10-23',
    status: 'active',
    specialization: 'Strategy & Business Development',
    industry: 'Pharmaceuticals & Biotechnology',
    seniority: 'Vice President',
    summary: 'Enterprise leadership role responsible for strategy, growth, business development, and overall performance.',
    responsibilities: ['Lead divisional strategy'],
    qualifications: ['Enterprise CDMO leadership experience'],
  },
];

test('Employer enquiry validation enforces required fields and privacy acknowledgement', () => {
  const invalid = validateEmployerEnquiry({
    fullName: '',
    businessEmail: 'bad-email',
    companyName: '',
    jobTitle: '',
    industry: '',
    positionToFill: '',
    seniorityLevel: '',
    privacyAccepted: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.businessEmail);
  assert.ok(invalid.errors.privacyAccepted);

  const valid = validateEmployerEnquiry({
    fullName: 'Eleanor Vance',
    businessEmail: 'evance@biotechcorp.com',
    companyName: 'Vance Therapeutics',
    jobTitle: 'Chief Human Resources Officer',
    industry: 'Pharmaceuticals and Biotechnology',
    positionToFill: 'VP of Regulatory Affairs',
    seniorityLevel: 'Vice President',
    privacyAccepted: true,
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('CV validation permits PDF/DOCX under 5MB and rejects unsupported or oversized files', () => {
  assert.equal(
    validateCvFile({
      fileName: 'Executive_CV.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 1024 * 500,
    }),
    null
  );

  const badExt = validateCvFile({
    fileName: 'script.exe',
    mimeType: 'application/octet-stream',
    sizeBytes: 1024,
  });
  assert.ok(badExt?.includes('PDF, DOC, or DOCX'));

  const tooLarge = validateCvFile({
    fileName: 'Portfolio_CV.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    sizeBytes: 6 * 1024 * 1024,
  });
  assert.ok(tooLarge?.includes('5 MB'));
});

test('Job deadline expiry logic automatically marks Agilent expired after 30 October 2026', () => {
  const agilent = sampleJobs[1];
  assert.equal(isJobExpired(agilent, '2026-10-29'), false);
  assert.equal(isJobExpired(agilent, '2026-10-30'), false);
  assert.equal(isJobExpired(agilent, '2026-10-31'), true);
});

test('Job filtering filters by keyword, salary disclosure, and excludes expired listings by default', () => {
  const activeOnOct29 = filterAndSortJobs(sampleJobs, { keyword: 'Vice President' }, '2026-10-29');
  assert.equal(activeOnOct29.length, 2);

  const activeOnNov1 = filterAndSortJobs(sampleJobs, { keyword: 'Vice President' }, '2026-11-01');
  assert.equal(activeOnNov1.length, 1);
  assert.equal(activeOnNov1[0].employer, 'Servier');

  const disclosedOnly = filterAndSortJobs(sampleJobs, { salaryRange: 'disclosed' }, '2026-10-29');
  assert.equal(disclosedOnly.length, 1);
  assert.equal(disclosedOnly[0].employer, 'Servier');
});

test('Superseded team emails are blocked from public display', () => {
  assert.equal(sanitizePublicTeamEmail('divinecareerstrategy@gmail.com'), undefined);
  assert.equal(sanitizePublicTeamEmail('piersfishersearch@gmail.com'), undefined);
  assert.equal(sanitizePublicTeamEmail('piersfisherexecutivesearch@gmail.com'), undefined);
  assert.equal(sanitizePublicTeamEmail('alexander.divine.hr@gmail.com'), 'alexander.divine.hr@gmail.com');
  assert.equal(sanitizePublicTeamEmail('paulpatog@gmail.com'), 'paulpatog@gmail.com');
  assert.equal(sanitizePublicTeamEmail('pier.fisher.hr@gmail.com'), 'pier.fisher.hr@gmail.com');
});

test('Candidate, Contact, and Career Interest validations enforce required fields', () => {
  const candidate = validateCandidateSubmission({
    fullName: 'Dr. Marcus Hale',
    email: 'marcus.hale@clinical.org',
    currentJobTitle: 'Senior Medical Director',
    professionalFunction: 'Clinical Development',
    industrySpecialization: 'Pharmaceuticals & Biotechnology',
    targetPositions: 'VP Clinical Development',
    preferredLocation: 'Boston, MA / Hybrid',
    privacyAccepted: true,
  });
  assert.equal(candidate.valid, true);

  const contact = validateContactEnquiry({
    fullName: 'Sarah Jenkins',
    email: 'sjenkins@corp.com',
    enquiryType: 'Employer Search Enquiry',
    subject: 'Confidential CFO Search',
    message: 'We would like to schedule a confidential consultation regarding an upcoming Q4 search.',
    privacyAccepted: true,
  });
  assert.equal(contact.valid, true);

  const career = validateCareerInterest({
    firstName: 'Jordan',
    lastName: 'Blake',
    email: 'jordan.blake@talent.com',
    areaOfInterest: 'Executive Search & Talent Research',
    privacyAccepted: true,
  });
  assert.equal(career.valid, true);
});

test('100 Executive Search Opportunity Profiles catalogue has 100 unique references and honest publication statuses', () => {
  assert.equal(HUNDRED_OPPORTUNITY_PROFILES.length, 100);
  assert.equal(HUNDRED_OPPORTUNITY_PROFILES[0].jobReference, 'ACS-EXEC-001');
  assert.equal(HUNDRED_OPPORTUNITY_PROFILES[99].jobReference, 'ACS-EXEC-100');

  const firstFive = HUNDRED_OPPORTUNITY_PROFILES.slice(0, 5);
  assert.ok(firstFive.every((j) => j.status === 'previously_identified'));

  const remainingNinetyFive = HUNDRED_OPPORTUNITY_PROFILES.slice(5);
  assert.ok(remainingNinetyFive.every((j) => j.status === 'representative'));

  // Verify every opportunity routes applications through Alexanders Career Strategy (/jobs/:slug#apply)
  assert.ok(
    HUNDRED_OPPORTUNITY_PROFILES.every((j) => j.officialApplyUrl.startsWith('/jobs/'))
  );

  // Filter by employer (e.g. Microsoft)
  const microsoftRoles = filterAndSortJobs(
    HUNDRED_OPPORTUNITY_PROFILES,
    { employer: 'Microsoft' },
    '2026-10-29'
  );
  assert.ok(microsoftRoles.length >= 1);
  assert.ok(microsoftRoles.every((j) => j.employer === 'Microsoft'));

  // Filter by publicationStatus
  const prevIdentified = filterAndSortJobs(
    HUNDRED_OPPORTUNITY_PROFILES,
    { publicationStatus: 'previously_identified' },
    '2026-10-29'
  );
  assert.equal(prevIdentified.length, 5);
});

test('Job application validation enforces candidate details, optional CV file validation, and privacy consent', () => {
  const invalid = validateJobApplication({
    jobReference: 'ACS-EXEC-001',
    jobTitle: 'SVP & COO, Cloud & Success',
    targetEmployer: 'Salesforce',
    fullName: '',
    email: 'not-an-email',
    phone: '',
    currentLocation: '',
    preferredArrangement: '',
    privacyAccepted: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.equal(invalid.errors.cvFile, undefined);
  assert.ok(invalid.errors.privacyAccepted);

  // Valid without CV (optional for job seekers)
  const validWithoutCv = validateJobApplication({
    jobReference: 'ACS-EXEC-001',
    jobTitle: 'SVP & COO, Cloud & Success',
    targetEmployer: 'Salesforce',
    fullName: 'Dr. Helena Vance',
    email: 'helena.vance@exec.org',
    phone: '+1 617 555 0199',
    currentLocation: 'Boston, MA',
    preferredArrangement: 'Hybrid',
    privacyAccepted: true,
  });
  assert.equal(validWithoutCv.valid, true);

  // Valid with CV attached
  const valid = validateJobApplication({
    jobReference: 'ACS-EXEC-001',
    jobTitle: 'SVP & COO, Cloud & Success',
    targetEmployer: 'Salesforce',
    fullName: 'Dr. Helena Vance',
    email: 'helena.vance@exec.org',
    phone: '+1 617 555 0199',
    currentLocation: 'Boston, MA',
    preferredArrangement: 'Hybrid',
    salaryExpectations: '$420,000 base + equity',
    candidateFeedback: 'Available for confidential Q1 onboarding.',
    cvFile: {
      fileName: 'Helena_Vance_Executive_CV.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 245000,
    },
    privacyAccepted: true,
  });
  assert.equal(valid.valid, true);
});

test('120 U.S. Executive & Senior-Level Vacancy Leads dataset has 120 complete draft records and honest salary/URL rules', () => {
  assert.equal(ONE_TWENTY_VACANCY_LEADS.length, 120);
  assert.equal(ONE_TWENTY_VACANCY_LEADS[0].leadNumber, 1);
  assert.equal(ONE_TWENTY_VACANCY_LEADS[0].title, 'Chief Executive Officer');
  assert.equal(ONE_TWENTY_VACANCY_LEADS[0].employer, 'Children’s Home Network');
  assert.equal(ONE_TWENTY_VACANCY_LEADS[119].leadNumber, 120);
  assert.equal(ONE_TWENTY_VACANCY_LEADS[119].title, 'Launch Systems Deputy Programs Director 2');
  assert.equal(ONE_TWENTY_VACANCY_LEADS[119].employer, 'Northrop Grumman');

  // Every imported lead starts in verification_required status with null applicationUrl
  assert.ok(
    ONE_TWENTY_VACANCY_LEADS.every(
      (j) =>
        j.status === 'verification_required' &&
        j.verificationStatus === 'verificationRequired' &&
        j.applicationUrl === null &&
        j.responsibilities.length >= 4 &&
        j.qualifications.length >= 4
    )
  );

  // Undisclosed salaries have null salaryMin/salaryMax and 'Salary not disclosed'
  const undisclosed = ONE_TWENTY_VACANCY_LEADS.filter((j) => !j.salaryDisclosed);
  assert.ok(undisclosed.length > 0);
  assert.ok(
    undisclosed.every(
      (j) => j.salaryMin === null && j.salaryMax === null && j.salaryText === 'Salary not disclosed'
    )
  );
});

test('mergeJobsIdempotently preserves existing jobs, prevents duplicates on re-run, and never overwrites verified jobs', () => {
  const firstRun = mergeJobsIdempotently(HUNDRED_OPPORTUNITY_PROFILES, ONE_TWENTY_VACANCY_LEADS);
  assert.equal(firstRun.report.considered, 120);
  assert.equal(firstRun.report.inserted + firstRun.report.updated, 120);
  assert.ok(firstRun.jobs.length >= 120);

  // Second run on already-merged collection produces zero new insertions and prevents 120 duplicates
  const secondRun = mergeJobsIdempotently(firstRun.jobs, ONE_TWENTY_VACANCY_LEADS);
  assert.equal(secondRun.report.considered, 120);
  assert.equal(secondRun.report.inserted, 0);
  assert.equal(secondRun.report.updated, 0);
  assert.equal(secondRun.report.duplicates, 120);
  assert.equal(secondRun.jobs.length, firstRun.jobs.length);

  // Verified job is never overwritten by a draft import
  const verifiedCustomList: JobListingRecord[] = [
    {
      ...ONE_TWENTY_VACANCY_LEADS[0],
      status: 'active',
      verificationStatus: 'verified',
      title: 'Chief Executive Officer',
      employer: 'Children’s Home Network',
      salaryText: '$310,000 Verified',
      applicationUrl: 'https://careers.childrenshomenetwork.org/ceo',
    },
  ];
  const verifiedMerge = mergeJobsIdempotently(verifiedCustomList, ONE_TWENTY_VACANCY_LEADS);
  const preservedHero = verifiedMerge.jobs.find((j) => j.employer === 'Children’s Home Network');
  assert.ok(preservedHero);
  assert.equal(preservedHero.status, 'active');
  assert.equal(preservedHero.salaryText, '$310,000 Verified');
  assert.equal(preservedHero.applicationUrl, 'https://careers.childrenshomenetwork.org/ceo');
});

test('filterAndSortJobs hides Paused, Filled, and Closed jobs from public results unless includeArchived is true', () => {
  const mixedJobs: JobListingRecord[] = [
    { ...ONE_TWENTY_VACANCY_LEADS[0], status: 'verification_required' },
    { ...ONE_TWENTY_VACANCY_LEADS[1], status: 'active', verificationStatus: 'verified' },
    { ...ONE_TWENTY_VACANCY_LEADS[2], status: 'paused', verificationStatus: 'archived' },
    { ...ONE_TWENTY_VACANCY_LEADS[3], status: 'filled', verificationStatus: 'archived' },
    { ...ONE_TWENTY_VACANCY_LEADS[4], status: 'closed', verificationStatus: 'archived' },
  ];

  const publicVisible = filterAndSortJobs(mixedJobs, { includeExpired: true }, '2026-10-31');
  assert.equal(publicVisible.length, 2);

  const withArchived = filterAndSortJobs(
    mixedJobs,
    { includeExpired: true, includeArchived: true },
    '2026-10-31'
  );
  assert.equal(withArchived.length, 5);
});



