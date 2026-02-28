interface NameDisplayProps {
  isHovering: boolean
}

export default function NameDisplay({ isHovering }: NameDisplayProps) {
  return (
    <div 
      className="select-none"
      data-hoverable
    >
      <h1 
        className={`name-display text-4xl md:text-6xl lg:text-7xl font-medium transition-all duration-300 ${
          isHovering ? 'text-white mix-blend-difference' : 'text-black'
        }`}
      >
        <span className="block">Upesh</span>
        <span className="block">Bishwakarma</span>
      </h1>
      
      {/* Subtitle / Tagline */}
      <p 
        className={`mt-4 text-sm md:text-base tracking-widest uppercase transition-all duration-300 ${
          isHovering ? 'text-white/80 mix-blend-difference' : 'text-black/50'
        }`}
      >
        Creative Technologist
      </p>
    </div>
  )
}
