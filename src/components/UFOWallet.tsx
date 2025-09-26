'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Send, 
  RefreshCw, 
  ExternalLink, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Copy,
  Settings,
  Info,
  Shield
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
  UFO_ABI, 
  formatUFOBalance, 
  parseUFOAmount, 
  formatAddress 
} from '../lib/ufo-contract';
import { 
  validateTransfer, 
  getNetworkInfo, 
  estimateGasCost,
  formatValidationError,
  formatValidationWarning
} from '../lib/wallet-validation';

/**
 * 🛸 Enhanced UFO Wallet Component
 * 
 * Features:
 * - Visual loading states for all operations
 * - Toast notifications for success/error states
 * - Comprehensive validation with edge cases
 * - Improved UX flow with proper feedback
 * - Advanced error handling and recovery
 */
export default function UFOWallet() {
  // === HOOKS AND STATE MANAGEMENT ===
  const { open } = useAppKit();
  const { address, isConnected, caipAddress } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const { showToast } = useToast();
  
  // Extract chainId from caipAddress (format: "eip155:56:0x...")
  const chainId = useMemo(() => {
    if (!caipAddress) return undefined;
    const parts = caipAddress.split(':');
    return parts.length >= 2 ? parseInt(parts[1]) : undefined;
  }, [caipAddress]);
  
  // Core state
  const [ufoBalance, setUfoBalance] = useState('0');
  const [nativeBalance, setNativeBalance] = useState('0');
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  
  // Loading states
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationState, setValidationState] = useState<{
    errors: string[];
    warnings: string[];
  }>({ errors: [], warnings: [] });
  
  // === COMPUTED VALUES ===
  const networkInfo = useMemo(() => {
    return chainId ? getNetworkInfo(chainId) : null;
  }, [chainId]);
  
  const gasCost = useMemo(() => {
    return chainId ? estimateGasCost(chainId) : null;
  }, [chainId]);
  
  const isCorrectNetwork = chainId === 56; // BNB Smart Chain
  const hasInsufficientGas = gasCost && parseFloat(nativeBalance) < gasCost.warningThreshold;
  
  /**
   * 🛸 WALLET CONNECTION HANDLER
   * Enhanced connection with loading states and error handling
   */
  const handleConnect = useCallback(async () => {
    try {
      setIsConnecting(true);
      showToast({
        type: 'info',
        title: 'Connecting Wallet',
        message: 'Please check your wallet for connection request...'
      });
      
      await open();
      
    } catch (error) {
      console.error('Connection error:', error);
      showToast({
        type: 'error',
        title: 'Connection Failed',
        message: 'Unable to connect wallet. Please try again.'
      });
    } finally {
      setIsConnecting(false);
    }
  }, [open, showToast]);
  
  /**
   * 🛸 BALANCE FETCHING
   * Fetches both UFO token and native token balances
   */
  const fetchBalances = useCallback(async (showLoader = true) => {
    if (!isConnected || !address || !walletProvider) return;
    
    try {
      if (showLoader) setIsLoadingBalance(true);
      
      const provider = new BrowserProvider(walletProvider as any);
      const contract = new Contract(UFO_CONTRACT_ADDRESS, UFO_ABI, provider);
      
      // Fetch UFO balance
      const ufoBalanceResult = await contract.balanceOf(address);
      const formattedUFOBalance = formatUFOBalance(ufoBalanceResult);
      setUfoBalance(formattedUFOBalance);
      
      // Fetch native token balance (BNB, ETH, etc.)
      const nativeBalanceResult = await provider.getBalance(address);
      const formattedNativeBalance = formatUFOBalance(nativeBalanceResult);
      setNativeBalance(formattedNativeBalance);
      
    } catch (error) {
      console.error('Error fetching balances:', error);
      showToast({
        type: 'error',
        title: 'Balance Update Failed',
        message: 'Unable to fetch current balances. Please try again.'
      });
    } finally {
      if (showLoader) setIsLoadingBalance(false);
    }
  }, [isConnected, address, walletProvider, showToast]);
  
  /**
   * 🛸 BALANCE REFRESH
   * Refreshes balances with visual feedback
   */
  const refreshBalances = useCallback(async () => {
    setIsRefreshing(true);
    await fetchBalances(false);
    setTimeout(() => setIsRefreshing(false), 500); // Minimum loading time for UX
    
    showToast({
      type: 'success',
      title: 'Balances Updated',
      message: 'Your wallet balances have been refreshed.'
    });
  }, [fetchBalances, showToast]);
  
  /**
   * 🛸 REAL-TIME VALIDATION
   * Validates transfer inputs in real-time
   */
  const validateInputs = useCallback(() => {
    if (!transferAddress && !transferAmount) {
      setValidationState({ errors: [], warnings: [] });
      return;
    }
    
    const validation = validateTransfer({
      fromAddress: address || '',
      toAddress: transferAddress,
      amount: transferAmount,
      balance: ufoBalance,
      chainId
    });
    
    setValidationState({
      errors: validation.errors,
      warnings: validation.warnings
    });
  }, [transferAddress, transferAmount, address, ufoBalance, chainId]);
  
  /**
   * 🛸 TOKEN TRANSFER HANDLER
   * Enhanced transfer with comprehensive validation and feedback
   */
  const handleTransfer = useCallback(async () => {
    if (!isConnected || !transferAddress || !transferAmount || !walletProvider) return;
    
    // Final validation before transfer
    const validation = validateTransfer({
      fromAddress: address || '',
      toAddress: transferAddress,
      amount: transferAmount,
      balance: ufoBalance,
      chainId
    });
    
    if (!validation.isValid) {
      showToast({
        type: 'error',
        title: 'Transfer Validation Failed',
        message: formatValidationError(validation.errors)
      });
      return;
    }
    
    // Show warnings if any
    if (validation.warnings.length > 0) {
      showToast({
        type: 'warning',
        title: 'Please Review',
        message: formatValidationWarning(validation.warnings),
        duration: 7000
      });
    }
    
    setIsTransferring(true);
    setTxHash('');
    
    try {
      const provider = new BrowserProvider(walletProvider as any);
      const signer = await provider.getSigner();
      const contract = new Contract(UFO_CONTRACT_ADDRESS, UFO_ABI, signer);
      
      // Estimate gas first
      showToast({
        type: 'info',
        title: 'Preparing Transaction',
        message: 'Estimating gas costs and preparing your transfer...'
      });
      
      const gasEstimate = await contract.transfer.estimateGas(
        transferAddress, 
        parseUFOAmount(transferAmount)
      );
      
      // Execute transfer
      const tx = await contract.transfer(
        transferAddress, 
        parseUFOAmount(transferAmount),
        { gasLimit: gasEstimate }
      );
      
      setTxHash(tx.hash);
      
      showToast({
        type: 'info',
        title: 'Transaction Submitted',
        message: `Transaction submitted! Hash: ${tx.hash.slice(0, 10)}...`,
        action: {
          label: 'View on BSCScan',
          onClick: () => window.open(`https://bscscan.com/tx/${tx.hash}`, '_blank')
        }
      });
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        showToast({
          type: 'success',
          title: 'Transfer Successful! 🚀',
          message: `Successfully sent ${transferAmount} UFO tokens!`,
          duration: 8000,
          action: {
            label: 'View Transaction',
            onClick: () => window.open(`https://bscscan.com/tx/${tx.hash}`, '_blank')
          }
        });
        
        // Reset form and refresh balances
        setTransferAddress('');
        setTransferAmount('');
        await fetchBalances(false);
        
      } else {
        throw new Error('Transaction failed');
      }
      
    } catch (error: any) {
      console.error('Transfer error:', error);
      
      let errorMessage = 'Transaction failed. Please try again.';
      
      // Handle specific error types
      if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transaction was rejected by user.';
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = 'Insufficient funds for gas fees.';
      } else if (error.message?.includes('execution reverted')) {
        errorMessage = 'Transaction reverted. Check token balance and allowances.';
      }
      
      showToast({
        type: 'error',
        title: 'Transfer Failed',
        message: errorMessage,
        duration: 8000
      });
    } finally {
      setIsTransferring(false);
    }
  }, [
    isConnected, transferAddress, transferAmount, address, ufoBalance, 
    chainId, walletProvider, showToast, fetchBalances
  ]);
  
  /**
   * 🛸 COPY TO CLIPBOARD
   * Helper function with feedback
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
  
  // === EFFECTS ===
  
  // Auto-fetch balances when wallet connects
  useEffect(() => {
    if (isConnected && isCorrectNetwork) {
      fetchBalances();
    }
  }, [isConnected, isCorrectNetwork, fetchBalances]);
  
  // Real-time input validation
  useEffect(() => {
    const debounceTimer = setTimeout(validateInputs, 300);
    return () => clearTimeout(debounceTimer);
  }, [validateInputs]);
  
  // Connection success feedback
  useEffect(() => {
    if (isConnected && !isConnecting) {
      showToast({
        type: 'success',
        title: 'Wallet Connected! 🚀',
        message: `Connected to ${formatAddress(address || '')}`,
        duration: 5000
      });
    }
  }, [isConnected, isConnecting, address, showToast]);
  
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
              {networkInfo?.name || 'Unknown Network'}
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
            Supports 700+ wallets via Reown • MetaMask • Trust Wallet • Social Login
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Wallet Information Card */}
          <div className="bg-black/20 rounded-xl p-4 border border-green-400/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-green-300/70 text-sm">Connected Address:</span>
              <button
                onClick={() => copyToClipboard(address || '', 'Address')}
                className="flex items-center gap-1 text-white font-mono text-sm hover:text-green-300 transition-colors"
              >
                {formatAddress(address || '')}
                <Copy className="w-3 h-3" />
              </button>
            </div>
            
            {/* Balance Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-green-300/70 text-sm">UFO Balance:</span>
                <div className="flex items-center gap-2">
                  {isLoadingBalance ? (
                    <BalanceRefreshLoader />
                  ) : (
                    <>
                      <span className="text-green-400 font-bold">
                        {parseFloat(ufoBalance).toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 6
                        })} UFO
                      </span>
                      <motion.button
                        onClick={refreshBalances}
                        disabled={isRefreshing}
                        className="text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                        whileHover={{ rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Native Token Balance */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-300/50">{networkInfo?.currency || 'Native'} Balance:</span>
                <span className={`${hasInsufficientGas ? 'text-yellow-400' : 'text-green-300/70'}`}>
                  {parseFloat(nativeBalance).toFixed(4)} {networkInfo?.currency || 'Tokens'}
                  {hasInsufficientGas && (
                    <AlertTriangle className="w-3 h-3 inline ml-1" />
                  )}
                </span>
              </div>
            </div>
            
            {/* Network Warning */}
            {!isCorrectNetwork && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-2 bg-yellow-500/20 border border-yellow-400/50 rounded-lg text-yellow-300 text-xs flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Switch to BNB Smart Chain to interact with UFO Token</span>
              </motion.div>
            )}
            
            {/* Low Gas Warning */}
            {hasInsufficientGas && isCorrectNetwork && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-2 bg-yellow-500/20 border border-yellow-400/50 rounded-lg text-yellow-300 text-xs flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  Low {networkInfo?.currency} balance. You may need more for transaction fees.
                </span>
              </motion.div>
            )}
          </div>

          {/* Transfer Section */}
          <div className="bg-black/20 rounded-xl p-4 border border-green-400/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-400 font-semibold flex items-center gap-2">
                <Send className="w-4 h-4" />
                Transfer UFO Token
              </h3>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-green-300/60 hover:text-green-300 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {/* Recipient Address Input */}
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Recipient address (0x...)"
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  className={`w-full bg-black/30 border rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none transition-colors text-sm ${
                    validationState.errors.some(e => e.toLowerCase().includes('address'))
                      ? 'border-red-400 focus:border-red-300'
                      : 'border-green-400/30 focus:border-green-400'
                  }`}
                  disabled={isTransferring}
                />
              </div>
              
              {/* Amount Input */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    type="number"
                    step="0.000001"
                    placeholder="Amount (UFO)"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className={`w-full bg-black/30 border rounded-lg px-3 py-2 pr-16 text-white placeholder-gray-400 focus:outline-none transition-colors text-sm ${
                      validationState.errors.some(e => e.toLowerCase().includes('amount') || e.toLowerCase().includes('balance'))
                        ? 'border-red-400 focus:border-red-300'
                        : 'border-green-400/30 focus:border-green-400'
                    }`}
                    disabled={isTransferring}
                  />
                  <button
                    onClick={() => setTransferAmount(ufoBalance)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-green-400 hover:text-green-300 transition-colors"
                    disabled={isTransferring}
                  >
                    MAX
                  </button>
                </div>
              </div>
              
              {/* Validation Messages */}
              <AnimatePresence>
                {validationState.errors.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-2 bg-red-500/20 border border-red-400/50 rounded-lg text-red-300 text-xs space-y-1"
                  >
                    {validationState.errors.map((error, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {validationState.warnings.length > 0 && validationState.errors.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-2 bg-yellow-500/20 border border-yellow-400/50 rounded-lg text-yellow-300 text-xs space-y-1"
                  >
                    {validationState.warnings.map((warning, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <Info className="w-3 h-3 flex-shrink-0" />
                        <span>{warning}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Advanced Options */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-black/30 rounded-lg border border-green-400/20 space-y-2"
                  >
                    <div className="text-xs text-green-300/70 mb-2 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Transaction Details
                    </div>
                    
                    {gasCost && (
                      <div className="flex justify-between text-xs">
                        <span className="text-green-300/60">Estimated Gas:</span>
                        <span className="text-green-300">
                          ~{gasCost.estimatedGas} {gasCost.nativeToken}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-green-300/60">Network:</span>
                      <span className="text-green-300">{networkInfo?.name}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Transfer Button */}
              <motion.button 
                onClick={handleTransfer}
                disabled={
                  isTransferring || 
                  !transferAddress || 
                  !transferAmount || 
                  !isCorrectNetwork || 
                  validationState.errors.length > 0
                }
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                whileHover={{ scale: isTransferring ? 1 : 1.02 }}
                whileTap={{ scale: isTransferring ? 1 : 0.98 }}
              >
                {isTransferring ? (
                  <>
                    <BeamLoader size="sm" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Send UFO 🚀
                  </>
                )}
              </motion.button>
            </div>

            {/* Transaction Status */}
            <AnimatePresence>
              {isTransferring && txHash && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <TransactionLoader txHash={txHash} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Footer Links */}
      <div className="mt-6 text-center space-y-2">
        <a 
          href="https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400/70 hover:text-green-300 text-xs flex items-center justify-center gap-1 transition-colors"
        >
          🚀 Trade on four.meme
          <ExternalLink className="w-3 h-3" />
        </a>
        
        <div className="text-xs text-green-300/50">
          Powered by Reown • Secure • Decentralized
        </div>
      </div>
    </motion.div>
  );
}