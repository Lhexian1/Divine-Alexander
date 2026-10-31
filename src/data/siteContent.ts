import { type JobListingRecord, type JobImportReport } from '../utils/validation';
import { HUNDRED_OPPORTUNITY_PROFILES } from './hundredOpportunities';
import { ONE_TWENTY_VACANCY_LEADS, mergeJobsIdempotently } from './oneTwentyVacancyLeads';
export type InsightArticle = InsightArticleRecord;

export interface SiteSettingsConfig {
  brandName: string;
  tagline: string;
  brandPromise: string;
  primaryMarket: string;
  canonicalSiteUrl: string;
  logoText: string;
  monogram: string;
  colors: {
    forestGreen: string;
    deepGreen: string;
    richBlack: string;
    goldAccent: string;
    lightGold: string;
    warmWhite: string;
    lightNeutral: string;
    neutralBorder: string;
    charcoal: string;
    mutedText: string;
  };
  publicContact: {
    generalEmailConfigured: boolean;
    generalEmailDisplay: string;
    phoneConfigured: boolean;
    phoneDisplay: string;
    linkedInCompanyConfigured: boolean;
    linkedInCompanyUrl: string;
  };
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  footerDescription: string;
  footerCtaHeading: string;
  footerCtaText: string;
  footerCtaButton: string;
  navHoverImages?: Record<string, string>;
}

export interface PageContentRecord {
  slug: string;
  title: string;
  heroKicker: string;
  heroHeading: string;
  heroText: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
}

export interface TeamMemberRecord {
  slug: string;
  name: string;
  suggestedSpecialtyTitle: string;
  suggestedProfileCopy: string;
  roleVerifiedByOwner: boolean;
  approvedPublicEmail?: string;
  socialLinks: {
    platform: 'X' | 'Facebook' | 'LinkedIn';
    url: string;
    label: string;
  }[];
  imagePath: string;
  photoSuppliedByOwner: boolean;
  photoStatusNote: string;
  displayOrder: number;
  published: boolean;
}

export interface InsightArticleRecord {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  excerpt: string;
  paragraphs: string[];
  authorVerified: boolean;
  authorName?: string;
  publishDateVerified: boolean;
  publishDate?: string;
  imagePath: string;
  imageAlt: string;
  status: 'published' | 'draft_review';
  seoTitle: string;
  seoDescription: string;
}

export interface DisciplineExpertiseCard {
  id: string;
  title: string;
  summary: string;
  illustrativeRoles: string[];
  ctaLabel: string;
  ctaUrl: string;
}

export interface EmployerServiceBlock {
  id: string;
  number: string;
  title: string;
  whoItServes: string;
  whenUseful: string;
  whatItInvolves: string;
  ctaLabel: string;
}

export interface SearchStageRecord {
  step: string;
  shortName: string;
  title: string;
  description: string;
  deliverableType: string;
}

export interface DetailedIndustrySection {
  id: string;
  title: string;
  shortSummary: string;
  paragraphs: string[];
  challenges: string[];
  illustrativeRoles: string[];
  howTargetedSearchHelps: string;
}

export interface InternalCareerOpening {
  id: string;
  title: string;
  location: string;
  department: string;
  summary: string;
  published: boolean;
}

export interface FullCmsStore {
  siteSettings: SiteSettingsConfig;
  pages: PageContentRecord[];
  teamMembers: TeamMemberRecord[];
  articles: InsightArticleRecord[];
  jobs: JobListingRecord[];
  jobImportReport?: JobImportReport;
  disciplineCards: DisciplineExpertiseCard[];
  employerServices: EmployerServiceBlock[];
  searchStages: SearchStageRecord[];
  industries: DetailedIndustrySection[];
  internalCareerOpenings: InternalCareerOpening[];
  updatedAt: string;
}

export const INITIAL_SITE_SETTINGS: SiteSettingsConfig = {
  brandName: 'Alexanders Career Strategy',
  tagline: 'Executive Search. Exceptional Talent. Strategic Impact.',
  brandPromise: 'Executive Search. Exceptional Talent. Strategic Impact.',
  primaryMarket: 'United States',
  canonicalSiteUrl: 'https://www.alexanderscareerstrategy.com',
  logoText: 'Alexanders Career Strategy',
  monogram: 'ACS',
  colors: {
    forestGreen: '#1E3A8A',
    deepGreen: '#0F2350',
    richBlack: '#0A1633',
    goldAccent: '#FACC15',
    lightGold: '#FDE047',
    warmWhite: '#F8FAFC',
    lightNeutral: '#EFF6FF',
    neutralBorder: '#CBD5E1',
    charcoal: '#1E293B',
    mutedText: '#475569',
  },
  publicContact: {
    generalEmailConfigured: false,
    generalEmailDisplay: '',
    phoneConfigured: false,
    phoneDisplay: 'By scheduled consultation',
    linkedInCompanyConfigured: false,
    linkedInCompanyUrl: '',
  },
  defaultSeoTitle: 'Alexanders Career Strategy | Executive Search & Headhunting (United States)',
  defaultSeoDescription:
    'Alexanders Career Strategy helps organizations across the United States identify and attract exceptional executives, senior leaders, and specialist professionals.',
  footerDescription:
    'Alexanders Career Strategy is an executive search and recruitment firm focused on identifying exceptional executives, senior leaders, and specialist professionals for organizations across multiple industries.',
  footerCtaHeading: "Let's Find the Right Talent",
  footerCtaText:
    'Connect with Alexanders Career Strategy to discuss your executive search, senior recruitment, or specialist talent requirements.',
  footerCtaButton: 'Contact Our Team',
  navHoverImages: {},
};

