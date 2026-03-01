import { useEffect, useRef, useState } from 'react'
import {
  Monitor,
  Bot,
  BrainCircuit,
  MessageSquare,
  Layers,
  Mic,
  BookOpen,
  Code,
  Terminal,
  GraduationCap
} from 'lucide-react'

interface Skill {
  name: string
  icon: React.ElementType
  level?: number
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Core Expertise',
    skills: [
      { name: 'AI Systems & Automation', icon: Bot, level: 95 },
      { name: 'Product & Process Engineering', icon: BrainCircuit, level: 90 },
      { name: 'Education & Technical Communication', icon: MessageSquare, level: 92 },
    ],
  },
]

const currentFocus = [
  { name: 'aiforstudents.online', icon: GraduationCap, description: 'Trying to map curiosity through mapping the quality and quantity of questions students asked, teachers records and direct it, personal review.' },
  { name: 'Hyper-Personalised AI Assistant', icon: Bot, description: 'Remembers everything about you, gives guidance, and keeps you on track.' },
  { name: 'Personal Tech Support AI', icon: Monitor, description: 'Specialized assistant for Windows devices — makes computers easy for anyone.' },
  { name: 'Knowledge Compression', icon: BookOpen, description: 'Turning 8-hour topics into 1-hour sessions by cross-referencing what you already know.' },
  { name: 'Quantum + AI Systems', icon: Code, description: 'Combining classical AI with quantum computing to break the limits of distance.' },
  { name: 'Language Preservation', icon: Mic, description: 'AI chatbots for endangered languages like Sherpa and Bhutia.' },
]

const tools = [
  { name: 'Antigravity (Creative AI experimentation)', icon: Bot },
  { name: 'Codex (Code generation & debugging workflows)', icon: Code },
  { name: 'Claude (Long-form reasoning & structured analysis)', icon: BrainCircuit },
  { name: 'OpenClaudia (Local / alternative model experimentation)', icon: Monitor },
  { name: 'CLI Environments (PowerShell, Linux Terminal)', icon: Terminal },
  { name: 'AI Model Orchestration (Multi-model workflow design)', icon: Layers },
]

export default function NowPage() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [progressBars, setProgressBars] = useState<Set<string>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]))
            setTimeout(() => {
              setProgressBars((prev) => new Set([...prev, index.toString()]))
            }, 300)
          }
        })
      },
      { threshold: 0.2 }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-pink-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-20">
        <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-widest uppercase text-red-accent bg-red-accent/10 rounded-full border border-red-accent/20">
          Present Moment
        </span>
        <h2 className="text-display font-bold text-text-primary mb-4">
          THE <span className="gradient-text">NOW</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This is where I am — beginning to see clearly. Building skills, exploring technology, and creating value.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {/* Skills Grid */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            My <span className="text-red-accent">Skills</span>
          </h3>

          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                ref={(el) => { cardRefs.current[catIndex] = el }}
                data-index={catIndex}
                className={`p-6 md:p-8 bg-dark-card/80 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-red-accent/30 transition-all duration-700 card-hover ${visibleCards.has(catIndex) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                <h4 className="text-xl font-semibold text-text-primary mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-red-accent rounded-full" />
                  {category.title}
                </h4>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon
                    const isProgressVisible = progressBars.has(catIndex.toString())

                    return (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-red-accent/10 rounded-xl group-hover:bg-red-accent/20 transition-colors">
                              <Icon className="w-5 h-5 text-red-accent" />
                            </div>
                            <span className="text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          {skill.level && (
                            <span className="text-sm font-medium text-muted-foreground">{skill.level}%</span>
                          )}
                        </div>

                        {skill.level && (
                          <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-red-accent to-pink-accent rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: isProgressVisible ? `${skill.level}%` : '0%',
                                transitionDelay: `${skillIndex * 150}ms`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Current <span className="text-red-accent">Focus</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFocus.map((item, index) => {
              const Icon = item.icon
              const cardIndex = index + 2

              return (
                <div
                  key={item.name}
                  ref={(el) => { cardRefs.current[cardIndex] = el }}
                  data-index={cardIndex}
                  className={`group p-6 bg-dark-card/60 backdrop-blur-sm rounded-xl border border-white/5 hover:border-red-accent/40 transition-all duration-700 card-hover skill-card ${visibleCards.has(cardIndex) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-accent/10 rounded-xl group-hover:bg-red-accent/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-red-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1 group-hover:text-red-accent transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tools I Use */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            AI & Development <span className="text-red-accent">Stack</span>
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon

              return (
                <div
                  key={tool.name}
                  className="group flex items-center gap-3 px-5 py-3 bg-dark-card/60 rounded-full border border-white/5 hover:border-red-accent/40 hover:bg-dark-card transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-red-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {tool.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quote Section */}
        <div className="relative max-w-3xl mx-auto text-center py-16 px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-accent/5 to-transparent rounded-3xl blur-xl" />
          <div className="relative z-10 p-8 rounded-2xl border border-red-accent/10 bg-dark-card/40 backdrop-blur-md">
            <div className="text-4xl text-red-accent/40 mb-2 font-serif">&ldquo;</div>
            <blockquote className="text-2xl md:text-3xl text-text-primary font-medium leading-relaxed tracking-tight mb-6">
              I keep formulating the right questions. Once the question is right,
              the answer is often the easiest part <span className="text-red-accent">— especially in this AI era.</span>
            </blockquote>
            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <span className="inline-block px-4 py-1.5 bg-red-accent/10 border border-red-accent/20 rounded-full text-xs font-bold text-red-accent uppercase tracking-widest">
                My Mantra
              </span>
              <div className="flex items-center justify-center gap-4 text-sm font-semibold text-text-secondary uppercase tracking-widest mt-2">
                <span>Teleportation</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-accent/50" />
                <span>Content</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-accent/50" />
                <span>Podcast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
