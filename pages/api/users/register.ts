import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { User } from '../../../lib/models/User';
import { nanoid } from 'nanoid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress, referredBy, twitterHandle } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    const db = await getDatabase();
    const usersCollection = db.collection<User>('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ walletAddress });
    if (existingUser) {
      return res.status(200).json({ 
        message: 'User already exists', 
        user: existingUser 
      });
    }

    // Generate unique referral code
    const referralCode = nanoid(8).toUpperCase();

    // Create new user
    const newUser: User = {
      walletAddress,
      referralCode,
      referredBy: referredBy || undefined,
      badges: ['Newcomer'],
      totalPoints: 0,
      missionsCompleted: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActive: new Date(),
      twitterHandle: twitterHandle || undefined,
      totalTrades: 0,
      referralEarnings: 0,
      airdropsClaimed: 0
    };

    const result = await usersCollection.insertOne(newUser);
    
    // Award welcome bonus
    await db.collection('airdrops').insertOne({
      userId: result.insertedId,
      walletAddress,
      amount: 500,
      status: 'pending',
      type: 'welcome_bonus',
      reason: 'Welcome to UFO Token!',
      createdAt: new Date()
    });

    // Update referrer if exists
    if (referredBy) {
      await usersCollection.updateOne(
        { referralCode: referredBy },
        { 
          $inc: { totalPoints: 100, referralEarnings: 50 },
          $set: { updatedAt: new Date() }
        }
      );
    }

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { ...newUser, _id: result.insertedId }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}