export const INITIAL_PAGES: PageContentRecord[] = [
  {
    slug: '/',
    title: 'Home',
    heroKicker: 'Independent Executive Search & Headhunting · United States',
    heroHeading: 'Executive Search. Exceptional Talent. Strategic Impact.',
    heroText:
      'Alexanders Career Strategy helps organizations identify and attract exceptional executives, senior leaders, and specialist professionals. Through targeted research, direct outreach, and a relationship-led approach, we connect employers with candidates whose experience and capabilities align with their strategic objectives.',
    heroImage: '/src/assets/images/regenerated_image_1793294161466.jpg',
    heroImageAlt:
      'Executive leadership consultation and boardroom alignment at Alexanders Career Strategy',
    heroImageCaption:
      'Relationship-led executive search and targeted talent research across the United States.',
    primaryCtaLabel: 'Discuss a Hiring Need',
    primaryCtaUrl: '/employers#enquiry-form',
    secondaryCtaLabel: 'Explore Our Expertise',
    secondaryCtaUrl: '/expertise',
    seoTitle: 'Alexanders Career Strategy | Executive Search & Headhunting',
    seoDescription:
      'Independent executive search and headhunting consultancy serving the United States market. Executive Search. Exceptional Talent. Strategic Impact.',
    published: true,
  },
  {
    slug: '/employers',
    title: 'For Employers',
    heroKicker: 'For Hiring Organizations, Boards & Executive Leaders',
    heroHeading: 'Find the People Who Move Your Business Forward.',
    heroText:
      'We partner with organizations to identify, engage, and evaluate professionals for critical leadership and specialist positions through focused search and personalized recruitment.',
    heroImage: '/src/assets/images/regenerated_image_1793268848419.jpg',
    heroImageAlt: 'Executive search consultation and talent mapping for hiring organizations',
    primaryCtaLabel: 'Request a Search Consultation',
    primaryCtaUrl: '#enquiry-form',
    seoTitle:
      'For Employers | Executive Search & Senior Leadership Recruitment — Alexanders Career Strategy',
    seoDescription:
      'Partner with Alexanders Career Strategy to identify, engage, and evaluate accomplished executives and specialist professionals across the United States.',
    published: true,
  },
  {
    slug: '/candidates',
    title: 'For Candidates',
    heroKicker: 'For Executives, Senior Leaders & Specialist Professionals',
    heroHeading: 'Your Experience. The Right Opportunity.',
    heroText:
      'We build relationships with talented professionals and help connect relevant experience with opportunities that align with organizational needs and individual career goals.',
    heroImage: '/src/assets/images/regenerated_image_1793298524657.jpg',
    heroImageAlt: 'Executive career strategy and confidential candidate relationship conversation',
    primaryCtaLabel: 'Submit Your CV',
    primaryCtaUrl: '#cv-form',
    secondaryCtaLabel: 'Browse Selected Opportunities',
    secondaryCtaUrl: '/jobs',
    seoTitle:
      'For Candidates | Executive Career Opportunities & CV Registration — Alexanders Career Strategy',
    seoDescription:
      'Connect confidentially with Alexanders Career Strategy and submit your executive CV for consideration in relevant leadership search assignments.',
    published: true,
  },
  {
    slug: '/expertise',
    title: 'Our Expertise',
    heroKicker: 'Executive Search & Specialist Recruitment Disciplines',
    heroHeading: 'Our Expertise',
    heroText:
      'Alexanders Career Strategy specializes in executive search, headhunting, senior management recruitment, and targeted talent identification. From C-suite appointments to specialist and hard-to-fill roles, our approach is shaped by the requirements of each assignment.',
    heroImage: '/src/assets/images/regenerated_image_1793299200419.jpg',
    heroImageAlt: 'Executive search expertise and functional specializations',
    primaryCtaLabel: 'Start an Executive Search',
    primaryCtaUrl: '/employers#enquiry-form',
    seoTitle: 'Our Expertise | C-Suite, Board & Specialist Recruitment — Alexanders Career Strategy',
    seoDescription:
      'Explore our executive search expertise across Accounting & Finance, Risk, Legal & Compliance, Technology, Operations, HR, Sales & Marketing, and Engineering.',
    published: true,
  },
  {
    slug: '/industries',
    title: 'Industries We Serve',
    heroKicker: 'Industries We Serve · Cross-Sector Executive Search',
    heroHeading: 'Industries We Serve',
    heroText:
      'Effective executive recruitment requires an understanding of the environment in which a leader will operate. Alexanders Career Strategy supports searches across multiple industries, adapting candidate requirements to the responsibilities of each role and the needs of the organization.',
    heroImage: '/src/assets/images/regenerated_image_1793294161466.jpg',
    heroImageAlt: 'Cross-industry executive search and leadership recruitment',
    primaryCtaLabel: 'Discuss Your Industry Search',
    primaryCtaUrl: '/employers#enquiry-form',
    seoTitle:
      'Industries We Serve | Healthcare, Pharma, Biotech & Technology Search — Alexanders Career Strategy',
    seoDescription:
      'Specialized executive search across Healthcare, Pharmaceuticals & Biotechnology, Medical Devices, Procurement, Technology, Financial Services, and Manufacturing.',
    published: true,
  },
  {
    slug: '/approach',
    title: 'Our Approach',
    heroKicker: 'Executive Search Methodology',
    heroHeading: 'A Disciplined Approach to Finding the Right People.',
    heroText:
      'A successful executive search begins with a clear definition of the opportunity and a shared understanding of what the organization needs. Alexanders Career Strategy follows a structured approach designed to identify relevant talent, engage suitable professionals, and help employers make informed recruitment decisions.',
    heroImage: '/src/assets/images/regenerated_image_1793299190928.jpg',
    heroImageAlt: 'Structured eight-stage executive search methodology',
    primaryCtaLabel: 'Start a Conversation',
    primaryCtaUrl: '/employers#enquiry-form',
    seoTitle:
      'Our Search Process | 8-Stage Executive Search Methodology — Alexanders Career Strategy',
    seoDescription:
      'Learn how our disciplined eight-stage executive search process supports role discovery, talent mapping, direct outreach, and candidate evaluation.',
    published: true,
  },
  {
    slug: '/about',
    title: 'About Us',
    heroKicker: 'About Alexanders Career Strategy',
    heroHeading: 'Focused Research. Professional Integrity. Meaningful Relationships.',
    heroText:
      'Alexanders Career Strategy is an executive search and recruitment firm focused on identifying and attracting qualified leadership talent and specialist professionals across the United States.',
    heroImage: '/src/assets/images/regenerated_image_1793299190928.jpg',
    heroImageAlt: 'Collaborative executive search discussion at Alexanders Career Strategy',
    primaryCtaLabel: 'Contact Our Team',
    primaryCtaUrl: '/contact',
    seoTitle: 'About Us | Mission, Values & Search Philosophy — Alexanders Career Strategy',
    seoDescription:
      'Learn about Alexanders Career Strategy, an independent executive search firm built around focused research, integrity, and meaningful relationships.',
    published: true,
  },
  {
    slug: '/team',
    title: 'Meet Our Team',
    heroKicker: 'Our Team Directory',
    heroHeading: 'Meet Our Team',
    heroText:
      'Executive search is built on trust, sound judgment, and meaningful relationships. Meet the people behind Alexanders Career Strategy.',
    heroImage: '/src/assets/images/regenerated_image_1793294161466.jpg',
    heroImageAlt: 'Alexanders Career Strategy consultant directory',
    seoTitle: 'Meet Our Team | Executive Search Consultants — Alexanders Career Strategy',
    seoDescription:
      'Meet the people behind Alexanders Career Strategy: Alexander Divine, Paul Alexander, Piers Fisher, Fred Geerken, and Eunice Angelo.',
    published: true,
  },
  {
    slug: '/jobs',
    title: 'Jobs & Vacancies',
    heroKicker: 'Executive & Specialist Opportunities',
    heroHeading: 'Find Your Next Opportunity',
    heroText:
      'Explore selected professional and leadership opportunities from employer career pages. Review the role requirements and use the official application link to submit your application directly to the hiring organization.',
    heroImage: '/src/assets/images/regenerated_image_1793268848419.jpg',
    heroImageAlt: 'Selected senior leadership and specialist vacancies',
    seoTitle:
      'Jobs & Vacancies Board | Selected Executive Opportunities — Alexanders Career Strategy',
    seoDescription:
      'Explore selected senior leadership and clinical development opportunities from employer career pages or share your CV with Alexanders Career Strategy.',
    published: true,
  },
  {
    slug: '/careers',
    title: 'Careers at Alexanders Career Strategy',
    heroKicker: 'Careers at Alexanders Career Strategy',
    heroHeading: 'Build a Career That Shapes Leadership',
    heroText:
      'At Alexanders Career Strategy, we believe exceptional businesses are built by exceptional people. We bring together professional insight, meaningful relationships, and a commitment to identifying the leaders who help organizations move forward.',
    heroImage: '/src/assets/images/regenerated_image_1793299190928.jpg',
    heroImageAlt: 'Collaborative executive search culture at Alexanders Career Strategy',
    primaryCtaLabel: 'Explore Career Opportunities',
    primaryCtaUrl: '#career-opportunities',
    secondaryCtaLabel: 'Meet Our Team',
    secondaryCtaUrl: '/team',
    seoTitle: 'Careers at Alexanders Career Strategy | Build a Career That Shapes Leadership',
    seoDescription:
      'Explore internal career perspectives, guiding principles, and register your interest in joining Alexanders Career Strategy.',
    published: true,
  },
  {
    slug: '/insights',
    title: 'Insights',
    heroKicker: 'Executive Search Perspectives & Editorial Hub',
    heroHeading: 'Insights',
    heroText:
      'The executive recruitment landscape continues to evolve as organizations respond to changing business priorities, emerging technologies, workforce expectations, and competition for experienced leadership talent. Our Insights section explores topics relevant to employers, executives, and professionals, including executive search strategies, leadership recruitment, candidate evaluation, talent mapping, and career development.',
    heroImage: '/src/assets/images/regenerated_image_1793299200419.jpg',
    heroImageAlt: 'Editorial insights on executive search and leadership',
    seoTitle:
      'Insights & Perspectives | Executive Search & Leadership Articles — Alexanders Career Strategy',
    seoDescription:
      'Read practical perspectives on executive search, defining candidate profiles, talent mapping, executive CVs, confidentiality, and cross-industry hiring.',
    published: true,
  },
  {
    slug: '/contact',
    title: 'Contact Us',
    heroKicker: 'Connect With Alexanders Career Strategy',
    heroHeading: 'Contact Us',
    heroText:
      'Whether you are an employer seeking executive talent, an organization planning a specialist search, or a professional interested in relevant opportunities, we welcome your enquiry.',
    heroImage: '/src/assets/images/regenerated_image_1793298524657.jpg',
    heroImageAlt: 'Contact Alexanders Career Strategy',
    seoTitle: 'Contact Us | Employer & Candidate Enquiries — Alexanders Career Strategy',
    seoDescription:
      'Contact Alexanders Career Strategy to discuss an executive hiring requirement, introduce yourself as a candidate, or connect with our team.',
    published: true,
  },
];

