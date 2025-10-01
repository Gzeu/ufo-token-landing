'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Rocket, Zap, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'
import UFOIcon from './UFOIcon'
import { BRAND_CONFIG, getTradingUrl, getShareText, formatNumber } from '../config/brand'

export default function HeroSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getTradingUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.log('Copy failed:', err)
    }
  }

  const handleShare = () => {
    const shareText = getShareText()
    const shareUrl = getTradingUrl()
    
    if (navigator.share) {
      navigator.share({
        title: BRAND_CONFIG.meta.title,
        text: shareText,
        url: shareUrl,
      })
    } else {
      // Fallback: Open Twitter share dialog
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=UFO,Memecoin,BNBChain,DeFi`
      window.open(twitterUrl, '_blank')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cosmic-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ufo-beam/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="relative w-full h-full">
            {/* Floating UFO */}
            <motion.div
              className="absolute top-20 right-20"
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <UFOIcon size={150} className="opacity-30" />
            </motion.div>
            
            {/* Another UFO */}
            <motion.div
              className="absolute bottom-32 left-16"
              animate={{
                y: [20, -20, 20],
                x: [10, -10, 10],
                rotate: [2, -2, 2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <UFOIcon size={100} className="opacity-20" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main UFO */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <UFOIcon size={200} className="mx-auto" />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-ufo-beam via-cosmic-purple to-cosmic-pink bg-clip-text text-transparent animate-pulse">
              {BRAND_CONFIG.name}
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4"
          >
            {BRAND_CONFIG.tagline}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {BRAND_CONFIG.description} Complete cosmic missions, earn beam rewards, and join the most fun community in the galaxy!
          </motion.p>
        </motion.div>

        {/* Token Info Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-full text-sm font-medium text-cosmic-purple mb-8"
        >
          <span className="w-2 h-2 bg-cosmic-purple rounded-full animate-pulse"></span>
          Live on {BRAND_CONFIG.token.chain} • Zero Tax • 10% Referral Rewards
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
        >
          <motion.a
            href={getTradingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4 pulse-glow"
          >
            <Rocket className="w-6 h-6" />
            Trade UFO Token
            <ExternalLink className="w-5 h-5" />
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary text-lg px-8 py-4"
            onClick={() => {
              document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Zap className="w-6 h-6" />
            View Leaderboard
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Share & Copy Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 bg-ufo-beam/10 hover:bg-ufo-beam/20 border border-ufo-beam/30 rounded-lg text-ufo-beam transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Earn 10% Referral Fees
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-purple/10 hover:bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-lg text-cosmic-purple transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Referral Link'}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: "Holders", value: formatNumber(BRAND_CONFIG.community.holders), icon: "👥" },
            { label: "Total Trades", value: formatNumber(BRAND_CONFIG.community.totalTrades), icon: "📈" },
            { label: "Market Cap", value: BRAND_CONFIG.community.marketCap, icon: "💎" },
            { label: "Mission Pool", value: "100M UFO", icon: "🎯" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
              className="text-center p-4 rounded-2xl bg-cosmic-dark/50 backdrop-blur-sm border border-ufo-beam/20"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-ufo-beam mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-ufo-beam/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-ufo-beam rounded-full mt-2 animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  )
}