import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState, useRef } from 'react';
import { 
  Zap, 
  Shield, 
  Clock, 
  ArrowRight,
  Star,
  Target,
  Sparkles
} from 'lucide-react';
import { Button, Card, Section } from '../components/ui';
import { services } from '../data/services';
import { blogPosts } from '../data/blog';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ContactForm from '../components/ContactForm';
import AnimatedUnderline from '../components/AnimatedUnderline';

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn your business, goals, and constraints through structured conversations.',
    icon: Target,
  },
  {
    number: '02',
    title: 'UX/UI Planning',
    description: 'Information architecture, wireframes, and design direction established.',
    icon: Star,
  },
  {
    number: '03',
    title: 'Development',
    description: 'Clean, performance-first code built in iterative sprints with regular demos.',
    icon: Zap,
  },
  {
    number: '04',
    title: 'QA & Launch',
    description: 'Thorough testing across devices, accessibility audit, and smooth deployment.',
    icon: Shield,
  },
  {
    number: '05',
    title: 'Care & Iteration',
    description: 'Post-launch support, monitoring, and continuous improvements.',
    icon: Sparkles,
  },
];

export default function HomePage() {
  useDocumentTitle('');
  const mainRef = useScrollReveal<HTMLDivElement>();
  const [isMobile, setIsMobile] = useState(false);
  const [serviceUnderlineActive, setServiceUnderlineActive] = useState<boolean[]>(
    () => services.map(() => false)
  );
  
  // Create refs for service cards
  const cardRefs = useMemo(() => 
    services.map(() => ({ current: null as HTMLElement | null })),
    []
  );

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-based underline toggle (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    const updateUnderlines = () => {
      const viewportTrigger = window.innerHeight * 0.75;

      setServiceUnderlineActive((prev) => {
        let changed = false;
        const next = [...prev];
        cardRefs.forEach((ref, idx) => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          
          // Logic:
          // Scroll down → crossing 35% (center goes UP past trigger) = underline turns on
          // Keep scrolling → underline stays
          // Scroll up → crossing back below 35% (center goes DOWN past trigger) = underline turns off
          
          // So if center <= viewportTrigger, it's active.
          const shouldBeActive = center <= viewportTrigger;

          if (next[idx] !== shouldBeActive) {
            next[idx] = shouldBeActive;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };

    updateUnderlines();
    window.addEventListener('scroll', updateUnderlines, { passive: true });
    window.addEventListener('resize', updateUnderlines);

    return () => {
      window.removeEventListener('scroll', updateUnderlines);
      window.removeEventListener('resize', updateUnderlines);
    };
  }, [isMobile, cardRefs]);

  return (
    <div ref={mainRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[calc(100vh-4rem-4px)] md:h-[calc(100vh-6rem-4px)]">
        <div className="neo-container h-full flex items-center py-6 md:py-8">
          <div className="max-w-4xl">
            <h1 className="reveal font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-10 md:mb-5 relative">
              <span className="font-sora">Expert WordPress Solutions for Growing Businesses</span>
            </h1>
            <p className="reveal font-body text-base md:text-lg lg:text-xl text-neo-gray-dark mb-5 md:mb-6 max-w-2xl">
              We craft scalable, high-performance websites to drive your success.
            </p>
            
            {/* Metric bullets */}
            <div className="reveal space-y-2 md:space-y-3 mb-6 md:mb-8">
              <div className="flex items-start gap-2 md:gap-3">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-bold-yellow fill-bold-yellow flex-shrink-0 mt-0.5" />
                <span className="font-body font-bold text-sm md:text-base">Up to 50–60% faster load times with performance-first builds</span>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-bold-green fill-bold-green flex-shrink-0 mt-0.5" />
                <span className="font-body font-bold text-sm md:text-base">Accessibility-aligned UI patterns (WCAG-ready foundations)</span>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-bold-purple fill-bold-purple flex-shrink-0 mt-0.5" />
                <span className="font-body font-bold text-sm md:text-base">Launch-ready in weeks, not months (scope-dependent)</span>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="reveal flex flex-col items-center sm:items-start sm:flex-row gap-3 md:gap-4">
              <Button to="/services" variant="bold-pink" size="lg" className="text-[18px]">
                Explore services
              </Button>
              <Button to="/contact" variant="bold-blue" size="lg" className="text-[18px]">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <Section id="services-overview" className="pb-16 md:pb-16">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="reveal font-extrabold text-4xl md:text-5xl mb-4 text-white relative">
              <span className="font-sora">Our </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Services</span>
            </h2>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto justify-center">
          {services.map((service, index) => {
            // Unified color pairs: card background matches icon color
            // Underline colors use complementary colors for best contrast
            const colorPairs: { 
              bg: 'soft-pink' | 'soft-green' | 'soft-yellow' | 'soft-blue' | 'soft-purple' | 'soft-orange'; 
              icon: string;
              underline: string;
            }[] = [
              { bg: 'soft-orange', icon: 'text-bold-orange', underline: '#00B2FF' }, // orange → blue (complementary)
              { bg: 'soft-yellow', icon: 'text-bold-yellow', underline: '#A100FF' }, // yellow → purple (complementary)
              { bg: 'soft-blue', icon: 'text-bold-blue', underline: '#FF6B35' }, // blue → orange (complementary)
              { bg: 'soft-purple', icon: 'text-bold-purple', underline: '#FFB703' }, // purple → yellow (complementary)
              { bg: 'soft-green', icon: 'text-bold-green', underline: '#FF2D95' }, // green → pink (complementary)
              { bg: 'soft-pink', icon: 'text-bold-pink', underline: '#00E676' }, // pink → green (complementary)
            ];
            const { bg, icon: color, underline } = colorPairs[index % colorPairs.length];
            const cardRef = cardRefs[index];
            
            return (
              <Card 
                key={service.id} 
                hoverable 
                className="reveal p-4 md:p-6 flex flex-col h-full"
                as="article"
                background={bg}
                ref={cardRef as React.Ref<HTMLElement>}
              >
                {/* Mobile: icon + title side by side */}
                <div className="flex items-center gap-3 md:block mb-2 md:mb-0">
                  <service.icon className={`w-10 h-10 md:w-12 md:h-12 ${color} flex-shrink-0 md:mb-4`} />
                  <h3 className="font-display font-bold text-lg md:text-2xl md:mb-2 md:min-h-[4rem] pt-2 md:pt-0">
                    <AnimatedUnderline 
                      triggerRef={cardRef as React.RefObject<HTMLElement>} 
                      color={underline}
                      forceActive={isMobile ? serviceUnderlineActive[index] : undefined}
                    >
                      {service.title.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < service.title.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </AnimatedUnderline>
                  </h3>
                </div>
                <p className="font-body text-sm md:text-base text-neo-black leading-relaxed flex-grow">
                  {service.shortDescription}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Process Section */}
      <Section id="process" className="py-16 md:py-16">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="reveal font-extrabold text-4xl md:text-5xl mb-4 text-white relative">
              <span className="font-sora">How </span><span className="bg-bold-purple text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>We Work</span>
            </h2>
          </div>
        
        <div className="space-y-4 md:space-y-5 max-w-4xl mx-auto">
          {processSteps.map((step, index) => {
            // Unified color pairs: card background matches number badge color
            const colorPairs: { badge: string; card: 'soft-pink' | 'soft-green' | 'soft-blue' | 'soft-purple' | 'soft-yellow' }[] = [
              { badge: 'bg-bold-pink', card: 'soft-pink' },
              { badge: 'bg-bold-green', card: 'soft-green' },
              { badge: 'bg-bold-blue', card: 'soft-blue' },
              { badge: 'bg-bold-purple', card: 'soft-purple' },
              { badge: 'bg-bold-yellow', card: 'soft-yellow' },
            ];
            const { badge: vibrantBg, card: cardBg } = colorPairs[index % colorPairs.length];

            return (
              <div 
                key={step.number}
                className="reveal flex flex-row gap-3 md:gap-4 items-start"
              >
                <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 ${vibrantBg} text-white border-2 border-neo-black shadow-neo-sm flex items-center justify-center font-display font-black text-lg md:text-2xl`}>
                  {step.number}
                </div>
                <Card 
                  background={cardBg}
                  className="flex-1 p-3 md:p-5"
                >
                  <h3 className="font-display font-bold text-lg md:text-2xl mb-2 md:mb-3">{step.title}</h3>
                  <p className="font-body text-sm md:text-lg text-neo-black">{step.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Portfolio Samples */}
      {/* <Section id="portfolio" background="pastel-blue" className="border-b-4 border-neo-black">
        <div className="text-center mb-12">
          <span className="bg-bold-yellow text-neo-black font-display font-black px-4 py-1 border-2 border-neo-black shadow-neo-sm mb-4 inline-block">Demo Portfolio</span>
          <h2 className="reveal font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Sample <span className="text-bold-pink">Projects</span>
          </h2>
          <p className="reveal font-body text-lg text-neo-black max-w-2xl mx-auto bg-white p-4 border-3 border-neo-black shadow-neo-sm font-bold">
            Fictional demonstrations of our capabilities and approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => {
            const cardBgs: ('pastel-pink' | 'pastel-green' | 'pastel-yellow' | 'pastel-purple' | 'white')[] = ['white', 'pastel-yellow', 'pastel-green', 'pastel-pink', 'pastel-purple'];
            const cardBg = cardBgs[index % cardBgs.length];
            const shadowColors = ['shadow-neo-vibrant-pink', 'shadow-neo-vibrant-green', 'shadow-neo-vibrant-blue', 'shadow-neo-vibrant-purple', 'shadow-neo-vibrant-yellow'];
            const shadowColor = shadowColors[index % shadowColors.length];
            
            return (
              <Card
                key={item.slug}
                hoverable
                className={`reveal cursor-pointer ${shadowColor}`}
                onClick={() => setSelectedPortfolio(item)}
                as="article"
                background={cardBg === 'white' ? undefined : cardBg}
              >
                <div className="aspect-video bg-neo-black border-3 border-neo-black mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                  <span className="font-display font-black text-white text-lg z-10">
                    {item.title}
                  </span>
                </div>
                <span className="bg-neo-black text-white text-xs font-black px-2 py-1 border-2 border-neo-black mb-2 inline-block">{item.category}</span>
                <h3 className="font-display font-black text-xl mb-2">{item.title}</h3>
                <p className="font-body text-sm text-neo-black font-bold">
                  {item.shortDescription}
                </p>
                <button 
                  className="mt-4 flex items-center gap-2 font-display font-black text-neo-black hover:translate-x-1 transition-transform"
                  aria-label={`View details for ${item.title}`}
                >
                  View Details
                  <ArrowRight className="w-5 h-5 text-bold-blue" />
                </button>
              </Card>
            );
          })}
        </div>
      </Section> */}

      {/* Blog Teaser */}
      <Section id="blog" className="py-12 md:py-16">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="reveal font-extrabold text-4xl md:text-5xl mb-4 text-white relative">
              <span className="bg-bold-yellow text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Blog</span>
            </h2>
            <p className="reveal font-body text-base md:text-lg text-neo-black max-w-2xl mx-auto">
              Practical tips on WordPress development, performance, and security.
            </p>
          </div>
        
        {/* Blog cards - hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-6">
          {blogPosts.slice(0, 3).map((post, index) => {
            const cardBgs: ('soft-pink' | 'soft-yellow' | 'soft-blue' | 'soft-purple' | 'white')[] = ['soft-purple', 'soft-pink', 'soft-yellow'];
            const cardBg = cardBgs[index % cardBgs.length];
            const vibrantText = ['text-bold-pink', 'text-bold-blue', 'text-bold-purple'];
            const textColor = vibrantText[index % vibrantText.length];

            return (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="block">
                <Card hoverable className="reveal flex flex-col h-full" as="article" background={cardBg}>
                  <div className="aspect-video bg-white border-3 border-neo-black mb-4 flex items-center justify-center shadow-neo-sm">
                    <span className={`font-display font-black ${textColor} text-xl text-center px-4 line-clamp-3`}>
                      {post.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="bg-neo-black text-white font-black px-2 py-0.5 text-xs">{post.category}</span>
                    <span className="text-neo-black font-bold">{post.readTime}</span>
                  </div>
                  <h3 className="font-display font-black text-xl mb-3 line-clamp-2">{post.title}</h3>
                  <p className="font-body text-[15px] text-neo-black mb-4 font-medium flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-display font-black text-neo-black transition-colors mt-auto">
                    Read More
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          {/* Mobile: different CTA text */}
          <Button to="/blog" variant="vibrant-yellow" className="md:hidden text-[18px]">
            Read Our Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          {/* Desktop: original CTA */}
          <Button to="/blog" variant="vibrant-yellow" className="hidden md:inline-flex text-[18px]">
            View All Posts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </Section>

      {/* CTA Band */}
      <section className="bg-neo-black text-white overflow-hidden relative py-16 md:py-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bold-pink/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-bold-blue/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="neo-container relative z-10 text-center">
          <h2 className="reveal font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl mx-auto">
            Ready to build a <span className="text-bold-yellow italic">faster</span>, smarter WordPress site?
          </h2>
          <p className="reveal font-body text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-8 font-medium">
            Let's discuss your project and explore how we can help you achieve your goals.
          </p>
          <div className="reveal">
            <Button to="/services" variant="bold-yellow" size="lg" className="text-[18px]">
              See Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Section id="contact" className="py-16 md:py-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="reveal font-extrabold text-4xl md:text-5xl mb-4 text-white relative">
              <span className="font-sora">Contact </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Us</span>
            </h2>
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Form on Left */}
          <div className="reveal bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-6 md:p-8 rounded-[10px]">
            <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-center">
              Send us a <span className="bg-bold-pink text-white px-2 border-3 border-neo-black shadow-neo-sm">Message</span>
            </h3>
            <ContactForm />
          </div>
          
          {/* Scheduling Section on Right */}
          <div className="reveal bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-6 md:p-8 rounded-[10px]">
            <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-center">
               Book a <span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm">Call</span>
            </h3>
            <p className="font-body text-base md:text-lg text-neo-black mb-6 mt-11 font-bold">
              Prefer to discuss your project in a call? Book a time that works for you.
            </p>
            <Button
              variant="bold-blue"
              size="lg"
              className="w-full text-[18px]"
              data-cal-link="igordjuric/15min"
              data-cal-namespace="15min"
              data-cal-config='{"layout":"month_view","theme":"light"}'
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

