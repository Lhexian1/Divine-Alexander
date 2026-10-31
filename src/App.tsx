/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage, ForEmployersPage, ForCandidatesPage, OurExpertisePage } from './components/Pages';
import {
  OurApproachPage,
  OurApproachArticlePage,
  AboutUsPage,
  CareersPage,
  InsightsPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
  NotFoundPage,
} from './components/SecondaryPages';
import { TeamSection } from './components/TeamSection';
import { JobsBoardView } from './components/JobsBoardView';
import { ContentManagerModal } from './components/ContentManagerModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';

const PAGE_SEO_MAP: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Alexanders Career Strategy | Executive Search & Headhunting',
    description:
      'Independent executive search and headhunting consultancy serving the United States market. Executive Search. Exceptional Talent. Strategic Impact.',
  },
  '/employers': {
    title: 'For Employers | Executive Search & Senior Leadership Recruitment — Alexanders Career Strategy',
    description:
      'Partner with Alexanders Career Strategy to identify, engage, and evaluate accomplished executives and specialist professionals across the United States.',
  },
  '/candidates': {
    title: 'For Candidates | Executive Career Opportunities & CV Registration — Alexanders Career Strategy',
    description:
      'Connect confidentially with Alexanders Career Strategy and submit your executive CV for consideration in relevant leadership search assignments.',
  },
  '/expertise': {
    title: 'Our Expertise | C-Suite, Board & Specialist Recruitment — Alexanders Career Strategy',
    description:
      'Explore our executive search expertise across Accounting & Finance, Risk, Legal & Compliance, Technology, Operations, HR, Sales & Marketing, and Engineering.',
  },
  '/industries': {
    title: 'Industries We Serve | Healthcare, Pharma, Biotech & Technology Search — Alexanders Career Strategy',
    description:
      'Specialized executive search across Healthcare, Pharmaceuticals & Biotechnology, Medical Devices, Procurement, Technology, Financial Services, and Manufacturing.',
  },
  '/approach': {
    title: 'Our Search Process | 8-Stage Executive Search Methodology — Alexanders Career Strategy',
    description:
      'Learn how our disciplined eight-stage executive search process supports role discovery, talent mapping, direct outreach, and candidate evaluation.',
  },
  '/our-approach-to-executive-search': {
    title: 'Our Approach to Executive Search | Alexanders Career Strategy',
    description:
      'Explore our executive search philosophy across Focused Search, Targeted Talent Research, Discreet Engagement, and Personal Partnership.',
  },
  '/about': {
    title: 'About Us | Mission, Values & Search Philosophy — Alexanders Career Strategy',
    description:
      'Learn about Alexanders Career Strategy, an independent executive search firm built around focused research, integrity, and meaningful relationships.',
  },
  '/team': {
    title: 'Meet Our Team | Executive Search Consultants — Alexanders Career Strategy',
    description:
      'Meet the people behind Alexanders Career Strategy: Alexander Divine, Paul Alexander, Piers Fisher, Fred Geerken, and Eunice Angelo.',
  },
  '/jobs': {
    title: 'Jobs & Vacancies Board | Selected Executive Opportunities — Alexanders Career Strategy',
    description:
      'Explore selected senior leadership and clinical development opportunities from employer career pages or share your CV with Alexanders Career Strategy.',
  },
  '/careers': {
    title: 'Careers at Alexanders Career Strategy | Build a Career That Shapes Leadership',
    description:
      'Explore internal career perspectives, guiding principles, and register your interest in joining Alexanders Career Strategy.',
  },
  '/insights': {
    title: 'Insights & Perspectives | Executive Search & Leadership Articles — Alexanders Career Strategy',
    description:
      'Read practical perspectives on executive search, defining candidate profiles, talent mapping, executive CVs, confidentiality, and cross-industry hiring.',
  },
  '/contact': {
    title: 'Contact Us | Employer & Candidate Enquiries — Alexanders Career Strategy',
    description:
      'Contact Alexanders Career Strategy to discuss an executive hiring requirement, introduce yourself as a candidate, or connect with our team.',
  },
  '/privacy': {
    title: 'Privacy Policy | Data Protection & Candidate Privacy — Alexanders Career Strategy',
    description:
      'Review the privacy notice and candidate data handling framework for Alexanders Career Strategy.',
  },
  '/terms': {
    title: 'Terms of Use | Website Governance — Alexanders Career Strategy',
    description:
      'Review the website Terms of Use governing access to Alexanders Career Strategy.',
  },
};

