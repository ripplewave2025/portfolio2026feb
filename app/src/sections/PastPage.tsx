import { useEffect, useRef, useState } from 'react'
import {
  Baby,
  GraduationCap,
  School,
  Hotel,
  Utensils,
  Plane,
  Building2,
  PhoneCall,
  Headphones,
  Star,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: React.ElementType
  side: 'left' | 'right'
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 'Birth',
    title: 'Born in Lamahatta, Darjeeling',
    description: 'Born in the hills. Loved physics and computers (my first love). When I first saw a cellphone, I instantly knew one day we would watch TV on it. Communication is the real superpower.',
    icon: Baby,
    side: 'left',
  },
  {
    year: '2009',
    title: 'Lamahatta High School',
    description: 'Completed high school. Developed a love for science and physics. English became a strong subject.',
    icon: School,
    side: 'right',
  },
  {
    year: '2010-2012',
    title: 'DGHSS Higher Secondary',
    description: 'Science stream. Continued building my academic foundation while discovering my passion for technology.',
    icon: GraduationCap,
    side: 'left',
  },
  {
    year: '2012',
    title: 'Food Craft Institute',
    description: 'Diploma in Front Office Operations. Learned the fundamentals of hospitality and customer service.',
    icon: Building2,
    side: 'right',
  },
  {
    year: '2012-2013',
    title: 'Ramada Hotel Kerala',
    description: 'Training period in Cochin. Aced the training and gained hands-on experience in hotel operations.',
    icon: Hotel,
    side: 'left',
  },
  {
    year: '2013-2015',
    title: 'Kolkata Momo I Am',
    description: 'Manager role — helped my brother branch his restaurant. Learned about business operations and team management.',
    icon: Utensils,
    side: 'right',
  },
  {
    year: '2015-2016',
    title: 'Dubai Cashier',
    description: 'Restaurant collaboration in Dubai. Got my hands dirty with operations and understood the value of hard work.',
    icon: Plane,
    side: 'left',
  },
  {
    year: '2016-2018',
    title: 'Lemon Tree Hotels Delhi',
    description: 'Front Office Associate at Aerocity. Handled check-ins, check-outs, billing, and guest relations.',
    icon: Hotel,
    side: 'right',
  },
  {
    year: '2018-2019',
    title: 'Teleperformance | Uber',
    description: 'Customer Service Representative. Resolved queries, maintained records, and ensured customer satisfaction.',
    icon: PhoneCall,
    side: 'left',
  },
  {
    year: '2019-2021',
    title: 'Concentrix | Dell — Advisor I',
    description: 'Customer Support Advisor. Assisted with Windows OS, connectivity, and hardware/software troubleshooting.',
    icon: Headphones,
    side: 'right',
  },
  {
    year: '2021-2025',
    title: 'Concentrix | Dell — Specialist',
    description: 'Promoted to Customer Support Specialist. Led advanced diagnostics, trained junior advisors, and maintained high CSAT scores.',
    icon: Star,
    side: 'left',
  },
  {
    year: 'June 2025',
    title: 'The Turning Point',
    description: 'Resigned to go all-in on AI. No more distractions. Building hyper-personalised AI assistants from home in Lamahatta — systems that remember you, stay aligned with human values, and grow with whatever future arrives.',
    icon: ArrowUp,
    side: 'right',
  },
]

