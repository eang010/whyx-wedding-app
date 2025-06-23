"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, Search, X, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const faqData = [
  {
    question: "Is it okay to take pictures with our phones and cameras during the wedding?",
    answer:
      "Yes! We would love for you to take photos and share them with us! Please feel free to capture moments throughout the ceremony and reception. We just ask that you be mindful of the professional photographers and avoid blocking their shots during key moments.",
    keywords: ["photos", "pictures", "cameras", "phones", "photography", "social media", "sharing"],
  },
  {
    question: "What should I wear to the wedding?",
    answer:
      "We recommend semi-formal to formal attire. For men, a suit or dress shirt with slacks is perfect. For women, a cocktail dress or elegant outfit would be lovely. Please avoid wearing white or ivory, as we'd like to reserve those colors for the bride.",
    keywords: ["dress code", "attire", "clothing", "outfit", "formal", "suit", "dress", "white", "colors"],
  },
  {
    question: "Will there be parking available at the venue?",
    answer:
      "Yes, St. Mary's Chapel has a parking lot with ample space for guests. Additional street parking is also available nearby. We recommend arriving 15-20 minutes early to find parking and get seated comfortably.",
    keywords: ["parking", "cars", "driving", "venue", "arrival", "transportation"],
  },
  {
    question: "What time should I arrive?",
    answer:
      "Please plan to arrive by 3:45 PM for the 4:00 PM ceremony. This will give you time to find parking, sign the guest book, and find your seat. If you're attending the solemnization at 2:30 PM, please arrive by 2:15 PM.",
    keywords: ["time", "arrival", "schedule", "when", "ceremony", "solemnization", "punctual"],
  },
  {
    question: "Will the ceremony be indoors or outdoors?",
    answer:
      "The ceremony will be held indoors at St. Mary's Chapel. The venue is climate-controlled, so you'll be comfortable regardless of the weather outside.",
    keywords: ["indoor", "outdoor", "weather", "venue", "location", "climate", "temperature"],
  },
  {
    question: "Is there a gift registry?",
    answer:
      "Your presence is the greatest gift! If you'd like to give something, we have a small registry at [Store Name] or monetary gifts are also appreciated. However, please don't feel obligated - celebrating with us is all we need.",
    keywords: ["gifts", "registry", "presents", "money", "donations", "wedding gifts"],
  },
  {
    question: "Will there be food and drinks at the reception?",
    answer:
      "Yes! We'll have a full dinner service starting at 7:00 PM, along with cocktails and hors d'oeuvres during the cocktail hour. We've made arrangements for various dietary restrictions - please let us know about any specific needs in your RSVP.",
    keywords: ["food", "drinks", "dinner", "cocktails", "reception", "meal", "catering", "alcohol", "bar"],
  },
  {
    question: "Can I bring my children?",
    answer:
      "We love children! Families with children are welcome at both the ceremony and reception. We'll have some kid-friendly meal options available. Please include children in your guest count when you RSVP.",
    keywords: ["children", "kids", "family", "babies", "minors", "child-friendly"],
  },
  {
    question: "What if I have dietary restrictions or food allergies?",
    answer:
      "Please let us know about any dietary restrictions or allergies in your RSVP form. Our catering team can accommodate most dietary needs including vegetarian, vegan, gluten-free, and common allergies.",
    keywords: ["dietary", "allergies", "vegetarian", "vegan", "gluten-free", "food restrictions", "special diet"],
  },
  {
    question: "Is there a hashtag for social media?",
    answer:
      "Yes! Please use #SarahAndMichaelWedding when posting photos on social media. We'd love to see all your pictures and memories from our special day!",
    keywords: ["hashtag", "social media", "instagram", "facebook", "twitter", "sharing", "photos"],
  },
  {
    question: "What happens if it rains?",
    answer:
      "Since our ceremony is indoors at St. Mary's Chapel, weather won't affect the main events. However, if you're planning to take outdoor photos, we recommend bringing an umbrella just in case!",
    keywords: ["rain", "weather", "backup plan", "indoor", "umbrella", "storm"],
  },
  {
    question: "How long will the reception last?",
    answer:
      "The reception will run from approximately 5:30 PM to 11:00 PM. This includes cocktail hour, dinner service, speeches, and dancing. You're welcome to stay for the entire celebration!",
    keywords: ["reception", "duration", "time", "schedule", "dancing", "party", "end time"],
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
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Frequently Asked Questions</h2>

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
          <span>Have another question?</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Feel free to</span>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-babyblue-dark text-babyblue-dark hover:bg-babyblue-dark hover:text-white"
            >
              <a href="https://t.me/sarahandmichaelwedding" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message us on Telegram
              </a>
            </Button>
            <span>or ask any member of the wedding party.</span>
          </div>
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
