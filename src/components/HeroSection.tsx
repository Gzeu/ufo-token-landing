'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Rocket, Zap } from 'lucide-react'
import UFOIcon from './UFOIcon'

export default function HeroSection() {
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
              UFO Token
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4"
          >
            🛸 <span className="text-ufo-beam">Beam Your Way</span> to the Moon! 🌙
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Join the galactic invasion with random UFO beam airdrops, climb the cosmic leaderboard, 
            and complete epic alien missions. The most playful meme token in the universe is here!
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4 pulse-glow"
          >
            <Rocket className="w-6 h-6" />
            Launch to Token
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: "UFO Holders", value: "1,337+", icon: "👥" },
            { label: "Beam Airdrops", value: "42K+", icon: "⚡" },
            { label: "Missions Complete", value: "888+", icon: "🎯" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
              className="text-center p-4 rounded-2xl bg-cosmic-dark/50 backdrop-blur-sm border border-ufo-beam/20"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-ufo-beam mb-1">{stat.value}</div>
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