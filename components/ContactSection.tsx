'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import ScrollReveal from './ScrollReveal'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '42 Roastery Lane, Downtown District',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 234-5678',
    href: 'tel:+15552345678',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@emberandroast.com',
    href: 'mailto:hello@emberandroast.com',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Fri 7AM-9PM, Sat-Sun 8AM-10PM',
  },
]

export default function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: 'Message Sent!',
      description:
        "Thank you for reaching out. We'll get back to you soon.",
    })

    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 bg-coffee-900"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-300/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-coffee-300" />
              <span className="text-coffee-300 text-sm font-medium tracking-widest uppercase">
                Contact
              </span>
              <div className="w-10 h-0.5 bg-coffee-300" />
            </div>
            <h2 className="heading-elegant text-3xl sm:text-4xl lg:text-5xl text-coffee-100">
              Get In <span className="text-coffee-300">Touch</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <form
              onSubmit={handleSubmit}
              className="bg-coffee-800/50 border border-coffee-700/30 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-coffee-100 text-xl font-semibold mb-6">
                Send Us a Message
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-coffee-200/60 text-sm mb-1.5"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="bg-coffee-900/50 border-coffee-700/30 text-coffee-100 placeholder:text-coffee-200/30 focus:border-coffee-300 focus:ring-coffee-300/20"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-coffee-200/60 text-sm mb-1.5"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-coffee-900/50 border-coffee-700/30 text-coffee-100 placeholder:text-coffee-200/30 focus:border-coffee-300 focus:ring-coffee-300/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-coffee-200/60 text-sm mb-1.5"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-coffee-900/50 border-coffee-700/30 text-coffee-100 placeholder:text-coffee-200/30 focus:border-coffee-300 focus:ring-coffee-300/20"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-coffee-200/60 text-sm mb-1.5"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="bg-coffee-900/50 border-coffee-700/30 text-coffee-100 placeholder:text-coffee-200/30 focus:border-coffee-300 focus:ring-coffee-300/20 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-coffee-300 hover:bg-coffee-400 text-coffee-900 font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-5 h-5 border-2 border-coffee-900/30 border-t-coffee-900 rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </ScrollReveal>

          {/* Contact Info + Map */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              {/* Business Info */}
              <div className="bg-coffee-800/50 border border-coffee-700/30 rounded-2xl p-6 sm:p-8">
                <h3 className="text-coffee-100 text-xl font-semibold mb-6">
                  Visit Us
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-coffee-700/30 flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-coffee-300" />
                      </div>
                      <div>
                        <p className="text-coffee-200/50 text-xs uppercase tracking-wide">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-coffee-100 text-sm sm:text-base hover:text-coffee-300 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-coffee-100 text-sm sm:text-base">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border border-coffee-700/30 h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ember & Roast Coffee Location"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
