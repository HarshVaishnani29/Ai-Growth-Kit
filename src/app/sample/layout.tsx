import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free ChatGPT Prompts & Viral Reel Hooks Vault Preview',
  description: 'Test drive free sample templates from our vault of 100 ChatGPT prompts and viral Instagram reel hooks for Indian businesses and creators.',
  alternates: {
    canonical: '/sample',
  },
  openGraph: {
    title: 'Free ChatGPT Prompts & Viral Reel Hooks Vault Preview | AI Growth Kit',
    description: 'Test drive free sample templates from our vault of 100 ChatGPT prompts and viral Instagram reel hooks for Indian businesses.',
    url: '/sample',
  },
};

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
