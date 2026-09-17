import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// Client-side Supabase client (Singleton)
let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return clientInstance;
};

// Server-side admin client (with Service Role or Anon Key)
export const getSupabaseAdmin = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey);
};

export interface CustomerOrder {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  city?: string;
  plan_id?: string;
  plan_name?: string;
  amount: number;
  order_id: string;
  license_key?: string;
  access_code?: string;
  code_expires_at?: string;
  code_used?: boolean;
  download_count?: number;
  payment_method?: string;
  status?: string;
  created_at?: string;
}

// Global singleton store for when Supabase is not yet configured
// This ensures that new customer purchases immediately appear without errors
const globalForOrders = globalThis as unknown as {
  memoryOrders: CustomerOrder[] | undefined;
};

export const memoryOrders: CustomerOrder[] =
  globalForOrders.memoryOrders ??
  (globalForOrders.memoryOrders = [
    {
      customer_name: 'Preeti Shah',
      customer_email: 'preeti.shah@example.com',
      customer_phone: '9876543210',
      city: 'Ahmedabad, Gujarat',
      plan_name: 'AI + Instagram Marketing System',
      amount: 499,
      order_id: 'UPI-MOCK-101',
      license_key: 'AIGROWTH-UPI-PREETI',
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      customer_name: 'Bhavik Patel',
      customer_email: 'bhavik.patel@example.com',
      customer_phone: '9876543211',
      city: 'Surat, Gujarat',
      plan_name: 'AI + Instagram Marketing System',
      amount: 499,
      order_id: 'UPI-MOCK-102',
      license_key: 'AIGROWTH-UPI-BHAVIK',
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
  ]);
