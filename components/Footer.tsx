'use client'

import { Instagram, Facebook, Twitter } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#1a1a1a] border-t border-coffee-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Ember & Roast"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-coffee-300/20"
              />
              <span className="text-lg font-bold text-coffee-100">
                Ember <span className="text-coffee-300">&</span> Roast
              </span>
            </div>
            <p className="text-coffee-200/50 text-sm leading-relaxed max-w-xs">
              Artisan coffee roasted with passion, brewed with precision. Where
              every cup tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-coffee-100 font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-coffee-200/50 text-sm hover:text-coffee-300 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-coffee-100 font-semibold text-sm uppercase tracking-wider mb-4">
              Hours
            </h3>
            <div className="space-y-2 text-sm text-coffee-200/50">
              <p>Mon - Fri: 7AM - 9PM</p>
              <p>Saturday: 8AM - 10PM</p>
              <p>Sunday: 8AM - 10PM</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-coffee-100 font-semibold text-sm uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-lg bg-coffee-800/50 border border-coffee-700/20 flex items-center justify-center text-coffee-200/50 hover:text-coffee-300 hover:border-coffee-300/30 hover:bg-coffee-800 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-coffee-700/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-coffee-200/30 text-sm">
            &copy; 2026 Ember & Roast Coffee. All rights reserved.
          </p>
          <p className="text-coffee-200/20 text-xs">
            Crafted with love and caffeine
          </p>
        </div>
      </div>
    </footer>
  )
}
