// Simple Reown configuration for UFO Token wallet connectivity
// This is a minimal setup to ensure compatibility with the latest API

const projectId = '91fb1077a7e3d9424c832fc263b56ac5';

// Basic configuration for client-side initialization
if (typeof window !== 'undefined') {
  // Initialize Reown/WalletConnect when needed
  console.log('UFO Token - Reown Project ID:', projectId);
}

// Export configuration for use in components
export const UFO_REOWN_CONFIG = {
  projectId,
  metadata: {
    name: 'UFO Token',
    description: 'Beam Your Way to the Moon with UFO Token',
    url: 'https://ufo-token-landing.vercel.app',
    icons: ['https://ufo-token-landing.vercel.app/ufo-icon.png']
  }
};

export default UFO_REOWN_CONFIG;