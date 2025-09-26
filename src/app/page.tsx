'use client'

import { motion } from 'framer-motion'
import { 
  Rocket, 
  Trophy, 
  Zap, 
  Users, 
  Star, 
  Github, 
  Twitter, 
  MessageCircle,
  ExternalLink,
  Coins,
  Target,
  Award
} from 'lucide-react'
import UFOIcon from '@/components/UFOIcon'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Leaderboard from '@/components/Leaderboard'
import MissionsSection from '@/components/MissionsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
              🛸 UFO Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the most advanced alien technology in the crypto universe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Beam Airdrops",
                description: "Random UFO beam-powered airdrops straight to your wallet. Our alien technology ensures fair distribution across the galaxy."
              },
              {
                icon: <Trophy className="w-12 h-12" />,
                title: "Cosmic Leaderboard",
                description: "Climb the galactic rankings and prove your worth as the ultimate space explorer. Top invaders get exclusive rewards."
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: "Invasion Missions",
                description: "Complete epic UFO missions, collect rare alien artifacts, and unlock special community rewards."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-cosmic text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-ufo-beam mb-4 flex justify-center group-hover:animate-bounce">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-glow">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Leaderboard />
      <MissionsSection />

      {/* Community Section */}
      <section id="community" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
              🚀 Join the Invasion
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Connect with fellow space explorers and stay updated on the latest UFO sightings and token launches.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  name: "Twitter",
                  icon: <Twitter className="w-6 h-6" />,
                  href: "https://twitter.com/ufotoken",
                  color: "hover:text-blue-400"
                },
                {
                  name: "Discord",
                  icon: <MessageCircle className="w-6 h-6" />,
                  href: "https://discord.gg/ufotoken",
                  color: "hover:text-purple-400"
                },
                {
                  name: "Telegram",
                  icon: <Users className="w-6 h-6" />,
                  href: "https://t.me/ufotoken",
                  color: "hover:text-blue-500"
                },
                {
                  name: "GitHub",
                  icon: <Github className="w-6 h-6" />,
                  href: "https://github.com/ufotoken",
                  color: "hover:text-gray-400"
                }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className={`btn-secondary ${social.color} transition-colors duration-300`}
                >
                  {social.icon}
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}