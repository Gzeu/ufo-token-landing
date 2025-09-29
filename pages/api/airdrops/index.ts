import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { Airdrop } from '../../../lib/models/Airdrop';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await getDatabase();
  const airdropsCollection = db.collection<Airdrop>('airdrops');

  try {
    switch (req.method) {
      case 'GET':
        const { walletAddress, status } = req.query;
        
        const filter: any = {};
        if (walletAddress) filter.walletAddress = walletAddress;
        if (status) filter.status = status;
        
        const airdrops = await airdropsCollection
          .find(filter)
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray();
        
        res.status(200).json({ airdrops });
        break;

      case 'POST':
        const airdropData: Airdrop = {
          ...req.body,
          status: 'pending',
          createdAt: new Date()
        };
        
        const result = await airdropsCollection.insertOne(airdropData);
        res.status(201).json({ 
          message: 'Airdrop created successfully',
          airdrop: { ...airdropData, _id: result.insertedId }
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Airdrops API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}