import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import RsvpForm from "@/components/rsvp-form"

export default function RsvpPage() {
  return (
    <main className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-serif text-center mb-2">RSVP</h1>
            <p className="text-center text-gray-600 mb-8">
              Please let us know if you'll be joining us on our special day by November 9, 2025.
            </p>

            <RsvpForm />
          </div>
        </div>
      </div>
    </main>
  )
}
