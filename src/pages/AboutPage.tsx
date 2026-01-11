import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';


export default function AboutPage() {
  useDocumentTitle('About');
  const mainRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={mainRef}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="reveal font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-tight">
              <span className="font-sora">About </span><span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Us</span>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