export const INITIAL_TEAM_MEMBERS: TeamMemberRecord[] = [
  {
    slug: 'alexander-divine',
    name: 'Alexander Divine',
    suggestedSpecialtyTitle: 'Executive Search & Talent Strategy',
    suggestedProfileCopy:
      'Alexander’s profile focuses on executive search, talent strategy, and professional career development. His work at Alexanders Career Strategy centers on understanding organizational hiring needs, identifying promising talent, and supporting meaningful connections between businesses and professionals.',
    roleVerifiedByOwner: false,
    approvedPublicEmail: undefined,
    socialLinks: [
      {
        platform: 'X',
        url: 'https://x.com/Divinecareers',
        label: 'Alexander Divine on X (@Divinecareers)',
      },
      {
        platform: 'Facebook',
        url: 'https://www.facebook.com/share/1MBZjCZnLH/',
        label: 'Alexander Divine on Facebook',
      },
    ],
    imagePath: '/images/team/alexander-divine.webp',
    photoSuppliedByOwner: false,
    photoStatusNote:
      'Awaiting owner upload at public/images/team/alexander-divine.webp. Renders plain & unblurred immediately once supplied.',
    displayOrder: 1,
    published: true,
  },
  {
    slug: 'paul-alexander',
    name: 'Paul Alexander',
    suggestedSpecialtyTitle: 'Recruitment Coordination & Candidate Relations',
    suggestedProfileCopy:
      'Paul’s proposed area of focus is recruitment coordination and candidate relations. This profile emphasizes clear communication, professional engagement, and supporting a positive recruitment experience for candidates and organizations seeking talent.',
    roleVerifiedByOwner: false,
    approvedPublicEmail: undefined,
    socialLinks: [],
    imagePath: '/images/team/paul-alexander.webp',
    photoSuppliedByOwner: false,
    photoStatusNote:
      'Awaiting owner upload at public/images/team/paul-alexander.webp. Renders plain & unblurred immediately once supplied.',
    displayOrder: 2,
    published: true,
  },
  {
    slug: 'piers-fisher',
    name: 'Piers Fisher',
    suggestedSpecialtyTitle: 'Talent Research & Executive Search',
    suggestedProfileCopy:
      'Piers’s proposed area of focus is talent research and executive search. This profile emphasizes identifying relevant professionals, understanding talent markets, and connecting organizations with candidates whose experience and capabilities align with leadership and specialist requirements.',
    roleVerifiedByOwner: false,
    approvedPublicEmail: undefined,
    socialLinks: [],
    imagePath: '/images/team/piers-fisher.webp',
    photoSuppliedByOwner: false,
    photoStatusNote:
      'Owner noted photograph will be added at public/images/team/piers-fisher.webp. Neutral monogram placeholder active.',
    displayOrder: 3,
    published: true,
  },
  {
    slug: 'fred-geerken',
    name: 'Fred Geerken',
    suggestedSpecialtyTitle: 'Professional Networking & Talent Engagement',
    suggestedProfileCopy:
      'Fred’s proposed profile focuses on professional networking and talent engagement, highlighting the value of industry connections and identifying professionals who may align with relevant career opportunities and executive search assignments.',
    roleVerifiedByOwner: false,
    approvedPublicEmail: undefined,
    socialLinks: [
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/fred-g-geerken-2a92b25/',
        label: 'Fred Geerken on LinkedIn',
      },
    ],
    imagePath: '/images/team/fred-geerken.webp',
    photoSuppliedByOwner: false,
    photoStatusNote:
      'Awaiting owner upload at public/images/team/fred-geerken.webp if available. Neutral monogram placeholder active.',
    displayOrder: 4,
    published: true,
  },
  {
    slug: 'eunice-angelo',
    name: 'Eunice Angelo',
    suggestedSpecialtyTitle: 'Candidate Engagement & Talent Development',
    suggestedProfileCopy:
      'Eunice’s proposed area of focus is candidate engagement and talent development. This profile emphasizes understanding career aspirations, supporting professional communication, and helping candidates navigate relevant opportunities throughout the recruitment process.',
    roleVerifiedByOwner: false,
    approvedPublicEmail: undefined,
    socialLinks: [],
    imagePath: '/images/team/eunice-angelo.webp',
    photoSuppliedByOwner: false,
    photoStatusNote:
      'Awaiting owner upload at public/images/team/eunice-angelo.webp. Neutral monogram placeholder active.',
    displayOrder: 5,
    published: true,
  },
];

export const DISCIPLINE_EXPERTISE_CARDS: DisciplineExpertiseCard[] = [
  {
    id: 'accounting-finance',
    title: 'Accounting & Finance',
    summary:
      'Partner with us to identify accounting and finance leaders who can support financial planning, reporting, controls, transformation, and commercial decision-making.',
    illustrativeRoles: ['Chief Financial Officer (CFO)', 'VP of Finance', 'Corporate Controller', 'Director of FP&A'],
    ctaLabel: 'Discuss a Finance Search',
    ctaUrl: '/employers#enquiry-form',
  },
  {
    id: 'risk',
    title: 'Risk',
    summary:
      'Identify risk professionals and leaders who help organizations understand uncertainty, strengthen controls, and support informed decisions.',
    illustrativeRoles: ['Chief Risk Officer', 'Enterprise Risk Director', 'Operational Risk Leader', 'Credit & Market Risk VP'],
    ctaLabel: 'Discuss a Risk Search',
    ctaUrl: '/employers#enquiry-form',
  },
  {
    id: 'legal-compliance',
    title: 'Legal & Compliance',
    summary:
      'Connect with legal and compliance professionals who help organizations meet obligations, manage risk, and operate responsibly.',
    illustrativeRoles: ['General Counsel', 'Chief Compliance Officer', 'VP Regulatory Affairs', 'Corporate Counsel'],
    ctaLabel: 'Discuss a Legal Search',
    ctaUrl: '/employers#enquiry-form',
  },
  {
    id: 'technology',
    title: 'Technology',
    summary:
      'Find technology leaders and specialist professionals across software, data, cybersecurity, infrastructure, engineering, and digital transformation.',
    illustrativeRoles: ['CIO / CTO', 'Chief Information Security Officer (CISO)', 'VP of Engineering', 'Director of Data'],
    ctaLabel: 'Discuss a Technology Search',
    ctaUrl: '/employers#enquiry-form',
  },
  {
    id: 'operations',
    title: 'Operations',
    summary:
      'Identify operations leaders who can improve processes, service delivery, efficiency, quality, and organizational performance.',
    illustrativeRoles: ['Chief Operating Officer (COO)', 'VP of Operations', 'Hospital Operations Director', 'General Manager'],
    ctaLabel: 'Discuss an Operations Search',
    ctaUrl: '/employers#enquiry-form',
  },
  {
    id: 'human-resources',
    title: 'Human Resources',
    summary:
      'Connect with HR and people leaders across talent strategy, organizational development, employee relations, rewards, and workforce planning.',
    illustrativeRoles: ['Chief Human Resources Officer (CHRO)', 'VP of People & Culture', 'HR Director', 'Head of Total Rewards'],
    ctaLabel: 'Discuss an HR Search',
    ctaUrl: '/employers#enquiry-form',
  },
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing',
    summary:
      'Find commercial leaders and specialists who support market development, customer engagement, revenue strategy, brand growth, and business development.',
    illustrativeRoles: ['Chief Commercial Officer (CCO)', 'VP of Sales', 'Business Development Director', 'Chief Marketing Officer'],
    ctaLabel: 'Discuss a Commercial Search',
    ctaUrl: '/employers#enquiry-form',
  },
  {
    id: 'engineering',
    title: 'Engineering',
    summary:
      'Identify engineering and technical leaders across product development, industrial operations, manufacturing, quality, and project delivery.',
    illustrativeRoles: ['VP of Product Development', 'Director of Quality Assurance', 'Plant & Manufacturing Director', 'Principal Systems Engineer'],
    ctaLabel: 'Discuss an Engineering Search',
    ctaUrl: '/employers#enquiry-form',
  },
];

