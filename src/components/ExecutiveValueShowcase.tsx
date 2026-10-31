import React from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Layers,
} from 'lucide-react';

interface ExecutiveValueShowcaseProps {
  onNavigate: (path: string) => void;
}

const EXEC_PHOTOS = [
  '/src/assets/images/regenerated_image_1793268848419.jpg',
  '/src/assets/images/regenerated_image_1793294161466.jpg',
  '/src/assets/images/regenerated_image_1793298524657.jpg',
  '/src/assets/images/regenerated_image_1793299190928.jpg',
  '/src/assets/images/regenerated_image_1793299200419.jpg',
];

const DISCOVERY_PILLARS = [
  {
    kicker: 'About Alexanders™',
    title: 'About Alexanders™, A Preferred Executive Search Partner',
    description:
      '25+ years of superior executive search, recruiting, and assessment solutions for leadership-focused organizations throughout the United States and the world.',
    target: '/about',
  },
  {
    kicker: 'Contact Alexanders™',
    title: 'Contact Alexanders Executive Search™',
    description:
      'Executive candidate search solutions and consultation from Alexanders™ allow enterprises and organizations to make better, more successful executive hiring decisions.',
    target: '/contact#direct-contact-form',
  },
  {
    kicker: 'Mission & Culture',
    title: 'Alexanders™ Company Mission, Vision & Culture',
    description:
      'Discover how Alexanders™ fosters a culture that supports excellence and empowers our executive search consultants to provide superior services, value, and results.',
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
    title: 'Alexanders™ Executive Search & Recruiting Philosophy',
    description:
      'Learn about the philosophy that inspires us at Alexanders™ and how it translates into helping your organization make better, more informed executive hiring decisions.',
    target: '/our-approach-to-executive-search',
  },
  {
    kicker: 'Alexanders Company',
    title: 'Alexanders™ – Preferred Executive Search & Recruiting Consultants',
    description:
      'Explore solutions to identify, attract, evaluate, recruit, and assess executive candidates. Access top talent worldwide and add value to your hiring process.',
    target: '/team',
  },
];

const CORE_SOLUTION_TRIAD = [
  {
    badge: 'Alexanders Executive Search™',
    title: 'Empowered Talent Search Solutions',
    description:
      'Executive candidate search solutions and consultation from Alexanders™ allow enterprises and organizations to make better, more successful executive hiring decisions.',
    target: '/employers#services-grid',
    cta: 'Alexanders Executive Search™',
    image: EXEC_PHOTOS[0],
  },
  {
    badge: 'Alexanders Executive Recruiting™',
    title: 'Qualitatively Better Executive Recruitment',
    description:
      'Alexanders™ utilizes a highly specialized and uniquely intelligent executive recruiting process to identify, attract, and recruit the most talented and well-qualified executive candidates for your key leadership roles.',
    target: '/employers#enquiry-form',
    cta: 'Alexanders Executive Recruiting™',
    image: EXEC_PHOTOS[1],
  },
  {
    badge: 'Alexanders™ Executive Assessment & Evaluation',
    title: 'Find Better Leaders',
    description:
      'Executive assessment is at the core of what our team does. Find better leaders for your key leadership positions with our proven talent recruiting and evaluation solutions.',
    target: '/approach',
    cta: 'Executive Assessment & Evaluation',
    image: EXEC_PHOTOS[2],
  },
];

const EXPERTISE_TRIAD = [
  {
    badge: 'Roles & Positions',
    title: 'Executive Roles & Positions',
    description:
      'Executive Management Roles are your most essential strategic and operational leadership positions. Alexanders™ has a 25+ year reputation for connecting organizations with high-performing officers, board members, and senior executive talent.',
    target: '/expertise',
    cta: 'Executive Roles & Positions',
    image: EXEC_PHOTOS[3],
    icon: Briefcase,
  },
  {
    badge: 'Industries & Sectors',
    title: 'A Leader for Industry Expertise',
    description:
      'Our executive search consultants specialize in focused areas of industry expertise across Healthcare, Biopharma, Medical Devices, Technology, Finance, and Advanced Manufacturing.',
    target: '/industries',
    cta: 'Industries & Sectors',
    image: EXEC_PHOTOS[4],
    icon: Layers,
  },
  {
    badge: 'Businesses & Organizations',
    title: 'Organizational Search Expertise',
    description:
      'We partner with organizations of all types—enterprises, global corporations, startups, institutions, private equity portfolios, and nonprofits—to deliver outstanding executive search solutions.',
    target: '/employers',
    cta: 'Businesses & Organizations',
    image: EXEC_PHOTOS[0],
    icon: Building2,
  },
];

