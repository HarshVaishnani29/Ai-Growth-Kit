'use client';

import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ShieldCheck, TrendingUp } from 'lucide-react';

export const TestimonialsWall: React.FC = () => {
  return (
    <section id="reviews" className="section-spacing" style={{
      background: '#07090d',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        <div className="section-header-center">
          <div className="section-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399' }}>
            <ShieldCheck size={14} />
            <span>VERIFIED BUYER OUTCOMES</span>
          </div>
          <h2>
            Trusted by 1,450+ Business Owners &{' '}
            <span className="gradient-text-gold">Creators Across India</span>
          </h2>
          <p>
            See how retail shops, local businesses, and creators from Surat, Ahmedabad, and beyond scaled inquiries and sales using these practical ChatGPT Prompts and Canva Workflows:
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }} className="reviews-grid">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div>
                {/* Metric pill */}
                {item.growthMetric && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#34d399',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '999px',
                    marginBottom: '16px'
                  }}>
                    <TrendingUp size={13} />
                    <span>{item.growthMetric}</span>
                  </div>
                )}

                {/* Stars */}
                <div style={{ display: 'flex', color: '#fbbf24', marginBottom: '14px' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" strokeWidth={0} />
                  ))}
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', lineHeight: 1.3 }}>
                  "{item.highlight}"
                </h4>

                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '24px' }}>
                  "{item.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  border: '2px solid rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#fbbf24'
                }}>
                  {item.name.charAt(0)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
                      {item.name}
                    </span>
                    {item.verified && (
                      <span title="Verified Toolkit Buyer">
                        <ShieldCheck size={14} color="#10b981" />
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
