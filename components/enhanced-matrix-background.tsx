"use client"

import { useEffect, useRef } from "react"

export function EnhancedMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen with higher resolution for better quality
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters - taken from the original Matrix movie
    const characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const charArray = characters.split("")

    const fontSize = 14
    const columns = Math.ceil(window.innerWidth / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100) // Start above the canvas
    }

    // Array to track the brightness of each column
    const brightness: number[] = []
    for (let i = 0; i < columns; i++) {
      brightness[i] = Math.random() * 0.5 + 0.5 // Random brightness between 0.5 and 1
    }

    // Drawing the characters
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)" // More transparent for better visibility
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      // Looping over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)]

        // Vary the green color for a more dynamic effect
        const green = Math.floor(brightness[i] * 255)
        ctx.fillStyle = `rgba(0, ${green}, 0, ${brightness[i]})`
        ctx.font = `${fontSize}px monospace`

        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Sending the drop back to the top randomly after it has crossed the screen
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0
          // Randomize brightness when resetting
          brightness[i] = Math.random() * 0.5 + 0.5
        }

        // Incrementing Y coordinate
        drops[i]++
      }
    }

    // Run the animation at 60fps
    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" style={{ zIndex: 0, display: "block" }} />
}
