import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, Cookie } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'acs_cookie_consent_v1';

interface CookiePreferences {
  status: 'accepted' | 'rejected' | 'custom';
  essential: boolean;
  analytics: boolean;
  thirdParty: boolean;
  updatedAt: string;
}

export const CookieConsentBanner: React.FC<{ onNavigate?: (path: string) => void }> = ({
  onNavigate,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(true);
  const [thirdPartyEnabled, setThirdPartyEnabled] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      } else {
        const parsed = JSON.parse(saved) as Partial<CookiePreferences>;
        setAnalyticsEnabled(Boolean(parsed.analytics));
        setThirdPartyEnabled(Boolean(parsed.thirdParty));
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (
    status: CookiePreferences['status'],
    analytics: boolean,
    thirdParty: boolean
  ) => {
    const prefs: CookiePreferences = {
      status,
      essential: true,
      analytics,
      thirdParty,
      updatedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage quota errors
    }
    setAnalyticsEnabled(analytics);
    setThirdPartyEnabled(thirdParty);
    setSettingsOpen(false);
    setVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent('accepted', true, true);
  };

  const handleReject = () => {
    saveConsent('rejected', false, false);
  };

  const handleSaveCustom = () => {
    saveConsent('custom', analyticsEnabled, thirdPartyEnabled);
  };

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        aria-label="Open cookie consent settings"
        className="fixed bottom-3 left-3 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-white bg-[#060B28]/90 hover:bg-[#0E6482] border border-[#38BDF8]/60 rounded-sm shadow-md transition-colors cursor-pointer"
      >
        <Cookie className="w-3.5 h-3.5 text-[#FEF08A]" aria-hidden="true" />
        <span>Cookie Settings</span>
      </button>
    );
  }

  return (
    <aside
      role="region"
      aria-label="Cookie consent notice"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#060B28] text-white border-t-2 border-[#0E6482] shadow-2xl"
    >
      {/* Expandable Cookie Settings Drawer */}
      {settingsOpen && (
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-5 pb-4 border-b border-white/15 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FEF08A]" aria-hidden="true" />
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FEF08A]">
                Cookie &amp; Third-Party Service Preferences
              </h3>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/privacy')}
                className="text-xs text-[#7DD3FC] hover:text-[#FEF08A] underline cursor-pointer"
              >
                View Privacy Policy
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-white/5 border border-white/15 rounded-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Essential Security Cookies</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-[#0E6482] text-[#FEF08A] rounded-xs">
                  Always Active
                </span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Required for secure candidate CV vault uploads, session integrity, and spam protection.
              </p>
            </div>

            <label className="p-3.5 bg-white/5 border border-white/15 hover:border-[#7DD3FC]/50 rounded-sm space-y-1 cursor-pointer block">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Analytics &amp; Performance</span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#0E6482]"
                />
              </div>
              <p className="text-white/75 leading-relaxed">
                Helps us measure executive search page engagement and improve responsiveness across devices.
              </p>
            </label>

            <label className="p-3.5 bg-white/5 border border-white/15 hover:border-[#7DD3FC]/50 rounded-sm space-y-1 cursor-pointer block">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Third-Party Services</span>
                <input
                  type="checkbox"
                  checked={thirdPartyEnabled}
                  onChange={(e) => setThirdPartyEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#0E6482]"
                />
              </div>
              <p className="text-white/75 leading-relaxed">
                Supports interactive search filters, external verification widgets, and preference storage.
              </p>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveCustom}
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#082F49] bg-[#FEF08A] hover:bg-[#FDE047] rounded-xs transition-colors cursor-pointer"
            >
              Save Selected Preferences
            </button>
          </div>
        </div>
      )}

      {/* Main Cookie Bar (Matches Screenshot 1 Layout & Proportions) */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <div className="text-xs sm:text-[13px] text-white text-center sm:text-left leading-relaxed">
          <span>This website uses cookies and third party services. </span>
          <button
            type="button"
            onClick={() => setSettingsOpen((prev) => !prev)}
            aria-expanded={settingsOpen}
            className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#FEF08A] underline underline-offset-4 transition-colors cursor-pointer"
          >
            <span>Settings</span>
            {settingsOpen ? (
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="min-w-[100px] sm:min-w-[116px] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white bg-[#0E6482] hover:bg-[#0284C7] transition-colors cursor-pointer"
          >
            OK
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="min-w-[116px] sm:min-w-[144px] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white bg-[#0E6482] hover:bg-[#0284C7] transition-colors cursor-pointer"
          >
            REJECT
          </button>
        </div>
      </div>
    </aside>
  );
};
