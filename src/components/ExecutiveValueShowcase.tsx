import React from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  Globe,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

interface ExecutiveValueShowcaseProps {
  onNavigate: (path: string) => void;
}

const DISCOVERY_PILLARS = [
  {
    kicker: 'About Alexanders Career Strategy™',
    title: 'About Alexanders Career Strategy™, A Preferred Executive Search Partner',
    description:
      'Superior executive search, recruiting, and assessment solutions for leadership-focused organizations throughout the United States.',
    target: '/about',
  },
  {
    kicker: 'Contact Alexanders Career Strategy™',
    title: 'Contact Alexanders Career Strategy™ Executive Search',
    description:
      'Executive candidate search solutions and consultation from Alexanders Career Strategy™ allow enterprises and organizations to make better, more successful executive hiring decisions.',
    target: '/contact#direct-contact-form',
  },
  {
    kicker: 'Mission & Culture',
    title: 'Company Mission, Vision & Culture',
    description:
      'Discover how Alexanders Career Strategy™ fosters a culture that supports excellence and empowers our executive search consultants to provide superior services, value, and results.',
    target: '/about',
  },
  {
    kicker: 'FAQs',
    title: 'Frequently Asked Questions',
    description:
      'Gain an in-depth understanding of our capabilities, expertise, and solutions so you can begin your journey to making better, more informed executive hiring decisions.',
    target: '/candidates#candidate-faq',
  },
  {
    kicker: 'Search Philosophy',
    title: 'Executive Search & Recruiting Philosophy',
    description:
      'Learn about the philosophy that inspires us at Alexanders Career Strategy™ and how it translates into helping your organization make better, more informed executive hiring decisions.',
    target: '/our-approach-to-executive-search',
  },
  {
    kicker: 'Our Company',
    title: 'Preferred Executive Search & Recruiting Consultants',
    description:
      'Explore solutions to identify, attract, evaluate, recruit, and assess executive candidates. Access top talent nationwide and add value to your hiring process.',
    target: '/team',
  },
];

const CORE_SOLUTION_TRIAD = [
  {
    badge: 'Alexanders Career Strategy™ Executive Search',
    title: 'Empowered Talent Search Solutions',
    description:
      'Executive candidate search solutions and consultation from Alexanders Career Strategy™ allow enterprises and organizations to make better, more successful executive hiring decisions.',
    target: '/employers#services-grid',
    cta: 'Explore Search Solutions',
  },
  {
    badge: 'Alexanders Career Strategy™ Executive Recruiting',
    title: 'Qualitatively Better Executive Recruitment',
    description:
      'Alexanders Career Strategy™ utilizes a highly specialized and uniquely intelligent executive recruiting process to identify, attract, and recruit the most talented and well-qualified executive candidates for your key leadership roles.',
    target: '/employers#enquiry-form',
    cta: 'Recruit an Executive',
  },
  {
    badge: 'Alexanders Career Strategy™ Assessment & Evaluation',
    title: 'Find Better Leaders',
    description:
      'Executive assessment is at the core of what our team does. Find better leaders for your key leadership positions with our proven talent recruiting and evaluation solutions.',
    target: '/approach',
    cta: 'View Evaluation Process',
  },
];

