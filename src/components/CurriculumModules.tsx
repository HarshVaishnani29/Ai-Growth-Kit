'use client';

import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, FileText, Sparkles, Download } from 'lucide-react';

export const CurriculumModules: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<string>('mod-1');

  const toggleModule = (id: string) => {
    setOpenModuleId(prev => (prev === id ? '' : id));
  };

  return (
    <section id="curriculum" className="section-spacing" style={{
      background: 'linear-gradient(180deg, #06080c 0%, #0d121c 50%, #06080c 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-badge">
            <span className="section-badge-dot" />
            <span>COMPLETE SYSTEM INCLUSIONS</span>
          </div>
          <h2>
            What All Do You Get Inside{' '}
            <span className="gradient-text-gold">This Toolkit?</span>
          </h2>
          <p>
            A complete digital system to build 30 days of high-converting business content using ChatGPT and Canva.
          </p>
        </div>

        {/* Modules List Accordion */}
        <div style={{
          maxWidth: '920px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {COURSE_MODULES.map((mod, idx) => {
            const isOpen = openModuleId === mod.id;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{
                  borderRadius: '16px',
                  background: isOpen ? 'rgba(20, 27, 42, 0.9)' : 'rgba(12, 16, 26, 0.65)',
                  border: isOpen
                    ? '1px solid rgba(245, 158, 11, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isOpen
                    ? '0 12px 35px -10px rgba(245, 158, 11, 0.2)'
                    : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  style={{
                    width: '100%',
                    padding: '22px 26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    background: 'transparent',
                    textAlign: 'left',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    {/* Number Badge */}
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: isOpen
                        ? 'linear-gradient(135deg, #fbbf24, #d97706)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isOpen ? '#000' : '#fbbf24',
                      fontWeight: 900,
                      fontSize: '16px',
                      fontFamily: 'var(--font-heading)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {mod.moduleNumber}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#fbbf24',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase'
                        }}>
                          {mod.badge}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>•</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                          {mod.durationOrCount}
                        </span>
                      </div>
                      <h3 style={{
                        fontSize: 'clamp(17px, 2.2vw, 21px)',
                        fontWeight: 800,
                        color: isOpen ? '#ffffff' : '#e2e8f0',
                        marginTop: '4px'
                      }}>
                        {mod.title}
                      </h3>
                      <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
                        {mod.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: isOpen ? '#fbbf24' : '#94a3b8'
                  }}>
                    <span style={{
                      display: 'none',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }} className="format-tag">
                      {mod.fileFormat}
                    </span>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Expanded Content Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: '0 26px 26px 88px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '18px'
                      }}
                      className="module-body"
                    >
                      <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '18px' }}>
                        {mod.description}
                      </p>

                      <div style={{
                        background: 'rgba(8, 11, 18, 0.75)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          What's Included:
                        </div>
                        {mod.highlights.map((h, hIdx) => (
                          <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '16px',
                        fontSize: '12px',
                        color: '#94a3b8'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FileText size={14} color="#fbbf24" />
                          <span>Format: <b>{mod.fileFormat}</b></span>
                        </div>
                        <a
                          href="#pricing"
                          style={{
                            color: '#fbbf24',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Included in ₹499 Kit →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .format-tag {
            display: inline-block !important;
          }
        }
        @media (max-width: 640px) {
          .module-body {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};
