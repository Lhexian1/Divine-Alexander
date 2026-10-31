import React, { useState, useRef, useEffect } from 'react';
import { Mail, Copy, Check, ExternalLink, X, UserCheck } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { sanitizePublicTeamEmail } from '../utils/validation';
import { type TeamMemberRecord } from '../data/siteContent';

interface TeamSectionProps {
  onNavigate?: (path: string) => void;
  compactHeader?: boolean;
  hideHeader?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  onNavigate,
  compactHeader = false,
  hideHeader = false,
}) => {
  const { teamMembers } = useSiteContent();
  const [activeContactSlug, setActiveContactSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const publishedMembers = [...teamMembers]
    .filter((m) => m.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  useEffect(() => {
    if (activeContactSlug && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [activeContactSlug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeContactSlug) {
        const slugToRestore = activeContactSlug;
        setActiveContactSlug(null);
        setTimeout(() => {
          triggerRefs.current[slugToRestore]?.focus();
        }, 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeContactSlug]);

  const handleClosePanel = (slug: string) => {
    setActiveContactSlug(null);
    setTimeout(() => {
      triggerRefs.current[slug]?.focus();
    }, 0);
  };

  const handleCopyEmail = async (slug: string, email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedSlug(slug);
      setTimeout(() => {
        setCopiedSlug((prev) => (prev === slug ? null : prev));
      }, 2500);
    } catch {
      // Fallback copy if clipboard API restricted
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedSlug(slug);
      setTimeout(() => {
        setCopiedSlug((prev) => (prev === slug ? null : prev));
      }, 2500);
    }
  };

  const renderSocialIcon = (platform: 'X' | 'Facebook' | 'LinkedIn') => {
    if (platform === 'LinkedIn') {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    }
    if (platform === 'X') {
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    );
  };

  return (
    <section
      id="meet-our-team"
      aria-labelledby="meet-our-team-heading"
      className="py-16 md:py-24 bg-[#F8FAFC] border-t border-[#CBD5E1]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {!hideHeader ? (
          <div className="max-w-3xl mb-12 space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A8A]">
              Leadership &amp; Search Consultants
            </p>
            <h2
              id="meet-our-team-heading"
              className={`font-editorial font-semibold text-[#0A1633] ${
                compactHeader ? 'text-3xl md:text-4xl' : 'text-3xl md:text-5xl'
              }`}
            >
              Meet Our Team
            </h2>
            <p className="text-base md:text-lg text-[#475569] leading-relaxed">
              Executive search is built on trust, sound judgment, and meaningful relationships. Meet the people behind Alexanders Career Strategy.
            </p>
            <p className="text-xs text-[#475569] bg-[#EFF6FF] border border-[#CBD5E1] px-4 py-2.5 rounded-sm">
              Note on profile descriptions: Specialty titles and profile summaries below are proposed focus descriptions editable via the Content Studio and subject to final owner confirmation. Supplied portraits render plainly and unblurred immediately when placed in <code className="font-mono-tabular text-[#1E3A8A]">public/images/team/</code>.
            </p>
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-xs text-[#475569] bg-[#EFF6FF] border border-[#CBD5E1] px-4 py-2.5 rounded-sm">
              Note on profile descriptions: Specialty titles and profile summaries below are proposed focus descriptions editable via the Content Studio and subject to final owner confirmation. Supplied portraits render plainly and unblurred immediately when placed in <code className="font-mono-tabular text-[#1E3A8A]">public/images/team/</code>.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedMembers.map((member: TeamMemberRecord) => {
            const safeEmail = sanitizePublicTeamEmail(member.approvedPublicEmail);
            const isPanelOpen = activeContactSlug === member.slug;
            const showRealPhoto = member.photoSuppliedByOwner && !failedImages[member.slug];

            return (
              <article
                key={member.slug}
                className="relative flex flex-col bg-white border border-[#CBD5E1] rounded-sm overflow-hidden transition-colors hover:border-[#FACC15]"
              >
                {/* Plain, Unblurred Portrait Area (No blur filters, no click-to-reveal) */}
                <div className="relative aspect-[4/3] w-full bg-[#0F2350] border-b border-[#FACC15]/30 overflow-hidden">
                  {showRealPhoto ? (
                    <img
                      src={member.imagePath}
                      alt={`Portrait of ${member.name}`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [member.slug]: true,
                        }))
                      }
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`Neutral monogram placeholder for ${member.name}`}
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1E3A8A] to-[#0F2350]"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#0A1633]/70 border border-[#FACC15] flex items-center justify-center mb-3">
                        <span className="font-editorial text-2xl font-semibold text-[#FDE047] tracking-wider">
                          {getInitials(member.name)}
                        </span>
                      </div>
                      <span className="text-xs text-[#FDE047]/90 font-medium">
                        {member.name}
                      </span>
                      <span className="text-[11px] text-[#F8FAFC]/65 mt-1 font-mono-tabular">
                        Asset path: {member.imagePath}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-editorial text-2xl font-semibold text-[#0A1633]">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-[#1E3A8A] mt-0.5">
                        {member.suggestedSpecialtyTitle}
                      </p>
                      {!member.roleVerifiedByOwner && (
                        <p className="text-xs text-[#475569] mt-0.5">
                          Suggested specialty — editable prior to final publication
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-[#475569] leading-relaxed">
                      {member.suggestedProfileCopy}
                    </p>
                  </div>

                  {/* Card Footer: Premium Contact Control & Verified Social Icons */}
                  <div className="pt-4 border-t border-[#EFF6FF] flex items-center justify-between gap-3">
                    <button
                      ref={(el) => {
                        triggerRefs.current[member.slug] = el;
                      }}
                      type="button"
                      onClick={() =>
                        setActiveContactSlug((prev) => (prev === member.slug ? null : member.slug))
                      }
                      aria-expanded={isPanelOpen}
                      aria-controls={`contact-panel-${member.slug}`}
                      aria-label={`Open contact details for ${member.name}`}
                      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-sm bg-[#1E3A8A] hover:bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15] text-xs font-semibold transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#0A1633] border border-[#FACC15]/70 flex items-center justify-center text-[#FACC15]">
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span>Contact</span>
                    </button>

                    {/* Direct Social Profile Links (Only when supplied by owner) */}
                    {member.socialLinks.length > 0 && (
                      <div className="flex items-center gap-2">
                        {member.socialLinks.map((social) => (
                          <a
                            key={social.url}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            title={social.label}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#EFF6FF] hover:bg-[#1E3A8A] text-[#1E3A8A] hover:text-[#FDE047] border border-[#CBD5E1] hover:border-[#FACC15] transition-colors focus-visible:outline-2 focus-visible:outline-[#1E3A8A]"
                          >
                            {renderSocialIcon(social.platform)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Accessible Anchored Contact Panel / Dialog */}
                {isPanelOpen && (
                  <div
                    id={`contact-panel-${member.slug}`}
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby={`contact-heading-${member.slug}`}
                    className=" inset-x-0 bottom-0 z-20 bg-[#0A1633] text-[#F8FAFC] border-t-2 border-[#FACC15] p-6 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold tracking-wider text-[#FACC15]">
                          Direct Consultant Directory
                        </p>
                        <h4
                          id={`contact-heading-${member.slug}`}
                          className="font-editorial text-xl font-semibold text-[#F8FAFC]"
                        >
                          Contact {member.name}
                        </h4>
                      </div>
                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={() => handleClosePanel(member.slug)}
                        aria-label={`Close contact details for ${member.name}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-[#FDE047] hover:bg-[#1E293B] border border-[#FACC15]/40 focus-visible:outline-2 focus-visible:outline-[#FDE047]"
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Direct Contact Desk Routing (No Visible Email Address) */}
                    <div className="p-3.5 bg-[#0F2350] border border-[#FACC15]/40 rounded-sm space-y-2.5 text-xs text-[#F8FAFC]/90">
                      <p>
                        Send a confidential message to <strong>{member.name}</strong> through our Executive Contact Desk.
                      </p>
                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => onNavigate('/contact#direct-contact-form')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] rounded-xs transition-colors cursor-pointer"
                        >
                          <span>Email {member.name} Today</span>
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </button>
                      )}
                    </div>

                    {/* Approved Social Profiles */}
                    {member.socialLinks.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-[#FDE047]">Verified Profiles</p>
                        <div className="flex flex-wrap gap-2">
                          {member.socialLinks.map((social) => (
                            <a
                              key={social.url}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium bg-[#1E3A8A] hover:bg-[#0F2350] text-[#F8FAFC] border border-[#FACC15]/50 rounded-sm transition-colors"
                            >
                              {renderSocialIcon(social.platform)}
                              <span>{social.platform}</span>
                              <ExternalLink className="w-3 h-3 text-[#FDE047]" aria-hidden="true" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-1 flex items-center justify-between text-[11px] text-[#F8FAFC]/60">
                      <span className="inline-flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-[#FACC15]" aria-hidden="true" />
                        Verified team directory record
                      </span>
                      <button
                        type="button"
                        onClick={() => handleClosePanel(member.slug)}
                        className="text-[#FDE047] hover:underline"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
