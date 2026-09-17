import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured, memoryOrders } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

function formatTimeAgo(isoString?: string): string {
  if (!isoString) return 'Just now';
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes <= 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export async function GET() {
  try {
    // 1. Try Supabase
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from('orders')
          .select('customer_name, city, plan_name, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          const formatted = data.map((item) => ({
            name: item.customer_name,
            city: item.city || 'India',
            action: 'claimed AI + Instagram Marketing Kit (₹499)',
            time: formatTimeAgo(item.created_at),
          }));

          return NextResponse.json({
            success: true,
            source: 'supabase',
            sales: formatted,
          });
        }
      }
    }

    // 2. Fallback to memory store
    const formattedMemory = memoryOrders.slice(0, 10).map((item) => ({
      name: item.customer_name,
      city: item.city || 'India',
      action: 'claimed AI + Instagram Marketing Kit (₹499)',
      time: formatTimeAgo(item.created_at),
    }));

    return NextResponse.json({
      success: true,
      source: 'memory_fallback',
      sales: formattedMemory,
    });
  } catch (err: any) {
    console.error('Recent Orders API Error:', err);
    return NextResponse.json(
      { success: false, sales: [] },
      { status: 500 }
    );
  }
}
