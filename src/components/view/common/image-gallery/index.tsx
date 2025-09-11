// "use client"

// import type React from "react"

// import { useState } from "react"
// import Image from "next/image"
// import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

// interface GalleryImage {
//   id: number
//   src: string
//   alt: string
//   title?: string
// }

// interface ImageGalleryProps {
//   images: GalleryImage[]
//   columns?: number
// }

// export function ImageGallery({ images, columns = 4 }: ImageGalleryProps) {
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const openModal = (index: number) => {
//     setSelectedImageIndex(index)
//     setIsModalOpen(true)
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setSelectedImageIndex(null)
//   }

//   const goToPrevious = () => {
//     if (selectedImageIndex !== null && selectedImageIndex > 0) {
//       setSelectedImageIndex(selectedImageIndex - 1)
//     }
//   }

//   const goToNext = () => {
//     if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
//       setSelectedImageIndex(selectedImageIndex + 1)
//     }
//   }

//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (event.key === "ArrowLeft") {
//       goToPrevious()
//     } else if (event.key === "ArrowRight") {
//       goToNext()
//     } else if (event.key === "Escape") {
//       closeModal()
//     }
//   }

//   const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null

//   return (
//     <>
//       {/* Gallery Grid */}
//       <div
//         className={cn(
//           "grid gap-4",
//           columns === 2 && "grid-cols-1 sm:grid-cols-2",
//           columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
//           columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
//           columns === 5 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
//         )}
//       >
//         {images.map((image, index) => (
//           <div
//             key={image.id}
//             className="group relative overflow-hidden rounded-lg bg-muted cursor-pointer transition-all duration-300 hover:shadow-lg"
//             onClick={() => openModal(index)}
//           >
//             <div className="aspect-square relative">
//               <Image
//                 src={image.src || "/placeholder.svg"}
//                 alt={image.alt}
//                 fill
//                 className="object-cover transition-transform duration-300 group-hover:scale-105"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
//               />
//               {/* Overlay */}
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
//                 <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-8" />
//               </div>
//             </div>
//             {image.title && (
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
//                 <p className="text-white text-sm font-medium">{image.title}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent
//           className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none"
//           showCloseButton={false}
//           onKeyDown={handleKeyDown}
//         >
//           {currentImage && (
//             <div className="relative w-full h-full flex items-center justify-center">
//               {/* Close Button */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
//                 onClick={closeModal}
//               >
//                 <X className="size-6" />
//                 <span className="sr-only">Close</span>
//               </Button>

//               {/* Previous Button */}
//               {selectedImageIndex > 0 && (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
//                   onClick={goToPrevious}
//                 >
//                   <ChevronLeft className="size-8" />
//                   <span className="sr-only">Previous image</span>
//                 </Button>
//               )}

//               {/* Next Button */}
//               {selectedImageIndex < images.length - 1 && (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
//                   onClick={goToNext}
//                 >
//                   <ChevronRight className="size-8" />
//                   <span className="sr-only">Next image</span>
//                 </Button>
//               )}

//               {/* Main Image */}
//               <div className="relative max-w-full max-h-full">
//                 <Image
//                   src={currentImage.src || "/placeholder.svg"}
//                   alt={currentImage.alt}
//                   width={1200}
//                   height={800}
//                   className="max-w-full max-h-full object-contain"
//                   priority
//                 />
//               </div>

//               {/* Image Info */}
//               {currentImage.title && (
//                 <div className="absolute bottom-4 left-4 right-4 text-center">
//                   <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
//                     <h3 className="text-white text-lg font-semibold">{currentImage.title}</h3>
//                     <p className="text-white/80 text-sm">
//                       {selectedImageIndex + 1} of {images.length}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }
