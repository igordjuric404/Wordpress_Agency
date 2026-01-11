import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ClickSpark from './ClickSpark';
import ScrollRestoration from './ScrollRestoration';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Header />
      
      <main id="main-content" className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      <ClickSpark />
    </div>
  );
}
