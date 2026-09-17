'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface SaleNotification {
  name: string;
  city: string;
  action: string;
  time: string;
  isLive?: boolean;
}

const DEFAULT_SALES: SaleNotification[] = [
  { name: 'Preeti Shah', city: 'Ahmedabad, Gujarat', action: 'downloaded 100 Reel Hooks & Prompts', time: '3m ago' },
  { name: 'Bhavik Patel', city: 'Surat, Gujarat', action: 'claimed AI + Instagram Marketing Kit (₹499)', time: '5m ago' },
  { name: 'Mehul Pandya', city: 'Vadodara, Gujarat', action: 'unlocked 30-Day Content Calendar', time: '8m ago' },
  { name: 'Hiren Doshi', city: 'Rajkot, Gujarat', action: 'accessed WhatsApp Sales Scripts', time: '12m ago' },
  { name: 'Krupa Trivedi', city: 'Bhavnagar, Gujarat', action: 'unlocked Complete AI Growth Toolkit', time: '16m ago' },
];

export const LiveSalesToast: React.FC = () => {
  const [sales, setSales] = useState<SaleNotification[]>(DEFAULT_SALES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Load real purchases from Supabase API and LocalStorage
  const loadRecentSales = useCallback(async () => {
    try {
      // 1. Check local purchases in this browser session
      let localPurchases: SaleNotification[] = [];
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('bdh_local_purchases');
          if (raw) {
            localPurchases = JSON.parse(raw);
          }
        } catch (e) {
          console.error(e);
        }
      }

      // 2. Fetch recent orders from Supabase via API
      const res = await fetch('/api/orders/recent', { cache: 'no-store' });
      const data = await res.json();

      let serverSales: SaleNotification[] = [];
      if (data && data.success && Array.isArray(data.sales) && data.sales.length > 0) {
        serverSales = data.sales;
      }

      // Merge: local purchases first, then server purchases from Supabase, then default mock fallback
      const combined = [...localPurchases, ...serverSales, ...DEFAULT_SALES];

      // Remove duplicates by name and city
      const seen = new Set<string>();
      const deduplicated = combined.filter((item) => {
        const key = `${item.name.toLowerCase()}_${item.city.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (deduplicated.length > 0) {
        setSales(deduplicated);
      }
    } catch (err) {
      console.error('Error loading recent sales for toast:', err);
    }
  }, []);

  useEffect(() => {
    loadRecentSales();

    // Listen for instant purchase events from checkout
    const handleNewPurchase = (e: any) => {
      if (e.detail) {
        const newSale: SaleNotification = {
          name: e.detail.name || 'New Customer',
          city: e.detail.city || 'India',
          action: 'claimed AI + Instagram Marketing Kit (₹499)',
          time: 'Just now',
          isLive: true,
        };
        setSales((prev) => [newSale, ...prev.filter((p) => p.name !== newSale.name)]);
        setCurrentIndex(0);
        setIsVisible(true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('bdh_new_purchase', handleNewPurchase);
    }

    // Initial delay before showing toast
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    // Rotate toast every 8 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % (sales.length || 1));
        setIsVisible(true);
      }, 1400);
    }, 8500);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('bdh_new_purchase', handleNewPurchase);
      }
    };
  }, [sales.length, loadRecentSales]);

  const current = sales[currentIndex] || DEFAULT_SALES[0];

  return (
    <div style={{
      position: 'fixed',
      bottom: '84px',
      left: '24px',
      zIndex: 120,
      pointerEvents: 'none'
    }}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(11, 15, 24, 0.94)',
              backdropFilter: 'blur(16px)',
              border: current.isLive ? '1px solid #10b981' : '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '16px',
              padding: '12px 18px',
              boxShadow: current.isLive
                ? '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(16, 185, 129, 0.25)'
                : '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '390px'
            }}
          >
            {/* Avatar Circle */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: current.isLive
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '15px',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              {current.name ? current.name.trim().charAt(0).toUpperCase() : 'C'}
            </div>

            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
                  {current.name}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  ({current.city || 'India'})
                </span>
                {current.isLive && (
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399',
                    fontSize: '9px',
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: '4px'
                  }}>
                    NEW BUYER
                  </span>
                )}
              </div>

              <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {current.action}
              </div>

              <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={11} color="#10b981" />
                <span>Verified Access • {current.time}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
