import React from 'react'
import { Globe, Github, ExternalLink, ChevronRight } from 'lucide-react'

interface Website {
    name: string
    description: string
    url: string
    platform: 'vercel' | 'github'
}

interface Mobile3DCarouselProps {
    websites: Website[]
}

export default function Mobile3DCarousel({ websites }: Mobile3DCarouselProps) {
    const n = websites.length

    return (
        <div className="md:hidden w-full overflow-hidden my-4 py-8 relative flex justify-center items-center">
            <style dangerouslySetInnerHTML={{
                __html: `
                .carousel-scene {
                    display: grid;
                    perspective: 45em; /* increased perspective for less extreme distortion */
                    width: 100%;
                    max-width: 100vw;
                    mask-image: linear-gradient(90deg, transparent, black 15% 85%, transparent);
                    -webkit-mask-image: linear-gradient(90deg, transparent, black 15% 85%, transparent);
                }
                .carousel-a3d {
                    display: grid;
                    place-self: center;
                    transform-style: preserve-3d;
                    animation: ry 60s linear infinite;
                }
                .carousel-a3d:hover, .carousel-a3d:active {
                    animation-play-state: paused;
                }
                @keyframes ry {
                    to {
                        transform: rotateY(1turn);
                    }
                }
                .carousel-card {
                    --w: 16rem;
                    --ba: calc(1turn / var(--n));
                    grid-area: 1 / 1;
                    width: var(--w);
                    aspect-ratio: 7 / 9;
                    backface-visibility: hidden;
                    transform: 
                        rotateY(calc(var(--i) * var(--ba)))
                        translateZ(calc(-1 * (0.5 * var(--w) + 1rem) / tan(0.5 * var(--ba))));
                }
                @media (prefers-reduced-motion: reduce) {
                    .carousel-a3d {
                        animation-duration: 128s;
                    }
                }
            `}} />

            <div className="carousel-scene h-[360px] sm:h-[420px]">
                {/* Notice we pass --n as a custom property to the a3d container */}
                <div
                    className="carousel-a3d"
                    style={{ '--n': n } as React.CSSProperties}
                >
                    {websites.map((site, i) => (
                        <div
                            key={site.name}
                            className="carousel-card group relative p-6 bg-dark-card/90 backdrop-blur-xl rounded-[1.5em] border border-white/10 flex flex-col justify-between"
                            style={{ '--i': i } as React.CSSProperties}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[1.5em] pointer-events-none" />

                            <div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${site.platform === 'vercel'
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        }`}>
                                        {site.platform === 'github' ? <Github className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                                        {site.platform === 'vercel' ? 'Vercel' : 'GitHub'}
                                    </div>
                                    <a
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 text-text-secondary active:text-red-accent transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>

                                <h3 className="text-xl font-bold text-text-primary mb-3 relative z-10 leading-tight">
                                    {site.name}
                                </h3>
                                <p className="text-[13px] text-text-secondary leading-relaxed relative z-10 line-clamp-4">
                                    {site.description}
                                </p>
                            </div>

                            <a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 mt-4 bg-white/5 active:bg-red-accent/20 rounded-xl text-sm font-semibold text-red-accent border border-white/5 active:border-red-accent/30 transition-all relative z-10"
                            >
                                Visit Site <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instruction tooltip for mobile */}
            <div className="absolute bottom-0 text-[10px] text-muted-foreground uppercase tracking-widest bg-dark-bg/80 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm pointer-events-none">
                Tap to pause • Swipe to view
            </div>
        </div>
    )
}
