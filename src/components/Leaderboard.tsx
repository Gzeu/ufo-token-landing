'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, Star, Zap } from 'lucide-react'

interface Player {
  rank: number
  name: string
  score: number
  missions: number
  badge: string
  avatar: string
}

const mockPlayers: Player[] = [
  { rank: 1, name: "AlienHunter42", score: 15420, missions: 89, badge: "👑", avatar: "🛸" },
  { rank: 2, name: "CosmicTrader", score: 12350, missions: 76, badge: "🥇", avatar: "🚀" },
  { rank: 3, name: "GalacticNomad", score: 9870, missions: 65, badge: "🥉", avatar: "⭐" },
  { rank: 4, name: "StarSeeker", score: 8450, missions: 58, badge: "🏅", avatar: "🌌" },
  { rank: 5, name: "NebulaRider", score: 7230, missions: 52, badge: "⚡", avatar: "🌠" },
  { rank: 6, name: "VoidWalker", score: 6890, missions: 47, badge: "🌟", avatar: "🌍" },
  { rank: 7, name: "PlanetHopper", score: 5670, missions: 41, badge: "💫", avatar: "🪐" },
  { rank: 8, name: "MeteorMiner", score: 4850, missions: 38, badge: "🔥", avatar: "☄️" },
]

export default function Leaderboard() {
  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return 'h-32'
      case 2: return 'h-24'
      case 3: return 'h-20'
      default: return 'h-16'
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Medal className="w-6 h-6 text-amber-600" />
      default: return <Trophy className="w-5 h-5 text-cosmic-purple" />
    }
  }

  return (
    <section id="leaderboard" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            🏆 Cosmic Leaderboard
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Top UFO invaders competing for galactic supremacy. Complete missions, earn points, and climb the ranks!
          </p>
        </motion.div>

        {/* Podium for Top 3 */}
        <div className="flex justify-center items-end gap-4 mb-12">
          {mockPlayers.slice(0, 3).sort((a, b) => {
            const order = [2, 1, 3]
            return order.indexOf(a.rank) - order.indexOf(b.rank)
          }).map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card-cosmic p-4 mb-4 min-w-[120px]"
              >
                <div className="text-4xl mb-2">{player.avatar}</div>
                <div className="font-bold text-ufo-beam text-sm mb-1">{player.name}</div>
                <div className="text-xs text-gray-400 mb-2">{player.score.toLocaleString()} pts</div>
                <div className="flex justify-center">{getRankIcon(player.rank)}</div>
              </motion.div>
              <div className={`bg-gradient-to-t from-ufo-beam/60 to-ufo-beam/30 ${getPodiumHeight(player.rank)} rounded-t-lg flex items-end justify-center pb-2`}>
                <span className="text-white font-bold text-2xl">{player.rank}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-cosmic overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-cosmic-yellow" />
              Invasion Rankings
              <Star className="w-6 h-6 text-cosmic-yellow" />
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ufo-beam/20">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Commander</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Invasion Score</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Missions</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPlayers.map((player, index) => (
                    <motion.tr
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                      className={`border-b border-ufo-beam/10 transition-all duration-300 ${
                        player.rank <= 3 ? 'bg-gradient-to-r from-ufo-beam/5 to-transparent' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(player.rank)}
                          <span className="font-bold text-lg">
                            #{player.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{player.avatar}</span>
                          <span className="font-semibold text-white">{player.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-ufo-beam text-lg">
                          {player.score.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Zap className="w-4 h-4 text-cosmic-yellow" />
                          <span className="font-medium">{player.missions}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-2xl">{player.badge}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-400 mb-4">Want to join the cosmic leaderboard?</p>
              <motion.a
                href="https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                <Trophy className="w-5 h-5" />
                Start Your Invasion
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}