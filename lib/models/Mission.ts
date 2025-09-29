import { ObjectId } from 'mongodb';

export interface Mission {
  _id?: ObjectId;
  title: string;
  description: string;
  category: 'easy' | 'medium' | 'hard' | 'epic';
  reward: {
    ufoTokens: number;
    badge?: string;
  };
  requirements: {
    type: 'first_transaction' | 'hold_tokens' | 'social_share' | 'referral_count' | 'airdrop_claim';
    target: number;
    duration?: number; // in days
  };
  participants: number;
  completions: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMission {
  _id?: ObjectId;
  userId: ObjectId;
  missionId: ObjectId;
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
  startedAt: Date;
  lastUpdated: Date;
}