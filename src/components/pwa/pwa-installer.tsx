"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, Smartphone, Check, Share2 } from "lucide-react";
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
  const [isIos, setIsIos] = React.useState(false);
  const [showIosGuide, setShowIosGuide] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [installed, setInstalled] = React.useState(false);

  React.useEffect(() => {
    // 1. Register Service Worker
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "localhost")
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch((err) => console.debug("SW registration error:", err));
      });
    }

    // 2. Check standalone mode (already installed & opened as app)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
    };
    checkStandalone();

    // 3. Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !(window as any).MSStream;
    setIsIos(isIosDevice);

    // 4. Capture beforeinstallprompt for Chrome, Edge, Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    // 5. Track if appinstalled event fires
    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setInstalled(true);
        }
      } catch (err) {
        console.error("Install prompt error:", err);
      } finally {
        setInstallPrompt(null);
      }
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  // Do not render anything if already running as standalone app, or if dismissed
  if (isStandalone || installed || dismissed) {
    return null;
  }

  // Show banner only when installPrompt is available OR on iOS (if user hasn't dismissed)
  const canInstall = Boolean(installPrompt || isIos);
  if (!canInstall) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        <motion.aside
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Install Hospital360 Web Application"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-4 shadow-lifted backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald text-white shadow-soft">
              <Smartphone className="size-5.5" aria-hidden />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Download {site.name} App
                </h3>
                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  aria-label="Dismiss app download notification"
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                Install as a lightweight app on your phone or PC for instant appointments & offline access.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
                >
                  <Download className="size-3.5" aria-hidden />
                  {isIos ? "How to Install" : "Install App"}
                </button>
                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* iOS Instructions Modal */}
      <AnimatePresence>
        {showIosGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-modal-title"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h4
                  id="ios-modal-title"
                  className="text-base font-semibold text-foreground"
                >
                  Install on iPhone / iPad
                </h4>
                <button
                  type="button"
                  onClick={() => setShowIosGuide(false)}
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Close dialog"
                >
                  <X className="size-5" />
                </button>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                To download and install this web application on your Apple device:
              </p>

              <ol className="mt-4 space-y-3 text-xs text-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                    1
                  </span>
                  <span>
                    Tap the <strong>Share</strong> button{" "}
                    <Share2 className="inline size-3.5 text-primary ml-1" /> in Safari.
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                    2
                  </span>
                  <span>
                    Scroll down and tap <strong>Add to Home Screen</strong>.
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                    3
                  </span>
                  <span>
                    Tap <strong>Add</strong> in the top-right corner.
                  </span>
                </li>
              </ol>

              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                className="mt-5 w-full rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
