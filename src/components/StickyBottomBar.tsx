'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Zap, ArrowRight, X, Bot, Flame } from 'lucide-react';

export const StickyBottomBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 41, seconds: 18 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <aside
      aria-label="Limited launch offer reminder"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 14, 22, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(245, 158, 11, 0.35)',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.6)',
        padding: '12px 20px',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Left Product & Discount Summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24'
          }}>
            <Bot size={22} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
                AI + Instagram Marketing System
              </span>
              <span style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '1px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 800
              }}>
                90% OFF
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>100 Prompts + 100 Hooks + Calendar + Canva + WhatsApp Scripts</span>
            </div>
          </div>
        </div>

        {/* Center Countdown (Hidden on mobile) */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }} className="sticky-timer">
          <Clock size={14} color="#fbbf24" />
          <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Offer Ends In:</span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#fbbf24', fontFamily: 'monospace' }}>
            02:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Right CTA and Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', textDecoration: 'line-through' }}>
              ₹4,999
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>
              ₹499
            </div>
          </div>

          <Link
            href="/checkout?plan=starter"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000',
              fontWeight: 800,
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 18px rgba(245, 158, 11, 0.4)',
              whiteSpace: 'nowrap'
            }}
          >
            <Flame size={15} fill="#000" />
            <span>BUY NOW — ₹499</span>
            <ArrowRight size={16} />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'transparent',
              color: '#64748b',
              display: 'flex',
              padding: '6px'
            }}
            title="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (min-width: 800px) {
          .sticky-timer {
            display: inline-flex !important;
          }
        }
      `}</style>
    </aside>
  );
};
