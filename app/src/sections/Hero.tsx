import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronDown, Mail } from 'lucide-react'

interface HeroProps {
  onExplore: () => void
}

export default function Hero({ onExplore }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Content animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return

    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePos({ x, y })
    if (!isHovering) setIsHovering(true)
  }, [isHovering])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    hero.addEventListener('mousemove', handleMouseMove, { passive: true })
    hero.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    hero.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
      hero.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter])

  // Wave lines canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const lines: Array<{
      y: number
      amplitude: number
      frequency: number
      phase: number
      speed: number
    }> = []

    const lineCount = 8
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        y: (canvas.height / (lineCount + 1)) * (i + 1),
        amplitude: 8 + Math.random() * 12,
        frequency: 0.001 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
      })
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseInfluenceX = isHovering ? ((mousePos.x / 100) - 0.5) * 2 : 0
      const mouseInfluenceY = isHovering ? ((mousePos.y / 100) - 0.5) * 2 : 0

      lines.forEach((line, index) => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 + (index % 3) * 0.01})`
        ctx.lineWidth = 1

        const adjustedY = line.y + mouseInfluenceY * 15 * Math.sin(index * 0.5)

        for (let x = 0; x <= canvas.width; x += 10) {
          const waveOffset = Math.sin(x * line.frequency + line.phase + time * line.speed) * line.amplitude
          const mouseOffset = mouseInfluenceX * 12 * Math.sin((x / canvas.width) * Math.PI)
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
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mousePos, isHovering])

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-dark-bg">
      {/* Base Layer - Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-[#0a0a0a] to-dark-bg" />

      {/* Photo Layer - Revealed by mask at cursor position */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-100"
        style={{
          backgroundImage: 'url(/headshot.jpg)',
          maskImage: isHovering
            ? `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 70%)`
            : 'none',
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 70%)`
            : 'none',
        }}
      />

      {/* Secondary reveal spots for navbar and social areas */}
      {isHovering && (
        <>
          {/* Top area for navbar */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/headshot.jpg)',
              maskImage: `radial-gradient(circle 80px at ${mousePos.x}% ${Math.min(mousePos.y, 15)}%, black 0%, transparent 60%)`,
              WebkitMaskImage: `radial-gradient(circle 80px at ${mousePos.x}% ${Math.min(mousePos.y, 15)}%, black 0%, transparent 60%)`,
              opacity: mousePos.y < 20 ? 0.7 : 0,
              transition: 'opacity 0.2s ease',
            }}
          />
          {/* Bottom area for social icons */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/headshot.jpg)',
              maskImage: `radial-gradient(circle 80px at ${mousePos.x}% ${Math.max(mousePos.y, 85)}%, black 0%, transparent 60%)`,
              WebkitMaskImage: `radial-gradient(circle 80px at ${mousePos.x}% ${Math.max(mousePos.y, 85)}%, black 0%, transparent 60%)`,
              opacity: mousePos.y > 80 ? 0.7 : 0,
              transition: 'opacity 0.2s ease',
            }}
          />
        </>
      )}

      {/* Gradient orbs for atmosphere */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-accent/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-pink-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Wave Lines Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Blob Cursor Visual */}
      {isHovering && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          {/* Main blob ring */}
          <div
            className="w-[280px] h-[280px] rounded-[45%_55%_65%_35%/50%_45%_55%_50%] border-2 border-white/20"
            style={{
              animation: 'blobMorph 5s ease-in-out infinite',
              boxShadow: '0 0 40px rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.05)',
            }}
          />
          {/* Inner blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-[55%_45%_35%_65%/45%_55%_45%_55%] border border-white/10"
            style={{
              animation: 'blobMorph 4s ease-in-out infinite reverse',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-between p-6 md:p-10 lg:p-12">
        {/* Top Section - Name */}
        <div
          className={`transition-all duration-1000 delay-300 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[0.95] tracking-tight">
            <span className="block text-text-primary">Upesh</span>
            <span className="block gradient-text">Bishwakarma</span>
          </h1>
          <p className="mt-3 text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Creative Technologist
          </p>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Greeting */}
          <div
            className={`transition-all duration-1000 delay-500 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <span className="inline-block px-4 py-2 mb-6 text-xs md:text-sm font-medium tracking-widest uppercase text-red-accent bg-red-accent/10 rounded-full border border-red-accent/20">
              Any sufficiently advanced technology is indistinguishable from magic
            </span>
          </div>

          {/* Tagline */}
          <p
            className={`text-xl sm:text-2xl md:text-3xl text-text-secondary font-light mb-4 transition-all duration-1000 delay-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            From the hills of{' '}
            <span className="text-red-accent font-medium">Lamahatta, Darjeeling</span> — building the world of{' '}
            <span className="text-red-accent font-medium">AI & technology</span>
          </p>

          {/* Subtitle */}
          <p
            className={`text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-10 transition-all duration-1000 delay-900 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            AI Builder | Creative Technologist | Content Creator | Quantum Dreamer
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1100 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <button
              onClick={onExplore}
              className="btn-primary px-6 py-3 md:px-8 md:py-4 bg-red-accent text-white text-sm md:text-base font-semibold uppercase tracking-wider rounded-lg hover:bg-red-hover transition-all duration-300"
            >
              Explore My Journey
            </button>
            <a
              href="mailto:upeshinmars42@gmail.com"
              className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/5 text-text-primary text-sm md:text-base font-semibold uppercase tracking-wider rounded-lg border border-white/10 hover:bg-white/10 hover:border-red-accent/50 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-1000 delay-1300 ${contentVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Email - Bottom Left */}
          <a
            href="mailto:upeshinmars42@gmail.com"
            className="text-xs md:text-sm text-muted-foreground hover:text-red-accent transition-colors"
          >
            upeshinmars42@gmail.com
          </a>

          {/* Social Links - Bottom Right */}
          <div className="flex items-center gap-4 md:gap-5">
            <a href="https://github.com/ripplewave2025" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-red-accent transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://x.com/upeshinmars" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-red-accent transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://www.instagram.com/hotbpoison" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-red-accent transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://www.youtube.com/@techinahurry-A" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-red-accent transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="https://www.threads.com/@hotbpoison" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-red-accent transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.647-3.093 1.647-4.343v-1.002H12.18v-2.2h7.864v1.146c0 3.29-.77 5.36-2.29 7.15-1.93 2.27-4.59 3.423-7.91 3.423l-.638-.007z" /></svg>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-20 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1500 ${contentVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <button
            onClick={onExplore}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-red-accent transition-colors duration-300"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  )
}
