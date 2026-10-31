import React from 'react';
import { Settings } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenContentManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContentManager }) => {
  const { siteSettings } = useSiteContent();
  const currentYear = new Date().getFullYear();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-gradient-to-br from-[#E0F2FE] via-[#FFFFFF] to-[#FEF08A] text-[#082F49] border-t border-[#7DD3FC]">
      {/* Global Footer CTA Banner (Section 19.12) */}
      <div className="bg-gradient-to-r from-[#BAE6FD] via-[#FFFFFF] to-[#FEF9C3] text-[#082F49] border-b border-[#7DD3FC]">
        <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
              EXECUTIVE SEARCH · UNITED STATES
            </p>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-[#082F49]">
              {siteSettings.footerCtaHeading}
            </h2>
            <p className="text-sm md:text-base text-[#082F49]/90 font-medium leading-relaxed">
              {siteSettings.footerCtaText}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className="px-6 py-3 text-sm font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all whitespace-nowrap shadow-xs"
            >
              {siteSettings.footerCtaButton}
            </a>
            <a
              href="/employers#enquiry-form"
              onClick={(e) => handleNav(e, '/employers#enquiry-form')}
              className="px-6 py-3 text-sm font-bold text-[#082F49] bg-white hover:bg-[#E0F2FE] border border-[#7DD3FC] rounded-full transition-all whitespace-nowrap shadow-xs"
            >
              Discuss a Hiring Need
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid (RMA-Inspired Multi-Column Executive Directory, No Visible Email) */}
      <div className="max-w-[1280px] mx-auto px-6 py-14 space-y-12">
        {/* Top Lead Statement */}
        <div className="p-6 bg-white/85 border border-[#7DD3FC] rounded-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-4xl">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="inline-block font-editorial text-2xl font-bold text-[#082F49] hover:text-[#0369A1] transition-colors"
            >
              {siteSettings.brandName}™ – Empowered Talent Search Solutions
            </a>
            <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
              Our powerful and proven retained and specialist search solutions provide a
              comprehensive search function that empowers better hiring decisions. With the best,
              most qualified candidates at your fingertips, you can bring in the leadership talent
              needed to achieve your top business outcomes.
            </p>
          </div>
          <a
            href="/contact#direct-contact-form"
            onClick={(e) => handleNav(e, '/contact#direct-contact-form')}
            className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs whitespace-nowrap shrink-0"
          >
            Email Us Today →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#0369A1]">
              Company
            </h3>
            <ul className="space-y-2 text-sm font-medium text-[#082F49]">
              <li>
                <a href="/about" onClick={(e) => handleNav(e, '/about')} className="hover:text-[#0369A1] transition-colors">
                  About {siteSettings.brandName}
                </a>
              </li>
              <li>
                <a href="/candidates#candidate-faq" onClick={(e) => handleNav(e, '/candidates#candidate-faq')} className="hover:text-[#0369A1] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact#us-regional-locations" onClick={(e) => handleNav(e, '/contact#us-regional-locations')} className="hover:text-[#0369A1] transition-colors">
                  Locations
                </a>
              </li>
              <li>
                <a href="/insights" onClick={(e) => handleNav(e, '/insights')} className="hover:text-[#0369A1] transition-colors">
                  Insights™
                </a>
              </li>
              <li>
                <a href="/team" onClick={(e) => handleNav(e, '/team')} className="hover:text-[#0369A1] transition-colors">
                  Meet Our Team
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-[#0369A1] transition-colors">
                  Contact {siteSettings.brandName}™
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Expertise & Value+ */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#0369A1]">
              Expertise &amp; Value+
            </h3>
            <ul className="space-y-2 text-sm font-medium text-[#082F49]">
              <li>
                <a href="/expertise" onClick={(e) => handleNav(e, '/expertise')} className="hover:text-[#0369A1] transition-colors">
                  Role &amp; Functional Expertise
                </a>
              </li>
              <li>
                <a href="/employers" onClick={(e) => handleNav(e, '/employers')} className="hover:text-[#0369A1] transition-colors">
                  Organizational Expertise
                </a>
              </li>
              <li>
                <a href="/industries" onClick={(e) => handleNav(e, '/industries')} className="hover:text-[#0369A1] transition-colors">
                  Industry Expertise
                </a>
              </li>
              <li>
                <a href="/our-approach-to-executive-search" onClick={(e) => handleNav(e, '/our-approach-to-executive-search')} className="hover:text-[#0369A1] transition-colors">
                  Value+ Add Solutions
                </a>
              </li>
              <li>
                <a href="/approach" onClick={(e) => handleNav(e, '/approach')} className="hover:text-[#0369A1] transition-colors">
                  Key Search Advantages
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#0369A1]">
              Solutions
            </h3>
            <ul className="space-y-2 text-sm font-medium text-[#082F49]">
              <li>
                <a href="/our-approach-to-executive-search" onClick={(e) => handleNav(e, '/our-approach-to-executive-search')} className="hover:text-[#0369A1] transition-colors">
                  Executive Search Consulting
                </a>
              </li>
              <li>
                <a href="/employers#services-grid" onClick={(e) => handleNav(e, '/employers#services-grid')} className="hover:text-[#0369A1] transition-colors">
                  Executive Recruiting
                </a>
              </li>
              <li>
                <a href="/approach" onClick={(e) => handleNav(e, '/approach')} className="hover:text-[#0369A1] transition-colors">
                  Executive Assessment &amp; Evaluation
                </a>
              </li>
              <li>
                <a href="/employers#enquiry-form" onClick={(e) => handleNav(e, '/employers#enquiry-form')} className="hover:text-[#0369A1] transition-colors">
                  Submit Hiring Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Clients */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#0369A1]">
              Clients
            </h3>
            <ul className="space-y-2 text-sm font-medium text-[#082F49]">
              <li>
                <a href="/employers" onClick={(e) => handleNav(e, '/employers')} className="hover:text-[#0369A1] transition-colors">
                  Employers &amp; Hiring Managers
                </a>
              </li>
              <li>
                <a href="/candidates" onClick={(e) => handleNav(e, '/candidates')} className="hover:text-[#0369A1] transition-colors">
                  Executive Candidates
                </a>
              </li>
              <li>
                <a href="/jobs" onClick={(e) => handleNav(e, '/jobs')} className="hover:text-[#0369A1] transition-colors">
                  Jobs &amp; Vacancies Board
                </a>
              </li>
              <li>
                <a href="/candidates#cv-form" onClick={(e) => handleNav(e, '/candidates#cv-form')} className="hover:text-[#0369A1] transition-colors">
                  Submit Your CV (Optional)
                </a>
              </li>
              <li>
                <a href="/careers" onClick={(e) => handleNav(e, '/careers')} className="hover:text-[#0369A1] transition-colors">
                  Careers at Our Firm
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info (No Visible Email Address) */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#0369A1]">
              Contact Info
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-[#082F49]">
              <p className="font-bold">{siteSettings.brandName}™</p>
              <p className="text-[#1E293B]">United States Executive Search &amp; Headhunting</p>
              <p className="text-xs text-[#475569]">
                Coast-to-Coast U.S. Search Coverage · Northeast, Mid-Atlantic, Southeast, Midwest, Southwest &amp; West Coast
              </p>
              <div className="pt-2">
                <a
                  href="/contact#direct-contact-form"
                  onClick={(e) => handleNav(e, '/contact#direct-contact-form')}
                  className="inline-block px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs transition-colors"
                >
                  Send Direct Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Owner Content Studio Trigger */}
        <div className="pt-8 border-t border-[#7DD3FC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#475569]">
          <p>
            &copy; {currentYear} {siteSettings.brandName}™, All Rights Reserved. Independent Executive Search &amp; Headhunting.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="/privacy" onClick={(e) => handleNav(e, '/privacy')} className="hover:text-[#0369A1] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" onClick={(e) => handleNav(e, '/terms')} className="hover:text-[#0369A1] transition-colors">
              Terms of Use
            </a>
            <a href="/privacy" onClick={(e) => handleNav(e, '/privacy')} className="hover:text-[#0369A1] transition-colors">
              Cookie Policy
            </a>
            <button
              type="button"
              onClick={onOpenContentManager}
              className="inline-flex items-center gap-1.5 text-[#0369A1] font-semibold hover:text-[#082F49] transition-colors focus-visible:outline-1 focus-visible:outline-[#0369A1]"
            >
              <Settings className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Content &amp; Launch Readiness Studio</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
