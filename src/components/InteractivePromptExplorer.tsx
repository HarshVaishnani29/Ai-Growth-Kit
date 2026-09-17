'use client';

import React, { useState } from 'react';
import { PROMPT_SAMPLES } from '../data/mockData';
import { PromptSample } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Bot, Eye, Lock, ArrowRight, Play, Palette } from 'lucide-react';

export const InteractivePromptExplorer: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptSample>(PROMPT_SAMPLES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="preview" className="section-spacing" style={{
      position: 'relative',
      background: '#06080c',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      <div className="container">
        <div className="section-header-center">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>LIVE PROMPT & HOOK PREVIEW</span>
          </div>
          <h2>
            Take a Live Test Drive of Our{' '}
            <span className="gradient-text-gold">Ready Prompts & Hooks</span>
          </h2>
          <p>
            Explore sample templates from our vault of 100 ChatGPT Prompts and 100 Reel Hooks below. See how effortlessly high-converting content gets created in just 1 click.
          </p>
        </div>

        {/* Interactive Explorer Window */}
        <div className="border-beam-card" style={{
          padding: '32px',
          background: 'rgba(12, 16, 26, 0.85)',
          maxWidth: '1050px',
          margin: '0 auto'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '14px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {PROMPT_SAMPLES.map((item) => {
              const isSelected = item.id === selectedPrompt.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedPrompt(item)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '999px',
                    background: isSelected ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#000' : '#cbd5e1',
                    fontSize: '12px',
                    fontWeight: 800,
                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Bot size={14} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Prompt Showcase Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '32px',
            alignItems: 'stretch'
          }} className="prompt-split">
            {/* Left: Hook and Prompt Snippet */}
            <div style={{
              background: 'rgba(7, 10, 16, 0.9)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#fbbf24',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(245, 158, 11, 0.15)',
                    padding: '3px 10px',
                    borderRadius: '6px'
                  }}>
                    {selectedPrompt.category}
                  </span>

                  <button
                    onClick={() => handleCopy(`${selectedPrompt.hook}\n\n${selectedPrompt.promptSnippet}`)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
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
                    {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                  </button>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Reel 3-Second Viral Hook:
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', marginTop: '6px', lineHeight: 1.4 }}>
                    {selectedPrompt.hook}
                  </div>
                </div>

                <div style={{
                  background: '#040609',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#cbd5e1',
                  lineHeight: 1.6
                }}>
                  <span style={{ color: '#fbbf24', fontWeight: 800 }}>[ChatGPT Prompt]: </span>
                  {selectedPrompt.promptSnippet}
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#94a3b8'
              }}>
                <span>Ideal For: <b style={{ color: '#fff' }}>{selectedPrompt.idealFor}</b></span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>Canva Ready</span>
              </div>
            </div>

            {/* Right: Canva Design Link & Unlock Teaser */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(20, 27, 42, 0.8) 0%, rgba(10, 14, 22, 0.8) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(96, 165, 250, 0.15)',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Palette size={20} />
                </div>

                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Canva Design Layout
                </h4>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
                  A matching pre-made Canva template link is included directly with this prompt:
                </p>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#fbbf24',
                  marginBottom: '20px'
                }}>
                  ✦ {selectedPrompt.canvaTemplate}
                </div>
              </div>

              {/* Locked Vault Callout */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px dashed rgba(245, 158, 11, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: '#fbbf24', marginBottom: '6px' }}>
                  <Lock size={13} /> 100 Prompts & 100 Hooks Vault
                </div>
                <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '14px' }}>
                  To unlock the complete vault of 100 Prompts, Hooks, Calendar, and Sales Scripts:
                </p>
                <a href="#pricing" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>
                  <span>Get Complete Kit — ₹499</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .prompt-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
