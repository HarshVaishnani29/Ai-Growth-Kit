import React from 'react';
import { FAQ_ITEMS } from '@/data/mockData';

export const JsonLd: React.FC = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://businessdatahub.in';

  // 1. Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Growth Kit',
    alternateName: 'BusinessDataHub',
    url: siteUrl,
    logo: `${siteUrl}/images/post.jpeg`,
    description: 'Practical AI and Instagram marketing systems, prompts, and templates designed for Indian businesses and creators.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9876543210',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Gujarati']
    }
  };

  // 2. Product & Offer Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AI Business Growth Kit — AI + Instagram Marketing System',
    image: `${siteUrl}/images/post.jpeg`,
    description: 'The ultimate practical toolkit to create 30 days of high-converting business content using ChatGPT + Canva. Packed with 100 Prompts, 100 Viral Reel Hooks, 30-Day Content Calendar, Canva Fast-Track Templates, and WhatsApp Sales Closing Scripts.',
    sku: 'AIBGK-499',
    mpn: 'AIBGK-2026',
    brand: {
      '@type': 'Brand',
      name: 'AI Growth Kit'
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/#pricing`,
      priceCurrency: 'INR',
      price: '499',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'BusinessDataHub'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1450',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Bhavik Patel'
        },
        datePublished: '2026-03-10',
        reviewBody: 'Earlier, we had no idea what reels to post for our shop. Using the 100 Hooks and Canva templates, we started posting 1 Reel daily. Within 15 days, 6 reels went viral and we received 140+ genuine WhatsApp inquiries and orders!'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Preeti Shah'
        },
        datePublished: '2026-03-14',
        reviewBody: 'These ChatGPT Prompts are so practical that 1 full week of content gets scheduled in 10 minutes. Saved ₹8,000 every month on designer fees.'
      }
    ]
  };

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  // 4. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Toolkit Inclusions',
        item: `${siteUrl}/#curriculum`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pricing (₹499)',
        item: `${siteUrl}/#pricing`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};
