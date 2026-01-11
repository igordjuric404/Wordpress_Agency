import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found');

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
            Page Not Found
          </h1>
          
          <p className="font-body text-base md:text-lg text-neo-gray-dark mb-8 max-w-xl mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button to="/" variant="bold-blue" size="lg">
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
            <Button 
              onClick={() => window.history.back()} 
              variant="custom"
              size="lg"
              className="bg-white text-neo-black"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>
          
          <div className="pt-8 border-t border-neo-black/10">
            <p className="font-body text-sm text-neo-gray-dark mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/services" variant="soft-pink" size="sm">
                Services
              </Button>
              <Button to="/about" variant="soft-green" size="sm">
                About
              </Button>
              <Button to="/blog" variant="soft-yellow" size="sm">
                Blog
              </Button>
              <Button to="/contact" variant="soft-blue" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
