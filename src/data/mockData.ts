import { PromptSample, PricingPlan, CourseModule, BonusItem, Testimonial, FaqItem } from '../types';

export const PROMPT_SAMPLES: PromptSample[] = [
  {
    id: 'p-1',
    title: 'Customer Problem Hook & Solution Reel',
    category: 'Viral Reel Script',
    hook: '"Not getting leads from Instagram for your business? Stop making these 3 common mistakes..."',
    promptSnippet: 'Act as an Indian B2B & local retail business marketing expert. Write a high-retention Instagram Reel script for my [Business Type] with a compelling 3-second hook that addresses customer pain points...',
    idealFor: 'Local Shops, Agencies, Boutiques & Retailers',
    canvaTemplate: 'Reel Hook Banner + 3-Bullet Points Layout'
  },
  {
    id: 'p-2',
    title: '30-Day Niche Content Strategy Prompt',
    category: 'ChatGPT Prompt',
    hook: '"30 Posts in 30 Days: Build your entire monthly content calendar with ChatGPT in just 10 minutes"',
    promptSnippet: 'Generate a comprehensive 30-day content calendar for an Indian business selling [Product/Service]. Divide into 4 key pillars: Trust & Authority, Educational & How-to, Behind-the-scenes, and Direct Flash Offers...',
    idealFor: 'Small Business Owners & Creators',
    canvaTemplate: '30-Day Monthly Visual Grid Sheet'
  },
  {
    id: 'p-3',
    title: 'WhatsApp DM to Sales Conversion Script',
    category: 'Sales Script',
    hook: '"Customers ask for \'Price?\' in Instagram DMs and then ghost you? Send this closing script..."',
    promptSnippet: 'When someone comments or DMs "Price?", instead of dropping just a number, use this 3-step value-driven script to start a conversation and shift the prospect to WhatsApp for seamless closing...',
    idealFor: 'Freelancers, Online Sellers & D2C Brands',
    canvaTemplate: 'Quick Reply WhatsApp Chat Card'
  },
  {
    id: 'p-4',
    title: 'High-Retention Educational Carousel Prompt',
    category: 'Canva & Carousel',
    hook: '"Save This: 5 Tools that will make your business run 10x faster"',
    promptSnippet: 'Create a 5-slide educational carousel script on [Topic]. Slide 1: Bold controversial question, Slides 2-4: Actionable steps, Slide 5: Clear CTA to DM for the free checklist...',
    idealFor: 'Coaches, Consultants & Tech Startups',
    canvaTemplate: 'Seamless 5-Slide Dark Luxury Carousel'
  },
  {
    id: 'p-5',
    title: 'Festive Season & Flash Sale Offer Prompt',
    category: 'Offers & Prompts',
    hook: '"Before Diwali / Navratri rush kicks in, launch this 1 flash offer and clear out inventory!"',
    promptSnippet: 'Write a high-urgency festive sale caption tailored for Indian shoppers with genuine FOMO, limited inventory notice, and a direct WhatsApp call-to-action for order confirmation...',
    idealFor: 'Retail Stores, Jewellery, Clothing & Gifting',
    canvaTemplate: 'Gold Festive Promo Banner Layout'
  },
  {
    id: 'p-6',
    title: 'Founder Story & Trust Building Prompt',
    category: 'Storytelling',
    hook: '"When we first started this business, we didn\'t get a single order in the entire first month..."',
    promptSnippet: 'Draft a personal founder journey post that emotionally connects with Indian customers, highlights real initial struggles, and shows how uncompromising quality built loyal customer trust...',
    idealFor: 'Brand Owners & Personal Brands',
    canvaTemplate: 'Founder Quote & Behind-The-Scenes Frame'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'AI Business Growth Kit',
    tagline: 'AI + Instagram Marketing System — The Ultimate Practical Indian Business Toolkit',
    originalPrice: 4999,
    currentPrice: 499,
    popular: true,
    badge: 'EXCLUSIVE LAUNCH OFFER • 90% OFF',
    features: [
      '100 ChatGPT Prompts (Business Growth, Captions & Sales Copy)',
      '100 Viral Reel Ideas & High-Retention 3-Second Hooks',
      '30-Day Ready-Made Business Content Calendar',
      'Canva Fast-Track Design Workflow & Ready Layouts',
      'WhatsApp Sales & Direct Inquiries Closing Scripts',
      'Instagram 2026 Growth & Algorithm Strategy Playbook',
      'Bonus 1: 50+ High-Converting Storytelling Frameworks (₹1,499 Value)',
      'Bonus 2: Canva Editable Carousel Layouts & Covers (₹1,999 Value)',
      'Bonus 3: DM Lead Magnet & WhatsApp Closing SOP (₹2,000 Value)',
      'Bonus 4: Festive & Flash Sale Promo Prompts Pack (₹1,500 Value)',
      'Lifetime Access + Instant Google Drive Digital Download'
    ],
    bonusesIncluded: true,
    ctaText: 'GET THE KIT NOW — ₹499'
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    moduleNumber: '01',
    title: '100 ChatGPT Prompts',
    subtitle: 'Business, Captions, Offers & Sales Copy',
    badge: 'AI PROMPT VAULT',
    durationOrCount: '100 Tested Prompts',
    description: 'Plug-and-play prompts crafted specifically for Indian businesses to write viral Instagram captions, compelling offers, customer FAQs, and high-retention hooks. Just replace your business name and product, and your content is ready in 10 seconds flat.',
    highlights: [
      'Indian retail, D2C & Hinglish business context prompts',
      'High-converting bio & profile optimization formula',
      'Customer pain-point identifier prompts for local markets'
    ],
    fileFormat: 'Google Docs / Notion / PDF'
  },
  {
    id: 'mod-2',
    moduleNumber: '02',
    title: '100 Reel Ideas & Hooks',
    subtitle: 'Stop Scrollers in the First 3 Seconds',
    badge: 'VIRAL REEL PACK',
    durationOrCount: '100 High-Retention Hooks',
    description: 'To get views and reach on Instagram Reels, the first 3 seconds make or break your video. Get 100 tested hook templates and trending audio frameworks that compel viewers to watch your entire Reel.',
    highlights: [
      'Curiosity hooks, Problem-aware hooks, and Flash offer hooks',
      'Reel call-to-action scripts for maximum comments & saves',
      'Faceless reel concepts for camera-shy shop owners & creators'
    ],
    fileFormat: 'Ready-to-Use Hook Bank'
  },
  {
    id: 'mod-3',
    moduleNumber: '03',
    title: '30-Day Content Calendar',
    subtitle: 'Never Run Out of Content Ideas Again',
    badge: 'CONTENT BLUEPRINT',
    durationOrCount: 'Day-by-Day 30 Days',
    description: 'End the daily "What should I post today?" headache once and for all. A complete day-by-day roadmap from Monday to Sunday telling you exactly when to post a Reel, when to post a Carousel, when to share a Story, and when to drop a direct Offer.',
    highlights: [
      'Structured 4-pillar posting formula (Trust, Value, Social Proof, Offer)',
      'Time-saving batch creation system (1 week in 30 mins)',
      'Weekly story engagement checklist for maximum DM replies'
    ],
    fileFormat: 'Spreadsheet + PDF Calendar'
  },
  {
    id: 'mod-4',
    moduleNumber: '04',
    title: 'Canva Design Workflow',
    subtitle: 'Professional Visuals in 5 Minutes Without a Designer',
    badge: 'DESIGN SYSTEM',
    durationOrCount: 'Canva Workflow + Templates',
    description: 'No need to hire expensive graphic designers or pay ₹10,000/month to agencies. A fast-track guide to creating clean, aesthetic, high-ticket Instagram posts right from your smartphone using the 100% Free Canva app.',
    highlights: [
      'Color palette & font pairing cheat sheet for luxury brands',
      'Editable carousel layouts & reel cover frames',
      'Quick export settings for crisp, uncompressed HD quality'
    ],
    fileFormat: 'Direct Canva Template Links'
  },
  {
    id: 'mod-5',
    moduleNumber: '05',
    title: 'WhatsApp Sales Scripts',
    subtitle: 'Turn Likes & Comments into Paying Customers',
    badge: 'SALES CLOSING',
    durationOrCount: '15 High-Closing Scripts',
    description: 'Likes on Instagram don\'t pay the bills—bank transfers do. Proven copy-paste scripts to respectfully handle "Price?" comments, move interested prospects to WhatsApp, and close orders without haggling.',
    highlights: [
      'The exact "Price?" reply script that eliminates ghosting',
      'Polite follow-up scripts for interested prospects',
      'UPI payment link sharing script that builds instant buyer trust'
    ],
    fileFormat: 'Copy-Paste Script Sheet'
  },
  {
    id: 'mod-6',
    moduleNumber: '06',
    title: 'Instagram Growth Framework',
    subtitle: 'Algorithm, Bio & Lead Funnel Architecture',
    badge: 'GROWTH BLUEPRINT',
    durationOrCount: 'Complete 2026 Playbook',
    description: 'Tailored for Instagram\'s latest algorithm updates: profile SEO, bio setup, hashtag strategy, and Story Highlight funnels to attract genuine paying customers instead of random dead followers.',
    highlights: [
      'Bio structure that turns profile visitors into followers in 3 seconds',
      'Keyword search optimization for local city and niche discovery',
      'Story polls and interactive stickers lead generation funnel'
    ],
    fileFormat: 'Practical Growth Master Guide'
  }
];

