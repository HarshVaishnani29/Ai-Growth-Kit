'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRICING_PLANS } from '@/data/mockData';
import { PricingPlan } from '@/types';
import { UpiQrPayment } from '@/components/UpiQrPayment';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Download,
  CreditCard,
  QrCode,
  Key,
  Bot,
  Unlock,
  Clock,
  Copy,
  Check,
  AlertTriangle
} from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [orderBump, setOrderBump] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [paymentMode, setPaymentMode] = useState<'upi_qr' | 'razorpay'>('upi_qr');
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedPasscode, setCopiedPasscode] = useState(false);
  const [completedDetails, setCompletedDetails] = useState<{
    orderId: string;
    licenseKey: string;
    paymentMethod: string;
    amount: number;
    accessCode: string;
    codeExpiresAt: string;
  } | null>(null);

  const selectedPlan: PricingPlan = PRICING_PLANS[0];

  const orderBumpPrice = orderBump ? 99 : 0;
  const subtotal = selectedPlan.currentPrice + orderBumpPrice;
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'VIP50' || code === 'LAUNCH50') {
      setAppliedDiscount(50);
      setPromoSuccess('50% VIP Launch Discount Applied!');
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    } else if (code === 'GROWTH20' || code === 'SAVE20') {
      setAppliedDiscount(20);
      setPromoSuccess('20% Creator Partner Discount Applied!');
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    } else {
      setPromoError('Invalid coupon code. Try VIP50 or GROWTH20.');
    }
  };

  // Helper to load external Razorpay checkout.js script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Razorpay Payment flow
  const handleRazorpayPayment = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('Please enter your full name, email address, and WhatsApp number.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on server
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotal,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          customerEmail: email,
          customerPhone: phone,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize order');
      }

      // 2. Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Check your internet connection.');
      }

      // 3. Configure Razorpay modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'AI Business Growth Kit',
        description: `Access to ${selectedPlan.name}`,
        order_id: orderData.orderId.startsWith('order_sim_') ? undefined : orderData.orderId,
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#f59e0b',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async (response: any) => {
          // 4. Verify payment on server
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || orderData.orderId,
                razorpay_payment_id: response.razorpay_payment_id || `pay_sim_${Date.now()}`,
                razorpay_signature: response.razorpay_signature || 'demo_signature',
                planId: selectedPlan.id,
                customerEmail: email,
                isDemo: orderData.isDemo,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setCompletedDetails({
                orderId: verifyData.orderId || orderData.orderId,
                licenseKey: verifyData.licenseKey,
                paymentMethod: 'Razorpay Gateway',
                amount: finalTotal,
                accessCode: `BDH-${Math.floor(100000 + Math.random() * 900000)}`,
                codeExpiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
              });
              setIsCompleted(true);
              confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            } else {
              alert(verifyData.error || 'Payment verification failed');
            }
          } catch (err: any) {
            console.error('Verification error:', err);
            alert('Verification error: ' + err.message);
          } finally {
            setLoading(false);
          }
        },
      };

      // If in demo mode without live keys, allow instant simulated completion
      if (orderData.isDemo) {
        setTimeout(async () => {
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: `pay_sim_${Date.now()}`,
              razorpay_signature: 'demo_signature',
              planId: selectedPlan.id,
              customerEmail: email,
              isDemo: true,
            }),
          });
          const verifyData = await verifyRes.json();
          setCompletedDetails({
            orderId: orderData.orderId,
            licenseKey: verifyData.licenseKey,
            paymentMethod: 'Razorpay (Test / Demo Mode)',
            amount: finalTotal,
            accessCode: `BDH-${Math.floor(100000 + Math.random() * 900000)}`,
            codeExpiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
          });
          setIsCompleted(true);
          setLoading(false);
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        }, 1200);
        return;
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        alert('Payment Failed: ' + response.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (error: any) {
      console.error('Payment Error:', error);
      alert(error.message || 'Payment initiation failed.');
      setLoading(false);
    }
  };

  // Handler for successful UPI payment from UpiQrPayment component
  const handleUpiSuccess = (receipt: {
    method: 'upi_qr' | 'upi_utr';
    licenseKey: string;
    orderId: string;
    amount: number;
  }) => {
    // Generate unique 10-minute expiring access passcode
    const accessCode = `BDH-${Math.floor(100000 + Math.random() * 900000)}`;
    const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    setCompletedDetails({
      orderId: receipt.orderId,
      licenseKey: receipt.licenseKey,
      paymentMethod: receipt.method === 'upi_qr' ? 'Direct Dynamic UPI QR' : 'UPI UTR Bank Reference',
      amount: receipt.amount,
      accessCode,
      codeExpiresAt,
    });
    setIsCompleted(true);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });

    // Record verified order in Supabase database with access code
    fetch('/api/orders/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: name.trim() || 'Valued Customer',
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        city: city.trim() || 'India',
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: receipt.amount,
        orderId: receipt.orderId,
        licenseKey: receipt.licenseKey,
        accessCode,
        codeExpiresAt,
        paymentMethod: receipt.method === 'upi_qr' ? 'Direct Dynamic UPI QR' : 'UPI UTR Bank Reference',
      }),
    }).catch((err) => console.error('Order recording error:', err));

    // Also broadcast to local sales toast for instant client-side celebration
    if (typeof window !== 'undefined') {
      const newSale = {
        name: name.trim() || 'Valued Customer',
        city: city.trim() || 'India',
        action: 'claimed AI + Instagram Marketing Kit (₹499)',
        time: 'Just now',
      };
      try {
        const existing = JSON.parse(localStorage.getItem('bdh_local_purchases') || '[]');
        localStorage.setItem('bdh_local_purchases', JSON.stringify([newSale, ...existing.slice(0, 10)]));
        window.dispatchEvent(new CustomEvent('bdh_new_purchase', { detail: newSale }));
      } catch (e) {
        console.error('LocalStorage broadcast error:', e);
      }
    }
  };

  return (
    <div className="section-spacing" style={{ paddingTop: '40px', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1120px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#94a3b8',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '36px',
          alignItems: 'start'
        }} className="checkout-grid">
          {/* Left Column: Details & Payment Mode */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Customer Details Box */}
            <div className="glass-card" style={{ padding: '32px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="section-badge">
                <Lock size={12} />
                <span>STEP 1: CUSTOMER & ORDER DETAILS</span>
              </div>

              <h1 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px' }}>
                Order & Billing Details
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
                Your Google Drive links and instant download access will be delivered to this email.
              </p>

              {/* Plan Highlight Card */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '22px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bot size={16} color="#fbbf24" />
                    <span style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>
                      AI + Instagram Marketing System
                    </span>
                    <span style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      color: '#f87171',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}>
                      90% OFF
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>
                    100 Prompts + 100 Hooks + 30-Day Calendar + Canva + WhatsApp Scripts + 4 Bonuses
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through' }}>
                    ₹4,999
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>
                    ₹499
                  </div>
                </div>
              </div>

              {/* Contact Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhavik Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#090d14',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="bhavik@gmail.com (Drive Link will be sent here)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#090d14',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    WHATSAPP NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#090d14',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    CITY / STATE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ahmedabad, Gujarat or Surat, Gujarat"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#090d14',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Order Bump Checkbox */}
              <div
                onClick={() => setOrderBump(!orderBump)}
                style={{
                  background: orderBump ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: orderBump ? '2px solid #f59e0b' : '1px dashed rgba(245, 158, 11, 0.4)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="checkbox"
                  checked={orderBump}
                  onChange={() => {}}
                  style={{ width: '18px', height: '18px', marginTop: '3px', accentColor: '#f59e0b', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 6px', borderRadius: '4px' }}>
                      VIP ADD-ON (+₹99)
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
                      50+ Premium Indian Story Selling & Festive Prompts (+₹99)
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '3px', lineHeight: 1.5 }}>
                    Exclusive high-converting festive scripts to drive 3x orders during Diwali, festive seasons, and wedding rushes.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Direct UPI QR Payment (Razorpay temporarily paused) */}
            <div className="glass-card" style={{ padding: '32px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="section-badge">
                <ShieldCheck size={12} />
                <span>STEP 2: DIRECT UPI QR PAYMENT</span>
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '6px' }}>
                Instant UPI QR Checkout
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>
                Scan with GPay, PhonePe, Paytm, CRED or any UPI app for instant access with 0% payment gateway surcharge.
              </p>

              {/* Maintenance Notice for Razorpay */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                color: '#94a3b8'
              }}>
                <ShieldCheck size={14} color="#10b981" />
                <span>Direct UPI Gateway is active. (Card / NetBanking via Razorpay is temporarily paused for maintenance).</span>
              </div>

              {/* Render UPI QR Payment */}
              <UpiQrPayment
                amount={finalTotal}
                planId={selectedPlan.id}
                planName={selectedPlan.name}
                customerName={name}
                customerEmail={email}
                customerPhone={phone}
                onPaymentSuccess={handleUpiSuccess}
              />
            </div>
          </div>

          {/* Right Column: Order Summary Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '28px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                ORDER SUMMARY
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {selectedPlan.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '18px' }}>
                Lifetime Access • Instant Digital Delivery
              </p>

              {/* Promo Code Box */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Coupon: VIP50"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      flex: 1,
                      background: '#090d14',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '12px',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && <div style={{ fontSize: '11px', color: '#34d399', marginTop: '6px', fontWeight: 700 }}>✓ {promoSuccess}</div>}
                {promoError && <div style={{ fontSize: '11px', color: '#f87171', marginTop: '6px' }}>{promoError}</div>}
              </div>

              {/* Subtotals */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>{selectedPlan.name}</span>
                  <span>₹{selectedPlan.currentPrice}</span>
                </div>

                {orderBump && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                    <span>Storytelling VIP Pack</span>
                    <span>+₹99</span>
                  </div>
                )}

                {appliedDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontWeight: 700 }}>
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
              </div>

              {/* Final Total */}
              <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>Total Amount (One-Time)</span>
                <span style={{ fontSize: '28px', fontWeight: 900, color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Features Included in Plan */}
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '10px', padding: '14px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  What You Get In This Order:
                </div>
                {selectedPlan.features.slice(0, 6).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
                    <CheckCircle2 size={13} color="#10b981" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Seal */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '16px',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <ShieldCheck size={26} color="#34d399" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                  100% Instant Delivery Guarantee
                </div>
                <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>
                  Google Drive links and download credentials will be sent directly to your email right after payment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Completion Modal */}
      {isCompleted && completedDetails && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(14px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#0d131f',
            border: '2px solid #10b981',
            borderRadius: '24px',
            maxWidth: '540px',
            width: '100%',
            padding: '36px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto'
            }}>
              <Sparkles size={32} />
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>
              Payment Verified & Access Unlocked!
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, marginBottom: '22px' }}>
              Your license for <b>{selectedPlan.name}</b> is now active. All 100 Prompts, 100 Hooks, Calendar, and Canva template links have also been sent to <b>{email || 'your email'}</b>.
            </p>

            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '18px',
              textAlign: 'left',
              fontSize: '12px'
            }}>
              <div style={{ color: '#94a3b8' }}>Transaction / Order ID: <b style={{ color: '#fbbf24' }}>{completedDetails.orderId}</b></div>
              <div style={{ color: '#94a3b8', marginTop: '4px' }}>Payment Method: <b style={{ color: '#34d399' }}>{completedDetails.paymentMethod}</b></div>
              <div style={{ color: '#94a3b8', marginTop: '4px' }}>Amount Paid: <b style={{ color: '#fff' }}>₹{completedDetails.amount.toLocaleString('en-IN')}</b></div>
              <div style={{ color: '#94a3b8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Key size={12} color="#fbbf24" />
                <span>Issued License Key: <b style={{ color: '#fbbf24' }}>{completedDetails.licenseKey}</b></span>
              </div>
            </div>

            {/* 10-Minute Expiring Passcode Security Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%)',
              border: '2px solid rgba(245, 158, 11, 0.45)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#f87171',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                marginBottom: '10px'
              }}>
                <Clock size={12} />
                <span>EXPIRES IN 10 MINUTES • SINGLE-USE</span>
              </div>

              <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
                Your One-Time Security Access Passcode:
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#090d14',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                padding: '10px 16px',
                maxWidth: '300px',
                margin: '0 auto 10px auto'
              }}>
                <code style={{ fontSize: '20px', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.12em', fontFamily: 'monospace' }}>
                  {completedDetails.accessCode}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(completedDetails.accessCode);
                    setCopiedPasscode(true);
                    setTimeout(() => setCopiedPasscode(false), 2000);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {copiedPasscode ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  <span>{copiedPasscode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5, maxWidth: '440px', margin: '0 auto' }}>
                🔒 <b>Anti-Piracy Notice:</b> This passcode is locked to your purchase and permanently expires in 10 minutes to prevent unauthorized file sharing or reselling. Redeem below immediately.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Primary Action: Direct Unlock Vault Button */}
              <Link
                href={`/access?code=${completedDetails.accessCode}&email=${encodeURIComponent(email)}`}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#000000',
                  fontSize: '15px',
                  fontWeight: 900,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(245, 158, 11, 0.45)',
                  transition: 'all 0.2s',
                  letterSpacing: '-0.01em'
                }}
              >
                <Unlock size={20} />
                <span>Unlock & Access Download Vault Now</span>
              </Link>

              {/* Direct Download Backup */}
              <a
                href="/api/access/download?asset=all"
                download="AI_Business_Growth_Kit_Master_Bundle.zip"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
              >
                <Download size={15} />
                <span>Direct Download Backup (.ZIP)</span>
              </a>

              <Link
                href="/"
                style={{
                  color: '#94a3b8',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginTop: '8px'
                }}
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontSize: '15px' }}>
        Loading Secure Checkout & Payment Gateway...
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
