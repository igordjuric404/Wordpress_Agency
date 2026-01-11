import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Section, Button } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const faqs = [
  {
    question: 'What does your typical process look like?',
    answer: 'Every project starts with a Discovery phase where we understand your goals, constraints, and requirements. From there, we move through UX/UI planning, iterative development with regular check-ins, thorough QA and testing, and finally launch with post-launch support.',
  },
  {
    question: 'How long does a typical WordPress project take?',
    answer: 'Timeline depends on scope. A focused landing page might take 2-3 weeks. A full custom WordPress site typically ranges from 4-8 weeks. Complex implementations can take 8-12+ weeks.',
  },
  {
    question: 'What\'s your approach to project pricing?',
    answer: 'We offer both fixed-scope projects and retainer-based engagements. Fixed-scope works well for clearly defined builds. Retainers are better for ongoing partnerships or projects with evolving scope.',
  },
  {
    question: 'Do you work with existing WordPress sites?',
    answer: 'Absolutely. We regularly take over maintenance of existing sites, optimize underperforming WordPress installations, and incrementally improve legacy builds.',
  },
  {
    question: 'What happens after the site launches?',
    answer: 'Every project includes a post-launch support period (typically 2-4 weeks). For ongoing maintenance, we offer retainer packages that include updates, security monitoring, and priority support.',
  },
];

export default function ContactPage() {
  useDocumentTitle('Contact');
  const mainRef = useScrollReveal<HTMLDivElement>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div ref={mainRef}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="reveal font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight pb-8">
              <span className="font-sora">Contact </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Us</span>
            </h1>
            <p className="reveal font-body text-base md:text-lg lg:text-xl text-neo-gray-dark max-w-2xl mx-auto">
              Tell us about your WordPress project. We typically respond within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start max-w-6xl mx-auto">
          {/* Form */}
          <div className="reveal bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-6 md:p-8 rounded-[10px]">
            <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-center">
              Send us a <span className="bg-bold-pink text-white px-2 border-3 border-neo-black shadow-neo-sm">Message</span>
            </h3>
            <ContactForm />
          </div>
          
          {/* Scheduling Section */}
          <div className="reveal bg-white border-2 md:border-3 border-neo-black shadow-neo-lg p-6 md:p-8 rounded-[10px]">
            <h3 className="font-display font-black text-2xl md:text-3xl mb-4 text-center">
              Book a <span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm">Call</span>
            </h3>
            <p className="font-body text-base md:text-lg text-neo-black mb-6 font-bold">
              Prefer to discuss your project in a call? Book a time that works for you.
            </p>
            <Button
              variant="bold-blue"
              size="lg"
              className="w-full"
              data-cal-link="igordjuric/15min"
              data-cal-namespace="15min"
              data-cal-config='{"layout":"month_view","theme":"light"}'
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="text-center mb-8 md:mb-10">
          <h2 className="reveal font-display font-bold text-3xl md:text-4xl mb-4">
            Frequently Asked <span className="bg-bold-purple text-white px-2 border-3 border-neo-black shadow-neo-sm">Questions</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const vibrantBgs = ['bg-bold-pink', 'bg-bold-blue', 'bg-bold-yellow', 'bg-bold-purple', 'bg-bold-green'];
            const vibrantBg = vibrantBgs[index % vibrantBgs.length];
            const isOpen = openFaq === index;
            
            return (
              <div 
                key={index}
                className="reveal bg-white border-3 border-neo-black shadow-neo rounded-[10px]"
              >
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
            );
          })}
        </div>
      </Section>
    </div>
  );
}
