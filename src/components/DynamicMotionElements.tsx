import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Briefcase,
  MapPin,
  DollarSign,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  Layers,
} from 'lucide-react';
import { HUNDRED_OPPORTUNITY_PROFILES } from '../data/hundredOpportunities';

// ============================================================================
// 1. DYNAMIC TYPEWRITER & MORPHING TEXT COMPONENT
// ============================================================================
interface DynamicTypewriterProps {
  phrases: string[];
  prefix?: string;
  variant?: 'dark-yellow-badge' | 'light-blue-badge' | 'inline-hero';
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export const DynamicTypewriter: React.FC<DynamicTypewriterProps> = ({
  phrases,
  prefix,
  variant = 'inline-hero',
  typingSpeed = 48,
  deletingSpeed = 24,
  pauseMs = 2200,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0] || '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const currentFull = phrases[phraseIndex % phrases.length];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentFull.slice(0, displayText.length + 1);
          setDisplayText(next);
          if (next === currentFull) {
            setTimeout(() => setIsDeleting(true), pauseMs);
          }
        } else {
          const next = currentFull.slice(0, Math.max(0, displayText.length - 1));
          setDisplayText(next);
          if (next.length === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs]);

  if (variant === 'dark-yellow-badge') {
    return (
      <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FEF9C3] via-[#FFFFFF] to-[#FEF08A] text-[#082F49] font-bold text-xs md:text-sm shadow-sm border border-[#7DD3FC]">
        <span className="inline-flex items-center gap-1.5 uppercase tracking-wider bg-[#BAE6FD] text-[#082F49] px-2.5 py-0.5 rounded-full text-[11px] font-extrabold">
          <Sparkles className="w-3.5 h-3.5 text-[#0369A1]" />
          {prefix || 'LIVE FOCUS'}
        </span>
        <span className="font-editorial text-base md:text-lg font-bold tracking-tight text-[#082F49] min-h-[1.5rem] inline-flex items-center">
          {displayText}
          <span className="inline-block w-0.5 h-5 bg-[#0369A1] ml-1 animate-pulse" />
        </span>
      </div>
    );
  }

