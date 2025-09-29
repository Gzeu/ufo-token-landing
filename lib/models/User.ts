import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  walletAddress: string;
  referralCode: string;
  referredBy?: string;
  badges: string[];
  totalPoints: number;
  missionsCompleted: string[];
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
  // Social media links
  twitterHandle?: string;
  telegramId?: string;
  // Trading stats
  totalTrades: number;
  referralEarnings: number;
  airdropsClaimed: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  totalReferrals: number;
  totalMissionsCompleted: number;
}