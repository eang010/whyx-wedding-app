"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WeddingDetails() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-babyblue-light rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-medium text-center mb-6 text-babyblue-dark">Ceremony Details</h3>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-babyblue-dark mt-1" />
            <div>
              <h4 className="font-medium">Date</h4>
              <p className="text-gray-600">Sunday, November 9, 2025</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-babyblue-dark mt-1" />
            <div>
              <h4 className="font-medium">Time</h4>
              <p className="text-gray-600">12:00 PM - 3:00 PM</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-babyblue-dark mt-1" />
            <div>
              <h4 className="font-medium">Location</h4>
              <p className="text-gray-600">Singapore Marriott Tang Plaza Hotel</p>
              <p className="text-gray-600">320 Orchard Rd, Singapore 238865</p>
              <Button variant="link" className="p-0 h-auto text-babyblue-dark hover:text-babyblue">
                <a href="https://maps.app.goo.gl/fiB8kTmW3HatZhp89" target="_blank" rel="noopener noreferrer">
                  View on Map
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
