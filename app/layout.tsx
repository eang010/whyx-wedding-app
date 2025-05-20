"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AudioProvider } from "@/contexts/AudioContext"
import AudioControl from "@/components/audio-control"

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
          {children}
          <AudioControl />
        </AudioProvider>
      </body>
    </html>
  )
}
