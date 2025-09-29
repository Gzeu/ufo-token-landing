import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { Airdrop } from '../../../lib/models/Airdrop';
import { ObjectId } from 'mongodb';

/**
 * Airdrop Distribution Agent
 * Procesează airdrop-urile pending și le marchează ca processed
 * Se rulează ca Vercel serverless function
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests for agent execution
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const airdropsCollection = db.collection<Airdrop>('airdrops');
    const usersCollection = db.collection('users');

    // Find pending airdrops (limit to 20 per execution for Vercel limits)
    const pendingAirdrops = await airdropsCollection
      .find({ status: 'pending' })
      .limit(20)
      .toArray();

    if (pendingAirdrops.length === 0) {
      return res.status(200).json({ 
        message: 'No pending airdrops to process',
        processed: 0
      });
    }

    const processedAirdrops = [];
    
    for (const airdrop of pendingAirdrops) {
      try {
        // Simulate blockchain transaction processing
        const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
        // Update airdrop status
        await airdropsCollection.updateOne(
          { _id: airdrop._id },
          {
            $set: {
              status: 'completed',
              transactionHash,
              processedAt: new Date()
            }
          }
        );

        // Update user stats
        await usersCollection.updateOne(
          { _id: airdrop.userId },
          {
            $inc: { 
              airdropsClaimed: 1,
              totalPoints: Math.floor(airdrop.amount / 10) // 1 point per 10 tokens
            },
            $set: { updatedAt: new Date() }
          }
        );

        processedAirdrops.push({
          id: airdrop._id,
          walletAddress: airdrop.walletAddress,
          amount: airdrop.amount,
          transactionHash
        });

        // Add random delay to simulate real processing
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Failed to process airdrop ${airdrop._id}:`, error);
        
        // Mark as failed
        await airdropsCollection.updateOne(
          { _id: airdrop._id },
          {
            $set: {
              status: 'failed',
              processedAt: new Date()
            }
          }
        );
      }
    }

    // Log processing stats
    console.log(`Airdrop Agent: Processed ${processedAirdrops.length}/${pendingAirdrops.length} airdrops`);

    res.status(200).json({
      message: 'Airdrop processing completed',
      processed: processedAirdrops.length,
      total: pendingAirdrops.length,
      airdrops: processedAirdrops,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Airdrop agent error:', error);
    res.status(500).json({ 
      error: 'Airdrop agent execution failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}