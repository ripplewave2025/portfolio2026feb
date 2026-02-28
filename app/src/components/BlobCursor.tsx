import { useEffect, useRef, useState } from 'react'

interface BlobCursorProps {
  mousePos: { x: number; y: number }
  onHoverChange: (isHovering: boolean) => void
}

interface TrailBlob {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

export default function BlobCursor({ mousePos, onHoverChange }: BlobCursorProps) {
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<TrailBlob[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const trailIdRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  // Smooth follow with lag
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPos(prev => ({
        x: lerp(prev.x, mousePos.x, 0.12),
        y: lerp(prev.y, mousePos.y, 0.12),
      }))

      // Calculate speed for trail intensity
      const dx = mousePos.x - lastPosRef.current.x
      const dy = mousePos.y - lastPosRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Add trail blobs based on speed
      if (speed > 5 && Math.random() > 0.7) {
        const newTrail: TrailBlob = {
          id: trailIdRef.current++,
          x: smoothPos.x,
          y: smoothPos.y,
          size: Math.max(20, 60 - speed * 0.5),
          opacity: Math.min(0.5, speed * 0.02),
        }
        setTrails(prev => [...prev.slice(-8), newTrail])
      }

      lastPosRef.current = { x: mousePos.x, y: mousePos.y }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mousePos, smoothPos])

  // Fade out trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => 
        prev
          .map(trail => ({ ...trail, opacity: trail.opacity * 0.9, size: trail.size * 0.95 }))
          .filter(trail => trail.opacity > 0.01)
      )
    }, 30)

    return () => clearInterval(interval)
  }, [])

  // Show cursor after initial mouse move
  useEffect(() => {
    if (mousePos.x > 0 || mousePos.y > 0) {
      setIsVisible(true)
    }
  }, [mousePos])

  // Detect if hovering over interactive elements
  useEffect(() => {
    const checkHover = () => {
      const element = document.elementFromPoint(mousePos.x, mousePos.y)
      const isOverInteractive = element?.closest('a, button, [data-hoverable]') !== null
      onHoverChange(isOverInteractive || isVisible)
    }

    checkHover()
  }, [mousePos, isVisible, onHoverChange])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div 
      className="blob-cursor"
      style={{
        left: smoothPos.x,
        top: smoothPos.y,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Main Blob */}
      <div 
        className="blob-main"
        style={{
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Trail Blobs */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="blob-trail"
          style={{
            left: trail.x - smoothPos.x,
            top: trail.y - smoothPos.y,
            width: trail.size,
            height: trail.size,
            opacity: trail.opacity,
          }}
        />
      ))}
    </div>
  )
}
