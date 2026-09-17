'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#040609',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '64px',
      paddingBottom: '40px',
      fontSize: '13px',
      color: '#94a3b8'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '48px'
        }} className="footer-grid">
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1b2230 0%, #0d1117 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fbbf24'
              }}>
                <Bot size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#fff' }}>
                AI Growth <span style={{ color: '#fbbf24' }}>Kit</span>
              </span>
            </div>

            <p style={{ lineHeight: 1.6, marginBottom: '20px', maxWidth: '300px', color: '#cbd5e1' }}>
              The practical toolkit to create 30 days of high-converting business content using ChatGPT + Canva.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#34d399',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '6px'
              }}>
                <ShieldCheck size={13} /> 256-Bit SSL Encrypted Checkout
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Navigation
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#curriculum" style={{ transition: 'color 0.2s' }}>What You Get</a></li>
              <li><a href="#preview" style={{ transition: 'color 0.2s' }}>Live Prompts Preview</a></li>
              <li><Link href="/sample">Prompt Vault Explorer</Link></li>
              <li><a href="#bonuses">4 Fast-Action Bonuses</a></li>
              <li><a href="#reviews">Verified Results</a></li>
              <li><a href="#pricing">Get Access (₹499)</a></li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h5 style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Policies & Support
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link href="/legal/terms">Terms & Conditions</Link></li>
              <li><Link href="/legal/privacy">Privacy Policy</Link></li>
              <li><Link href="/legal/refund">Refund Policy</Link></li>
              <li><a href="mailto:support@aigrowthkit.in">Customer Support</a></li>
            </ul>
          </div>

          {/* Back to top & Guarantee */}
          <div>
            <h5 style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Digital Delivery
            </h5>
            <p style={{ lineHeight: 1.6, fontSize: '12px', marginBottom: '18px', color: '#cbd5e1' }}>
              Instant download links and Google Drive access are delivered immediately upon successful payment.
            </p>

            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '11px',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} AI Business Growth Kit — AI + Instagram Marketing System. All rights reserved.
          </div>
          <div>
            Practical Indian Business Toolkit for Instagram Growth, ChatGPT Prompts & Canva Workflows.
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
