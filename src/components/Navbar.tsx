'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import UFOIcon from './UFOIcon'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'Missions', href: '#missions' },
    { name: 'Community', href: '#community' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-cosmic-dark/80 backdrop-blur-lg border-b border-ufo-beam/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <UFOIcon size={40} animate={false} />
            <span className="text-2xl font-bold bg-gradient-to-r from-ufo-beam to-cosmic-purple bg-clip-text text-transparent">
              UFO Token
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-ufo-beam transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
            
            <motion.a
              href="https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Buy UFO Token
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-ufo-beam transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-cosmic-darker/95 backdrop-blur-lg border-t border-ufo-beam/20"
      >
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: isOpen ? 0 : -50, opacity: isOpen ? 1 : 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-ufo-beam transition-colors duration-300 font-medium py-2"
            >
              {item.name}
            </motion.a>
          ))}
          
          <motion.a
            href="https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: isOpen ? 0 : -50, opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full justify-center mt-4"
          >
            Buy UFO Token
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  )
}