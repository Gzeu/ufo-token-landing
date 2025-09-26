import { ethers } from 'ethers';
import { UFO_TOKEN_INFO } from './ufo-contract';

// Validation Result Interface
interface ValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

// Network Configuration
const SUPPORTED_NETWORKS = {
  56: {
    name: 'BNB Smart Chain',
    currency: 'BNB',
    explorer: 'https://bscscan.com',
    rpc: 'https://bsc-dataseed.binance.org'
  },
  1: {
    name: 'Ethereum Mainnet',
    currency: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: 'https://mainnet.infura.io/v3'
  },
  137: {
    name: 'Polygon',
    currency: 'MATIC',
    explorer: 'https://polygonscan.com',
    rpc: 'https://polygon-rpc.com'
  }
};

/**
 * 🛸 ADDRESS VALIDATION
 * Validates Ethereum addresses with comprehensive checks
 */
export function validateAddress(address: string): ValidationResult {
  // Empty address check
  if (!address || address.trim() === '') {
    return {
      isValid: false,
      error: 'Address is required'
    };
  }

  // Basic format check
  if (!address.startsWith('0x')) {
    return {
      isValid: false,
      error: 'Address must start with 0x'
    };
  }

  // Length check
  if (address.length !== 42) {
    return {
      isValid: false,
      error: 'Address must be 42 characters long'
    };
  }

  // Ethers.js validation
  if (!ethers.isAddress(address)) {
    return {
      isValid: false,
      error: 'Invalid Ethereum address format'
    };
  }

  // Checksum validation
  const checksumAddress = ethers.getAddress(address);
  if (address !== checksumAddress && address !== address.toLowerCase()) {
    return {
      isValid: true,
      warning: 'Address checksum is invalid. Consider using the correct case.'
    };
  }

  return { isValid: true };
}

/**
 * 🛸 AMOUNT VALIDATION
 * Validates token transfer amounts with balance and precision checks
 */
export function validateTransferAmount(
  amount: string,
  balance: string,
  decimals: number = 18
): ValidationResult {
  // Empty amount check
  if (!amount || amount.trim() === '') {
    return {
      isValid: false,
      error: 'Amount is required'
    };
  }

  // Numeric validation
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return {
      isValid: false,
      error: 'Amount must be a valid number'
    };
  }

  // Positive amount check
  if (numAmount <= 0) {
    return {
      isValid: false,
      error: 'Amount must be greater than 0'
    };
  }

  // Decimal precision check
  const decimalPlaces = (amount.split('.')[1] || '').length;
  if (decimalPlaces > decimals) {
    return {
      isValid: false,
      error: `Amount cannot have more than ${decimals} decimal places`
    };
  }

  // Balance check
  const numBalance = parseFloat(balance);
  if (numAmount > numBalance) {
    return {
      isValid: false,
      error: `Insufficient balance. Available: ${numBalance.toFixed(6)} UFO`
    };
  }

  // Dust amount warning (very small amounts)
  if (numAmount < 0.000001) {
    return {
      isValid: true,
      warning: 'Amount is very small and may not be processed by some wallets'
    };
  }

  // Large amount warning (>90% of balance)
  if (numAmount > numBalance * 0.9) {
    return {
      isValid: true,
      warning: 'You are transferring most of your balance. Keep some UFO for future transactions.'
    };
  }

  return { isValid: true };
}

/**
 * 🛸 NETWORK VALIDATION
 * Validates current network and provides switching guidance
 */
export function validateNetwork(chainId: number | undefined): ValidationResult {
  if (!chainId) {
    return {
      isValid: false,
      error: 'No network detected. Please connect your wallet.'
    };
  }

  // Check if network is supported
  if (!SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS]) {
    return {
      isValid: false,
      error: `Unsupported network (Chain ID: ${chainId}). Please switch to BNB Smart Chain, Ethereum, or Polygon.`
    };
  }

  // UFO Token is primarily on BNB Chain
  if (chainId !== 56) {
    return {
      isValid: true,
      warning: `You are on ${SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS].name}. UFO Token is primarily available on BNB Smart Chain.`
    };
  }

  return { isValid: true };
}

