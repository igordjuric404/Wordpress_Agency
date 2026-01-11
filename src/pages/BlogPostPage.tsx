import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Section, Button, Card } from '../components/ui';
import { blogPosts } from '../data/blog';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const mainRef = useScrollReveal<HTMLDivElement>();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  useDocumentTitle(post?.title || 'Post Not Found');
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div ref={mainRef}>
      {/* Article Header */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-4 md:pb-6">
        <div className="neo-container">
          <div className="max-w-3xl mx-auto">
            <div className="reveal mb-6">
              <span className="bg-neo-black text-white font-black px-3 py-1 text-sm">
                {post.category}
              </span>
            </div>
            
            <h1 className="reveal font-sora font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="reveal flex flex-wrap items-center gap-6 text-sm text-neo-black font-bold mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="reveal flex items-center gap-3">
              <span className="font-display font-bold text-sm">Share:</span>
              <Button
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                variant="bold-blue"
                size="sm"
                className="!p-2"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                variant="bold-pink"
                size="sm"
                className="!p-2"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="bold-yellow"
                size="sm"
                className="!p-2"
                aria-label="Copy link to clipboard"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative overflow-hidden">
        <div className="neo-container">
          <div className="max-w-3xl mx-auto">
            <div className="reveal aspect-video bg-neo-white border-3 border-neo-black shadow-neo mb-8 flex items-center justify-center">
              <span className="font-display font-black text-black text-lg">Featured Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <Section>
        <article className="max-w-3xl mx-auto">
          <Card className="reveal p-6 md:p-10" background="soft-yellow">
            <div 
              className="prose-neo"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </Card>
        </article>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="reveal font-display font-bold text-3xl md:text-4xl mb-4">
              Related <span className="bg-bold-pink text-white px-2 border-3 border-neo-black shadow-neo-sm">Articles</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {relatedPosts.map((relatedPost, index) => {
              const cardBgs: ('soft-pink' | 'soft-blue')[] = ['soft-pink', 'soft-blue'];
              const cardBg = cardBgs[index % cardBgs.length];

              return (
                <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="block">
                  <Card
                    hoverable
                    className="reveal p-5 md:p-6"
                    background={cardBg}
                    as="article"
                  >
                    <span className="bg-neo-black text-white font-black px-2 py-0.5 text-xs mb-3 inline-block">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-display font-bold text-xl mb-3 leading-tight">
                      {relatedPost.title}
                    </h3>
                    <p className="font-body text-[15px] text-neo-black mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 font-display font-black text-neo-black text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {/* CTA Band */}
      <section className="bg-neo-black text-white overflow-hidden relative py-16 md:py-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bold-pink/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-bold-blue/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="neo-container relative z-10 text-center">
          <h2 className="reveal font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl mx-auto">
            Need WordPress <span className="text-bold-yellow italic">Help?</span>
          </h2>
          <p className="reveal font-body text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-8 font-medium">
            We can help you implement these strategies and more. Let's discuss your project.
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

// Simple markdown-like content formatter
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Checkmarks
    .replace(/^✅ (.*$)/gm, '<p class="flex items-start gap-2"><span class="text-neo-black">✓</span> $1</p>')
    // Lists
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    // Paragraphs (simple approach)
    .split('\n\n')
    .map(block => {
      if (block.trim().startsWith('<')) return block;
      if (block.trim().startsWith('- ')) return `<ul>${block}</ul>`;
      return `<p>${block}</p>`;
    })
    .join('');
}
