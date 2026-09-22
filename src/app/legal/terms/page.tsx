import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of service, license agreement, and usage terms for the AI Business Growth Kit.',
  alternates: {
    canonical: '/legal/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="section-spacing" style={{ paddingTop: '50px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Return to Home
        </Link>

        <div className="section-badge">
          <Shield size={12} />
          <span>LEGAL POLICY</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>
          Terms & Conditions
        </h1>

        <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7, color: '#cbd5e1', fontSize: '14px' }}>
          <p>
            Welcome to BusinessDataHub. By accessing this platform or purchasing any data packages or training systems, you acknowledge and agree to abide by the following terms.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>1. Nature of the Product</h3>
          <p>
            The purchased package grants a non-exclusive, non-transferable commercial license to access the specific structured business databases, educational outbound frameworks, and analytical tools detailed in the selected plan.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>2. Permitted Commercial Use</h3>
          <p>
            You agree to use this information strictly for legitimate commercial prospecting, market mapping, supplier identification, and direct B2B outreach in compliance with all relevant laws, including the Information Technology Act and applicable telecommunications regulations.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>3. Prohibited Conduct</h3>
          <p>
            You may not unlawfully redistribute, resell, republish, or publicize raw record databases onto public internet directories. Bulk automated phishing, unlawful harassment, spam, and fraudulent schemes are strictly prohibited and will result in immediate revocation of access rights.
          </p>

          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>4. Disclaimer of Revenue Guarantees</h3>
          <p>
            While our records are compiled from public registrations and verified industry directories, sales conversion depends on your offering, messaging, and sales execution. BusinessDataHub makes no warranties regarding guaranteed deal closing or commercial revenue.
          </p>
        </div>
      </div>
    </div>
  );
}