/**
 * 🛸 SELF-TRANSFER VALIDATION
 * Prevents transferring tokens to the same address
 */
export function validateSelfTransfer(fromAddress: string, toAddress: string): ValidationResult {
  if (!fromAddress || !toAddress) {
    return { isValid: true }; // Let other validations handle empty addresses
  }

  if (fromAddress.toLowerCase() === toAddress.toLowerCase()) {
    return {
      isValid: false,
      error: 'Cannot transfer tokens to your own address'
    };
  }

  return { isValid: true };
}

/**
 * 🛸 CONTRACT ADDRESS VALIDATION
 * Prevents transferring to known contract addresses that might lock tokens
 */
export function validateContractAddress(address: string): ValidationResult {
  // List of known addresses to warn against
  const dangerousAddresses = [
    '0x000000000000000000000000000000000000dead', // Burn address
    '0x0000000000000000000000000000000000000000', // Zero address
    UFO_TOKEN_INFO.address?.toLowerCase(), // UFO Token contract itself
  ];

  const lowerAddress = address.toLowerCase();
  
  if (dangerousAddresses.includes(lowerAddress)) {
    return {
      isValid: false,
      error: 'Cannot transfer to this address. Tokens may be permanently lost.'
    };
  }

  // Warning for potential contract addresses (starting with common patterns)
  if (lowerAddress.startsWith('0x00000000') || lowerAddress.endsWith('00000000')) {
    return {
      isValid: true,
      warning: 'This looks like a contract address. Make sure it can receive tokens.'
    };
  }

  return { isValid: true };
}

/**
 * 🛸 GAS ESTIMATION UTILITIES
 * Estimates gas costs and validates sufficient native token balance
 */
export function estimateGasCost(chainId: number): {
  estimatedGas: string;
  nativeToken: string;
  warningThreshold: number;
} {
  switch (chainId) {
    case 56: // BNB Chain
      return {
        estimatedGas: '0.001',
        nativeToken: 'BNB',
        warningThreshold: 0.005 // Warn if less than 0.005 BNB
      };
    case 1: // Ethereum
      return {
        estimatedGas: '0.015',
        nativeToken: 'ETH',
        warningThreshold: 0.02 // Warn if less than 0.02 ETH
      };
    case 137: // Polygon
      return {
        estimatedGas: '0.01',
        nativeToken: 'MATIC',
        warningThreshold: 0.05 // Warn if less than 0.05 MATIC
      };
    default:
      return {
        estimatedGas: '0.01',
        nativeToken: 'Native Token',
        warningThreshold: 0.01
      };
  }
}

/**
 * 🛸 COMPREHENSIVE TRANSFER VALIDATION
 * Runs all validations for a token transfer
 */
export function validateTransfer({
  fromAddress,
  toAddress,
  amount,
  balance,
  chainId
}: {
  fromAddress: string;
  toAddress: string;
  amount: string;
  balance: string;
  chainId?: number;
}): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Run all validations
  const validations = [
    validateAddress(toAddress),
    validateTransferAmount(amount, balance),
    validateNetwork(chainId),
    validateSelfTransfer(fromAddress, toAddress),
    validateContractAddress(toAddress)
  ];

  // Collect errors and warnings
  validations.forEach(result => {
    if (!result.isValid && result.error) {
      errors.push(result.error);
    }
    if (result.warning) {
      warnings.push(result.warning);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 🛸 UTILITY FUNCTIONS
 */
export function getNetworkInfo(chainId: number) {
  return SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS] || null;
}

export function formatValidationError(errors: string[]): string {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0];
  return `Multiple issues found:\n${errors.map(error => `• ${error}`).join('\n')}`;
}

export function formatValidationWarning(warnings: string[]): string {
  if (warnings.length === 0) return '';
  if (warnings.length === 1) return warnings[0];
  return `Please note:\n${warnings.map(warning => `• ${warning}`).join('\n')}`;
}