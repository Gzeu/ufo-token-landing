import { FOUR_MEME_REF_CODE, UFO_TOKEN_ADDRESS } from "../config/referral";

type BuildOpts = {
  token?: string;
  code?: string;
  tab?: string; // ex: "trade"
  utm?: Record<string, string>;
  extra?: Record<string, string>;
};

export function buildFourMemeUrl(opts: BuildOpts = {}) {
  const token = (opts.token ?? UFO_TOKEN_ADDRESS).toLowerCase();
  const url = new URL(`https://four.meme/token/${token}`);
  
  const code = opts.code ?? FOUR_MEME_REF_CODE;
  if (code) url.searchParams.set("code", code);
  
  if (opts.tab) url.searchParams.set("tab", opts.tab);
  
  if (opts.utm) {
    for (const [k, v] of Object.entries(opts.utm)) {
      if (v) url.searchParams.set(`utm_${k}`, v);
    }
  }
  
  if (opts.extra) {
    for (const [k, v] of Object.entries(opts.extra)) {
      if (v) url.searchParams.set(k, v);
    }
  }
  
  return url.toString();
}

export const fourMemeReferralUrl = () => buildFourMemeUrl();
export const fourMemeTradeUrl = () => buildFourMemeUrl({ tab: "trade" });