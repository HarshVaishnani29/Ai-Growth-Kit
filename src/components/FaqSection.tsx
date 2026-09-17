'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle, Download } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="section-spacing" style={{
      background: '#07090d',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        <div className="section-header-center">
          <div className="section-badge">
            <HelpCircle size={14} />
            <span>OBJECTIONS RESOLVED</span>
          </div>
          <h2>
            Frequently Asked{' '}
            <span className="gradient-text-gold">Questions (FAQ)</span>
          </h2>
          <p>
            Have questions before ordering? Here are clear, straightforward answers:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? 'rgba(20, 26, 38, 0.85)' : 'rgba(13, 17, 26, 0.6)',
                  border: isOpen ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '22px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'transparent',
                    color: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    color: isOpen ? '#fbbf24' : '#f8fafc',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {faq.question}
                  </span>

                  <span style={{
                    color: isOpen ? '#fbbf24' : '#94a3b8',
                    display: 'flex',
                    flexShrink: 0
                  }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 22px 24px',
                    fontSize: '14px',
                    color: '#cbd5e1',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '16px'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instant Digital Delivery Notice */}
        <div style={{
          marginTop: '48px',
          background: 'rgba(245, 158, 11, 0.06)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: '14px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              flexShrink: 0
            }}>
              <Download size={20} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#fbbf24' }}>
                100% Instant Digital Delivery Notice
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px', maxWidth: '600px' }}>
                Immediately after successful payment, you will receive the Google Drive Link & Download Dashboard directly on screen, plus instant access credentials sent to your email.
              </div>
            </div>
          </div>

          <a
            href="#pricing"
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#fbbf24',
              textDecoration: 'underline'
            }}
          >
            Get Kit Now (₹499) →
          </a>
        </div>
      </div>
    </section>
  );
};
