"use client";

import React, { useMemo, useState } from "react";
import { buildFourMemeUrl } from "../lib/fourMeme";

type Props = React.HTMLAttributes<HTMLDivElement> & { url?: string };

function buildTwitterIntent(url: string) {
  const text =
    "Join the UFO Token invasion! Earn 10% of friends' trading fees using my referral link. 🛸";
  const hashtags = "UFO,Memecoin,BNBChain,DeFi";
  const params = new URLSearchParams({ text, url, hashtags });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export default function ShareBar(props: Props) {
  const { url: urlProp, className, ...rest } = props;

  // Hooks must be unconditional
  const defaultUrl = useMemo(() => buildFourMemeUrl(), []);
  const url = urlProp ?? defaultUrl;
  const twitterHref = useMemo(() => buildTwitterIntent(url), [url]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy this referral URL:", url);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "UFO Token — Invasion Missions",
          text: "Join the UFO Token invasion! 🛸",
          url,
        });
      } catch {
        // ignore
      }
    } else {
      window.open(twitterHref, "_blank", "noopener,noreferrer");
    }
  };

  const rootClass = className ? `sharebar ${className}` : "sharebar";

  return (
    <div className={rootClass} {...rest}>
      <a className="btn x" href={twitterHref} target="_blank" rel="noopener noreferrer">
        Share on X
      </a>
      <button className="btn copy" onClick={copy}>
        {copied ? "Copied ✓" : "Copy referral link"}
      </button>
      <button className="btn share" onClick={nativeShare}>
        Share
      </button>

      <style jsx>{`
        .sharebar { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
        .btn { padding: 8px 12px; border-radius: 8px; border: 1px solid #00ff88; color: #fff; background: rgba(0,255,136,0.08); cursor: pointer; }
        .btn.x { border-color: #1d9bf0; background: rgba(29,155,240,0.1); }
        .btn.copy { border-color: #00ff88; }
        .btn.share { border-color: #a78bfa; background: rgba(167,139,250,0.12); }
      `}</style>
    </div>
  );
}