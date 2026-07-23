"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { galleryItems } from "@/data";
import { cn } from "@/lib/utils";
import { PlaceholderImage } from "@/components/shared/placeholder-image";

const spanClasses: Record<string, string> = {
  wide: "col-span-2",
  tall: "row-span-2",
  normal: "",
};

export function GalleryGrid() {
  const categories = React.useMemo(
    () => ["All", ...new Set(galleryItems.map((item) => item.category))],
    []
  );
  const [active, setActive] = React.useState("All");

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={cn(
              "min-h-11 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
              active === category
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-muted hover:border-primary/40 hover:text-primary"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 gap-4 auto-rows-[9rem] sm:auto-rows-[11rem] md:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl",
                spanClasses[item.span]
              )}
            >
              <PlaceholderImage
                seed={item.seed}
                label={item.title}
                minimal
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-dark/80 via-dark/10 to-transparent p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/70">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
