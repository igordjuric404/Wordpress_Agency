import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
  const location = useLocation();

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
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-12 h-12 bg-bold-yellow flex items-center justify-center p-0"
          >
            {isMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-[65px] bg-soft-yellow z-40 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col p-8" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-6" role="menu">
            {navLinks.map((link) => {
              const bgs = ['bg-white', 'bg-soft-pink', 'bg-soft-green', 'bg-soft-blue', 'bg-soft-purple'];
              const bg = bgs[navLinks.indexOf(link) % bgs.length];

              return (
                <li key={link.path} role="none">
                  <Button
                    to={link.path}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                    className={`block px-6 py-4 text-2xl border-4 w-full
                      ${isActive(link.path) 
                        ? 'bg-neo-black text-white' 
                        : `${bg} text-neo-black`
                      }`}
                  >
                    {link.name}
                  </Button>
                </li>
              );
            })}
          </ul>
          <Button
            to="/contact"
            tabIndex={isMenuOpen ? 0 : -1}
            className="mt-10 px-6 py-5 bg-bold-pink text-white text-2xl border-4 text-center uppercase tracking-widest w-full"
          >
            Contact us
          </Button>
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

