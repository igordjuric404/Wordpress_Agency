import { ArrowRight } from 'lucide-react';
import { Button, Card, Section } from '../components/ui';
import { services } from '../data/services';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../hooks/useLanguage';
import EditableText from '../components/EditableText';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';

export default function ServicesPage() {
  useDocumentTitle('Services');
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="slam">
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-tight">
                <span className="font-sora">What We </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Do</span>
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto" margin="-100px" delay={0.15} staggerDelay={0.1}>
          {services.map((service, index) => {
            const backgrounds: ('soft-pink' | 'soft-green' | 'soft-yellow' | 'soft-blue' | 'soft-purple' | 'soft-orange' | 'white')[] = ['soft-orange', 'soft-yellow', 'soft-blue', 'soft-purple', 'white', 'soft-green'];
            const vibrantColors = ['text-bold-orange', 'text-bold-yellow', 'text-bold-blue', 'text-bold-purple', 'text-bold-green', 'text-bold-pink'];
            const bg = backgrounds[index % backgrounds.length];
            const color = vibrantColors[index % vibrantColors.length];
            const animations: Array<'wiggle' | 'twist' | 'pop'> = ['wiggle', 'twist', 'pop'];
            
            return (
              <StaggerItem key={service.id} animation={animations[index % animations.length]}>
                <Card 
                  hoverable 
                  className="p-4 md:p-6 flex flex-col h-full"
                  as="article"
                  background={bg === 'white' ? undefined : bg}
                >
                  {/* Mobile: icon + title side by side */}
                  <div className="flex items-center gap-3 md:block mb-2 md:mb-0">
                    <service.icon className={`w-10 h-10 md:w-12 md:h-12 ${color} flex-shrink-0 md:mb-4`} />
                    <h3 className="font-display font-bold text-lg md:text-2xl md:mb-3">
                      <EditableText copyKey={`services.${service.id}.title`} as="span">
                        {t(`services.${service.id}.title`).split('\n').map((line, i, arr) => (
                          <span key={i}>
                            {line}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </EditableText>
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

      {/* CTA Band */}
      <section className="bg-neo-black text-white overflow-hidden relative py-16 md:py-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bold-pink/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-bold-blue/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="neo-container relative z-10 text-center">
          <ScrollReveal animation="slam">
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl mx-auto">
              {t('cta.title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="snap" delay={0.1}>
            <p className="font-body text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-8 font-medium">
              {t('cta.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal animation="bounce" delay={0.2}>
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
    </div>
  );
}
