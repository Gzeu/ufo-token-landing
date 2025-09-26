import { ethers } from 'ethers';

// Adresa contractului UFO Token de pe BNB Chain
export const UFO_CONTRACT_ADDRESS = '0x7650a9c4543473cb0d1c73de441360bb92374444';

// ABI pentru UFO Token (ERC-20 standard + funcții custom)
export const UFO_ABI = [
  // ERC-20 Standard Functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  
  // Events
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  
  // Possible UFO Token specific functions (if available)
  'function burn(uint256 amount) returns (bool)',
  'function mint(address to, uint256 amount) returns (bool)'
];

// Constante pentru UFO Token
export const UFO_TOKEN_INFO = {
  name: 'UFO Token',
  symbol: 'UFO',
  decimals: 18,
  chainId: 56, // BNB Chain
  networkName: 'BNB Smart Chain'
};

// Helper functions pentru conversii
export const formatUFOBalance = (balance: bigint): string => {
  return ethers.formatEther(balance);
};

export const parseUFOAmount = (amount: string): bigint => {
  return ethers.parseEther(amount);
};

// Funcție pentru verificarea validării adresei
export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

// Funcție pentru formatarea adresei (scurtă)
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};