const DETAILED_SOLUTIONS_SHOWCASE = [
  {
    title: 'Alexanders™ Executive Search Consulting',
    description:
      'Alexanders™ specializes in providing exceptional executive search and executive recruiting solutions throughout a variety of industries and locations. We provide an unmatched level of expertise and performance to clients that require high-caliber capabilities and unique knowledge to fill key leadership roles.',
    primaryLabel: 'Solutions',
    primaryTarget: '/employers',
    secondaryLabel: 'Email Us Today',
    secondaryTarget: '/contact#direct-contact-form',
  },
  {
    title: 'Alexanders™ Executive Recruiting',
    description:
      'Our unique approach to executive recruitment combines an extensive candidate evaluation process with a sophisticated research-based candidate identification process. This enables our team to identify, attract, and recruit the most talented and well-qualified executive candidates for your key leadership positions.',
    primaryLabel: 'Recruit an Executive',
    primaryTarget: '/employers#services-grid',
    secondaryLabel: 'Email Us Today',
    secondaryTarget: '/contact#direct-contact-form',
  },
  {
    title: 'Alexanders™ Executive Assessment',
    description:
      'Executive assessment is at the core of what we do. Find better leaders for your key leadership positions with our proven talent recruiting and evaluation solutions, assessing strategic leadership skills, cultural fit, and long-term performance.',
    primaryLabel: 'Assess an Executive',
    primaryTarget: '/approach',
    secondaryLabel: 'Email Us Today',
    secondaryTarget: '/contact#direct-contact-form',
  },
  {
    title: 'Industry Expertise',
    description:
      'Our executive search consultants specialize in focused areas of industry expertise. This provides our clients with a distinct advantage when identifying, attracting, evaluating, and recruiting top leadership talent within competitive sectors.',
    primaryLabel: 'Industry Experience',
    primaryTarget: '/industries',
    secondaryLabel: 'Email Us Today',
    secondaryTarget: '/contact#direct-contact-form',
  },
  {
    title: 'Role & Functional Expertise',
    description:
      'Management roles are your most essential strategic and operational leadership positions. Alexanders™ has a proven reputation for connecting organizations with high-performing C-suite officers, board members, and senior functional heads.',
    primaryLabel: 'Executive Positions We Fill',
    primaryTarget: '/expertise',
    secondaryLabel: 'Email Us Today',
    secondaryTarget: '/contact#direct-contact-form',
  },
  {
    title: 'Organizational Expertise',
    description:
      'Whether you are an enterprise, startup, small business, institution, nonprofit, or private equity portfolio company, we customize our executive search solutions to fit your organization’s structure, governance, and growth stage.',
    primaryLabel: 'Organizations We Work With',
    primaryTarget: '/employers',
    secondaryLabel: 'Email Us Today',
    secondaryTarget: '/contact#direct-contact-form',
  },
];