export const HOME_EMPLOYER_SERVICES: EmployerServiceBlock[] = [
  {
    id: 'executive-search',
    number: '01',
    title: 'Executive Search & Headhunting',
    whoItServes: 'Boards, CEOs, founders, and executive leadership teams appointing senior decision-makers.',
    whenUseful: 'When recruiting C-suite officers, division presidents, or strategic leaders where passive talent access is essential.',
    whatItInvolves:
      'We identify and engage qualified executives and senior professionals through targeted research and direct outreach. Our approach helps employers reach relevant candidates who may not be actively searching for new opportunities.',
    ctaLabel: 'Start an Executive Search',
  },
  {
    id: 'c-suite-board',
    number: '02',
    title: 'C-Suite & Board Recruitment',
    whoItServes: 'Corporate boards, private equity/venture stakeholders, and enterprise leadership.',
    whenUseful: 'During strategic inflection points, governance strengthening, or chief executive succession.',
    whatItInvolves:
      'We support searches for senior executives and board-level professionals whose leadership experience, strategic judgment, and professional capabilities align with organizational priorities.',
    ctaLabel: 'Discuss Board & C-Suite Search',
  },
  {
    id: 'senior-leadership',
    number: '03',
    title: 'Senior Management Recruitment',
    whoItServes: 'Executive officers, business unit heads, and Chief Human Resources Officers.',
    whenUseful: 'When building or strengthening functional leadership across clinical, commercial, technology, or operational teams.',
    whatItInvolves:
      'We help employers identify vice presidents, directors, general managers, and department heads who can lead teams, manage operations, and contribute to business objectives.',
    ctaLabel: 'Discuss Senior Leadership Hiring',
  },
  {
    id: 'confidential-headhunting',
    number: '04',
    title: 'Confidential Executive Search',
    whoItServes: 'Organizations managing sensitive leadership transitions or strategic market entry.',
    whenUseful: 'When replacing an incumbent leader, restructuring a division, or planning critical succession discreetly.',
    whatItInvolves:
      'We support discreet recruitment assignments involving sensitive leadership transitions, replacement appointments, succession planning, and other confidential hiring requirements.',
    ctaLabel: 'Request Confidential Consultation',
  },
  {
    id: 'talent-mapping',
    number: '05',
    title: 'Talent Mapping & Market Intelligence',
    whoItServes: 'Talent acquisition leaders, HR executives, and strategic planning committees.',
    whenUseful: 'Prior to launching a complex search, entering a new US region, or benchmarking competitor leadership structures.',
    whatItInvolves:
      'We research relevant talent markets, identify potential candidates, and help employers understand the leadership talent available within their industries and target markets.',
    ctaLabel: 'Explore Talent Mapping',
  },
  {
    id: 'specialist-recruitment',
    number: '06',
    title: 'Specialist & Hard-to-Fill Recruitment',
    whoItServes: 'Department heads and technical leaders in highly regulated or niche disciplines.',
    whenUseful: 'When conventional job postings fail to surface candidates with the required regulatory, scientific, or technical pedigree.',
    whatItInvolves:
      'We conduct targeted searches for specialized professionals and hard-to-fill positions where relevant experience, technical knowledge, and role-specific capabilities are essential.',
    ctaLabel: 'Discuss a Specialist Role',
  },
];

