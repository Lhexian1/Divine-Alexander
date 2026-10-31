import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface SubPathOption {
  label: string;
  target: string;
  indent?: boolean;
  description?: string;
}

interface NavItemConfig {
  label: string;
  path: string;
  kicker: string;
  watermarkTitle: string;
  summary: string;
  highlights: string[];
  subOptions: SubPathOption[];
}

export const PRIMARY_TOP_LINKS: NavItemConfig[] = [
  {
    label: 'Home',
    path: '/',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – EXECUTIVE SEARCH FIRM',
    watermarkTitle: 'Executive Search:',
    summary:
      'Independent U.S. executive search and headhunting connecting visionary organizations with accomplished C-suite, VP, and specialist leaders.',
    highlights: [
      'C-Suite, Board & Senior Leadership Appointments',
      'Customized Market Research & Direct Outreach',
      'Confidential Employer & Candidate Representation',
    ],
    subOptions: [
      { label: 'United States Executive Search Firm Overview', target: '/' },
      { label: 'Strategic Leadership Appointments', target: '/#strategic-leadership', indent: true },
      { label: 'Why Partner With an Independent Search Firm', target: '/#why-partner', indent: true },
      { label: 'Our Approach to Executive Search Article', target: '/our-approach-to-executive-search' },
      { label: 'Discuss a Hiring Need or Submit Your Profile', target: '/employers#enquiry-form' },
    ],
  },
  {
    label: 'For Employers',
    path: '/employers',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – CLIENT SOLUTIONS',
    watermarkTitle: 'Employer Solutions:',
    summary:
      'Tailored executive search, confidential leadership replacement, talent mapping, and specialist headhunting for U.S. employers.',
    highlights: [
      'Retained & Confidential Executive Search',
      'Bespoke Candidate Scorecards & Market Mapping',
      'Dedicated Employer Mandate Brief Form',
    ],
    subOptions: [
      { label: 'Executive Search & Leadership Recruitment', target: '/employers' },
      { label: 'Retained & Confidential Search Mandates', target: '/employers#services-grid', indent: true },
      { label: 'Talent Mapping & Market Intelligence', target: '/employers#services-grid', indent: true },
      { label: 'Submit an Employer Hiring Mandate Brief', target: '/employers#enquiry-form' },
    ],
  },
  {
    label: 'For Candidates',
    path: '/candidates',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – CANDIDATE ADVISORY',
    watermarkTitle: 'The Candidate:',
    summary:
      'Discreet career discussions, executive search consideration, and optional confidential CV registration for senior leaders.',
    highlights: [
      'Confidential Career Conversations',
      'Optional Private Vault CV Registration',
      'Direct Representation to Hiring Leadership',
    ],
    subOptions: [
      { label: 'Executive Career Advisory & Representation', target: '/candidates' },
      { label: 'What Candidates Can Expect From Our Firm', target: '/candidates#candidate-expectations', indent: true },
      { label: 'Candidate Frequently Asked Questions', target: '/candidates#candidate-faq', indent: true },
      { label: 'Introduce Yourself / Optional CV Registration', target: '/candidates#cv-form' },
    ],
  },
  {
    label: 'Expertise',
    path: '/expertise',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – FUNCTIONAL EXPERTISE',
    watermarkTitle: 'Our Expertise:',
    summary:
      'Cross-functional leadership recruitment spanning C-Suite, Finance, Risk & Legal, Technology, Operations, HR, Commercial, and Engineering.',
    highlights: [
      'Chief Executive, Financial & Operating Officers',
      'Clinical, Regulatory & Medical Affairs Leaders',
      'Technology, Cybersecurity, Supply Chain & HR',
    ],
    subOptions: [
      { label: 'Functional Leadership Disciplines Overview', target: '/expertise' },
      { label: 'C-Suite, Board & General Management', target: '/expertise#functional-disciplines', indent: true },
      { label: 'Accounting, Finance, Risk & Compliance', target: '/expertise#functional-disciplines', indent: true },
      { label: 'Technology, Operations, Supply Chain & HR', target: '/expertise#functional-disciplines', indent: true },
      { label: 'Explore Active Mandate Opportunities', target: '/jobs' },
    ],
  },
  {
    label: 'Industries',
    path: '/industries',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – SECTOR SPECIALIZATION',
    watermarkTitle: 'The Industries:',
    summary:
      'Specialized industry depth across Healthcare, Biopharma, Medical Devices, Technology, Financial Services, Procurement, and Manufacturing.',
    highlights: [
      'Healthcare Systems, Biopharma & Life Sciences',
      'Enterprise Software, AI & Financial Services',
      'Industrial Operations, Procurement & Supply Chain',
    ],
    subOptions: [
      { label: 'All Industries We Serve', target: '/industries' },
      { label: 'Healthcare, Pharmaceuticals & Biotechnology', target: '/industries#industries-we-serve', indent: true },
      { label: 'Medical Devices & Life Sciences', target: '/industries#industries-we-serve', indent: true },
      { label: 'Technology, Financial Services & Industrial', target: '/industries#industries-we-serve', indent: true },
      { label: 'Procurement & Global Supply Chain', target: '/industries#industries-we-serve' },
    ],
  },
  {
    label: 'Approach',
    path: '/approach',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – SEARCH METHODOLOGY',
    watermarkTitle: 'The Approach:',
    summary:
      'Our disciplined eight-stage executive search process and core pillars: Focused Search, Targeted Research, Discreet Engagement, and Partnership.',
    highlights: [
      'Focused Search & Role Alignment',
      'Original Talent Research & Mapping',
      'Discreet Outreach & Personal Partnership',
    ],
    subOptions: [
      { label: '8-Stage Executive Search Process', target: '/approach' },
      { label: 'Focused Search & Candidate Profiling', target: '/our-approach-to-executive-search#focused-search', indent: true },
      { label: 'Targeted Talent Research & Mapping', target: '/our-approach-to-executive-search#targeted-talent-research', indent: true },
      { label: 'Discreet Engagement & Personal Partnership', target: '/our-approach-to-executive-search#discreet-engagement', indent: true },
      { label: 'Read Full Article: Our Approach to Executive Search', target: '/our-approach-to-executive-search' },
    ],
  },
  {
    label: 'Jobs',
    path: '/jobs',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – EXECUTIVE OPPORTUNITIES',
    watermarkTitle: 'The Jobs:',
    summary:
      'Search senior executive, clinical, technical, and commercial leadership opportunities across the United States. Resume upload is optional.',
    highlights: [
      'Direct Applications via Alexanders Career Strategy',
      'Filter by Sector, Seniority & Work Arrangement',
      'Résumé Upload Optional for All Job Seekers',
    ],
    subOptions: [
      { label: 'Executive Opportunities & Search Directory', target: '/jobs' },
      { label: 'Filter by Industry, Location & Seniority', target: '/jobs#jobs-filter-bar', indent: true },
      { label: 'Previously Identified Leadership Mandates', target: '/jobs#jobs-filter-bar', indent: true },
      { label: 'Submit General Candidate Dossier (Resume Optional)', target: '/candidates#cv-form' },
    ],
  },
  {
    label: 'About',
    path: '/about',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – FIRM PROFILE & LEADERSHIP',
    watermarkTitle: 'About Us:',
    summary:
      'Learn about our mission, guiding principles, leadership consultants, and commitment to long-term strategic impact.',
    highlights: [
      'Independent U.S. Executive Search Consultancy',
      'Integrity, Excellence, People First & Impact',
      'Senior Search Consultants & Researchers',
    ],
    subOptions: [
      { label: 'Firm Mission, Vision & Guiding Principles', target: '/about' },
      { label: 'Meet Our Executive Search Consultants', target: '/team', indent: true },
      { label: 'Internal Careers at Alexanders Career Strategy', target: '/careers', indent: true },
      { label: 'Our Approach to Executive Search', target: '/our-approach-to-executive-search' },
    ],
  },
  {
    label: 'Insights',
    path: '/insights',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – EXECUTIVE PERSPECTIVES',
    watermarkTitle: 'Insights:',
    summary:
      'Editorial perspectives on executive search strategy, candidate evaluation, leadership transitions, and market intelligence.',
    highlights: [
      'Executive Search Strategy & Brief Definition',
      'Talent Mapping & Market Intelligence Guides',
      'Confidentiality in Senior Leadership Hiring',
    ],
    subOptions: [
      { label: 'Executive Search & Leadership Articles', target: '/insights' },
      { label: 'Defining the Right Candidate Profile', target: '/insights/defining-the-right-candidate-profile', indent: true },
      { label: 'The Value of Talent Mapping in Executive Search', target: '/insights/the-value-of-talent-mapping-in-executive-search', indent: true },
      { label: 'Confidentiality in Senior Leadership Recruitment', target: '/insights/confidentiality-in-senior-leadership-recruitment' },
    ],
  },
  {
    label: 'Contact',
    path: '/contact',
    kicker: 'ALEXANDERS CAREER STRATEGY™ – EXECUTIVE SEARCH FIRM',
    watermarkTitle: 'Contact Us:',
    summary:
      'Connect with our United States executive search consultants for employer hiring mandates, candidate introductions, or regional enquiries.',
    highlights: [
      'Dedicated Employer Mandate Pathway',
      'Confidential Candidate Introduction Pathway',
      'Direct Consultant Email & Regional Coverage',
    ],
    subOptions: [
      { label: 'United States Executive Search Firm', target: '/contact' },
      { label: 'U.S. Regional Locations', target: '/contact#us-regional-locations', indent: true },
      { label: 'U.S. States & Cities Coverage', target: '/contact#us-states-cities', indent: true },
      { label: 'Global Executive Search Locations & Direct Form', target: '/contact#direct-contact-form' },
    ],
  },
];

