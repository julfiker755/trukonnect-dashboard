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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImgBox } from "../Img-box";

interface ImageGalleryProps {
  images: string[];
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  children: React.ReactNode;
}

export function ImageGallery({
  images,
  className,
  aspectRatio = "landscape",
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  children,
}: ImageGalleryProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ top: "0%", left: "0%" });

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
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
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;
    const x = (mouseX / bounds.width) * 100;
    const y = (mouseY / bounds.height) * 100;

    setZoomStyle({ top: `${y}%`, left: `${x}%` });
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  const currentImage = images[currentIndex];

  return (
    <div>
      <div onClick={() => setIsGalleryOpen(true)} style={{ cursor: "pointer" }}>
        {children}
      </div>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-screen p-0 gap-0 bg-background overflow-y-auto max-h-screen rounded-none h-full scrollbar-hide border-none"
        >
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="fixed left-3 top-3 right-3">
            <div className="flex items-center space-x-5 justify-between">
              <div>
                {currentIndex + 1} of {images.length}
              </div>
              <div className="flex items-center space-x-2">
                <ZoomIn className="text-gray-400 size-6 cursor-pointer" />
                <ZoomOut className="text-gray-400 size-6 cursor-pointer" />
                <Download
                  onClick={() =>
                    downloadImage(currentImage, `image-${currentIndex + 1}.jpg`)
                  }
                  className="text-gray-400 size-5 cursor-pointer"
                />
                <div
                  onClick={() => setIsGalleryOpen(false)}
                  className="cursor-pointer"
                >
                  <X className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl h-[calc(100svh-100px)] flex flex-col items-center justify-center mx-auto">
            <div className="relative group">
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg max-w-4xl h-[70svh] bg-muted",
                  aspectRatioClasses[aspectRatio]
                )}
                onMouseMove={handleMouseMove}
                style={{ cursor: "zoom-in" }}
              >
                <Image
                  fill
                  src={currentImage || "/placeholder.svg"}
                  alt="image"
                  className="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${zoomStyle.left} ${zoomStyle.top}`,
                  }}
                />

                {images.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 cursor-pointer text-figma rounded-full backdrop-blur-2xl"
                      onClick={goToPrevious}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 cursor-pointer text-white rounded-full backdrop-blur-2xl"
                      onClick={goToNext}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {showThumbnails && images.length > 1 && (
              <div className="mt-4 flex space-x-2 fixed bottom-0 w-screen left-0 right-0 overflow-x-auto scrollbar-hide pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-27 h-24 cursor-pointer rounded-md border-2 transition-all duration-200",
                      index === currentIndex
                        ? "border-figma-primary"
                        : "border-transparent"
                    )}
                    onClick={() => goToSlide(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <ImgBox
                      src={image}
                      alt="img"
                      className="w-full h-full object-cover border"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
