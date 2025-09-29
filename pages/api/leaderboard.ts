import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../lib/mongodb';
import { LeaderboardEntry } from '../../lib/models/Leaderboard';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { period = 'all-time', limit = 50 } = req.query;
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'daily':
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        dateFilter = { lastActive: { $gte: startOfDay } };
        break;
      case 'weekly':
        const startOfWeek = new Date(now.setDate(now.getDate() - 7));
        dateFilter = { lastActive: { $gte: startOfWeek } };
        break;
      case 'monthly':
        const startOfMonth = new Date(now.setMonth(now.getMonth() - 1));
        dateFilter = { lastActive: { $gte: startOfMonth } };
        break;
    }

    const pipeline = [
      { $match: dateFilter },
      {
        $addFields: {
          username: {
            $concat: [
              { $substr: ['$walletAddress', 0, 6] },
              '...',
              { $substr: ['$walletAddress', -4, 4] }
            ]
          },
          referralCount: { $size: { $ifNull: ['$referrals', []] } }
        }
      },
      {
        $project: {
          walletAddress: 1,
          username: 1,
          totalPoints: 1,
          badges: 1,
          referralCount: 1,
          lastActive: 1,
          missionsCompleted: { $size: { $ifNull: ['$missionsCompleted', []] } }
        }
      },
      { $sort: { totalPoints: -1, lastActive: -1 } },
      { $limit: parseInt(limit as string) }
    ];

    const leaderboardData = await usersCollection.aggregate(pipeline).toArray();
    
    // Add ranks
    const leaderboard: LeaderboardEntry[] = leaderboardData.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    // Get stats
    const totalParticipants = await usersCollection.countDocuments(dateFilter);
    const avgPointsResult = await usersCollection.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, averagePoints: { $avg: '$totalPoints' } } }
    ]).toArray();
    
    const averagePoints = avgPointsResult[0]?.averagePoints || 0;

    res.status(200).json({
      period,
      topUsers: leaderboard,
      totalParticipants,
      averagePoints: Math.round(averagePoints),
      lastUpdated: new Date()
    });

  } catch (error) {
    console.error('Leaderboard API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}