import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured, memoryOrders, CustomerOrder } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      city,
      planId,
      planName,
      amount,
      orderId,
      licenseKey,
      accessCode,
      codeExpiresAt,
      paymentMethod,
    } = body;

    if (!customerName || !customerEmail || !orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing required customer order fields' },
        { status: 400 }
      );
    }

    // Generate a 10-minute expiring secure access code if not provided
    const generatedAccessCode = (accessCode || `BDH-${Math.floor(100000 + Math.random() * 900000)}`).toUpperCase();
    const expiresAt = codeExpiresAt || new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const newOrder: CustomerOrder = {
      customer_name: customerName.trim(),
      customer_email: customerEmail.trim().toLowerCase(),
      customer_phone: customerPhone?.trim() || '',
      city: city?.trim() || 'India',
      plan_id: planId || 'ai-growth-kit',
      plan_name: planName || 'AI + Instagram Marketing System',
      amount: Number(amount) || 499,
      order_id: String(orderId),
      license_key: licenseKey || `AIGROWTH-${Date.now()}`,
      access_code: generatedAccessCode,
      code_expires_at: expiresAt,
      code_used: false,
      download_count: 0,
      payment_method: paymentMethod || 'Direct Dynamic UPI QR',
      status: 'completed',
      created_at: new Date().toISOString(),
    };

    // 1. If Supabase is connected, write to Supabase orders table
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from('orders')
          .insert([newOrder])
          .select()
          .single();

        if (error) {
          console.error('Supabase Insert Error:', error.message);
          // Fall back to memory store so checkout flow is never blocked
          memoryOrders.unshift(newOrder);
          return NextResponse.json({
            success: true,
            source: 'memory_fallback',
            order: newOrder,
            warning: 'Failed to write to Supabase table, saved in memory',
          });
        }

        return NextResponse.json({
          success: true,
          source: 'supabase',
          order: data,
        });
      }
    }

    // 2. Otherwise save in fallback in-memory store
    memoryOrders.unshift(newOrder);
    return NextResponse.json({
      success: true,
      source: 'memory_fallback',
      order: newOrder,
      message: 'Order saved with 10-minute access code',
    });
  } catch (err: any) {
    console.error('Record Order API Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal error recording order' },
      { status: 500 }
    );
  }
}
