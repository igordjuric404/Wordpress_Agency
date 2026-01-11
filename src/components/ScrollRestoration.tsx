import { useEffect } from 'react';

export default function ScrollRestoration() {
  useEffect(() => {
    // Restore scroll position IMMEDIATELY and SYNCHRONOUSLY
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      // Disable smooth scrolling temporarily
      const html = document.documentElement;
      const originalScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      
      // Scroll instantly
      window.scrollTo({
        top: parseInt(savedPosition, 10),
        behavior: 'auto'
      });
      
      // Restore original scroll behavior after a brief moment
      setTimeout(() => {
        html.style.scrollBehavior = originalScrollBehavior;
      }, 0);
    }

    // Save scroll position before page unloads
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);

  return null;
}

