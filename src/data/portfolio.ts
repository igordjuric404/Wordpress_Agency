export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  thumbnail: string;
  goal: string;
  approach: string;
  features: string[];
  performanceNotes: string;
  accessibilityNotes: string;
  timeline: string;
  hypotheticalMetric: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'ecommerce-redesign-demo',
    title: 'E-Commerce Redesign Demo',
    category: 'Custom Development',
    shortDescription: 'Streamlined checkout flow for ~30% improved conversion (demo scenario).',
    thumbnail: '/placeholder-portfolio-1.svg',
    goal: 'Demonstrate how a complete WooCommerce redesign can reduce cart abandonment and improve the customer purchase journey.',
    approach: 'Built a custom theme with optimized checkout flow, reduced form fields, implemented guest checkout, and added progress indicators. Performance-first architecture with lazy-loaded product images.',
    features: [
      'Single-page checkout experience',
      'Real-time inventory validation',
      'Mobile-optimized product galleries',
      'Integrated upsell modules',
      'Custom order tracking dashboard',
    ],
    performanceNotes: 'Achieved sub-2-second load times through image optimization, efficient caching strategy, and deferred non-critical scripts. Core Web Vitals targets met.',
    accessibilityNotes: 'Full keyboard navigation, screen reader compatible forms, proper focus management through checkout steps, WCAG 2.1 AA contrast compliance.',
    timeline: '6 weeks (demo build)',
    hypotheticalMetric: 'Typical outcomes: 25–35% reduction in cart abandonment rates',
  },
  {
    slug: 'corporate-multisite-demo',
    title: 'Corporate Multisite Demo',
    category: 'Enterprise',
    shortDescription: 'WordPress multisite managing 12+ regional brand sites from a single dashboard.',
    thumbnail: '/placeholder-portfolio-2.svg',
    goal: 'Demonstrate centralized management of multiple brand sites while allowing regional customization and independent content workflows.',
    approach: 'Leveraged WordPress Multisite with custom network admin tools, shared component library, and per-site feature toggles. Implemented role-based access control for distributed content teams.',
    features: [
      'Centralized theme and plugin management',
      'Regional content localization',
      'Brand-compliant design tokens',
      'Cross-site analytics dashboard',
      'Automated deployments per site',
    ],
    performanceNotes: 'Optimized database queries for multisite environment. Implemented object caching and CDN integration for global performance.',
    accessibilityNotes: 'Consistent accessibility standards enforced across all sites through shared component library with built-in ARIA support.',
    timeline: '10 weeks (demo build)',
    hypotheticalMetric: 'Typical outcomes: 60% reduction in per-site management overhead',
  },
  {
    slug: 'publishing-platform-demo',
    title: 'Publishing Platform Demo',
    category: 'Content Platform',
    shortDescription: 'High-traffic editorial site handling 500K+ monthly visitors (demo scenario).',
    thumbnail: '/placeholder-portfolio-3.svg',
    goal: 'Demonstrate WordPress as a robust publishing platform capable of handling significant traffic with fast editorial workflows.',
    approach: 'Custom Gutenberg blocks for rich content creation, headless preview system, and aggressive caching strategy. Built for editors who need speed and flexibility.',
    features: [
      'Custom Gutenberg block library',
      'Advanced scheduling and workflow',
      'Real-time collaboration indicators',
      'SEO-optimized content templates',
      'Integrated social sharing previews',
    ],
    performanceNotes: 'Full-page caching with smart invalidation, lazy-loaded media, and optimized database queries for archive pages handling 10K+ posts.',
    accessibilityNotes: 'Semantic HTML throughout, skip navigation, proper heading hierarchy, and accessible media embeds with captions and transcripts.',
    timeline: '8 weeks (demo build)',
    hypotheticalMetric: 'Typical outcomes: Sub-1s TTFB even under high traffic loads',
  },
  {
    slug: 'membership-portal-demo',
    title: 'Membership Portal Demo',
    category: 'Membership Site',
    shortDescription: 'Gated content platform with tiered access and integrated learning modules.',
    thumbnail: '/placeholder-portfolio-4.svg',
    goal: 'Demonstrate secure member management with progressive content access, course delivery, and community features.',
    approach: 'Custom membership integration with granular content restrictions, progress tracking, and gamification elements. Built on a solid security foundation with proper role management.',
    features: [
      'Tiered membership levels',
      'Progress tracking and badges',
      'Integrated course modules',
      'Member directory and messaging',
      'Automated drip content delivery',
    ],
    performanceNotes: 'Efficient database design for membership queries, cached member-specific content where possible, and optimized media delivery for course content.',
    accessibilityNotes: 'Accessible forms and interactive elements, clear progress indicators, and keyboard-navigable course interfaces.',
    timeline: '7 weeks (demo build)',
    hypotheticalMetric: 'Typical outcomes: 40% improvement in member engagement metrics',
  },
  {
    slug: 'nonprofit-donation-demo',
    title: 'Nonprofit Donation Demo',
    category: 'Nonprofit',
    shortDescription: 'Donation-focused site with recurring giving and campaign tracking.',
    thumbnail: '/placeholder-portfolio-5.svg',
    goal: 'Demonstrate optimized donation flows, transparent impact reporting, and campaign management for mission-driven organizations.',
    approach: 'Custom donation forms with minimal friction, recurring donation management, and real-time campaign progress displays. Integrated with common nonprofit CRMs.',
    features: [
      'One-click recurring donations',
      'Campaign goal tracking',
      'Donor recognition walls',
      'Impact reporting dashboards',
      'Event registration integration',
    ],
    performanceNotes: 'Fast-loading campaign pages to maintain donor momentum, optimized form interactions, and efficient CRM sync processes.',
    accessibilityNotes: 'Fully accessible donation forms, clear error messaging, and mobile-optimized giving experience for on-the-go donors.',
    timeline: '5 weeks (demo build)',
    hypotheticalMetric: 'Typical outcomes: 20–30% increase in online donation completion rates',
  },
  {
    slug: 'headless-wordpress-demo',
    title: 'Headless WordPress Demo',
    category: 'Headless/Decoupled',
    shortDescription: 'WordPress as a headless CMS powering a React frontend application.',
    thumbnail: '/placeholder-portfolio-6.svg',
    goal: 'Demonstrate using WordPress purely as a content management backend while delivering a modern JavaScript frontend experience.',
    approach: 'WP REST API and GraphQL for content delivery, React-based frontend with static generation for optimal performance, real-time preview integration for content editors.',
    features: [
      'GraphQL content API',
      'Static site generation',
      'Real-time preview system',
      'Incremental static regeneration',
      'Custom Gutenberg-to-React mapping',
    ],
    performanceNotes: 'Near-instant page loads through static generation, efficient API caching, and edge deployment. Perfect Lighthouse scores achievable.',
    accessibilityNotes: 'Modern React accessibility patterns, proper focus management on route changes, and semantic HTML generation from Gutenberg blocks.',
    timeline: '6 weeks (demo build)',
    hypotheticalMetric: 'Typical outcomes: 70–80% improvement in Time to Interactive vs traditional WP',
  },
];