export const FOUR_STEPS = [
  {
    step: 'Step 1',
    title: 'Copy the Prompt',
    desc: 'Pick the ready-to-use prompt from the toolkit that matches your business niche.'
  },
  {
    step: 'Step 2',
    title: 'Customize in ChatGPT',
    desc: 'Paste your product or service details and get tailor-made content in 10 seconds flat.'
  },
  {
    step: 'Step 3',
    title: 'Design in Canva',
    desc: 'Drop the generated text into our pre-made Canva templates in just 5 minutes.'
  },
  {
    step: 'Step 4',
    title: 'Publish & Close Sales',
    desc: 'Post your Reel or Carousel, and use the WhatsApp scripts to convert inquiries into paying customers.'
  }
];

export const TARGET_AUDIENCE = [
  { title: 'Small Business Owners', desc: 'Retail shops, boutiques, manufacturers, and service providers looking to expand their customer base online.' },
  { title: 'Freelancers & Consultants', desc: 'Showcase your expertise and land high-paying client inquiries effortlessly.' },
  { title: 'Creators & Influencers', desc: 'Post viral reels consistently to accelerate follower growth and unlock brand partnerships.' },
  { title: 'Students & Beginners', desc: 'Master AI tools and Instagram marketing to kickstart a profitable freelance income.' },
  { title: 'Local Businesses', desc: 'Attract walk-in customers and direct inquiries from your city or neighbourhood.' },
  { title: 'Social Media Beginners', desc: 'Zero technical or design skills needed—go from zero to confident in just a few days.' }
];

