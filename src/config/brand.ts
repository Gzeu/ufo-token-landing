// Brand Configuration for UFO Token
export const BRAND_CONFIG = {
  name: 'UFO Token',
  symbol: 'UFO',
  description: '🛸 Join the cosmic invasion! UFO Token is your gateway to intergalactic trading adventures on BNB Smart Chain.',
  tagline: 'Beam Up Your Crypto Portfolio! 🌌',
  
  // Token Information
  token: {
    contractAddress: '0x7650a9c4543473cb0d1c73de441360bb92374444',
    chain: 'BNB Smart Chain',
    chainId: 56,
    symbol: 'UFO',
    decimals: 18,
    totalSupply: '1000000000', // 1B UFO tokens
    tradingUrl: 'https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444',
    referralCode: 'R37N2GDKSENU'
  },

  // Tokenomics
  tokenomics: {
    totalSupply: '1,000,000,000 UFO',
    distribution: [
      { category: 'Community Rewards', percentage: 40, amount: '400M UFO', color: '#10B981' },
      { category: 'Liquidity Pool', percentage: 25, amount: '250M UFO', color: '#3B82F6' },
      { category: 'Marketing & Partnerships', percentage: 15, amount: '150M UFO', color: '#F59E0B' },
      { category: 'Team & Development', percentage: 10, amount: '100M UFO', color: '#8B5CF6' },
      { category: 'Airdrops & Missions', percentage: 10, amount: '100M UFO', color: '#EC4899' }
    ],
    features: [
      '🛸 Zero Tax Trading',
      '💰 10% Referral Rewards',
      '🎯 Community Missions',
      '🏆 Leaderboard Competitions',
      '🌌 Cosmic Staking (Coming Soon)'
    ]
  },

  // Social Media Links
  social: {
    twitter: 'https://twitter.com/ufotoken_bsc',
    discord: 'https://discord.gg/ufotoken',
    telegram: 'https://t.me/ufotokenofficial',
    reddit: 'https://reddit.com/r/ufotoken',
    github: 'https://github.com/Gzeu/ufo-token-landing',
    website: 'https://ufo-token-landing.vercel.app'
  },

  // Community Information
  community: {
    launchDate: '2025-09-26',
    holders: 1250, // Will be updated with real data
    totalTrades: 5670,
    marketCap: '$125,000', // Will be updated with real data
    liquidity: '$85,000'
  },

  // Mission System
  missions: {
    enabled: true,
    types: ['trading', 'social', 'community', 'holding', 'referral'],
    rewardPool: '100,000,000 UFO',
    dailyRewards: '1,000,000 UFO'
  },

  // Airdrop Configuration
  airdrops: {
    enabled: true,
    frequency: 'daily',
    totalPool: '100,000,000 UFO',
    minHolding: '1000 UFO',
    multipliers: {
      diamond: 3.0, // 10M+ UFO holders
      gold: 2.5,    // 5M+ UFO holders
      silver: 2.0,  // 1M+ UFO holders
      bronze: 1.5,  // 100K+ UFO holders
      basic: 1.0    // 1K+ UFO holders
    }
  },

  // SEO and Meta Information
  meta: {
    title: 'UFO Token - Cosmic Meme Token on BNB Smart Chain 🛸',
    description: 'Join the UFO Token invasion! Trade, earn rewards, and explore the cosmos with our community-driven meme token on BNB Smart Chain. 🛸✨',
    keywords: 'UFO Token, BNB Smart Chain, Meme Token, DeFi, Cryptocurrency, Alien, Space, Cosmic Trading',
    ogImage: '/og-image.png',
    twitterCard: 'summary_large_image'
  },

  // Theme Colors
  theme: {
    primary: '#6B46C1',      // Cosmic purple
    secondary: '#3B82F6',    // Space blue
    accent: '#00D4FF',       // UFO beam cyan
    success: '#10B981',      // Alien green
    warning: '#F59E0B',      // Cosmic gold
    danger: '#EF4444',       // Mars red
    background: '#0f1022',   // Deep space
    surface: '#1a1b3a',     // Cosmic surface
    text: '#F8FAFC',         // Star white
    textSecondary: '#CBD5E1' // Nebula gray
  }
};

// Helper functions
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getTradingUrl = (referralCode?: string): string => {
  const baseUrl = BRAND_CONFIG.token.tradingUrl;
  if (referralCode) {
    return `${baseUrl}?code=${referralCode}`;
  }
  return `${baseUrl}?code=${BRAND_CONFIG.token.referralCode}`;
};

export const getShareText = (): string => {
  return `Join the UFO Token invasion! 🛸 Earn 10% of friends' trading fees using my referral link. Trade on BNB Smart Chain with zero taxes! #UFO #Memecoin #BNBChain #DeFi`;
};

export const getShareUrl = (referralCode?: string): string => {
  return getTradingUrl(referralCode);
};
