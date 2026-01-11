import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './ui/Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className="sticky top-0 z-50 relative"
    >
      <div className="neo-container">
        <nav className="flex items-center justify-between h-16 md:h-24" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display font-black text-2xl md:text-4xl text-neo-black group transition-colors"
            aria-label="NeoPress - Home"
          >
            Neo<span className="text-white bg-neo-black px-2 group-hover:bg-bold-pink transition-colors">Press</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2" role="menubar">
            {navLinks.map((link, index) => {
              const hoverBgs = ['hover:bg-bold-pink', 'hover:bg-bold-green', 'hover:bg-bold-yellow', 'hover:bg-bold-blue', 'hover:bg-bold-purple'];
              const hoverBg = hoverBgs[index % hoverBgs.length];

              return (
                <li key={link.path} role="none">
                  <Button
                    to={link.path}
                    variant="custom"
                    size="md"
                    role="menuitem"
                    className={`!px-5 !py-2 uppercase tracking-wider transition-all duration-300
                      ${isActive(link.path) 
                        ? 'bg-bold-pink text-white' 
                        : `bg-white text-neo-black ${hoverBg} hover:text-white`
                      }`}
                  >
                    {link.name}
                  </Button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={burgerRef}
            onClick={() => {
              // Trigger click animation
              setIsAnimating(true);
              setTimeout(() => setIsAnimating(false), 200);
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className={`md:hidden w-11 h-11 flex items-center justify-center p-0 border-3 border-neo-black rounded-[10px] shadow-neo-sm transition-all duration-150 ${
              isAnimating 
                ? 'bg-bold-pink translate-x-[2px] translate-y-[2px]' 
                : 'bg-white'
            }`}
          >
            {/* Burger icon lines */}
            <div className="flex flex-col justify-center items-center w-5 h-[19px] gap-1">
              <span className={`block w-4 h-0.5 transition-all duration-200 ${
                isAnimating ? 'bg-white' : 'bg-neo-black'
              } ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-4 h-0.5 transition-all duration-200 ${
                isAnimating ? 'bg-white' : 'bg-neo-black'
              } ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-0.5 transition-all duration-200 ${
                isAnimating ? 'bg-white' : 'bg-neo-black'
              } ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed right-0 top-[64px] bottom-0 w-[250px] z-40 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#fcfbf5' }}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col p-8" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-6" role="menu">
            {navLinks.map((link) => {
              return (
                <li key={link.path} role="none" className="w-full">
                  <Button
                    to={link.path}
                    variant="custom"
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                    className={`block px-6 py-4 text-2xl border-4 !w-full !text-neo-black
                      ${isActive(link.path) 
                        ? 'bg-bold-pink !text-white' 
                        : 'bg-white hover:bg-white/80'
                      }`}
                    style={{ width: '100%' }}
                  >
                    {link.name}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-[65px] bg-black/20 z-30"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

