/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingBall } from './components/FloatingBall';
import { Settings, Power, Volume2, VolumeX, Smartphone, SmartphoneNfc, Maximize2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [ballSize, setBallSize] = useState(64);
  const [isEnabled, setIsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(true);

  // Auto-request clipboard permission if possible
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'clipboard-read' as PermissionName }).then(res => {
        console.log('Clipboard permission state:', res.state);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-6 pt-12 pb-24">
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 bg-cyan-500 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Rapid 2FA</h1>
          </motion.div>
          <p className="text-slate-400 text-sm">
            এক ক্লিকেই আপনার 2FA কী থেকে OTP বের করুন। ক্লিপবোর্ড কপি-পেস্ট আর সহজ হবে।
          </p>
        </header>

        <section className="space-y-6">
          {/* Main Controls */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
              <Settings className="w-3 h-3" /> সেটিংস
            </h2>

            <div className="space-y-8">
              {/* Ball Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${isEnabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                    <Power className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-medium">ভাসমান বল</span>
                    <span className="text-xs text-slate-500">অন/অফ করুন</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEnabled(!isEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                  id="toggle-ball"
                >
                  <motion.div 
                    animate={{ x: isEnabled ? 26 : 2 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                    {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="block font-medium">সাউন্ড ইফেক্ট</span>
                    <span className="text-xs text-slate-500">বিপ সাউন্ড</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                  id="toggle-sound"
                >
                  <motion.div 
                    animate={{ x: soundEnabled ? 26 : 2 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              {/* Vibration Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${vibrationEnabled ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-500'}`}>
                    {vibrationEnabled ? <SmartphoneNfc className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="block font-medium">ভাইব্রেশন</span>
                    <span className="text-xs text-slate-500">হ্যাপটিক ফিডব্যাক</span>
                  </div>
                </div>
                <button 
                  onClick={() => setVibrationEnabled(!vibrationEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${vibrationEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                  id="toggle-vibration"
                >
                  <motion.div 
                    animate={{ x: vibrationEnabled ? 26 : 2 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              {/* Size Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-medium">বলের আকার</span>
                      <span className="text-xs text-slate-500">ছোট বা বড় করুন</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-cyan-400">{ballSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="120" 
                  value={ballSize} 
                  onChange={(e) => setBallSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  id="size-slider"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/30 rounded-2xl border border-slate-800/50 text-xs text-center text-slate-500 leading-relaxed">
            কিভাবে কাজ করে: প্রথমে আপনার 2FA কী কপি করুন, তারপর স্ক্রিনে থাকা ভাসমান বলটিতে ক্লিক করুন। এটি স্বয়ংক্রিয়ভাবে OTP জেনারেট করে আপনার ক্লিবোর্ড এ কপি করে দেবে।
          </div>
        </section>
      </main>

      {/* The Floating Ball */}
      <FloatingBall 
        size={ballSize} 
        isEnabled={isEnabled} 
        soundEnabled={soundEnabled}
        vibrationEnabled={vibrationEnabled}
      />

      {/* Overlay Instructions for first time */}
      {!isEnabled && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-12 text-center">
          <p className="text-slate-600 italic">বলটি চালু করলে এখানে প্রদর্শিত হবে...</p>
        </div>
      )}
    </div>
  );
}
