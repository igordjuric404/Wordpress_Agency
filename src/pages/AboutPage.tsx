import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../hooks/useLanguage';
import { Section } from '../components/ui';
import ScrollReveal from '../components/ScrollReveal';

export default function AboutPage() {
  useDocumentTitle('About');
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="slam" margin="100%">
              <h1 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-tight">
                {(() => {
                  const title = t('about.title');
                  const neoPressIndex = title.indexOf('NeoPress');
                  if (neoPressIndex === -1) {
                    return title;
                  }
                  const before = title.substring(0, neoPressIndex);
                  const after = title.substring(neoPressIndex + 'NeoPress'.length);
                  return (
                    <>
                      {before}
                      <span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>NeoPress</span>
                      {after}
                    </>
                  );
                })()}
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="twist" delay={0.20}>
            <div className="bg-white border-3 border-neo-black shadow-neo-lg p-6 md:p-10 rounded-[10px]">
              <div className="prose-neo">
                {t('about.content').split('\n\n').map((paragraph, i) => (
                  <p key={i} className="font-body text-base md:text-lg text-neo-black mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </div>
  );
}
