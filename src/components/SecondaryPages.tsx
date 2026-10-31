import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Compass, Search, Shield, Users } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { CAREERS_EDITORIAL_TOPICS } from '../data/siteContent';
import { EditorialImage } from './EditorialImage';
import { TeamSection } from './TeamSection';
import { GeneralContactForm, CareerInterestForm } from './Forms';
import { ExecutiveValueShowcase } from './ExecutiveValueShowcase';

interface PageNavProps {
  onNavigate: (path: string) => void;
}

// ============================================================================
// 1. OUR APPROACH / SEARCH PROCESS PAGE (Sections 9 & 19.7)
// ============================================================================
export const OurApproachPage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const { searchStages, getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/approach');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-[#F8FAFC]/82">
      <section className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-16 md:py-24 border-b border-[#FACC15]/30">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : '/src/assets/images/regenerated_image_1793299190928.jpg'
          }
          alt="Structured eight-stage executive search methodology"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
              {pageConfig?.heroKicker || 'Executive Search Methodology'}
            </p>
            <h1 className="font-editorial text-4xl md:text-5xl font-semibold text-[#F8FAFC]">
              {pageConfig?.heroHeading || 'A Disciplined Approach to Finding the Right People.'}
            </h1>
            <p className="text-base md:text-lg text-[#F8FAFC]/85 leading-relaxed">
              {pageConfig?.heroText ||
                'A successful executive search begins with a clear definition of the opportunity and a shared understanding of what the organization needs. Alexanders Career Strategy follows a structured approach designed to identify relevant talent, engage suitable professionals, and help employers make informed recruitment decisions.'}
            </p>
            <p className="text-xs text-[#FDE047]/85">
              The precise process may vary depending on the role, industry, location, confidentiality requirements, and scope of the assignment.
            </p>
          </div>
          <div className="lg:col-span-5">
            <EditorialImage
              src={
                pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
                  ? pageConfig.heroImage
                  : '/src/assets/images/regenerated_image_1793299190928.jpg'
              }
              alt="Structured eight-stage executive search methodology"
              className="w-full h-full min-h-[280px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 8 Stages of the Search Process (Section 19.7 — Dynamic from CMS searchStages) */}
      <section className="py-16 md:py-24 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              Eight Stages of Our Search Process
            </h2>
            <p className="text-sm md:text-base text-[#475569] leading-relaxed">
              Communication cadence, assessment criteria, reporting, timelines, and deliverables are established clearly with the client at the outset of each assignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchStages.map((stage) => (
              <article
                key={stage.step}
                className="p-7 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-[#475569] border-b border-[#CBD5E1] pb-2.5">
                  <span className="font-mono-tabular font-semibold text-[#1E3A8A]">
                    STAGE {stage.step} · {stage.shortName}
                  </span>
                  <span>{stage.deliverableType}</span>
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  {stage.title}
                </h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">{stage.description}</p>
              </article>
            ))}
          </div>

          {/* Governance & Expectation Clarity Box */}
          <div className="p-8 bg-[#EFF6FF] border border-[#CBD5E1] rounded-sm space-y-3">
            <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Scope Clarity &amp; Professional Standards
            </h3>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              We distinguish clearly between core search activities included in an agreed engagement (role brief alignment, market research, direct candidate outreach, initial screening, and shortlist presentation) and optional or specifically authorized services (such as formal psychometric assessments, extended background/reference verification, or post-placement transition check-ins). While we apply rigorous research and outreach discipline to every mandate, no ethical search consultancy can guarantee that every identified passive professional will be available to move or that every search will result in an immediate hire.
            </p>
          </div>
        </div>
      </section>

      {/* Process CTA (Section 19.7) */}
      <section className="py-16 bg-[#0F2350] text-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#F8FAFC]">
              Ready to Begin Your Search?
            </h2>
            <p className="text-sm md:text-base text-[#F8FAFC]/85 leading-relaxed">
              Share your hiring requirements with us and we will discuss the position, the talent market, and the appropriate next steps for your recruitment assignment.
            </p>
          </div>
          <a
            href="/employers#enquiry-form"
            onClick={(e) => handleLink(e, '/employers#enquiry-form')}
            className="px-6 py-3.5 text-sm font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm transition-colors whitespace-nowrap"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 2. ABOUT US PAGE (Sections 10, 19.2 & 22)
// ============================================================================
export const AboutUsPage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const { getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/about');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-[#F8FAFC]/82">
      {/* Hero with Full-Bleed Background Photograph */}
      <section className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-16 md:py-24 border-b border-[#FACC15]/30">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : '/src/assets/images/regenerated_image_1793299190928.jpg'
          }
          alt="Collaborative executive search discussion at Alexanders Career Strategy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
              {pageConfig?.heroKicker || 'About Alexanders Career Strategy'}
            </p>
            <h1 className="font-editorial text-4xl md:text-5xl font-semibold text-[#F8FAFC]">
              {pageConfig?.heroHeading ||
                'Focused Research. Professional Integrity. Meaningful Relationships.'}
            </h1>
            <p className="text-base md:text-lg text-[#F8FAFC]/85 leading-relaxed">
              {pageConfig?.heroText ||
                'Alexanders Career Strategy is an executive search and recruitment firm focused on identifying and attracting qualified leadership talent and specialist professionals across the United States.'}
            </p>
          </div>
          <div className="lg:col-span-5">
            <EditorialImage
              src={
                pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
                  ? pageConfig.heroImage
                  : '/src/assets/images/regenerated_image_1793299190928.jpg'
              }
              alt="Collaborative executive search discussion at Alexanders Career Strategy"
              className="w-full h-full min-h-[280px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 19.2 Full Copy: Who We Are, Mission, Vision, Approach */}
      <section className="py-16 md:py-24 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
                Who We Are
              </h2>
              <p className="text-base text-[#1E293B] leading-relaxed">
                Alexanders Career Strategy is an executive search and recruitment firm focused on identifying and attracting qualified leadership talent and specialist professionals.
              </p>
              <p className="text-base text-[#1E293B] leading-relaxed">
                We work with organizations seeking individuals who can lead teams, strengthen business functions, guide strategic decisions, and contribute to organizational performance. Our approach combines an understanding of hiring requirements with targeted talent research and professional candidate engagement.
              </p>
              <p className="text-base text-[#1E293B] leading-relaxed">
                Executive recruitment requires careful consideration of more than job titles and qualifications. It involves understanding responsibilities, leadership expectations, organizational culture, industry knowledge, and the experience needed to perform effectively in a particular role.
              </p>
              <p className="text-base text-[#1E3A8A] font-medium leading-relaxed">
                We aim to make this process more focused by helping employers clarify their requirements and identify candidates whose professional backgrounds align with their needs.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2">
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  Our Mission
                </h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">
                  Our mission is to connect organizations with capable professionals who can contribute to effective leadership, business performance, and long-term organizational development. We seek to support better hiring decisions through focused search strategies, thoughtful candidate evaluation, and professional relationships with employers and candidates.
                </p>
              </div>

              <div className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2">
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  Our Vision
                </h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">
                  Our vision is to be a trusted executive search partner recognized for professionalism, a focused approach to talent identification, and a commitment to helping organizations find the people they need to move forward.
                </p>
              </div>

              <div className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2">
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  Our Approach
                </h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">
                  Every search begins with understanding the role and the organization behind it. We consider the responsibilities of the position, the experience required, the leadership capabilities expected, and the broader business objectives the successful candidate will support. We then use a targeted approach to identify relevant talent, engage potential candidates, assess professional alignment, and support the selection process.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values (Section 19.2) */}
          <div className="pt-10 border-t border-[#CBD5E1] space-y-8">
            <h2 className="font-editorial text-3xl font-semibold text-[#0A1633]">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {[
                {
                  title: 'Professionalism',
                  desc: 'We approach recruitment assignments with discretion, clear communication, and respect for the time and interests of employers and candidates.',
                },
                {
                  title: 'Integrity',
                  desc: 'We aim to communicate accurately, handle information responsibly, and maintain appropriate expectations throughout the recruitment process.',
                },
                {
                  title: 'Quality',
                  desc: 'We focus on the relevance of candidate experience, capabilities, and role alignment rather than simply the volume of applications received.',
                },
                {
                  title: 'Confidentiality',
                  desc: 'We recognize that executive searches and career discussions can involve sensitive information. Candidate and client information should be handled through appropriate privacy and access controls.',
                },
                {
                  title: 'Partnership',
                  desc: 'We seek to understand each client’s hiring objectives and build professional relationships that support informed recruitment decisions.',
                },
              ].map((val) => (
                <div
                  key={val.title}
                  className="p-5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2"
                >
                  <h3 className="font-editorial text-xl font-semibold text-[#1E3A8A]">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#1E293B] leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section (Section 22) */}
      <TeamSection onNavigate={onNavigate} compactHeader />

      {/* About CTA (Section 19.2) */}
      <section className="py-16 bg-[#0F2350] text-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#F8FAFC]">
              Let’s Discuss Your Leadership Requirements
            </h2>
            <p className="text-sm md:text-base text-[#F8FAFC]/85 leading-relaxed">
              If your organization is preparing for a leadership appointment or a specialized recruitment assignment, we invite you to tell us about your requirements. We will review your enquiry and discuss how a focused search may support your hiring objectives.
            </p>
          </div>
          <a
            href="/contact"
            onClick={(e) => handleLink(e, '/contact')}
            className="px-6 py-3.5 text-sm font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm transition-colors whitespace-nowrap"
          >
            Contact Our Team
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 3. CAREERS AT ALEXANDERS CAREER STRATEGY PAGE (Section 25)
// ============================================================================
export const CareersPage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const { internalCareerOpenings, getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/careers');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const activeInternalOpenings = internalCareerOpenings.filter((o) => o.published);

  return (
    <div className="bg-[#F8FAFC]/82">
      {/* Hero: Build a Career That Shapes Leadership */}
      <section className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-16 md:py-24 border-b border-[#FACC15]/30">
        <img
          src={pageConfig?.heroImage || '/src/assets/images/regenerated_image_1793299190928.jpg'}
          alt="Collaborative executive search culture at Alexanders Career Strategy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
              {pageConfig?.heroKicker || 'Careers at Alexanders Career Strategy'}
            </p>
            <h1 className="font-editorial text-4xl md:text-5xl font-semibold text-[#F8FAFC]">
              {pageConfig?.heroHeading || 'Build a Career That Shapes Leadership'}
            </h1>
            <p className="text-base md:text-lg text-[#F8FAFC]/85 leading-relaxed">
              {pageConfig?.heroText ||
                'At Alexanders Career Strategy, we believe exceptional businesses are built by exceptional people. We bring together professional insight, meaningful relationships, and a commitment to identifying the leaders who help organizations move forward.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={pageConfig?.primaryCtaUrl || '#career-opportunities'}
                className="px-6 py-3.5 text-sm font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm transition-colors"
              >
                {pageConfig?.primaryCtaLabel || 'Explore Career Opportunities'}
              </a>
              <a
                href={pageConfig?.secondaryCtaUrl || '/team'}
                onClick={(e) => handleLink(e, pageConfig?.secondaryCtaUrl || '/team')}
                className="px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] border border-[#FACC15] hover:bg-[#1E3A8A] rounded-sm transition-colors"
              >
                {pageConfig?.secondaryCtaLabel || 'Meet Our Team'}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <EditorialImage
              src={pageConfig?.heroImage || '/src/assets/images/regenerated_image_1793299190928.jpg'}
              alt="Collaborative executive search culture at Alexanders Career Strategy"
              className="w-full h-full min-h-[280px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Introduction: More Than a Career. An Opportunity to Make an Impact. */}
      <section className="py-16 md:py-20 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              More Than a Career. An Opportunity to Make an Impact.
            </h2>
            <p className="text-base text-[#1E293B] leading-relaxed">
              Executive search is built on trust, judgment, curiosity, and the ability to understand people. At Alexanders Career Strategy, our work connects talented professionals with opportunities and organizations with the leadership they need to grow.
            </p>
            <p className="text-base text-[#1E293B] leading-relaxed">
              We value thoughtful communication, professional integrity, continuous learning, and the ability to build lasting relationships. We aim to create an environment where people can contribute ideas, develop their capabilities, and take pride in the quality and impact of their work.
            </p>
          </div>
          <div className="lg:col-span-5">
            <EditorialImage
              src="/src/assets/images/regenerated_image_1793299200419.jpg"
              alt="Professional workplace and search research environment"
              className="w-full h-full min-h-[240px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Alexanders Career Strategy? (6 Cards) */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-10">
          <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
            Why Alexanders Career Strategy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Meaningful Work',
                desc: 'Contribute to work that connects organizations with leadership talent and helps professionals explore important career opportunities.',
              },
              {
                title: 'Relationship-Driven Culture',
                desc: 'Build trusted relationships through thoughtful communication, professional respect, and a genuine understanding of clients and candidates.',
              },
              {
                title: 'Professional Development',
                desc: 'Develop research, communication, market intelligence, candidate engagement, and executive recruitment capabilities through ongoing learning.',
              },
              {
                title: 'Strategic Thinking',
                desc: 'Learn to understand business needs, leadership requirements, talent markets, and the factors that contribute to a successful executive appointment.',
              },
              {
                title: 'Integrity and Confidentiality',
                desc: 'Work with respect for privacy, responsible information handling, and the sensitive nature of executive recruitment.',
              },
              {
                title: 'Opportunity to Contribute',
                desc: 'Bring ideas, initiative, and professional judgment to a business focused on thoughtful, high-quality search services.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 bg-white border border-[#CBD5E1] rounded-sm space-y-2.5"
              >
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Principles That Guide Us & A Thoughtful Approach to Executive Search */}
      <section className="py-16 md:py-20 bg-white border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-16">
          <div className="space-y-8">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              The Principles That Guide Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Integrity',
                  desc: 'Communicate honestly, act responsibly, respect confidentiality, and do what is right for clients, candidates, and colleagues.',
                },
                {
                  title: 'Excellence',
                  desc: 'Approach every assignment with care, professional discipline, attention to detail, and a commitment to quality.',
                },
                {
                  title: 'People First',
                  desc: 'Recognize the individuals behind every CV, leadership appointment, organization, and career decision.',
                },
                {
                  title: 'Strategic Impact',
                  desc: 'Understand the wider business context so work supports thoughtful hiring decisions and long-term goals.',
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="p-6 bg-[#F8FAFC] border border-[#CBD5E1] rounded-sm space-y-2"
                >
                  <h3 className="font-editorial text-2xl font-semibold text-[#1E3A8A]">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#1E293B] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-[#CBD5E1] space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
                A Thoughtful Approach to Executive Search
              </h2>
              <a
                href="/expertise"
                onClick={(e) => handleLink(e, '/expertise')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline"
              >
                <span>Explore Our Executive Search Services</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: '01',
                  title: 'Understand',
                  desc: 'Learn about the organization, its culture, leadership requirements, and strategic objectives.',
                },
                {
                  num: '02',
                  title: 'Research',
                  desc: 'Identify relevant talent markets and potential candidates whose experience aligns with the assignment.',
                },
                {
                  num: '03',
                  title: 'Connect',
                  desc: 'Build professional relationships and engage suitable candidates with discretion and respect.',
                },
                {
                  num: '04',
                  title: 'Assess and Support',
                  desc: 'Help clients evaluate alignment between candidate experience, leadership expectations, and organizational needs.',
                },
              ].map((st) => (
                <div
                  key={st.num}
                  className="p-6 bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15]/30 rounded-sm space-y-2"
                >
                  <span className="font-mono-tabular text-xs text-[#FDE047]">{st.num}</span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#F8FAFC]">
                    {st.title}
                  </h3>
                  <p className="text-sm text-[#F8FAFC]/80 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* People, Perspectives, and Professional Growth (Clearly Identified Editorial Topics) */}
      <section className="py-16 md:py-20 bg-[#EFF6FF] border-b border-[#CBD5E1]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              Editorial Perspectives on Executive Search Consulting
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
              People, Perspectives, and Professional Growth
            </h2>
            <p className="text-sm text-[#475569]">
              Original editorial perspectives exploring the discipline of executive search, market research, and consultant development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREERS_EDITORIAL_TOPICS.map((topic) => (
              <article
                key={topic.id}
                className="p-6 bg-white border border-[#CBD5E1] rounded-sm space-y-2.5"
              >
                <p className="text-xs text-[#1E3A8A] font-medium">{topic.category}</p>
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                  {topic.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">{topic.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Career Opportunities & Dynamic Open Roles vs Honest "No Current Vacancies" State */}
      <section id="career-opportunities" className="py-16 md:py-24 max-w-[1000px] mx-auto px-6 space-y-10">
        <div className="space-y-4">
          <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#0A1633]">
            Explore Career Opportunities
          </h2>
          <p className="text-base text-[#1E293B] leading-relaxed">
            Interested in contributing to executive search, leadership recruitment, research, or client relationship development? Explore the opportunities available at Alexanders Career Strategy or introduce yourself for consideration when a suitable role becomes available.
          </p>

          {activeInternalOpenings.length === 0 ? (
            <div className="p-8 bg-white border border-[#FACC15] rounded-sm space-y-3">
              <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                No Current Vacancies
              </h3>
              <p className="text-sm md:text-base text-[#475569] leading-relaxed">
                We are not advertising any open positions at the moment. You may still submit an expression of interest, and we can consider your information if a relevant opportunity becomes available.
              </p>
              <a
                href="#register-career-interest"
                className="inline-block px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm transition-colors"
              >
                Register Your Interest
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {activeInternalOpenings.map((opening) => (
                <article
                  key={opening.id}
                  className="p-6 bg-white border border-[#FACC15] rounded-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569]">
                    <span className="font-semibold text-[#1E3A8A]">{opening.department}</span>
                    <span aria-hidden="true">·</span>
                    <span>{opening.location}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                    {opening.title}
                  </h3>
                  <p className="text-sm text-[#1E293B] leading-relaxed">{opening.summary}</p>
                  <a
                    href="#register-career-interest"
                    className="inline-block px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm transition-colors"
                  >
                    Apply / Register Interest for {opening.title}
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>

        <div id="register-career-interest">
          <CareerInterestForm onNavigate={onNavigate} />
        </div>
      </section>

      {/* Careers Closing CTA */}
      <section className="py-16 bg-[#0F2350] text-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-[#F8FAFC]">
              Your Next Chapter Could Start Here.
            </h2>
            <p className="text-sm md:text-base text-[#F8FAFC]/85 leading-relaxed">
              If you care about people, professional excellence, and the impact of effective leadership, we would welcome the opportunity to hear from you.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="#register-career-interest"
              className="px-6 py-3 text-sm font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm transition-colors"
            >
              Register Your Interest
            </a>
            <a
              href="/contact"
              onClick={(e) => handleLink(e, '/contact')}
              className="px-6 py-3 text-sm font-semibold text-[#F8FAFC] border border-[#FACC15] hover:bg-[#1E3A8A] rounded-sm transition-colors"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 4. INSIGHTS PAGE & FULL ARTICLE READER (Sections 11 & 19.8)
// ============================================================================
export const OurApproachArticlePage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-[#7DD3FC]/80">
      {/* Hero Banner with Full-Bleed Background Photograph */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#CA8A04] via-[#EAB308] to-[#38BDF8] text-[#082F49] py-16 md:py-20 border-b-2 border-[#082F49]">
        <img
          src="/src/assets/images/regenerated_image_1793299190928.jpg"
          alt="Our approach to executive search"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#CA8A04]/86 via-[#EAB308]/84 to-[#38BDF8]/86"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[960px] mx-auto px-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-[#FACC15] bg-[#082F49] hover:bg-[#0F2350] rounded-sm transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Home</span>
            </button>
            <span className="inline-block px-3 py-1 rounded-sm bg-[#082F49] text-[#7DD3FC] text-xs font-extrabold tracking-wider uppercase">
              Executive Search Philosophy &amp; Methodology
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-5xl font-bold text-[#082F49] leading-tight">
            Our Approach to Executive Search
          </h1>

          {/* Quick Section Jump Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {[
              { id: 'focused-search', label: 'Focused Search' },
              { id: 'targeted-talent-research', label: 'Targeted Talent Research' },
              { id: 'discreet-engagement', label: 'Discreet Engagement' },
              { id: 'personal-partnership', label: 'Personal Partnership' },
            ].map((pillar) => (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(pillar.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-2 text-xs font-extrabold text-[#082F49] bg-[#BAE6FD] hover:bg-[#FEF08A] border-2 border-[#082F49] rounded-sm transition-colors"
              >
                {pillar.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <article className="max-w-[960px] mx-auto px-6 py-12 md:py-16 space-y-10">
        <div className="p-8 md:p-12 bg-[#BAE6FD] border-2 border-[#082F49] rounded-sm shadow-lg space-y-10">
          <div className="border-b-2 border-[#082F49]/20 pb-6">
            <h2 className="font-editorial text-3xl md:text-4xl font-bold text-[#082F49]">
              Our Approach to Executive Search
            </h2>
          </div>

          {/* Section 1: Focused Search */}
          <section
            id="focused-search"
            className="p-6 md:p-8 bg-[#7DD3FC] border-2 border-[#082F49] rounded-sm space-y-4 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#082F49] text-[#FACC15] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#082F49]">
                Focused Search
              </h3>
            </div>
            <p className="text-base md:text-lg text-[#082F49] leading-relaxed font-medium">
              Every successful executive search begins with understanding the business, the position, and the people who will contribute to its success. We take time to learn about each client&apos;s objectives, organisational structure, company culture, and expectations for the role. This allows us to establish a clear candidate profile based on the experience, leadership qualities, and professional capabilities required. Rather than taking a one-size-fits-all approach, we tailor each search to the specific needs of the organisation, ensuring that our efforts remain focused on finding professionals who can make a meaningful contribution.
            </p>
          </section>

          {/* Section 2: Targeted Talent Research */}
          <section
            id="targeted-talent-research"
            className="p-6 md:p-8 bg-[#FACC15] border-2 border-[#082F49] rounded-sm space-y-4 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#082F49] text-[#7DD3FC] flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#082F49]">
                Targeted Talent Research
              </h3>
            </div>
            <p className="text-base md:text-lg text-[#082F49] leading-relaxed font-medium">
              Identifying exceptional talent requires more than reviewing incoming applications. We explore relevant industries, professional networks, career histories, and leadership backgrounds to identify individuals whose experience aligns with the opportunity. Our research considers both current responsibilities and previous achievements, helping us understand how a candidate&apos;s expertise may translate into a new environment. By looking beyond the immediately available talent pool, we can engage accomplished professionals who may not be actively considering a career move but could be interested in the right opportunity.
            </p>
          </section>

          {/* Section 3: Discreet Engagement */}
          <section
            id="discreet-engagement"
            className="p-6 md:p-8 bg-[#7DD3FC] border-2 border-[#082F49] rounded-sm space-y-4 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#082F49] text-[#FACC15] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#082F49]">
                Discreet Engagement
              </h3>
            </div>
            <p className="text-base md:text-lg text-[#082F49] leading-relaxed font-medium">
              Confidentiality is an important part of executive recruitment. Senior professionals may be managing significant responsibilities, leading teams, or considering their next career move privately. We approach these conversations with professionalism, respect, and careful communication. Each interaction is tailored to the individual, providing relevant information while allowing candidates to decide whether they wish to explore the opportunity further. We also recognise the importance of handling personal information responsibly and maintaining appropriate discretion throughout the search process. Our aim is to create an environment where both clients and candidates can communicate openly and confidently.
            </p>
          </section>

          {/* Section 4: Personal Partnership */}
          <section
            id="personal-partnership"
            className="p-6 md:p-8 bg-[#FACC15] border-2 border-[#082F49] rounded-sm space-y-4 scroll-mt-28"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#082F49] text-[#7DD3FC] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#082F49]">
                Personal Partnership
              </h3>
            </div>
            <p className="text-base md:text-lg text-[#082F49] leading-relaxed font-medium">
              We believe that effective executive search is built on strong relationships, clear communication, and a genuine understanding of people&apos;s ambitions. We work closely with clients to understand their priorities, discuss progress, and refine the search as requirements become clearer. At the same time, we listen to candidates to understand their experience, professional goals, and expectations for their next position. This balanced approach helps establish a more complete picture of suitability beyond qualifications and job titles alone. By maintaining a personal and considered approach, we seek to connect organisations with professionals who can support their long-term objectives while helping candidates identify opportunities that align with their capabilities and career aspirations.
            </p>
          </section>

          {/* Closing Summary Statement */}
          <div className="p-6 md:p-8 bg-[#082F49] text-[#FACC15] border-2 border-[#CA8A04] rounded-sm space-y-3">
            <p className="text-base md:text-lg leading-relaxed font-medium text-[#FEF08A]">
              At Alexanders Career Strategy, our approach combines focused research, thoughtful engagement, and individual attention at every stage. We recognise that leadership appointments can influence an organisation&apos;s direction, culture, and future performance. Our commitment is to approach each search with care, professionalism, and a clear understanding of what success means to both sides.
            </p>
          </div>
        </div>

        {/* Footer CTA Card */}
        <div className="p-8 bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#38BDF8] text-[#082F49] border-2 border-[#082F49] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-bold text-[#082F49]">
              Start a Conversation With Alexanders Career Strategy
            </h2>
            <p className="text-xs md:text-sm font-medium text-[#082F49]">
              Discuss an executive hiring requirement or introduce yourself as a candidate.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="/employers#enquiry-form"
              onClick={(e) => handleLink(e, '/employers#enquiry-form')}
              className="px-4 py-2.5 text-xs font-extrabold text-[#FACC15] bg-[#082F49] hover:bg-[#0F2350] rounded-sm transition-colors"
            >
              Discuss a Hiring Need
            </a>
            <a
              href="/candidates#cv-form"
              onClick={(e) => handleLink(e, '/candidates#cv-form')}
              className="px-4 py-2.5 text-xs font-extrabold text-[#082F49] bg-[#BAE6FD] hover:bg-[#7DD3FC] border-2 border-[#082F49] rounded-sm transition-colors"
            >
              Submit Your CV
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export const InsightsPage: React.FC<{
  selectedArticleSlug?: string;
  onNavigate: (path: string) => void;
}> = ({ selectedArticleSlug, onNavigate }) => {
  const { articles, getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/insights');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [includeDrafts, setIncludeDrafts] = useState(false);

  const statusFilteredArticles = includeDrafts
    ? articles
    : articles.filter((a) => a.status !== 'draft_review');

  const categories = ['All', ...Array.from(new Set(statusFilteredArticles.map((a) => a.category)))];

  // If the "Our Approach to Executive Search" article slug is selected, render its dedicated structured view
  if (selectedArticleSlug === 'our-approach-to-executive-search') {
    return <OurApproachArticlePage onNavigate={onNavigate} />;
  }

  // If a specific article slug is active, render the complete article body
  if (selectedArticleSlug) {
    const article = articles.find((a) => a.slug === selectedArticleSlug);
    if (!article) {
      return (
        <div className="max-w-[1000px] mx-auto px-6 py-20 space-y-6">
          <h1 className="font-editorial text-3xl font-semibold text-[#0A1633]">
            Article Not Found
          </h1>
          <button
            type="button"
            onClick={() => onNavigate('/insights')}
            className="px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] rounded-sm"
          >
            Back to Insights
          </button>
        </div>
      );
    }

    const related = statusFilteredArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

    return (
      <div className="bg-[#F8FAFC]/82">
        <section className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-16 border-b border-[#FACC15]/30">
          <img
            src={
              article.imagePath && !article.imagePath.endsWith('.svg')
                ? article.imagePath
                : '/src/assets/images/regenerated_image_1793299200419.jpg'
            }
            alt={article.imageAlt}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-[920px] mx-auto px-6 space-y-5">
            <button
              type="button"
              onClick={() => onNavigate('/insights')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FDE047] hover:text-[#F8FAFC]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to All Insights</span>
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#FDE047]">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
              {article.authorVerified && article.authorName && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>By {article.authorName}</span>
                </>
              )}
              {article.publishDateVerified && article.publishDate && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{article.publishDate}</span>
                </>
              )}
            </div>

            <h1 className="font-editorial text-3xl md:text-5xl font-semibold text-[#F8FAFC] leading-tight">
              {article.title}
            </h1>
          </div>
        </section>

        <article className="max-w-[920px] mx-auto px-6 py-12 space-y-8">
          <div className="aspect-[16/9] w-full max-h-[380px]">
            <EditorialImage
              src={article.imagePath}
              alt={article.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12 bg-white border border-[#CBD5E1] rounded-sm space-y-5">
            {article.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base md:text-lg text-[#1E293B] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article CTA */}
          <div className="p-8 bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15]/30 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl font-semibold text-[#F8FAFC]">
                Discuss Your Leadership Search or Career Strategy
              </h2>
              <p className="text-xs md:text-sm text-[#F8FAFC]/80">
                Connect with Alexanders Career Strategy to explore a tailored executive search or register your CV.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/employers#enquiry-form')}
                className="px-4 py-2.5 text-xs font-semibold text-[#0A1633] bg-[#FACC15] hover:bg-[#FDE047] rounded-sm"
              >
                Discuss a Hiring Need
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/candidates#cv-form')}
                className="px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] border border-[#FACC15] hover:bg-[#1E3A8A] rounded-sm"
              >
                Submit Your CV
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="pt-8 border-t border-[#CBD5E1] space-y-6">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Related Perspectives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.slug}
                  className="p-5 bg-white border border-[#CBD5E1] rounded-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <p className="text-xs text-[#1E3A8A]">{rel.category}</p>
                    <h3 className="font-editorial text-xl font-semibold text-[#0A1633]">
                      {rel.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/insights/${rel.slug}`)}
                    className="text-xs font-semibold text-[#1E3A8A] hover:underline self-start"
                  >
                    Read Full Article →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  const visibleArticles =
    selectedCategory === 'All'
      ? statusFilteredArticles
      : statusFilteredArticles.filter((a) => a.category === selectedCategory);

  return (
    <div className="bg-[#F8FAFC]/82">
      <section className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-16 md:py-24 border-b border-[#FACC15]/30">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : '/src/assets/images/regenerated_image_1793299200419.jpg'
          }
          alt="Editorial insights on executive search and leadership"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 space-y-5">
          <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
            {pageConfig?.heroKicker || 'Executive Search Perspectives & Editorial Hub'}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-semibold text-[#F8FAFC]">
            {pageConfig?.heroHeading || 'Insights'}
          </h1>
          <p className="text-base md:text-lg text-[#F8FAFC]/85 max-w-3xl leading-relaxed">
            {pageConfig?.heroText ||
              'The executive recruitment landscape continues to evolve as organizations respond to changing business priorities, emerging technologies, workforce expectations, and competition for experienced leadership talent. Our Insights section explores topics relevant to employers, executives, and professionals, including executive search strategies, leadership recruitment, candidate evaluation, talent mapping, and career development.'}
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 py-14 space-y-10">
        {/* Interactive Filter Tabs + Draft Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EFF6FF] border border-[#CBD5E1] rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1E3A8A] text-[#F8FAFC]'
                    : 'text-[#1E293B] hover:text-[#1E3A8A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-[#475569] cursor-pointer">
            <input
              type="checkbox"
              checked={includeDrafts}
              onChange={(e) => setIncludeDrafts(e.target.checked)}
              className="w-4 h-4 accent-[#1E3A8A]"
            />
            <span>Include Draft Review Articles</span>
          </label>
        </div>

        {/* Articles Grid + Complete Expandable / Reader Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-white border border-[#CBD5E1] hover:border-[#FACC15] rounded-sm overflow-hidden flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="aspect-[16/9] w-full max-h-[220px]">
                  <EditorialImage
                    src={art.imagePath}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#475569]">
                    <span className="text-[#1E3A8A] font-medium">{art.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readingTime}</span>
                    {art.status === 'draft_review' && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#FACC15] font-semibold">Draft Review</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-editorial text-2xl md:text-3xl font-semibold text-[#0A1633]">
                    <a
                      href={`/insights/${art.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/insights/${art.slug}`);
                      }}
                      className="hover:text-[#1E3A8A] transition-colors"
                    >
                      {art.title}
                    </a>
                  </h2>
                  <p className="text-sm text-[#475569] leading-relaxed">{art.excerpt}</p>

                  {/* Full Article Text Preview / Reader Block */}
                  <details className="pt-3 border-t border-[#EFF6FF] group">
                    <summary className="text-xs font-semibold text-[#1E3A8A] cursor-pointer hover:underline list-none inline-flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Read Complete Article Inline</span>
                    </summary>
                    <div className="mt-4 space-y-3 text-sm text-[#1E293B] leading-relaxed bg-[#F8FAFC] p-4 border border-[#CBD5E1] rounded-sm">
                      {art.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </details>
                </div>
              </div>

              <div className="px-7 py-4 bg-[#F8FAFC] border-t border-[#CBD5E1] flex items-center justify-between">
                <a
                  href={`/insights/${art.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/insights/${art.slug}`);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:text-[#0F2350]"
                >
                  <span>Open Dedicated Article View</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. CONTACT PAGE (Sections 12 & 19.9)
// ============================================================================
export const ContactPage: React.FC<PageNavProps> = ({ onNavigate }) => {
  const { getPageConfig } = useSiteContent();
  const pageConfig = getPageConfig('/contact');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="bg-[#F8FAFC]/82">
      {/* Contact Hero Banner with Full-Bleed Background Photograph */}
      <section className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-14 md:py-20 border-b border-[#FACC15]/30">
        <img
          src={
            pageConfig?.heroImage && !pageConfig.heroImage.endsWith('.svg')
              ? pageConfig.heroImage
              : '/src/assets/images/regenerated_image_1793298524657.jpg'
          }
          alt="Contact Alexanders Career Strategy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          {/* Breadcrumb: Home » Contact */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FDE047]"
          >
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="hover:underline underline-offset-4"
            >
              Home
            </a>
            <span aria-hidden="true">»</span>
            <span className="text-white">Contact</span>
          </nav>

          <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
            {pageConfig?.heroKicker ||
              'ALEXANDERS CAREER STRATEGY™ – EXECUTIVE SEARCH & RECRUITING CONSULTANTS'}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl font-semibold text-[#F8FAFC]">
            {pageConfig?.heroHeading || 'Contact Alexanders Career Strategy™'}
          </h1>
          <p className="text-base md:text-lg text-[#F8FAFC]/85 max-w-3xl leading-relaxed">
            {pageConfig?.heroText ||
              'Executive candidate search solutions and consultation from Alexanders Career Strategy™ allow enterprises, organizations, and senior leaders across the United States to make better, more successful executive hiring and career decisions.'}
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
        {/* Two Clearly Separated Pathways (Section 12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 bg-white border border-[#CBD5E1] rounded-sm space-y-4 shadow-sm">
            <p className="text-xs font-semibold tracking-wider text-[#0E6482]">
              Pathway 01 · For Employers &amp; Hiring Managers
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0A1633]">
              Tell us about the position you’re looking to fill.
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              For recruitment enquiries, include the position, industry, location, seniority, and key experience required. Proceed to our dedicated Employer Hiring Enquiry form.
            </p>
            <a
              href="/employers#enquiry-form"
              onClick={(e) => handleLink(e, '/employers#enquiry-form')}
              className="inline-block px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest text-white bg-[#0E6482] hover:bg-[#082F49] rounded-xs transition-colors"
            >
              Open Employer Enquiry Form
            </a>
          </div>

          <div className="p-6 sm:p-8 bg-white border border-[#CBD5E1] rounded-sm space-y-4 shadow-sm">
            <p className="text-xs font-semibold tracking-wider text-[#0E6482]">
              Pathway 02 · For Executive Candidates (Résumé Optional)
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0A1633]">
              Introduce yourself and your professional interests.
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              For candidate enquiries, provide your professional background, target roles, and optional private CV upload through our Candidate Registration workflow.
            </p>
            <a
              href="/candidates#cv-form"
              onClick={(e) => handleLink(e, '/candidates#cv-form')}
              className="inline-block px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#38BDF8] rounded-xs transition-colors"
            >
              Open Candidate Registration
            </a>
          </div>
        </div>

        {/* General Contact Form (Screenshots 3 & 4 Numbered Layout) + Team Contact Directory (No Visible Emails) */}
        <div id="direct-contact-form" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <GeneralContactForm onNavigate={onNavigate} />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15]/30 rounded-sm space-y-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#FDE047]">
                Executive Search Consultants
              </h3>
              <p className="text-xs text-[#F8FAFC]/80 leading-relaxed">
                All enquiries submitted through our contact forms are routed directly and confidentially to our senior search consultants:
              </p>
              <ul className="space-y-3 text-xs">
                <li className="border-b border-[#FACC15]/20 pb-2.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#F8FAFC]">Alexander Divine</p>
                    <p className="text-[11px] text-[#E0F2FE]/80">Executive Search &amp; Talent Strategy</p>
                  </div>
                  <a
                    href="#direct-contact-form"
                    onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                    className="px-2.5 py-1 text-[11px] font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] rounded-xs"
                  >
                    Message
                  </a>
                </li>
                <li className="border-b border-[#FACC15]/20 pb-2.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#F8FAFC]">Paul Alexander</p>
                    <p className="text-[11px] text-[#E0F2FE]/80">Recruitment Coordination &amp; Candidate Relations</p>
                  </div>
                  <a
                    href="#direct-contact-form"
                    onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                    className="px-2.5 py-1 text-[11px] font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] rounded-xs"
                  >
                    Message
                  </a>
                </li>
                <li className="border-b border-[#FACC15]/20 pb-2.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#F8FAFC]">Piers Fisher</p>
                    <p className="text-[11px] text-[#E0F2FE]/80">Talent Research &amp; Executive Search</p>
                  </div>
                  <a
                    href="#direct-contact-form"
                    onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                    className="px-2.5 py-1 text-[11px] font-bold text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] rounded-xs"
                  >
                    Message
                  </a>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#F8FAFC]">Fred Geerken</p>
                    <p className="text-[11px] text-[#E0F2FE]/80">Professional Networking &amp; Engagement</p>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/fred-g-geerken-2a92b25/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FDE047] font-semibold hover:underline"
                  >
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
              <div className="pt-2">
                <a
                  href="/team"
                  onClick={(e) => handleLink(e, '/team')}
                  className="text-xs font-semibold text-[#FDE047] hover:underline"
                >
                  View Full Meet Our Team Directory →
                </a>
              </div>
            </div>

            {/* U.S. Regional & State Coverage Card (Matches Screenshot 2 Sub-Links) */}
            <div
              id="us-regional-locations"
              className="p-6 bg-white border border-[#7DD3FC] rounded-sm space-y-3 shadow-xs"
            >
              <h3 className="font-editorial text-xl font-bold text-[#082F49]">
                U.S. Regional &amp; State Search Coverage
              </h3>
              <p id="us-states-cities" className="text-xs text-[#334155] leading-relaxed">
                Alexanders Career Strategy conducts executive and specialist searches across major U.S. commercial, clinical, financial, and technology hubs:
              </p>
              <ul className="grid grid-cols-2 gap-1.5 text-xs font-semibold text-[#0E6482]">
                <li>• Northeast &amp; Boston</li>
                <li>• New York Tri-State</li>
                <li>• Mid-Atlantic &amp; D.C.</li>
                <li>• Southeast &amp; Research Triangle</li>
                <li>• Midwest &amp; Chicago</li>
                <li>• Texas &amp; Southwest</li>
                <li>• California &amp; Bay Area</li>
                <li>• Pacific Northwest</li>
              </ul>
              <p id="global-search-locations" className="text-[11px] text-[#475569] pt-2 border-t border-[#E0F2FE]">
                Cross-border &amp; North American executive search mandates supported upon client consultation.
              </p>
            </div>
          </aside>
        </div>

        {/* Full Executive Value & Capabilities Arrangement (Inspired by RMA Contact & Value Architecture) */}
        <ExecutiveValueShowcase onNavigate={onNavigate} />
      </div>
    </div>
  );
};

// ============================================================================
// 6. PRIVACY POLICY & TERMS OF USE PAGES (Sections 19.10 & 19.11)
// ============================================================================
export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC]/82 py-16 md:py-24">
      <div className="max-w-[920px] mx-auto px-6 space-y-8">
        <div className="p-5 bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15] rounded-sm space-y-1">
          <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
            Legal Review Notice (Section 19.10 Content Framework)
          </p>
          <p className="text-xs text-[#F8FAFC]/85 leading-relaxed">
            Implementation requirement: This page provides the structured privacy framework for Alexanders Career Strategy. Before final commercial launch, confirm the firm’s actual legal identity, jurisdiction, configured service providers (Netlify, Supabase, Resend), contact details, data retention schedule, and applicable state/federal privacy laws.
          </p>
        </div>

        <article className="p-8 md:p-12 bg-white/95 border border-[#CBD5E1] rounded-sm space-y-6">
          <h1 className="font-editorial text-4xl font-semibold text-[#0A1633]">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
            Alexanders Career Strategy respects the privacy of individuals who visit our website, contact our team, submit an enquiry, or provide a CV for consideration. This Privacy Policy explains what personal information the website collects, why it is collected, how it is used, where it is stored, who may access it, how long it is retained, and how individuals can exercise applicable privacy rights.
          </p>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Information We May Collect
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              Depending on how you interact with the website, we may collect contact details, professional information, CVs, employment history, qualifications, recruitment preferences, enquiry messages, and other information you choose to provide. Technical information may also be processed where necessary to operate, protect, and maintain the website.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              How Information Is Used
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              Personal information may be used to respond to enquiries, administer recruitment assignments, review candidate submissions, communicate about relevant opportunities, maintain website security, and meet applicable legal obligations. Candidate information is only used for purposes described in the applicable privacy notice and permitted by law.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Storage and Security
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              CVs and recruitment submissions are stored using restricted security controls. Access is restricted to authorized personnel with a legitimate need to use the information. The website does not expose private CV files through publicly accessible storage URLs, and raw CV files are not attached to ordinary notification emails.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Sharing and Service Providers
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              Information may be processed by infrastructure and service providers required to operate the website, store submissions, or deliver email notifications (such as web hosting, private database/storage buckets, and transactional email services). Candidate profiles are shared with prospective hiring organizations only following appropriate notice and authorization as part of a recruitment process.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Retention and Individual Rights
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              Information is retained only as long as reasonably necessary to fulfill the recruitment or enquiry purpose for which it was submitted or to comply with applicable legal obligations. Individuals may contact us to request access to, correction of, or deletion of their submitted candidate or enquiry records.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Privacy Contact
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              To submit privacy-related questions or requests regarding your submitted information, please use our{' '}
              <a
                href="/contact#direct-contact-form"
                className="text-[#1E3A8A] underline font-semibold"
              >
                Direct Executive Contact Desk
              </a>{' '}
              on the Contact page.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC]/82 py-16 md:py-24">
      <div className="max-w-[920px] mx-auto px-6 space-y-8">
        <div className="p-5 bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15] rounded-sm space-y-1">
          <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
            Legal Review Notice (Section 19.11 Content Framework)
          </p>
          <p className="text-xs text-[#F8FAFC]/85 leading-relaxed">
            These Terms of Use must be reviewed and adapted to the actual business entity, applicable US state jurisdiction, and operating practices before final commercial publication.
          </p>
        </div>

        <article className="p-8 md:p-12 bg-white/95 border border-[#CBD5E1] rounded-sm space-y-6">
          <h1 className="font-editorial text-4xl font-semibold text-[#0A1633]">
            Website Terms of Use
          </h1>
          <p className="text-sm md:text-base text-[#1E293B] leading-relaxed">
            These Terms of Use govern access to and use of the Alexanders Career Strategy website. Visitors should read these terms before using the website or submitting information through its forms.
          </p>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Website Information
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              The website provides general information about the firm’s executive search and recruitment services. Information on the website should not be interpreted as a guarantee that a particular role, candidate, recruitment assignment, or employment opportunity is available.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Candidate Submissions &amp; Third-Party Listings
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              Submitting a CV does not guarantee an interview, an offer, employment, or inclusion in a particular recruitment process. Candidates are responsible for ensuring that information they submit is accurate and that they are authorized to share it. Where the website shares selected vacancies from third-party employers’ official career sites, the listed employer manages its own hiring process and candidates should apply directly via the official employer link.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Employer Enquiries
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              Submitting an employer enquiry does not automatically establish a recruitment engagement. The scope, deliverables, commercial terms, and other conditions of an assignment must be agreed separately between the relevant parties.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              Intellectual Property
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              The website’s original text, branding, visual materials, and other protected content should not be copied or used without appropriate authorization, except as permitted by applicable law.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#EFF6FF]">
            <h2 className="font-editorial text-2xl font-semibold text-[#0A1633]">
              External Services &amp; Links
            </h2>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              The website may rely on third-party hosting, storage, communication, or external career portals. Alexanders Career Strategy is not responsible for the availability, content, or privacy practices of external third-party websites.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

// ============================================================================
// 7. CUSTOM 404 PAGE
// ============================================================================
export const NotFoundPage: React.FC<PageNavProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8FAFC] py-24 px-6">
      <div className="max-w-xl mx-auto p-10 bg-white border border-[#CBD5E1] rounded-sm text-center space-y-5">
        <p className="font-mono-tabular text-xs font-semibold text-[#FACC15]">ERROR 404</p>
        <h1 className="font-editorial text-4xl font-semibold text-[#0A1633]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#475569] leading-relaxed">
          The page you requested could not be found. Use the links below to return to Alexanders Career Strategy.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] bg-[#1E3A8A] hover:bg-[#0F2350] rounded-sm"
          >
            Return to Homepage
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/jobs')}
            className="px-5 py-2.5 text-xs font-semibold text-[#1E3A8A] border border-[#1E3A8A] rounded-sm"
          >
            View Jobs &amp; Vacancies
          </button>
        </div>
      </div>
    </div>
  );
};
