import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { Airdrop } from '../../../lib/models/Airdrop';
import { ObjectId } from 'mongodb';

/**
 * UFO Beam Randomizer Agent
 * Generează airdrop-uri random pentru utilizatori activi
 * Implementează "beam technology" cu algoritm de fairness
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');
    const airdropsCollection = db.collection<Airdrop>('airdrops');

    // Find active users from last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const activeUsers = await usersCollection
      .find({ 
        lastActive: { $gte: oneDayAgo },
        totalPoints: { $gte: 100 } // Minimum points to be eligible
      })
      .toArray();

    if (activeUsers.length === 0) {
      return res.status(200).json({ 
        message: 'No eligible users for beam airdrops',
        beamed: 0
      });
    }

    // Algoritm de fairness: selectează 5-15% din utilizatorii activi
    const beamPercentage = Math.random() * 0.1 + 0.05; // 5-15%
    const selectedCount = Math.max(1, Math.floor(activeUsers.length * beamPercentage));
    
    // Selectează utilizatori random cu weights bazate pe activitate
    const weightedUsers = activeUsers.map(user => ({
      ...user,
      weight: user.totalPoints + (user.airdropsClaimed * 10) + (user.totalTrades * 50)
    }));

    // Sortează random și apoi selectează pe baza weight-urilor
    const shuffled = weightedUsers.sort(() => Math.random() - 0.5);
    const selected = shuffled
      .sort((a, b) => b.weight - a.weight)
      .slice(0, selectedCount);

    const beamedAirdrops = [];

    for (const user of selected) {
      // Calculează suma random bazată pe activitatea utilizatorului
      const baseAmount = Math.floor(Math.random() * 200) + 50; // 50-250 tokens
      const bonusAmount = Math.floor(user.totalPoints / 100) * 10; // Bonus pentru puncte
      const finalAmount = baseAmount + bonusAmount;

      const airdrop: Airdrop = {
        userId: user._id,
        walletAddress: user.walletAddress,
        amount: finalAmount,
        status: 'pending',
        type: 'beam_random',
        reason: '🛸 UFO Beam Technology - Random Airdrop!',
        scheduledFor: new Date(Date.now() + Math.random() * 3600000), // Random în următoarea oră
        createdAt: new Date()
      };

      const result = await airdropsCollection.insertOne(airdrop);
      
      beamedAirdrops.push({
        id: result.insertedId,
        walletAddress: user.walletAddress,
        amount: finalAmount,
        scheduledFor: airdrop.scheduledFor
      });
    }

    // Actualizează statisticile globale
    const statsCollection = db.collection('global_stats');
    await statsCollection.updateOne(
      { type: 'beam_stats' },
      {
        $inc: { 
          totalBeams: beamedAirdrops.length,
          totalBeamAmount: beamedAirdrops.reduce((sum, a) => sum + a.amount, 0)
        },
        $set: { lastBeamTime: new Date() }
      },
      { upsert: true }
    );

    console.log(`Beam Agent: Generated ${beamedAirdrops.length} random airdrops for ${activeUsers.length} active users`);

    res.status(200).json({
      message: '🛸 UFO Beam Technology activated!',
      eligibleUsers: activeUsers.length,
      beamed: beamedAirdrops.length,
      totalAmount: beamedAirdrops.reduce((sum, a) => sum + a.amount, 0),
      airdrops: beamedAirdrops,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Beam randomizer agent error:', error);
    res.status(500).json({ 
      error: 'Beam agent execution failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}