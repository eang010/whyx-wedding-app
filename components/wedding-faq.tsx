"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, Search, X, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const faqData = [
  {
    question: "When is the RSVP deadline?",
    answer:
      "The RSVP deadline is 1st September 2025. Please RSVP by then to ensure we have enough food and drinks for everyone.",
    keywords: ["RSVP", "deadline"],
  },
  {
    question: "Is it okay to take pictures with our phones and cameras during the wedding?",
    answer:
      "Yes! We would love for you to take photos and share them with us! Please feel free to capture moments throughout the ceremony and reception. We just ask that you be mindful of the professional photographers and avoid blocking their shots during key moments.",
    keywords: ["photos", "pictures", "cameras", "phones", "photography", "social media", "sharing"],
  },
  {
    question: "What should I wear to the wedding?",
    answer:
      "We recommend semi-formal to formal attire. For men, a suit or dress shirt with slacks is perfect. For women, a dress or elegant outfit would be lovely.",
    keywords: ["dress code", "attire", "clothing", "outfit", "formal", "suit", "dress", "white", "colors"],
  },
  {
    question: "Will there be parking available at the venue?",
    answer:
      "Yes, Singapore Marriott Tang Plaza Hotel has a parking lot with ample space for guests. We recommend arriving 15-20 minutes early to find parking and get seated comfortably. Alternatively, Orchard MRT station is just a short walk away.",
    keywords: ["parking", "cars", "driving", "venue", "arrival", "transportation"],
  },
  {
    question: "What time should I arrive?",
    answer:
      "Please plan to arrive by 11:30 AM for the 12:00 PM ceremony. This will give you time to find parking, sign the guest book, and find your seat. If you're attending the solemnization at 11:30 AM, please arrive by 11:15 AM.",
    keywords: ["time", "arrival", "schedule", "when", "ceremony", "solemnization", "punctual"],
  },
  {
    question: "Can I bring my children?",
    answer:
      "We love children! Families with children are welcome at the ceremony. We'll have some kid-friendly meal options available. Please include children in your guest count when you RSVP.",
    keywords: ["children", "kids", "family", "babies", "minors", "child-friendly"],
  },
  {
    question: "Is there a hashtag for social media?",
    answer:
      "Yes! Please use #WHYX when posting photos on social media. We'd love to see all your pictures and memories from our special day!",
    keywords: ["hashtag", "social media", "instagram", "facebook", "twitter", "sharing", "photos"],
  },
]

export default function WeddingFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const clearSearch = () => {
    setSearchTerm("")
    setOpenItems([])
  }

  // Filter FAQ items based on search term
  const filteredFAQ = useMemo(() => {
    if (!searchTerm.trim()) {
      return faqData.map((item, index) => ({ ...item, originalIndex: index }))
    }

    const searchLower = searchTerm.toLowerCase()
    return faqData
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => {
        const questionMatch = item.question.toLowerCase().includes(searchLower)
        const answerMatch = item.answer.toLowerCase().includes(searchLower)
        const keywordMatch = item.keywords.some((keyword) => keyword.toLowerCase().includes(searchLower))
        return questionMatch || answerMatch || keywordMatch
      })
  }, [searchTerm])

  // Auto-expand items when searching
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim()) {
      // Auto-expand all filtered results
      const filteredIndexes = filteredFAQ.map((item) => item.originalIndex)
      setOpenItems(filteredIndexes)
    } else {
      // Collapse all when search is cleared
      setOpenItems([])
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Questions?</h2>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search FAQ (e.g., 'parking', 'dress code')"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            {filteredFAQ.length === 0
              ? "No questions found. Try different keywords."
              : `Found ${filteredFAQ.length} question${filteredFAQ.length === 1 ? "" : "s"}`}
          </p>
        )}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQ.length === 0 && searchTerm ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No questions match your search.</p>
            <p className="text-sm text-gray-400">
              Try searching for terms like "photos", "dress code", "parking", "food", or "children"
            </p>
          </div>
        ) : (
          filteredFAQ.map((faq, displayIndex) => (
            <div key={faq.originalIndex} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <button
                onClick={() => toggleItem(faq.originalIndex)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 pr-4">
                  {searchTerm ? <HighlightedText text={faq.question} searchTerm={searchTerm} /> : faq.question}
                </h3>
                {openItems.includes(faq.originalIndex) ? (
                  <ChevronUp className="h-5 w-5 text-babyblue-dark flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-babyblue-dark flex-shrink-0" />
                )}
              </button>

              {openItems.includes(faq.originalIndex) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {searchTerm ? <HighlightedText text={faq.answer} searchTerm={searchTerm} /> : faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact Section with Telegram Link */}
      <div className="mt-8 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-600 text-sm">
          <span>Have another question? Do reach out to us! 📞</span>
        </div>
      </div>
    </div>
  )
}

// Component to highlight search terms in text
function HighlightedText({ text, searchTerm }: { text: string; searchTerm: string }) {
  if (!searchTerm.trim()) return <>{text}</>

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-babyblue-light/50 px-1 rounded">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
