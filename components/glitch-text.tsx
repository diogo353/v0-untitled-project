"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    let isMounted = true

    const glitchEffect = () => {
      if (!isMounted) return

      // 10% chance to trigger glitch effect
      if (Math.random() > 0.9) {
        const originalText = text

        // Create glitched version
        const glitchedText = originalText
          .split("")
          .map((char) => {
            // 30% chance to replace character
            if (Math.random() > 0.7) {
              const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`"
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join("")

        // Display glitched text briefly
        setDisplayText(glitchedText)

        // Revert back to original after a short delay
        setTimeout(() => {
          if (isMounted) {
            setDisplayText(originalText)
          }
        }, 100)
      }
    }

    const intervalId = setInterval(glitchEffect, 2000)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [text])

  return <span className={className}>{displayText}</span>
}
