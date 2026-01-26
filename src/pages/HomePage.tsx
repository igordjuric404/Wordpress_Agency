import { Link } from 'react-router-dom';
import React, { useMemo, useEffect, useState, Fragment } from 'react';
import { 
  ArrowRight,
  Star,
  Target,
  Sparkles
} from 'lucide-react';
import { Button, Card, Section } from '../components/ui';
import { services } from '../data/services';
import { blogPosts } from '../data/blog';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ContactForm from '../components/ContactForm';
import AnimatedUnderline from '../components/AnimatedUnderline';
import EditableText from '../components/EditableText';
import { useLanguage } from '../hooks/useLanguage';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal: any;
  }
}

const processSteps = [
  {
    number: '01',
    icon: Target,
  },
  {
    number: '02',
    icon: Star,
  },
  {
    number: '03',
    icon: Sparkles,
  },
  {
    number: '04',
    icon: Target,
  },
  {
    number: '05',
    icon: Star,
  },
];

export default function HomePage() {
  useDocumentTitle('');
  
  // Initialize Cal.com embed
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Cal) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "15min", {origin:"https://app.cal.com"});
        Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#FF2D95"},"dark":{"cal-brand":"#FF2D95"}},"hideEventTypeDetails":false,"layout":"month_view"});
      `;
      document.head.appendChild(script);
    } else if (window.Cal) {
      window.Cal("init", "15min", {origin:"https://app.cal.com"});
      window.Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#FF2D95"},"dark":{"cal-brand":"#FF2D95"}},"hideEventTypeDetails":false,"layout":"month_view"});
    }
  }, []);
  const { t, language } = useLanguage();
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
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem-4px)] md:min-h-[calc(100vh-6rem-4px)] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          {/* Hero Image - Desktop (Absolute) */}
          <div className="hidden lg:block absolute right-20 bottom-0 w-[45%] max-w-[500px] z-0 pointer-events-none">
            <ScrollReveal animation="pop" delay={0.6} margin="100%">
              <img 
                src="/hero-visual.png" 
                alt="Hero illustration" 
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </ScrollReveal>
          </div>

          {/* Content - Full width on all screens */}
          <div className="relative z-10 max-w-4xl flex flex-col items-center lg:block text-center lg:text-left">
            {/* Header - First */}
            <ScrollReveal animation="slam" delay={0} margin="100%">
              <h1 className="font-extrabold text-[42px] sm:text-5xl md:text-6xl lg:text-6xl text-white mb-6 md:mb-8 relative tracking-tighter" style={{ lineHeight: '1.1' }}>
              <span className="font-sora whitespace-pre-line">
                <EditableText copyKey="hero.title" as="span">
                  {(() => {
                    const title = t('hero.title');
                    const lines = title.split('\n');
                    
                    // Determine which word to highlight based on language
                    const highlightWords: Record<string, string> = {
                      'en': 'Sell',
                      'sr': 'Zaradite',
                      'ru': 'Продавать'
                    };
                    const highlightWord = highlightWords[language] || '';
                    
                    if (lines.length === 3 && highlightWord) {
                      return (
                        <>
                          {lines[0]}
                          {'\n'}
                          {lines[1]}
                          {'\n'}
                          <span className="font-sora" style={{ display: 'block', marginTop: '0.2em' }}>
                            {lines[2].split(highlightWord).map((part, i, arr) => (
                              <Fragment key={i}>
                                <span className="font-sora">{part}</span>
                                {i < arr.length - 1 && (
                                  <span 
                                    className="bg-bold-yellow text-white px-2 border-3 border-neo-black font-display font-bold font-sora zaradite-highlight" 
                                    style={{ 
                                      textShadow: 'none',
                                      WebkitTextStroke: '3px #111111',
                                      paintOrder: 'stroke fill',
                                      filter: 'none'
                                    }}
                                  >
                                    {highlightWord}
                                  </span>
                                )}
                              </Fragment>
                            ))}
                          </span>
                        </>
                      );
                    }
                    return title;
                  })()}
                </EditableText>
              </span>
              </h1>
            </ScrollReveal>
            {/* Subheader - Second */}
            <ScrollReveal animation="snap" delay={0.15} margin="100%">
              <p className="font-body text-base md:text-lg lg:text-xl text-neo-gray-dark mb-6 md:mb-8 max-w-2xl">
              <EditableText copyKey="hero.subtitle" as="span" className="whitespace-pre-line">
                {(() => {
                  const subtitle = t('hero.subtitle');
                  const lines = subtitle.split('\n');
                  if (lines.length === 2) {
                    const firstLine = lines[0];
                    const secondLine = lines[1];
                    
                    // Define phrases to highlight for each language (without "and")
                    let phrase1 = '';
                    let phrase2 = '';
                    let conjunction = '';
                    if (language === 'en') {
                      phrase1 = 'more customers';
                      conjunction = ' and ';
                      phrase2 = 'more revenue';
                    } else if (language === 'sr') {
                      phrase1 = 'više kupaca';
                      conjunction = ' i ';
                      phrase2 = 'veći prihod';
                    } else if (language === 'ru') {
                      phrase1 = 'большего количества клиентов';
                      conjunction = ' и ';
                      phrase2 = 'увеличения дохода';
                    }
                    
                    // Split second line and highlight each phrase separately
                    const fullPhrase = phrase1 + conjunction + phrase2;
                    const parts = secondLine.split(fullPhrase);
                    if (parts.length === 2) {
                      return (
                        <>
                          {firstLine}
                          {'\n'}
                          {parts[0]}
                          <span className="text-bold-pink font-bold">{phrase1}</span>
                          {conjunction}
                          <span className="text-bold-pink font-bold">{phrase2}</span>
                          {parts[1]}
                        </>
                      );
                    }
                  }
                  return subtitle;
                })()}
              </EditableText>
              </p>
            </ScrollReveal>
            
            {/* CTAs */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-3 md:gap-4">
              {/* First CTA - Third */}
              <ScrollReveal animation="bounce" delay={0.3} margin="100%">
                <Button 
                  to="/services" 
                  variant="bold-pink" 
                  size="md" 
                  className="md:px-8 md:py-4 md:text-lg"
                >
                  {t('hero.cta.services')}
                </Button>
              </ScrollReveal>
              {/* Second CTA - Fourth */}
              <ScrollReveal animation="bounce" delay={0.45} margin="100%">
                <Button 
                  to="/contact" 
                  variant="bold-blue" 
                  size="md" 
                  className="md:px-8 md:py-4 md:text-lg"
                >
                  {t('hero.cta.contact')}
                </Button>
              </ScrollReveal>
            </div>

            {/* Hero Image - Mobile (Stacked below) */}
            <div className="lg:hidden mt-8 w-full max-w-[300px]">
              <ScrollReveal animation="pop" delay={0.6} margin="100%">
                <img 
                  src="/hero-visual.png" 
                  alt="Hero illustration" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <Section id="services-overview" className="pb-16 md:pb-16">
          <div className="text-center mb-8 md:mb-10">
            <ScrollReveal animation="pop" margin="-30%">
              <h2 className="font-extrabold text-4xl md:text-5xl mb-16 text-white relative">
                <span className="font-sora">What We </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Do</span>
              </h2>
            </ScrollReveal>
          </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto justify-center" staggerDelay={0.1}>
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
            const animations: Array<'wiggle' | 'twist' | 'pop'> = ['wiggle', 'twist', 'pop'];
            // Calculate delay based on position within row (0, 1, 2 for first row, 0, 1, 2 for second row)
            const rowPosition = index % 3;
            const itemDelay = rowPosition * 0.1;
            
            return (
              <StaggerItem key={service.id} animation={animations[index % animations.length]} useOwnViewport={true} delay={itemDelay} margin="-30%">
                <Card 
                  hoverable 
                  className="p-4 md:p-6 flex flex-col h-full"
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
                      <EditableText copyKey={`services.${service.id}.title`} as="span">
                        {t(`services.${service.id}.title`).split('\n').map((line, i, arr) => (
                          <span key={i}>
                            {line}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </EditableText>
                    </AnimatedUnderline>
                  </h3>
                </div>
                <p className="font-body text-sm md:text-base text-neo-black leading-relaxed flex-grow">
                  <EditableText copyKey={`services.${service.id}.description`} as="span">
                    {t(`services.${service.id}.description`)}
                  </EditableText>
                </p>
              </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Process Section */}
      <Section id="process" className="py-16 md:py-16">
          <div className="text-center mb-8 md:mb-10">
            <ScrollReveal animation="pop" margin="-30%">
              <h2 className="font-extrabold text-4xl md:text-5xl mb-16 text-white relative">
                <span className="font-sora">How We </span><span className="bg-bold-purple text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Work</span>
              </h2>
            </ScrollReveal>
          </div>
        
        <StaggerContainer className="space-y-4 md:space-y-5 max-w-4xl mx-auto" staggerDelay={0.1}>
          {processSteps.map((step, index) => {
            const stepKey = `process.step.${index + 1}`;
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
              <StaggerItem key={step.number} animation="snap" useOwnViewport={true}>
                <div className="flex flex-row gap-3 md:gap-4 items-start">
                <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 ${vibrantBg} text-white border-2 border-neo-black shadow-neo-sm flex items-center justify-center font-display font-black text-lg md:text-2xl`}>
                  {step.number}
                </div>
                <Card 
                  background={cardBg}
                  className="flex-1 p-3 md:p-5"
                >
                  <h3 className="font-display font-bold text-lg md:text-2xl mb-2 md:mb-3">{t(`${stepKey}.title`)}</h3>
                  <p className="font-body text-sm md:text-lg text-neo-black">{t(`${stepKey}.description`)}</p>
                </Card>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
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
            <ScrollReveal animation="pop" margin="-30%">
              <h2 className="font-extrabold text-4xl md:text-5xl mb-16 text-white relative">
                <span className="bg-bold-yellow text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Blog</span>
              </h2>
            </ScrollReveal>
          </div>
        
        {/* Blog cards - hidden on mobile */}
        <StaggerContainer className="hidden md:grid md:grid-cols-3 gap-4 md:gap-6" staggerDelay={0.1}>
          {blogPosts.slice(0, 3).map((post, index) => {
            const cardBgs: ('soft-pink' | 'soft-yellow' | 'soft-blue' | 'soft-purple' | 'white')[] = ['soft-purple', 'soft-pink', 'soft-yellow'];
            const cardBg = cardBgs[index % cardBgs.length];
            const vibrantText = ['text-bold-pink', 'text-bold-blue', 'text-bold-purple'];
            const textColor = vibrantText[index % vibrantText.length];
            const animations: Array<'pop' | 'wiggle' | 'twist'> = ['pop', 'wiggle', 'twist'];

            return (
              <StaggerItem key={post.slug} animation={animations[index % animations.length]}>
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <Card hoverable className="flex flex-col h-full" as="article" background={cardBg}>
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
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        
        <ScrollReveal animation="bounce" delay={0.2}>
          <div className="text-center mt-8 md:mt-12">
          {/* Mobile: different CTA text */}
          <Button to="/blog" variant="vibrant-yellow" className="md:hidden">
            {t('blog.cta.mobile')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          {/* Desktop: original CTA */}
          <Button to="/blog" variant="vibrant-yellow" className="hidden md:inline-flex text-lg">
            {t('blog.cta.desktop')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* CTA Band */}
      <section className="bg-neo-black text-white overflow-hidden relative py-16 md:py-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bold-pink/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-bold-blue/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="neo-container relative z-10 text-center">
          <ScrollReveal animation="pop" margin="-30%">
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl mx-auto">
              {t('cta.title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="pop" delay={0.1} margin="-30%">
            <p className="font-body text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-8 font-medium">
              {t('cta.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal animation="pop" delay={0.2} margin="-30%">
            <Button 
              to="/contact" 
              variant="bold-yellow" 
              size="md" 
              className="md:px-8 md:py-4 md:text-lg"
            >
              {t('cta.button.contact')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <Section id="contact" className="py-16 md:py-16">
          <div className="text-center mb-8 md:mb-12">
            <ScrollReveal animation="pop" margin="-30%">
              <h2 className="font-extrabold text-4xl md:text-5xl mb-16 text-white relative">
                <span className="font-sora">Contact </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Us</span>
              </h2>
            </ScrollReveal>
          </div>
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start" staggerDelay={0.15}>
          {/* Form on Left */}
          <StaggerItem animation="wiggle">
            <div className="bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-4 md:p-8 rounded-[10px]">
            <h3 className="font-display font-black text-xl md:text-3xl mb-3 md:mb-4 text-center">
              Send us a <span className="bg-bold-pink text-white px-2 border-3 border-neo-black shadow-neo-sm">Message</span>
            </h3>
            <ContactForm />
            </div>
          </StaggerItem>
          
          {/* Scheduling Section on Right */}
          <StaggerItem animation="twist">
            <div className="bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-4 md:p-8 rounded-[10px]">
            <h3 className="font-display font-black text-xl md:text-3xl mb-3 md:mb-4 text-center">
               Book a <span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm">Call</span>
            </h3>
            <p className="font-body text-sm md:text-lg text-neo-black mb-4 md:mb-6 mt-6 md:mt-11 font-bold whitespace-pre-line">
              Prefer to discuss your project in a call?{'\n'}Book a time that works for you.
            </p>
            <Button
              variant="bold-blue"
              size="md"
              className="w-full md:px-8 md:py-4 md:text-lg"
              data-cal-link="igordjuric/15min"
              data-cal-namespace="15min"
              data-cal-config='{"layout":"month_view","theme":"light"}'
            >
              Schedule a Call
            </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Section>
    </div>
  );
}

