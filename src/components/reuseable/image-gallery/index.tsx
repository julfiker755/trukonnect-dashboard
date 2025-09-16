"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Download,
  ListRestart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImgBox } from "../Img-box";

interface ImageGalleryProps {
  images: string[];
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  children: React.ReactNode;
}

export function ImageGallery({
  images,
  aspectRatio = "landscape",
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  children,
}: ImageGalleryProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [origin, setOrigin] = useState("center center");

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetZoom();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetZoom();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetZoom();
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setOrigin("center center");
  };

  const downloadImage = async (imageUrl: string, fileName: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomLevel === 1) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  return (
    <div>
      <div onClick={() => setIsGalleryOpen(true)} className="cursor-pointer">
        {children}
      </div>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent
          className="sm:max-w-screen p-0 bg-background h-full overflow-hidden rounded-none border-none"
          showCloseButton={false}
        >
          <DialogHeader className="hidden">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>

          {/* Top Bar */}
          <div className="fixed top-3 left-3 right-3 flex justify-between items-center z-10">
            <span className="text-sm">
              {currentIndex + 1} of {images.length}
            </span>
            <div className="flex space-x-4 items-center">
              <ListRestart
                onClick={() => setZoomLevel(1)}
                className="text-gray-400 size-6 cursor-pointer"
              />
              <ZoomIn
                onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 5))}
                className="text-gray-400 size-6 cursor-pointer"
              />
              <ZoomOut
                onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))}
                className="text-gray-400 size-6 cursor-pointer"
              />
              <Download
                onClick={() =>
                  downloadImage(currentImage, `image-${currentIndex + 1}.jpg`)
                }
                className="text-gray-400 size-5 cursor-pointer"
              />
              <X
                onClick={() => setIsGalleryOpen(false)}
                className="text-gray-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Image Viewer */}
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <div
              className={cn(
                "relative overflow-hidden border border-gray-500/50 bg-figma-gray/2 rounded-lg max-w-4xl w-full h-[70vh]",
                aspectRatioClasses[aspectRatio]
              )}
              onMouseMove={handleMouseMove}
            >
              <picture>
                <img
                  src={currentImage || "/placeholder.svg"}
                  alt="image"
                  className={cn(
                    "w-full h-full object-contain transition-transform duration-300 select-none",
                    zoomLevel > 1 ? "cursor-move" : "cursor-zoom-in"
                  )}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: origin,
                  }}
                  draggable={false}
                />
              </picture>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full backdrop-blur-xl"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full backdrop-blur-xl"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {showThumbnails && images.length > 1 && (
            <div className="mt-3 flex space-x-2 fixed bottom-0 w-full overflow-x-auto scrollbar-hide pb-2 bg-background/70 backdrop-blur">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-20 h-16 rounded-md border-2 flex-shrink-0",
                    index === currentIndex
                      ? "border-figma-primary"
                      : "border-transparent"
                  )}
                  onClick={() => goToSlide(index)}
                >
                  <ImgBox
                    src={image}
                    alt="thumb"
                    className="w-full h-full object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
