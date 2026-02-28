import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import type { PageType } from '../App'

interface NavigationProps {
  currentPage: PageType
  onNavigate: (page: PageType) => void
}

const navItems: { id: PageType; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'past', label: 'Past' },
  { id: 'now', label: 'Now' },
  { id: 'vault', label: 'Vault' },
  { id: 'future', label: 'Future' },
  { id: 'beliefs', label: 'Beliefs' },
]

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (page: PageType) => {
    onNavigate(page)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'glass-nav py-3'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="text-xl font-bold tracking-tight text-text-primary hover:text-red-accent transition-colors duration-300"
            >
              <span className="gradient-text">UPESH</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 rounded-lg group ${currentPage === item.id
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white'
                    }`}
                >
                  {/* Active indicator */}
                  {currentPage === item.id && (
                    <span className="absolute inset-0 bg-red-accent/20 rounded-lg tab-indicator" />
                  )}

                  {/* Hover background */}
                  <span className="absolute inset-0 bg-white/5 rounded-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />

                  <span className="relative z-10">{item.label}</span>

                  {/* Underline */}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-0.5 bg-red-accent transition-all duration-300 ${currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-primary hover:text-red-accent transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-20 left-4 right-4 bg-dark-card rounded-2xl p-6 shadow-2xl transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
            }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-4 text-left text-lg font-medium uppercase tracking-wider transition-all duration-300 rounded-xl group ${currentPage === item.id
                    ? 'text-white bg-red-accent/20'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="relative z-10">{item.label}</span>
                {currentPage === item.id && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-accent rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
