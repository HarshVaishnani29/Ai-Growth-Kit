export interface PromptSample {
  id: string;
  title: string;
  category: string;
  hook: string;
  promptSnippet: string;
  idealFor: string;
  canvaTemplate: string;
}

export interface PricingPlan {
  id: 'starter' | 'pro' | 'business';
  name: string;
  tagline: string;
  originalPrice: number;
  currentPrice: number;
  badge?: string;
  popular?: boolean;
  features: string[];
  bonusesIncluded: boolean;
  ctaText: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: string;
  title: string;
  subtitle: string;
  badge: string;
  durationOrCount: string;
  description: string;
  highlights: string[];
  fileFormat: string;
}

export interface BonusItem {
  id: string;
  bonusNumber: string;
  title: string;
  value: number;
  badge: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  verified: boolean;
  rating: number;
  highlight: string;
  growthMetric?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}
