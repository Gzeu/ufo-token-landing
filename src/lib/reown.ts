import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, bsc, polygon } from '@reown/appkit/networks';

// Project ID-ul UFO Token existent
const projectId = '91fb1077a7e3d9424c832fc263b56ac5';

// Configurare rețele - BNB Chain pentru UFO Token
const networks = [bsc, mainnet, polygon] as const;

// Adapter pentru Ethers.js
const ethersAdapter = new EthersAdapter();

// Metadata pentru UFO Token App
const metadata = {
  name: 'UFO Token',
  description: 'Beam Your Way to the Moon with UFO Token',
  url: 'https://ufo-token-landing.vercel.app',
  icons: ['https://ufo-token-landing.vercel.app/ufo-icon.png']
};

// Crearea și configurarea AppKit-ului
let modal: any = null;

if (typeof window !== 'undefined') {
  modal = createAppKit({
    adapters: [ethersAdapter],
    networks,
    metadata,
    projectId,
    features: {
      analytics: true,
      email: true,
      socials: ['google', 'x', 'discord', 'farcaster'],
      emailShowWallets: true
    },
    themeMode: 'dark',
    themeVariables: {
      '--w3m-color-mix': '#00ff88',
      '--w3m-color-mix-strength': 20,
      '--w3m-accent': '#00ff88',
      '--w3m-border-radius-master': '12px'
    }
  });
}

export { modal };
export default modal;