  if (variant === 'light-blue-badge') {
    return (
      <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#E0F2FE] via-[#FFFFFF] to-[#FEF9C3] text-[#082F49] font-bold text-xs md:text-sm shadow-sm border border-[#7DD3FC]">
        <span className="inline-flex items-center gap-1.5 uppercase tracking-wider bg-[#FEF08A] text-[#082F49] px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border border-[#38BDF8]/40">
          <Activity className="w-3.5 h-3.5 text-[#0369A1]" />
          {prefix || 'ACTIVE MANDATES'}
        </span>
        <span className="font-editorial text-base md:text-lg font-bold tracking-tight text-[#082F49] min-h-[1.5rem] inline-flex items-center">
          {displayText}
          <span className="inline-block w-0.5 h-5 bg-[#0369A1] ml-1 animate-pulse" />
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center flex-wrap gap-2">
      {prefix && <span className="text-[#082F49] font-semibold">{prefix}</span>}
      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FEF9C3] via-[#FFFFFF] to-[#E0F2FE] text-[#082F49] font-extrabold shadow-xs border border-[#7DD3FC] inline-flex items-center">
        <span>{displayText || '\u00A0'}</span>
        <span className="inline-block w-0.5 h-5 bg-[#0369A1] ml-1.5 animate-pulse" />
      </span>
    </span>
  );
};

// ============================================================================
// 2. ANIMATED LIVE METRICS & MOVING STATS RIBBON
// ============================================================================
function formatCompactSalary(salaryText?: string): string {
  if (!salaryText) return 'Competitive Executive Comp';
  if (
    salaryText.toLowerCase().includes('not confirmed') ||
    salaryText.toLowerCase().includes('not published') ||
    salaryText.length > 26
  ) {
    const match = salaryText.match(/\$[0-9,]+(?:\s*[–-]\s*\$[0-9,]+)?/);
    return match ? match[0] : 'Competitive / Confirm';
  }
  return salaryText;
}

export const DynamicMetricsRibbon: React.FC<{ onNavigate?: (path: string) => void }> = ({
  onNavigate,
}) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: Briefcase,
      value: 'C-Suite & VP',
      suffix: 'Executive Mandates',
      label: 'Confidential Retained & Specialist Search Representation',
      highlight: 'Direct On-Site Application Routing',
    },
    {
      icon: Award,
      value: 'Fortune 500',
      suffix: 'Target Employers',
      label: 'Global Biopharma, AI, Healthcare & Financial Leaders',
      highlight: 'C-Suite · EVP · SVP · VP · Director',
    },
    {
      icon: Layers,
      value: '9',
      suffix: 'Core Sectors',
      label: 'Technology, Healthcare, MedTech, Finance & Supply Chain',
      highlight: 'Cross-Industry Market Intelligence',
    },
    {
      icon: TrendingUp,
      value: '$200K–$950K+',
      suffix: 'Comp Bands',
      label: 'Executive Base & Total Target Compensation Benchmarks',
      highlight: 'Confidential Career Advisory',
    },
  ];

  return (
    <div
      role="region"
      aria-label="Live Executive Search Metrics"
      className="relative overflow-hidden py-10 bg-gradient-to-r from-[#E0F2FE] via-[#FFFFFF] to-[#FEF9C3] border-y border-[#7DD3FC]"
    >
      <div className="kinetic-orb kinetic-orb-yellow -top-16 left-1/4" aria-hidden="true" />
      <div className="kinetic-orb kinetic-orb-blue -bottom-16 right-1/4" aria-hidden="true" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            const isHighlighted = tick === idx;
            return (
              <div
                key={item.label}
                onClick={() => onNavigate && onNavigate('/jobs')}
                className={`p-5 rounded-xl cursor-pointer transition-all duration-500 border ${
                  idx % 2 === 0
                    ? 'bg-gradient-to-br from-[#FFFFFF] via-[#FEF9C3] to-[#FEF08A] text-[#082F49] border-[#7DD3FC]'
                    : 'bg-gradient-to-br from-[#FFFFFF] via-[#E0F2FE] to-[#BAE6FD] text-[#082F49] border-[#7DD3FC]'
                } ${
                  isHighlighted
                    ? 'scale-[1.02] shadow-lg ring-1 ring-[#38BDF8]'
                    : 'hover:scale-[1.01] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-lg bg-[#E0F2FE] text-[#0369A1] border border-[#7DD3FC] inline-flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono-tabular font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FEF08A] text-[#082F49] border border-[#38BDF8]/40">
                    {item.suffix}
                  </span>
                </div>
                <p className="font-editorial text-3xl md:text-4xl font-extrabold text-[#082F49] tracking-tight">
                  {item.value}
                </p>
                <p className="text-xs font-bold text-[#082F49]/90 mt-1 leading-snug">{item.label}</p>
                <div className="mt-3 pt-2 border-t border-[#7DD3FC]/50 flex items-center justify-between text-[11px] font-extrabold text-[#0369A1]">
                  <span>{item.highlight}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isHighlighted ? 'translate-x-1.5' : ''
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. INTERACTIVE AUTO-CYCLING EXECUTIVE MANDATE SPOTLIGHT CAROUSEL
// ============================================================================
export const DynamicSpotlightCarousel: React.FC<{
  onNavigate: (path: string) => void;
}> = ({ onNavigate }) => {
  const featured = HUNDRED_OPPORTUNITY_PROFILES.slice(0, 12);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying, featured.length]);

  const currentRole = featured[activeIndex];
  const nextRole = featured[(activeIndex + 1) % featured.length];
  const thirdRole = featured[(activeIndex + 2) % featured.length];

  return (
    <div
      role="region"
      aria-label="Featured Executive Search Mandates Carousel"
      className="relative overflow-hidden py-14 bg-gradient-to-br from-[#BAE6FD] via-[#FFFFFF] to-[#FEF08A] border-y border-[#7DD3FC]"
    >
      <div className="kinetic-orb kinetic-orb-blue top-6 left-10" aria-hidden="true" />
      <div className="kinetic-orb kinetic-orb-yellow bottom-6 right-10" aria-hidden="true" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#0369A1]">
              LIVE ROTATING EXECUTIVE SPOTLIGHT · AUTO-UPDATING FEED
            </p>
            <h2 className="font-editorial text-3xl md:text-5xl font-bold text-[#082F49]">
              Featured Executive Search Mandates in Motion
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#082F49] hover:bg-[#FEF08A] border border-[#7DD3FC] text-xs font-bold transition-colors cursor-pointer shadow-xs"
              aria-label={isPlaying ? 'Pause live carousel' : 'Play live carousel'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#0369A1]" /> : <Play className="w-3.5 h-3.5 text-[#0369A1]" />}
              <span>{isPlaying ? 'Live Cycling' : 'Paused'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length)}
              className="p-2 rounded-full bg-white text-[#082F49] hover:bg-[#FEF08A] border border-[#7DD3FC] cursor-pointer shadow-xs"
              aria-label="Previous executive mandate"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % featured.length)}
              className="p-2 rounded-full bg-white text-[#082F49] hover:bg-[#FEF08A] border border-[#7DD3FC] cursor-pointer shadow-xs"
              aria-label="Next executive mandate"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Card Kinetic Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Primary Spotlight Card (Crisp White + Sky Blue + Bright Light Yellow) */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-white border border-[#7DD3FC] shadow-lg flex flex-col justify-between space-y-6 transition-all duration-500">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[#082F49] border border-[#7DD3FC] font-mono-tabular text-xs font-extrabold">
                  {currentRole.jobReference || currentRole.id} · FEATURED EXECUTIVE MANDATE
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FEF08A] text-[#082F49] text-xs font-bold border border-[#38BDF8]/40">
                  {currentRole.industry}
                </span>
              </div>

              <h3 className="font-editorial text-2xl md:text-4xl font-bold text-[#082F49] leading-tight">
                {currentRole.title} — <span className="underline decoration-[#38BDF8]">{currentRole.employer}</span>
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold text-[#082F49]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#082F49] border border-[#7DD3FC]">
                  <MapPin className="w-4 h-4 text-[#0369A1]" />
                  {currentRole.location} ({currentRole.workplaceType})
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] text-[#082F49] border border-[#38BDF8]/40 font-mono-tabular">
                  <DollarSign className="w-4 h-4 text-[#0369A1]" />
                  {formatCompactSalary(currentRole.salaryText)}
                </span>
              </div>

              <p className="text-sm md:text-base text-[#1E293B] font-medium leading-relaxed">
                {currentRole.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E0F2FE] flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onNavigate(`/jobs/${currentRole.slug}`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FEF08A] hover:bg-[#FDE047] text-[#082F49] border border-[#38BDF8] text-xs md:text-sm font-bold tracking-wide transition-all cursor-pointer shadow-xs"
              >
                <span>Apply or Express Interest ({currentRole.jobReference || currentRole.id})</span>
                <ArrowRight className="w-4 h-4 text-[#0369A1]" />
              </button>
              <span className="text-xs font-mono-tabular font-bold text-[#0369A1]">
                Seniority: {currentRole.seniority}
              </span>
            </div>
          </div>

          {/* Up Next Queue (Bright Light Yellow & Sky Blue Cards) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {[nextRole, thirdRole].map((role, idx) => (
              <div
                key={role.id}
                onClick={() =>
                  setActiveIndex((activeIndex + idx + 1) % featured.length)
                }
                className="p-5 rounded-2xl bg-gradient-to-r from-[#FEF9C3] via-[#FFFFFF] to-[#E0F2FE] border border-[#7DD3FC] shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#7DD3FC] font-mono-tabular text-xs font-extrabold">
                    UP NEXT · {role.jobReference || role.id}
                  </span>
                  <span className="text-xs font-bold text-[#082F49] bg-[#FEF08A] px-2.5 py-0.5 rounded-full">
                    {role.employer}
                  </span>
                </div>
                <h4 className="font-editorial text-xl md:text-2xl font-bold text-[#082F49]">
                  {role.title}
                </h4>
                <div className="flex flex-wrap items-center justify-between text-xs font-bold text-[#082F49] pt-2 border-t border-[#7DD3FC]/40">
                  <span>{role.location}</span>
                  <span className="font-mono-tabular bg-[#FEF08A] text-[#082F49] px-2.5 py-0.5 rounded-full">
                    {formatCompactSalary(role.salaryText)}
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => onNavigate('/jobs')}
              className="w-full py-3.5 px-5 rounded-full bg-white hover:bg-[#FEF08A] text-[#082F49] font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2 border border-[#38BDF8] shadow-sm cursor-pointer transition-all"
            >
              <span>Search Executive Opportunity Profiles</span>
              <ArrowRight className="w-4 h-4 text-[#0369A1]" />
            </button>
          </div>
        </div>

        {/* Interactive Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {featured.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Jump to spotlight role ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'w-10 bg-[#0369A1]'
                  : 'w-2.5 bg-[#0369A1]/30 hover:bg-[#0369A1]/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
