import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Responsible Data Use Notice',
  description: 'Guidelines and legal compliance expectations for ethical outreach and B2B communication in India.',
  alternates: {
    canonical: '/legal/data-use',
  },
};

export default function DataUsePage() {
  return (
    <div className="section-spacing" style={{ paddingTop: '50px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Return to Home
        </Link>

        <div className="section-badge" style={{ background: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
          <ShieldAlert size={12} />
          <span>RESPONSIBLE USAGE NOTICE</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>
          Responsible Data Use Notice
        </h1>

        <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7, color: '#cbd5e1', fontSize: '14px' }}>
          <p>
            This system and its associated databases are compiled solely for lawful business research, B2B supplier discovery, market planning, and professional corporate outreach.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>Ethical Outreach Guidelines</h3>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>Provide a clear and immediate opt-out / unsubscribe mechanism in every email or WhatsApp communication.</li>
            <li>Honor all do-not-call (DNC) or opt-out requests immediately upon receipt.</li>
            <li>Identify your organization, representative identity, and genuine business purpose transparently.</li>
            <li>Never utilize automated bots or phone dialers to overwhelm individual contact points.</li>
          </ul>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>Compliance Responsibility</h3>
          <p>
            Buyers are solely responsible for ensuring that all outbound communication practices comply with the applicable laws of India, including the Information Technology Act 2000, the Digital Personal Data Protection Act (DPDP), and telecom regulations issued by TRAI.
          </p>
        </div>
      </div>
    </div>
  );
}
