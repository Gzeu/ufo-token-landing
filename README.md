# 🛸 UFO Token Landing Page

A playful cryptocurrency meme token landing page featuring cosmic design, animated UFO mascots, leaderboards, and community missions. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![UFO Token](https://img.shields.io/badge/UFO-Token-purple?style=for-the-badge&logo=rocket)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🎆 Features

### 🚀 Core Features
- **Animated UFO Mascot**: Custom SVG UFO with floating animations, glowing effects, and beam-powered crypto coins
- **Hero Section**: Compelling landing with animated UFO, gradient text, and clear CTAs
- **Cosmic Leaderboard**: Interactive rankings with podium display and player stats
- **Mission System**: UFO-themed tasks with progress tracking, difficulty levels, and rewards
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered animations throughout the site

### 🎨 Visual Design
- **Cosmic Theme**: Deep space background with twinkling stars and cosmic gradients
- **UFO Branding**: Custom UFO icon with beam effects and floating coins
- **Vibrant Colors**: Purple, blue, and cyan color scheme with glow effects
- **Modern UI**: Clean cards, glassmorphism effects, and smooth transitions

### 🔗 Integration Ready
- **Token Purchase Link**: Direct integration with four.meme token page
- **Social Media Links**: Ready-to-connect social media integration
- **SEO Optimized**: Comprehensive meta tags and Open Graph support
- **Performance Optimized**: Fast loading with Next.js optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom cosmic theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

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

## 📱 Deployment

### Deploy to Vercel (Recommended)

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

### Alternative Deployment Options

#### Static Export
```bash
npm run build
npm run export
```

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`

## 🎨 Customization

### Colors and Theme

Edit `tailwind.config.js` to customize the cosmic color scheme:

```javascript
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
}
```

### Content Updates

#### Update Token Link
Replace the token URL in:
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/Footer.tsx`
- `src/app/page.tsx`

#### Update Social Media Links
Edit social links in:
- `src/components/Footer.tsx`
- `src/app/page.tsx` (Community section)

#### Customize Leaderboard Data
Edit mock data in `src/components/Leaderboard.tsx`:
```typescript
const mockPlayers: Player[] = [
  { rank: 1, name: "YourUser", score: 15420, missions: 89, badge: "👑", avatar: "🛸" },
  // Add more players...
]
```

#### Update Mission Content
Customize missions in `src/components/MissionsSection.tsx`:
```typescript
const mockMissions: Mission[] = [
  {
    title: 'Your Mission',
    description: 'Custom mission description',
    reward: 'Custom reward',
    // ... other properties
  }
]
```

## 📝 Project Structure

```
ufo-token-landing/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── UFOIcon.tsx
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── Leaderboard.tsx
│       ├── MissionsSection.tsx
│       └── Footer.tsx
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🚀 Roadmap

- [ ] Add wallet connection functionality
- [ ] Integrate real-time token price data
- [ ] Add more interactive animations
- [ ] Implement dark/light theme toggle
- [ ] Add multi-language support
- [ ] Create admin dashboard for content management

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Join our Discord community
- Follow us on Twitter [@ufotoken](https://twitter.com/ufotoken)

---

**Made with ❤️ by alien technology** 🛸

*Remember: This is a meme token project for entertainment purposes. Always do your own research before investing in any cryptocurrency.*