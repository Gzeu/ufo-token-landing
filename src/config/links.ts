// UFO Token referral and trading links configuration

export const FOUR_MEME_REF_URL =
  process.env.NEXT_PUBLIC_FOUR_MEME_REF_URL ||
  "https://four.meme/token/0x7650a9c4543473cb0d1c73de441360bb92374444?code=R37N2GDKSENU";

export const FOUR_MEME_BASE = "https://four.meme";
export const UFO_TOKEN_ADDRESS = "0x7650a9c4543473cb0d1c73de441360bb92374444";

// Social sharing configuration
export const SOCIAL_CONFIG = {
  twitter: {
    text: "Join the UFO Token invasion! 🛸 Earn 10% of friends' trading fees using my referral link.",
    hashtags: "UFO,Memecoin,BNBChain,DeFi,four",
    via: "ufotoken"
  },
  telegram: {
    text: "🛸 UFO Token Invasion! Earn 10% referral fees on four.meme"
  },
  discord: {
    text: "Join the UFO invasion and earn referral rewards! 🛸"
  }
};