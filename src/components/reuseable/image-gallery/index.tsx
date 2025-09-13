import React, { useState, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: any[];
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  showThumbnails?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  children: React.ReactNode;
}

export function ImageGallery({
  images,
  className,
  aspectRatio = "landscape",
  showThumbnails = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  children,
}: ImageGalleryProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const downloadImage = useCallback(
    async (imageUrl: string, fileName: string) => {
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
    },
    []
  );

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p className="text-muted-foreground">No images to display</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  // Handle the image click to open gallery (wrap the children in a div)
  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div>
      {/* Render children with image click handler */}
      <div onClick={() => handleImageClick(0)} style={{ cursor: "pointer" }}>
        {children}
      </div>

      {/* Modal preview */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on outside click
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing on interaction outside
          className="sm:max-w-screen p-0 gap-0 bg-background overflow-y-auto max-h-screen rounded-none h-full scrollbar-hide border-none"
        >
          {/* close button */}
          <ul className="fixed flex items-center space-x-3 top-3 right-3">
            <li>
              {" "}
              <Download className="text-gray-400 size-5" />
            </li>
            <li
              onClick={() => setIsGalleryOpen(false)}
              className="cursor-pointer"
            >
              {" "}
              <X className="text-gray-400" />
            </li>
          </ul>

          <div className={cn("w-full max-w-4xl mx-auto", className)}>
            {/* Main Image Display */}
            <div className="relative group">
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg bg-muted",
                  aspectRatioClasses[aspectRatio]
                )}
              >
                <Image
                  width={1000}
                  height={1000}
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={goToPrevious}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={goToNext}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}

                {/* Control Buttons */}
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <Button
                    size="icon"
                    className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
                    onClick={() =>
                      downloadImage(
                        currentImage.src,
                        `image-${currentIndex + 1}.jpg`
                      )
                    }
                    aria-label="Download image"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {/* Fullscreen Button */}
                  <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
                        aria-label="View fullscreen"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
                      <div className="relative">
                        <Image
                          width={1000}
                          height={1000}
                          src={currentImage.src || "/placeholder.svg"}
                          alt={currentImage.alt}
                          className="w-full h-full max-h-[90vh] object-contain"
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <Button
                            size="icon"
                            className="bg-black/40 hover:bg-black/60 text-white"
                            onClick={() =>
                              downloadImage(
                                currentImage.src,
                                `image-${currentIndex + 1}.jpg`
                              )
                            }
                            aria-label="Download image"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            className="bg-black/40 hover:bg-black/60 text-white"
                            onClick={() => setIsFullscreen(false)}
                            aria-label="Close fullscreen"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Dots Indicator */}
              {showDots && images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-200",
                        index === currentIndex
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/75"
                      )}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {showThumbnails && images.length > 1 && (
              <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    className={cn(
                      "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200",
                      index === currentIndex
                        ? "border-primary scale-105"
                        : "border-transparent hover:border-muted-foreground/50"
                    )}
                    onClick={() => goToSlide(index)}
                    aria-label={`View image ${index + 1}: ${image.alt}`}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={image.thumbnail || image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Image Counter */}
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {currentIndex + 1} of {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
