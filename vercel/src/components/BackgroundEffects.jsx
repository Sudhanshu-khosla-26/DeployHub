"use client"

import { useEffect, useRef } from "react"

function BackgroundEffects({ darkMode }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let particles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Create particles
    const createParticles = () => {
      particles = []
      const particleCount = Math.floor(window.innerWidth / 20)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: darkMode
            ? `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.random() * 0.5 + 0.1})`
            : `rgba(${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.random() * 0.3 + 0.1})`,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          blink: Math.random() > 0.95,
          blinkSpeed: Math.random() * 0.05 + 0.01,
        })
      }
    }

    createParticles()

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = darkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"
      ctx.lineWidth = 1

      // Vertical lines
      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.beginPath()

        // Handle blinking effect
        if (particle.blink) {
          particle.opacity = particle.opacity === undefined ? 1 : particle.opacity
          particle.opacity += particle.blinkDirection ? particle.blinkSpeed : -particle.blinkSpeed

          if (particle.opacity <= 0.1) {
            particle.blinkDirection = true
          } else if (particle.opacity >= 1) {
            particle.blinkDirection = false
          }

          ctx.globalAlpha = particle.opacity
        }

        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        ctx.globalAlpha = 1

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      // Random lightning effect (very rare)
      if (darkMode && Math.random() > 0.997) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add a timeout to clear the lightning
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }, 50)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [darkMode])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default BackgroundEffects

