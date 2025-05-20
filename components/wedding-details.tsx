"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

export default function WeddingDetails() {
  return (
    <div className="space-y-6">
      {/* Ceremony Details */}
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
    </div>
  )
}