const SECONDARY_DIRECTORY_LINKS = [
  { label: 'Our Team', path: '/team' },
  { label: 'Careers', path: '/careers' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
}) => {
  const { siteSettings } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHoverItem, setActiveHoverItem] = useState<NavItemConfig | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveHoverItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnterNavItem = (item: NavItemConfig) => {
    clearCloseTimer();
    setActiveHoverItem(item);
  };

  const handleMouseLeaveHeaderZone = () => {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveHoverItem(null);
    }, 260);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    clearCloseTimer();
    setMobileMenuOpen(false);
    setActiveHoverItem(null);
    onNavigate(target);
  };

  return (
    <>
      <header
        onMouseLeave={handleMouseLeaveHeaderZone}
        className="sticky top-0 z-40 w-full max-w-full bg-gradient-to-r from-[#E0F2FE] via-[#FFFFFF] to-[#FEF9C3] text-[#082F49] border-b-2 border-[#38BDF8] shadow-md backdrop-blur-md"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-3.5 sm:py-4">
          {/* Zone 1: Stacked Brand Wordmark + Tracked Subtitle */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="group flex flex-col justify-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#082F49]"
          >
            <span className="font-editorial text-lg sm:text-xl xl:text-2xl font-bold tracking-tight text-[#082F49] group-hover:text-[#0369A1] transition-colors whitespace-nowrap leading-none">
              {siteSettings.brandName}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-[#0369A1] mt-1 sm:mt-1.5 whitespace-nowrap">
              EXECUTIVE SEARCH · US
            </span>
          </a>

          {/* Zone 2: Center Navigation Links with Hover Sub-Menu */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center flex-wrap justify-center gap-1 xl:gap-2.5 text-xs xl:text-[13px] font-semibold text-[#082F49]"
          >
            {PRIMARY_TOP_LINKS.map((item) => {
              const isCurrent = currentPath === item.path;
              const isDrawerOpen = activeHoverItem?.path === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onMouseEnter={() => handleMouseEnterNavItem(item)}
                  onFocus={() => handleMouseEnterNavItem(item)}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={currentPath === item.path ? 'page' : undefined}
                  aria-expanded={isDrawerOpen}
                  className={`px-2.5 py-1.5 rounded-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#082F49] ${
                    isCurrent || isDrawerOpen
                      ? 'bg-[#FEF08A] text-[#082F49] font-extrabold border-b-2 border-[#0369A1] shadow-xs'
                      : 'text-[#082F49]/90 hover:text-[#082F49] hover:bg-[#E0F2FE]/90'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/employers#enquiry-form"
              onClick={(e) => handleLinkClick(e, '/employers#enquiry-form')}
              className="hidden sm:inline-flex items-center justify-center px-4 xl:px-6 py-2.5 xl:py-3 text-xs xl:text-sm font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all hover:shadow-md whitespace-nowrap shrink-0 shadow-xs"
            >
              Discuss a Hiring Need
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#082F49] bg-[#FEF08A] border border-[#38BDF8] rounded-full cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Crisp Horizontal Divider Line */}
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="h-[1px] w-full bg-[#082F49]/20" />
        </div>

        {/* Clean Text-Only Hover Sub-Paths Drawer */}
        {activeHoverItem && (
          <div
            onMouseEnter={clearCloseTimer}
            onMouseLeave={handleMouseLeaveHeaderZone}
            role="region"
            aria-label={`${activeHoverItem.label} section preview`}
            className="hidden lg:block absolute top-full left-0 right-0 z-50 w-full bg-gradient-to-r from-[#0C1938] via-[#132A56] to-[#1E3A6D] text-white border-b-4 border-[#FEF08A] shadow-2xl transition-all duration-200"
          >
            <div className="max-w-[1360px] mx-auto px-8 py-6">
              <div className="max-w-xl space-y-3 relative">
                <div className="space-y-2 max-w-md">
                  <p className="text-sm font-extrabold tracking-wide uppercase text-white leading-snug">
                    {activeHoverItem.kicker}
                  </p>
                  <div className="h-[1px] w-72 bg-white/60" />
                </div>

                <div className="relative pt-1">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none font-sans text-4xl xl:text-5xl font-bold text-white/10 block mb-1"
                  >
                    {activeHoverItem.watermarkTitle}
                  </span>

                  <ul className="space-y-2.5 relative z-10 -mt-6">
                    {activeHoverItem.subOptions.map((sub) => (
                      <li key={sub.target + sub.label} className={sub.indent ? 'pl-5' : ''}>
                        <a
                          href={sub.target}
                          onClick={(e) => handleLinkClick(e, sub.target)}
                          className="group inline-flex items-center gap-2 text-sm xl:text-[15px] font-bold text-white hover:text-[#FEF08A] transition-colors"
                        >
                          {sub.indent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7DD3FC] group-hover:bg-[#FEF08A]" />
                          )}
                          <span className="group-hover:underline underline-offset-4">
                            {sub.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#FEF08A] transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation menu"
          className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-50 bg-gradient-to-br from-[#E0F2FE] via-[#FFFFFF] to-[#FEF08A] text-[#082F49] overflow-y-auto border-t border-[#7DD3FC] p-5"
        >
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <p className="text-xs font-extrabold tracking-wider text-[#0369A1] uppercase mb-3">
                Navigation &amp; Sub-Sections
              </p>
              <div className="flex flex-col space-y-2">
                {PRIMARY_TOP_LINKS.map((item) => (
                  <div
                    key={item.path}
                    className="bg-white/80 border border-[#7DD3FC] rounded-sm p-3 space-y-2"
                  >
                    <a
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`block text-base font-extrabold transition-colors ${
                        currentPath === item.path ? 'text-[#0369A1]' : 'text-[#082F49]'
                      }`}
                    >
                      {item.label}
                    </a>
                    <div className="pl-3 border-l-2 border-[#7DD3FC] space-y-1.5">
                      {item.subOptions.slice(0, 3).map((sub) => (
                        <a
                          key={sub.target + sub.label}
                          href={sub.target}
                          onClick={(e) => handleLinkClick(e, sub.target)}
                          className="block text-xs font-semibold text-[#082F49]/85 hover:text-[#0369A1]"
                        >
                          • {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#7DD3FC] pt-5">
              <p className="text-xs font-extrabold tracking-wider text-[#0369A1] uppercase mb-3">
                Firm &amp; Governance
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SECONDARY_DIRECTORY_LINKS.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="px-3 py-2 rounded-sm text-xs font-bold bg-white/80 border border-[#7DD3FC] text-[#082F49]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/privacy"
                  onClick={(e) => handleLinkClick(e, '/privacy')}
                  className="px-3 py-2 rounded-sm text-xs font-bold bg-white/80 border border-[#7DD3FC] text-[#082F49]"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  onClick={(e) => handleLinkClick(e, '/terms')}
                  className="px-3 py-2 rounded-sm text-xs font-bold bg-white/80 border border-[#7DD3FC] text-[#082F49]"
                >
                  Terms of Use
                </a>
              </div>
            </div>

            <div className="border-t border-[#7DD3FC] pt-5 flex flex-col gap-3 pb-8">
              <a
                href="/employers#enquiry-form"
                onClick={(e) => handleLinkClick(e, '/employers#enquiry-form')}
                className="w-full py-3 px-4 text-center text-sm font-extrabold text-[#082F49] bg-[#FEF08A] border border-[#38BDF8] rounded-full shadow-xs"
              >
                Discuss a Hiring Need
              </a>
              <a
                href="/candidates#cv-form"
                onClick={(e) => handleLinkClick(e, '/candidates#cv-form')}
                className="w-full py-3 px-4 text-center text-sm font-extrabold text-[#082F49] bg-white border border-[#7DD3FC] rounded-full shadow-xs"
              >
                Introduce Yourself / Submit CV (Optional)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
