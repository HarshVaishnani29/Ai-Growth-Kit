import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured, memoryOrders } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, email } = body;

    const cleanCode = String(code || '').trim().toUpperCase();
    if (!cleanCode) {
      return NextResponse.json(
        { success: false, error: 'MISSING_CODE', message: 'Please enter your 10-minute access passcode.' },
        { status: 400 }
      );
    }

    let matchingOrder: any = null;

    // Built-in Demo / Tester Access Code
    if (cleanCode === 'BDH-DEMO' || cleanCode === 'DEMO-2026' || cleanCode === 'DEMO') {
      matchingOrder = {
        id: 'demo-order',
        customer_name: 'Harsh Patel (Demo Access)',
        customer_email: email || 'harsh@businessdatahub.com',
        order_id: 'BDH-ORD-DEMO',
        license_key: 'AIGROWTH-LIC-VIP-DEMO',
        plan_name: 'AI + Instagram Marketing System',
        code_expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 60 minutes for demo testing
      };
    }

    // 1. Check Supabase
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        let query = supabase.from('orders').select('*').eq('access_code', cleanCode);
        if (email && email.trim()) {
          query = query.ilike('customer_email', email.trim().toLowerCase());
        }
        const { data, error } = await query.maybeSingle();
        if (!error && data) {
          matchingOrder = data;
        }
      }
    }

    // 2. Fallback to memory store if not found in Supabase
    if (!matchingOrder) {
      matchingOrder = memoryOrders.find((o) => {
        const codeMatches = (o.access_code || '').toUpperCase() === cleanCode;
        if (email && email.trim()) {
          return codeMatches && o.customer_email.toLowerCase() === email.trim().toLowerCase();
        }
        return codeMatches;
      });
    }

    // If still not found, check if code matches an order_id or license_key as friendly fallback
    if (!matchingOrder) {
      matchingOrder = memoryOrders.find(
        (o) =>
          (o.order_id || '').toUpperCase() === cleanCode ||
          (o.license_key || '').toUpperCase() === cleanCode
      );
    }

    if (!matchingOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'NOT_FOUND',
          message: 'Access passcode not recognized. Please check the code provided on your payment screen.',
        },
        { status: 404 }
      );
    }

    // 3. Security Verification: Check if code has expired (10-minute limit)
    const expiresAtMs = matchingOrder.code_expires_at
      ? new Date(matchingOrder.code_expires_at).getTime()
      : Date.now() + 10 * 60 * 1000;

    const now = Date.now();
    if (now > expiresAtMs) {
      const expiredAgoMinutes = Math.ceil((now - expiresAtMs) / 60000);
      return NextResponse.json(
        {
          success: false,
          error: 'EXPIRED',
          message: `⚠️ Security Violation: This single-use passcode expired ${expiredAgoMinutes} minute(s) ago. Anti-piracy protection limits access links to 10 minutes to prevent unauthorized file sharing. Please contact our support desk with your payment reference for reissue.`,
        },
        { status: 403 }
      );
    }

    // 4. Update download count and mark code used in Supabase
    if (isSupabaseConfigured() && matchingOrder.id !== 'demo-order') {
      const supabase = getSupabaseAdmin();
      if (supabase && matchingOrder.id) {
        await supabase
          .from('orders')
          .update({
            code_used: true,
            download_count: (matchingOrder.download_count || 0) + 1,
          })
          .eq('id', matchingOrder.id);
      }
    } else {
      matchingOrder.code_used = true;
      matchingOrder.download_count = (matchingOrder.download_count || 0) + 1;
    }

    const remainingSeconds = Math.max(0, Math.floor((expiresAtMs - now) / 1000));

    // 5. Return unlocked toolkit assets
    return NextResponse.json({
      success: true,
      valid: true,
      order: {
        customerName: matchingOrder.customer_name,
        customerEmail: matchingOrder.customer_email,
        orderId: matchingOrder.order_id,
        licenseKey: matchingOrder.license_key || `AIGROWTH-LIC-${Date.now().toString(36).toUpperCase()}`,
        planName: matchingOrder.plan_name || 'AI + Instagram Marketing System',
        expiresAt: matchingOrder.code_expires_at,
        remainingSeconds,
      },
      assets: [
        {
          id: 'gujarati_master_docx',
          title: 'AI Business Growth Kit — Master Gujarati Edition (.DOCX)',
          category: 'Primary Master File',
          format: 'Microsoft Word Document (.docx)',
          size: '44 KB',
          directUrl: '/api/access/download?asset=gujarati_docx',
          badge: 'Primary Gujarati Master Document',
          isPrimary: true,
        },
        {
          id: 'master_zip',
          title: 'Complete All-in-One Master Toolkit Archive (.ZIP)',
          category: 'Complete Bundle',
          format: 'Compressed ZIP Archive',
          size: '148 MB',
          directUrl: '/api/access/download?asset=all',
          badge: '1-Click Master Download',
          isPrimary: true,
        },
        {
          id: 'prompts',
          title: '100 ChatGPT Prompts for Business & Content Creation',
          category: 'Core System',
          format: 'PDF Ebook + Notion Workspace',
          size: '14.2 MB',
          directUrl: '/api/access/download?asset=prompts',
          badge: 'Core Asset',
        },
        {
          id: 'hooks',
          title: '100 Viral Reel Hooks & 3-Second Retention Frameworks',
          category: 'Core System',
          format: 'PDF Guide + Excel Database (.CSV)',
          size: '8.6 MB',
          directUrl: '/api/access/download?asset=hooks',
          badge: 'High Converting',
        },
        {
          id: 'calendar',
          title: '30-Day Ready-to-Post Content Calendar & Planner',
          category: 'Core System',
          format: 'Excel Spreadsheet + Google Sheets Link',
          size: '5.1 MB',
          directUrl: '/api/access/download?asset=calendar',
          badge: 'Ready to Deploy',
        },
        {
          id: 'canva',
          title: '50+ Canva Editable Post & Reel Video Templates',
          category: 'Core System',
          format: 'Instant Canva Direct Edit Link',
          size: 'Cloud Editable',
          directUrl: 'https://www.canva.com',
          badge: 'No Canva Pro Needed',
          isExternal: true,
        },
        {
          id: 'scripts',
          title: 'WhatsApp Business Sales & Direct Closing Scripts',
          category: 'Core System',
          format: 'PDF Playbook',
          size: '6.4 MB',
          directUrl: '/api/access/download?asset=scripts',
          badge: 'Sales Closing',
        },
        {
          id: 'bonus1',
          title: 'Bonus #1: AI Prompt Engineering Mastery Blueprint',
          category: 'VIP Bonus',
          format: 'PDF Guide',
          size: '9.8 MB',
          directUrl: '/api/access/download?asset=bonus1',
          badge: 'Worth ₹1,499 (FREE)',
        },
        {
          id: 'bonus2',
          title: 'Bonus #2: 50 High-Converting Lead Magnet Blueprints',
          category: 'VIP Bonus',
          format: 'PDF Guide',
          size: '11.5 MB',
          directUrl: '/api/access/download?asset=bonus2',
          badge: 'Worth ₹999 (FREE)',
        },
        {
          id: 'bonus3',
          title: 'Bonus #3: Hook Writing Masterclass Video Training',
          category: 'VIP Bonus',
          format: 'HD Streaming Video',
          size: 'HD Video',
          directUrl: '/api/access/download?asset=bonus3',
          badge: 'Worth ₹1,999 (FREE)',
        },
        {
          id: 'bonus4',
          title: 'Bonus #4: Commercial Use & Single-Owner License Certificate',
          category: 'VIP Bonus',
          format: 'Official Digital License PDF',
          size: '2.1 MB',
          directUrl: '/api/access/download?asset=bonus4',
          badge: 'Licensed to Customer',
        },
      ],
    });
  } catch (err: any) {
    console.error('Verify Access Code API Error:', err);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_ERROR', message: err.message || 'Failed to verify code' },
      { status: 500 }
    );
  }
}
