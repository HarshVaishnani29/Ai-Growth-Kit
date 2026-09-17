'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROMPT_SAMPLES } from '@/data/mockData';
import { PromptSample } from '@/types';
import {
  Search,
  Filter,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  Bot,
  Lock,
  Flame,
  Palette,
  ArrowRight
} from 'lucide-react';

export default function SampleExplorerPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(PROMPT_SAMPLES.map(p => p.category)));
  }, []);

  const filtered = useMemo(() => {
    return PROMPT_SAMPLES.filter(p => {
      const matchQ = !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.hook.toLowerCase().includes(query.toLowerCase()) ||
        p.promptSnippet.toLowerCase().includes(query.toLowerCase()) ||
        p.idealFor.toLowerCase().includes(query.toLowerCase());

      const matchC = !selectedCategory || p.category === selectedCategory;
      return matchQ && matchC;
    });
  }, [query, selectedCategory]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="section-spacing" style={{ paddingTop: '48px', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb & Navigation */}
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

        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
          <div>
            <div className="section-badge">
              <Sparkles size={14} />
              <span>LIVE PROMPT & REEL HOOK VAULT</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900 }}>
              AI Prompts & Hooks <span className="gradient-text-gold">Explorer</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '15px', marginTop: '6px', maxWidth: '680px' }}>
              Explore sample templates from our 100 ChatGPT Prompts and 100 Reel Hooks vault below. Click any prompt to copy and test drive directly in ChatGPT.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              href="/checkout?plan=starter"
              className="btn-primary"
              style={{ fontSize: '13px', padding: '12px 24px' }}
            >
              <Flame size={15} fill="#000" />
              <span>Unlock 100 Prompts & 100 Hooks (₹499)</span>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', background: '#0a0d14', borderRadius: '10px', padding: '0 14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search by topic, business niche, hook keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '12px 10px', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ background: '#0a0d14', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="">All Categories ({categories.length})</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#94a3b8' }}>
              Showing <b>{filtered.length}</b> sample templates
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          marginBottom: '40px'
        }} className="prompts-grid">
          {filtered.map(p => (
            <div
              key={p.id}
              className="border-beam-card"
              style={{
                padding: '28px',
                background: 'rgba(12, 16, 26, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#fbbf24',
                    background: 'rgba(245, 158, 11, 0.15)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {p.category}
                  </span>

                  <button
                    onClick={() => handleCopy(p.id, `${p.hook}\n\n${p.promptSnippet}`)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedId === p.id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{copiedId === p.id ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
                  {p.title}
                </h3>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                    First 3-Sec Reel Hook:
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fbbf24', marginTop: '4px', lineHeight: 1.4 }}>
                    {p.hook}
                  </div>
                </div>

                <div style={{
                  background: '#06090e',
                  borderRadius: '10px',
                  padding: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#cbd5e1',
                  lineHeight: 1.6,
                  marginBottom: '16px'
                }}>
                  <span style={{ color: '#34d399', fontWeight: 800 }}>[Prompt]: </span>
                  {p.promptSnippet}
                </div>
              </div>

              <div style={{
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '12px',
                color: '#94a3b8'
              }}>
                <div>Ideal For: <b style={{ color: '#fff' }}>{p.idealFor}</b></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60a5fa' }}>
                  <Palette size={13} />
                  <span>{p.canvaTemplate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '20px',
          padding: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: '#fbbf24', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Lock size={13} /> WANT THE COMPLETE 100 PROMPTS & 100 HOOKS VAULT?
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>
              Get 30 Days of Business Content for Just ₹499
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '6px', maxWidth: '650px' }}>
              Get instant lifetime access to 100 ChatGPT Prompts, 100 Viral Reel Hooks, 30-Day Content Calendar, Canva Workflows, and 15 WhatsApp Sales Closing Scripts.
            </p>
          </div>

          <Link href="/checkout?plan=starter" className="btn-primary" style={{ padding: '16px 36px', fontSize: '15px' }}>
            <Flame size={16} fill="#000" />
            <span>BUY NOW — ₹499</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .prompts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
