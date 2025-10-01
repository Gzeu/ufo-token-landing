'use client'

import { motion } from 'framer-motion'
import { 
  Twitter, 
  MessageCircle, 
  Users, 
  Github, 
  ExternalLink,
  Heart,
  Rocket,
  Globe
} from 'lucide-react'
import UFOIcon from './UFOIcon'
import { BRAND_CONFIG, getTradingUrl } from '../config/brand'

export default function Footer() {
  const socialLinks = [
    {
      name: 'Twitter',
      href: BRAND_CONFIG.social.twitter,
      icon: <Twitter className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Discord',
      href: BRAND_CONFIG.social.discord,
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'hover:text-purple-400'
    },
    {
      name: 'Telegram',
      href: BRAND_CONFIG.social.telegram,
      icon: <Users className="w-5 h-5" />,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Reddit',
      href: BRAND_CONFIG.social.reddit,
      icon: <Globe className="w-5 h-5" />,
      color: 'hover:text-orange-400'
    },
    {
      name: 'GitHub',
      href: BRAND_CONFIG.social.github,
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-gray-400'
    }
  ]

  const quickLinks = [
    { name: 'How to Buy', href: getTradingUrl() },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Missions', href: '#missions' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'Community', href: '#community' },
    { name: 'Contract', href: `https://bscscan.com/token/${BRAND_CONFIG.token.contractAddress}` }
  ]

  const contractAddress = BRAND_CONFIG.token.contractAddress
  const shortAddress = `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`

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
                  {BRAND_CONFIG.name}
                </h3>
                <p className="text-gray-400 text-sm">{BRAND_CONFIG.tagline}</p>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 leading-relaxed mb-6 max-w-md"
            >
              {BRAND_CONFIG.description}
            </motion.p>

            {/* Contract Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-6 p-3 bg-cosmic-dark/50 rounded-lg border border-ufo-beam/20"
            >
              <div className="text-sm text-gray-400 mb-1">Contract Address ({BRAND_CONFIG.token.chain})</div>
              <div className="flex items-center gap-2 text-ufo-beam font-mono text-sm">
                <span>{shortAddress}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(contractAddress)}
                  className="hover:text-white transition-colors"
                  title="Copy contract address"
                >
                  📋
                </button>
                <a
                  href={`https://bscscan.com/token/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="View on BSCScan"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href={getTradingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                <Rocket className="w-5 h-5" />
                Trade UFO Token
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
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-ufo-beam transition-colors duration-300 flex items-center gap-2"
                  >
                    {link.name}
                    {link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
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
              Join the Invasion 🛸
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

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-3 bg-cosmic-purple/10 rounded-lg border border-cosmic-purple/20"
            >
              <div className="text-sm font-medium text-cosmic-purple mb-2">🏆 Community Stats</div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>👥 {BRAND_CONFIG.community.holders}+ Holders</div>
                <div>📈 {BRAND_CONFIG.community.totalTrades}+ Trades</div>
                <div>💰 {BRAND_CONFIG.community.marketCap} Market Cap</div>
              </div>
            </motion.div>
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
              <span>by alien technology 👽</span>
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
              <a 
                href={`mailto:contact@${BRAND_CONFIG.social.website.replace('https://', '')}`} 
                className="hover:text-ufo-beam transition-colors duration-300"
              >
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
              Always do your own research (DYOR) and never invest more than you can afford to lose. 
              May contain traces of alien technology and cosmic humor. Launch launched {BRAND_CONFIG.community.launchDate}. 👽🛸
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