const CATEGORIES_GRID = [
  {
    title: 'Role & Functional Expertise',
    description:
      'Management roles are your most essential strategic and operational leadership positions. Alexanders™ has a 25+ year reputation for connecting organizations with high-performing officers, board members, and other senior executive talent.',
    target: '/expertise',
    image: EXEC_PHOTOS[0],
  },
  {
    title: 'Industry Expertise',
    description:
      'Our executive search consultants specialize in focused areas of industry expertise. This provides our clients with a distinct advantage when identifying, attracting, evaluating, and recruiting top leadership talent.',
    target: '/industries',
    image: EXEC_PHOTOS[1],
  },
  {
    title: 'Expertise',
    description:
      'Expertise in executive search and recruiting makes a difference in your success. Our unrivaled expertise supports top outcomes for your key hiring projects.',
    target: '/expertise',
    image: EXEC_PHOTOS[2],
  },
  {
    title: 'Alexanders™ Home',
    description:
      'Our deep executive search and recruiting experience encompasses a wide range of industries, roles, and locations. Our leadership marketplace expertise provides difference-making value.',
    target: '/',
    image: EXEC_PHOTOS[3],
  },
  {
    title: 'Alexanders Insights™',
    description:
      'News, articles, and insights from Alexanders™ that provide an inside look at the ideas driving the executive search and recruiting discussion.',
    target: '/insights',
    image: EXEC_PHOTOS[4],
  },
  {
    title: 'Clients',
    description:
      'At Alexanders™, we understand search and recruiting from both sides – we have solutions for organizations searching for talent and we support executives exploring new roles.',
    target: '/employers',
    image: EXEC_PHOTOS[0],
  },
  {
    title: 'Locations',
    description:
      'From coast to coast, and throughout the world, our executive search consultants are available to help your organization compete for the world’s best executive talent.',
    target: '/contact#us-regional-locations',
    image: EXEC_PHOTOS[1],
  },
  {
    title: 'Company',
    description:
      'Our executive recruitment specialists excel in understanding your company and matching you with leadership talent capable of best achieving your top hiring outcomes.',
    target: '/about',
    image: EXEC_PHOTOS[2],
  },
  {
    title: 'Alexanders™ Value+',
    description:
      'At Alexanders™, we’re here to make your organization stronger. Our solutions are precisely designed to generate long-term value for an optimal return on your executive search investment.',
    target: '/our-approach-to-executive-search',
    image: EXEC_PHOTOS[3],
  },
  {
    title: 'Executive Assessment',
    description:
      'Executive assessment is at the core of what we do. Find better leaders for your key leadership positions with our proven talent recruiting and evaluation solutions.',
    target: '/approach',
    image: EXEC_PHOTOS[4],
  },
  {
    title: 'Executive Recruiting',
    description:
      'Our unique approach to executive recruitment combines an extensive candidate evaluation process with a sophisticated research-based candidate identification process.',
    target: '/employers#services-grid',
    image: EXEC_PHOTOS[0],
  },
  {
    title: 'Executive Search Consulting',
    description:
      'Executive candidate search solutions and consultation from Alexanders™ allow enterprises and organizations to make better, more successful executive hiring decisions.',
    target: '/employers#enquiry-form',
    image: EXEC_PHOTOS[1],
  },
  {
    title: 'Solutions',
    description:
      'At Alexanders™, we utilize a process that is innovative, comprehensive, and precisely engineered to return best results. We fine-tune the executive hiring process at every phase.',
    target: '/approach',
    image: EXEC_PHOTOS[2],
  },
  {
    title: 'Organizational Expertise',
    description:
      'We partner with organizations of all types – enterprises, corporations, startups, institutions, and nonprofits – to deliver outstanding executive search solutions.',
    target: '/industries',
    image: EXEC_PHOTOS[3],
  },
];

