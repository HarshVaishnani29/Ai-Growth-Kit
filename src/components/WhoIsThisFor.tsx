'use client';

import React from 'react';
import { TARGET_AUDIENCE } from '../data/mockData';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Store, Briefcase, Camera, GraduationCap, MapPin, Sparkles } from 'lucide-react';

export const WhoIsThisFor: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Store size={22} color="#fbbf24" />;
      case 1: return <Briefcase size={22} color="#34d399" />;
      case 2: return <Camera size={22} color="#f472b6" />;
      case 3: return <GraduationCap size={22} color="#60a5fa" />;
      case 4: return <MapPin size={22} color="#fbbf24" />;
      default: return <Sparkles size={22} color="#34d399" />;
    }
  };

  return (
    <section className="section-spacing" style={{
      background: 'radial-gradient(circle at 50% 20%, #0d121c 0%, #06080c 70%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      <div className="container">
        <div className="section-header-center">
          <div className="section-badge">
            <Target size={14} />
            <span>TARGET AUDIENCE</span>
          </div>
          <h2>
            Who Is This Toolkit{' '}
            <span className="gradient-text-gold">Specially Designed For?</span>
          </h2>
          <p>
            If you want to scale your business online by investing just 15 minutes a day directly from your phone, this practical toolkit is built for you.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '1080px',
          margin: '0 auto'
        }} className="audience-grid">
          {TARGET_AUDIENCE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="border-beam-card"
              style={{
                padding: '28px 24px',
                background: 'rgba(12, 16, 26, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}>
                  {getIcon(idx)}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{
                marginTop: '18px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: '#10b981',
                fontWeight: 700
              }}>
                <CheckCircle2 size={13} />
                <span>100% Recommended Fit</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .audience-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .audience-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
