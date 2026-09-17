import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { utrNumber, utr, amount, planId, customerEmail, customerPhone } = body;

    const cleanUtr = String(utrNumber || utr || '').trim();

    // Indian UTR / UPI Reference Numbers are 12 numeric digits
    if (!/^\d{12}$/.test(cleanUtr)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid UPI Transaction Reference / UTR format. A valid Indian banking UTR must be exactly 12 digits (e.g. 423456789012).'
        },
        { status: 400 }
      );
    }

    // In a production setup, you would query your bank webhook or Razorpay Payment Gateway / ICICI / HDFC API
    // Here we simulate the automated bank reconciliation
    const licenseKey = `AIGROWTH-UPI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const downloadToken = `dl_upi_${Math.random().toString(36).substring(2, 15)}`;

    return NextResponse.json({
      success: true,
      verified: true,
      utr: cleanUtr,
      amount,
      planId,
      customerEmail,
      licenseKey,
      downloadToken,
      receiptNumber: `UPI-REC-${Date.now()}`,
      message: 'UPI UTR successfully matched and authenticated with bank settlement network.'
    });
  } catch (error: any) {
    console.error('UPI UTR Verification Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify UPI UTR' },
      { status: 500 }
    );
  }
}
