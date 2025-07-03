import Image from "next/image"
import { useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample gallery images - replace with actual images
const galleryImages = [
  {
    src: "/images/1.jpg",
    alt: "Us at Greece",
    caption: "Quite a view, but you are my only view",
  },
  {
    src: "/images/2.jpg",
    alt: "有山有海，有你有我",
    caption: "有山有海，有你和我",
  },
  {
    src: "/images/3.jpg",
    alt: "Hokkaido Japan",
    caption: "Roses are red, violets are blue, I'm in love with you",
  },
  {
    src: "/images/4.jpg",
    alt: "My home",
    caption: "My home is where you are",
  },
  {
    src: "/images/5.jpg",
    alt: "Engagement photo",
    caption: "The day we got engaged",
  },
  {
    src: "/images/6.jpg",
    alt: "Adventure with you",
    caption: "The adventure awaits",
  },
  {
    src: "/images/7.jpg",
    alt: "Beach day",
    caption: "Sandy beaches, blue skies, and you",
  },
  {
    src: "/images/8.jpg",
    alt: "Swing along",
    caption: "Swinging with you into the future",
  },
  {
    src: "/images/9.jpg",
    alt: "Future with you",
    caption: "Ah, the future is bright",
  },
  {
    src: "/images/11.jpg",
    alt: "Snowy day",
    caption: "Cold but warm",
  },
  {
    src: "/images/10.jpg",
    alt: "You and I",
    caption: "You and I, together forever",
  },
]

export default function ImageCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8 // Scroll by 80% of container width
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="relative group">
        {/* Left Arrow - Hidden on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Right Arrow - Hidden on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mb-6 scroll-smooth"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="flex-none w-[85%] sm:w-[45%] md:w-[35%] snap-center pr-4"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl group/image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover/image:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium text-center">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  )
} 