const FEATURED_PERSPECTIVES = [
  {
    slug: 'when-hiring-an-executive-could-signal-your-companys-next-move',
    title: 'When Hiring an Executive Could Signal Your Company’s Next Move',
    image: EXEC_PHOTOS[0],
    excerpt:
      'Companies generally put considerable thought into when and how they announce major business decisions. Acquisitions, geographic expansion, new product development, restructuring, and changes in corporate strategy are often discussed privately for months before the information becomes public...',
  },
  {
    slug: 'when-a-successful-executive-is-no-longer-the-right-leader',
    title: 'When a Successful Executive Is No Longer the Right Leader',
    image: EXEC_PHOTOS[1],
    excerpt:
      'Replacing an executive who is underperforming is a relatively straightforward business decision, even when the process itself is difficult. Replacing an executive who has been successful presents a more nuanced leadership challenge as an organization scales...',
  },
  {
    slug: 'how-to-conduct-a-confidential-executive-search-in-a-small-or-close-knit-industry',
    title: 'How to Conduct a Confidential Executive Search in a Small or Close-Knit Industry',
    image: EXEC_PHOTOS[2],
    excerpt:
      'In specialized sectors where senior leaders know one another across conferences, boards, and regulatory circles, conducting a discreet executive search requires disciplined outreach and controlled information flow.',
  },
  {
    slug: 'replacing-an-executive-who-holds-critical-institutional-knowledge',
    title: 'Replacing an Executive Who Holds Critical Institutional Knowledge',
    image: EXEC_PHOTOS[3],
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
    <div className="space-y-16 md:space-y-20">
      {/* =================================================================== */}
      {/* FULL-BLEED PHOTO BANNER 1: Contact Alexanders Executive Search™      */}
      {/* Matches the dark-overlay banner right below the form on RMA /contact */}
      {/* =================================================================== */}
      <section className="relative overflow-hidden rounded-xs border border-[#1E3A8A] bg-[#0B1633] text-white shadow-lg">
        <img
          src={EXEC_PHOTOS[2]}
          alt="Contact Alexanders Executive Search Empowered Talent Search Solutions"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#09142E]/92 via-[#0B1D42]/88 to-[#0E3158]/86"
          aria-hidden="true"
        />
        <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-5xl mx-auto text-center space-y-6">
          <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#7DD3FC]">
            Contact Alexanders Executive Search™
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Empowered Talent Search Solutions
          </h2>
          <div className="w-24 h-[2px] bg-[#136382] mx-auto" aria-hidden="true" />
          <div className="space-y-4 text-sm sm:text-base text-[#E2E8F0] leading-relaxed max-w-4xl mx-auto">
            <p>
              Executive candidate search solutions and consultation from Alexanders Career Strategy™
              allow enterprises and organizations to make better, more successful executive hiring
              decisions.
            </p>
            <p>
              Our approach to executive recruitment is unique. We combine an extensive,
              resource-rich candidate evaluation process with a sophisticated research-based
              candidate identification methodology. This enables our team to identify, attract, and
              recruit the most talented and well-qualified executive candidates for your key
              leadership positions.
            </p>
            <p>
              Whether your organization is an enterprise, billion-dollar corporation, small
              business, startup, government agency, nonprofit, or other type of company, at
              Alexanders Career Strategy™ we have one mission in mind: connect you with the
              leadership talent you need to achieve your most critical executive hiring goals.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="/contact#direct-contact-form"
              onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white bg-[#136382] hover:bg-[#0E4B63] transition-colors"
            >
              Email Us Today
            </a>
            <a
              href="/employers#enquiry-form"
              onClick={(e) => handleLink(e, '/employers#enquiry-form')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white border border-white/80 hover:bg-white hover:text-[#0B1633] transition-colors"
            >
              Schedule A Consultation
            </a>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 1: How Alexanders Brings Added Value + 6 Discovery Cards    */}
      {/* =================================================================== */}
      <section
        id="added-value-hiring-project"
        className="bg-white border border-[#DCE1E9] rounded-xs p-6 sm:p-10 md:p-14 shadow-xs space-y-10"
      >
        <div className="max-w-4xl space-y-3 border-b border-[#E2E8F0] pb-6">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#136382]">
            ALEXANDERS CAREER STRATEGY™ · VALUE+ EXECUTIVE SEARCH METHODOLOGY
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-[42px] font-normal text-[#0A4B78] leading-tight">
            How Alexanders Career Strategy™ Brings Added Value to Your Executive Hiring Project
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-[15px] text-[#334155] leading-relaxed">
            <p>
              In our 25+ years of executive search leadership standards,{' '}
              <strong className="text-[#0B1633]">Alexanders Career Strategy™</strong> has earned a
              privileged reputation for bringing superb value and meaningful impact to executive
              hiring projects for essential executive leadership roles, including{' '}
              <strong className="text-[#0B1633]">
                CEO, President, Board Member, and Senior Executive positions
              </strong>
              . We’re excited to do the same for your company and we customize our solutions to fit
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
            <p className="font-medium text-[#0B1633]">
              Alexanders Career Strategy™ is never satisfied with business as usual. Our approach is
              dynamic and resource-rich: we effectively combine the scale and resources of a global
              executive recruiting leader with the personalized focus and involvement of a boutique
              agency. That’s a level of attention and personalized service that other firms simply
              fail to match.
            </p>
          </div>

          {/* Right 5-col Empowered Talent Search Solutions Box */}
          <div className="lg:col-span-5 bg-[#0B1633] text-white border border-[#1E3A8A] p-7 sm:p-9 space-y-6 shadow-md">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">
                Alexanders Executive Search™
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white leading-snug">
                Empowered Talent Search Solutions
              </h3>
              <div className="w-16 h-[2px] bg-[#136382]" aria-hidden="true" />
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                Executive candidate search solutions and consultation from Alexanders™ allow
                enterprises and organizations to make better, more successful executive hiring
                decisions.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/employers"
                onClick={(e) => handleLink(e, '/employers')}
                className="w-full py-3.5 px-5 text-xs font-bold uppercase tracking-[0.18em] text-white bg-[#136382] hover:bg-[#0E4B63] flex items-center justify-between transition-colors"
              >
                <span>Alexanders Executive Search™</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/employers#services-grid"
                onClick={(e) => handleLink(e, '/employers#services-grid')}
                className="w-full py-3.5 px-5 text-xs font-bold uppercase tracking-[0.18em] text-white bg-white/10 hover:bg-white/20 border border-white/25 flex items-center justify-between transition-colors"
              >
                <span>Alexanders Executive Recruiting™</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/contact#direct-contact-form"
                onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                className="w-full py-3.5 px-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0B1633] bg-white hover:bg-[#E2E8F0] flex items-center justify-between transition-colors"
              >
                <span>Email Us Today</span>
                <ArrowRight className="w-4 h-4 text-[#136382]" aria-hidden="true" />
              </a>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-2">
              <h4 className="font-editorial text-xl font-normal text-[#7DD3FC]">
                Alexanders Executive Search™ – Best Candidates, Optimal Value
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                Alexanders™ has built our value-laden search methodology and capabilities using 25+
                years of worldwide innovation and experience in the executive search field.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Discovery Cards (About, Contact, Mission & Culture, FAQs, Search Philosophy, Company) */}
        <div className="pt-8 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCOVERY_PILLARS.map((card) => (
              <a
                key={card.title}
                href={card.target}
                onClick={(e) => handleLink(e, card.target)}
                className="group p-6 bg-[#F8FAFC] hover:bg-white border border-[#DCE1E9] hover:border-[#0A4B78] flex flex-col justify-between space-y-4 transition-all hover:shadow-md"
              >
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#136382]">
                    {card.kicker}
                  </p>
                  <h3 className="font-editorial text-xl font-semibold text-[#0B1633] group-hover:text-[#0A4B78] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#136382] group-hover:text-[#0B1633]">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 2: 6 Photo-Paired Solution & Expertise Blocks               */}
      {/* =================================================================== */}
      <section className="space-y-10">
        {/* Top Row: Search, Recruiting, Assessment with Executive Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {CORE_SOLUTION_TRIAD.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white border border-[#DCE1E9] overflow-hidden flex flex-col justify-between shadow-xs group hover:shadow-md transition-all"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#0B1633]">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0B1633]/80 via-[#0B1633]/25 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-3 left-4 right-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7DD3FC]">
                    {pillar.badge}
                  </span>
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="font-editorial text-2xl font-normal text-[#0A4B78]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#334155] leading-relaxed">{pillar.description}</p>
                </div>
              </div>
              <div className="px-7 pb-7">
                <a
                  href={pillar.target}
                  onClick={(e) => handleLink(e, pillar.target)}
                  className="inline-flex items-center justify-between w-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white bg-[#136382] hover:bg-[#0B1633] transition-colors"
                >
                  <span>{pillar.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row: Roles & Positions, Industries & Sectors, Businesses & Organizations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {EXPERTISE_TRIAD.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#DCE1E9] overflow-hidden flex flex-col justify-between shadow-xs group hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#0B1633]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0B1633]/85 via-[#0B1633]/30 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#7DD3FC]">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                        {item.badge}
                      </span>
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-7 space-y-3">
                    <h3 className="font-editorial text-2xl font-normal text-[#0A4B78]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#334155] leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="px-7 pb-7">
                  <a
                    href={item.target}
                    onClick={(e) => handleLink(e, item.target)}
                    className="inline-flex items-center justify-between w-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0B1633] bg-[#F1F5F9] hover:bg-[#136382] hover:text-white border border-[#CBD5E1] transition-colors"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 3: Full-Bleed Dark Banner 2 + 6 Detailed Solution Cards     */}
      {/* =================================================================== */}
      <section className="relative overflow-hidden bg-[#0B1633] text-white border border-[#1E3A8A] shadow-lg">
        <img
          src={EXEC_PHOTOS[4]}
          alt="Executive Search and Recruiting Solutions that Connect Organizations and Candidates"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#09142E]/94 via-[#0B1633]/92 to-[#09142E]/96"
          aria-hidden="true"
        />
        <div className="relative z-10 p-7 sm:p-12 md:p-16 space-y-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#7DD3FC]">
              ALEXANDERS CAREER STRATEGY™ · CONNECTING ORGANIZATIONS &amp; LEADERS
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
              Executive Search &amp; Recruiting Solutions that Connect Organizations and Candidates
            </h2>
            <div className="w-24 h-[2px] bg-[#136382] mx-auto" aria-hidden="true" />
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              Whether your organization is an enterprise, billion-dollar corporation, small
              business, startup, government agency, nonprofit, or other type of company, at
              Alexanders Career Strategy™ we have one mission in mind: connect you with the
              leadership talent you need to achieve your most critical executive hiring goals.
            </p>
          </div>

          {/* 5 Primary Action Buttons Matching RMA /contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { label: 'Search for an Executive', target: '/employers#enquiry-form' },
              { label: 'Recruit an Executive', target: '/employers#services-grid' },
              { label: 'Assess an Executive', target: '/approach' },
              { label: 'Industry Experience', target: '/industries' },
              { label: 'Executive Positions We Fill', target: '/expertise' },
            ].map((btn) => (
              <a
                key={btn.label}
                href={btn.target}
                onClick={(e) => handleLink(e, btn.target)}
                className="px-4 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white bg-[#136382] hover:bg-white hover:text-[#0B1633] border border-[#38BDF8]/40 text-center transition-colors"
              >
                {btn.label}
              </a>
            ))}
          </div>

          {/* 6 Detailed Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {DETAILED_SOLUTIONS_SHOWCASE.map((block) => (
              <div
                key={block.title}
                className="p-6 bg-white/5 hover:bg-white/10 border border-white/15 flex flex-col justify-between space-y-5 transition-colors"
              >
                <div className="space-y-3">
                  <h3 className="font-editorial text-2xl font-normal text-[#7DD3FC]">
                    {block.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                    {block.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <a
                    href={block.primaryTarget}
                    onClick={(e) => handleLink(e, block.primaryTarget)}
                    className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white bg-[#136382] hover:bg-[#0E4B63] transition-colors"
                  >
                    {block.primaryLabel}
                  </a>
                  <a
                    href={block.secondaryTarget}
                    onClick={(e) => handleLink(e, block.secondaryTarget)}
                    className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white border border-white/40 hover:bg-white hover:text-[#0B1633] transition-colors"
                  >
                    {block.secondaryLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 4: Our Talent Search Approach & Unparalleled Excellence     */}
      {/* =================================================================== */}
      <section className="bg-white border border-[#DCE1E9] p-6 sm:p-10 md:p-14 space-y-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#136382]">
              ALEXANDERS EXECUTIVE SEARCH™ – OUR TALENT SEARCH APPROACH
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0A4B78] leading-tight">
              The Art of Executive Search™: Unparalleled Excellence, Superior Results
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              The Alexanders Career Strategy™ approach is highly organized, resource-rich, and
              proven by 25+ years of successful hiring outcomes. It provides your organization with
              a deep, uniquely valuable understanding of the capabilities needed from your ideal
              executive candidate.
            </p>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              We have innovated an intelligent, comprehensive search and recruiting methodology that
              incorporates your position requirements, business objectives, and company culture into
              a uniquely powerful executive search and assessment process. Our primary focus is
              filling key executive leadership roles within your organization that are strategically
              critical, difficult to recruit suitable talent for, and essential to enhance the
              overall value, growth, and development of your company.
            </p>
          </div>

          <div className="lg:col-span-5 p-7 bg-[#F8FAFC] border border-[#DCE1E9] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#136382]">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>Alexanders Value+ Commitment</span>
            </div>
            <h3 className="font-editorial text-2xl font-normal text-[#0A4B78]">
              Delivered With World-Class Service &amp; Professionalism
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
              <strong className="text-[#0B1633]">Commitment to Value:</strong> Alexanders Career
              Strategy™ provides an unmatched level of value for executive search and executive
              recruitment projects. Our team provides highly specialized solutions, innovative
              tools, rapid on-schedule performance, agile responsiveness, and an extraordinary level
              of concierge-level attentiveness.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/contact#direct-contact-form"
                onClick={(e) => handleLink(e, '/contact#direct-contact-form')}
                className="px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white bg-[#136382] hover:bg-[#0B1633] transition-colors"
              >
                Email Us Today
              </a>
              <a
                href="/employers#enquiry-form"
                onClick={(e) => handleLink(e, '/employers#enquiry-form')}
                className="px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0B1633] bg-white hover:bg-[#E2E8F0] border border-[#CBD5E1] transition-colors"
              >
                Schedule A Consultation
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillar Highlights: Solutions, Expertise, Locations, Value+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6 border-t border-[#E2E8F0]">
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
              desc: 'Expertise in executive search and recruiting makes a difference in your success. Our unrivaled expertise supports top outcomes for your key hiring projects.',
              target: '/expertise',
            },
            {
              kicker: 'Locations',
              title: 'Executive Search Firm Locations',
              desc: 'Alexanders Career Strategy™ specializes in executive search, recruiting, and assessment solutions to employers across the United States and worldwide.',
              target: '/contact#us-regional-locations',
            },
            {
              kicker: 'Alexanders Value+',
              title: 'Concierge-Level Attentiveness',
              desc: 'Highly specialized solutions, original talent mapping, rapid performance, agile responsiveness, and dedicated partner accountability.',
              target: '/approach',
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.target}
              onClick={(e) => handleLink(e, item.target)}
              className="group p-6 bg-[#F8FAFC] border border-[#DCE1E9] hover:border-[#0A4B78] space-y-2 transition-all"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#136382]">
                {item.kicker}
              </p>
              <h4 className="font-editorial text-xl font-semibold text-[#0B1633] group-hover:text-[#0A4B78]">
                {item.title}
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 5: 14 Photo-Backed Overlay Category Cards                   */}
      {/* Matches `fusion-column-has-bg-image` on https://rmasearchfirm.com/contact */}
      {/* =================================================================== */}
      <section className="space-y-8" data-testid="rma-photo-categories-grid">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#136382]">
            ALEXANDERS™ CATEGORIES
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0A4B78]">
            Explore Our Executive Search, Recruiting &amp; Assessment Categories
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Alexanders Career Strategy™ specializes in providing exceptional executive search,
            executive recruiting, and executive assessment solutions throughout a variety of
            industries and locations. Select any category below to load the full section.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_GRID.map((cat) => (
            <div
              key={cat.title}
              className="group relative min-h-[340px] overflow-hidden border border-[#1E3A8A]/40 bg-[#0B1633] flex flex-col items-center justify-center text-center p-8 shadow-md"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8, 24, 54, 0.62) 0%, rgba(8, 24, 54, 0.82) 100%)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col items-center justify-between h-full space-y-4 max-w-sm">
                <div className="space-y-3">
                  <h3 className="font-editorial text-2xl sm:text-[26px] font-semibold text-white leading-snug">
                    {cat.title}
                  </h3>
                  <div className="w-20 h-[1.5px] bg-white/60 mx-auto" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href={cat.target}
                    onClick={(e) => handleLink(e, cat.target)}
                    className="inline-flex items-center gap-2 px-7 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white border border-white/85 bg-[#136382]/75 hover:bg-white hover:text-[#0B1633] transition-colors"
                  >
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 6: 4 Photo-Backed Leadership Insight Cards                  */}
      {/* =================================================================== */}
      <section className="bg-white border border-[#DCE1E9] p-6 sm:p-10 md:p-14 space-y-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2E8F0] pb-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#136382]">
              ALEXANDERS INSIGHTS™
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#0A4B78]">
              Business Leadership Insights &amp; Executive Management Perspectives
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Our Insights portal communicates business leadership insights, executive management
              perspectives, and industry analysis to our client employers and the executive
              candidates we work with.
            </p>
          </div>
          <a
            href="/insights"
            onClick={(e) => handleLink(e, '/insights')}
            className="px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white bg-[#136382] hover:bg-[#0B1633] whitespace-nowrap self-start lg:self-auto transition-colors"
          >
            View All Insights →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {FEATURED_PERSPECTIVES.map((article) => (
            <article
              key={article.slug}
              className="bg-[#F8FAFC] border border-[#DCE1E9] hover:border-[#0A4B78] overflow-hidden flex flex-col justify-between transition-all group hover:shadow-md"
            >
              <div>
                <a
                  href={`/insights/${article.slug}`}
                  onClick={(e) => handleLink(e, `/insights/${article.slug}`)}
                  className="block relative h-52 overflow-hidden bg-[#0B1633]"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0B1633]/70 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </a>
                <div className="p-6 sm:p-7 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#136382]">
                    Alexanders Insights™ · Executive Perspective
                  </p>
                  <h3 className="font-editorial text-2xl font-normal text-[#0A4B78]">
                    <a
                      href={`/insights/${article.slug}`}
                      onClick={(e) => handleLink(e, `/insights/${article.slug}`)}
                      className="hover:text-[#0B1633] transition-colors"
                    >
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-7 pb-6">
                <a
                  href={`/insights/${article.slug}`}
                  onClick={(e) => handleLink(e, `/insights/${article.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#136382] hover:text-[#0B1633]"
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
