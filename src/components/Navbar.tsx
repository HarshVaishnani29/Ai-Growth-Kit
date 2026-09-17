'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight, Bot, Flame } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(7, 9, 13, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1b2230 0%, #0d1117 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)'
          }}>
            <Bot size={22} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '18px',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span>AI Growth</span>
              <span style={{
                color: '#000',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                padding: '2px 7px',
                borderRadius: '5px',
                fontSize: '12px',
                fontWeight: 900
              }}>KIT</span>
            </div>
            <div style={{
              fontSize: '10px',
              color: '#94a3b8',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 700
            }}>
              AI + Instagram Marketing System
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '26px',
          fontSize: '14px',
          fontWeight: 700,
          color: '#cbd5e1'
        }} className="desktop-nav">
          <a href="#curriculum" style={{ transition: 'color 0.2s' }}>What You Get</a>
          <a href="#preview" style={{ transition: 'color 0.2s' }}>Live Prompts</a>
          <a href="#bonuses" style={{ transition: 'color 0.2s' }}>4 Bonuses</a>
          <a href="#reviews" style={{ transition: 'color 0.2s' }}>Reviews</a>
          <a href="#pricing" style={{ transition: 'color 0.2s' }}>Pricing (₹499)</a>
          <a href="#faq" style={{ transition: 'color 0.2s' }}>FAQ</a>
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/access"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#fbbf24',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              background: 'rgba(245, 158, 11, 0.08)',
              transition: 'all 0.2s'
            }}
          >
            <span>Access Vault</span>
          </Link>

          <Link
            href="/sample"
            style={{
              display: 'none',
              fontSize: '13px',
              fontWeight: 700,
              color: '#cbd5e1',
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              transition: 'all 0.2s',
              background: 'rgba(255, 255, 255, 0.03)'
            }}
            className="desktop-sample-btn"
          >
            Prompt Vault Preview
          </Link>

          <Link
            href="/checkout?plan=starter"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000',
              fontWeight: 800,
              fontSize: '13px',
              padding: '11px 22px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.35)',
              transition: 'transform 0.2s'
            }}
          >
            <Flame size={14} fill="#000" />
            <span>GET THE KIT — ₹499</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'inline-flex',
              background: 'transparent',
              color: '#cbd5e1',
              padding: '6px'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0d1117',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <a
            href="#curriculum"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '15px', fontWeight: 700, color: '#cbd5e1' }}
          >
            What You Get (Toolkit Inclusions)
          </a>
          <a
            href="#preview"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '15px', fontWeight: 700, color: '#cbd5e1' }}
          >
            Live Prompts & Reel Hooks Test Drive
          </a>
          <a
            href="#bonuses"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '15px', fontWeight: 700, color: '#cbd5e1' }}
          >
            4 Fast-Action Bonuses (₹6,999 Value)
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '15px', fontWeight: 700, color: '#cbd5e1' }}
          >
            Client Reviews & Proof
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '15px', fontWeight: 700, color: '#cbd5e1' }}
          >
            Get Kit (₹499 Only)
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '15px', fontWeight: 700, color: '#cbd5e1' }}
          >
            FAQ
          </a>
          <div style={{ display: 'flex', gap: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Link
              href="/sample"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 700
              }}
            >
              Prompts Vault
            </Link>
            <Link
              href="/checkout?plan=starter"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '12px',
                borderRadius: '8px',
                background: '#f59e0b',
                color: '#000',
                fontSize: '13px',
                fontWeight: 800
              }}
            >
              BUY NOW — ₹499
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-sample-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
