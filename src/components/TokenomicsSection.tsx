'use client'

import { motion } from 'framer-motion'
import { PieChart, DollarSign, Zap, Users, Gift, TrendingUp } from 'lucide-react'
import { BRAND_CONFIG } from '../config/brand'

export default function TokenomicsSection() {
  const { tokenomics, token } = BRAND_CONFIG

  return (
    <section id="tokenomics" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ufo-beam/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-cosmic-purple/20 rounded-full mb-6"
          >
            <PieChart className="w-10 h-10 text-cosmic-purple" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cosmic-purple via-ufo-beam to-cosmic-pink bg-clip-text text-transparent">
              Tokenomics 📊
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fair distribution designed for community growth, long-term sustainability, and maximum fun in the cosmos!
          </p>
        </motion.div>

        {/* Token Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-cosmic-dark/50 backdrop-blur-sm border border-ufo-beam/20 rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-3">🚀</div>
            <div className="text-2xl font-bold text-ufo-beam mb-2">{tokenomics.totalSupply}</div>
            <div className="text-gray-400">Total Supply</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-cosmic-dark/50 backdrop-blur-sm border border-cosmic-purple/20 rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-3">🔗</div>
            <div className="text-2xl font-bold text-cosmic-purple mb-2">{token.chain}</div>
            <div className="text-gray-400">Blockchain</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-cosmic-dark/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-3">💎</div>
            <div className="text-2xl font-bold text-green-400 mb-2">0%</div>
            <div className="text-gray-400">Buy/Sell Tax</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-cosmic-dark/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-3">💰</div>
            <div className="text-2xl font-bold text-yellow-400 mb-2">10%</div>
            <div className="text-gray-400">Referral Rewards</div>
          </motion.div>
        </div>

        {/* Distribution Chart */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Pie Chart Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              {/* SVG Pie Chart */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="transparent"
                  stroke="rgba(107, 70, 193, 0.1)"
                  strokeWidth="4"
                />
                
                {/* Distribution segments */}
                {tokenomics.distribution.map((item, index) => {
                  const cumulativePercentage = tokenomics.distribution
                    .slice(0, index)
                    .reduce((sum, prev) => sum + prev.percentage, 0)
                  
                  const strokeDasharray = `${(item.percentage / 100) * 565.48} 565.48`
                  const strokeDashoffset = -((cumulativePercentage / 100) * 565.48)
                  
                  return (
                    <motion.circle
                      key={item.category}
                      cx="100"
                      cy="100"
                      r="90"
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="12"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      initial={{ strokeDashoffset: -565.48 }}
                      animate={{ strokeDashoffset }}
                      transition={{ delay: index * 0.3, duration: 1.5, ease: "easeOut" }}
                      className="drop-shadow-lg"
                    />
                  )
                })}
              </svg>
              
              {/* Center UFO */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl animate-pulse">🛸</div>
              </div>
            </div>
          </motion.div>

          {/* Distribution Legend */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-6"
            >
              Token Distribution
            </motion.h3>
            
            {tokenomics.distribution.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-cosmic-dark/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <div className="font-medium text-white">{item.category}</div>
                    <div className="text-sm text-gray-400">{item.amount}</div>
                  </div>
                </div>
                <div className="text-xl font-bold" style={{ color: item.color }}>
                  {item.percentage}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cosmic-purple/10 to-ufo-beam/10 rounded-3xl p-8 border border-ufo-beam/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              🎆 UFO Token Features
            </h3>
            <p className="text-gray-300">
              Designed with the community in mind, featuring innovative mechanisms for engagement and rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokenomics.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-cosmic-dark/50 rounded-xl border border-ufo-beam/10 hover:border-ufo-beam/30 transition-colors"
              >
                <div className="text-2xl">✨</div>
                <span className="text-gray-200 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4">
            <motion.a
              href={`https://bscscan.com/token/${token.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              <TrendingUp className="w-5 h-5" />
              View Contract
            </motion.a>
            
            <motion.a
              href={token.tradingUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              <DollarSign className="w-5 h-5" />
              Start Trading
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}