import { useEffect, useRef, useState } from 'react'
import {
    Lightbulb,
    Eye,
    Bug,
    Heart,
    Copy,
    Check,
    Send,
    Sparkles,
    ArrowRight
} from 'lucide-react'

interface AIInsight {
    icon: React.ElementType
    title: string
    description: string
    color: string
}

const aiInsights: AIInsight[] = [
    {
        icon: Eye,
        title: "AI is the world's greatest mirror",
        description: "It has seen everything humanity ever created and reflects patterns back perfectly.",
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Lightbulb,
        title: "It's prediction on steroids",
        description: "A super-intelligent parrot that finishes your sentences better than you can.",
        color: 'from-amber-500 to-orange-500',
    },
    {
        icon: Bug,
        title: "We are the ants",
        description: "We can use it and guide it — but we will probably never fully understand what it truly is.",
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: Heart,
        title: "Human things matter more",
        description: "The faster AI grows, the more we need Truth, Beauty, Curiosity, Humor and Culture.",
        color: 'from-red-500 to-rose-500',
    },
]

const promptSuggestion = `I want to understand AI at a deep level. Explain it to me using analogies I already know — mirrors, prediction, ants, and human culture. Help me see why human things matter more in the age of AI.`

export default function CoreBeliefs() {
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
    const [copied, setCopied] = useState(false)
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

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promptSuggestion)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Fallback
            const textArea = document.createElement('textarea')
            textArea.value = promptSuggestion
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-tertiary to-dark-bg pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-accent/8 rounded-full blur-[180px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 text-center mb-20">
                <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-widest uppercase text-red-accent bg-red-accent/10 rounded-full border border-red-accent/20">
                    One Last Thing
                </span>
                <h2 className="text-display font-bold text-text-primary mb-4">
                    A TASTE OF <span className="gradient-text">AI</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    You&apos;ve walked through my entire journey — from the misty hills of Darjeeling to the dream of quantum teleportation.
                    Before you go, here&apos;s the simplest way I understand AI.
                </p>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-20">
                {/* AI Insights Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {aiInsights.map((insight, index) => {
                        const Icon = insight.icon
                        const isVisible = visibleItems.has(index)

                        return (
                            <div
                                key={insight.title}
                                ref={(el) => { itemRefs.current[index] = el }}
                                data-index={index}
                                className={`group relative p-8 bg-dark-card/80 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-red-accent/40 transition-all duration-700 card-hover overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${insight.color} mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-red-accent transition-colors">
                                    {insight.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {insight.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Core Belief Statement */}
                <div
                    ref={(el) => { itemRefs.current[4] = el }}
                    data-index={4}
                    className={`relative max-w-3xl mx-auto text-center py-12 transition-all duration-1000 ${visibleItems.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-accent/30 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-accent/30 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-red-accent/30 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-accent/30 rounded-br-2xl" />

                    <Sparkles className="w-8 h-8 text-red-accent mx-auto mb-6" />

                    <blockquote className="text-lg md:text-xl text-text-secondary leading-relaxed italic px-4">
                        In the age of accelerating AI, nothing matters more than learning to communicate with clarity,
                        seeking truth as rigorously as possible, staying deeply curious, and honestly documenting and
                        preserving our cultures while truly understanding them.
                    </blockquote>

                    <div className="mt-8">
                        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            Humans have been the most intelligent species on Earth for our entire history.
                            That chapter is closing faster than most people realise. That is exactly why I am building
                            personal AI assistants from my home in Lamahatta, Darjeeling.
                        </p>
                    </div>
                </div>

                {/* Copy-Paste Prompt */}
                <div
                    ref={(el) => { itemRefs.current[5] = el }}
                    data-index={5}
                    className={`relative max-w-2xl mx-auto transition-all duration-700 ${visibleItems.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h3 className="text-center text-lg font-semibold text-text-primary mb-4">
                        Try this right now <span className="text-muted-foreground">(copy-paste into any AI)</span>
                    </h3>
                    <div className="relative p-6 bg-dark-card/80 rounded-2xl border border-white/10 group hover:border-red-accent/30 transition-all duration-300">
                        <p className="text-sm text-text-secondary leading-relaxed pr-12 font-mono">
                            {promptSuggestion}
                        </p>
                        <button
                            onClick={handleCopy}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-red-accent hover:bg-red-accent/10 transition-all duration-300"
                            title="Copy prompt"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Final CTA */}
                <div
                    ref={(el) => { itemRefs.current[6] = el }}
                    data-index={6}
                    className={`text-center transition-all duration-1000 ${visibleItems.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                        LET&apos;S BUILD THE <span className="gradient-text">FUTURE</span> TOGETHER
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                        Have an idea, a project, or just want to say hello? I&apos;m always open to meaningful conversations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:upeshinmars42@gmail.com"
                            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-accent text-white font-semibold rounded-xl hover:bg-red-hover transition-all duration-300"
                        >
                            <Send className="w-5 h-5" />
                            <span>Get in Touch</span>
                        </a>
                        <a
                            href="https://github.com/ripplewave2025"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-text-primary font-semibold rounded-xl border border-white/10 hover:border-red-accent/50 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <span>View GitHub</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
