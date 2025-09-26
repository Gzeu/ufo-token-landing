'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Share, Twitter, Copy, ExternalLink } from 'lucide-react';
import { FOUR_MEME_REF_URL, SOCIAL_CONFIG } from '../config/links';

interface ShareBarProps {
  refUrl?: string;
  className?: string;
}

function buildTwitterIntent(url: string) {
  const { text, hashtags, via } = SOCIAL_CONFIG.twitter;
  const params = new URLSearchParams({ 
    text, 
    url, 
    hashtags,
    via 
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export default function ShareBar({ refUrl, className = '' }: ShareBarProps) {
  const url = refUrl || FOUR_MEME_REF_URL;
  const twitterHref = useMemo(() => buildTwitterIntent(url), [url]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UFO Token — Invasion Missions',
          text: SOCIAL_CONFIG.twitter.text,
          url,
        });
      } catch (error) {
        // User cancelled or share failed, fallback to Twitter
        window.open(twitterHref, '_blank', 'noopener,noreferrer');
      }
    } else {
      // No native sharing, open Twitter
      window.open(twitterHref, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`flex flex-wrap gap-3 items-center ${className}`}>
      {/* Twitter Share Button */}
      <motion.a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 text-blue-300 hover:text-blue-200 rounded-lg transition-all duration-300 text-sm font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Twitter className="w-4 h-4" />
        Share on X
      </motion.a>

      {/* Copy Link Button */}
      <motion.button
        onClick={copyToClipboard}
        className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-300 text-sm font-medium ${
          copied
            ? 'bg-green-500/20 border-green-400/50 text-green-300'
            : 'bg-green-500/10 hover:bg-green-500/20 border-green-400/30 hover:border-green-400/50 text-green-400 hover:text-green-300'
        }`}
        whileHover={{ scale: copied ? 1 : 1.02 }}
        whileTap={{ scale: copied ? 1 : 0.98 }}
      >
        <Copy className="w-4 h-4" />
        {copied ? 'Copied ✓' : 'Copy Link'}
      </motion.button>

      {/* Native Share Button (mobile-friendly) */}
      <motion.button
        onClick={nativeShare}
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 rounded-lg transition-all duration-300 text-sm font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Share className="w-4 h-4" />
        Share
      </motion.button>

      {/* Direct Link Button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border border-green-400/40 text-green-300 hover:text-white rounded-lg transition-all duration-300 text-sm font-bold"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ExternalLink className="w-4 h-4" />
        Trade UFO
      </motion.a>
    </div>
  );
}