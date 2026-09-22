'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

interface InteractivePostCardProps {
  imageSrc?: string;
  alt?: string;
}

export const InteractivePostCard: React.FC<InteractivePostCardProps> = ({
  imageSrc = '/images/post.jpeg',
  alt = 'AI Business Growth Kit - 30 Days Instagram Content System'
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    }
  }, []);

  // Track mouse coordinates over card for realistic 3D tilt & specular glare (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Subtle tilt range (-12deg to +12deg)
    const rX = (0.5 - y) * 14;
    const rY = (x - 0.5) * 14;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) {
      e.preventDefault();
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        perspective: '1200px',
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        margin: '0 auto'
      }}
    >
      {/* Ambient Halo Glow Behind Card */}
      <div
        className="butter-glow"
        style={{
          position: 'absolute',
          inset: '-20px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.32) 0%, rgba(236, 72, 153, 0.12) 45%, transparent 70%)',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: isHovered ? 'scale(1.12)' : 'scale(1)',
          opacity: isHovered ? 0.95 : 0.6,
          transition: 'transform 0.4s ease, opacity 0.4s ease'
        }}
      />

      {/* 3D Pop-up Container linking smoothly to #pricing */}
      <a
        href="#pricing"
        onClick={handleClick}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={!isHovered ? 'butter-float' : ''}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          borderRadius: '24px',
          padding: '3px',
          display: 'block',
          textDecoration: 'none',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.95) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(245, 158, 11, 0.85) 100%)'
            : 'linear-gradient(145deg, rgba(245, 158, 11, 0.55) 0%, rgba(255, 255, 255, 0.15) 35%, rgba(245, 158, 11, 0.35) 100%)',
          boxShadow: isHovered
            ? '0 35px 80px -10px rgba(0, 0, 0, 0.95), 0 0 65px rgba(245, 158, 11, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3)'
            : '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(245, 158, 11, 0.2)',
          transform: isHovered && !isTouchDevice
            ? `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03) translateY(-8px)`
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.3s ease, background 0.3s ease'
            : 'transform 0.5s ease, box-shadow 0.5s ease, background 0.5s ease',
          cursor: 'pointer',
          willChange: 'transform'
        }}
        title="Click to view pricing & claim toolkit for ₹499"
      >
        {/* Card Inner Screen */}
        <div
          style={{
            position: 'relative',
            borderRadius: '21px',
            overflow: 'hidden',
            background: '#070a10',
            lineHeight: 0
          }}
        >
          {/* The Post Image */}
          <Image
            src={imageSrc}
            alt={alt}
            width={1122}
            height={1402}
            priority
            sizes="(max-width: 768px) 92vw, 480px"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '21px',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          />

          {/* Specular Glare Layer (Follows Mouse in Real-Time) */}
          {!isTouchDevice && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '21px',
                background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(251, 191, 36, 0.25) 30%, transparent 70%)`,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
                mixBlendMode: 'overlay',
                zIndex: 3
              }}
            />
          )}

          {/* Sweeping Holographic Shine Beam on Hover */}
          {isHovered && !isTouchDevice && (
            <div
              style={{
                position: 'absolute',
                inset: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.25) 45%, rgba(251, 191, 36, 0.75) 50%, rgba(255, 255, 255, 0.6) 53%, transparent 62%)',
                animation: 'shineSweep 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
                pointerEvents: 'none',
                zIndex: 4,
                mixBlendMode: 'screen'
              }}
            />
          )}

          {/* Hover Floating Pill: Direct CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '50%',
              transform: isHovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(14px)',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 5,
              background: 'linear-gradient(135deg, rgba(15, 21, 34, 0.96) 0%, rgba(9, 12, 18, 0.96) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(245, 158, 11, 0.7)',
              borderRadius: '999px',
              padding: '9px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.75), 0 0 20px rgba(245, 158, 11, 0.4)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none'
            }}
          >
            <Flame size={14} fill="#fbbf24" color="#fbbf24" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
              GET THE KIT NOW — ₹499
            </span>
            <ArrowRight size={14} color="#fbbf24" />
          </div>
        </div>
      </a>
    </div>
  );
};
