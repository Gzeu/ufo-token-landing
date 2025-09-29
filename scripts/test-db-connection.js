const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }
  
  console.log('🔄 Testing MongoDB connection...');
  
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    // Test database operations
    const db = client.db('ufo_token_db');
    const collections = await db.listCollections().toArray();
    console.log(`📊 Found ${collections.length} collections in database`);
    
    // Test ping
    await client.db('admin').command({ ping: 1 });
    console.log('🏓 Ping successful!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔐 Connection closed');
  }
}

testConnection();
