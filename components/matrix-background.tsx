"use client"

import { useEffect, useRef } from "react"

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters - taken from the original Matrix movie
    const characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const charArray = characters.split("")

    const fontSize = 14
    const columns = canvas.width / fontSize

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100) // Start above the canvas
    }

    // Drawing the characters
    const draw = () => {
      // Black with opacity to create trail effect - REDUCED opacity for better visibility
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)" // Reduced opacity to make characters more visible
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Green text - INCREASED brightness
      ctx.fillStyle = "#0f0" // Bright green
      ctx.font = `${fontSize}px monospace`

      // Looping over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)]

        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Sending the drop back to the top randomly after it has crossed the screen
        // Adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Incrementing Y coordinate
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
