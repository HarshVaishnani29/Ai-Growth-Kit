import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { TopUrgencyBanner } from '@/components/TopUrgencyBanner';
import { Navbar } from '@/components/Navbar';
import { StickyBottomBar } from '@/components/StickyBottomBar';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessdatahub.in';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#06080c',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI Business Growth Kit — ₹499 | AI + Instagram Marketing System',
    template: '%s | AI Growth Kit'
  },
  description: 'Creating Instagram content is no longer a headache. The ultimate practical toolkit to generate 30 days of high-converting business content using ChatGPT + Canva. 100 Prompts, 100 Viral Reel Hooks, Calendar & WhatsApp Scripts for ₹499.',
  keywords: [
    'AI Growth Kit',
    'Instagram Marketing India',
    'ChatGPT Prompts for Business',
    'Canva Templates India',
    'Viral Reel Hooks',
    '30 Day Instagram Content Calendar',
    'WhatsApp Sales Closing Scripts',
    'Instagram Growth System 2026',
    'Social Media Marketing Toolkit India',
    'ChatGPT Prompts for Indian Retail',
    'AI Business Automation Tools',
    'Indian D2C Marketing Prompts',
    'Local Business Instagram Growth',
    'Faceless Reels Hooks and Prompts',
    'Canva Pro Alternative Free Templates',
    'Indian Small Business Marketing'
  ],
  authors: [{ name: 'BusinessDataHub', url: siteUrl }],
  creator: 'BusinessDataHub',
  publisher: 'BusinessDataHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'AI Business Growth Kit — ₹499 | AI + Instagram Marketing System',
    description: 'The ultimate practical toolkit to generate 30 days of high-converting business content using ChatGPT + Canva. Includes 100 Prompts, 100 Hooks, Calendar & Scripts for ₹499.',
    url: siteUrl,
    siteName: 'AI Growth Kit',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/post.jpeg',
        width: 1122,
        height: 1402,
        alt: 'AI Business Growth Kit — 30 Days Instagram Marketing System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Business Growth Kit — ₹499 | AI + Instagram Marketing System',
    description: 'The ultimate practical toolkit to generate 30 days of high-converting business content using ChatGPT + Canva.',
    images: ['/images/post.jpeg'],
    creator: '@businessdatahub',
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        <JsonLd />
        <TopUrgencyBanner />
        <Navbar />
        <main>{children}</main>
        <StickyBottomBar />
        {/* <LiveSalesToast /> */}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
