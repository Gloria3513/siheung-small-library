"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/types";

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };
  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="aspect-square rounded-lg overflow-hidden bg-warm-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            {image.imageUrl ? (
              <img
                src={image.imageUrl}
                alt={image.caption || `사진 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-warm-gray-400">
                <span className="text-3xl">📷</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-10"
            aria-label="닫기"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 p-2 text-white/80 hover:text-white z-10"
            aria-label="이전"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[80vh] px-16">
            {images[lightboxIndex].imageUrl ? (
              <img
                src={images[lightboxIndex].imageUrl}
                alt={images[lightboxIndex].caption || ""}
                className="max-w-full max-h-[75vh] object-contain mx-auto"
              />
            ) : (
              <div className="w-96 h-96 bg-warm-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-6xl">📷</span>
              </div>
            )}
            {images[lightboxIndex].caption && (
              <p className="text-center text-white/80 mt-4 text-sm">
                {images[lightboxIndex].caption}
              </p>
            )}
            <p className="text-center text-white/50 mt-1 text-xs">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>

          <button
            onClick={goNext}
            className="absolute right-4 p-2 text-white/80 hover:text-white z-10"
            aria-label="다음"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  );
}
