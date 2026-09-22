import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how BusinessDataHub collects, protects, and manages customer information with 256-bit SSL encryption.',
  alternates: {
    canonical: '/legal/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="section-spacing" style={{ paddingTop: '50px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Return to Home
        </Link>

        <div className="section-badge">
          <Shield size={12} />
          <span>DATA PRIVACY</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>
          Privacy Policy
        </h1>

        <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7, color: '#cbd5e1', fontSize: '14px' }}>
          <p>
            BusinessDataHub values your privacy and is dedicated to handling customer data with the highest industry standards of transparency and encryption.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>1. Information Collected At Checkout</h3>
          <p>
            When purchasing a plan, we collect your full name, work email address, and phone number exclusively to issue your digital access keys, provide customer support, and communicate package updates. We do not sell your personal buyer information to third parties.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>2. Payment Security</h3>
          <p>
            All payment transactions are encrypted using 256-bit SSL protocols. We do not store sensitive credit card numbers or banking passwords on our web servers.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>3. Sourcing and B2B Contact Data</h3>
          <p>
            The commercial database consists of publicly verifiable business listings, registered corporate entities, and trade directories intended solely for legitimate business-to-business communications.
          </p>
        </div>
      </div>
    </div>
  );
}
