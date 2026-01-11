import { ArrowRight } from 'lucide-react';
import { Button, Card, Section } from '../components/ui';
import { services } from '../data/services';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function ServicesPage() {
  useDocumentTitle('Services');
  const mainRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={mainRef}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="reveal font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight pb-8">
              <span className="font-sora">Our </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Services</span>
            </h1>
            <p className="reveal font-body text-base md:text-lg lg:text-xl text-neo-gray-dark max-w-2xl mx-auto">
              We specialize in building fast, secure, and maintainable WordPress solutions focused on delivering measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const backgrounds: ('soft-pink' | 'soft-green' | 'soft-yellow' | 'soft-blue' | 'soft-purple' | 'soft-orange' | 'white')[] = ['soft-orange', 'soft-yellow', 'soft-blue', 'soft-purple', 'white', 'soft-green'];
            const vibrantColors = ['text-bold-orange', 'text-bold-yellow', 'text-bold-blue', 'text-bold-purple', 'text-bold-green', 'text-bold-pink'];
            const bg = backgrounds[index % backgrounds.length];
            const color = vibrantColors[index % vibrantColors.length];
            
            return (
              <Card 
                key={service.id} 
                hoverable 
                className="reveal p-5 md:p-6 flex flex-col h-full"
                as="article"
                background={bg === 'white' ? undefined : bg}
              >
                <service.icon className={`w-10 h-10 md:w-12 md:h-12 ${color} mb-4 flex-shrink-0`} />
                <h3 className="font-display font-bold text-xl md:text-2xl mb-3">
                  {service.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < service.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="font-body text-sm md:text-base text-neo-black leading-relaxed flex-grow">
                  {service.shortDescription}
                </p>
              </Card>
            );
          })}
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
            <Button to="/contact" variant="bold-yellow" size="lg">
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
