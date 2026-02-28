import { useEffect, useRef, useState } from 'react'
import {
  Zap,
  Video,
  Mic,
  GraduationCap,
  Rocket,
  Target,
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react'

interface FutureGoal {
  letter: string
  title: string
  description: string
  icon: React.ElementType
  color: string
}

const futureGoals: FutureGoal[] = [
  {
    letter: '1',
    title: '2026–2028: AI Education',
    description: 'Launch and grow aifrostudents.online — educational convergence of real-life skills and AI. Develop the Hyper-Personalised AI Assistant as a multi-agent system that delegates tasks.',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
  },
  {
    letter: '2',
    title: '2028–2032: Teleportation Prototype',
    description: 'Build a prototype device that teleports small physical objects — guided by human values. Explore sustainable power sources (solar and beyond).',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
  },
  {
    letter: '3',
    title: '2032–2036: Mars Quantum Link',
    description: 'Achieve the first Mars-to-Earth quantum link. Distance officially becomes history.',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    letter: 'T',
    title: 'Teleportation',
    description: 'Pushing the limits of technology and human potential. The dream of instant transport guided by physics and AI.',
    icon: Zap,
    color: 'from-red-500 to-orange-500',
  },
  {
    letter: 'C',
    title: 'Content Creation',
    description: 'Sharing knowledge and stories with the world. Building a voice that inspires and educates through video and writing.',
    icon: Video,
    color: 'from-yellow-500 to-amber-500',
  },
  {
    letter: 'P',
    title: 'Podcast',
    description: 'Voice to inspire and connect. Creating meaningful conversations about AI, culture, and the future.',
    icon: Mic,
    color: 'from-indigo-500 to-violet-500',
  },
]

export default function FuturePage() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [hoveredGoal, setHoveredGoal] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-tertiary to-dark-bg pointer-events-none" />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(215, 28, 33, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(215, 28, 33, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-red-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-pink-accent/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-20">
        <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-widest uppercase text-red-accent bg-red-accent/10 rounded-full border border-red-accent/20">
          Looking Ahead
        </span>
        <h2 className="text-display font-bold text-text-primary mb-4">
          THE <span className="gradient-text">FUTURE</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Building the future, one step at a time. These are the aspirations that drive me forward.
        </p>
      </div>

      {/* Goals Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureGoals.map((goal, index) => {
            const Icon = goal.icon
            const isVisible = visibleItems.has(index)
            const isHovered = hoveredGoal === index

            return (
              <div
                key={goal.title}
                ref={(el) => { itemRefs.current[index] = el }}
                data-index={index}
                className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredGoal(index)}
                onMouseLeave={() => setHoveredGoal(null)}
              >
                <div
                  className={`relative h-full p-6 bg-dark-card/80 backdrop-blur-sm rounded-2xl border transition-all duration-500 overflow-hidden ${isHovered
                    ? 'border-red-accent/50 scale-105 shadow-glow-red-lg'
                    : 'border-white/5 hover:border-white/10'
                    }`}
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-10' : ''
                      }`}
                  />

                  {/* Letter Badge */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 flex items-center justify-center">
                    <span
                      className={`text-4xl font-black bg-gradient-to-br ${goal.color} bg-clip-text text-transparent opacity-20 transition-all duration-500 ${isHovered ? 'opacity-40 scale-110' : ''
                        }`}
                    >
                      {goal.letter}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${goal.color} mb-4 transition-transform duration-500 ${isHovered ? 'scale-110 rotate-3' : ''
                        }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-red-accent transition-colors duration-300">
                      {goal.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {goal.description}
                    </p>

                    {/* Hover Indicator */}
                    <div
                      className={`mt-4 flex items-center gap-2 text-red-accent text-sm font-medium transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div
                    className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br ${goal.color} opacity-0 rounded-tl-full transition-opacity duration-500 ${isHovered ? 'opacity-5' : ''
                      }`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Vision Statement */}
        <div className="mt-20 text-center">
          <div
            ref={(el) => { itemRefs.current[futureGoals.length] = el }}
            data-index={futureGoals.length}
            className={`relative inline-block max-w-3xl mx-auto p-8 md:p-12 transition-all duration-700 ${visibleItems.has(futureGoals.length) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            {/* Decorative Frame */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-accent/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-accent/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-red-accent/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-accent/30 rounded-br-2xl" />

            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-accent/10 rounded-full pulse-glow">
                <Rocket className="w-8 h-8 text-red-accent" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              My <span className="gradient-text">Vision</span>
            </h3>

            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              I believe in the power of continuous learning and effective communication.
              In this AI era, the ability to ask the right questions, delegate with precision,
              and communicate clearly is what separates those who thrive from those who merely survive.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-full border border-white/5">
                <Target className="w-4 h-4 text-red-accent" />
                <span className="text-sm text-muted-foreground">Goal-Oriented</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-full border border-white/5">
                <Sparkles className="w-4 h-4 text-red-accent" />
                <span className="text-sm text-muted-foreground">Innovation-Driven</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-full border border-white/5">
                <Zap className="w-4 h-4 text-red-accent" />
                <span className="text-sm text-muted-foreground">Action-Focused</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-dark-card/80 backdrop-blur-sm rounded-2xl border border-white/5">
            <div className="text-left">
              <h4 className="text-lg font-semibold text-text-primary">Let&apos;s Connect</h4>
              <p className="text-sm text-muted-foreground">Have a project or opportunity in mind?</p>
            </div>
            <a
              href="mailto:upeshinmars42@gmail.com"
              className="btn-primary flex items-center gap-2 px-6 py-3 bg-red-accent text-white font-semibold rounded-lg hover:bg-red-hover transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
