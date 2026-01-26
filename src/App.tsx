import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CopyEditProvider } from './contexts/CopyEditContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Display loading screen for 2.3 seconds (0.8s text entry + 1.2s bar fill + buffer)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <CopyEditProvider>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingOverlay key="loader" />
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Router>
                <ScrollToTop />
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Layout>
              </Router>
            </motion.div>
          )}
        </AnimatePresence>
      </CopyEditProvider>
    </LanguageProvider>
  );
}

export default App;
