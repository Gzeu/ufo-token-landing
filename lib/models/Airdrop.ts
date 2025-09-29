import { ObjectId } from 'mongodb';

export interface Airdrop {
  _id?: ObjectId;
  userId: ObjectId;
  walletAddress: string;
  amount: number;
  transactionHash?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  type: 'beam_random' | 'mission_reward' | 'referral_bonus' | 'welcome_bonus';
  reason: string;
  scheduledFor?: Date;
  processedAt?: Date;
  createdAt: Date;
}

export interface AirdropStats {
  totalAirdrops: number;
  totalAmount: number;
  pendingAirdrops: number;
  completedToday: number;
  averageAmount: number;
}