export const DETAILED_INDUSTRIES: DetailedIndustrySection[] = [
  {
    id: 'healthcare-medical',
    title: 'Healthcare & Medical Services',
    shortSummary: 'Healthcare executives, clinical leadership, hospital operations, healthcare IT, and administrative leadership.',
    paragraphs: [
      'Healthcare organizations rely on experienced leaders to support clinical services, operational performance, quality, financial management, and organizational development.',
      'We support searches for suitable healthcare executives, medical leadership professionals, hospital administrators, operations directors, and other senior professionals whose experience aligns with the position.',
      'Potential functional areas include healthcare operations, clinical administration, medical services management, quality, and service delivery.',
    ],
    challenges: [
      'Balancing clinical quality and patient outcomes with operational efficiency and cost stewardship',
      'Leading healthcare IT modernization, EHR integration, and interoperability initiatives',
      'Recruiting physician executives and clinical directors in competitive regional US markets',
    ],
    illustrativeRoles: [
      'Chief Medical Officer (CMO)',
      'Chief Nursing Officer (CNO)',
      'Hospital Operations Director',
      'Healthcare IT Director',
      'Clinical Operations Director',
      'Healthcare Administration Executive',
    ],
    howTargetedSearchHelps:
      'Direct outreach reaches accomplished clinical and administrative leaders currently serving in comparable health systems who rarely respond to public job boards.',
  },
  {
    id: 'pharma-biotech',
    title: 'Pharmaceuticals & Biotechnology',
    shortSummary: 'Medical affairs, regulatory affairs, clinical development, research, quality, and commercial leadership.',
    paragraphs: [
      'Pharmaceutical and biotechnology organizations operate in environments where scientific knowledge, regulatory awareness, product development, manufacturing quality, and commercial execution can be critical.',
      'We support searches for relevant leaders across pharmaceutical operations, research and development, regulatory affairs, quality assurance, manufacturing, supply chain, market access, and commercial functions.',
      'Search criteria are tailored to the specific position and the expertise required.',
    ],
    challenges: [
      'Identifying physician-scientists and VP-level clinical leaders with specific therapeutic modality experience (oncology, ADCs, cell/gene therapy, radiopharmaceuticals, immunology)',
      'Navigating FDA regulatory milestones from IND through registrational trials and NDA/BLA submissions',
      'Building cross-functional alignment across translational medicine, biometrics, safety, and CDMO partners',
    ],
    illustrativeRoles: [
      'VP of Clinical Development',
      'Medical Affairs Director',
      'Regulatory Affairs Director',
      'Clinical Research Director',
      'Quality Assurance Director',
      'Head of Oncology Clinical Development',
    ],
    howTargetedSearchHelps:
      'Targeted talent mapping pinpoints clinical and regulatory leaders with exact therapeutic area and phase-transition experience across US biotech hubs.',
  },
  {
    id: 'medical-devices-life-sciences',
    title: 'Medical Devices & Life Sciences',
    shortSummary: 'Regulatory leadership, quality assurance, product development, diagnostics, and commercial functions.',
    paragraphs: [
      'Medical device, diagnostics, and life sciences companies require rigorous alignment between engineering innovation, regulatory compliance, quality management systems, and commercial adoption.',
      'We support searches for leaders who understand FDA 510(k)/PMA pathways, ISO quality standards, clinical evidence generation, and specialized market access.',
    ],
    challenges: [
      'Securing regulatory and quality leaders experienced with complex hardware, software-as-a-medical-device (SaMD), and molecular diagnostics',
      'Transitioning R&D innovations into scalable, compliant commercial manufacturing',
    ],
    illustrativeRoles: [
      'VP of Regulatory Affairs',
      'Director of Quality',
      'Commercial Director',
      'Product Development Director',
      'Diagnostics Leadership',
    ],
    howTargetedSearchHelps:
      'Focused evaluation assesses both technical regulatory fluency and practical commercialization leadership.',
  },
  {
    id: 'procurement-supply-chain',
    title: 'Logistics, Procurement & Supply Chain',
    shortSummary: 'Chief procurement officers, vice presidents of procurement, strategic sourcing, supply chain leadership, and operations.',
    paragraphs: [
      'Supply chain and logistics operations require coordination across procurement, planning, transportation, warehousing, inventory, supplier relationships, and distribution.',
      'We support searches for procurement leaders, supply chain directors, logistics executives, operations managers, sourcing professionals, and other relevant senior specialists.',
      'Search criteria can include operational scale, cost management, supplier strategy, process improvement, and international supply chain experience.',
    ],
    challenges: [
      'Mitigating global supplier risk, cold-chain complexity, and raw material volatility',
      'Transforming procurement from tactical purchasing into strategic value and margin protection',
    ],
    illustrativeRoles: [
      'Chief Procurement Officer (CPO)',
      'VP of Procurement',
      'Procurement Director',
      'Strategic Sourcing Director',
      'Supply Chain Executive',
    ],
    howTargetedSearchHelps:
      'Connects organizations with leaders proven in complex multi-site sourcing, CDMO/CMO vendor governance, and global logistics.',
  },
  {
    id: 'technology-software',
    title: 'Technology & Digital Leadership',
    shortSummary: 'Technology executives, CIOs, CTOs, information security leaders, product leadership, and digital transformation specialists.',
    paragraphs: [
      'Technology organizations need leaders who can guide product development, engineering, digital transformation, cybersecurity, infrastructure, data, and technology strategy.',
      'We support searches for technology executives, engineering leaders, information technology directors, cybersecurity professionals, data leaders, product executives, and other relevant specialists.',
      'Search criteria consider the organization’s technology environment, business model, and the technical and leadership capabilities required.',
    ],
    challenges: [
      'Hiring architecture-fluent executives who align engineering execution with commercial ROI',
      'Strengthening enterprise cybersecurity governance, cloud resilience, and data platform maturity',
    ],
    illustrativeRoles: [
      'Chief Information Officer (CIO)',
      'Chief Technology Officer (CTO)',
      'Chief Information Security Officer (CISO)',
      'VP of Engineering',
      'Director of Data',
      'Digital Transformation Executive',
    ],
    howTargetedSearchHelps:
      'Evaluates leadership scale, engineering culture stewardship, and architectural credibility beyond surface-level buzzwords.',
  },
  {
    id: 'financial-banking-insurance',
    title: 'Financial Services, Banking & Risk Management',
    shortSummary: 'CEOs, COOs, CFOs, risk leaders, compliance executives, corporate finance, and commercial banking leadership.',
    paragraphs: [
      'Financial institutions need professionals who can support business growth, financial discipline, risk management, regulatory compliance, customer relationships, and operational effectiveness.',
      'We support searches across banking, corporate finance, investment-related functions, financial operations, risk, compliance, and other relevant leadership areas.',
      'Insurance and risk-focused organizations require leaders who understand risk evaluation, underwriting, claims, distribution, regulatory obligations, and business performance.',
    ],
    challenges: [
      'Meeting evolving federal and state regulatory scrutiny while modernizing financial operations',
      'Attracting seasoned CFOs, risk officers, and actuarial/underwriting leaders with institutional discipline',
    ],
    illustrativeRoles: [
      'Chief Financial Officer (CFO)',
      'Chief Risk Officer (CRO)',
      'VP of Corporate Finance',
      'Head of Compliance & Financial Controls',
      'Claims & Underwriting Director',
    ],
    howTargetedSearchHelps:
      'Discreet outreach engages trusted finance and risk executives with verifiable governance track records.',
  },
  {
    id: 'manufacturing-industrial-energy',
    title: 'Manufacturing, Industrial & Energy Operations',
    shortSummary: 'Plant managers, operations directors, manufacturing executives, engineering leaders, quality professionals, and energy leadership.',
    paragraphs: [
      'Manufacturing businesses depend on leaders who can oversee production, supply chains, engineering, safety, quality, operational efficiency, and continuous improvement.',
      'Energy and natural resources organizations may require leadership experience in project delivery, operations, engineering, safety, asset management, commercial strategy, and regulatory environments.',
      'The search approach reflects the organization’s production environment, operational scale, and technical requirements.',
    ],
    challenges: [
      'Driving EHS excellence, lean operational throughput, and capital project delivery across multi-plant footprints',
      'Recruiting technical operations leaders capable of modernizing legacy industrial assets',
    ],
    illustrativeRoles: [
      'VP of Manufacturing Operations',
      'Plant & Multi-Site Director',
      'Director of EHS & Quality',
      'VP of Engineering & Capital Projects',
      'Energy Operations Executive',
    ],
    howTargetedSearchHelps:
      'Targets hands-on industrial and energy leaders with demonstrated multi-site P&L and safety leadership.',
  },
  {
    id: 'consumer-commercial-services',
    title: 'Consumer Goods, Commercial & Professional Services',
    shortSummary: 'CEOs, COOs, HR leaders, commercial directors, sales leadership, consulting partners, and corporate functions.',
    paragraphs: [
      'Consumer-facing organizations operate in competitive markets where brand strategy, customer understanding, merchandising, distribution, and commercial performance matter.',
      'Professional and business services firms depend on leaders who can develop client relationships, manage teams, improve delivery, and support commercial growth.',
      'Each assignment is tailored to the organization’s service model, client base, and leadership requirements.',
    ],
    challenges: [
      'Appointing revenue and commercial leaders who build durable client partnerships and predictable growth',
      'Aligning human resources, legal, and corporate operations with multi-state growth',
    ],
    illustrativeRoles: [
      'Chief Executive Officer (CEO)',
      'Chief Operating Officer (COO)',
      'Chief Human Resources Officer (CHRO)',
      'VP of Sales & Commercial Strategy',
      'Business Development Director',
      'Managing Director / Practice Leader',
    ],
    howTargetedSearchHelps:
      'Structures candidate assessment around commercial execution, cultural stewardship, and long-term value creation.',
  },
];

export const SEARCH_PROCESS_STAGES: SearchStageRecord[] = [
  {
    step: '01',
    shortName: 'Discover',
    title: 'Stage 1: Client Consultation & Role Definition',
    description:
      'We begin by understanding the organization, the position, its responsibilities, reporting structure, and the business objectives the successful candidate will support. This stage helps establish the essential experience, leadership capabilities, qualifications, and other criteria that will guide the search.',
    deliverableType: 'Core Agreed Engagement',
  },
  {
    step: '02',
    shortName: 'Research',
    title: 'Stage 2: Search Strategy & Talent Mapping',
    description:
      'We develop a targeted search approach based on the role and relevant talent market. Research may include identifying suitable industries, organizations, professional backgrounds, and potential candidate pools.',
    deliverableType: 'Core Agreed Engagement',
  },
  {
    step: '03',
    shortName: 'Identify',
    title: 'Stage 3: Candidate Identification & Outreach',
    description:
      'We identify potential candidates and approach relevant professionals using appropriate and professional communication. The objective is to establish interest, understand relevant experience, and determine whether further consideration is appropriate.',
    deliverableType: 'Core Agreed Engagement',
  },
  {
    step: '04',
    shortName: 'Evaluate',
    title: 'Stage 4: Candidate Screening & Evaluation',
    description:
      'We review candidates against the agreed requirements, considering relevant experience, professional achievements, leadership responsibilities, specialist capabilities, and interest in the opportunity. Any additional assessment should be appropriate to the role and carried out transparently.',
    deliverableType: 'Core Agreed Engagement',
  },
  {
    step: '05',
    shortName: 'Shortlist',
    title: 'Stage 5: Shortlisting & Client Interviews',
    description:
      'Suitable candidates may be presented to the client for consideration. The client can then conduct interviews and evaluate alignment with the role and organization. We support communication and coordination as agreed for the assignment.',
    deliverableType: 'Core Agreed Engagement',
  },
  {
    step: '06',
    shortName: 'Verify',
    title: 'Stage 6: References & Appropriate Checks',
    description:
      'Where required, reference checks and other relevant checks should be conducted with suitable authorization and in accordance with applicable law and agreed procedures.',
    deliverableType: 'Agreed / Authorized Scope',
  },
  {
    step: '07',
    shortName: 'Deliver',
    title: 'Stage 7: Offer & Appointment Support',
    description:
      'We can support communication between the employer and selected candidate during the offer process, subject to the scope agreed for the assignment. The employer remains responsible for its hiring decisions and applicable employment procedures.',
    deliverableType: 'Core Agreed Engagement',
  },
  {
    step: '08',
    shortName: 'Follow-Up',
    title: 'Stage 8: Follow-Up & Transition Communication',
    description:
      'Following an appointment, follow-up may help both parties address outstanding communication and transition matters, depending on the agreed engagement.',
    deliverableType: 'Optional / Agreed Scope',
  },
];

