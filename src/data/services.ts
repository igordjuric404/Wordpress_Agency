import { 
  ShoppingCart,
  Code, 
  Sparkles,
  Search, 
  Puzzle, 
  Wrench 
} from 'lucide-react';

export interface Service {
  id: string;
  icon: typeof Code;
  title: string;
  shortDescription: string;
  deliverables?: string[];
  fullDescription?: string;
  whoItsFor?: string;
  timeline?: string;
}

export const services: Service[] = [
  {
    id: 'ecommerce-development',
    icon: ShoppingCart,
    title: 'E-commerce \nDevelopment',
    shortDescription: 'Build scalable WooCommerce stores optimized for conversion and performance.',
  },
  {
    id: 'custom-wordpress-development',
    icon: Code,
    title: 'Custom WordPress \nDevelopment',
    shortDescription: 'Bespoke WordPress solutions engineered for your unique business requirements.',
  },
  {
    id: 'ai-integration',
    icon: Sparkles,
    title: 'AI Integration',
    shortDescription: 'Integrate AI-powered features to enhance user experience and automation.',
  },
  {
    id: 'seo-geo-optimization',
    icon: Search,
    title: 'SEO and GEO \nOptimization',
    shortDescription: 'Technical SEO and generative engine optimization for maximum visibility.',
  },
  {
    id: 'plugin-integration',
    icon: Puzzle,
    title: 'Plugin\nIntegration',
    shortDescription: 'Strategic plugin selection, configuration, and custom modifications.',
  },
  {
    id: 'maintenance-support',
    icon: Wrench,
    title: 'Maintenance &\nSupport',
    shortDescription: 'Proactive care that keeps your WordPress site secure and performing.',
  },
];

export const engagementModels = [
  {
    id: 'fixed-scope',
    title: 'Fixed-Scope Build',
    description: 'Clearly defined project with predictable timeline and budget. Ideal for new sites, redesigns, or specific feature implementations.',
    features: [
      'Detailed scope document upfront',
      'Fixed price based on requirements',
      'Milestone-based delivery',
      'Defined revision rounds',
    ],
  },
  {
    id: 'retainer',
    title: 'Retainer Maintenance',
    description: 'Ongoing partnership for maintenance, updates, and continuous improvement. Hours allocated monthly for proactive care.',
    features: [
      'Monthly hour allocation',
      'Priority response times',
      'Proactive monitoring',
      'Rollover of unused hours (limited)',
    ],
  },
  {
    id: 'advisory',
    title: 'Advisory / Audit',
    description: 'Expert evaluation of your current WordPress setup with actionable recommendations. Perfect before a major investment.',
    features: [
      'Comprehensive site audit',
      'Performance & security assessment',
      'Prioritized recommendation roadmap',
      'Optional implementation support',
    ],
  },
];

