'use client';

import React from 'react';
import { BONUS_STACK } from '../data/mockData';
import { motion } from 'framer-motion';
import { Gift, Mail, MessageSquare, CheckSquare, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const BonusStack: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Mail': return <Mail size={22} color="#fbbf24" />;
      case 'MessageSquare': return <MessageSquare size={22} color="#fbbf24" />;
      case 'CheckSquare': return <CheckSquare size={22} color="#fbbf24" />;
      default: return <MapPin size={22} color="#fbbf24" />;
    }
  };

  const totalValue = BONUS_STACK.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <section id="bonuses" className="section-spacing" style={{
      position: 'relative',
      background: 'radial-gradient(circle at 50% 30%, #121824 0%, #06080c 70%)',
      borderTop: '1px solid rgba(245, 158, 11, 0.2)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-badge" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}>
            <Gift size={14} />
            <span>FAST-ACTION LAUNCH BONUSES</span>
          </div>
          <h2>
            Get Assets Worth{' '}
            <span className="gradient-text-gold">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>{' '}
            100% FREE Today
          </h2>
          <p>
            When you claim the <b>AI + Instagram Marketing System (₹499)</b> today, all 4 execution bonuses below unlock in your account automatically.
          </p>
        </div>

        {/* 4-Card Bonus Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          maxWidth: '1050px',
          margin: '0 auto 48px auto'
        }} className="bonus-grid">
          {BONUS_STACK.map((bonus, idx) => (
            <motion.div
              key={bonus.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card"
              style={{
                padding: '32px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                background: 'rgba(14, 19, 28, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header tag and Value */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#fbbf24',
                    letterSpacing: '0.1em',
                    background: 'rgba(245, 158, 11, 0.12)',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {bonus.bonusNumber}
                  </span>

                  <div style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>Value:</span>
                    <span style={{ textDecoration: 'line-through', color: '#f87171' }}>
                      ₹{bonus.value.toLocaleString('en-IN')}
                    </span>
                    <span style={{ color: '#10b981', fontWeight: 900 }}>FREE</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getIcon(bonus.icon)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', lineHeight: 1.3 }}>
                      {bonus.title}
                    </h3>
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
                  {bonus.description}
                </p>
              </div>

              <div style={{
                background: 'rgba(7, 10, 15, 0.6)',
                borderRadius: '10px',
                padding: '14px 16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {bonus.features.map((feat, fidx) => (
                  <div key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#10b981" />
                    <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bonus Cumulative Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
            TOTAL VALUE STACK
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
            Complete AI Toolkit + 4 Bonuses ={' '}
            <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>₹11,997</span>{' '}
            <span className="gradient-text-gold">For Just ₹499</span>
          </h3>
          <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '620px', margin: '0 auto 24px auto' }}>
            Everything you need to turn your Instagram profile into an automated customer-generating asset for your business.
          </p>

          <a href="#pricing" className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
            <span>GET THE COMPLETE KIT — ₹499</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 800px) {
          .bonus-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
