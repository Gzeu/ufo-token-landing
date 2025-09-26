// Simplified UFO Token contract utilities without ethers dependency
// Ensures Vercel build compatibility

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
  networkName: 'BNB Smart Chain',
  address: UFO_CONTRACT_ADDRESS
};

// Simple helper functions fără ethers dependency
export const formatUFOBalance = (balance: string | number): string => {
  const num = typeof balance === 'string' ? parseFloat(balance) : balance;
  return num.toFixed(6);
};

export const parseUFOAmount = (amount: string): string => {
  // Simple conversion - in a real app you'd use proper BigNumber handling
  return amount;
};

// Simple address validation
export const isValidAddress = (address: string): boolean => {
  if (!address) return false;
  if (!address.startsWith('0x')) return false;
  if (address.length !== 42) return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Funcție pentru formatarea adresei (scurtă)
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Network configuration
export const NETWORK_CONFIG = {
  chainId: 56,
  chainName: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com'],
};

// Trading links
export const TRADING_LINKS = {
  fourMeme: 'https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444',
  bscScan: 'https://bscscan.com/token/0x7650a9c4543473cb0d1c73de441360bb92374444'
};