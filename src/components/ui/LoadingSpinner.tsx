'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Zap, Wallet, Send } from 'lucide-react';

// Loading Spinner Types
type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
type SpinnerVariant = 'default' | 'ufo' | 'beam' | 'pulse' | 'orbit';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  text?: string;
  className?: string;
}

// Size configurations
const sizeConfig: Record<SpinnerSize, { spinner: string; text: string }> = {
  sm: { spinner: 'w-4 h-4', text: 'text-xs' },
  md: { spinner: 'w-6 h-6', text: 'text-sm' },
  lg: { spinner: 'w-8 h-8', text: 'text-base' },
  xl: { spinner: 'w-12 h-12', text: 'text-lg' }
};

// UFO Spinner Component
export function UFOSpinner({ size = 'md', className = '' }: { size?: SpinnerSize; className?: string }) {
  const sizeClass = sizeConfig[size].spinner;
  
  return (
    <motion.div
      className={`${sizeClass} ${className}`}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      🛸
    </motion.div>
  );
}

// Beam Loading Animation
export function BeamLoader({ size = 'md', className = '' }: { size?: SpinnerSize; className?: string }) {
  const sizeClass = sizeConfig[size].spinner;
  
  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {/* Central UFO */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-green-400"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        🛸
      </motion.div>
      
      {/* Beam Rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 bg-gradient-to-t from-green-400 to-transparent rounded"
          style={{
            height: '200%',
            left: '50%',
            top: '-50%',
            transformOrigin: 'bottom center',
            transform: `rotate(${i * 45}deg) translateX(-50%)`
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Orbital Loading Animation
export function OrbitLoader({ size = 'md', className = '' }: { size?: SpinnerSize; className?: string }) {
  const sizeClass = sizeConfig[size].spinner;
  
  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {/* Central UFO */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          🛸
        </motion.div>
      </div>
      
      {/* Orbiting Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          style={{
            left: '50%',
            top: '50%'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 1.5 + i * 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div 
            className="w-1 h-1 bg-green-400 rounded-full"
            style={{
              transform: `translateX(${12 + i * 4}px) translateY(-50%)`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Main Loading Spinner Component
export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  text, 
  className = '' 
}: LoadingSpinnerProps) {
  const { spinner: sizeClass, text: textClass } = sizeConfig[size];
  
  const renderSpinner = () => {
    switch (variant) {
      case 'ufo':
        return <UFOSpinner size={size} className="text-green-400" />;
      case 'beam':
        return <BeamLoader size={size} />;
      case 'orbit':
        return <OrbitLoader size={size} />;
      case 'pulse':
        return (
          <motion.div
            className={`${sizeClass} text-green-400`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            🛸
          </motion.div>
        );
      default:
        return (
          <Loader2 
            className={`${sizeClass} text-green-400 animate-spin`} 
          />
        );
    }
  };
  
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {renderSpinner()}
      {text && (
        <motion.p 
          className={`${textClass} text-green-300/80 font-medium`}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Specific Loading States for UFO Wallet
export function WalletConnectingLoader() {
  return (
    <div className="flex items-center gap-3 p-4">
      <BeamLoader size="sm" />
      <div>
        <p className="text-green-400 font-medium text-sm">Connecting Wallet</p>
        <p className="text-green-300/60 text-xs">Please check your wallet for connection request...</p>
      </div>
    </div>
  );
}

export function TransactionLoader({ txHash }: { txHash?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <OrbitLoader size="lg" />
      <div className="text-center">
        <p className="text-green-400 font-medium mb-2">Transaction Processing</p>
        <p className="text-green-300/60 text-sm mb-3">
          Your UFO tokens are being beamed across the blockchain...
        </p>
        {txHash && (
          <a 
            href={`https://bscscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs font-mono transition-colors"
          >
            View on BSCScan →
          </a>
        )}
      </div>
    </div>
  );
}

export function BalanceRefreshLoader() {
  return (
    <motion.div 
      className="inline-flex items-center gap-1"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <UFOSpinner size="sm" />
      <span className="text-xs text-green-300/70">Updating...</span>
    </motion.div>
  );
}