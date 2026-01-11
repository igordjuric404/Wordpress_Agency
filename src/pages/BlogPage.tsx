import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button, Card, Section } from '../components/ui';
import { blogPosts } from '../data/blog';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

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
  const mainRef = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div ref={mainRef}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="reveal font-sora font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight pb-8">
              <span className="bg-bold-blue text-white px-2 border-3 border-neo-black shadow-neo-sm font-display font-bold" style={{ textShadow: 'none' }}>Blog</span>
            </h1>
            <p className="reveal font-body text-base md:text-lg lg:text-xl text-neo-gray-dark max-w-2xl mx-auto">
              Practical tips on WordPress development, performance, and security.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <Section>
        <div className="flex flex-wrap justify-start gap-3" role="tablist" aria-label="Filter posts by category">
          {categories.map((category, index) => {
            const hoverColors = ['hover:bg-bold-pink', 'hover:bg-bold-green', 'hover:bg-bold-yellow', 'hover:bg-bold-blue', 'hover:bg-bold-purple', 'hover:bg-bold-pink'];
            const hoverColor = hoverColors[index % hoverColors.length];
            
            return (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant="custom"
                size="sm"
                role="tab"
                aria-selected={activeCategory === category}
                className={`px-5 py-2 text-sm ${
                  activeCategory === category 
                    ? 'bg-bold-pink text-white' 
                    : `bg-white text-neo-black ${hoverColor} hover:text-white`
                }`}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </Section>

      {/* Posts Grid */}
      <Section>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-display font-bold text-xl text-neo-black">
              No posts found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPosts.map((post) => {
              const colors = getCategoryColors(post.category);

              return (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="block">
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
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </Section>

      {/* Newsletter CTA */}
      {/* <Section className="py-16 md:py-24">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="reveal font-display font-bold text-3xl md:text-4xl mb-4">
            Stay <span className="bg-bold-purple text-white px-2 border-3 border-neo-black shadow-neo-sm">Updated</span>
          </h2>
        </div>
        
        <div className="max-w-lg mx-auto">
          <p className="reveal font-body text-base md:text-lg text-neo-black mb-6 text-center">
            Get WordPress insights delivered to your inbox. No spam, just practical content.
          </p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border-3 border-neo-black bg-white text-neo-black placeholder:text-neo-black/50 font-body focus:outline-none"
              aria-label="Email address"
            />
            <Button type="submit" variant="bold-pink">
              Subscribe
            </Button>
          </form>
        </div>
      </Section> */}
    </div>
  );
}
