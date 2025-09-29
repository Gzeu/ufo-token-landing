import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { UserMission, Mission } from '../../../lib/models/Mission';
import { ObjectId } from 'mongodb';

/**
 * Mission Management Agent
 * Verifică progresul misiunilor utilizatorilor și acordă recompense
 * Se rulează ca Vercel serverless function
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
    const userMissionsCollection = db.collection<UserMission>('user_missions');
    const missionsCollection = db.collection<Mission>('missions');
    const usersCollection = db.collection('users');
    const airdropsCollection = db.collection('airdrops');

    // Find active user missions that are not completed
    const activeMissions = await userMissionsCollection
      .find({ isCompleted: false })
      .limit(50) // Process max 50 for Vercel limits
      .toArray();

    if (activeMissions.length === 0) {
      return res.status(200).json({ 
        message: 'No active missions to process',
        processed: 0
      });
    }

    const completedMissions = [];
    
    for (const userMission of activeMissions) {
      try {
        // Get mission details
        const mission = await missionsCollection.findOne({ 
          _id: userMission.missionId 
        });
        
        if (!mission) continue;

        // Get user details
        const user = await usersCollection.findOne({ 
          _id: userMission.userId 
        });
        
        if (!user) continue;

        let newProgress = userMission.progress;
        let isCompleted = false;

        // Check mission progress based on type
        switch (mission.requirements.type) {
          case 'first_transaction':
            if (user.totalTrades > 0) {
              newProgress = 100;
              isCompleted = true;
            }
            break;
            
          case 'hold_tokens':
            // Simulate holding check - in real app, check blockchain
            const daysSinceStart = Math.floor(
              (Date.now() - userMission.startedAt.getTime()) / (1000 * 60 * 60 * 24)
            );
            newProgress = Math.min((daysSinceStart / mission.requirements.duration!) * 100, 100);
            isCompleted = newProgress >= 100;
            break;
            
          case 'social_share':
            // In real app, check social media APIs
            if (user.twitterHandle) {
              newProgress = 100;
              isCompleted = true;
            }
            break;
            
          case 'referral_count':
            const referralCount = user.referralEarnings / 50; // 50 points per referral
            newProgress = Math.min((referralCount / mission.requirements.target) * 100, 100);
            isCompleted = newProgress >= 100;
            break;
            
          case 'airdrop_claim':
            newProgress = Math.min((user.airdropsClaimed / mission.requirements.target) * 100, 100);
            isCompleted = newProgress >= 100;
            break;
        }

        // Update mission progress
        const updateData: any = {
          progress: newProgress,
          lastUpdated: new Date()
        };

        if (isCompleted && !userMission.isCompleted) {
          updateData.isCompleted = true;
          updateData.completedAt = new Date();

          // Award mission rewards
          await usersCollection.updateOne(
            { _id: userMission.userId },
            {
              $inc: { totalPoints: mission.reward.ufoTokens },
              $push: { 
                missionsCompleted: mission._id,
                badges: mission.reward.badge || []
              },
              $set: { updatedAt: new Date() }
            }
          );

          // Create reward airdrop
          await airdropsCollection.insertOne({
            userId: userMission.userId,
            walletAddress: user.walletAddress,
            amount: mission.reward.ufoTokens,
            status: 'pending',
            type: 'mission_reward',
            reason: `Completed mission: ${mission.title}`,
            createdAt: new Date()
          });

          // Update mission completion stats
          await missionsCollection.updateOne(
            { _id: mission._id },
            { $inc: { completions: 1 } }
          );

          completedMissions.push({
            missionId: mission._id,
            userId: userMission.userId,
            title: mission.title,
            reward: mission.reward
          });
        }

        await userMissionsCollection.updateOne(
          { _id: userMission._id },
          { $set: updateData }
        );

      } catch (error) {
        console.error(`Failed to process mission ${userMission._id}:`, error);
      }
    }

    console.log(`Mission Agent: Processed ${activeMissions.length} missions, completed ${completedMissions.length}`);

    res.status(200).json({
      message: 'Mission processing completed',
      processed: activeMissions.length,
      completed: completedMissions.length,
      completedMissions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Mission agent error:', error);
    res.status(500).json({ 
      error: 'Mission agent execution failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}