import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessdatahub.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/sample', '/checkout', '/legal/'],
        disallow: ['/api/', '/access/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/sample', '/checkout', '/legal/'],
        disallow: ['/api/', '/access/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
