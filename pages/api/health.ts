import type { NextApiRequest, NextApiResponse } from 'next';
import { checkConnection } from '../../lib/mongodb';

interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  services: {
    database: 'connected' | 'disconnected';
    vercel: 'ok';
  };
  version: string;
  uptime: number;
}

/**
 * Health Check Endpoint
 * Verifică starea aplicației și conectivitatea la MongoDB
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse | { error: string }>
) {
  try {
    // Check database connection
    const isDbConnected = await checkConnection();
    
    const healthData: HealthResponse = {
      status: isDbConnected ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      services: {
        database: isDbConnected ? 'connected' : 'disconnected',
        vercel: 'ok'
      },
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime()
    };
    
    const statusCode = isDbConnected ? 200 : 503;
    res.status(statusCode).json(healthData);
    
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      error: 'Health check failed',
      status: 'error',
      timestamp: new Date().toISOString()
    } as any);
  }
}