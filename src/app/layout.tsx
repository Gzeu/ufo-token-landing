import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UFO Token 🛸 | Beam Your Way to the Moon',
  description: 'Join the UFO invasion! Get random airdrops, climb the cosmic leaderboard, and complete galactic missions with UFO Token - the most playful meme token in the universe.',
  keywords: 'UFO Token, cryptocurrency, meme token, DeFi, blockchain, airdrops, cosmic, alien, spaceship',
  authors: [{ name: 'UFO Token Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#7C3AED',
  openGraph: {
    title: 'UFO Token 🛸 | Beam Your Way to the Moon',
    description: 'Join the UFO invasion! Get random airdrops and complete galactic missions.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UFO Token 🛸 | Beam Your Way to the Moon',
    description: 'Join the UFO invasion! Get random airdrops and complete galactic missions.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-cosmic-gradient min-h-screen text-white antialiased`}>
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
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}