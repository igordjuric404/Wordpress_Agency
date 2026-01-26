import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../hooks/useLanguage';

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found');
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem-4px)] md:min-h-[calc(100vh-6rem-4px)] flex items-center">
      <div className="neo-container">
        <div className="text-center max-w-3xl mx-auto">
          {/* Large 404 */}
          <div className="relative inline-block mb-10">
            <span className="font-display font-black text-[100px] md:text-[160px] text-neo-black leading-none select-none">
              404
            </span>
          </div>
          
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-neo-black mb-4">
            {t('404.title')}
          </h1>
          
          <p className="font-body text-base md:text-lg text-neo-gray-dark mb-8 max-w-xl mx-auto">
            {t('404.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              to="/" 
              variant="bold-blue" 
              size="md"
              className="md:px-8 md:py-4 md:text-lg"
            >
              <Home className="mr-2 w-5 h-5" />
              {t('404.goHome')}
            </Button>
            <Button 
              onClick={() => window.history.back()} 
              variant="custom"
              size="md"
              className="bg-white text-neo-black md:px-8 md:py-4 md:text-lg"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              {t('404.goBack')}
            </Button>
          </div>
          
          <div className="pt-8 border-t border-neo-black/10">
            <p className="font-body text-sm text-neo-gray-dark mb-4">
              {t('404.helpText')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/services" variant="soft-pink" size="sm">
                {t('nav.services')}
              </Button>
              <Button to="/about" variant="soft-green" size="sm">
                {t('nav.about')}
              </Button>
              <Button to="/blog" variant="soft-yellow" size="sm">
                {t('nav.blog')}
              </Button>
              <Button to="/contact" variant="soft-blue" size="sm">
                {t('nav.contact')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
