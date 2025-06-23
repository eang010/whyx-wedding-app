"use client"

import { Button } from "@/components/ui/button"
// 1. Import the Heart icon
import { Calendar, Clock, MapPin, Heart } from "lucide-react"

export default function WeddingDetails() {
  return (
    <div className="space-y-6">
      {/* 2. Your existing Ceremony Details block */}
      <div className="bg-white border border-babyblue-light rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-medium text-center mb-6 text-babyblue-dark">Ceremony Details</h3>

        {/* Date */}
        <div className="flex gap-4 mb-6">
          <Calendar className="h-5 w-5 text-babyblue-dark mt-1" />
          <div>
            <h4 className="font-medium">Date</h4>
            <p className="text-gray-600">Sunday, November 9, 2025</p>
          </div>
        </div>

        {/* Time */}
        <div className="flex gap-4 mb-6">
          <Clock className="h-5 w-5 text-babyblue-dark mt-1" />
          <div>
            <h4 className="font-medium">Time</h4>
            <p className="text-gray-600">12:00 PM - 3:00 PM</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex gap-4">
          <MapPin className="h-5 w-5 text-babyblue-dark mt-1" />
          <div>
            <h4 className="font-medium">Location</h4>
            <p className="text-gray-600">Singapore Marriott Tang Plaza Hotel</p>
            <p className="text-gray-600">320 Orchard Rd, Singapore 238865</p>
            <Button variant="link" className="p-0 h-auto text-babyblue-dark hover:text-babyblue">
              <a
                href="https://maps.google.com/?q=Singapore+Marriott+Tang+Plaza+Hotel"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Add the new subtle solemnization details block here */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-4 w-4 text-gray-500" />
          <h4 className="font-medium text-gray-700">Pre-ceremony Event</h4>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">Optional</span>
        </div>
        <div className="text-gray-600 space-y-2">
          <p>
            <strong>Solemnization:</strong> 11:30 AM - 12:00 PM at Singapore Marriott Tang Plaza Hotel (Private Room)
          </p>
          <p className="text-xs">
            An intimate ceremony for the signing of marriage documents. Limited seating available for those who wish to
            attend.
          </p>
        </div>
      </div>
    </div>
  )
}
