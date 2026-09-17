import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      customerEmail,
      isDemo
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // In demo mode or if keys are placeholders
    if (isDemo || !keySecret || keySecret.includes('placeholder')) {
      return NextResponse.json({
        success: true,
        verified: true,
        licenseKey: `BDH-LIC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        downloadToken: `dl_token_${Math.random().toString(36).substring(2, 15)}`,
        orderId: razorpay_order_id || `sim_${Date.now()}`,
        paymentId: razorpay_payment_id || `pay_sim_${Date.now()}`,
        message: 'Payment verified successfully (Demo Sandbox Mode)',
      });
    }

    // Live Signature Verification
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature. Verification failed.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      licenseKey: `BDH-LIC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      downloadToken: `dl_token_${Math.random().toString(36).substring(2, 15)}`,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      customerEmail,
      message: 'Payment verified and authenticated successfully with Razorpay',
    });
  } catch (error: any) {
    console.error('Razorpay Verify Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
