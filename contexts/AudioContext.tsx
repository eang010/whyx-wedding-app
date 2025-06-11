"use client"

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react'

interface AudioContextType {
  isPlaying: boolean
  toggleAudio: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Function to handle first interaction
  const handleFirstInteraction = () => {
    if (!hasInteracted && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle play() promise rejection
        setIsPlaying(false)
      })
      setIsPlaying(true)
      setHasInteracted(true)
      // Remove the event listener after first interaction
      document.removeEventListener('click', handleFirstInteraction)
    }
  }

  // Add click listener when component mounts
  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction)
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
    }
  }, [hasInteracted])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(() => {
          // Handle play() promise rejection
          setIsPlaying(false)
        })
        setIsPlaying(true)
      }
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      <audio ref={audioRef} loop src="/audio/Forever and Ever and Always.mp3" />
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
} 