-- ==============================================================================
-- Supabase Schema: BusinessDataHub AI Growth Kit Orders & Security Table
-- Copy & Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    city TEXT DEFAULT 'India',
    plan_id TEXT DEFAULT 'ai-growth-kit',
    plan_name TEXT DEFAULT 'AI + Instagram Marketing System',
    amount NUMERIC(10, 2) NOT NULL DEFAULT 499.00,
    order_id TEXT UNIQUE NOT NULL,
    license_key TEXT,
    access_code TEXT UNIQUE,
    code_expires_at TIMESTAMP WITH TIME ZONE,
    code_used BOOLEAN DEFAULT false,
    download_count INTEGER DEFAULT 0,
    payment_method TEXT DEFAULT 'Direct Dynamic UPI QR',
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast sorting of recent sales and fast lookup of 10-minute access codes
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_access_code ON public.orders(access_code);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public read of orders for displaying in live sales toast & code verification
CREATE POLICY "Allow public read for social proof and verification" 
ON public.orders 
FOR SELECT 
USING (true);

-- Policy 2: Allow checkout API to insert new verified orders
CREATE POLICY "Allow checkout insert" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Policy 3: Allow updating code_used and download_count
CREATE POLICY "Allow access code redemption" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Sample initial row (optional seed)
INSERT INTO public.orders (customer_name, customer_email, customer_phone, city, amount, order_id, license_key, access_code, code_expires_at)
VALUES 
('Preeti Shah', 'preeti.shah@example.com', '9876543210', 'Ahmedabad, Gujarat', 499.00, 'UPI-INIT-101', 'AIGROWTH-UPI-PREETI', 'BDH-784912', timezone('utc'::text, now()) + interval '10 minutes'),
('Bhavik Patel', 'bhavik.patel@example.com', '9876543211', 'Surat, Gujarat', 499.00, 'UPI-INIT-102', 'AIGROWTH-UPI-BHAVIK', 'BDH-918234', timezone('utc'::text, now()) + interval '10 minutes')
ON CONFLICT (order_id) DO NOTHING;
