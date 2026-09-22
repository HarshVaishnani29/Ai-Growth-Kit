import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout — AI Business Growth Kit (₹499 Lifetime Access)',
  description: 'Instant UPI & card checkout for the AI Business Growth Kit. Get immediate lifetime access to 100 Prompts, 100 Hooks, Calendar, Canva Workflows & WhatsApp Scripts.',
  alternates: {
    canonical: '/checkout',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
