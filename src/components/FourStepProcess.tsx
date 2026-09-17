'use client';

import React from 'react';
import { FOUR_STEPS } from '../data/mockData';
import { motion } from 'framer-motion';
import { Copy, Bot, Palette, Share2, ArrowRight } from 'lucide-react';

export const FourStepProcess: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Copy size={24} color="#fbbf24" />;
      case 1: return <Bot size={24} color="#34d399" />;
      case 2: return <Palette size={24} color="#60a5fa" />;
      default: return <Share2 size={24} color="#f472b6" />;
    }
  };

  return (
    <section className="section-spacing" style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #06080c 0%, #0d121c 50%, #06080c 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      <div className="container">
        <div className="section-header-center">
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>4-STEP ACTION WORKFLOW</span>
          </div>
          <h2>
            Create 30 Days of Content in{' '}
            <span className="gradient-text-gold">4 Simple Steps</span>
          </h2>
          <p>
            Without any technical complexity, spend just 15 minutes a day to create viral Instagram posts and reels for your business.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }} className="steps-grid">
          {FOUR_STEPS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="border-beam-card"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getIcon(idx)}
                  </div>

                  <span style={{
                    fontSize: '12px',
                    fontWeight: 900,
                    color: '#fbbf24',
                    background: 'rgba(245, 158, 11, 0.15)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontFamily: 'monospace'
                  }}>
                    {item.step}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '10px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{
                marginTop: '20px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '11px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>Ready Template Included</span>
                <ArrowRight size={12} color="#fbbf24" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