export const INITIAL_INSIGHT_ARTICLES: InsightArticleRecord[] = [
  {
    slug: 'our-approach-to-executive-search',
    title: 'Our Approach to Executive Search',
    category: 'Executive Search and Hiring',
    readingTime: '4 min read',
    excerpt:
      'Every successful executive search begins with understanding the business, the position, and the people who will contribute to its success across Focused Search, Targeted Talent Research, Discreet Engagement, and Personal Partnership.',
    paragraphs: [
      "Focused Search — Every successful executive search begins with understanding the business, the position, and the people who will contribute to its success. We take time to learn about each client's objectives, organisational structure, company culture, and expectations for the role. This allows us to establish a clear candidate profile based on the experience, leadership qualities, and professional capabilities required. Rather than taking a one-size-fits-all approach, we tailor each search to the specific needs of the organisation, ensuring that our efforts remain focused on finding professionals who can make a meaningful contribution.",
      "Targeted Talent Research — Identifying exceptional talent requires more than reviewing incoming applications. We explore relevant industries, professional networks, career histories, and leadership backgrounds to identify individuals whose experience aligns with the opportunity. Our research considers both current responsibilities and previous achievements, helping us understand how a candidate's expertise may translate into a new environment. By looking beyond the immediately available talent pool, we can engage accomplished professionals who may not be actively considering a career move but could be interested in the right opportunity.",
      'Discreet Engagement — Confidentiality is an important part of executive recruitment. Senior professionals may be managing significant responsibilities, leading teams, or considering their next career move privately. We approach these conversations with professionalism, respect, and careful communication. Each interaction is tailored to the individual, providing relevant information while allowing candidates to decide whether they wish to explore the opportunity further. We also recognise the importance of handling personal information responsibly and maintaining appropriate discretion throughout the search process. Our aim is to create an environment where both clients and candidates can communicate openly and confidently.',
      "Personal Partnership — We believe that effective executive search is built on strong relationships, clear communication, and a genuine understanding of people's ambitions. We work closely with clients to understand their priorities, discuss progress, and refine the search as requirements become clearer. At the same time, we listen to candidates to understand their experience, professional goals, and expectations for their next position. This balanced approach helps establish a more complete picture of suitability beyond qualifications and job titles alone. By maintaining a personal and considered approach, we seek to connect organisations with professionals who can support their long-term objectives while helping candidates identify opportunities that align with their capabilities and career aspirations.",
      "At Alexanders Career Strategy, our approach combines focused research, thoughtful engagement, and individual attention at every stage. We recognise that leadership appointments can influence an organisation's direction, culture, and future performance. Our commitment is to approach each search with care, professionalism, and a clear understanding of what success means to both sides.",
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/executive-meeting.svg',
    imageAlt: 'Our Approach to Executive Search at Alexanders Career Strategy',
    status: 'published',
    seoTitle: 'Our Approach to Executive Search | Alexanders Career Strategy',
    seoDescription:
      'Explore our executive search philosophy across Focused Search, Targeted Talent Research, Discreet Engagement, and Personal Partnership.',
  },
  {
    slug: 'why-executive-search-matters-in-leadership-recruitment',
    title: 'Why Executive Search Matters in Leadership Recruitment',
    category: 'Executive Search and Hiring',
    readingTime: '4 min read',
    excerpt:
      'Senior leaders influence strategy, team performance, operational priorities, and the direction of the business. Explore why a structured, research-led search process provides a stronger foundation for leadership appointments.',
    paragraphs: [
      'Finding the right executive is an important decision for any organization. Senior leaders influence strategy, team performance, operational priorities, and the direction of the business. A poorly aligned appointment can create disruption, while the right person can help an organization execute its objectives more effectively.',
      'Executive search provides a structured way to identify and engage professionals whose experience matches a specific leadership requirement. Rather than relying exclusively on applicants who respond to a public vacancy, a targeted search can explore relevant talent markets and approach qualified individuals directly.',
      'The process begins with understanding the role. Employers should define the outcomes expected from the successful candidate, the capabilities needed to achieve them, and the experience that is genuinely essential.',
      'Research and candidate engagement follow. Potential candidates can then be assessed against consistent criteria, helping employers compare relevant experience and make informed decisions.',
      'Executive search is not simply about finding someone with an impressive title. It is about identifying a professional whose capabilities, motivation, and experience align with the organization’s needs.',
      'For employers recruiting into important positions, a clear brief and a disciplined search process provide a useful foundation for better hiring decisions.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/hero-executive-team.svg',
    imageAlt: 'Editorial illustration representing executive search and leadership alignment',
    status: 'published',
    seoTitle: 'Why Executive Search Matters in Leadership Recruitment | Alexanders Career Strategy',
    seoDescription:
      'Learn how structured executive search and targeted outreach help organizations identify and evaluate senior leadership talent.',
  },
  {
    slug: 'how-to-define-the-right-executive-candidate-profile',
    title: 'How to Define the Right Executive Candidate Profile',
    category: 'Leadership and Succession Planning',
    readingTime: '4 min read',
    excerpt:
      'An effective executive search starts with a clear candidate profile. Learn how to define expected outcomes, separate essential criteria from desirable traits, and align stakeholders.',
    paragraphs: [
      'An effective executive search starts with a clear candidate profile. Without one, employers can spend time reviewing professionals who look impressive on paper but do not meet the actual requirements of the role.',
      'The first step is to define the outcomes the new leader must deliver. These may include improving operational performance, developing a commercial function, leading a transformation, strengthening financial controls, or expanding into a new market.',
      'Next, distinguish essential requirements from desirable ones. Essential criteria should relate directly to the responsibilities of the position. Desirable experience can help differentiate candidates but should not unnecessarily restrict the search.',
      'Employers should also consider leadership style, stakeholder management, communication, decision-making, and the ability to operate within the organization’s environment.',
      'The candidate profile should be realistic about compensation, location, reporting lines, and the expectations of the position. Unclear or conflicting requirements can make a search unnecessarily difficult.',
      'A well-defined profile helps recruiters identify relevant candidates, supports more consistent evaluations, and gives interviewers a shared framework for making decisions.',
      'Before beginning a search, employers should be able to explain what success in the role will look like and which capabilities are most important to achieving it.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/executive-meeting.svg',
    imageAlt: 'Editorial illustration of leadership profile definition and stakeholder alignment',
    status: 'published',
    seoTitle: 'How to Define the Right Executive Candidate Profile | Alexanders Career Strategy',
    seoDescription:
      'A practical guide for boards, CEOs, and HR leaders on defining clear outcomes and evaluation criteria before launching an executive search.',
  },
  {
    slug: 'the-value-of-talent-mapping-in-executive-recruitment',
    title: 'The Value of Talent Mapping in Executive Recruitment',
    category: 'Talent Market Insights',
    readingTime: '4 min read',
    excerpt:
      'Talent mapping examines the wider professional landscape before a hiring decision is made, helping organizations understand where relevant leadership capabilities exist in the market.',
    paragraphs: [
      'Talent mapping helps organizations understand where relevant professionals may be found and what experience exists within a particular market.',
      'Instead of beginning with individual applications, talent mapping examines the wider talent landscape. This can involve researching relevant organizations, leadership structures, professional backgrounds, specialist skills, and potential candidate pools.',
      'For employers, this research can provide a clearer view of the market before a hiring decision is made. It may help identify whether a required skill set is common, highly specialized, concentrated in particular industries, or difficult to recruit within a given location.',
      'Talent mapping can also support succession planning and future workforce needs by helping organizations understand the leadership capabilities available in their sector.',
      'The usefulness of a talent map depends on the quality and relevance of the research. Information should be handled responsibly, kept appropriately current, and used in accordance with applicable privacy requirements.',
      'Talent mapping does not guarantee that every identified professional will be available or interested in moving. Its purpose is to improve market understanding and help organizations develop a more informed search strategy.',
      'When combined with a clear role definition and targeted outreach, talent mapping can provide a strong foundation for executive recruitment.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/search-consultation.svg',
    imageAlt: 'Editorial illustration of market intelligence and talent mapping networks',
    status: 'published',
    seoTitle: 'The Value of Talent Mapping in Executive Recruitment | Alexanders Career Strategy',
    seoDescription:
      'Understand how talent mapping and market intelligence support executive recruitment and succession planning.',
  },
  {
    slug: 'what-senior-professionals-should-include-in-an-executive-cv',
    title: 'What Senior Professionals Should Include in an Executive CV',
    category: 'Career Strategy',
    readingTime: '4 min read',
    excerpt:
      'An executive CV should make it easy to understand a leader’s responsibilities, scale of remit, and measurable contribution without relying on vague clichés.',
    paragraphs: [
      'An executive CV should make it easy for a reader to understand the candidate’s responsibilities, leadership experience, and professional contribution.',
      'Begin with a concise professional summary that reflects your experience, areas of expertise, and the types of leadership challenges you have handled. Avoid vague descriptions that could apply to almost any professional.',
      'Your work history should clearly state your positions, employers, dates, and responsibilities. Where possible, describe achievements and outcomes rather than listing duties alone.',
      'For example, explain the scale of a function you led, a process you improved, a team you developed, or a commercial objective you helped deliver. Include figures only when they are accurate and you are comfortable disclosing them.',
      'Relevant qualifications, certifications, industry expertise, board experience, and specialist knowledge can also be important, depending on the role.',
      'Keep the document organized and easy to read. Use consistent formatting, accurate contact information, and language that reflects your actual experience.',
      'An executive CV should be tailored to the type of opportunity being pursued while remaining truthful and complete. Its purpose is to help employers understand your background and determine whether a conversation would be useful.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/candidate-career-conversation.svg',
    imageAlt: 'Editorial illustration of executive career strategy and CV preparation',
    status: 'published',
    seoTitle: 'What Senior Professionals Should Include in an Executive CV | Alexanders Career Strategy',
    seoDescription:
      'Practical guidance for executives and senior leaders on structuring a clear, credible executive CV.',
  },
  {
    slug: 'confidentiality-in-executive-search',
    title: 'Confidentiality in Executive Search',
    category: 'Executive Search and Hiring',
    readingTime: '4 min read',
    excerpt:
      'Discretion and responsible information handling are essential when organizations navigate sensitive leadership transitions or when employed executives explore new opportunities.',
    paragraphs: [
      'Confidentiality can be particularly important when recruiting senior leaders. An executive may be employed elsewhere, an organization may be preparing for a sensitive transition, or a hiring decision may not yet be ready for public announcement.',
      'A professional search process should establish how information will be shared, who is authorized to receive it, and which details can be disclosed at each stage.',
      'For employers, this means agreeing on the confidentiality requirements of the assignment and avoiding unnecessary disclosure of sensitive organizational information.',
      'For candidates, it means explaining the opportunity appropriately, respecting professional boundaries, and handling CVs and personal details with care.',
      'Confidentiality should not be treated as a promise that information can never be disclosed under any circumstances. Information handling must remain consistent with applicable legal obligations, agreed procedures, and legitimate recruitment needs.',
      'Secure storage, restricted access, appropriate communication channels, and clear privacy notices all contribute to responsible information handling.',
      'A thoughtful approach to confidentiality helps establish trust and supports professional relationships between employers, recruiters, and candidates.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/office-environment.svg',
    imageAlt: 'Editorial illustration representing confidential executive search and governance',
    status: 'published',
    seoTitle: 'Confidentiality in Executive Search | Alexanders Career Strategy',
    seoDescription:
      'How responsible information handling, clear authorization, and privacy controls support confidential executive search.',
  },
  {
    slug: 'leadership-recruitment-across-different-industries',
    title: 'Leadership Recruitment Across Different Industries',
    category: 'Pharmaceutical Leadership',
    readingTime: '4 min read',
    excerpt:
      'While core leadership capabilities matter in every sector, healthcare, pharmaceuticals, technology, finance, and manufacturing each demand distinct technical and regulatory fluency.',
    paragraphs: [
      'Leadership capabilities are important across industries, but the experience needed for success can vary considerably.',
      'A healthcare executive may need to understand service delivery, quality, and regulatory requirements. A pharmaceutical leader may need experience in product development, manufacturing, or regulatory affairs. A technology executive may need to guide engineering teams, cybersecurity, digital strategy, or product innovation.',
      'Similarly, financial services leaders may require expertise in risk, compliance, or financial performance, while manufacturing executives may focus on production, quality, safety, and operational efficiency.',
      'These differences make it important to define search criteria around the actual responsibilities of the role rather than relying on job titles alone.',
      'Transferable leadership capabilities can be valuable, but they should be considered alongside the technical, commercial, and industry knowledge needed for the position.',
      'A well-designed search evaluates both dimensions. It identifies what the organization needs from its next leader and determines which professional backgrounds are most likely to meet those requirements.',
      'Industry-aware recruitment helps employers approach the market with clearer expectations and assess candidates against criteria relevant to the work.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/careers-collaboration.svg',
    imageAlt: 'Editorial illustration of cross-industry leadership recruitment',
    status: 'published',
    seoTitle: 'Leadership Recruitment Across Different Industries | Alexanders Career Strategy',
    seoDescription:
      'Balancing transferable leadership capabilities with sector-specific regulatory, technical, and commercial expertise.',
  },
  {
    slug: 'when-hiring-an-executive-could-signal-your-companys-next-move',
    title: 'When Hiring an Executive Could Signal Your Company’s Next Move',
    category: 'Executive Search and Hiring',
    readingTime: '4 min read',
    excerpt:
      'Companies generally put considerable thought into when and how they announce major business decisions. Acquisitions, geographic expansion, new product development, restructuring, and changes in corporate strategy are often discussed privately for months before the information becomes public.',
    paragraphs: [
      'Companies generally put considerable thought into when and how they announce major business decisions. Acquisitions, geographic expansion, new product development, restructuring, and changes in corporate strategy are often discussed privately for months before the information becomes public. What companies sometimes overlook is how quickly a senior leadership search can reveal those plans to competitors, investors, and customers.',
      'Recruiting a first Chief AI Officer, a Vice President of Regulatory Affairs in a new therapeutic modality, or a Managing Director for a new regional hub sends a clear market signal. Even when a company avoids posting a public job advertisement, informal outreach can still alert industry observers if the search is not structured discreetly.',
      'An experienced executive search partner helps organizations protect strategic timing. By framing initial conversations around core leadership competencies and disclosing company identity only after establishing mutual relevance and appropriate confidentiality, employers can build leadership capability ahead of a major strategic announcement.',
      'Before initiating a search tied to a sensitive corporate initiative, boards and chief executives should align on what market signals the role could send, which competitors are most likely to notice, and how candidate engagement will be staged to safeguard competitive advantage.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/executive-meeting.svg',
    imageAlt: 'Strategic executive hiring and confidential market signaling',
    status: 'published',
    seoTitle: 'When Hiring an Executive Could Signal Your Company’s Next Move | Alexanders Career Strategy',
    seoDescription:
      'How boards and chief executives manage market signals and protect strategic initiatives when recruiting senior leadership talent.',
  },
  {
    slug: 'when-a-successful-executive-is-no-longer-the-right-leader',
    title: 'When a Successful Executive Is No Longer the Right Leader',
    category: 'Leadership and Succession Planning',
    readingTime: '4 min read',
    excerpt:
      'Replacing an executive who is underperforming is a relatively straightforward business decision, even when the process itself is difficult. Replacing an executive who has been successful presents a more nuanced leadership challenge.',
    paragraphs: [
      'Replacing an executive who is underperforming is a relatively straightforward business decision, even when the process itself is difficult. Replacing an executive who has been successful presents a more nuanced leadership challenge—one that boards, founders, and chief executives frequently encounter as an organization enters a new stage of scale or complexity.',
      'A leader who excelled at building an early-stage commercial organization or guiding a business through rapid entrepreneurial expansion may not possess the operational discipline, enterprise governance experience, or multi-market systems fluency required for the next phase of growth.',
      'Recognizing this inflection point requires separating gratitude for past contributions from an objective assessment of future requirements. Rather than measuring the incumbent solely against historical milestones, leadership teams should define the specific competencies, scale of responsibility, and strategic outcomes the role will demand over the next three to five years.',
      'Handled thoughtfully, executive succession during growth transitions preserves institutional goodwill while equipping the organization with the leadership profile required for its next chapter.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/hero-executive-team.svg',
    imageAlt: 'Executive succession and leadership evolution across organizational growth stages',
    status: 'published',
    seoTitle: 'When a Successful Executive Is No Longer the Right Leader | Alexanders Career Strategy',
    seoDescription:
      'Navigating executive transitions when organizational scale and strategic complexity outgrow a previously successful leadership profile.',
  },
  {
    slug: 'how-to-conduct-a-confidential-executive-search-in-a-small-or-close-knit-industry',
    title: 'How to Conduct a Confidential Executive Search in a Small or Close-Knit Industry',
    category: 'Executive Search and Hiring',
    readingTime: '4 min read',
    excerpt:
      'In specialized sectors where senior leaders know one another across conferences, boards, and regulatory circles, conducting a discreet executive search requires disciplined outreach and controlled information flow.',
    paragraphs: [
      'In specialized or close-knit sectors—such as biotechnology, medical devices, aerospace, specialty manufacturing, or institutional finance—senior executives frequently know one another through industry associations, clinical trials, supplier networks, and prior collaborations.',
      'Conducting a confidential search in such an environment leaves little room for broad or uncoordinated outreach. If dozens of prospective candidates are approached with identifiable details about the hiring organization’s location, product pipeline, or reporting structure, word of the search can circulate rapidly.',
      'A disciplined confidential search relies on targeted talent mapping first. Instead of broadcasting the opportunity widely, the search consultant identifies a tightly curated shortlist of qualified leaders and conducts calibrated, one-to-one conversations to assess career timing and core capabilities before sharing identifying client specifics.',
      'Using an independent executive search firm provides an essential buffer between the hiring organization and the market—allowing employers to explore top-tier leadership talent while maintaining operational stability.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/search-consultation.svg',
    imageAlt: 'Confidential executive search in specialized and close-knit industries',
    status: 'published',
    seoTitle: 'How to Conduct a Confidential Executive Search in a Small or Close-Knit Industry | Alexanders Career Strategy',
    seoDescription:
      'Best practices for maintaining discretion and protecting organizational stability when recruiting executives in specialized industries.',
  },
  {
    slug: 'replacing-an-executive-who-holds-critical-institutional-knowledge',
    title: 'Replacing an Executive Who Holds Critical Institutional Knowledge',
    category: 'Leadership and Succession Planning',
    readingTime: '4 min read',
    excerpt:
      'When a long-tenured executive departs or prepares to retire, organizations must replace not only a functional title, but decades of unwritten client, operational, and technical relationships.',
    paragraphs: [
      'Long-tenured executives often carry far more than their formal job description suggests. Over years of service, they accumulate deep institutional knowledge—ranging from key customer relationships and regulatory history to informal operational workflows that keep complex teams aligned.',
      'When such a leader plans to retire or transition out of the business, attempting to find an exact replica of that individual rarely succeeds. No external candidate will arrive with the same internal history.',
      'Instead, a successful succession search begins by auditing which responsibilities, relationships, and domain expertise are mission-critical, which can be documented or distributed across the existing team, and where fresh external perspective can add new value.',
      'By pairing structured knowledge transfer with a targeted executive search focused on adaptability, stakeholder trust, and strategic leadership, organizations can turn a high-risk succession into a catalyst for long-term resilience.',
    ],
    authorVerified: false,
    publishDateVerified: false,
    imagePath: '/images/candidate-career-conversation.svg',
    imageAlt: 'Succession planning for executives holding critical institutional knowledge',
    status: 'published',
    seoTitle: 'Replacing an Executive Who Holds Critical Institutional Knowledge | Alexanders Career Strategy',
    seoDescription:
      'How organizations structure executive search and succession planning when replacing a long-tenured leader with deep institutional knowledge.',
  },
];

const INITIAL_JOBS_MERGE = mergeJobsIdempotently(
  HUNDRED_OPPORTUNITY_PROFILES,
  ONE_TWENTY_VACANCY_LEADS
);

export const INITIAL_JOBS: JobListingRecord[] = INITIAL_JOBS_MERGE.jobs;
export const INITIAL_JOB_IMPORT_REPORT: JobImportReport = INITIAL_JOBS_MERGE.report;

export const CAREERS_EDITORIAL_TOPICS = [
  {
    id: 'rewarding-career-executive-search',
    title: 'What Makes a Career in Executive Search Rewarding?',
    category: 'Editorial Perspective',
    summary:
      'Executive search sits at the intersection of leadership strategy and human ambition. Consultants have the opportunity to study how organizations operate across sectors while helping accomplished professionals navigate pivotal career decisions.',
  },
  {
    id: 'skills-behind-effective-recruitment',
    title: 'The Skills Behind Effective Executive Recruitment',
    category: 'Professional Capabilities',
    summary:
      'Successful search work relies on active listening, disciplined research, commercial curiosity, and clear communication—evaluating alignment beyond titles to understand what a role genuinely demands.',
  },
  {
    id: 'building-trusted-relationships',
    title: 'Building Trusted Relationships With Clients and Candidates',
    category: 'Search Philosophy',
    summary:
      'Long-term credibility in headhunting is earned through candor, preparation, and respect for confidentiality—ensuring both hiring organizations and candidates receive thoughtful, accurate guidance.',
  },
  {
    id: 'research-and-market-intelligence',
    title: 'How Research and Market Intelligence Support Executive Search',
    category: 'Methodology',
    summary:
      'Structured talent mapping transforms a search from passive applicant review into an informed exploration of relevant organizations, functional structures, and specialist talent pools.',
  },
];

export const CANDIDATE_FAQS = [
  {
    question: 'Does registering my CV guarantee an interview or job placement?',
    answer:
      'No. Submitting your CV allows your background and career interests to be reviewed and considered when we are handling a relevant search assignment. It does not guarantee an interview, representation, or placement.',
  },
  {
    question: 'Will my CV or personal details be shared with employers without my knowledge?',
    answer:
      'We handle candidate information responsibly in accordance with our Privacy Policy. While we do not promise absolute confidentiality under all legal or operational circumstances, we engage candidates to discuss specific opportunities and obtain appropriate authorization before presenting a formal candidate profile to a hiring client.',
  },
  {
    question: 'How should I apply to third-party vacancies listed on the Jobs board?',
    answer:
      'Unless a listing explicitly states that Alexanders Career Strategy holds an authorized search mandate for that role, you should use the “Apply on Employer’s Website” link to submit your application directly through the employer’s official careers portal or applicant tracking system.',
  },
  {
    question: 'What file formats are accepted for CV uploads, and how are files stored?',
    answer:
      'We accept PDF, DOC, and DOCX files up to 5 MB. Submitted CVs are validated server-side and stored in restricted private storage—never exposed on public URLs.',
  },
];

export function createInitialCmsStore(): FullCmsStore {
  return {
    siteSettings: INITIAL_SITE_SETTINGS,
    pages: INITIAL_PAGES,
    teamMembers: INITIAL_TEAM_MEMBERS,
    articles: INITIAL_INSIGHT_ARTICLES,
    jobs: INITIAL_JOBS,
    jobImportReport: INITIAL_JOB_IMPORT_REPORT,
    disciplineCards: DISCIPLINE_EXPERTISE_CARDS,
    employerServices: HOME_EMPLOYER_SERVICES,
    searchStages: SEARCH_PROCESS_STAGES,
    industries: DETAILED_INDUSTRIES,
    internalCareerOpenings: [],
    updatedAt: new Date().toISOString(),
  };
}
