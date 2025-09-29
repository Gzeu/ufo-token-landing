import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { Mission } from '../../../lib/models/Mission';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await getDatabase();
  const missionsCollection = db.collection<Mission>('missions');

  try {
    switch (req.method) {
      case 'GET':
        const { category, active } = req.query;
        
        const filter: any = {};
        if (category) filter.category = category;
        if (active !== undefined) filter.isActive = active === 'true';
        
        const missions = await missionsCollection
          .find(filter)
          .sort({ createdAt: -1 })
          .toArray();
        
        res.status(200).json({ missions });
        break;

      case 'POST':
        const missionData: Mission = {
          ...req.body,
          participants: 0,
          completions: 0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const result = await missionsCollection.insertOne(missionData);
        res.status(201).json({ 
          message: 'Mission created successfully',
          mission: { ...missionData, _id: result.insertedId }
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Missions API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}