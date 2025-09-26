'use client'

import { motion } from 'framer-motion'
import { 
  Twitter, 
  MessageCircle, 
  Users, 
  Github, 
  ExternalLink,
  Heart,
  Rocket
} from 'lucide-react'
import UFOIcon from './UFOIcon'

export default function Footer() {
  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/ufotoken',
      icon: <Twitter className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/ufotoken',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'hover:text-purple-400'
    },
    {
      name: 'Telegram',
      href: 'https://t.me/ufotoken',
      icon: <Users className="w-5 h-5" />,
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/ufotoken',
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-gray-400'
    }
  ]

  const quickLinks = [
    { name: 'How to Buy', href: '#' },
    { name: 'Tokenomics', href: '#' },
    { name: 'Roadmap', href: '#' },
    { name: 'Whitepaper', href: '#' },
    { name: 'Audit', href: '#' },
    { name: 'FAQ', href: '#' }
  ]

  return (
    <footer className="relative bg-cosmic-darker/80 backdrop-blur-sm border-t border-ufo-beam/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-10 w-40 h-40 bg-cosmic-purple/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-10 w-40 h-40 bg-ufo-beam/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <UFOIcon size={60} animate={false} />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-ufo-beam to-cosmic-purple bg-clip-text text-transparent">
                  UFO Token
                </h3>
                <p className="text-gray-400 text-sm">Beam Your Way to the Moon! 🛸</p>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 leading-relaxed mb-6 max-w-md"
            >
              Join the most playful cryptocurrency meme token in the universe! Complete missions, 
              earn beam-powered airdrops, and climb the cosmic leaderboard with fellow space explorers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                <Rocket className="w-5 h-5" />
                Launch to Token
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-white mb-4"
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-ufo-beam transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-white mb-4"
            >
              Join the Invasion
            </motion.h4>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className={`flex items-center gap-3 text-gray-400 ${social.color} transition-all duration-300`}
                >
                  {social.icon}
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ufo-beam/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm text-gray-400"
            >
              <span>© 2025 UFO Token. Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>by alien technology</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-6 text-sm text-gray-400"
            >
              <a href="#" className="hover:text-ufo-beam transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-ufo-beam transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-ufo-beam transition-colors duration-300">
                Contact
              </a>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-cosmic-dark/50 rounded-lg border border-ufo-beam/10"
          >
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Disclaimer:</strong> UFO Token is a meme cryptocurrency created for entertainment purposes. 
              This is not financial advice. Cryptocurrency investments are highly volatile and risky. 
              Always do your own research and never invest more than you can afford to lose. 
              May contain traces of alien technology and cosmic humor. 👽
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating UFOs */}
      <div className="absolute bottom-10 left-10 opacity-10">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <UFOIcon size={80} animate={false} />
        </motion.div>
      </div>
    </footer>
  )
}