import { ObjectId } from 'mongodb';

export interface LeaderboardEntry {
  _id?: ObjectId;
  userId: ObjectId;
  walletAddress: string;
  username: string;
  rank: number;
  totalPoints: number;
  missionsCompleted: number;
  badges: string[];
  referralCount: number;
  lastActive: Date;
  avatar?: string;
}

export interface LeaderboardStats {
  period: 'daily' | 'weekly' | 'monthly' | 'all-time';
  topUsers: LeaderboardEntry[];
  totalParticipants: number;
  averagePoints: number;
  lastUpdated: Date;
}