'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import ScrollReveal from './ScrollReveal'

const galleryImages = [
  {
    src: '/gallery-1.png',
    alt: 'Espresso drink with beautiful latte art',
    span: 'row-span-2',
  },
  {
    src: '/gallery-2.png',
    alt: 'Cozy coffee shop interior with warm lighting',
    span: '',
  },
  {
    src: '/gallery-3.png',
    alt: 'Coffee beans in burlap sack from our roastery',
    span: '',
  },
  {
    src: '/gallery-4.png',
    alt: 'Pastry and coffee flat lay arrangement',
    span: 'row-span-2',
  },
]

function GalleryImage({
  image,
  index,
  onOpen,
}: {
  image: (typeof galleryImages)[0]
  index: number
  onOpen: (src: string, alt: string) => void
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 15)
    setRotateY(-(x - centerX) / 15)
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card-3d cursor-pointer ${image.span}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(image.src, image.alt)}
    >
      <motion.div
        className="card-3d-inner overflow-hidden rounded-xl relative group"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
            rotateX || rotateY ? 1.02 : 1
          })`,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full min-h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-coffee-100 text-sm font-medium">{image.alt}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  )

  return (
    <section
      id="gallery"
      className="relative py-20 sm:py-28 lg:py-32 bg-coffee-900"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-300/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-coffee-300" />
              <span className="text-coffee-300 text-sm font-medium tracking-widest uppercase">
                Gallery
              </span>
              <div className="w-10 h-0.5 bg-coffee-300" />
            </div>
            <h2 className="heading-elegant text-3xl sm:text-4xl lg:text-5xl text-coffee-100">
              A Glimpse <span className="text-coffee-300">Inside</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
          {galleryImages.map((image, i) => (
            <GalleryImage
              key={image.src}
              image={image}
              index={i}
              onOpen={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!lightbox}
        onOpenChange={(open) => {
          if (!open) setLightbox(null)
        }}
      >
        <DialogContent className="max-w-4xl w-[95vw] bg-coffee-900/95 backdrop-blur-md border-coffee-700/30 p-0 overflow-hidden">
          <DialogTitle className="sr-only">{lightbox?.alt ?? 'Gallery image'}</DialogTitle>
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
