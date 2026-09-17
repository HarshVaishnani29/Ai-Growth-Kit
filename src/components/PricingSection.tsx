'use client';

import React from 'react';
import Link from 'next/link';
import { PRICING_PLANS } from '../data/mockData';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Flame,
  Clock,
  Download,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export const PricingSection: React.FC = () => {
  const masterPlan = PRICING_PLANS[0];

  return (
    <section id="pricing" className="section-spacing" style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 15%, rgba(245, 158, 11, 0.12) 0%, #06080c 65%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-badge" style={{ background: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.35)', color: '#f87171' }}>
            <Flame size={14} />
            <span>₹499 — COMPLETE DIGITAL KIT</span>
          </div>
          <h2>
            AI + Instagram Marketing System{' '}
            <span className="gradient-text-gold">Now For Just ₹499</span>
          </h2>
          <p>
            No recurring subscriptions, no hidden charges. Pay ₹499 once and get lifetime access to 100 Prompts, 100 Viral Hooks, 30-Day Content Calendar, Canva Workflows, and WhatsApp Sales Closing Scripts.
          </p>
        </div>

        {/* Master Single Spotlight Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-beam-card"
          style={{
            padding: '44px 40px',
            border: '2px solid rgba(245, 158, 11, 0.6)',
            boxShadow: '0 25px 80px -15px rgba(245, 158, 11, 0.35), 0 0 50px rgba(245, 158, 11, 0.15)',
            background: 'linear-gradient(180deg, rgba(20, 27, 42, 0.95) 0%, rgba(10, 14, 22, 0.95) 100%)'
          }}
        >
          {/* Top Banner Tag */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: '#000',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.1em',
                padding: '5px 14px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Sparkles size={12} fill="#000" /> ALL-IN-ONE INDIAN BUSINESS TOOLKIT
              </span>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} strokeWidth={3} /> Instant Digital Delivery
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#fbbf24',
              background: 'rgba(245, 158, 11, 0.12)',
              padding: '5px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <Clock size={13} />
              <span>Launch Price Locked for: <b>02h 41m</b></span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
            alignItems: 'center'
          }} className="pricing-split">
            {/* Left Content Column */}
            <div>
              <h3 style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
                Complete AI + Instagram Growth Toolkit
              </h3>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '24px' }}>
                Creating content for your business doesn't have to be a daily headache. Includes every asset you need to generate 30 days of high-converting content using ChatGPT and Canva:
              </p>

              {/* Feature Checklist Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '28px'
              }} className="features-grid">
                {masterPlan.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(245, 158, 11, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Check size={12} color="#fbbf24" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.4 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social proof stack inside pricing */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ display: 'flex', marginLeft: '6px' }}>
                  {['B', 'P', 'D', 'S'].map((char, i) => (
                    <div
                      key={i}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#1e293b',
                        border: '2px solid #06080c',
                        marginLeft: '-8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#fbbf24'
                      }}
                    >
                      {char}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Joined by <b style={{ color: '#fff' }}>1,450+ Indian business owners & creators</b>
                </span>
              </div>
            </div>

            {/* Right Price Card Box */}
            <div style={{
              background: 'rgba(7, 10, 16, 0.85)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '20px',
              padding: '32px 28px',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textDecoration: 'line-through', marginBottom: '4px' }}>
                REGULAR PRICE: ₹4,999
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '56px',
                  fontWeight: 900,
                  color: '#fbbf24',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1
                }}>
                  ₹499
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                  / One-Time
                </span>
              </div>

              <div style={{
                display: 'inline-block',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                fontSize: '11px',
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: '999px',
                marginBottom: '22px'
              }}>
                YOU SAVE ₹4,500 (90% OFF TODAY)
              </div>

              <Link
                href="/checkout?plan=starter"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  fontSize: '16px',
                  boxShadow: '0 10px 35px rgba(245, 158, 11, 0.5)'
                }}
              >
                <span>BUY NOW — ₹499</span>
                <ArrowRight size={18} />
              </Link>

              <div style={{
                marginTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '11px',
                color: '#94a3b8'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Direct UPI QR 100% Instant & Secured (Zero Fees)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Download size={14} color="#fbbf24" />
                  <span>Instant Digital Delivery Right After Payment</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Smartphone size={14} color="#60a5fa" />
                  <span>Free Canva Compatible (No Pro Needed)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .pricing-split {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
