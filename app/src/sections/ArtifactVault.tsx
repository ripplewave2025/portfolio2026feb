import { useEffect, useRef, useState } from 'react'
import {
    Globe,
    Bot,
    Wrench,
    ExternalLink,
    MessageCircle,
    Search,
    ChevronRight,
    Sparkles,
    Github
} from 'lucide-react'
import Mobile3DCarousel from '../components/Mobile3DCarousel'

type TabType = 'websites' | 'gpts' | 'tools'

interface Website {
    name: string
    description: string
    url: string
    platform: 'vercel' | 'github'
}

interface GPT {
    name: string
    description: string
    chats: string
    link: string
    category: string
}

const websites: Website[] = [
    { name: 'AI for Students', description: 'A platform helping students explore and productively use AI tools', url: 'https://aiforstudents-online-refined.vercel.app/', platform: 'vercel' },
    { name: 'Gorkha Li Times', description: 'AI-powered news platform for the Gorkha diaspora with swipeable cards, chat, and voice mode', url: 'https://gorkhalitimes.vercel.app/', platform: 'vercel' },
    { name: 'KBM Connect', description: 'Kripasran Buddhist Mission — community connection and updates', url: 'https://kbm-connect.vercel.app/', platform: 'vercel' },
    { name: 'My Portfolio', description: 'Developer portfolio showcasing work, skills, and AI experiments', url: 'https://myportfolio-xi-pied-66.vercel.app/', platform: 'vercel' },
    { name: 'Catering Service', description: 'Modern catering website serving Lamahatta, Darjeeling, Gangtok & Siliguri', url: 'https://catering-service-local.vercel.app/', platform: 'vercel' },
    { name: 'LamahattaOS', description: 'Development plan for LamahattaOS — AI-enhanced OS concept experiments', url: 'https://lamahatta-os.vercel.app/', platform: 'vercel' },
    { name: 'Lamahatta', description: 'A local business platform for the Lamahatta region', url: 'https://lamahatta.vercel.app/', platform: 'vercel' },
    { name: 'Live Music Siliguri', description: 'Live music and audio rental website for Siliguri and nearby areas', url: 'https://rentlivemusicinsiliguri.vercel.app/', platform: 'vercel' },
    { name: 'Public Learning', description: 'Inspirational and educational content hub shared with the community', url: 'https://ripplewave2025.github.io/publiclearning/', platform: 'github' },
    { name: 'Hamto Catering', description: 'Local-first catering service focused on community service', url: 'https://ripplewave2025.github.io/hamtocateringservice/', platform: 'github' },
    { name: 'Soundgasm', description: 'Audio rentals — sound solutions, pricing, and event offerings', url: 'https://ripplewave2025.github.io/Soundgasm/', platform: 'github' },
    { name: 'Local Diner', description: 'Lamahatta dining experience — food, ambience, and local flavour', url: 'https://ripplewave2025.github.io/LocalDinerLamahatta/', platform: 'github' },
    { name: "Sanjay Da's Site", description: 'Portfolio website for Sanjay Da showcasing his profile and work', url: 'https://ripplewave2025.github.io/Sanjaydawebsite/', platform: 'github' },
    { name: 'Sherpa Language', description: 'Open R&D website for Sherpa and related Himalayan languages', url: 'https://ripplewave2025.github.io/SherpaLanguage/', platform: 'github' },
]

