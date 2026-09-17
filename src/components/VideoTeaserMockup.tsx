'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Bot, Palette, CheckCircle2, Instagram } from 'lucide-react';

export const VideoTeaserMockup: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div style={{
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(245, 158, 11, 0.4)',
      boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 40px rgba(245, 158, 11, 0.18)',
      background: 'linear-gradient(145deg, #121724 0%, #07090e 100%)'
    }}>
      {/* Player Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: 'rgba(9, 12, 18, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '8px', fontWeight: 600 }}>
            chatgpt_canva_reel_workflow.mp4
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(236, 72, 153, 0.15)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '999px',
            padding: '2px 8px',
            fontSize: '10px',
            color: '#f472b6',
            fontWeight: 800
          }}>
            <Instagram size={11} />
            LIVE WORKFLOW
          </span>
          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{ background: 'transparent', color: '#94a3b8', display: 'flex', padding: '2px' }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Main Video Viewport Mockup */}
      <div style={{
        position: 'relative',
        minHeight: '340px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        background: 'radial-gradient(circle at 60% 40%, #1a2233 0%, #070a10 80%)'
      }}>
        {/* Floating Top Info Overlay */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            padding: '8px 14px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Bot size={16} color="#fbbf24" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#f8fafc' }}>
                ChatGPT + Canva System
              </div>
              <div style={{ fontSize: '10px', color: '#fbbf24' }}>
                30-Day Indian Business Content Blueprint
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '11px',
            color: '#34d399',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Palette size={13} /> Free Canva Ready
          </div>
        </div>

        {/* Central Dynamic Visualizer */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0'
        }}>
          {/* Animated Center Play Trigger */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(245, 158, 11, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              marginBottom: '18px',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={28} fill="#000" /> : <Play size={28} fill="#000" style={{ marginLeft: '4px' }} />}
          </button>

          {/* Sound Wave Equalizer (Animated) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            height: '24px',
            marginBottom: '10px'
          }}>
            {[18, 28, 14, 32, 22, 38, 16, 26, 34, 18, 30, 20, 36, 12, 24].map((h, i) => (
              <span
                key={i}
                style={{
                  width: '3px',
                  height: isPlaying ? `${h}px` : '4px',
                  background: isPlaying
                    ? 'linear-gradient(180deg, #fbbf24, #f59e0b)'
                    : 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '2px',
                  transition: 'height 0.2s ease',
                  animation: isPlaying ? `equalizer 1.2s ease-in-out infinite alternate ${i * 0.1}s` : 'none'
                }}
              />
            ))}
          </div>

          <p style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>
            {isPlaying ? '⚡ 100 Prompts & Canva Reel Hooks Live Walkthrough' : 'Click to resume preview'}
          </p>
        </div>

        {/* Feature Ticker Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          background: 'rgba(9, 12, 18, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '10px 14px'
        }}>
          <div>
            <span style={{ fontSize: '9px', color: '#94a3b8', letterSpacing: '0.05em' }}>PROMPTS</span>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#f8fafc' }}>100 Ready-Made</div>
          </div>
          <div>
            <span style={{ fontSize: '9px', color: '#94a3b8', letterSpacing: '0.05em' }}>REEL HOOKS</span>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399' }}>100 Viral Formats</div>
          </div>
          <div>
            <span style={{ fontSize: '9px', color: '#94a3b8', letterSpacing: '0.05em' }}>OFFER</span>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24' }}>₹499 Lifetime</div>
          </div>
        </div>
      </div>

      {/* Video Scrubber & Controls */}
      <div style={{
        padding: '12px 20px',
        background: 'rgba(7, 10, 16, 0.98)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }}>
        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8' }}>01:15 / 02:30</div>
        <div style={{
          flex: 1,
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '999px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            borderRadius: '999px'
          }} />
        </div>
        <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 700, letterSpacing: '0.05em' }}>
          PRACTICAL WORKFLOW
        </span>
      </div>

      <style jsx>{`
        @keyframes equalizer {
          0% { height: 6px; }
          100% { height: 26px; }
        }
      `}</style>
    </div>
  );
};
