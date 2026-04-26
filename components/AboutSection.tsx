'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import ScrollReveal from './ScrollReveal'

function AnimatedCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const step = target / 40
    const interval = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(current)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 15, suffix: '+', label: 'Origins', decimals: 0 },
  { value: 50, suffix: 'K+', label: 'Cups Served', decimals: 0 },
  { value: 4.9, suffix: '', label: 'Rating', decimals: 1 },
  { value: 2019, suffix: '', label: 'Founded', decimals: 0 },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-coffee-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image with parallax */}
          <ScrollReveal direction="left">
            <motion.div
              style={{ y: imageY }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/about-image.png"
                  alt="Barista pouring latte art at Ember & Roast"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/40 to-transparent" />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-coffee-300/30 rounded-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/20 rounded-2xl" />
            </motion.div>
          </ScrollReveal>

          {/* Text Content */}
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-coffee-300" />
                <span className="text-coffee-300 text-sm font-medium tracking-widest uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="heading-elegant text-3xl sm:text-4xl lg:text-5xl text-coffee-100 mb-6">
                Crafted with <span className="text-coffee-300">Passion</span>,
                Served with Love
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-coffee-200/70 text-base sm:text-lg leading-relaxed mb-5">
                Founded in 2019 in the heart of downtown, Ember & Roast was born
                from a simple belief: that great coffee has the power to bring
                people together. What started as a small roastery with a single
                Probat machine has grown into a beloved community gathering place
                where every cup is a conversation starter.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-coffee-200/70 text-base sm:text-lg leading-relaxed mb-5">
                We source our beans directly from smallholder farmers in
                Ethiopia&apos;s Yirgacheffe region, Colombia&apos;s Huila
                department, and Guatemala&apos;s Antigua valley — building
                relationships that ensure fair prices and exceptional quality.
                Every batch is carefully roasted in small quantities to unlock
                the unique flavor profile of each origin.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-coffee-200/70 text-base sm:text-lg leading-relaxed mb-8">
                Our café is more than just a place to grab a coffee — it&apos;s a
                space where creativity flows, friendships deepen, and the aroma
                of freshly roasted beans fills the air. From our signature Ember
                Blend to seasonal single-origin pours, every drink is crafted
                with the same care and attention that defined our very first cup.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-coffee-800/50 border border-coffee-700/20"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-coffee-300">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    </div>
                    <div className="text-coffee-200/50 text-xs sm:text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