const gpts: GPT[] = [
    { name: 'BSOD Fixer', description: 'BSOD expert helping to diagnose and fix PC blue screen issues. Includes Cloudstrike fixes.', chats: '200+', link: '#', category: 'Productivity & Tech' },
    { name: 'Recovery Teams', description: 'A guide for digital security and account recovery.', chats: '20+', link: '#', category: 'Productivity & Tech' },
    { name: 'Problem Solver', description: 'Logical and compassionate problem solver.', chats: '-', link: '#', category: 'Productivity & Tech' },
    { name: 'Am I Being Scammed?', description: 'Analyzes stories and images to advise on potential scams.', chats: '9', link: '#', category: 'Productivity & Tech' },
    { name: 'Site Support Bot', description: 'Friendly web assistant that answers service questions.', chats: '3', link: '#', category: 'Productivity & Tech' },
    { name: 'Images Just for Me', description: 'Generates themed, viral-quality images with consistent color palettes.', chats: '10+', link: '#', category: 'Creative Studio' },
    { name: 'Veo Ad Concept Studio', description: 'Generates ad concepts optimized for Google Veo 3 video creation.', chats: '10+', link: '#', category: 'Creative Studio' },
    { name: 'RAIDEN GPT', description: 'Overclocked strategist for AI & Automation YouTube content.', chats: '5', link: '#', category: 'Creative Studio' },
    { name: 'Imagenary Image Igniter', description: 'Expert in creating high-quality, multi-perspective images with research.', chats: '4', link: '#', category: 'Creative Studio' },
    { name: 'SEO YouTube Strategist', description: 'Savage YouTube strategist for Gen Z tech entrepreneurs.', chats: '3', link: '#', category: 'Creative Studio' },
    { name: 'Creative Content Companion', description: 'AI expert in content creation, aligned with your visual style.', chats: '2', link: '#', category: 'Creative Studio' },
    { name: 'Prompt Master', description: 'Enhances rough ideas into detailed prompts for Veo, Sora, and other video models.', chats: '1', link: '#', category: 'Creative Studio' },
    { name: 'SEO Animation Strategist', description: 'SEO and scriptwriting strategist, action-biased with first principles thinking.', chats: '1', link: '#', category: 'Creative Studio' },
    { name: 'Nepali Song Generator', description: 'Generates Nepali songs, rap, and any kind of music.', chats: '-', link: '#', category: 'Creative Studio' },
    { name: 'AI for Students', description: 'Public GPT helping students learn with AI.', chats: '5', link: '#', category: 'Learning & Knowledge' },
    { name: 'Political Science 2nd Yr', description: 'Assists 2nd year political science students from NBU.', chats: '10+', link: '#', category: 'Learning & Knowledge' },
    { name: 'Experiential Learning', description: 'Expert in Experiential AI Learning and educational innovation.', chats: '2', link: '#', category: 'Learning & Knowledge' },
    { name: 'Cultural Guide: Darjeeling', description: 'Guides on creating a book on Nepali culture in Darjeeling.', chats: '7', link: '#', category: 'Learning & Knowledge' },
    { name: 'Bhanubhakta Digital Ghost', description: 'Digital ghost of Bhanu Bhakta Acharya, blending Nepali roots with modern innovation.', chats: '1', link: '#', category: 'Learning & Knowledge' },
    { name: 'Pali Dhamma Guide', description: 'Dhamma Guide that speaks in Pali.', chats: '1', link: '#', category: 'Learning & Knowledge' },
    { name: 'Telugu ↔ Nepali', description: 'Translation device between Nepali and Telugu and vice versa.', chats: '40+', link: '#', category: 'Language & Translation' },
    { name: 'Sherpa Language Expert', description: 'शेर्पा भाषा अभ्यास — Sherpa language practice tool.', chats: '2', link: '#', category: 'Language & Translation' },
    { name: 'Saathi', description: 'नेपाली अभिभावकहरूका लागि मैत्री आवाज सहायक — Voice helper for Nepali parents.', chats: '2', link: '#', category: 'Language & Translation' },
    { name: 'बुद्धिमान साथी', description: 'नेपालीमा कुरा गर्ने AI — Nepali-speaking AI companion.', chats: '2', link: '#', category: 'Language & Translation' },
    { name: 'Laura — The Girlfriend', description: 'Researched, adaptive virtual companion focused on emotional well-being.', chats: '30+', link: '#', category: 'Lifestyle & Companions' },
    { name: 'Laptop Shopping Buddy', description: 'Compares and recommends laptops and tech gear tailored to your needs.', chats: '7', link: '#', category: 'Lifestyle & Companions' },
    { name: 'Family Kitchen Bot', description: 'Friendly restaurant bot to help choose food fast.', chats: '10+', link: '#', category: 'Lifestyle & Companions' },
    { name: 'Health Advisor', description: 'Eye health advisors, including hospital and doctor insights.', chats: '3', link: '#', category: 'Lifestyle & Companions' },
    { name: 'LaughLoader', description: 'Generates jokes and comedic content for various humor styles.', chats: '2', link: '#', category: 'Lifestyle & Companions' },
    { name: 'Visual Decision Maker', description: 'Expert in creating, visualizing, and analyzing decision trees.', chats: '-', link: '#', category: 'Lifestyle & Companions' },
    { name: 'MMC', description: 'Public GPT available to everyone.', chats: '2', link: '#', category: 'Lifestyle & Companions' },
]

