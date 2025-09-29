const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

/**
 * Database Initialization Script
 * Creeză colecțiile necesare și populează cu date inițiale
 */

async function initDatabase() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }
  
  console.log('🚀 Initializing UFO Token database...');
  
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('ufo_token_db');
    
    // Create collections with indexes
    console.log('📊 Creating collections and indexes...');
    
    // Users collection
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ walletAddress: 1 }, { unique: true });
    await usersCollection.createIndex({ referralCode: 1 }, { unique: true });
    await usersCollection.createIndex({ totalPoints: -1 });
    await usersCollection.createIndex({ lastActive: -1 });
    
    // Missions collection
    const missionsCollection = db.collection('missions');
    await missionsCollection.createIndex({ category: 1 });
    await missionsCollection.createIndex({ isActive: 1 });
    await missionsCollection.createIndex({ createdAt: -1 });
    
    // User missions collection
    const userMissionsCollection = db.collection('user_missions');
    await userMissionsCollection.createIndex({ userId: 1, missionId: 1 }, { unique: true });
    await userMissionsCollection.createIndex({ isCompleted: 1 });
    await userMissionsCollection.createIndex({ lastUpdated: -1 });
    
    // Airdrops collection
    const airdropsCollection = db.collection('airdrops');
    await airdropsCollection.createIndex({ walletAddress: 1 });
    await airdropsCollection.createIndex({ status: 1 });
    await airdropsCollection.createIndex({ createdAt: -1 });
    await airdropsCollection.createIndex({ scheduledFor: 1 });
    
    // Global stats collection
    const statsCollection = db.collection('global_stats');
    await statsCollection.createIndex({ type: 1 }, { unique: true });
    
    console.log('✅ Collections and indexes created successfully');
    
    // Insert initial missions
    console.log('🎯 Inserting initial missions...');
    
    const initialMissions = [
      {
        title: 'First Contact',
        description: 'Complete your first UFO token transaction and join the galactic community.',
        category: 'easy',
        reward: {
          ufoTokens: 500,
          badge: 'Newcomer'
        },
        requirements: {
          type: 'first_transaction',
          target: 1
        },
        participants: 0,
        completions: 0,
        startDate: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Beam Collector',
        description: 'Receive 5 random airdrops from UFO beam technology.',
        category: 'medium',
        reward: {
          ufoTokens: 1000,
          badge: 'Collector'
        },
        requirements: {
          type: 'airdrop_claim',
          target: 5
        },
        participants: 0,
        completions: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Social Invader',
        description: 'Share UFO Token on Twitter and tag 3 fellow space explorers.',
        category: 'easy',
        reward: {
          ufoTokens: 750,
          badge: 'Influencer'
        },
        requirements: {
          type: 'social_share',
          target: 1
        },
        participants: 0,
        completions: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Galactic HODLer',
        description: 'Hold UFO tokens for 30 days without selling to prove your cosmic loyalty.',
        category: 'hard',
        reward: {
          ufoTokens: 2500,
          badge: 'Diamond Hands'
        },
        requirements: {
          type: 'hold_tokens',
          target: 1,
          duration: 30
        },
        participants: 0,
        completions: 0,
        startDate: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Alien Ambassador',
        description: 'Invite 10 friends to join the UFO invasion using your referral link.',
        category: 'hard',
        reward: {
          ufoTokens: 5000,
          badge: 'Ambassador'
        },
        requirements: {
          type: 'referral_count',
          target: 10
        },
        participants: 0,
        completions: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Check if missions already exist
    const existingMissions = await missionsCollection.countDocuments();
    if (existingMissions === 0) {
      await missionsCollection.insertMany(initialMissions);
      console.log(`✅ Inserted ${initialMissions.length} initial missions`);
    } else {
      console.log(`📊 Found ${existingMissions} existing missions, skipping insertion`);
    }
    
    // Initialize global stats
    console.log('📊 Initializing global stats...');
    const initialStats = [
      {
        type: 'user_stats',
        totalUsers: 0,
        activeUsers: 0,
        totalReferrals: 0,
        lastUpdated: new Date()
      },
      {
        type: 'airdrop_stats',
        totalAirdrops: 0,
        totalAmount: 0,
        pendingAirdrops: 0,
        completedToday: 0,
        lastUpdated: new Date()
      },
      {
        type: 'beam_stats',
        totalBeams: 0,
        totalBeamAmount: 0,
        lastBeamTime: null,
        lastUpdated: new Date()
      }
    ];
    
    for (const stat of initialStats) {
      await statsCollection.updateOne(
        { type: stat.type },
        { $setOnInsert: stat },
        { upsert: true }
      );
    }
    
    console.log('✅ Global stats initialized');
    
    // Database info
    const collections = await db.listCollections().toArray();
    console.log(`📊 Database initialized with ${collections.length} collections:`);
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    console.log('
🎆 UFO Token database initialization completed successfully!');
    console.log('🚀 Ready to deploy on Vercel with MongoDB Atlas!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔐 Connection closed');
  }
}

initDatabase();