export default function PastPage() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [isExpanded, setIsExpanded] = useState(false)
  const [lineProgress, setLineProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const displayedEvents = isExpanded ? timelineEvents : timelineEvents.slice(0, 3)

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
      { threshold: 0.2, rootMargin: '-50px' }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Line progress animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const progress = Math.min(100, Math.max(0,
          ((windowHeight - sectionTop) / (sectionHeight + windowHeight)) * 100
        ))
        setLineProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-tertiary to-dark-bg pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-20">
        <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-widest uppercase text-red-accent bg-red-accent/10 rounded-full border border-red-accent/20">
          My Journey
        </span>
        <h2 className="text-display font-bold text-text-primary mb-4">
          THE <span className="gradient-text">PAST</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every step has shaped who I am today. From the hills of Darjeeling to the tech world.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 timeline-line transition-all duration-300"
            style={{ height: `${lineProgress}%` }}
          />
        </div>

        {/* Timeline Events */}
        <div className="space-y-12 md:space-y-0">
          {displayedEvents.map((event, index) => {
            const isVisible = visibleItems.has(index)
            const Icon = event.icon
            const isLeft = event.side === 'left'

            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el }}
                data-index={index}
                className={`relative md:grid md:grid-cols-2 md:gap-8 ${index > 0 ? 'md:mt-12' : ''
                  }`}
              >
                {/* Mobile: Always left side content */}
                <div className="md:hidden pl-8">
                  <div
                    className={`relative p-6 bg-dark-card rounded-xl border border-white/5 hover:border-red-accent/30 transition-all duration-500 card-hover ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                      }`}
                  >
                    <span className="year-badge absolute -top-3 left-4 px-3 py-1 text-xs font-bold text-white rounded-full">
                      {event.year}
                    </span>

                    <div className="flex items-center gap-3 mb-3 mt-2">
                      <div className="p-2 bg-red-accent/10 rounded-lg">
                        <Icon className="w-5 h-5 text-red-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">{event.title}</h3>
                    </div>
                    <p className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed md:leading-loose tracking-wide">{event.description}</p>
                  </div>
                </div>

                {/* Desktop: Alternating sides */}
                <div className="hidden md:block">
                  {isLeft && (
                    <div
                      className={`relative p-6 bg-dark-card rounded-xl border border-white/5 hover:border-red-accent/30 transition-all duration-700 card-hover ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                        }`}
                    >
                      <span className="year-badge absolute -top-3 right-4 px-3 py-1 text-xs font-bold text-white rounded-full">
                        {event.year}
                      </span>

                      <div className="flex items-center gap-3 mb-3 mt-2">
                        <div className="p-2 bg-red-accent/10 rounded-lg">
                          <Icon className="w-5 h-5 text-red-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">{event.title}</h3>
                      </div>
                      <p className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed md:leading-loose tracking-wide">{event.description}</p>

                      <div className="absolute top-1/2 -right-3 w-6 h-6 bg-dark-card border-t border-r border-white/5 rotate-45 -translate-y-1/2 hidden md:block" />
                    </div>
                  )}
                </div>

                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div
                    className={`w-4 h-4 bg-red-accent rounded-full border-4 border-dark-bg shadow-glow-red transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'
                      }`}
                  />
                </div>

                {/* Right side content */}
                <div className="hidden md:block">
                  {!isLeft && (
                    <div
                      className={`relative p-6 bg-dark-card rounded-xl border border-white/5 hover:border-red-accent/30 transition-all duration-700 card-hover ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                        }`}
                    >
                      <span className="year-badge absolute -top-3 left-4 px-3 py-1 text-xs font-bold text-white rounded-full">
                        {event.year}
                      </span>

                      <div className="flex items-center gap-3 mb-3 mt-2">
                        <div className="p-2 bg-red-accent/10 rounded-lg">
                          <Icon className="w-5 h-5 text-red-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">{event.title}</h3>
                      </div>
                      <p className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed md:leading-loose tracking-wide">{event.description}</p>

                      <div className="absolute top-1/2 -left-3 w-6 h-6 bg-dark-card border-b border-l border-white/5 rotate-45 -translate-y-1/2 hidden md:block" />
                    </div>
                  )}
                </div>

                {/* Mobile Center Node */}
                <div className="md:hidden absolute left-0 top-6 -translate-x-1/2 z-20">
                  <div
                    className={`w-3 h-3 bg-red-accent rounded-full border-2 border-dark-bg transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'
                      }`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Expand/Collapse Toggle */}
        <div className="relative mt-16 text-center z-20">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-dark-card rounded-full border border-red-accent/30 hover:border-red-accent hover:bg-red-accent/10 transition-all duration-300 text-sm font-medium text-text-primary"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ArrowUp className="w-4 h-4 text-red-accent" />
              </>
            ) : (
              <>
                <span>Explore Full Journey</span>
                <ArrowDown className="w-4 h-4 text-red-accent" />
              </>
            )}
          </button>
        </div>

        {/* End Indicator */}
        <div className={`relative mt-16 text-center transition-all duration-700 ${isExpanded ? 'opacity-100 translate-y-0 height-auto' : 'opacity-0 -translate-y-8 hidden'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card rounded-full border border-red-accent/30">
            <ArrowUp className="w-4 h-4 text-red-accent" />
            <span className="text-sm text-text-secondary">This is where I am beginning to see clearly</span>
          </div>
        </div>
      </div>
    </div>
  )
}
