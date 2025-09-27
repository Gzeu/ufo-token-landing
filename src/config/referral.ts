export const UFO_TOKEN_ADDRESS = "0x7650a9c4543473cb0d1c73de441360bb92374444" as const;

export const FOUR_MEME_REF_CODE =
  process.env.NEXT_PUBLIC_FOUR_MEME_REF_CODE || "R37N2GDKSENU";

// Link fallback direct
export const DEFAULT_REF_LINK = `https://four.meme/token/${UFO_TOKEN_ADDRESS.toLowerCase()}?code=${FOUR_MEME_REF_CODE}`;

export type ReferralCode = string;