'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  QrCode,
  Copy,
  Check,
  Clock,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Download,
  Maximize2,
  X
} from 'lucide-react';

interface UpiQrPaymentProps {
  amount: number;
  planId: string;
  planName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onPaymentSuccess: (receipt: {
    method: 'upi_qr' | 'upi_utr';
    licenseKey: string;
    orderId: string;
    amount: number;
  }) => void;
}

export const UpiQrPayment: React.FC<UpiQrPaymentProps> = ({
  amount,
  planId,
  planName,
  customerName,
  customerEmail,
  customerPhone,
  onPaymentSuccess,
}) => {
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || 'fenilmathukiya@okicici';
  const upiName = process.env.NEXT_PUBLIC_UPI_NAME || 'Fenil Mathukiya';

  const [upiIntentUri, setUpiIntentUri] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes
  const [utrInput, setUtrInput] = useState('');
  const [utrError, setUtrError] = useState('');
  const [isVerifyingUtr, setIsVerifyingUtr] = useState(false);
  const [pollStatus, setPollStatus] = useState<'waiting' | 'detected' | 'verifying' | 'confirmed'>('waiting');
  const [isEnlarged, setIsEnlarged] = useState(false);

  // Build standard UPI Intent URL for mobile 1-click payment apps
  useEffect(() => {
    const transactionNote = `AIGROWTH-${planId.toUpperCase()}-${Date.now().toString().slice(-6)}`;
    const uri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    setUpiIntentUri(uri);
    setSecondsRemaining(600);
  }, [amount, planId, upiId, upiName]);

  // 10-minute expiry countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [amount]);

  // Copy helper
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(String(amount));
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  // UTR manual verification
  const handleVerifyUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    setUtrError('');

    const cleanUtr = utrInput.trim();
    if (!/^\d{12}$/.test(cleanUtr)) {
      setUtrError('Please enter a valid 12-digit Indian banking UTR reference number.');
      return;
    }

    setIsVerifyingUtr(true);
    try {
      const res = await fetch('/api/upi/verify-utr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          utrNumber: cleanUtr,
          amount,
          planId,
          customerEmail,
          customerPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to verify UTR');
      }

      onPaymentSuccess({
        method: 'upi_utr',
        licenseKey: data.licenseKey,
        orderId: data.receiptNumber,
        amount,
      });
    } catch (err: any) {
      setUtrError(err.message || 'Verification failed. Please try again or contact support.');
    } finally {
      setIsVerifyingUtr(false);
    }
  };

  // Simulate Instant UPI payment (for testing and demo)
  const handleSimulatePayment = () => {
    setPollStatus('detected');
    setTimeout(() => {
      setPollStatus('verifying');
      setTimeout(() => {
        setPollStatus('confirmed');
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        onPaymentSuccess({
          method: 'upi_qr',
          licenseKey: `BDH-UPI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
          orderId: `UPI-${Date.now()}`,
          amount,
        });
      }, 1000);
    }, 1000);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div style={{
      background: 'rgba(10, 14, 22, 0.95)',
      border: '1px solid rgba(245, 158, 11, 0.35)',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '18px',
        marginBottom: '22px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24'
          }}>
            <QrCode size={20} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc' }}>
              Direct UPI QR Payment
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              Zero Surcharge • Instant delivery with GPay, PhonePe, Paytm, CRED or any UPI app
            </div>
          </div>
        </div>

        {/* Expiry Timer Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: secondsRemaining > 60 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${secondsRemaining > 60 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: 800,
          color: secondsRemaining > 60 ? '#fbbf24' : '#f87171'
        }}>
          <Clock size={14} />
          <span>Session: {formatTimer(secondsRemaining)}</span>
        </div>
      </div>

      {/* Main QR Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '28px',
        alignItems: 'start',
        marginBottom: '26px'
      }} className="qr-grid">
        {/* User's Authentic QR Card Box */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          width: '250px',
          margin: '0 auto',
          border: '2px solid rgba(245, 158, 11, 0.4)'
        }}>
          {/* User's QR Code Image */}
          <img
            src="/images/upiqrcode.png"
            alt="UPI QR Code - Fenil Mathukiya"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              display: 'block'
            }}
          />

          {/* Amount Badge */}
          <div style={{
            marginTop: '10px',
            width: '100%',
            background: 'linear-gradient(135deg, #11151e 0%, #1a2233 100%)',
            borderRadius: '8px',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
              Pay Exact Amount
            </span>
            <span style={{ fontSize: '16px', fontWeight: 900, color: '#fbbf24' }}>
              ₹{amount.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Action Row: Save QR & Zoom */}
          <div style={{
            display: 'flex',
            gap: '8px',
            width: '100%',
            marginTop: '8px'
          }}>
            <a
              href="/images/upiqrcode.png"
              download="UPI_QR_Code_Fenil.png"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                background: '#f1f5f9',
                color: '#1e293b',
                padding: '6px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background 0.2s'
              }}
              title="Download QR to scan from gallery"
            >
              <Download size={12} />
              <span>Save QR</span>
            </a>
            <button
              type="button"
              onClick={() => setIsEnlarged(true)}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                background: '#f1f5f9',
                color: '#1e293b',
                padding: '6px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              title="Click to enlarge QR code"
            >
              <Maximize2 size={12} />
              <span>Zoom</span>
            </button>
          </div>
        </div>

        {/* QR Instructions and Quick Actions */}
        <div>
          {/* UPI ID Row */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
              Official UPI VPA (Tap to copy):
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <div>
                <code style={{ fontSize: '13px', fontWeight: 800, color: '#fbbf24' }}>
                  {upiId}
                </code>
                <div style={{ fontSize: '10px', color: '#64748b' }}>
                  Payee: {upiName}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                {copiedUpi ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
              </button>
            </div>
          </div>

          {/* Amount to Pay Row */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
              Exact Total Amount:
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <span style={{ fontSize: '15px', fontWeight: 900, color: '#34d399' }}>
                ₹{amount.toLocaleString('en-IN')}
              </span>
              <button
                type="button"
                onClick={handleCopyAmount}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                {copiedAmount ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedAmount ? 'Copied' : 'Copy Amount'}</span>
              </button>
            </div>
          </div>

          {/* 1-Click Mobile UPI App Launchers */}
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
              On mobile? Pay directly via your installed app:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <a
                href={upiIntentUri}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 8px',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Smartphone size={14} color="#fbbf24" />
                <span>Open GPay / PhonePe</span>
              </a>

              <a
                href={upiIntentUri}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 8px',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Smartphone size={14} color="#34d399" />
                <span>Paytm / CRED UPI</span>
              </a>
            </div>
          </div>

          {/* Polling / Status Banner */}
          <div style={{
            marginTop: '16px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981',
              flexShrink: 0
            }} />
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
              {pollStatus === 'waiting' && 'Scan QR code or use the mobile app button. After paying, submit your 12-digit UTR below.'}
              {pollStatus === 'detected' && 'Payment scan detected! Confirming transaction...'}
              {pollStatus === 'verifying' && 'Verifying banking settlement...'}
              {pollStatus === 'confirmed' && 'Payment verified successfully! Redirecting...'}
            </div>
          </div>
        </div>
      </div>

      {/* Manual 12-Digit UTR Fallback Submission */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '20px',
        marginTop: '10px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.08em' }}>
            ENTER 12-DIGIT BANK UTR / UPI REF NUMBER
          </label>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            {utrInput.length}/12 Digits
          </span>
        </div>

        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
          After paying via GPay, PhonePe, Paytm, or CRED, copy the <b>12-digit UPI Ref / UTR number</b> from your payment receipt to instantly unlock your toolkit:
        </p>

        <form onSubmit={handleVerifyUtr} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            maxLength={12}
            placeholder="e.g. 423985123456"
            value={utrInput}
            onChange={(e) => setUtrInput(e.target.value.replace(/\D/g, ''))}
            style={{
              flex: 1,
              background: '#090d14',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '11px 14px',
              color: '#fff',
              fontSize: '14px',
              letterSpacing: '0.08em',
              fontFamily: 'monospace',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isVerifyingUtr || utrInput.length !== 12}
            style={{
              background: utrInput.length === 12 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'rgba(255, 255, 255, 0.08)',
              color: utrInput.length === 12 ? '#000' : '#64748b',
              fontWeight: 800,
              fontSize: '12px',
              padding: '11px 20px',
              borderRadius: '8px',
              cursor: utrInput.length === 12 ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {isVerifyingUtr ? 'Verifying...' : 'Verify UTR & Unlock'}
          </button>
        </form>

        {utrError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#f87171', marginTop: '8px' }}>
            <AlertCircle size={14} />
            <span>{utrError}</span>
          </div>
        )}


        {/* Testing / Demo Quick Action for Store Owner */}
        <div style={{
          marginTop: '18px',
          padding: '10px 14px',
          background: 'rgba(245, 158, 11, 0.06)',
          border: '1px dashed rgba(245, 158, 11, 0.3)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#fbbf24" />
            <span style={{ fontSize: '11px', color: '#cbd5e1' }}>
              Developer & Admin Sandbox Mode:
            </span>
          </div>

          <button
            type="button"
            onClick={handleSimulatePayment}
            style={{
              background: '#f59e0b',
              color: '#000',
              fontWeight: 800,
              fontSize: '11px',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            ⚡ Simulate Instant UPI Success
          </button>
        </div>
      </div>

      {/* Enlarged QR Modal */}
      {isEnlarged && (
        <div
          onClick={() => setIsEnlarged(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '20px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsEnlarged(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0f172a'
              }}
            >
              <X size={18} />
            </button>
            <img
              src="/images/upiqrcode.png"
              alt="UPI QR Fullscreen - Fenil Mathukiya"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                display: 'block'
              }}
            />
            <div style={{ marginTop: '14px', fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
              Pay ₹{amount.toLocaleString('en-IN')} to {upiId}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Scan directly from any UPI banking app
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 600px) {
          .qr-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
