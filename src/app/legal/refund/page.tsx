import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'Review our digital product refund policy, file integrity guarantee, and customer support procedure.',
  alternates: {
    canonical: '/legal/refund',
  },
};

export default function RefundPage() {
  return (
    <div className="section-spacing" style={{ paddingTop: '50px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Return to Home
        </Link>

        <div className="section-badge">
          <Shield size={12} />
          <span>REFUND TERMS</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>
          Refund & Cancellation Policy
        </h1>

        <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7, color: '#cbd5e1', fontSize: '14px' }}>
          <p>
            Due to the nature of digital goods and the immediate generation of downloadable Excel/CSV file links, all sales are considered final once digital download credentials have been issued.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>Pre-Purchase Verification</h3>
          <p>
            We provide a public interactive sample data explorer with authentic rows and schema definitions so that prospective buyers can thoroughly inspect format fidelity, column attributes, and categorization before purchasing.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>Corrupted Files or Access Issues</h3>
          <p>
            If you encounter technical issues accessing your digital download vault or if any file is corrupted, our engineering support team will re-issue uncorrupted archives within 24 business hours at support@businessdatahub.in.
          </p>
        </div>
      </div>
    </div>
  );
}
