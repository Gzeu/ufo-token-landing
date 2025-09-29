import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { User } from '../../../lib/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { walletAddress } = req.query;

  if (!walletAddress || typeof walletAddress !== 'string') {
    return res.status(400).json({ error: 'Valid wallet address required' });
  }

  const db = await getDatabase();
  const usersCollection = db.collection<User>('users');

  try {
    switch (req.method) {
      case 'GET':
        const user = await usersCollection.findOne({ walletAddress });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        // Update last active
        await usersCollection.updateOne(
          { walletAddress },
          { $set: { lastActive: new Date() } }
        );
        
        res.status(200).json({ user });
        break;

      case 'PATCH':
        const updateData = req.body;
        
        const result = await usersCollection.updateOne(
          { walletAddress },
          { 
            $set: { 
              ...updateData, 
              updatedAt: new Date(),
              lastActive: new Date() 
            } 
          }
        );
        
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        const updatedUser = await usersCollection.findOne({ walletAddress });
        res.status(200).json({ user: updatedUser });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('User API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}