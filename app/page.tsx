"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import CountdownTimer from "@/components/countdown-timer"
import WeddingDetails from "@/components/wedding-details"
import ImageCarousel from "@/components/image-carousel"
import WeddingFAQ from "@/components/wedding-faq"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Home() {
  // Wedding date - update with the actual date
  const weddingDate = new Date("2025-11-09T12:00:00")

  // Refs for scrolling
  const countdownRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // State for scroll detection
  const [showUpArrow, setShowUpArrow] = useState(false)

  // Function to scroll to details section
  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Function to scroll back to countdown section
  const scrollToCountdown = () => {
    countdownRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Function to scroll to gallery section
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const threshold = 100 // Show arrow when within 100px of bottom
      
      setShowUpArrow(scrollPosition >= documentHeight - threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="flex flex-col items-center">
      {/* Countdown Section - Full Height */}
      <div ref={countdownRef} className="relative w-full h-screen flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/5.jpg')",
            backgroundBlendMode: "overlay",
            backgroundPosition: "center 52%"
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-4 py-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">Weihow & Yuxin</h1>
          <p className="text-xl md:text-2xl text-white font-light mb-8">Save the date</p>

          {/* Countdown Timer */}
          <CountdownTimer targetDate={weddingDate} />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-babyblue-dark hover:bg-babyblue text-white">
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
              onClick={scrollToGallery}
            >
              View Gallery
            </Button>
          </div>
        </div>

        {/* Arrow Button at Bottom */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <button
            onClick={scrollToDetails}
            className="animate-bounce bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Scroll to details"
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Details Section - Initially Hidden Below Viewport */}
      <div ref={detailsRef} className="w-full relative">
        {/* Wedding Details Section */}
        <section className="w-full py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Our Special Day</h2>
            <WeddingDetails />
          </div>
        </section>

        {/* Our Story Section with Carousel */}
        <section ref={galleryRef} className="w-full py-16 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Our Story</h2>
            <p className="text-lg text-gray-700 mb-8">
              We met four years ago at a coffee shop and had a coffee & bagel. What started as a chance encounter turned into the love
              of a lifetime. We're excited to celebrate our special day with our closest friends and family.
            </p>
            <ImageCarousel />
          </div>
        </section>
        {/* FAQ Section */}
        <section className="w-full py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <WeddingFAQ />
          </div>
        </section>
      </div>

      {/* Up Arrow Button - Fixed position, bottom left, only shows at bottom */}
      {showUpArrow && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={scrollToCountdown}
            className="bg-white shadow-md border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2"
            aria-label="Scroll to countdown"
          >
            <ChevronUp className="h-4 w-4 text-babyblue-dark" />
            <span className="text-sm text-gray-700">Back to top</span>
          </button>
        </div>
      )}
    </main>
  )
}
