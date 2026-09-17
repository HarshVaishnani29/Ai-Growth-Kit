import type { Metadata } from 'next';
import './globals.css';
import { TopUrgencyBanner } from '@/components/TopUrgencyBanner';
import { Navbar } from '@/components/Navbar';
import { StickyBottomBar } from '@/components/StickyBottomBar';
import { LiveSalesToast } from '@/components/LiveSalesToast';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AI Business Growth Kit — ₹499 | AI + Instagram Marketing System',
  description: 'Creating Instagram content is no longer a headache. A practical AI & Instagram marketing toolkit to generate 30 days of high-converting business content using ChatGPT + Canva. Just ₹499.',
  keywords: 'Instagram Marketing India, ChatGPT Prompts for Business, Canva Templates India, Reel Hooks, AI Growth Kit, 30 Day Content Calendar, WhatsApp Sales Scripts',
  openGraph: {
    title: 'AI + Instagram Marketing System — Practical Business Toolkit | ₹499',
    description: 'Creating Instagram content is no longer a headache. A practical AI & Instagram marketing toolkit to generate 30 days of high-converting business content using ChatGPT + Canva.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        <TopUrgencyBanner />
        <Navbar />
        <main>{children}</main>
        <StickyBottomBar />
        <LiveSalesToast />
        <Footer />
      </body>
    </html>
  );
}
