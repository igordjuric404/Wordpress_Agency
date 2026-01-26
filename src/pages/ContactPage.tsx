import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Section, Button } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../hooks/useLanguage';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal: any;
  }
}

const getFaqs = (t: (key: string) => string) => [
  {
    question: t('faq.q1.question'),
    answer: t('faq.q1.answer'),
  },
  {
    question: t('faq.q2.question'),
    answer: t('faq.q2.answer'),
  },
  {
    question: t('faq.q3.question'),
    answer: t('faq.q3.answer'),
  },
  {
    question: t('faq.q4.question'),
    answer: t('faq.q4.answer'),
  },
  {
    question: t('faq.q5.question'),
    answer: t('faq.q5.answer'),
  },
];

export default function ContactPage() {
  useDocumentTitle('Contact');
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = getFaqs(t);
  
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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      <section className="relative overflow-hidden pt-12 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="slam">
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-tight">
                <span className="font-sora">Contact </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Us</span>
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Section>
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start max-w-6xl mx-auto" staggerDelay={0.15} delay={0.15}>
          <StaggerItem animation="wiggle">
            <div className="bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-6 md:p-8 rounded-[10px]">
              <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-center">
                {t('contact.form.title').split(t('contact.form.title.highlight')).map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && <span className="bg-bold-pink text-white px-2 border-3 border-neo-black shadow-neo-sm">{t('contact.form.title.highlight')}</span>}
                  </React.Fragment>
                ))}
              </h3>
              <ContactForm />
            </div>
          </StaggerItem>
          
          <StaggerItem animation="twist">
            <div className="bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-6 md:p-8 rounded-[10px]">
              <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-center">
                {t('contact.schedule.title').split(t('contact.schedule.title.highlight')).map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && <span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm">{t('contact.schedule.title.highlight')}</span>}
                  </React.Fragment>
                ))}
              </h3>
              <p className="font-body text-base md:text-lg text-neo-black mb-6 mt-11 font-bold whitespace-pre-line">
                {t('contact.schedule.description')}
              </p>
              <Button
                variant="bold-blue"
                size="lg"
                className="w-full text-[18px]"
                data-cal-link="igordjuric/15min"
                data-cal-namespace="15min"
                data-cal-config='{"layout":"month_view","theme":"light"}'
              >
                {t('contact.schedule.button')}
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Section>

      <Section>
        <div className="text-center mb-8 md:mb-10">
          <ScrollReveal animation="pop">
            <h2 className="font-display font-bold text-2xl md:text-4xl mb-16">
              <span className="bg-bold-purple text-white px-2 border-3 border-neo-black shadow-neo-sm whitespace-nowrap">{t('faq.title')}</span>
            </h2>
          </ScrollReveal>
        </div>
        
        <StaggerContainer className="max-w-4xl mx-auto space-y-4" staggerDelay={0.08} delay={0.15}>
          {faqs.map((faq, index) => {
            const vibrantBgs = ['bg-bold-pink', 'bg-bold-blue', 'bg-bold-yellow', 'bg-bold-purple', 'bg-bold-green'];
            const vibrantBg = vibrantBgs[index % vibrantBgs.length];
            const isOpen = openFaq === index;
            
            return (
              <StaggerItem key={index} animation="snap">
                <div className="bg-white border-3 border-neo-black shadow-neo rounded-[10px]">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-display font-bold text-lg md:text-xl pr-4 leading-tight">{faq.question}</span>
                    <span className="neo-shadow-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
                      <span 
                        className={`flex-shrink-0 w-10 h-10 ${vibrantBg} text-white border-2 border-neo-black rounded-[10px] flex items-center justify-center transition-all duration-300 ease-out hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[4px] active:translate-y-[4px] transform-gpu relative z-10`}
                        style={{
                          transitionProperty: 'transform',
                          transitionDuration: '150ms',
                          transitionTimingFunction: 'ease-in-out',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden'
                        }}
                      >
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                        />
                      </span>
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className="grid transition-all duration-400 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-0">
                        <p className="font-body text-base text-neo-black leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>
    </div>
  );
}
