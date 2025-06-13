import Link from "next/link"
import { Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-4 px-4 border-t">
      <div className="container mx-auto flex justify-center items-center gap-2 text-sm text-gray-600">
        <span>Made with ❤️ by</span>
        <Link 
              href="https://www.linkedin.com/in/emilyang20/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors text-babyblue-dark"
            >
              Emily
              <Linkedin className="h-2.5 w-2.5" />
            </Link>
      </div>
    </footer>
  )
} 