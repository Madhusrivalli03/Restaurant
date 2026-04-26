'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const testimonials = [
  {
    quote:
      'The best coffee I\'ve ever had. The Ember Signature is absolutely divine — rich, smooth, and unforgettable. This is my go-to spot every morning.',
    name: 'Sarah M.',
    rating: 5,
    date: 'December 2025',
  },
  {
    quote:
      'A cozy gem in the heart of downtown. The pastries are always fresh, and the staff makes you feel like family. Wouldn\'t trade this place for anything.',
    name: 'James K.',
    rating: 5,
    date: 'January 2026',
  },
  {
    quote:
      'The coffee tasting experience was incredible. Learned so much about origins and flavors. Now I appreciate every sip so much more. Highly recommend!',
    name: 'Priya R.',
    rating: 5,
    date: 'February 2026',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-coffee-900">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-300/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-coffee-300" />
              <span className="text-coffee-300 text-sm font-medium tracking-widest uppercase">
                Testimonials
              </span>
              <div className="w-10 h-0.5 bg-coffee-300" />
            </div>
            <h2 className="heading-elegant text-3xl sm:text-4xl lg:text-5xl text-coffee-100">
              What Our <span className="text-coffee-300">Guests</span> Say
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-coffee-800/50 border border-coffee-700/30 rounded-2xl p-8 sm:p-10 lg:p-12 min-h-[280px] flex flex-col justify-center overflow-hidden">
              {/* Decorative quote icon */}
              <Quote className="absolute top-4 left-4 w-12 h-12 text-coffee-300/10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: testimonials[current].rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-gold text-gold"
                        />
                      )
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-coffee-100 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-coffee-300 font-semibold text-base sm:text-lg">
                        {testimonials[current].name}
                      </p>
                      <p className="text-coffee-200/40 text-sm">
                        {testimonials[current].date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-3 bg-coffee-300'
                      : 'w-3 h-3 bg-coffee-300/30 hover:bg-coffee-300/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