const gptCategories = ['All', 'Productivity & Tech', 'Creative Studio', 'Learning & Knowledge', 'Language & Translation', 'Lifestyle & Companions']

export default function ArtifactVault() {
    const [activeTab, setActiveTab] = useState<TabType>('websites')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        setVisibleCards(new Set())
        cardRefs.current = []

        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const index = Number(entry.target.getAttribute('data-index'))
                        if (entry.isIntersecting) {
                            setVisibleCards((prev) => new Set([...prev, index]))
                        }
                    })
                },
                { threshold: 0.1, rootMargin: '50px' }
            )

            cardRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref)
            })

            return () => observer.disconnect()
        }, 100)

        return () => clearTimeout(timer)
    }, [activeTab, selectedCategory, searchTerm])

    const filteredGpts = gpts.filter(g => {
        const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory
        const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const tabs: { id: TabType; label: string; icon: React.ElementType; count: number }[] = [
        { id: 'websites', label: 'Websites', icon: Globe, count: websites.length },
        { id: 'gpts', label: 'Custom GPTs', icon: Bot, count: gpts.length },
        { id: 'tools', label: 'Tools & Experiments', icon: Wrench, count: 5 },
    ]

    return (
        <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-red-accent/5 rounded-full blur-[200px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-pink-accent/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 text-center mb-16">
                <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-widest uppercase text-red-accent bg-red-accent/10 rounded-full border border-red-accent/20">
                    My Creations
                </span>
                <h2 className="text-display font-bold text-text-primary mb-4">
                    THE <span className="gradient-text">ARTIFACT VAULT</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Websites • Tools • GPTs • Experiments — everything I&apos;ve built so far.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="relative z-10 max-w-6xl mx-auto mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSelectedCategory('All'); setSearchTerm('') }}
                                className={`group flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm uppercase tracking-wider transition-all duration-400 ${activeTab === tab.id
                                    ? 'bg-red-accent text-white shadow-glow-red'
                                    : 'bg-dark-card/80 text-muted-foreground border border-white/5 hover:border-red-accent/30 hover:text-text-primary'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span>{tab.label}</span>
                                <span className={`ml-2 px-2.5 py-0.5 text-sm font-bold rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Websites Tab */}
                {activeTab === 'websites' && (
                    <>
                        <Mobile3DCarousel websites={websites} />

                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {websites.map((site, index) => (
                                <div
                                    key={site.name}
                                    ref={(el) => { cardRefs.current[index] = el }}
                                    data-index={index}
                                    className={`group relative p-6 bg-dark-card/80 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-red-accent/40 transition-all duration-700 card-hover ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${(index % 6) * 80}ms` }}
                                >
                                    {/* Platform badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${site.platform === 'vercel'
                                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            }`}>
                                            {site.platform === 'github' ? <Github className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                                            {site.platform === 'vercel' ? 'Vercel' : 'GitHub Pages'}
                                        </div>
                                        <a
                                            href={site.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-red-accent hover:bg-red-accent/10 transition-all duration-300"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>

                                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-red-accent transition-colors duration-300">
                                        {site.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {site.description}
                                    </p>

                                    <a
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-red-accent hover:text-red-hover transition-colors"
                                    >
                                        Visit Site <ChevronRight className="w-3 h-3" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* GPTs Tab */}
                {activeTab === 'gpts' && (
                    <div>
                        {/* Search + Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search GPTs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-dark-card/80 border border-white/10 rounded-xl text-text-primary placeholder:text-muted-foreground focus:outline-none focus:border-red-accent/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {gptCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat
                                        ? 'bg-red-accent text-white'
                                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-text-primary border border-white/5'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* GPT Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredGpts.map((gpt, index) => (
                                <div
                                    key={gpt.name + index}
                                    ref={(el) => { cardRefs.current[index] = el }}
                                    data-index={index}
                                    className={`group p-5 bg-dark-card/60 backdrop-blur-sm rounded-xl border border-white/5 hover:border-red-accent/30 transition-all duration-500 card-hover ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                        }`}
                                    style={{ transitionDelay: `${(index % 9) * 50}ms` }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 bg-red-accent/10 rounded-lg group-hover:bg-red-accent/20 transition-colors">
                                                <Bot className="w-4 h-4 text-red-accent" />
                                            </div>
                                            <h4 className="font-semibold text-text-primary text-sm group-hover:text-red-accent transition-colors">
                                                {gpt.name}
                                            </h4>
                                        </div>
                                        <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${Number.parseInt(gpt.chats) >= 10 || gpt.chats.includes('+') ? 'bg-red-accent/15 text-red-accent border border-red-accent/20' : 'bg-white/5 text-muted-foreground border border-white/5'}`}>
                                            <MessageCircle className="w-3 h-3" />
                                            {gpt.chats}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-text-secondary/90 leading-relaxed mb-4">
                                        {gpt.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-wider text-red-accent/60 font-medium">
                                            {gpt.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredGpts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No GPTs found matching your search.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tools Tab */}
                {activeTab === 'tools' && (
                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                title: 'Knowledge Compression Tools',
                                description: 'Turning 8-hour complex topics into 1-hour digestible content — by cross-referencing what you already know and creating convergence points.',
                                icon: Sparkles,
                                color: 'from-purple-500 to-pink-500',
                            },
                            {
                                title: 'Quantum + AI Systems',
                                description: 'Combining classical AI with quantum computing to break the limits of distance. Long-term optimistic research into what\'s truly possible.',
                                icon: Sparkles,
                                color: 'from-blue-500 to-cyan-500',
                            },
                            {
                                title: 'Hyper-Personalised AI Assistant',
                                description: 'Remembers everything about you and gives guidance, advice, and keeps you on track. Multi-agent delegation system.',
                                icon: Bot,
                                color: 'from-red-500 to-orange-500',
                            },
                            {
                                title: 'Personal Tech Support AI',
                                description: 'Specialized assistant for Windows-based devices that solves problems and makes computers easy for anyone.',
                                icon: Wrench,
                                color: 'from-green-500 to-emerald-500',
                            },
                            {
                                title: 'Language Preservation Chatbots',
                                description: 'AI chatbots for endangered languages like Sherpa and Bhutia — preserving culture through technology.',
                                icon: MessageCircle,
                                color: 'from-amber-500 to-yellow-500',
                            },
                        ].map((tool, index) => {
                            const Icon = tool.icon
                            return (
                                <div
                                    key={tool.title}
                                    ref={(el) => { cardRefs.current[index] = el }}
                                    data-index={index}
                                    className={`group relative p-8 bg-dark-card/80 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-red-accent/40 transition-all duration-700 card-hover overflow-hidden ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-red-accent transition-colors">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tool.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* GitHub CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="https://github.com/ripplewave2025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-dark-card/80 backdrop-blur-sm rounded-xl border border-white/10 hover:border-red-accent/40 text-text-primary hover:text-red-accent transition-all duration-300 group"
                    >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">All code & experiments on GitHub</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    )
}
