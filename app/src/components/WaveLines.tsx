import { useEffect, useRef } from 'react'

interface WaveLinesProps {
  mousePos: { x: number; y: number }
}

export default function WaveLines({ mousePos }: WaveLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const linesRef = useRef<Array<{
    y: number
    amplitude: number
    frequency: number
    phase: number
    speed: number
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize wave lines
    const lineCount = 12
    linesRef.current = Array.from({ length: lineCount }, (_, i) => ({
      y: (canvas.height / (lineCount + 1)) * (i + 1),
      amplitude: 15 + Math.random() * 20,
      frequency: 0.002 + Math.random() * 0.003,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    }))

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mouse influence
      const mouseInfluenceX = (mousePos.x / canvas.width - 0.5) * 2
      const mouseInfluenceY = (mousePos.y / canvas.height - 0.5) * 2

      linesRef.current.forEach((line, index) => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.03 + (index % 3) * 0.01})`
        ctx.lineWidth = 1

        // Adjust line Y based on mouse Y
        const adjustedY = line.y + mouseInfluenceY * 30 * Math.sin(index * 0.5)

        for (let x = 0; x <= canvas.width; x += 5) {
          const waveOffset = Math.sin(x * line.frequency + line.phase + time * line.speed) * line.amplitude
          const mouseOffset = mouseInfluenceX * 20 * Math.sin((x / canvas.width) * Math.PI)
          const y = adjustedY + waveOffset + mouseOffset

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      })

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
