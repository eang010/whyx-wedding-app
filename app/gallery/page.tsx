import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function GalleryPage() {
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

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-serif text-center mb-2">Our Gallery</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            A collection of our favorite moments together. We can't wait to create more memories with you on our special
            day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-babyblue-dark hover:bg-babyblue">
            <Link href="/rsvp">RSVP to Our Wedding</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