export const BONUS_STACK: BonusItem[] = [
  {
    id: 'bonus-1',
    bonusNumber: 'BONUS #1',
    title: '50+ Indian Business Storytelling Formats',
    value: 1499,
    badge: 'STORY SELLING',
    description: '50 proven storytelling frameworks to emotionally connect with Indian customers and build unwavering brand trust.',
    features: ['Behind-the-scenes business stories', 'Customer review showcase frameworks', 'Founder struggle & journey templates'],
    icon: 'Mail'
  },
  {
    id: 'bonus-2',
    bonusNumber: 'BONUS #2',
    title: 'Canva High-Ticket Carousel Layouts',
    value: 1999,
    badge: 'READY DESIGN',
    description: 'Premium, aesthetic seamless carousels that you can edit with 1-click in the Free Canva app.',
    features: ['5-slide educational layouts', 'Product showcase swipe templates', 'Dark luxury brand color themes'],
    icon: 'CheckSquare'
  },
  {
    id: 'bonus-3',
    bonusNumber: 'BONUS #3',
    title: 'DM Lead Magnet & WhatsApp Closing SOP',
    value: 2000,
    badge: 'LEAD FUNNEL',
    description: 'Get users to comment "Send me" to trigger automated DMs and book confirmed orders on WhatsApp.',
    features: ['Comment-to-DM loop setup', 'Anti-ghosting follow-up schedule', 'Order booking checklist'],
    icon: 'MessageSquare'
  },
  {
    id: 'bonus-4',
    bonusNumber: 'BONUS #4',
    title: 'Festive & Flash Sale Promo Prompts',
    value: 1500,
    badge: 'FESTIVE PACK',
    description: 'Ready-to-use festive promotional prompts to drive 3x orders during Diwali, Navratri, and wedding rushes.',
    features: ['Festive discount copy', 'Limited inventory urgency scripts', 'Gift hamper marketing angles'],
    icon: 'MapPin'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Bhavik Patel',
    role: 'Owner',
    company: 'Patel Sarees & Ethnic, Surat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Earlier, we had no idea what reels to post for our shop. Using the 100 Hooks and Canva templates, we started posting 1 Reel daily. Within 15 days, 6 reels went viral and we received 140+ genuine WhatsApp inquiries and orders!',
    verified: true,
    rating: 5,
    highlight: '140+ Real Orders on WhatsApp',
    growthMetric: '+4.5x Instagram Inquiries'
  },
  {
    id: 't-2',
    name: 'Preeti Shah',
    role: 'Founder',
    company: 'Aura Skin Clinic, Ahmedabad',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'These ChatGPT Prompts are so practical that 1 full week of content gets scheduled in 10 minutes. I used to pay ₹8,000 every month to a freelance graphic designer—now I make everything myself on Canva in 5 minutes.',
    verified: true,
    rating: 5,
    highlight: 'Saved ₹8,000/Month on Designer Fees',
    growthMetric: '1 Week of Content in 10 Mins'
  },
  {
    id: 't-3',
    name: 'Dhruv Trivedi',
    role: 'Freelance Social Media Manager',
    company: 'Vadodara',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    content: 'With this toolkit, I created a 30-day content calendar for 3 clients in just a single day. The WhatsApp closing scripts are pure gold—helped convert client leads effortlessly.',
    verified: true,
    rating: 5,
    highlight: '3 Client Calendars Built in 1 Day',
    growthMetric: '₹499 Investment Returned 100x'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is this toolkit suitable for absolute beginners?',
    answer: 'Yes, 100%. Even if you are trying Instagram marketing for the very first time, everything is explained step-by-step in simple, accessible Indian English and practical terms. No prior tech or design skills required.'
  },
  {
    question: 'Do you offer a sales guarantee?',
    answer: 'No honest business can promise overnight riches. Your actual results depend on your consistency, product quality, and market demand. What we do guarantee is the fastest, most practical shortcut with tested, ready-to-use tools.'
  },
  {
    question: 'How will I receive access after payment?',
    answer: 'Immediately after completing payment, you will see an instant download dashboard on your screen with direct Google Drive links, PDFs, and Canva templates. A backup copy with all access links will also be sent to your email instantly.'
  },
  {
    question: 'Do I need to buy Canva Pro (Paid)?',
    answer: 'No, not at all! All Canva templates and design workflows are 100% compatible with free Canva accounts.'
  },
  {
    question: 'Is ₹499 a one-time payment or monthly?',
    answer: 'This is strictly a ONE-TIME payment of ₹499. There are no recurring subscriptions, hidden fees, or renewal charges. Pay once and enjoy lifetime access including all future updates.'
  }
];
