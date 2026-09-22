import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Member Vault Access & Digital Downloads Portal',
  description: 'Instant member vault login and download links for verified buyers of the AI Business Growth Kit.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
