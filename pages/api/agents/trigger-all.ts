import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

/**
 * Agent Orchestrator
 * Declanșează toate agent-urile într-o secvență optimizată
 * Poate fi apelat manual sau prin webhook/cron
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const baseUrl = process.env.VERCEL_URL ? 
      `https://${process.env.VERCEL_URL}` : 
      'http://localhost:3000';

    const results: any = {
      timestamp: new Date().toISOString(),
      agents: {}
    };

    // 1. Mission Manager - verifică progresul misiunilor
    console.log('🎯 Running Mission Manager...');
    try {
      const missionResult = await axios.post(`${baseUrl}/api/agents/mission-manager`, {}, {
        timeout: 25000 // 25s timeout for Vercel
      });
      results.agents.missionManager = {
        status: 'success',
        data: missionResult.data
      };
    } catch (error) {
      results.agents.missionManager = {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // 2. Beam Randomizer - generează airdrop-uri random (mai rar)
    const shouldRunBeam = Math.random() < 0.3; // 30% chance
    if (shouldRunBeam) {
      console.log('🛸 Running Beam Randomizer...');
      try {
        const beamResult = await axios.post(`${baseUrl}/api/agents/beam-randomizer`, {}, {
          timeout: 20000
        });
        results.agents.beamRandomizer = {
          status: 'success',
          data: beamResult.data
        };
      } catch (error) {
        results.agents.beamRandomizer = {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    } else {
      results.agents.beamRandomizer = {
        status: 'skipped',
        reason: 'Random selection - not triggered this time'
      };
    }

    // 3. Airdrop Distributor - procesează airdrop-urile pending
    console.log('💰 Running Airdrop Distributor...');
    try {
      const airdropResult = await axios.post(`${baseUrl}/api/agents/airdrop-distributor`, {}, {
        timeout: 25000
      });
      results.agents.airdropDistributor = {
        status: 'success',
        data: airdropResult.data
      };
    } catch (error) {
      results.agents.airdropDistributor = {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // Calculează success rate
    const agentKeys = Object.keys(results.agents);
    const successCount = agentKeys.filter(
      key => results.agents[key].status === 'success'
    ).length;
    const successRate = (successCount / agentKeys.length) * 100;

    res.status(200).json({
      message: '🤖 All agents execution completed',
      successRate: `${successRate.toFixed(1)}%`,
      executedAgents: agentKeys.length,
      successfulAgents: successCount,
      ...results
    });

  } catch (error) {
    console.error('Agent orchestrator error:', error);
    res.status(500).json({ 
      error: 'Agent orchestrator execution failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}