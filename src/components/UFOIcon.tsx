'use client'

import { motion } from 'framer-motion'

interface UFOIconProps {
  size?: number
  className?: string
  animate?: boolean
}

export default function UFOIcon({ size = 100, className = '', animate = true }: UFOIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={animate ? {
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* UFO Body Gradient */}
        <defs>
          <radialGradient id="ufoBody" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="50%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#6B7280" />
          </radialGradient>
          <radialGradient id="ufoBase" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#1F2937" />
          </radialGradient>
          <radialGradient id="beam" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* UFO Beam */}
        <motion.path
          d="M85 130 L100 170 L115 130 Z"
          fill="url(#beam)"
          animate={animate ? {
            opacity: [0.3, 0.8, 0.3],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* UFO Base/Bottom */}
        <ellipse
          cx="100"
          cy="130"
          rx="50"
          ry="15"
          fill="url(#ufoBase)"
          className="ufo-glow"
        />
        
        {/* UFO Main Body */}
        <ellipse
          cx="100"
          cy="110"
          rx="60"
          ry="35"
          fill="url(#ufoBody)"
          className="ufo-glow"
        />
        
        {/* UFO Cockpit/Dome */}
        <ellipse
          cx="100"
          cy="95"
          rx="35"
          ry="25"
          fill="#00D4FF"
          opacity="0.7"
          className="animate-pulse"
        />
        
        {/* UFO Lights */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180)
          const x = 100 + 45 * Math.cos(angle)
          const y = 115 + 10 * Math.sin(angle)
          
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#FBBF24"
              animate={animate ? {
                opacity: [0.3, 1, 0.3],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
              className="drop-shadow-lg"
            />
          )
        })}
        
        {/* Floating Coins */}
        {animate && [...Array(3)].map((_, i) => (
          <motion.g key={`coin-${i}`}>
            <motion.circle
              cx={70 + i * 30}
              cy={160 + i * 5}
              r="8"
              fill="#FBBF24"
              animate={{
                y: [-5, 5, -5],
                x: [-2, 2, -2],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
            <motion.text
              x={70 + i * 30}
              y={165 + i * 5}
              textAnchor="middle"
              fill="#1F2937"
              fontSize="10"
              fontWeight="bold"
              animate={{
                y: [-5, 5, -5],
                x: [-2, 2, -2],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            >
              $
            </motion.text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  )
}