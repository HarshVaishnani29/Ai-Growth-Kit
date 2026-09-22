'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle, Flame } from 'lucide-react';
import { InteractivePostCard } from './InteractivePostCard';

export const HeroSection: React.FC = () => {
  return (
    <section style={{
      position: 'relative',
      paddingTop: 'clamp(40px, 6vw, 68px)',
      paddingBottom: 'clamp(48px, 7vw, 88px)',
      overflow: 'hidden'
    }}>
      {/* Background Spotlight / Aurora Beam */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(236, 72, 153, 0.05) 40%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 'clamp(36px, 4vw, 56px)',
          alignItems: 'center'
        }} className="hero-grid">
          {/* Left Hero Copy */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Chip Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 16px',
              borderRadius: '999px',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: '22px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.1)',
              flexWrap: 'wrap'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
                animation: 'pulseDot 1.8s infinite'
              }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                AI + INSTAGRAM MARKETING SYSTEM
              </span>
              <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '1px 7px', borderRadius: '999px', fontSize: '10px', fontWeight: 900 }}>
                ₹499 ONLY
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(30px, 4.4vw, 56px)',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.03em'
            }}>
              Creating Instagram Content{' '}
              <span className="gradient-text-gold">
                Is No Longer a Headache.
              </span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: '#cbd5e1',
              lineHeight: 1.7,
              marginBottom: '28px',
              maxWidth: '560px'
            }}>
              The ultimate practical toolkit to create 30 days of high-converting business content using <b>ChatGPT + Canva</b>. Packed with 100 Prompts, 100 Viral Hooks, and WhatsApp Sales Closing Scripts.
            </p>

            {/* Avatar Stack & Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', marginLeft: '6px' }}>
                {['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80'
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Verified member ${i + 1} using AI Business Growth Kit`}
                    width={32}
                    height={32}
                    loading="lazy"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid #06080c',
                      marginLeft: '-8px',
                      objectFit: 'cover'
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', color: '#fbbf24' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" strokeWidth={0} />
                  ))}
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                  <b style={{ color: '#fff' }}>4.9/5</b> (1,450+ Indian Business Owners & Creators)
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '36px'
            }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#pricing"
                  className="btn-primary"
                  style={{ fontSize: '15px', padding: '16px 36px', whiteSpace: 'nowrap' }}
                >
                  <Flame size={18} fill="#000" />
                  <span>GET THE KIT NOW — ₹499</span>
                  <ArrowRight size={18} />
                </a>
              </motion.div>

              <a
                href="#preview"
                className="btn-secondary"
                style={{ fontSize: '14px', whiteSpace: 'nowrap' }}
              >
                <span>Live Prompts Test Drive</span>
              </a>
            </div>

            {/* Micro Guarantees */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px 20px',
              flexWrap: 'wrap',
              fontSize: '12px',
              color: '#94a3b8'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#10b981" />
                <span>Instant Digital Download Links</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#10b981" />
                <span>Free Canva Friendly (No Paid Pro Needed)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#10b981" />
                <span>One-Time Fee (₹499 Lifetime)</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual - 3D Pop-up Post Creative */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <InteractivePostCard />
          </motion.div>
        </div>

        {/* Credibility Bar Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginTop: 'clamp(44px, 6vw, 68px)',
            padding: '22px 28px',
            background: 'rgba(14, 19, 30, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            textAlign: 'center'
          }}
          className="credibility-grid"
        >
          <div>
            <div style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>
              100 Prompts
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              ChatGPT Business Templates
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#f8fafc', fontFamily: 'var(--font-heading)' }}>
              100 Hooks
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              Viral Reel First 3-Sec Hooks
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#10b981', fontFamily: 'var(--font-heading)' }}>
              30 Days
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              Ready Content Calendar
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>
              ₹499
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              Complete Digital Toolkit
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          .credibility-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 480px) {
          .credibility-grid {
            padding: 18px 14px !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
