'use client';

import React, { useState, useEffect } from 'react';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import { motion } from 'framer-motion';
import { Wallet, Send, RefreshCw, ExternalLink, Zap } from 'lucide-react';
import { 
  UFO_CONTRACT_ADDRESS, 
  UFO_ABI, 
  formatUFOBalance, 
  parseUFOAmount, 
  isValidAddress,
  formatAddress 
} from '../lib/ufo-contract';

export default function UFOWallet() {
  const { open } = useAppKit();
  const { address, isConnected, chainId } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  
  const [ufoBalance, setUfoBalance] = useState('0');
  const [loading, setLoading] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  // Funcție pentru obținerea balanței UFO
  const getUFOBalance = async () => {
    if (!isConnected || !address || !walletProvider) return;
    
    try {
      setLoading(true);
      setError('');
      const provider = new BrowserProvider(walletProvider);
      const contract = new Contract(UFO_CONTRACT_ADDRESS, UFO_ABI, provider);
      const balance = await contract.balanceOf(address);
      setUfoBalance(formatUFOBalance(balance));
    } catch (error) {
      console.error('Eroare la obținerea balanței UFO:', error);
      setError('Nu s-a putut obține balanța UFO');
    } finally {
      setLoading(false);
    }
  };

  // Funcție pentru transfer UFO Token
  const transferUFO = async () => {
    if (!isConnected || !transferAddress || !transferAmount) return;
    if (!isValidAddress(transferAddress)) {
      setError('Adresa destinatar invalidă');
      return;
    }
    
    setLoading(true);
    setError('');
    setTxHash('');
    
    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const contract = new Contract(UFO_CONTRACT_ADDRESS, UFO_ABI, signer);
      
      const tx = await contract.transfer(
        transferAddress, 
        parseUFOAmount(transferAmount)
      );
      
      setTxHash(tx.hash);
      console.log('Tranzacția trimisă:', tx.hash);
      
      // Așteaptă confirmarea
      await tx.wait();
      console.log('Tranzacția confirmată!');
      
      // Actualizează balanța după transfer
      await getUFOBalance();
      setTransferAddress('');
      setTransferAmount('');
      
    } catch (error: any) {
      console.error('Eroare la transfer:', error);
      setError(error.message || 'Eroare la trimiterea tranzacției');
    } finally {
      setLoading(false);
    }
  };

  // Actualizează balanța când wallet-ul se conectează
  useEffect(() => {
    if (isConnected && chainId === 56) { // BNB Chain
      getUFOBalance();
    }
  }, [isConnected, address, chainId]);

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* UFO Header */}
      <div className="text-center mb-6">
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
      </div>

      {/* Eroare */}
      {error && (
        <motion.div 
          className="bg-red-500/20 border border-red-400/50 rounded-lg p-3 mb-4 text-red-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {/* Buton pentru conectare wallet */}
      {!isConnected ? (
        <motion.button 
          onClick={() => open()} 
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Wallet className="w-6 h-6" />
          Conectează Wallet-ul
        </motion.button>
      ) : (
        <div className="space-y-4">
          {/* Informații wallet */}
          <div className="bg-black/20 rounded-xl p-4 border border-green-400/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-300/70 text-sm">Adresă:</span>
              <span className="text-white font-mono text-sm">{formatAddress(address || '')}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-green-300/70 text-sm">Balanță UFO:</span>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">{parseFloat(ufoBalance).toFixed(4)} UFO</span>
                <motion.button
                  onClick={getUFOBalance}
                  disabled={loading}
                  className="text-green-400 hover:text-green-300 transition-colors"
                  whileHover={{ rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </motion.button>
              </div>
            </div>
            
            {/* Avertisment pentru rețeaua greșită */}
            {chainId !== 56 && (
              <div className="mt-3 p-2 bg-yellow-500/20 border border-yellow-400/50 rounded-lg text-yellow-300 text-xs">
                ⚠️ Conectați-vă la BNB Smart Chain pentru a vedea UFO Token
              </div>
            )}
          </div>

          {/* Secțiunea pentru transfer */}
          <div className="bg-black/20 rounded-xl p-4 border border-green-400/20">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <Send className="w-4 h-4" />
              Transfer UFO Token
            </h3>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Adresa destinatar (0x...)"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                className="w-full bg-black/30 border border-green-400/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors text-sm"
              />
              
              <input
                type="number"
                step="0.000001"
                placeholder="Suma UFO"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full bg-black/30 border border-green-400/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors text-sm"
              />
              
              <motion.button 
                onClick={transferUFO}
                disabled={loading || !transferAddress || !transferAmount || chainId !== 56}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Se procesează...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Trimite UFO 🚀
                  </>
                )}
              </motion.button>
            </div>

            {/* Hash-ul tranzacției */}
            {txHash && (
              <motion.div 
                className="mt-3 p-3 bg-green-500/20 border border-green-400/50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-green-300 text-sm mb-2">✅ Tranzacție trimisă!</p>
                <a 
                  href={`https://bscscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-xs font-mono flex items-center gap-1 break-all"
                >
                  {txHash.slice(0, 20)}...
                  <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Link către four.meme */}
      <div className="mt-6 text-center">
        <a 
          href="https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400/70 hover:text-green-300 text-xs flex items-center justify-center gap-1 transition-colors"
        >
          Vezi pe four.meme
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}