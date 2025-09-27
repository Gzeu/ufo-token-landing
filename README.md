# 🛸 UFO Token Landing Page

A playful cryptocurrency meme token landing page featuring cosmic design, animated UFO mascots, leaderboards, and community missions. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![UFO Token](https://img.shields.io/badge/UFO-Token-purple?style=for-the-badge&logo=rocket)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=for-the-badge&logo=framer)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🌌 Live Demo

**🚀 [View Live Site](https://ufo-token-landing.vercel.app/)**

## 🎆 Features

### ✨ Core Features
- 🛸 **Animated UFO Mascot**: Custom SVG UFO with floating animations, glowing effects, and beam-powered crypto coins
- 🎯 **Hero Section**: Compelling landing with animated UFO, gradient text, and clear CTAs
- 🏆 **Cosmic Leaderboard**: Interactive rankings with podium display and player stats
- 🎮 **Mission System**: UFO-themed tasks with progress tracking, difficulty levels, and rewards
- 📱 **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- ⚡ **Smooth Animations**: Framer Motion powered animations throughout the site
- 🔗 **Token Integration**: Direct integration with four.meme for seamless token purchases

### 🎨 Visual Design
- 🌌 **Cosmic Theme**: Deep space background with twinkling stars and cosmic gradients
- 🛸 **UFO Branding**: Custom UFO icon with beam effects and floating coins
- 🌈 **Vibrant Colors**: Purple, blue, and cyan color scheme with glow effects
- 💫 **Modern UI**: Clean cards, glassmorphism effects, and smooth transitions
- ✨ **Interactive Elements**: Hover effects, particle animations, and dynamic backgrounds

### 🔧 Technical Features
- ⚡ **Performance Optimized**: Fast loading with Next.js 14 optimization
- 🔍 **SEO Optimized**: Comprehensive meta tags and Open Graph support
- 📊 **Analytics Ready**: Easy integration with Google Analytics and tracking
- 🛡️ **Type Safety**: Full TypeScript implementation for better development experience
- 🎭 **Component Architecture**: Modular, reusable components for easy maintenance

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom cosmic theme
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) (recommended)
- **Development**: ESLint, Prettier, and TypeScript for code quality

## 🚀 Quick Start

### 📋 Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm
- Git

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gzeu/ufo-token-landing.git
   cd ufo-token-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

### 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🌍 Deployment

### 🚀 Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gzeu/ufo-token-landing)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Custom Domain (Optional)**
   - In Vercel dashboard, go to your project settings
   - Add your custom domain in the "Domains" section

### 🔄 Alternative Deployment Options

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`

#### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎨 Customization Guide

### 🎯 Brand Configuration

Edit the main configuration in `src/config/brand.ts`:

```typescript
export const BRAND_CONFIG = {
  name: 'UFO Token',
  symbol: 'UFO',
  description: 'A playful cryptocurrency meme token...',
  tokenUrl: 'https://four.meme/your-token',
  social: {
    twitter: 'https://twitter.com/ufotoken',
    discord: 'https://discord.gg/ufotoken',
    telegram: 'https://t.me/ufotoken'
  }
}
```

### 🌈 Colors and Theme

Customize the cosmic color palette in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        cosmic: {
          purple: '#6B46C1',    // Main purple
          blue: '#3B82F6',      // Accent blue
          pink: '#EC4899',      // Accent pink
          green: '#10B981',     // Success green
          yellow: '#F59E0B',    // Warning yellow
          dark: '#1a1b3a',      // Dark background
          darker: '#0f1022',    // Darker background
        },
        ufo: {
          beam: '#00D4FF',      // UFO beam color
          glow: '#7C3AED',      // Glow effect
          silver: '#E5E7EB',    // UFO body
          gold: '#FBBF24',      // Accent gold
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    }
  }
}
```

### 📝 Content Updates

#### 🎯 Update Token Information
Replace token details in:
- `src/components/HeroSection.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/app/layout.tsx` (meta tags)

#### 📊 Customize Leaderboard
Edit mock data in `src/data/leaderboard.ts`:
```typescript
export const LEADERBOARD_DATA: Player[] = [
  { 
    rank: 1, 
    name: "CryptoAlien", 
    score: 15420, 
    missions: 89, 
    badge: "👑", 
    avatar: "🛸",
    level: "Galactic Commander"
  },
  // Add more players...
]
```

#### 🎮 Update Missions
Customize missions in `src/data/missions.ts`:
```typescript
export const MISSIONS_DATA: Mission[] = [
  {
    id: 1,
    title: 'First Contact',
    description: 'Join the UFO community and make your first post',
    reward: '100 UFO tokens',
    difficulty: 'easy',
    progress: 0,
    maxProgress: 1,
    icon: '🛸'
  },
  // Add more missions...
]
```

## 📁 Project Structure

```
ufo-token-landing/
├── 📂 src/
│   ├── 📂 app/                    # Next.js 14 App Router
│   │   ├── favicon.ico
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── not-found.tsx         # 404 page
│   ├── 📂 components/            # React components
│   │   ├── ui/                   # Reusable UI components
│   │   ├── UFOIcon.tsx           # Custom UFO SVG component
│   │   ├── Navbar.tsx            # Navigation component
│   │   ├── HeroSection.tsx       # Hero landing section
│   │   ├── Leaderboard.tsx       # Leaderboard component
│   │   ├── MissionsSection.tsx   # Missions display
│   │   └── Footer.tsx            # Footer component
│   ├── 📂 data/                  # Static data and configurations
│   ├── 📂 hooks/                 # Custom React hooks
│   ├── 📂 lib/                   # Utility functions
│   └── 📂 types/                 # TypeScript type definitions
├── 📂 public/                    # Static assets
├── 📄 package.json               # Dependencies and scripts
├── 📄 tailwind.config.js         # Tailwind CSS configuration
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 next.config.js             # Next.js configuration
└── 📄 README.md                  # Project documentation
```

## 🔧 Development Guidelines

### 📝 Code Style
- Use TypeScript for type safety
- Follow the existing component structure
- Use Tailwind CSS for styling
- Implement responsive design from mobile-first
- Add proper error boundaries for production

### 🧪 Testing
```bash
# Run tests (when implemented)
npm run test

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### 🚀 Performance Optimization
- Images are optimized using Next.js Image component
- Components use React.memo where appropriate
- Animations are optimized for 60fps
- Bundle size is monitored and optimized

## 🗺️ Roadmap

### 🎯 Phase 1 (Current)
- [x] Basic landing page with cosmic design
- [x] Animated UFO mascot and hero section
- [x] Responsive design implementation
- [x] Leaderboard and missions mockup

### 🚀 Phase 2 (Next)
- [ ] **Wallet Integration**: Connect MetaMask, WalletConnect
- [ ] **Real-time Data**: Live token price and market data
- [ ] **Interactive Animations**: More complex UFO interactions
- [ ] **Community Features**: User profiles and achievements

### 🌌 Phase 3 (Future)
- [ ] **Multi-language Support**: International community
- [ ] **Admin Dashboard**: Content management system
- [ ] **Mobile App**: React Native companion app
- [ ] **NFT Integration**: UFO-themed collectibles

## 🤝 Contributing

We welcome contributions from the UFO community! 🛸

### 🔧 How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### 📋 Contribution Guidelines
- Follow the existing code style and conventions
- Add proper TypeScript types for new features
- Test your changes on different screen sizes
- Update documentation for significant changes
- Use meaningful commit messages

## 📞 Support & Community

### 💬 Get Help
- 🐛 **Bug Reports**: [Create an issue](https://github.com/Gzeu/ufo-token-landing/issues)
- 💡 **Feature Requests**: [Open a discussion](https://github.com/Gzeu/ufo-token-landing/discussions)
- 💬 **Community Chat**: Join our Discord server
- 🐦 **Updates**: Follow [@ufotoken](https://twitter.com/ufotoken) on Twitter

### 🌟 Show Your Support

If you like this project, please consider:
- ⭐ Starring the repository
- 🍴 Forking for your own projects
- 📢 Sharing with the crypto community
- 🤝 Contributing to development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**🛸 Made with ❤️ by alien technology 🛸**

*Remember: This is a meme token project for entertainment purposes. Always do your own research before investing in any cryptocurrency.*

[![GitHub stars](https://img.shields.io/github/stars/Gzeu/ufo-token-landing?style=social)](https://github.com/Gzeu/ufo-token-landing/stargazers)
[![Twitter Follow](https://img.shields.io/twitter/follow/ufotoken?style=social)](https://twitter.com/ufotoken)

</div>