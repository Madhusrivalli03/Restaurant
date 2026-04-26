'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const CoffeeBeans3D = dynamic(() => import('./CoffeeBeans3D'), {
  ssr: false,
  loading: () => null,
})

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* 3D Coffee Beans - positioned on the right side */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-60 pointer-events-none">
        <CoffeeBeans3D />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          {/* Small accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-0.5 bg-coffee-300 mx-auto mb-6"
          />

          <h1 className="heading-elegant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-coffee-100 mb-6 max-w-4xl mx-auto">
            Where Every Cup{' '}
            <span className="text-coffee-300">Tells a Story</span>
          </h1>

          <p className="text-coffee-200/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Artisan coffee roasted with passion, brewed with precision
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => scrollToSection('#menu')}
              size="lg"
              className="bg-coffee-300 hover:bg-coffee-400 text-coffee-900 font-semibold px-8 py-3 text-base rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-coffee-300/20"
            >
              Explore Our Menu
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              size="lg"
              className="border-coffee-300/50 text-coffee-100 hover:bg-coffee-300/10 hover:border-coffee-300 font-semibold px-8 py-3 text-base rounded-full transition-all"
            >
              Visit Us
            </Button>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection('#about')}
        >
          <div className="flex flex-col items-center gap-2 scroll-indicator">
            <span className="text-coffee-300/60 text-xs tracking-widest uppercase">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5 text-coffee-300/60" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
