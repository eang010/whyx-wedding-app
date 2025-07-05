"use client"

import { Button } from "@/components/ui/button"
// 1. Import the Heart icon
import { Calendar, Clock, MapPin, Heart, Plus } from "lucide-react"

export default function WeddingDetails() {
  const weddingDate = new Date("2025-11-09T12:30:00")
  const solemnizationDate = new Date("2025-11-09T11:30:00")
  
  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const createCalendarEvent = (type: 'ceremony' | 'solemnization') => {
    const isCeremony = type === 'ceremony'
    const date = isCeremony ? weddingDate : solemnizationDate
    const endDate = new Date(date.getTime() + (isCeremony ? 3 * 60 * 60 * 1000 : 30 * 60 * 1000)) // 3 hours for ceremony, 30 min for solemnization
    
    const title = isCeremony ? "Weihow & Yuxin's Wedding Ceremony" : "Weihow & Yuxin's Solemnization"
    const description = isCeremony 
      ? "Join us for our wedding ceremony and celebration!"
      : "Intimate solemnization ceremony for the signing of marriage documents."
    const location = "Singapore Marriott Tang Plaza Hotel, 320 Orchard Rd, Singapore 238865"
    
    // Google Calendar
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDateForCalendar(date)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`
    
    // Apple Calendar (ICS file)
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Weihow & Yuxin Wedding//Calendar Event//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDateForCalendar(date)}`,
      `DTEND:${formatDateForCalendar(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')
    
    const icsBlob = new Blob([icsContent], { type: 'text/calendar' })
    const icsUrl = URL.createObjectURL(icsBlob)
    
    return { googleUrl, icsUrl, title }
  }

  const handleAddToCalendar = (type: 'ceremony' | 'solemnization') => {
    const { googleUrl, icsUrl, title } = createCalendarEvent(type)
    
    // Try to detect if user is on mobile (iOS/Android)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    
    if (isMobile) {
      if (isIOS) {
        // For iOS, download ICS file
        const link = document.createElement('a')
        link.href = icsUrl
        link.download = `${title}.ics`
        link.click()
      } else {
        // For Android, open Google Calendar
        window.open(googleUrl, '_blank')
      }
    } else {
      // For desktop, show options
      const choice = window.confirm(
        `Add ${title} to calendar?\n\nClick OK for Google Calendar\nClick Cancel to download ICS file`
      )
      
      if (choice) {
        window.open(googleUrl, '_blank')
      } else {
        const link = document.createElement('a')
        link.href = icsUrl
        link.download = `${title}.ics`
        link.click()
      }
    }
    
    // Clean up the blob URL
    setTimeout(() => URL.revokeObjectURL(icsUrl), 1000)
  }
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
            <p className="text-gray-600">12:30 PM - 3:30 PM</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex gap-4 mb-6">
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

        {/* Add to Calendar Button */}
        <div className="flex justify-center pt-4 border-t border-gray-200">
          <Button 
            onClick={() => handleAddToCalendar('ceremony')}
            className="bg-babyblue-dark hover:bg-babyblue text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
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
            <strong>Solemnization:</strong> 11:30 AM - 12:00 PM
          </p>
          <p className="text-xs">
            An intimate ceremony for the signing of marriage documents. Limited seating available for those who wish to
            attend.
          </p>
        </div>
        <div className="flex justify-center mt-4 pt-3 border-t border-gray-200">
          <Button 
            onClick={() => handleAddToCalendar('solemnization')}
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-300 hover:bg-gray-100"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  )
}
