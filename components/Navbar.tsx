'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-coffee-900/90 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo.png"
              alt="Ember & Roast"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-coffee-300/30 group-hover:ring-coffee-300/60 transition-all"
            />
            <span className="text-lg sm:text-xl font-bold text-coffee-100 tracking-wide">
              Ember <span className="text-coffee-300">&</span> Roast
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-coffee-300'
                    : 'text-coffee-100/70 hover:text-coffee-100'
                }`}
              >
                {link.name}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-coffee-300 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-coffee-100 hover:bg-coffee-800/50"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-coffee-900/95 backdrop-blur-md border-coffee-700/30 w-72"
              >
                <div className="flex flex-col gap-2 mt-8">
                  <div className="flex items-center gap-3 mb-6 px-2">
                    <img
                      src="/logo.png"
                      alt="Ember & Roast"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-coffee-300/30"
                    />
                    <span className="text-lg font-bold text-coffee-100">
                      Ember & Roast
                    </span>
                  </div>
                  {navLinks.map((link, i) => (
                    <SheetClose asChild key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all ${
                          activeSection === link.href.replace('#', '')
                            ? 'text-coffee-300 bg-coffee-800/50'
                            : 'text-coffee-100/70 hover:text-coffee-100 hover:bg-coffee-800/30'
                        }`}
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {link.name}
                      </button>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
