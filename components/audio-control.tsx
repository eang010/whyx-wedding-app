import { useAudio } from "@/contexts/AudioContext"
import { Volume2, VolumeX } from "lucide-react"

export default function AudioControl() {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
      aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
    >
      {isPlaying ? (
        <Volume2 className="h-6 w-6 text-gray-800" />
      ) : (
        <VolumeX className="h-6 w-6 text-gray-800" />
      )}
    </button>
  )
} 