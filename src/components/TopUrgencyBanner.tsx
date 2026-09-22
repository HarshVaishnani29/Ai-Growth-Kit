'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';

export const TopUrgencyBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 41,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, '0');

  return (
    <div style={{
      background: 'linear-gradient(90deg, #111520 0%, #1a160d 35%, #2a1f0a 50%, #1a160d 65%, #111520 100%)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
      padding: '7px 12px',
      fontSize: '12px',
      color: '#e2e8f0',
      position: 'relative',
      zIndex: 50
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '8px 14px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{
            background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 800,
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap'
          }}>
            <Flame size={12} fill="#fff" /> SPECIAL LAUNCH
          </span>
          <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '12px' }}>
            AI + Instagram Marketing System: <b style={{ color: '#fbbf24' }}>90% OFF Today</b>
          </span>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '2px 9px',
          borderRadius: '999px',
          whiteSpace: 'nowrap'
        }}>
          <Clock size={12} color="#fbbf24" />
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Ending In:</span>
          <div style={{
            display: 'inline-flex',
            gap: '2px',
            fontFamily: 'monospace',
            fontWeight: 800,
            color: '#fbbf24',
            fontSize: '11px'
          }}>
            <span>{formatDigit(timeLeft.hours)}h</span>
            <span>:</span>
            <span>{formatDigit(timeLeft.minutes)}m</span>
            <span>:</span>
            <span>{formatDigit(timeLeft.seconds)}s</span>
          </div>
        </div>

        <a
          href="#pricing"
          style={{
            color: '#fbbf24',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            whiteSpace: 'nowrap'
          }}
        >
          Claim For ₹499 →
        </a>
      </div>
    </div>
  );
};
