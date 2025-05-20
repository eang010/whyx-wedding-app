import Image from "next/image"

// Sample gallery images - replace with actual images
const galleryImages = [
  {
    src: "/images/1.jpg",
    alt: "Us at Greece",
    caption: "Quite a view, but you are my only view",
  },
  {
    src: "/images/2.jpg",
    alt: "Adventure in the Rockiespenguin",
    caption: "Like penguins, let's be forever",
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
    caption: "Future with you and me",
  },
]

export default function ImageCarousel() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="relative overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mb-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="flex-none w-[85%] sm:w-[45%] md:w-[35%] snap-center pr-4"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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