const MainRouter: React.FC = () => {
  const { siteSettings, getPageConfig } = useSiteContent();
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [contentStudioOpen, setContentStudioOpen] = useState(false);

  const navigate = useCallback((rawTarget: string) => {
    const [pathnamePart, hashPart] = rawTarget.split('#');
    const targetPath = pathnamePart || '/';

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', rawTarget);
      setCurrentPath(targetPath);
    } else if (hashPart) {
      window.history.replaceState({}, '', rawTarget);
    }

    if (hashPart) {
      setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const activePath = currentPath;

  // Update document title & meta description dynamically from live CMS page config
  useEffect(() => {
    const baseRoute =
      activePath.startsWith('/jobs/')
        ? '/jobs'
        : activePath.startsWith('/insights/')
        ? '/insights'
        : activePath;
    const dynamicPage = getPageConfig(baseRoute);
    const fallbackSeo = PAGE_SEO_MAP[baseRoute] || {
      title: siteSettings.defaultSeoTitle,
      description: siteSettings.defaultSeoDescription,
    };
    document.title = dynamicPage?.seoTitle || fallbackSeo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', dynamicPage?.seoDescription || fallbackSeo.description);
    }
  }, [activePath, siteSettings, getPageConfig]);

  const renderPage = () => {
    if (activePath === '/' || activePath === '/home') {
      return <HomePage onNavigate={navigate} />;
    }
    if (activePath === '/employers') {
      return <ForEmployersPage onNavigate={navigate} />;
    }
    if (activePath === '/candidates') {
      return <ForCandidatesPage onNavigate={navigate} />;
    }
    if (activePath === '/expertise') {
      return <OurExpertisePage onNavigate={navigate} focusIndustries={false} />;
    }
    if (activePath === '/industries') {
      return <OurExpertisePage onNavigate={navigate} focusIndustries={true} />;
    }
    if (activePath === '/approach') {
      return <OurApproachPage onNavigate={navigate} />;
    }
    if (activePath === '/our-approach-to-executive-search') {
      return <OurApproachArticlePage onNavigate={navigate} />;
    }
    if (activePath === '/about') {
      return <AboutUsPage onNavigate={navigate} />;
    }
    if (activePath === '/team') {
      const teamConfig = getPageConfig('/team');
      return (
        <div className="bg-[#F8FAFC]/85 backdrop-blur-[1px]">
          <section className="relative overflow-hidden bg-[#0F2350] text-[#F8FAFC] py-16 md:py-20 border-b border-[#FACC15]/30">
            <img
              src={teamConfig?.heroImage || '/src/assets/images/regenerated_image_1793294161466.jpg'}
              alt={teamConfig?.heroImageAlt || 'Alexanders Career Strategy consultant directory'}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0F2350]/90 via-[#0F2350]/82 to-[#1E3A8A]/78"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#FDE047]">
                {teamConfig?.heroKicker || 'Our Team Directory'}
              </p>
              <h1 className="font-editorial text-4xl md:text-5xl font-semibold text-[#F8FAFC]">
                {teamConfig?.heroHeading || 'Meet Our Team'}
              </h1>
              <p className="text-base md:text-lg text-[#F8FAFC]/85 max-w-2xl">
                {teamConfig?.heroText ||
                  'Executive search is built on trust, sound judgment, and meaningful relationships. Meet the people behind Alexanders Career Strategy.'}
              </p>
            </div>
          </section>
          <TeamSection onNavigate={navigate} compactHeader hideHeader />
        </div>
      );
    }
    if (activePath === '/jobs') {
      return <JobsBoardView onNavigate={navigate} />;
    }
    if (activePath.startsWith('/jobs/')) {
      const slug = activePath.replace('/jobs/', '').trim();
      return <JobsBoardView selectedJobSlug={slug} onNavigate={navigate} />;
    }
    if (activePath === '/careers') {
      return <CareersPage onNavigate={navigate} />;
    }
    if (activePath === '/insights') {
      return <InsightsPage onNavigate={navigate} />;
    }
    if (activePath.startsWith('/insights/')) {
      const slug = activePath.replace('/insights/', '').trim();
      return <InsightsPage selectedArticleSlug={slug} onNavigate={navigate} />;
    }
    if (activePath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (activePath === '/admin') {
      return (
        <ContentManagerModal
          isOpen={true}
          onClose={() => navigate('/')}
          isStandalonePage={true}
        />
      );
    }
    if (activePath === '/privacy') {
      return <PrivacyPolicyPage />;
    }
    if (activePath === '/terms') {
      return <TermsOfUsePage />;
    }
    return <NotFoundPage onNavigate={navigate} />;
  };

  const baseRouteForBg = activePath.startsWith('/jobs/')
    ? '/jobs'
    : activePath.startsWith('/insights/')
    ? '/insights'
    : activePath === '/home'
    ? '/'
    : activePath;

  const fallbackBgByRoute: Record<string, string> = {
    '/': '/src/assets/images/regenerated_image_1793294161466.jpg',
    '/employers': '/src/assets/images/regenerated_image_1793268848419.jpg',
    '/candidates': '/src/assets/images/regenerated_image_1793298524657.jpg',
    '/expertise': '/src/assets/images/regenerated_image_1793299200419.jpg',
    '/industries': '/src/assets/images/regenerated_image_1793294161466.jpg',
    '/approach': '/src/assets/images/regenerated_image_1793299190928.jpg',
    '/our-approach-to-executive-search': '/src/assets/images/regenerated_image_1793299190928.jpg',
    '/about': '/src/assets/images/regenerated_image_1793299190928.jpg',
    '/team': '/src/assets/images/regenerated_image_1793294161466.jpg',
    '/jobs': '/src/assets/images/regenerated_image_1793268848419.jpg',
    '/careers': '/src/assets/images/regenerated_image_1793299190928.jpg',
    '/insights': '/src/assets/images/regenerated_image_1793299200419.jpg',
    '/contact': '/src/assets/images/regenerated_image_1793298524657.jpg',
    '/privacy': '/src/assets/images/regenerated_image_1793294161466.jpg',
    '/terms': '/src/assets/images/regenerated_image_1793294161466.jpg',
  };

  const configuredPageHero = getPageConfig(baseRouteForBg)?.heroImage;
  const activePageBackgroundImage =
    configuredPageHero && !configuredPageHero.endsWith('.svg')
      ? configuredPageHero
      : fallbackBgByRoute[baseRouteForBg] || '/src/assets/images/regenerated_image_1793294161466.jpg';

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#F8FAFC] text-[#0A1633]">
      {/* Persistent Full-Viewport Background Image for Every Loaded Page */}
      <div
        data-testid="page-background-image"
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src={activePageBackgroundImage}
          alt=""
          className="w-full h-full object-cover object-center scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE]/82 via-[#F8FAFC]/84 to-[#FEF9C3]/82 backdrop-blur-[1px]" />
      </div>

      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
      />
      <main id="main-content" className="relative z-10 flex-1 w-full max-w-full overflow-x-hidden">
        {renderPage()}
      </main>
      <div className="relative z-10">
        <Footer
          onNavigate={navigate}
          onOpenContentManager={() => setContentStudioOpen(true)}
        />
      </div>
      <CookieConsentBanner onNavigate={navigate} />
      <ContentManagerModal
        isOpen={contentStudioOpen}
        onClose={() => setContentStudioOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SiteContentProvider>
      <MainRouter />
    </SiteContentProvider>
  );
}
