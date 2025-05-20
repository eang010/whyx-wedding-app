import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample gallery images - replace with actual images
const galleryImages = [
  {
    src: "/images/1.jpg",
    alt: "Us at Greece",
    caption: "Quite a view but you are the only view I need",
  },
  {
    src: "/images/2.jpg",
    alt: "Adventure in the Rockiespenguin",
    caption: "You are my penguin",
  },
  {
    src: "/images/3.jpg",
    alt: "Adventure with you",
    caption: "You are the only one I want to adventure with",
  },
  {
    src: "/images/4.jpg",
    alt: "Engagement photo",
    caption: "The day we got engaged",
  },
  {
    src: "/images/5.jpg",
    alt: "Hokkaido Japan",
    caption: "Roses are red, violets are blue, I'm in love with you",
  },
  {
    src: "/images/6.jpg",
    alt: "Future with you",
    caption: "Future with you",
  },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8">
      <div className="aspect-[3/2] relative overflow-hidden rounded-xl">
        <Image
          src={galleryImages[currentIndex].src}
          alt={galleryImages[currentIndex].alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-lg font-medium text-center">
            {galleryImages[currentIndex].caption}
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="flex justify-center gap-2 mt-4">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-babyblue-dark" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
} 