const CATEGORIES_GRID = [
  {
    title: 'Role & Functional Expertise',
    description:
      'Management roles are your most essential strategic and operational leadership positions. We connect organizations with high-performing C-suite officers, VPs, and senior executive talent.',
    target: '/expertise',
  },
  {
    title: 'Industry Expertise',
    description:
      'Our executive search consultants specialize in focused areas of industry expertise across Healthcare, Biopharma, Medical Devices, Technology, Finance, and Manufacturing.',
    target: '/industries',
  },
  {
    title: 'Expertise',
    description:
      'Expertise in executive search and recruiting makes a difference in your success. Our unrivaled search discipline supports top outcomes for your key hiring projects.',
    target: '/expertise',
  },
  {
    title: 'Alexanders Career Strategy™ Home',
    description:
      'Our deep executive search and recruiting experience encompasses a wide range of industries, roles, and U.S. locations. Our leadership market expertise provides difference-making value.',
    target: '/',
  },
  {
    title: 'Insights & Perspectives',
    description:
      'News, articles, and insights that provide an inside look at the ideas driving executive search, succession planning, and leadership recruiting discussion.',
    target: '/insights',
  },
  {
    title: 'Clients (Employers & Candidates)',
    description:
      'We understand search and recruiting from both sides—we have solutions for organizations searching for talent and we support senior leaders exploring new roles.',
    target: '/employers',
  },
  {
    title: 'Locations',
    description:
      'From coast to coast, our executive search consultants are available to help your organization compete for the nation’s best executive talent across major U.S. hubs.',
    target: '/contact#us-regional-locations',
  },
  {
    title: 'Company',
    description:
      'Our executive recruitment specialists excel in understanding your company and matching you with leadership talent capable of best achieving your top hiring outcomes.',
    target: '/about',
  },
  {
    title: 'Value+ Advantage',
    description:
      'We are here to make your organization stronger. Our solutions are precisely designed to generate long-term value for an optimal return on your executive search investment.',
    target: '/our-approach-to-executive-search',
  },
  {
    title: 'Executive Assessment',
    description:
      'Executive assessment is at the core of what we do. We find better leaders for your key leadership positions with our structured competency evaluation methodology.',
    target: '/approach',
  },
  {
    title: 'Executive Recruiting',
    description:
      'Our unique approach to executive recruitment combines extensive candidate evaluation with a sophisticated research-based identification process to engage passive leaders.',
    target: '/employers#services-grid',
  },
  {
    title: 'Executive Search Consulting',
    description:
      'Executive candidate search consultation allows enterprises, middle-market companies, and emerging organizations to make more successful executive hiring decisions.',
    target: '/employers#enquiry-form',
  },
  {
    title: 'Solutions',
    description:
      'We utilize a process that is innovative, comprehensive, and precisely engineered to return best results—fine-tuning the executive hiring process at every phase.',
    target: '/approach',
  },
  {
    title: 'Organizational Expertise',
    description:
      'We partner with organizations of all types—enterprises, corporations, startups, institutions, and nonprofits—to deliver outstanding executive search solutions.',
    target: '/industries',
  },
];

const FEATURED_PERSPECTIVES = [
  {
    slug: 'when-hiring-an-executive-could-signal-your-companys-next-move',
    title: 'When Hiring an Executive Could Signal Your Company’s Next Move',
    excerpt:
      'Companies generally put considerable thought into when and how they announce major business decisions. Acquisitions, geographic expansion, new product development, restructuring, and changes in corporate strategy are often discussed privately for months before the information becomes public...',
  },
  {
    slug: 'when-a-successful-executive-is-no-longer-the-right-leader',
    title: 'When a Successful Executive Is No Longer the Right Leader',
    excerpt:
      'Replacing an executive who is underperforming is a relatively straightforward business decision, even when the process itself is difficult. Replacing an executive who has been successful presents a more nuanced leadership challenge as an organization scales...',
  },
  {
    slug: 'how-to-conduct-a-confidential-executive-search-in-a-small-or-close-knit-industry',
    title: 'How to Conduct a Confidential Executive Search in a Small or Close-Knit Industry',
    excerpt:
      'In specialized sectors where senior leaders know one another across conferences, boards, and regulatory circles, conducting a discreet executive search requires disciplined outreach and controlled information flow.',
  },
  {
    slug: 'replacing-an-executive-who-holds-critical-institutional-knowledge',
    title: 'Replacing an Executive Who Holds Critical Institutional Knowledge',
    excerpt:
      'When a long-tenured executive departs or prepares to retire, organizations must replace not only a functional title, but decades of unwritten client, operational, and technical relationships.',
  },
];

export const ExecutiveValueShowcase: React.FC<ExecutiveValueShowcaseProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* SECTION 1: How Alexanders Career Strategy Brings Added Value to Your Executive Hiring Project */}
      <section
        id="added-value-hiring-project"
        className="bg-white border border-[#7DD3FC] rounded-sm p-6 sm:p-10 md:p-12 shadow-sm space-y-8"
      >
        <div className="max-w-4xl space-y-3 border-b border-[#BAE6FD] pb-6">
          <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
            ALEXANDERS CAREER STRATEGY™ · VALUE+ EXECUTIVE SEARCH METHODOLOGY
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#082F49] leading-tight">
            How Alexanders Career Strategy™ Brings Added Value to Your Executive Hiring Project
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-5 text-sm sm:text-base text-[#1E293B] leading-relaxed">
            <p>
              With over 25+ years of combined executive search and leadership consulting standards,{' '}
              <strong className="text-[#082F49]">Alexanders Career Strategy™</strong> has earned a
              trusted reputation for bringing superb value and meaningful impact to executive hiring
              projects for essential executive leadership roles, including{' '}
              <strong className="text-[#082F49]">
                CEO, President, Board Member, and Senior Executive positions
              </strong>
              . We are excited to do the same for your company and we customize our solutions to fit
              your hiring project needs. Whether you are an enterprise, startup, small business,
              institution, nonprofit, or any other type of organization, we can help you make
              better, more confident hiring decisions for your most critical positions.
            </p>
            <p>
              The secret to our approach is understanding that every element within the executive
              search, recruiting, and assessment process can be optimized to return improved value.
              At Alexanders Career Strategy™, we are passionate about ensuring you gain a
              substantial return on your hiring investment. We deploy refined evaluation metrics and
              a unique search and recruiting methodology. Our team pre-screens all candidates and
              designs an intelligent, detailed, and customized career profile of their strategic
              leadership skills. This provides a powerful framework to accurately assess
              compatibility with role requirements.
            </p>
            <p>
              However, role compatibility is just the beginning. Our team additionally assesses the
              competencies and proficiencies of executive candidates, which enables us to optimize
              candidate matches for suitable cultural fit, appropriate motivation by both your role
              and company, and capability to accomplish top outcomes. This uniquely powerful process
              is a key advantage that Alexanders Career Strategy™ provides compared to traditional
              executive search and recruiting firms.
            </p>
            <p className="font-semibold text-[#082F49]">
              Alexanders Career Strategy™ is never satisfied with business as usual. Our approach is
              dynamic and resource-rich: we effectively combine the research scale and methodology
              of a national executive recruiting leader with the personalized focus and involvement
              of a boutique agency. That’s a level of attention and personalized service that other
              firms simply fail to match.
            </p>
          </div>

          {/* Right Highlight Callout Box */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#E0F2FE] via-[#FFFFFF] to-[#FEF08A] border-2 border-[#082F49] rounded-sm p-6 space-y-5 shadow-md">
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                Empowered Talent Search Solutions
              </p>
              <h3 className="font-editorial text-2xl font-bold text-[#082F49] leading-snug">
                Alexanders Career Strategy™ – Best Candidates, Optimal Value
              </h3>
              <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                Executive candidate search solutions and consultation from Alexanders Career
                Strategy™ allow enterprises and organizations to make better, more successful
                executive hiring decisions.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href="/employers"
                onClick={(e) => handleLink(e, '/employers')}
                className="w-full py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs flex items-center justify-between transition-colors"
              >
                <span>Executive Search™</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/employers#services-grid"
                onClick={(e) => handleLink(e, '/employers#services-grid')}
                className="w-full py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-white hover:bg-[#E0F2FE] border border-[#082F49] rounded-xs flex items-center justify-between transition-colors"
              >
                <span>Executive Recruiting™</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/contact#direct-contact-form"
                onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                className="w-full py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-white bg-[#082F49] hover:bg-[#0369A1] rounded-xs flex items-center justify-between transition-colors"
              >
                <span>Email Us Today</span>
                <ArrowRight className="w-4 h-4 text-[#FEF08A]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* 6 Discovery Cards (About, Contact, Mission & Culture, FAQs, Search Philosophy, Company) */}
        <div className="pt-8 border-t border-[#BAE6FD]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCOVERY_PILLARS.map((card) => (
              <a
                key={card.title}
                href={card.target}
                onClick={(e) => handleLink(e, card.target)}
                className="group p-6 bg-[#F8FAFC] hover:bg-white border border-[#7DD3FC] hover:border-[#082F49] rounded-sm flex flex-col justify-between space-y-4 transition-all hover:shadow-md"
              >
                <div className="space-y-2">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                    {card.kicker}
                  </p>
                  <h3 className="font-editorial text-xl font-bold text-[#082F49] group-hover:text-[#0369A1] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#082F49] group-hover:text-[#0369A1]">
                  <span>Open Section</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Empowered Talent Search Solutions Triad & Executive Roles / Industries / Organizations */}
      <section className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CORE_SOLUTION_TRIAD.map((pillar) => (
            <div
              key={pillar.title}
              className="p-7 bg-white border-2 border-[#082F49] rounded-sm flex flex-col justify-between space-y-5 shadow-sm"
            >
              <div className="space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                  {pillar.badge}
                </p>
                <h3 className="font-editorial text-2xl font-bold text-[#082F49]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">{pillar.description}</p>
              </div>
              <a
                href={pillar.target}
                onClick={(e) => handleLink(e, pillar.target)}
                className="inline-flex items-center justify-between px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs transition-colors"
              >
                <span>{pillar.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

        {/* Roles & Positions | Industries & Sectors | Businesses & Organizations */}
        <div className="bg-white border border-[#7DD3FC] rounded-sm p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/expertise"
              onClick={(e) => handleLink(e, '/expertise')}
              className="group p-6 bg-[#E0F2FE]/60 hover:bg-[#FEF9C3] border border-[#38BDF8] rounded-sm space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                  Roles &amp; Positions
                </span>
                <Briefcase className="w-4 h-4 text-[#082F49]" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#082F49] group-hover:underline">
                Executive Roles &amp; Positions
              </h3>
            </a>

            <a
              href="/industries"
              onClick={(e) => handleLink(e, '/industries')}
              className="group p-6 bg-[#E0F2FE]/60 hover:bg-[#FEF9C3] border border-[#38BDF8] rounded-sm space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                  Industries &amp; Sectors
                </span>
                <Layers className="w-4 h-4 text-[#082F49]" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#082F49] group-hover:underline">
                A Leader for Industry Expertise
              </h3>
            </a>

            <a
              href="/employers"
              onClick={(e) => handleLink(e, '/employers')}
              className="group p-6 bg-[#E0F2FE]/60 hover:bg-[#FEF9C3] border border-[#38BDF8] rounded-sm space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                  Businesses &amp; Organizations
                </span>
                <Building2 className="w-4 h-4 text-[#082F49]" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#082F49] group-hover:underline">
                Organizational Search Expertise
              </h3>
            </a>
          </div>

          <div className="p-6 bg-[#F8FAFC] border border-[#7DD3FC] rounded-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <p className="text-sm sm:text-base text-[#1E293B] leading-relaxed max-w-4xl">
              <strong className="text-[#082F49]">Executive Management Roles</strong> are your most
              essential strategic and operational leadership positions. Alexanders Career Strategy™
              has a proven reputation for connecting organizations with high-performing officers,
              board members, and other senior executive talent who represent the highest tier of
              leaders in their sector. For more information, please visit the{' '}
              <a
                href="/expertise"
                onClick={(e) => handleLink(e, '/expertise')}
                className="font-bold text-[#0369A1] underline underline-offset-4 hover:text-[#082F49]"
              >
                Role &amp; Functional Expertise
              </a>{' '}
              section.
            </p>
            <a
              href="/expertise"
              onClick={(e) => handleLink(e, '/expertise')}
              className="px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs whitespace-nowrap shrink-0"
            >
              Executive Roles &amp; Positions →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: Executive Search & Recruiting Solutions that Connect Organizations and Candidates */}
      <section className="bg-gradient-to-r from-[#082F49] via-[#0F2350] to-[#1E3A8A] text-white border-2 border-[#FEF08A] rounded-sm p-6 sm:p-10 md:p-12 space-y-8 shadow-lg">
        <div className="max-w-4xl space-y-3">
          <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#FEF08A]">
            ALEXANDERS CAREER STRATEGY™ · CONNECTING ORGANIZATIONS &amp; LEADERS
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white leading-tight">
            Executive Search &amp; Recruiting Solutions that Connect Organizations and Candidates
          </h2>
          <p className="text-sm sm:text-base text-[#E0F2FE] leading-relaxed">
            Whether your organization is an enterprise, billion-dollar corporation, small business,
            startup, government agency, nonprofit, or other type of company, at Alexanders Career
            Strategy™ we have one mission in mind: connect you with the leadership talent you need
            to achieve your most critical executive hiring goals.
          </p>
        </div>

        {/* Actionable Solution Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            { label: 'Search for an Executive', target: '/employers#enquiry-form' },
            { label: 'Recruit an Executive', target: '/employers#services-grid' },
            { label: 'Assess an Executive', target: '/approach' },
            { label: 'Industry Experience', target: '/industries' },
            { label: 'Executive Positions We Fill', target: '/expertise' },
            { label: 'Organizations We Work With', target: '/employers' },
            { label: 'Executive Search Consulting', target: '/our-approach-to-executive-search' },
            { label: 'Solutions', target: '/employers' },
            { label: 'Email Us Today', target: '/contact#direct-contact-form' },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.target}
              onClick={(e) => handleLink(e, btn.target)}
              className="px-5 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-white border border-[#7DD3FC] rounded-xs flex items-center justify-between transition-all shadow-xs"
            >
              <span>{btn.label}</span>
              <ArrowRight className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-white/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h3 className="font-editorial text-2xl font-bold text-[#FEF08A]">
              Alexanders Career Strategy™ Executive Search Consulting
            </h3>
            <p className="text-sm text-[#E0F2FE] leading-relaxed">
              Alexanders Career Strategy™ specializes in providing exceptional executive search and
              executive recruiting solutions throughout a variety of industries and U.S. locations.
              We provide an unmatched level of expertise and performance to clients that require
              high-caliber capabilities and unique sector knowledge to fill key leadership roles.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <a
              href="/employers"
              onClick={(e) => handleLink(e, '/employers')}
              className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-white hover:bg-[#FEF08A] rounded-xs transition-colors"
            >
              Solutions
            </a>
            <a
              href="/contact#direct-contact-form"
              onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
              className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] rounded-xs transition-colors"
            >
              Email Us Today
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: Our Talent Search Approach & The Art of Executive Search */}
      <section className="bg-white border border-[#7DD3FC] rounded-sm p-6 sm:p-10 md:p-12 space-y-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
              ALEXANDERS CAREER STRATEGY™ – OUR TALENT SEARCH APPROACH
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#082F49] leading-tight">
              The Art of Executive Search™: Unparalleled Excellence, Superior Results
            </h2>
            <p className="text-sm sm:text-base text-[#1E293B] leading-relaxed">
              The Alexanders Career Strategy™ approach is highly organized, resource-rich, and
              proven by successful hiring outcomes. It provides your organization with a deep,
              uniquely valuable understanding of the capabilities needed from your ideal executive
              candidate.
            </p>
            <p className="text-sm sm:text-base text-[#1E293B] leading-relaxed">
              We have innovated an intelligent, comprehensive search and recruiting methodology that
              incorporates your position requirements, business objectives, and company culture into
              a uniquely powerful executive search and assessment process. Our primary focus is
              filling key executive leadership roles within your organization that are strategically
              critical, difficult to recruit suitable talent for, and essential to enhance the
              overall value, growth, and development of your company.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 bg-[#F8FAFC] border-2 border-[#082F49] rounded-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>Value+ Commitment to Excellence</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#082F49]">
              Delivered With World-Class Service &amp; Professionalism
            </h3>
            <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
              <strong className="text-[#082F49]">Commitment to Value:</strong> Alexanders Career
              Strategy™ provides an unmatched level of value for executive search and executive
              recruitment projects. Our team provides highly specialized solutions, innovative
              research tools, rapid on-schedule performance, agile responsiveness, and an
              extraordinary level of concierge-level attentiveness.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/contact#direct-contact-form"
                onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs transition-colors"
              >
                Email Us Today
              </a>
              <a
                href="/employers#enquiry-form"
                onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white bg-[#082F49] hover:bg-[#0369A1] rounded-xs transition-colors"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillar Highlights: Solutions, Expertise, Locations, Value+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4 border-t border-[#BAE6FD]">
          {[
            {
              kicker: 'Solutions',
              title: 'Superior Solutions',
              desc: 'Our executive hiring professionals are uniquely qualified to provide outstanding value to your executive talent search, recruiting, and assessment process.',
              target: '/employers',
            },
            {
              kicker: 'Expertise',
              title: 'Superior Executive Search Expertise',
              desc: 'Expertise in executive search and recruiting makes a difference in your success. Our specialized expertise supports top outcomes for your key hiring projects.',
              target: '/expertise',
            },
            {
              kicker: 'Locations',
              title: 'Executive Search Firm Locations',
              desc: 'Alexanders Career Strategy™ specializes in executive search, recruiting, and assessment solutions to employers across the United States for critical industries.',
              target: '/contact#us-regional-locations',
            },
            {
              kicker: 'Value+',
              title: 'Concierge-Level Attentiveness',
              desc: 'Highly specialized solutions, original talent mapping, rapid performance, agile responsiveness, and dedicated partner accountability.',
              target: '/approach',
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.target}
              onClick={(e) => handleLink(e, item.target)}
              className="group p-5 bg-[#F8FAFC] border border-[#7DD3FC] hover:border-[#082F49] rounded-sm space-y-2 transition-all"
            >
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                {item.kicker}
              </p>
              <h4 className="font-editorial text-xl font-bold text-[#082F49] group-hover:text-[#0369A1]">
                {item.title}
              </h4>
              <p className="text-xs text-[#334155] leading-relaxed">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 5: Comprehensive Categories Grid (14 Interactive Cards with "Learn More") */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
            ALEXANDERS CAREER STRATEGY™ CATEGORIES &amp; CAPABILITIES
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#082F49]">
            Explore Our Executive Search, Recruiting &amp; Assessment Capabilities
          </h2>
          <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
            Alexanders Career Strategy™ specializes in providing exceptional executive search,
            executive recruiting, and executive assessment solutions throughout a variety of
            industries and U.S. locations. Click any category below to load the full section.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_GRID.map((cat) => (
            <div
              key={cat.title}
              className="p-6 bg-white border border-[#7DD3FC] hover:border-[#082F49] rounded-sm flex flex-col justify-between space-y-4 shadow-xs transition-all hover:shadow-md"
            >
              <div className="space-y-2">
                <h3 className="font-editorial text-2xl font-bold text-[#082F49]">{cat.title}</h3>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div>
                <a
                  href={cat.target}
                  onClick={(e) => handleLink(e, cat.target)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Business Leadership Insights & Executive Management Perspectives Portal */}
      <section className="bg-white border border-[#7DD3FC] rounded-sm p-6 sm:p-10 md:p-12 space-y-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#BAE6FD] pb-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
              ALEXANDERS CAREER STRATEGY™ INSIGHTS PORTAL
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#082F49]">
              Business Leadership Insights &amp; Executive Management Perspectives
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Our Insights portal communicates business leadership insights, executive management
              perspectives, and industry analysis to our client employers and the executive
              candidates we work with.
            </p>
          </div>
          <a
            href="/insights"
            onClick={(e) => handleLink(e, '/insights')}
            className="px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] border border-[#082F49] rounded-xs whitespace-nowrap self-start lg:self-auto"
          >
            View All Articles →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_PERSPECTIVES.map((article) => (
            <article
              key={article.slug}
              className="p-6 bg-[#F8FAFC] border border-[#7DD3FC] hover:border-[#082F49] rounded-sm flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0369A1]">
                  Executive Management Perspective
                </p>
                <h3 className="font-editorial text-2xl font-bold text-[#082F49]">
                  <a
                    href={`/insights/${article.slug}`}
                    onClick={(e) => handleLink(e, `/insights/${article.slug}`)}
                    className="hover:text-[#0369A1] transition-colors"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              <div>
                <a
                  href={`/insights/${article.slug}`}
                  onClick={(e) => handleLink(e, `/insights/${article.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0369A1] hover:text-[#082F49] underline underline-offset-4"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
