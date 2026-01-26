import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Zap, Shield } from 'lucide-react';
import { Section, Button, Card } from '../components/ui';
import Hoverable from '../components/ui/hoverable';
import { portfolioItems } from '../data/portfolio';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';

export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const project = portfolioItems.find(p => p.slug === slug);
  const currentIndex = portfolioItems.findIndex(p => p.slug === slug);
  
  useDocumentTitle(project ? `${project.title} - Portfolio` : 'Project Not Found');
  
  if (!project) {
    return <Navigate to="/" replace />;
  }

  const prevProject = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-transparent py-3">
        <div className="neo-container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-display font-black">
              <li>
                <Link to="/" className="text-neo-black hover:text-bold-pink transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neo-black">/</li>
              <li>
                <Link to="/#portfolio" className="text-neo-black hover:text-bold-pink transition-colors">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden="true" className="text-neo-black">/</li>
              <li>
                <span className="text-neo-black">{project.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <Section>
        <ScrollReveal animation="snap">
          <Hoverable as="span">
            <Link 
              to="/#portfolio"
              className="inline-flex items-center gap-2 font-display font-black text-neo-black transition-colors mb-8 bg-white px-4 py-2 border-3 border-neo-black"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Portfolio
            </Link>
          </Hoverable>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <ScrollReveal animation="snap">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-bold-yellow text-neo-black font-black px-4 py-1 text-xs border-2 border-neo-black shadow-neo-sm uppercase">
                  {project.category}
                </span>
                <span className="bg-neo-black text-white font-black px-4 py-1 text-xs border-2 border-neo-black shadow-neo-sm uppercase">
                  Demo Project
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="slam" delay={0.05}>
              <h1 className="font-sora font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-8 leading-tight">
                {project.title}
              </h1>
            </ScrollReveal>
            
            <ScrollReveal animation="wiggle" delay={0.1}>
              <p className="font-body text-xl text-neo-black mb-10 font-bold bg-white/40 p-6 border-3 border-neo-black shadow-neo">
                {project.shortDescription}
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="bounce" delay={0.15}>
              <div className="flex items-center gap-4 text-sm font-black bg-white p-3 border-2 border-neo-black inline-flex">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-bold-pink" />
                  <span className="uppercase tracking-widest">{project.timeline}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal animation="pop" delay={0.1}>
            <div className="aspect-video bg-neo-black border-4 border-neo-black shadow-neo-vibrant-blue flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-bold-blue/20 to-transparent group-hover:opacity-40 transition-opacity"></div>
              <span className="font-display font-black text-white text-2xl z-10 uppercase tracking-tighter italic">
                [Project Screenshot]
              </span>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Project Details */}
      <Section>
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goal */}
          <StaggerItem animation="wiggle">
            <Card className="border-4 shadow-neo-vibrant-pink h-full" background="white">
              <h2 className="font-display font-black text-2xl mb-4 uppercase tracking-tighter">The Goal</h2>
              <p className="font-body text-lg text-neo-black font-bold leading-relaxed">{project.goal}</p>
            </Card>
          </StaggerItem>
          
          {/* Approach */}
          <StaggerItem animation="twist" className="lg:col-span-2">
            <Card className="border-4 shadow-neo-vibrant-green h-full" background="white">
              <h2 className="font-display font-black text-2xl mb-4 uppercase tracking-tighter">The Approach</h2>
              <p className="font-body text-lg text-neo-black font-bold leading-relaxed">{project.approach}</p>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </Section>

      {/* Features */}
      <Section>
        <ScrollReveal animation="pop">
          <h2 className="font-display font-black text-3xl md:text-5xl mb-12 text-center uppercase">
            Key <span className="text-bold-pink">Features</span>
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.features.map((feature, index) => {
            const colors = ['text-bold-pink', 'text-bold-green', 'text-bold-yellow', 'text-bold-blue', 'text-bold-purple'];
            const color = colors[index % colors.length];
            const animations: Array<'pop' | 'wiggle' | 'twist'> = ['pop', 'wiggle', 'twist'];

            return (
              <StaggerItem key={index} animation={animations[index % animations.length]}>
                <Hoverable className="flex items-start gap-4 bg-white border-4 border-neo-black p-6 h-full">
                  <CheckCircle className={`w-8 h-8 ${color} flex-shrink-0 mt-0.5`} />
                  <span className="font-display font-black text-lg leading-tight">{feature}</span>
                </Hoverable>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Technical Notes */}
      <Section>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem animation="wiggle">
            <Card className="border-4 shadow-neo-vibrant-yellow h-full" background="white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-bold-yellow border-4 border-neo-black flex items-center justify-center shadow-neo-sm">
                  <Zap className="w-8 h-8 text-neo-black" />
                </div>
                <h2 className="font-display font-black text-2xl uppercase italic">Performance</h2>
              </div>
              <p className="font-body text-lg text-neo-black font-bold leading-relaxed">{project.performanceNotes}</p>
            </Card>
          </StaggerItem>
          
          <StaggerItem animation="twist">
            <Card className="border-4 shadow-neo-vibrant-blue h-full" background="white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-bold-blue border-4 border-neo-black flex items-center justify-center shadow-neo-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-display font-black text-2xl uppercase italic">Accessibility</h2>
              </div>
              <p className="font-body text-lg text-neo-black font-bold leading-relaxed">{project.accessibilityNotes}</p>
            </Card>
          </StaggerItem>
        </StaggerContainer>
        
        <ScrollReveal animation="slam" delay={0.2}>
          <div className="mt-12 bg-neo-black text-white border-4 border-neo-black p-8 text-center shadow-neo relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-bold-pink"></div>
            <p className="font-display font-black text-2xl md:text-3xl relative z-10 italic">
              {project.hypotheticalMetric}
            </p>
            <p className="font-body text-sm text-white/60 mt-4 uppercase tracking-widest relative z-10">
              * Hypothetical outcome based on industry benchmarks
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* Navigation */}
      <Section>
        <StaggerContainer className="flex flex-col sm:flex-row justify-between gap-6" staggerDelay={0.1}>
          {prevProject ? (
            <StaggerItem animation="snap" className="flex-1">
              <Hoverable as="span">
                <Link
                  to={`/portfolio/${prevProject.slug}`}
                  className="flex items-center gap-6 p-6 bg-white border-4 border-neo-black transition-all group"
                >
                  <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center group-hover:bg-bold-pink transition-colors">
                    <ArrowLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <span className="text-xs text-neo-black font-black uppercase tracking-widest">Previous</span>
                    <p className="font-display font-black text-xl leading-tight">{prevProject.title}</p>
                  </div>
                </Link>
              </Hoverable>
            </StaggerItem>
          ) : <div className="flex-1" />}
          
          {nextProject ? (
            <StaggerItem animation="snap" className="flex-1">
              <Hoverable as="span">
                <Link
                  to={`/portfolio/${nextProject.slug}`}
                  className="flex items-center justify-between gap-6 p-6 bg-white border-4 border-neo-black transition-all group text-right"
                >
                  <div>
                    <span className="text-xs text-neo-black font-black uppercase tracking-widest">Next</span>
                    <p className="font-display font-black text-xl leading-tight">{nextProject.title}</p>
                  </div>
                  <div className="w-12 h-12 bg-neo-black text-white flex items-center justify-center group-hover:bg-bold-blue transition-colors">
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Hoverable>
            </StaggerItem>
          ) : <div className="flex-1" />}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <section className="bg-neo-black py-8 md:py-12 text-white h-[calc(100vh-4rem-4px)] md:h-[calc(100vh-6rem-4px)] overflow-hidden">
        <div className="neo-container text-center">
          <ScrollReveal animation="slam">
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-8">
              Ready to <span className="text-bold-yellow underline underline-offset-8">Start</span> Your Project?
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="snap" delay={0.1}>
            <p className="font-body text-xl text-white/90 max-w-2xl mx-auto mb-12 font-bold leading-relaxed">
              Let's discuss how we can bring similar results to your WordPress project.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="bounce" delay={0.2}>
            <Button 
              to="/contact" 
              variant="secondary" 
              size="md" 
              className="bg-bold-green text-neo-black shadow-neo-vibrant-pink font-black uppercase md:px-12 md:py-5 md:text-xl"
            >
              Get a Free Quote
              <ArrowRight className="ml-2 w-7 h-7" />
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
