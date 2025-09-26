'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Send, 
  RefreshCw, 
  ExternalLink, 
  Zap, 
  AlertTriangle,
  Copy,
  Settings,
  Info
} from 'lucide-react';

// Import our custom components and utilities
import { useToast } from './ui/Toast';
import LoadingSpinner, { 
  WalletConnectingLoader, 
  TransactionLoader, 
  BalanceRefreshLoader,
  BeamLoader 
} from './ui/LoadingSpinner';
import { 
  UFO_CONTRACT_ADDRESS, 
  formatAddress 
} from '../lib/ufo-contract';
import { UFO_REOWN_CONFIG } from '../lib/reown';
import { FOUR_MEME_REF_URL } from '../config/links';
import ShareBar from './ShareBar';

// Simple Web3 detection
declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * 🛸 Enhanced UFO Wallet Component
 * Simplified version with basic Web3 connectivity and referral integration
 */
export default function UFOWallet() {
  const { showToast } = useToast();
  
  // Core state
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState<number | undefined>();
  const [ufoBalance, setUfoBalance] = useState('0');
  const [nativeBalance, setNativeBalance] = useState('0');
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  
  // Loading states
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const isCorrectNetwork = chainId === 56; // BNB Smart Chain
  
  /**
   * 🛸 Check wallet connection on load
   */
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            
            // Get chain ID
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setChainId(parseInt(chainId, 16));
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };
    
    checkConnection();
  }, []);
  
  /**
   * 🛸 WALLET CONNECTION HANDLER
   * Basic MetaMask connection
   */
  const handleConnect = useCallback(async () => {
    if (!window.ethereum) {
      showToast({
        type: 'error',
        title: 'Wallet Not Found',
        message: 'Please install MetaMask or another Web3 wallet to continue.'
      });
      return;
    }
    
    try {
      setIsConnecting(true);
      showToast({
        type: 'info',
        title: 'Connecting Wallet',
        message: 'Please check your wallet for connection request...'
      });
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        
        // Get chain ID
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));
        
        showToast({
          type: 'success',
          title: 'Wallet Connected! 🚀',
          message: `Connected to ${formatAddress(accounts[0])}`,
          duration: 5000
        });
      }
      
    } catch (error: any) {
      console.error('Connection error:', error);
      showToast({
        type: 'error',
        title: 'Connection Failed',
        message: error.message || 'Unable to connect wallet. Please try again.'
      });
    } finally {
      setIsConnecting(false);
    }
  }, [showToast]);
  
  /**
   * 🛸 COPY TO CLIPBOARD
   */
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast({
        type: 'success',
        title: 'Copied!',
        message: `${label} copied to clipboard`
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Copy Failed',
        message: 'Unable to copy to clipboard'
      });
    }
  }, [showToast]);
  
  /**
   * 🛸 SWITCH TO BNB CHAIN
   */
  const switchToBNBChain = useCallback(async () => {
    if (!window.ethereum) return;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // BNB Chain ID in hex
      });
    } catch (switchError: any) {
      // Chain not added to wallet
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x38',
                chainName: 'BNB Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding BNB Chain:', addError);
        }
      }
    }
  }, []);
  
  // === RENDER ===
  
  return (
    <motion.div 
      className="relative bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8 max-w-md mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated UFO Background */}
      <div className="absolute top-4 right-4 opacity-10">
        <motion.div
          animate={{ 
            x: [-10, 10, -10],
            y: [-5, 5, -5],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-6xl"
        >
          🛸
        </motion.div>
      </div>
      
      {/* Header Section */}
      <div className="text-center mb-6 relative z-10">
        <motion.div 
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🛸
        </motion.div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          UFO Wallet
        </h2>
        <p className="text-green-300/70 text-sm mt-2">Beam Your Way to the Moon</p>
        
        {/* Network Status */}
        {isConnected && (
          <div className="flex justify-center mt-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${
              isCorrectNetwork 
                ? 'bg-green-500/20 border-green-400/50 text-green-300'
                : 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isCorrectNetwork ? 'bg-green-400' : 'bg-yellow-400'
              }`} />
              {isCorrectNetwork ? 'BNB Smart Chain' : `Chain ID: ${chainId}`}
            </div>
          </div>
        )}
      </div>

      {/* Connection State */}
      {!isConnected ? (
        <div className="space-y-4">
          {isConnecting && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-500/20 border border-blue-400/50 rounded-xl p-4"
            >
              <WalletConnectingLoader />
            </motion.div>
          )}
          
          <motion.button 
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            whileHover={{ scale: isConnecting ? 1 : 1.02 }}
            whileTap={{ scale: isConnecting ? 1 : 0.98 }}
          >
            {isConnecting ? (
              <BeamLoader size="sm" />
            ) : (
              <Wallet className="w-6 h-6" />
            )}
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </motion.button>
          
          {/* Supported Wallets Info */}
          <div className="text-center text-xs text-green-300/60">
            MetaMask • Trust Wallet • WalletConnect Compatible
          </div>
          
          {/* Referral Promotion */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-4 mt-4">
            <p className="text-green-300 text-sm text-center mb-3">
              💰 <strong>Earn 10% referral fees</strong> when friends trade UFO!
            </p>
            <ShareBar className="justify-center" />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Wallet Information Card */}
          <div className="bg-black/20 rounded-xl p-4 border border-green-400/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-green-300/70 text-sm">Connected Address:</span>
              <button
                onClick={() => copyToClipboard(address, 'Address')}
                className="flex items-center gap-1 text-white font-mono text-sm hover:text-green-300 transition-colors"
              >
                {formatAddress(address)}
                <Copy className="w-3 h-3" />
              </button>
            </div>
            
            {/* UFO Token Contract Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-300/50">UFO Token Contract:</span>
                <button
                  onClick={() => copyToClipboard(UFO_CONTRACT_ADDRESS, 'Contract Address')}
                  className="text-green-300/70 hover:text-green-300 font-mono flex items-center gap-1 transition-colors"
                >
                  {formatAddress(UFO_CONTRACT_ADDRESS)}
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Network Warning */}
            {!isCorrectNetwork && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 bg-yellow-500/20 border border-yellow-400/50 rounded-lg text-yellow-300 text-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">Wrong Network</span>
                </div>
                <p className="text-xs mb-3">
                  UFO Token is available on BNB Smart Chain. Please switch networks to interact with the token.
                </p>
                <button
                  onClick={switchToBNBChain}
                  className="w-full bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-200 font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  Switch to BNB Chain
                </button>
              </motion.div>
            )}
          </div>

          {/* Token Information & Trading */}
          <div className="bg-black/20 rounded-xl p-4 border border-green-400/20">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              UFO Token Trading
            </h3>
            
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-green-300/70">Symbol:</span>
                <span className="text-green-300 font-bold">UFO</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-green-300/70">Network:</span>
                <span className="text-green-300">BNB Smart Chain</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-green-300/70">Trade & Earn:</span>
                <span className="text-green-400 font-bold">💰 10% Referral Fees</span>
              </div>
            </div>

            {/* Trading CTA */}
            <a 
              href={FOUR_MEME_REF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg text-white font-bold transition-all duration-300 mb-4"
            >
              <ExternalLink className="w-4 h-4" />
              Trade UFO on four.meme
            </a>
            
            {/* Share Section */}
            <div className="border-t border-green-400/20 pt-4">
              <p className="text-green-300/60 text-xs text-center mb-3">
                🚀 Share with friends and earn ongoing trading fee rewards!
              </p>
              <ShareBar />
            </div>
          </div>

          {/* Advanced Options (collapsed by default) */}
          <motion.div 
            className="bg-black/20 rounded-xl border border-green-400/20 overflow-hidden"
          >
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-green-400/5 transition-colors"
            >
              <span className="text-green-400 font-medium flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Advanced Options
              </span>
              <motion.div
                animate={{ rotate: showAdvanced ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Info className="w-4 h-4 text-green-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-green-400/20"
                >
                  <div className="p-4 space-y-3 text-sm">
                    <p className="text-green-300/60 text-xs">
                      🔧 Advanced wallet features and token management will be available in future updates.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button className="p-2 bg-gray-700/30 rounded text-gray-400 text-xs" disabled>
                        Add Token
                      </button>
                      <button className="p-2 bg-gray-700/30 rounded text-gray-400 text-xs" disabled>
                        View on BSCScan
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Footer Links */}
      <div className="mt-6 text-center space-y-2">
        <div className="text-xs text-green-300/50">
          Powered by Web3 • Secure • Decentralized
        </div>
      </div>
    </motion.div>
  );
}