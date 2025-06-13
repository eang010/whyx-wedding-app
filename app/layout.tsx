"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AudioProvider } from "@/contexts/AudioContext"
import AudioControl from "@/components/audio-control"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AudioProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <AudioControl />
        </AudioProvider>
      </body>
    </html>
  )
}
