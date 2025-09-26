'use client'

import { motion } from 'framer-motion'
import { 
  Target, 
  Clock, 
  Award, 
  CheckCircle, 
  Zap, 
  Rocket, 
  Star,
  Users,
  Gift,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import ShareBar from './ShareBar'
import { FOUR_MEME_REF_URL } from '../config/links'

interface Mission {
  id: string
  title: string
  description: string
  reward: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic'
  timeLeft: string
  progress?: number
  icon: React.ReactNode
  status: 'active' | 'completed' | 'locked'
  participants: number
  isReferral?: boolean
}

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'First Contact',
    description: 'Complete your first UFO token transaction and join the galactic community.',
    reward: '500 UFO + Newcomer Badge',
    difficulty: 'Easy',
    timeLeft: 'Permanent',
    progress: 100,
    icon: <Rocket className="w-6 h-6" />,
    status: 'completed',
    participants: 1337
  },
  {
    id: '2',
    title: 'Beam Collector',
    description: 'Receive 5 random airdrops from UFO beam technology.',
    reward: '1,000 UFO + Collector Badge',
    difficulty: 'Medium',
    timeLeft: '2 days left',
    progress: 60,
    icon: <Zap className="w-6 h-6" />,
    status: 'active',
    participants: 892
  },
  {
    id: '3',
    title: 'Social Invader',
    description: 'Share UFO Token on Twitter and tag 3 fellow space explorers. Earn 10% of friends\' trading fees!',
    reward: '750 UFO + Influencer Badge + Referral Rewards',
    difficulty: 'Easy',
    timeLeft: '5 days left',
    progress: 0,
    icon: <Users className="w-6 h-6" />,
    status: 'active',
    participants: 1256,
    isReferral: true
  },
  {
    id: '4',
    title: 'Galactic HODLer',
    description: 'Hold UFO tokens for 30 days without selling to prove your cosmic loyalty.',
    reward: '2,500 UFO + Diamond Hands Badge',
    difficulty: 'Hard',
    timeLeft: '12 days left',
    progress: 40,
    icon: <TrendingUp className="w-6 h-6" />,
    status: 'active',
    participants: 423
  },
  {
    id: '5',
    title: 'Alien Ambassador',
    description: 'Invite 10 friends to join the UFO invasion using your referral link and earn massive rewards.',
    reward: '5,000 UFO + Ambassador Badge + Ongoing Commissions',
    difficulty: 'Hard',
    timeLeft: '10 days left',
    progress: 25,
    icon: <Gift className="w-6 h-6" />,
    status: 'active',
    participants: 234,
    isReferral: true
  },
  {
    id: '6',
    title: 'Mission Commander',
    description: 'Complete all available missions to become a true UFO commander.',
    reward: '10,000 UFO + Commander Badge',
    difficulty: 'Epic',
    timeLeft: 'Complete other missions first',
    icon: <Award className="w-6 h-6" />,
    status: 'locked',
    participants: 0
  }
]

export default function MissionsSection() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'Hard': return 'text-orange-400 bg-orange-400/20'
      case 'Epic': return 'text-purple-400 bg-purple-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-ufo-beam text-ufo-beam'
      case 'completed': return 'border-green-400 text-green-400'
      case 'locked': return 'border-gray-500 text-gray-500'
      default: return 'border-gray-400 text-gray-400'
    }
  }

  const getMissionButton = (mission: Mission) => {
    if (mission.status === 'completed') {
      return (
        <motion.button
          className="px-4 py-2 rounded-full font-medium bg-green-400/20 text-green-400 cursor-default"
        >
          Completed
        </motion.button>
      )
    }
    
    if (mission.status === 'locked') {
      return (
        <motion.button
          className="px-4 py-2 rounded-full font-medium bg-gray-500/20 text-gray-500 cursor-not-allowed"
          disabled
        >
          Locked
        </motion.button>
      )
    }
    
    if (mission.isReferral) {
      return (
        <motion.a
          href={FOUR_MEME_REF_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border border-green-400/50 text-green-300 hover:text-white transition-all duration-300"
        >
          <ExternalLink className="w-4 h-4" />
          Start Mission
        </motion.a>
      )
    }
    
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-full font-medium bg-ufo-beam/20 text-ufo-beam hover:bg-ufo-beam hover:text-white transition-all duration-300"
      >
        Start Mission
      </motion.button>
    )
  }

  return (
    <section id="missions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            🚀 Invasion Missions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Complete epic UFO missions, earn cosmic rewards, and unlock exclusive badges. 
            Each mission brings you closer to becoming the ultimate space commander!
          </p>
          
          {/* Referral CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 mb-12 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center justify-center gap-2">
              🛸 Share & Earn Referral Rewards
            </h3>
            <p className="text-green-300/80 text-sm mb-4">
              Share UFO Token with your friends using your special referral link and earn <strong>10% of their trading fees</strong> on four.meme!
            </p>
            <ShareBar className="justify-center" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {mockMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: mission.status !== 'locked' ? 1.02 : 1 }}
              className={`card-cosmic relative overflow-hidden ${
                mission.status === 'locked' ? 'opacity-60' : ''
              } ${getStatusColor(mission.status)} border-2 ${
                mission.isReferral ? 'ring-2 ring-green-400/20' : ''
              }`}
            >
              {/* Referral Badge */}
              {mission.isReferral && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-green-500/30 to-blue-500/30 border border-green-400/50 rounded-full text-xs font-bold text-green-300">
                  💰 Referral Rewards
                </div>
              )}
              
              {/* Status indicator */}
              <div className="absolute top-4 right-4">
                {mission.status === 'completed' && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
                {mission.status === 'active' && (
                  <Clock className="w-6 h-6 text-ufo-beam animate-pulse" />
                )}
                {mission.status === 'locked' && (
                  <Target className="w-6 h-6 text-gray-500" />
                )}
              </div>

              <div className="flex items-start gap-4 mb-4 mt-6">
                <div className={`p-3 rounded-full ${mission.status === 'completed' ? 'bg-green-400/20' : 'bg-ufo-beam/20'}`}>
                  <div className={mission.status === 'completed' ? 'text-green-400' : 'text-ufo-beam'}>
                    {mission.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{mission.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-3 leading-relaxed">{mission.description}</p>
                  
                  {/* Progress bar for active missions */}
                  {mission.status === 'active' && typeof mission.progress === 'number' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-ufo-beam font-medium">{mission.progress}%</span>
                      </div>
                      <div className="w-full bg-cosmic-darker rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-ufo-beam to-cosmic-purple h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${mission.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {mission.participants.toLocaleString()} participating
                      </span>
                    </div>
                    <div className="text-ufo-beam font-medium">{mission.timeLeft}</div>
                  </div>
                </div>
              </div>
              
              {/* Special Social Mission Content */}
              {mission.isReferral && mission.status === 'active' && (
                <div className="mb-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg">
                  <p className="text-xs text-green-300 mb-3 text-center">
                    💡 Use these tools to complete your mission and earn ongoing rewards!
                  </p>
                  <ShareBar />
                </div>
              )}
              
              <div className="border-t border-ufo-beam/20 pt-4 flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-400">Reward:</span>
                  <div className="font-bold text-cosmic-yellow">{mission.reward}</div>
                </div>
                
                {getMissionButton(mission)}
              </div>
              
              {/* Beam effect for active missions */}
              {mission.status === 'active' && (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="beam-effect h-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-6">Ready to start your cosmic adventure?</p>
          <motion.a
            href={FOUR_MEME_REF_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-3"
          >
            <Star className="w-5 h-5" />
            Begin Invasion
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}