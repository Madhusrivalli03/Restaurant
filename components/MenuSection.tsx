'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ScrollReveal from './ScrollReveal'

interface MenuItem {
  name: string
  description: string
  price: string
  image: string
}

const coffeeItems: MenuItem[] = [
  { name: 'Classic Espresso', description: 'Rich, bold, single-origin', price: '$3.50', image: '/menu-espresso.png' },
  { name: 'Caramel Latte', description: 'Smooth espresso with caramel drizzle', price: '$5.00', image: '/menu-caramel-latte.png' },
  { name: 'Cold Brew', description: '18-hour steeped, smooth finish', price: '$4.50', image: '/menu-cold-brew.png' },
  { name: 'Matcha Latte', description: 'Premium Japanese matcha', price: '$5.50', image: '/menu-matcha-latte.png' },
  { name: 'Mocha Delight', description: 'Chocolate meets espresso', price: '$5.00', image: '/menu-mocha.png' },
  { name: 'Pour Over', description: 'Hand-poured single cup', price: '$4.00', image: '/menu-pour-over.png' },
]

const pastryItems: MenuItem[] = [
  { name: 'Butter Croissant', description: 'Flaky, golden, freshly baked', price: '$3.00', image: '/menu-croissant.png' },
  { name: 'Cinnamon Roll', description: 'Warm, gooey, with cream cheese', price: '$4.00', image: '/menu-cinnamon-roll.png' },
  { name: 'Blueberry Muffin', description: 'Bursting with fresh blueberries', price: '$3.50', image: '/menu-blueberry-muffin.png' },
  { name: 'Chocolate Danish', description: 'Rich chocolate filling', price: '$3.50', image: '/menu-chocolate-danish.png' },
  { name: 'Banana Bread', description: 'Homemade with walnuts', price: '$3.00', image: '/menu-banana-bread.png' },
  { name: 'Almond Biscotti', description: 'Perfect for dipping', price: '$2.50', image: '/menu-biscotti.png' },
]

const specialItems: MenuItem[] = [
  { name: 'Ember Signature', description: 'Our house blend, smoky & bold', price: '$6.00', image: '/menu-ember-signature.png' },
  { name: 'Seasonal Flight', description: '4 tasting pours of the season', price: '$12.00', image: '/menu-seasonal-flight.png' },
  { name: 'Affogato', description: 'Gelato drowned in espresso', price: '$7.00', image: '/menu-affogato.png' },
  { name: 'Coffee Tasting Experience', description: 'Guided tasting for two', price: '$25.00', image: '/menu-tasting-experience.png' },
]

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 10)
    setRotateY(-(x - centerX) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-3d-inner rounded-xl overflow-hidden bg-coffee-800 border border-coffee-700/30 cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:shadow-coffee-300/5"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Real food/drink image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-800 via-coffee-800/20 to-transparent" />
          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-coffee-900/80 backdrop-blur-sm text-coffee-300 font-bold text-sm px-3 py-1 rounded-full border border-coffee-300/20">
            {item.price}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-coffee-100 font-semibold text-base sm:text-lg">
            {item.name}
          </h3>
          <p className="text-coffee-200/50 text-sm mt-1">{item.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
      {items.map((item, i) => (
        <MenuCard key={item.name} item={item} index={i} />
      ))}
    </div>
  )
}

export default function MenuSection() {
  return (
    <section id="menu" className="relative py-20 sm:py-28 lg:py-32 bg-coffee-900">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-300/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-coffee-300" />
              <span className="text-coffee-300 text-sm font-medium tracking-widest uppercase">
                Our Menu
              </span>
              <div className="w-10 h-0.5 bg-coffee-300" />
            </div>
            <h2 className="heading-elegant text-3xl sm:text-4xl lg:text-5xl text-coffee-100">
              Crafted <span className="text-coffee-300">Perfection</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Tabs defaultValue="coffee" className="w-full">
            <div className="flex justify-center mb-2">
              <TabsList className="bg-coffee-800/50 border border-coffee-700/30 p-1">
                <TabsTrigger
                  value="coffee"
                  className="data-[state=active]:bg-coffee-300 data-[state=active]:text-coffee-900 text-coffee-200/60 px-6 py-2 text-sm font-medium transition-all"
                >
                  Coffee
                </TabsTrigger>
                <TabsTrigger
                  value="pastries"
                  className="data-[state=active]:bg-coffee-300 data-[state=active]:text-coffee-900 text-coffee-200/60 px-6 py-2 text-sm font-medium transition-all"
                >
                  Pastries
                </TabsTrigger>
                <TabsTrigger
                  value="specials"
                  className="data-[state=active]:bg-coffee-300 data-[state=active]:text-coffee-900 text-coffee-200/60 px-6 py-2 text-sm font-medium transition-all"
                >
                  Specials
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="coffee">
              <MenuGrid items={coffeeItems} />
            </TabsContent>
            <TabsContent value="pastries">
              <MenuGrid items={pastryItems} />
            </TabsContent>
            <TabsContent value="specials">
              <MenuGrid items={specialItems} />
            </TabsContent>
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  )
}
