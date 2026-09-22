import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Business Growth Kit — AI + Instagram Marketing System',
    short_name: 'AI Growth Kit',
    description: 'The ultimate practical toolkit to create 30 days of high-converting business content using ChatGPT + Canva.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06080c',
    theme_color: '#fbbf24',
    icons: [
      {
        src: '/images/post.jpeg',
        sizes: '192x192 512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
