"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useState } from "react";

export function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightbox, setIsLightbox] = useState(false);

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
        No photos available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 border border-[var(--border)] group">
        <img
          src={images[selectedIndex]}
          alt={`${title} - view ${selectedIndex + 1}`}
          className="h-full w-full object-cover transition-all duration-300"
        />

        <button
          type="button"
          onClick={() => setIsLightbox(true)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-black/70 group-hover:opacity-100"
          aria-label="Open full-screen image"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                selectedIndex === idx
                  ? "border-blue-600 ring-2 ring-blue-500/20 scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isLightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
        >
          <button
            type="button"
            onClick={() => setIsLightbox(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <img
            src={images[selectedIndex]}
            alt={`${title} - enlarged view ${selectedIndex + 1}`}
            className="max-h-[88vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />
          <div className="absolute bottom-5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
