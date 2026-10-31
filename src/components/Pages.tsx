import React from 'react';
import { ArrowRight, CheckCircle2, Compass, Shield, Users, Search } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { CANDIDATE_FAQS } from '../data/siteContent';
import { EditorialImage } from './EditorialImage';
import { EmployerEnquiryForm, CandidateCvForm } from './Forms';
import {
  DynamicTypewriter,
  DynamicMetricsRibbon,
  DynamicSpotlightCarousel,
} from './DynamicMotionElements';
import { ExecutiveValueShowcase } from './ExecutiveValueShowcase';

interface PageNavProps {
  onNavigate: (path: string) => void;
}

// ============================================================================
// 1. HOMEPAGE (Sections 5 & 19.1) — Dynamic CMS Connected
// ============================================================================
export const HomePage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const {
    siteSettings,
    disciplineCards,
    employerServices,
    searchStages,
    getPageConfig,
  } = useSiteContent();

  const pageConfig = getPageConfig('/');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div>
      {/* Section 1: Hero (Full-Bleed Atmospheric Banner + Positioned Headers + "Two paths, one conversation" Card) */}
      <section className="relative overflow-hidden border-b border-[#7DD3FC] text-[#082F49]">
        {/* Full-bleed background boardroom photograph with Sky Blue, Bright Light Yellow & White wash */}
        <img
          src={
            pageConfig?.heroImage ||
            '/src/assets/images/regenerated_image_1793294161466.jpg'
          }
          alt="Executive leadership consultation and boardroom alignment at Alexanders Career Strategy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#BAE6FD]/92 via-[#E0F2FE]/86 to-[#FEF08A]/88 backdrop-blur-[1px]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Positioned Kicker, 3-Line Stacked Serif Header & Unboxed Lead Paragraph */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
            <p className="text-xs md:text-sm font-extrabold tracking-[0.22em] uppercase text-[#0369A1]">
              INDEPENDENT EXECUTIVE SEARCH · UNITED STATES
            </p>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[60px] font-bold text-[#082F49] leading-[1.06] tracking-tight">
              <span className="block">Executive Search.</span>
              <span className="block">Exceptional Talent.</span>
              <span className="block">Strategic Impact.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#082F49] font-medium leading-relaxed max-w-2xl">
              {pageConfig?.heroText ||
                'Alexanders Career Strategy helps organizations identify and attract exceptional executives, senior leaders, and specialist professionals. Through targeted research, direct outreach, and a relationship-led approach, we connect employers with candidates whose experience and capabilities align with their strategic objectives.'}
            </p>

            <div>
              <DynamicTypewriter
                variant="light-blue-badge"
                prefix="ACTIVE FOCUS"
                phrases={[
                  'C-Suite & Boardroom Leadership Appointments',
                  'Executive & Specialist Leadership Mandates Across the U.S.',
                  'Confidential Retained & Specialist Headhunting',
                  'Healthcare, AI, Biopharma, Finance & Supply Chain',
                  'Connecting Visionary Employers With Proven Leaders',
                ]}
              />
            </div>

            {/* Screenshot 1 Style Rectangular CTA Buttons + Primary Pill CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="/our-approach-to-executive-search"
                onClick={(e) => handleLink(e, '/our-approach-to-executive-search')}
                className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#082F49] bg-white hover:bg-[#FEF08A] border border-[#082F49]/20 shadow-md transition-all whitespace-nowrap"
              >
                FIND OUT MORE
              </a>
              <a
                href="/contact#direct-contact-form"
                onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white bg-[#0E6482] hover:bg-[#082F49] shadow-md transition-all whitespace-nowrap"
              >
                EMAIL US TODAY
              </a>
              <a
                href={pageConfig?.primaryCtaUrl || '/employers#enquiry-form'}
                onClick={(e) => handleLink(e, pageConfig?.primaryCtaUrl || '/employers#enquiry-form')}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all hover:shadow-md whitespace-nowrap shadow-sm"
              >
                {pageConfig?.primaryCtaLabel || 'Discuss a Hiring Need'}
              </a>
            </div>
          </div>

          {/* Right Column: Elevated Crisp White Card ("Two paths, one conversation") */}
          <div className="lg:col-span-5 lg:mt-10">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-9 shadow-xl border border-[#7DD3FC] space-y-5">
              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#082F49] leading-tight">
                Two paths, one conversation
              </h2>

              <div className="space-y-4 text-sm md:text-base text-[#1E293B] leading-relaxed">
                <p>
                  <strong className="font-bold text-[#082F49]">Employers:</strong> tell us about the leadership or specialist position you need to fill.
                </p>
                <p>
                  <strong className="font-bold text-[#082F49]">Candidates:</strong> explore current opportunities or share your CV and professional interests (resume upload optional).
                </p>
              </div>

              <div className="pt-3 border-t border-[#E0F2FE] flex flex-wrap items-center gap-4 text-xs md:text-sm font-bold">
                <a
                  href="/employers#enquiry-form"
                  onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                  className="inline-flex items-center gap-1.5 text-[#0369A1] hover:text-[#082F49] underline underline-offset-4"
                >
                  <span>Start an Employer Brief</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="/candidates#cv-form"
                  onClick={(e) => handleLink(e, '/candidates#cv-form')}
                  className="inline-flex items-center gap-1.5 text-[#082F49] hover:text-[#0369A1] underline underline-offset-4"
                >
                  <span>Submit Your CV (Optional)</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Moving Metrics & Rotating Executive Mandate Spotlight */}
      <DynamicMetricsRibbon onNavigate={onNavigate} />
      <DynamicSpotlightCarousel onNavigate={onNavigate} />

      {/* Section 19.1: Homepage Introduction ("Finding the Leaders Who Move Business Forward") */}
      <section id="strategic-leadership" className="py-14 md:py-24 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              Strategic Leadership Appointments
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633] leading-tight">
              Finding the Leaders Who Move Business Forward
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-base text-[#1E293B] leading-relaxed">
            <p>
              The right leadership appointment can influence an organization’s direction, strengthen its culture, and support long-term growth. Finding the right individual requires more than reviewing applications. It requires a clear understanding of the role, the business, the industry, and the qualities needed for success.
            </p>
            <p>
              Alexanders Career Strategy takes a focused approach to identifying leadership talent. We work to understand hiring priorities, research relevant talent markets, engage suitable professionals, and support employers throughout the search process.
            </p>
            <p className="font-medium text-[#1E3A8A]">
              Our objective is to help organizations make informed recruitment decisions and connect with people who can contribute meaningful value.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Trust and Differentiation (With Interactive Hover Pop-Up Previews) */}
      <section id="why-partner" className="py-14 md:py-24 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
                Why Partner With an Independent Search Firm · Hover Any Card to Preview Details
              </p>
              <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
                A More Personal Approach to Executive Search.
              </h2>
              <p className="text-base text-[#475569] leading-relaxed">
                Working directly with an independent headhunter provides focused attention, customized market research, direct access to relevant professionals, and close, accountable communication throughout every stage of a search.
              </p>
            </div>
            <a
              href="/our-approach-to-executive-search"
              onClick={(e) => handleLink(e, '/our-approach-to-executive-search')}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all hover:shadow-md whitespace-nowrap self-start lg:self-auto shadow-xs"
            >
              <span>Our Approach to Executive Search</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'focused-search',
                icon: Compass,
                title: 'Focused Search',
                short:
                  'Each engagement begins with understanding the specific role, business objectives, and qualities required for success.',
                hoverBullets: [
                  'Organizational culture & reporting alignment',
                  'Custom candidate scorecard & competency brief',
                  'Tailored C-suite & specialist role scoping',
                ],
              },
              {
                id: 'targeted-talent-research',
                icon: Search,
                title: 'Targeted Talent Research',
                short:
                  'Identify relevant talent pools and potential candidates instead of relying exclusively on incoming applications.',
                hoverBullets: [
                  'Original industry & competitor talent mapping',
                  'Direct engagement of passive senior leaders',
                  'Cross-sector leadership track-record analysis',
                ],
              },
              {
                id: 'discreet-engagement',
                icon: Shield,
                title: 'Discreet Engagement',
                short:
                  'Approach suitable professionals thoughtfully and respect confidentiality throughout the process.',
                hoverBullets: [
                  'Confidential outreach to sitting executives',
                  'Protected client & candidate identity handling',
                  'Sensitive succession & replacement search support',
                ],
              },
              {
                id: 'personal-partnership',
                icon: Users,
                title: 'Personal Partnership',
                short:
                  'Maintain clear communication and a tailored search strategy aligned with the client’s hiring objectives.',
                hoverBullets: [
                  'Direct senior consultant accountability',
                  'Transparent progress reporting & calibration',
                  'Balanced employer & candidate alignment',
                ],
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.id}
                  href={`/our-approach-to-executive-search#${item.id}`}
                  onClick={(e) => handleLink(e, `/our-approach-to-executive-search#${item.id}`)}
                  className="group relative p-6 bg-[#F8FAFC] border-2 border-[#CBD5E1] hover:border-[#0E6482] rounded-sm flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1.5 shadow-sm hover:shadow-xl cursor-pointer overflow-hidden"
                >
                  <div className="space-y-3">
                    <IconComponent className="w-6 h-6 text-[#0E6482]" aria-hidden="true" />
                    <h3 className="font-editorial text-2xl font-semibold text-[#0A1633] group-hover:text-[#0E6482] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{item.short}</p>

                    {/* Hover Pop-Up Preview Panel (Reveals on Hover Without Requiring Click) */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-56 group-hover:opacity-100 transition-all duration-300 overflow-hidden pt-0 group-hover:pt-3 border-t border-transparent group-hover:border-[#7DD3FC]">
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E6482] mb-1.5">
                        Key Section Options:
                      </p>
                      <ul className="space-y-1 text-xs text-[#082F49] font-medium">
                        {item.hoverBullets.map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082F49] group-hover:text-[#0E6482] group-hover:underline pt-2">
                    <span>Click to Read Full Section</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Employer Services (Dynamic from CMS employerServices with Hover Pop-up) */}
      <section id="services-grid" className="py-14 md:py-24 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              Our Expertise &amp; Employer Services · Hover Cards for Service Details
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              Talent Solutions for the Roles That Matter Most.
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              We specialize in executive search and targeted recruitment for organizations seeking accomplished leaders and highly qualified professionals. Our services are designed to address important hiring needs through focused research, professional candidate engagement, and a structured search process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerServices.map((srv) => (
              <article
                key={srv.id}
                className="group p-7 bg-white border border-[#CBD5E1] hover:border-[#0E6482] rounded-sm flex flex-col justify-between space-y-6 transition-all hover:shadow-xl"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono-tabular font-semibold text-[#0E6482]">
                    {srv.number}
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#0A1633] group-hover:text-[#0E6482] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-[#1E293B] leading-relaxed">{srv.whatItInvolves}</p>
                  <div className="pt-2 space-y-1.5 text-xs text-[#475569] border-t border-[#EFF6FF]">
                    <p>
                      <strong className="text-[#0A1633]">Who it serves:</strong> {srv.whoItServes}
                    </p>
                    <p>
                      <strong className="text-[#0A1633]">When useful:</strong> {srv.whenUseful}
                    </p>
                  </div>

                  {/* Interactive Hover Quick-Links Drawer */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 transition-all duration-300 overflow-hidden pt-0 group-hover:pt-3 border-t border-transparent group-hover:border-[#7DD3FC]">
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="/employers#enquiry-form"
                        onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                        className="px-2.5 py-1 text-[11px] font-bold bg-[#FEF08A] text-[#082F49] rounded-xs"
                      >
                        Request Mandate Brief →
                      </a>
                      <a
                        href="/approach"
                        onClick={(e) => handleLink(e, '/approach')}
                        className="px-2.5 py-1 text-[11px] font-bold bg-[#E0F2FE] text-[#082F49] rounded-xs"
                      >
                        8-Stage Process →
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href="/employers#enquiry-form"
                    onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:text-[#0F2350] underline underline-offset-4"
                  >
                    <span>{srv.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Industry Expertise & Functional Disciplines */}
      <section id="industries-grid" className="py-14 md:py-24 bg-[#0A1633] text-[#F8FAFC] border-b border-[#FACC15]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
                Industry Knowledge. Targeted Talent.
              </p>
              <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#F8FAFC]">
                Specialized Search. Cross-Industry Perspective.
              </h2>
              <p className="text-base text-[#F8FAFC]/80 leading-relaxed">
                Leadership requirements differ across industries. Organizations need professionals who understand their operating environments, regulatory considerations, customers, technologies, and commercial priorities. Alexanders Career Strategy supports recruitment across healthcare, pharmaceuticals, medical devices, procurement, technology, financial services, manufacturing, and corporate leadership.
              </p>
            </div>
            <a
              href="/industries"
              onClick={(e) => handleLink(e, '/industries')}
              className="px-5 py-3 text-xs font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm transition-colors whitespace-nowrap self-start lg:self-auto"
            >
              Explore All Industries We Serve
            </a>
          </div>

          {/* Six Target Specialization Categories (Section 5.4) with Hover Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Healthcare and Healthcare Technology',
                desc: 'Healthcare executives, clinical leadership, hospital operations, healthcare IT, and administrative leadership.',
              },
              {
                title: 'Pharmaceuticals and Biotechnology',
                desc: 'Medical affairs, regulatory affairs, clinical development, research, quality, and commercial leadership.',
              },
              {
                title: 'Medical Devices and Life Sciences',
                desc: 'Regulatory leadership, quality assurance, product development, diagnostics, and commercial functions.',
              },
              {
                title: 'Procurement and Supply Chain',
                desc: 'Chief procurement officers, vice presidents of procurement, strategic sourcing, supply chain leadership, and operations.',
              },
              {
                title: 'Technology and Digital Leadership',
                desc: 'Technology executives, CIOs, CTOs, information security leaders, product leadership, and digital transformation specialists.',
              },
              {
                title: 'Corporate and Commercial Leadership',
                desc: 'CEOs, COOs, CFOs, HR leaders, finance executives, business development, sales leadership, and other senior corporate functions.',
              },
            ].map((ind, idx) => (
              <div
                key={ind.title}
                onClick={() => onNavigate('/industries#industries-we-serve')}
                className="group p-6 bg-[#0F2350] border border-[#FACC15]/30 hover:border-[#0E6482] rounded-sm space-y-3 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-xs font-mono-tabular text-[#FDE047]">0{idx + 1}</span>
                <h3 className="font-editorial text-2xl font-semibold text-[#F8FAFC]">
                  {ind.title}
                </h3>
                <p className="text-sm text-[#F8FAFC]/80 leading-relaxed">{ind.desc}</p>
                <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden pt-0 group-hover:pt-2 border-t border-transparent group-hover:border-[#38BDF8]">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0E6482]">
                    <span>Click to View Sector Roles &amp; Mandates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Preview of 8 Discipline Expertise Cards */}
          <div id="functional-disciplines" className="pt-8 border-t border-[#1E293B] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl font-semibold text-[#FDE047]">
                Functional Discipline Specializations
              </h3>
              <a
                href="/expertise"
                onClick={(e) => handleLink(e, '/expertise')}
                className="text-xs text-[#FDE047] hover:underline"
              >
                View Full Expertise Directory →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {disciplineCards.map((card) => (
                <div
                  key={card.id}
                  className="group p-5 bg-[#1E3A8A]/40 border border-[#FACC15]/25 hover:border-[#0E6482] rounded-sm flex flex-col justify-between space-y-3 transition-all hover:shadow-lg"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-editorial text-xl font-semibold text-[#F8FAFC]">
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#F8FAFC]/75 leading-relaxed">{card.summary}</p>
                    <div className="max-h-0 opacity-0 group-hover:max-h-28 group-hover:opacity-100 transition-all duration-300 overflow-hidden pt-0 group-hover:pt-2">
                      <p className="text-[11px] font-bold text-[#0E6482]">
                        Roles: {card.illustrativeRoles.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  </div>
                  <a
                    href={card.ctaUrl}
                    onClick={(e) => handleLink(e, card.ctaUrl)}
                    className="text-xs font-semibold text-[#FDE047] hover:underline"
                  >
                    {card.ctaLabel} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: The Search Process (4-Stage Visual Process + Dynamic stages) */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              A Focused Approach to Executive Search
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              A Disciplined Approach to Finding the Right People.
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Successful executive recruitment begins with understanding the opportunity. We take a structured approach to role definition, talent research, candidate engagement, evaluation, and shortlisting. Each stage is designed to support a clear and informed hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchStages.slice(0, 4).map((st) => (
              <div
                key={st.step}
                className="p-6 bg-white border border-[#CBD5E1] rounded-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#EFF6FF] pb-3">
                  <span className="font-mono-tabular text-sm font-semibold text-[#1E3A8A]">
                    {st.step} — {st.shortName}
                  </span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>

          <div>
            <a
              href="/approach"
              onClick={(e) => handleLink(e, '/approach')}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#1E3A8A] hover:text-[#0F2350] underline underline-offset-4"
            >
              <span>Review Our Complete {searchStages.length}-Stage Search Methodology</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: Candidate Engagement & Dual Employer/Candidate Pathways (Section 19.1) */}
      <section className="py-16 md:py-24 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              For Executives &amp; Specialist Professionals
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              Your Next Opportunity Deserves a Thoughtful Conversation.
            </h2>
            <p className="text-base text-[#1E293B] leading-relaxed">
              Great career opportunities do not always begin with a job application. We build professional relationships and connect with experienced individuals when their expertise and ambitions may align with a relevant opportunity.
            </p>

            <ul className="space-y-3 text-sm text-[#1E293B]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" aria-hidden="true" />
                <span>Confidential career conversations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" aria-hidden="true" />
                <span>Relevant opportunities aligned with professional experience</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" aria-hidden="true" />
                <span>A straightforward candidate introduction process</span>
              </li>
            </ul>

            <p className="text-xs text-[#475569] bg-[#F8FAFC] p-4 border border-[#CBD5E1] rounded-sm">
              We welcome CV submissions from executives, senior professionals, and specialists interested in being considered for relevant opportunities. Submitting your CV does not guarantee an interview, placement, or immediate opportunity. Candidate information will be handled in accordance with the website’s privacy notice and applicable requirements.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/candidates#cv-form"
                onClick={(e) => handleLink(e, '/candidates#cv-form')}
                className="px-6 py-3 text-sm font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm transition-colors"
              >
                Introduce Yourself / Submit Your CV
              </a>
              <a
                href="/jobs"
                onClick={(e) => handleLink(e, '/jobs')}
                className="px-6 py-3 text-sm font-semibold text-[#1E3A8A] border border-[#1E3A8A] hover:bg-[#F8FAFC] rounded-sm transition-colors"
              >
                Explore Selected Opportunities
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src="/src/assets/images/regenerated_image_1793298524657.jpg"
              alt="Confidential career conversation between an executive candidate and search consultant"
              className="w-full h-full min-h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Value+, Categories Grid & Leadership Insights Showcase */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ExecutiveValueShowcase onNavigate={onNavigate} />
        </div>
      </section>

      {/* Section 7: Final CTA & Employer/Candidate Action Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#BAE6FD] via-[#E0F2FE] to-[#FEF08A] text-[#082F49] border-t border-[#7DD3FC]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
              EXECUTIVE SEARCH PARTNERSHIP
            </p>
            <h2 className="font-editorial text-3xl md:text-5xl font-bold text-[#082F49]">
              Good Search Starts With the Right Conversation.
            </h2>
            <p className="text-base md:text-lg text-[#082F49]/90 leading-relaxed">
              Whether you need to strengthen your leadership team or are considering your next professional move, let’s begin with a conversation.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/employers#enquiry-form"
                onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                className="px-7 py-3.5 text-sm font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all shadow-xs"
              >
                Discuss a Hiring Need
              </a>
              <a
                href="/candidates#cv-form"
                onClick={(e) => handleLink(e, '/candidates#cv-form')}
                className="px-7 py-3.5 text-sm font-bold text-[#082F49] bg-white hover:bg-[#E0F2FE] border border-[#7DD3FC] rounded-full transition-all shadow-xs"
              >
                Connect as a Candidate
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#7DD3FC]">
            <div className="p-8 bg-white border border-[#7DD3FC] rounded-2xl shadow-md space-y-3">
              <h3 className="font-editorial text-2xl font-bold text-[#082F49]">
                Looking for Your Next Exceptional Leader?
              </h3>
              <p className="text-sm text-[#1E293B] leading-relaxed">
                Whether you are building a leadership team, replacing a key executive, expanding into a new market, or searching for a specialist professional, Alexanders Career Strategy can help you define your requirements and explore a targeted search approach. Tell us about the position, your organization, and the experience you need.
              </p>
              <div className="pt-2">
                <a
                  href="/employers#enquiry-form"
                  onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0369A1] hover:underline"
                >
                  <span>Discuss Your Hiring Needs</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#7DD3FC] rounded-2xl shadow-md space-y-3">
              <h3 className="font-editorial text-2xl font-bold text-[#082F49]">
                Your Next Opportunity Starts with a Conversation
              </h3>
              <p className="text-sm text-[#1E293B] leading-relaxed">
                We welcome CV submissions from executives, senior professionals, and specialists interested in being considered for relevant opportunities. Share your professional background, areas of expertise, and career interests so your information can be reviewed for suitable search assignments.
              </p>
              <div className="pt-2">
                <a
                  href="/candidates#cv-form"
                  onClick={(e) => handleLink(e, '/candidates#cv-form')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0369A1] hover:underline"
                >
                  <span>Submit Your CV</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 2. FOR EMPLOYERS PAGE (Sections 6 & 19.5) — Dynamic CMS Connected
// ============================================================================
export const ForEmployersPage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const { getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/employers');

  return (
    <div className="bg-[#F8FAFC]/82">
      {/* Hero with Full-Bleed Background Photograph */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#BAE6FD] via-[#FFFFFF] to-[#FEF08A] text-[#082F49] py-16 md:py-24 border-b border-[#7DD3FC]">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : '/src/assets/images/regenerated_image_1793268848419.jpg'
          }
          alt="Executive search consultation and talent mapping for hiring organizations"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#BAE6FD]/90 via-[#FFFFFF]/84 to-[#FEF08A]/86 backdrop-blur-[1px]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs md:text-sm font-extrabold tracking-[0.22em] uppercase text-[#0369A1]">
              {pageConfig?.heroKicker || 'FOR HIRING ORGANIZATIONS, BOARDS & EXECUTIVE LEADERS'}
            </p>
            <h1 className="font-editorial text-4xl md:text-5xl lg:text-[54px] font-bold text-[#082F49] leading-[1.08]">
              {pageConfig?.heroHeading || 'Find the People Who Move Your Business Forward.'}
            </h1>
            <p className="text-base md:text-lg text-[#082F49] font-medium leading-relaxed max-w-2xl">
              {pageConfig?.heroText ||
                'We partner with organizations to identify, engage, and evaluate professionals for critical leadership and specialist positions through focused search and personalized recruitment.'}
            </p>
            <div>
              <DynamicTypewriter
                variant="light-blue-badge"
                prefix="EMPLOYER SOLUTIONS"
                phrases={[
                  'Retained C-Suite & Boardroom Executive Search',
                  'Confidential Succession & Leadership Transitions',
                  'Targeted Headhunting Across 9 Core U.S. Sectors',
                  'Bespoke Talent Mapping & Market Intelligence',
                ]}
              />
            </div>
            <div className="pt-2">
              <a
                href={pageConfig?.primaryCtaUrl || '#enquiry-form'}
                className="inline-block px-7 py-3.5 text-sm font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all shadow-sm"
              >
                {pageConfig?.primaryCtaLabel || 'Request a Search Consultation'}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <EditorialImage
              src={
                pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
                  ? pageConfig.heroImage
                  : '/src/assets/images/regenerated_image_1793268848419.jpg'
              }
              alt="Executive search consultation and talent mapping for hiring organizations"
              className="w-full h-full min-h-[280px] object-cover"
            />
          </div>
        </div>
      </section>
      <DynamicMetricsRibbon onNavigate={onNavigate} />

      {/* Section 19.5 Full Copy: Introduction & When to Engage */}
      <section className="py-16 md:py-20 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-editorial text-3xl font-semibold text-[#0A1633]">
              Focused Recruitment for Important Leadership Decisions
            </h2>
            <p className="text-base text-[#1E293B] leading-relaxed">
              Hiring for an important leadership position requires a clear understanding of the organization’s priorities and the capabilities needed to move the business forward.
            </p>
            <p className="text-base text-[#1E293B] leading-relaxed">
              Alexanders Career Strategy works with employers to define search requirements, identify relevant talent, and engage professionals whose experience aligns with the position. Whether you are appointing a senior executive, strengthening a management team, or searching for a specialist professional, we aim to provide a focused and professional recruitment process.
            </p>
          </div>

          <div className="lg:col-span-6 p-8 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-4">
            <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              When to Work With an Independent Headhunter
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Executive search can be particularly useful when a position requires substantial leadership experience, specialist industry knowledge, confidentiality, or access to professionals who may not be actively applying for jobs:
            </p>
            <ul className="space-y-2.5 text-sm text-[#1E293B]">
              {[
                'Needs to fill a senior leadership or C-suite role',
                'Cannot find suitable candidates through conventional advertising',
                'Requires specialized industry or regulatory expertise',
                'Wants to reach passive professionals who are not actively job hunting',
                'Needs discretion around a sensitive appointment or succession transition',
                'Wants dedicated attention for an important hiring decision',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Employer Engagement Process (Section 19.5) */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-10">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              Our Employer Engagement Process
            </h2>
            <p className="text-sm md:text-base text-[#475569]">
              A structured six-step partnership from requirement definition through appointment support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Understand Your Requirements',
                desc: 'We discuss the position, reporting structure, business objectives, responsibilities, essential experience, and candidate expectations.',
              },
              {
                num: '02',
                title: 'Define the Search Strategy',
                desc: 'We establish the relevant candidate profile, potential talent markets, search priorities, and appropriate outreach approach.',
              },
              {
                num: '03',
                title: 'Identify Potential Candidates',
                desc: 'We research relevant professionals and identify individuals whose experience may align with the role.',
              },
              {
                num: '04',
                title: 'Engage and Evaluate',
                desc: 'We approach suitable candidates, establish their interest, and review their experience against the requirements of the assignment.',
              },
              {
                num: '05',
                title: 'Present a Shortlist',
                desc: 'We present suitable candidates for client consideration, with relevant information to support the selection process.',
              },
              {
                num: '06',
                title: 'Support the Selection Process',
                desc: 'We help coordinate communication and next steps as the employer conducts interviews, completes appropriate checks, and makes its decision.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="p-6 bg-white border border-[#CBD5E1] rounded-sm space-y-2.5"
              >
                <span className="font-mono-tabular text-xs font-semibold text-[#1E3A8A]">
                  Step {step.num}
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Service Models & Commercial Terms Accuracy Box */}
          <div className="p-8 bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15]/30 rounded-sm space-y-4">
            <h3 className="font-editorial text-2xl font-semibold text-[#FDE047]">
              Service Models &amp; Working with Alexanders Career Strategy
            </h3>
            <p className="text-sm text-[#F8FAFC]/85 leading-relaxed">
              We support executive search, retained search, contingency recruitment, specialist permanent placements, confidential search, and talent mapping. Every recruitment assignment has different requirements. We aim to establish a clear understanding of the position, communicate expectations, and maintain a professional process throughout the engagement.
            </p>
            <p className="text-xs text-[#FDE047]/90">
              Commercial Transparency Note: The scope, timing, deliverables, fees, replacement provisions, and commercial terms of each assignment are discussed and agreed directly with the client before the search begins.
            </p>
          </div>
        </div>
      </section>

      {/* Employer Enquiry Form Section */}
      <section id="enquiry-form" className="py-16 md:py-24 max-w-[1000px] mx-auto px-6">
        <EmployerEnquiryForm onNavigate={onNavigate} />
      </section>
    </div>
  );
};

// ============================================================================
// 3. FOR CANDIDATES PAGE (Sections 7 & 19.6) — Dynamic CMS Connected
// ============================================================================
export const ForCandidatesPage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const { getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/candidates');

  return (
    <div className="bg-[#F8FAFC]/82">
      {/* Hero with Full-Bleed Background Photograph */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E0F2FE] via-[#FFFFFF] to-[#FEF08A] text-[#082F49] py-16 md:py-24 border-b border-[#7DD3FC]">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : '/src/assets/images/regenerated_image_1793298524657.jpg'
          }
          alt="Executive career strategy and confidential candidate relationship conversation"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#E0F2FE]/90 via-[#FFFFFF]/84 to-[#FEF08A]/86 backdrop-blur-[1px]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs md:text-sm font-extrabold tracking-[0.22em] uppercase text-[#0369A1]">
              {pageConfig?.heroKicker || 'FOR EXECUTIVES, SENIOR LEADERS & SPECIALIST PROFESSIONALS'}
            </p>
            <h1 className="font-editorial text-4xl md:text-5xl lg:text-[54px] font-bold text-[#082F49] leading-[1.08]">
              {pageConfig?.heroHeading || 'Your Experience. The Right Opportunity.'}
            </h1>
            <p className="text-base md:text-lg text-[#082F49] font-medium leading-relaxed max-w-2xl">
              {pageConfig?.heroText ||
                'We build relationships with talented professionals and help connect relevant experience with opportunities that align with organizational needs and individual career goals.'}
            </p>
            <div>
              <DynamicTypewriter
                variant="dark-yellow-badge"
                prefix="CANDIDATE NETWORK"
                phrases={[
                  'Executive & Specialist Opportunity Profiles Open for Interest',
                  'Confidential CV Registration & Private Vault Storage',
                  'Direct Representation to Fortune 500 Hiring Boards',
                  'C-Suite, EVP, SVP, VP & Specialist Leadership Roles',
                ]}
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={pageConfig?.primaryCtaUrl || '#cv-form'}
                className="px-7 py-3.5 text-sm font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-full transition-all shadow-sm"
              >
                {pageConfig?.primaryCtaLabel || 'Submit Your CV'}
              </a>
              <a
                href={pageConfig?.secondaryCtaUrl || '/jobs'}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(pageConfig?.secondaryCtaUrl || '/jobs');
                }}
                className="px-7 py-3.5 text-sm font-bold text-[#082F49] bg-white hover:bg-[#E0F2FE] border border-[#7DD3FC] rounded-full transition-all shadow-sm"
              >
                {pageConfig?.secondaryCtaLabel || 'Browse Selected Opportunities'}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <EditorialImage
              src={
                pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
                  ? pageConfig.heroImage
                  : '/src/assets/images/regenerated_image_1793298524657.jpg'
              }
              alt="Executive career strategy and confidential candidate relationship conversation"
              className="w-full h-full min-h-[280px] object-cover"
            />
          </div>
        </div>
      </section>
      <DynamicSpotlightCarousel onNavigate={onNavigate} />

      {/* Section 19.6 Full Copy: Introduction, Who Should Submit, Preparing Your CV, Privacy */}
      <section id="candidate-expectations" className="py-16 md:py-20 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="font-editorial text-3xl font-semibold text-[#0A1633]">
                How Our Candidate Relationship Process Works
              </h2>
              <p className="text-base text-[#1E293B] leading-relaxed">
                Alexanders Career Strategy welcomes enquiries and CV submissions from executives, senior managers, and specialist professionals interested in being considered for relevant recruitment assignments.
              </p>
              <p className="text-base text-[#1E293B] leading-relaxed">
                Our search work focuses on matching professional experience and capabilities with the requirements of specific positions. We encourage candidates to provide accurate information about their background, leadership responsibilities, achievements, specialist knowledge, and career interests.
              </p>
              <p className="text-sm text-[#475569] leading-relaxed bg-[#F8FAFC] p-4 border border-[#CBD5E1] rounded-sm">
                Submitting your CV allows your information to be considered for relevant opportunities where appropriate. It does not guarantee that a suitable vacancy is available, that you will be contacted, or that you will be selected for a position.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-editorial text-3xl font-semibold text-[#0A1633]">
                Who Should Submit a CV?
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                We welcome relevant submissions from professionals with experience across the United States in:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#1E293B]">
                {[
                  'C-suite and executive leadership',
                  'Board and non-executive leadership',
                  'Vice president and director-level positions',
                  'General management and business operations',
                  'Healthcare and medical leadership',
                  'Pharmaceutical and biotechnology functions',
                  'Finance, banking, insurance, and risk',
                  'Technology, engineering, and digital leadership',
                  'Manufacturing, procurement, and supply chain',
                  'Sales, marketing, and commercial leadership',
                ].map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#EFF6FF]">
            <div className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-3">
              <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                Preparing Your CV
              </h3>
              <p className="text-sm text-[#1E293B] leading-relaxed">
                A clear and current CV helps communicate your professional background and suitability for potential opportunities. Where relevant, include your current or most recent role, previous positions, leadership responsibilities, measurable achievements, industry experience, qualifications, and specialist capabilities. Please ensure that the information you submit is accurate and that you have the right to share any included information.
              </p>
            </div>

            <div className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-3">
              <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                Candidate Privacy &amp; Restricted Storage
              </h3>
              <p className="text-sm text-[#1E293B] leading-relaxed">
                We recognize that a CV contains personal information. Candidate information is collected, stored, accessed, and retained in accordance with our privacy notice and applicable data protection requirements. CV files are stored in private storage with access restrictions and are never exposed through public file URLs. While we respect discretion, we may share candidate information with prospective employers following appropriate notice and authorization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Submission Form */}
      <section id="cv-form" className="py-16 md:py-20 max-w-[1000px] mx-auto px-6">
        <CandidateCvForm onNavigate={onNavigate} />
      </section>

      {/* Candidate FAQs */}
      <section className="py-16 bg-white border-t border-[#CBD5E1]">
        <div className="max-w-[1000px] mx-auto px-6 space-y-8">
          <h2 className="font-editorial text-3xl font-semibold text-[#0A1633]">
            Frequently Asked Questions for Candidates
          </h2>
          <div className="space-y-4">
            {CANDIDATE_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2"
              >
                <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 4. OUR EXPERTISE & INDUSTRIES WE SERVE PAGES (Sections 8, 19.3, 19.4)
// ============================================================================
export const OurExpertisePage: React.FC<PageNavProps & { focusIndustries?: boolean }> = ({
  onNavigate,
  focusIndustries = false,
}) => {
  const { disciplineCards, industries, getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig(focusIndustries ? '/industries' : '/expertise');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-[#F8FAFC]/82">
      {/* Hero with Full-Bleed Background Photograph */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#BAE6FD] via-[#FFFFFF] to-[#FEF08A] text-[#082F49] py-16 md:py-24 border-b border-[#7DD3FC]">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : focusIndustries
              ? '/src/assets/images/regenerated_image_1793294161466.jpg'
              : '/src/assets/images/regenerated_image_1793299200419.jpg'
          }
          alt={focusIndustries ? 'Cross-industry executive search' : 'Executive search expertise'}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#BAE6FD]/90 via-[#FFFFFF]/84 to-[#FEF08A]/86 backdrop-blur-[1px]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 space-y-5">
          <p className="text-xs md:text-sm font-extrabold tracking-[0.22em] uppercase text-[#0369A1]">
            {pageConfig?.heroKicker ||
              (focusIndustries
                ? 'INDUSTRIES WE SERVE · CROSS-SECTOR EXECUTIVE SEARCH'
                : 'EXECUTIVE SEARCH & SPECIALIST RECRUITMENT DISCIPLINES')}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-[54px] font-bold text-[#082F49] leading-[1.08]">
            {pageConfig?.heroHeading || (focusIndustries ? 'Industries We Serve' : 'Our Expertise')}
          </h1>
          <p className="text-base md:text-lg text-[#082F49] font-medium max-w-3xl leading-relaxed">
            {pageConfig?.heroText ||
              (focusIndustries
                ? 'Effective executive recruitment requires an understanding of the environment in which a leader will operate. Alexanders Career Strategy supports searches across multiple industries, adapting candidate requirements to the responsibilities of each role and the needs of the organization.'
                : 'Alexanders Career Strategy specializes in executive search, headhunting, senior management recruitment, and targeted talent identification. From C-suite appointments to specialist and hard-to-fill roles, our approach is shaped by the requirements of each assignment.')}
          </p>
          <div>
            <DynamicTypewriter
              variant="light-blue-badge"
              prefix="PRACTICE AREAS"
              phrases={[
                'Technology, AI, Cloud & Cybersecurity Leadership',
                'Pharmaceuticals, Biotechnology & Clinical Development',
                'Healthcare Systems, Hospitals & MedTech Innovation',
                'Financial Services, Banking, Risk & Corporate Finance',
                'Manufacturing, Global Procurement & Supply Chain',
              ]}
            />
          </div>
        </div>
      </section>
      <DynamicMetricsRibbon onNavigate={onNavigate} />

      {/* Eight "Explore Our Expertise" Discipline Cards (Section 8) */}
      <section className="py-16 md:py-20 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              Functional Specializations
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              Explore Our Expertise
            </h2>
            <p className="text-sm text-[#475569]">
              Illustrative executive search and specialist recruitment categories across core corporate and technical disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplineCards.map((card) => (
              <article
                key={card.id}
                className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#FACC15] rounded-sm flex flex-col justify-between space-y-5 transition-colors"
              >
                <div className="space-y-3">
                  <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#1E293B] leading-relaxed">{card.summary}</p>
                  <div className="pt-2 border-t border-[#CBD5E1]">
                    <p className="text-[11px] font-semibold text-[#475569] mb-1">
                      Illustrative Target Roles:
                    </p>
                    <p className="text-xs text-[#475569]">{card.illustrativeRoles.join(' · ')}</p>
                  </div>
                </div>
                <a
                  href={card.ctaUrl}
                  onClick={(e) => handleLink(e, card.ctaUrl)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:text-[#0F2350] underline underline-offset-4"
                >
                  <span>{card.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 19.3 Full Expertise Articles */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-10">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              Search Capabilities &amp; Recruitment Solutions
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Our services are designed to help employers define recruitment priorities, identify relevant talent, engage suitable candidates, and move through the selection process with greater focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Executive Search & Headhunting',
                body: 'Executive search focuses on identifying and engaging professionals whose backgrounds match a specific leadership requirement. Rather than relying exclusively on incoming applications, targeted headhunting involves researching relevant talent markets, identifying potential candidates, and approaching individuals whose experience may fit the role. Alexanders Career Strategy uses a focused search approach to help employers reach suitable professionals, including individuals who may not be actively looking for a new position.',
              },
              {
                title: 'C-Suite & Executive Recruitment',
                body: 'Senior executive appointments can influence organizational strategy, financial performance, operational effectiveness, innovation, and company culture. We support searches for positions such as Chief Executive Officer, Chief Financial Officer, Chief Operating Officer, Chief Technology Officer, Chief Information Officer, Chief Human Resources Officer, Chief Marketing Officer, Chief Medical Officer, and other executive leadership roles. Each assignment should reflect the organization’s structure, strategic objectives, leadership expectations, and required professional experience.',
              },
              {
                title: 'Board & Non-Executive Director Search',
                body: 'Board appointments require careful consideration of governance experience, strategic judgment, industry knowledge, independence, and the ability to contribute to oversight and organizational direction. We support the identification of board-level professionals and non-executive directors whose backgrounds align with the organization’s governance needs and board composition requirements.',
              },
              {
                title: 'Senior Management Recruitment',
                body: 'Experienced managers and directors help translate business strategy into operational performance. We support recruitment for vice presidents, executive directors, managing directors, general managers, functional directors, and senior department heads. Search criteria can include team leadership, budget responsibility, operational experience, commercial performance, transformation, and relevant industry expertise.',
              },
              {
                title: 'Specialist & Hard-to-Fill Recruitment',
                body: 'Some positions require a combination of technical expertise, industry experience, professional qualifications, or rare capabilities. We use targeted research and candidate outreach to identify professionals whose backgrounds meet the specific requirements of these assignments. The search strategy is adapted to the role, the available talent market, and the employer’s priorities.',
              },
              {
                title: 'Confidential Executive Search & Succession',
                body: 'Confidential searches may be necessary for leadership transitions, sensitive replacement appointments, business restructuring, succession planning, or other situations requiring discretion. We approach these assignments with careful communication and appropriate information handling. Search details are shared only as authorized and necessary for the recruitment process.',
              },
              {
                title: 'Talent Mapping & Market Intelligence',
                body: 'Talent mapping helps organizations understand the professional landscape surrounding a particular role, function, industry, or geography. This work may include identifying relevant employers, researching leadership structures, mapping potential candidate pools, and examining the experience and capabilities available in the market. The resulting insights can support recruitment planning and help employers develop a more informed search strategy.',
              },
              {
                title: 'Leadership Assessment & Candidate Evaluation',
                body: 'Candidate evaluation should consider more than a job title or a list of qualifications. We help structure candidate reviews around relevant experience, leadership responsibilities, professional achievements, technical capabilities, and alignment with the role’s stated requirements. Where appropriate, the process may also consider communication, strategic thinking, stakeholder management, and the candidate’s interest in the opportunity. Assessments and reference checks should be conducted with suitable authorization and in accordance with applicable requirements.',
              },
              {
                title: 'Industry-Specific Executive Search',
                body: 'Each industry has its own operating environment, technical demands, and leadership priorities. We tailor search criteria to the requirements of the sector and position, considering factors such as regulatory knowledge, commercial experience, operational complexity, and specialist expertise. Our industry coverage includes healthcare, pharmaceuticals, financial services, technology, manufacturing, energy, consumer goods, logistics, and professional services.',
              },
              {
                title: 'International & Cross-Border Executive Search',
                body: 'Organizations operating across markets may require executives with international experience, regional knowledge, cross-cultural leadership skills, or experience managing distributed operations. We support searches that consider the relevant market, location, role requirements, and experience needed for international or cross-border appointments. International recruitment assignments must take account of applicable employment, immigration, data protection, and other relevant requirements.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white border border-[#CBD5E1] rounded-sm space-y-2.5"
              >
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 19.4 Full Copy: Industries We Serve */}
      <section id="industries-we-serve" className="py-16 md:py-24 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              Sector Specializations (Illustrative Search Categories)
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              Industries We Serve
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Our industry coverage is designed to help employers identify leadership talent and specialist professionals with relevant experience, functional expertise, and an understanding of the challenges facing their sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {industries.map((ind) => (
              <article
                key={ind.id}
                className="p-8 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                <div className="lg:col-span-7 space-y-3">
                  <h3 className="font-editorial text-2xl md:text-3xl font-semibold text-[#0A1633]">
                    {ind.title}
                  </h3>
                  {ind.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm md:text-base text-[#1E293B] leading-relaxed">
                      {p}
                    </p>
                  ))}
                  <p className="text-xs text-[#1E3A8A] font-medium pt-1">
                    <strong>How Targeted Search Helps:</strong> {ind.howTargetedSearchHelps}
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-[#CBD5E1] lg:pl-8">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-[#1E3A8A] mb-2">
                      Illustrative Target Functions &amp; Roles
                    </h4>
                    <p className="text-xs text-[#1E293B] leading-relaxed">
                      {ind.illustrativeRoles.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-[#1E3A8A] mb-2">
                      Key Sector Recruitment Considerations
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#475569]">
                      {ind.challenges.map((ch) => (
                        <li key={ch}>• {ch}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2">
                    <a
                      href="/employers#enquiry-form"
                      onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline"
                    >
                      <span>Discuss a Search in {ind.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Industry CTA (Sections 19.3 & 19.4) */}
      <section className="py-16 bg-[#0F2350] text-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#1E3A8A]/40 border border-[#FACC15]/30 rounded-sm space-y-4">
            <h2 className="font-editorial text-3xl font-semibold text-[#F8FAFC]">
              Let’s Define Your Search
            </h2>
            <p className="text-sm text-[#F8FAFC]/85 leading-relaxed">
              Tell us about the position you need to fill, the experience required, and the business objectives the successful candidate will support. We will review your enquiry and discuss an appropriate search approach.
            </p>
            <a
              href="/employers#enquiry-form"
              onClick={(e) => handleLink(e, '/employers#enquiry-form')}
              className="inline-block px-6 py-3 text-xs md:text-sm font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm transition-colors"
            >
              Start an Executive Search
            </a>
          </div>

          <div className="p-8 bg-[#1E3A8A]/40 border border-[#FACC15]/30 rounded-sm space-y-4">
            <h2 className="font-editorial text-3xl font-semibold text-[#F8FAFC]">
              Searching for Talent in Your Industry?
            </h2>
            <p className="text-sm text-[#F8FAFC]/85 leading-relaxed">
              Tell us about your industry, the role you need to fill, and the experience required. We will review your enquiry and discuss how a targeted recruitment approach may support your organization.
            </p>
            <a
              href="/employers#enquiry-form"
              onClick={(e) => handleLink(e, '/employers#enquiry-form')}
              className="inline-block px-6 py-3 text-xs md:text-sm font-semibold text-[#F8FAFC] border border-[#FACC15] hover:bg-[#1E3A8A] rounded-sm transition-colors"
            >
              Discuss Your Industry Search
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
