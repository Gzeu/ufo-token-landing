import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../lib/reown' // Initialize Reown configuration
import { ToastProvider } from '../components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UFO Token 🛸 | Beam Your Way to the Moon',
  description: 'Join the UFO invasion! Connect your wallet, get random airdrops, climb the cosmic leaderboard, and complete galactic missions with UFO Token - the most playful meme token in the universe.',
  keywords: 'UFO Token, cryptocurrency, meme token, DeFi, blockchain, airdrops, cosmic, alien, spaceship, four.meme, wallet, reown, walletconnect',
  authors: [{ name: 'UFO Token Team' }],
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  themeColor: '#00ff88',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'UFO Token 🛸 | Beam Your Way to the Moon',
    description: 'Join the UFO invasion! Connect your wallet and complete galactic missions with the most playful meme token in the universe.',
    type: 'website',
    locale: 'en_US',
    url: 'https://ufo-token-landing.vercel.app',
    siteName: 'UFO Token',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UFO Token 🛸 | Beam Your Way to the Moon',
    description: 'Join the UFO invasion! Connect your wallet and complete galactic missions.',
    creator: '@ufotoken',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ufo-token-landing.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://four.meme" />
        <link rel="dns-prefetch" href="https://dashboard.reown.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} bg-cosmic-gradient min-h-screen text-white antialiased`}>
        <ToastProvider>
          <div className="relative overflow-hidden">
            {/* Animated background stars */}
            <div className="fixed inset-0 z-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Main content with Toast provider context */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}