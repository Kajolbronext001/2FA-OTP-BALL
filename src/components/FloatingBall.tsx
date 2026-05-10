/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateTOTP, extractSecret } from '../lib/totp';
import { beepService } from '../lib/audio';
import { cn } from '../lib/utils';

interface FloatingBallProps {
  size: number;
  isEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export const FloatingBall: React.FC<FloatingBallProps> = ({
  size,
  isEnabled,
  soundEnabled,
  vibrationEnabled,
}) => {
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  if (!isEnabled) return null;

  const handleClick = async () => {
    // Sound playback
    if (soundEnabled) {
      beepService.play();
    }

    // Vibration
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(20);
    }

    try {
      // Read clipboard
      const clipboardText = await navigator.clipboard.readText();
      const secret = extractSecret(clipboardText);

      if (secret) {
        const otp = generateTOTP(secret);
        if (otp) {
          // Copy back to clipboard
          await navigator.clipboard.writeText(otp);
          
          // Show OTP feedback
          setFeedback({ text: otp, type: 'success' });
          setTimeout(() => setFeedback(null), 100);
          return;
        }
      }
      
      // Fallback: Not found
      setFeedback({ text: 'Not Found Key', type: 'error' });
      setTimeout(() => setFeedback(null), 150);

    } catch (err) {
      console.error('Clipboard access failed', err);
      setFeedback({ text: 'Access Denied', type: 'error' });
      setTimeout(() => setFeedback(null), 150);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        drag
        dragMomentum={false}
        className="pointer-events-auto cursor-pointer relative"
        initial={{ x: window.innerWidth / 2 - size / 2, y: window.innerHeight / 2 - size / 2 }}
        style={{ width: size, height: size }}
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
      >
        {/* Neon Light Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid transparent',
            borderTopColor: '#00ffff',
            borderRightColor: '#ff00ff',
            boxShadow: '0 0 10px #00ffff, inset 0 0 5px #ff00ff',
          }}
        />
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[3px] rounded-full"
          style={{
            border: '2px solid transparent',
            borderBottomColor: '#f0f',
            borderLeftColor: '#0ff',
            boxShadow: '0 0 8px #ff00ff, inset 0 0 4px #00ffff',
          }}
        />

        {/* Main Ball Body */}
        <div 
          className="absolute inset-[6px] rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-700 shadow-2xl"
        >
          <div className="text-white font-bold select-none" style={{ fontSize: size / 4 }}>
            2FA
          </div>
          
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10" />
        </div>

        {/* Feedback Popup */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "absolute left-1/2 -translate-x-1/2 bottom-full mb-4 px-3 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap shadow-lg border",
                feedback.type === 'success' 
                  ? "bg-cyan-500 text-white border-cyan-400" 
                  : "bg-red-500 text-white border-red-400"
              )}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
