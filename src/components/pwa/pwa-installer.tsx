"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, Smartphone, MoreVertical, Share2, PlusSquare, Monitor, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstaller() {
  const [installPrompt, setInstallPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState<"android" | "ios" | "desktop">("desktop");
  const [showModal, setShowModal] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);
  const [installed, setInstalled] = React.useState(false);

  React.useEffect(() => {
    // 1. Register Service Worker immediately
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Hospital360 SW registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.debug("SW registration error:", err);
        });
    }

    // 2. Check if already running as installed app
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
    };
    checkStandalone();

    // 3. Detect device platform
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setDeviceType("ios");
    } else if (/android/.test(ua)) {
      setDeviceType("android");
    } else {
      setDeviceType("desktop");
    }

    // 4. Capture native beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).deferredInstallPrompt = e;
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setShowBanner(false);
      setShowModal(false);
      setInstallPrompt(null);
    };

    // 5. Global trigger event so any button on the website can launch the install flow
    const handleCustomTrigger = () => {
      setShowModal(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("open-pwa-install", handleCustomTrigger);

    // 6. Show banner after a slight delay (1.2s) unless already in app or dismissed in this session
    const isDismissed = sessionStorage.getItem("pwa_prompt_dismissed") === "true";
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setShowBanner(true);
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("open-pwa-install", handleCustomTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    // If native prompt is available (Chrome/Android), trigger it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prompt = installPrompt || (window as any).deferredInstallPrompt;
    if (prompt) {
      try {
        await prompt.prompt();
        const choice = await prompt.userChoice;
        if (choice.outcome === "accepted") {
          setInstalled(true);
          setShowBanner(false);
        }
      } catch (err) {
        console.error("Install prompt error:", err);
        setShowModal(true);
      }
    } else {
      // If browser doesn't support or hasn't fired beforeinstallprompt yet, open guided install dialog
      setShowModal(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("pwa_prompt_dismissed", "true");
  };

  if (isStandalone || installed) {
    return null;
  }

  return (
    <>
      {/* 1. Permanent Floating "Download App" button on mobile & desktop */}
      <aside
        aria-label="Download web app"
        className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6"
      >
        <button
          type="button"
          onClick={handleInstallClick}
          aria-label="Download Hospital360 Web Application"
          className="group flex items-center gap-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 border border-white/20 px-4 py-2.5 text-xs font-semibold text-white shadow-lifted backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="flex size-6 items-center justify-center rounded-full bg-primary text-white">
            <Download className="size-3.5" aria-hidden />
          </div>
          <span>Download App</span>
          <span className="hidden sm:inline-block rounded-full bg-emerald/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
            PWA
          </span>
        </button>
      </aside>

      {/* 2. Interactive Bottom Slide-Up Notification Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            role="alert"
            className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-primary/30 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl sm:bottom-20 sm:left-6 sm:right-auto sm:max-w-sm"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald text-white shadow-soft">
                <Smartphone className="size-6" aria-hidden />
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Download {site.name} App
                  </h3>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label="Close notification"
                    className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                </div>

                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  Install our lightweight app directly on your phone or PC. Instant OPD booking, doctor list & offline access.
                </p>

                <div className="mt-3.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary/90 px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="size-3.5" aria-hidden />
                    Install Now
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="rounded-xl px-3 py-2 text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Universal Guided Step-by-Step Installation Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-install-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900 text-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">
                    <Download className="size-5" />
                  </div>
                  <div>
                    <h4 id="pwa-install-modal-title" className="text-base font-bold">
                      Install {site.name} Web App
                    </h4>
                    <p className="text-xs text-white/60">
                      Works on Android, iPhone & PC without Play Store
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Device-Specific Steps */}
              <div className="mt-5 space-y-4 text-xs">
                {deviceType === "android" && (
                  <div className="space-y-3.5">
                    <p className="text-sm font-semibold text-emerald-400">
                      Follow these 3 simple steps in your Android browser:
                    </p>
                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Tap the Chrome Menu (3 dots)
                        </p>
                        <p className="text-white/60 mt-0.5">
                          Tap <MoreVertical className="inline size-3.5 text-primary" /> in the top-right corner of your browser.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Select &quot;Install App&quot; or &quot;Add to Home Screen&quot;
                        </p>
                        <p className="text-white/60 mt-0.5">
                          In the menu options, tap on <strong>Install App</strong> (or Add to Home Screen).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Tap &quot;Install&quot;
                        </p>
                        <p className="text-white/60 mt-0.5">
                          Confirm by tapping <strong>Install</strong>. Hospital360 will appear on your phone screen just like an APK app!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {deviceType === "ios" && (
                  <div className="space-y-3.5">
                    <p className="text-sm font-semibold text-emerald-400">
                      Follow these 3 steps on your iPhone / iPad (Safari):
                    </p>
                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Tap the Share button
                        </p>
                        <p className="text-white/60 mt-0.5">
                          Tap the <Share2 className="inline size-3.5 text-primary" /> Share icon at the bottom of Safari.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Tap &quot;Add to Home Screen&quot;
                        </p>
                        <p className="text-white/60 mt-0.5">
                          Scroll down in the share sheet and tap <PlusSquare className="inline size-3.5 text-primary" /> <strong>Add to Home Screen</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Tap &quot;Add&quot;
                        </p>
                        <p className="text-white/60 mt-0.5">
                          Tap <strong>Add</strong> in the top-right corner. The app will be installed on your iOS home screen!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {deviceType === "desktop" && (
                  <div className="space-y-3.5">
                    <p className="text-sm font-semibold text-emerald-400">
                      Install on Chrome / Edge (Laptop & PC):
                    </p>
                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Look at your Browser URL Address Bar
                        </p>
                        <p className="text-white/60 mt-0.5">
                          Look at the right side of the URL bar (near the bookmark star) for the <Monitor className="inline size-3.5 text-primary" /> <strong>Install</strong> or <strong>App Available</strong> icon.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          Click &quot;Install Hospital360&quot;
                        </p>
                        <p className="text-white/60 mt-0.5">
                          Click the icon and select <strong>Install</strong>. It will open in its own clean window without browser tabs!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 border border-emerald-500/20 text-emerald-300">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                  <p className="text-[11px]">
                    No download or storage space required — runs instantly at native speed!
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {installPrompt && (
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="flex-1 rounded-xl bg-primary py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Open Install Prompt
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
