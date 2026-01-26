import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button, Card, Section } from '../components/ui';
import { blogPosts } from '../data/blog';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../hooks/useLanguage';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';

const categories = ['All', 'Tutorials', 'Performance', 'Security', 'Development', 'SEO'];

// Map categories to their colors (matching filter buttons)
const getCategoryColors = (category: string) => {
  const colorMap: Record<string, { bg: 'soft-pink' | 'soft-green' | 'soft-yellow' | 'soft-blue' | 'soft-purple', text: 'text-bold-pink' | 'text-bold-green' | 'text-bold-yellow' | 'text-bold-blue' | 'text-bold-purple' }> = {
    'Tutorials': { bg: 'soft-green', text: 'text-bold-green' },
    'Performance': { bg: 'soft-yellow', text: 'text-bold-yellow' },
    'Security': { bg: 'soft-blue', text: 'text-bold-blue' },
    'Development': { bg: 'soft-purple', text: 'text-bold-purple' },
    'SEO': { bg: 'soft-pink', text: 'text-bold-pink' },
  };
  
  // Default to pink if category not found
  return colorMap[category] || { bg: 'soft-pink', text: 'text-bold-pink' };
};

export default function BlogPage() {
  useDocumentTitle('Blog');
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="slam">
              <h1 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-tight">
                <span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Blog</span>
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <Section className="pt-4 md:pt-8">
        <div role="tablist" aria-label="Filter posts by category">
          <StaggerContainer className="flex flex-wrap justify-start gap-2 md:gap-3" delay={0.25} staggerDelay={0.1}>
            {categories.map((category, index) => {
              const hoverColors = ['hover:bg-bold-pink', 'hover:bg-bold-green', 'hover:bg-bold-yellow', 'hover:bg-bold-blue', 'hover:bg-bold-purple', 'hover:bg-bold-pink'];
              const hoverColor = hoverColors[index % hoverColors.length];
              
              return (
                <StaggerItem key={category} animation="pop">
                  <Button
                    onClick={() => setActiveCategory(category)}
                    variant="custom"
                    size="sm"
                    role="tab"
                    aria-selected={activeCategory === category}
                    className={`px-3 py-1.5 text-xs md:px-5 md:py-2 md:text-sm ${
                      activeCategory === category 
                        ? 'bg-bold-pink text-white' 
                        : `bg-white text-neo-black ${hoverColor} hover:text-white`
                    }`}
                  >
                    {category}
                  </Button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </Section>

      {/* Posts Grid */}
      <Section>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-display font-bold text-xl text-neo-black">
              {t('blog.emptyState')}
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" key={activeCategory} delay={0.6} staggerDelay={0.1}>
            {filteredPosts.map((post, index) => {
              const colors = getCategoryColors(post.category);
              const animations: Array<'pop' | 'wiggle' | 'twist'> = ['pop', 'wiggle', 'twist'];

              return (
                <StaggerItem key={post.slug} animation={animations[index % animations.length]}>
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <Card 
                      hoverable 
                      className="flex flex-col h-full" 
                      as="article"
                      background={colors.bg}
                    >
                      <div className="aspect-video bg-white border-3 border-neo-black mb-4 flex items-center justify-center shadow-neo-sm">
                        <span className={`font-display font-black ${colors.text} text-xl text-center px-4 line-clamp-3`}>
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
                        {t('blog.readMore')}
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </Section>
    </div>
  );
}
