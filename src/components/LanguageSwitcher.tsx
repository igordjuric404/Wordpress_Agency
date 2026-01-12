import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '../contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import Button from './ui/Button';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isClickMode, setIsClickMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsClickMode(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Only open on hover if not in click mode and not on mobile
    if (!isClickMode && !isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    // Only close on hover leave if not in click mode and not on mobile
    if (!isClickMode && !isMobile) {
      // Add a small delay to allow smooth mouse movement to dropdown
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setIsClickMode(newIsOpen); // Set click mode only when opening, reset when closing
  };

  // Reset click mode when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setIsClickMode(false);
    }
  }, [isOpen]);

  return (
    <div 
      className="relative inline-block md:inline-block w-full md:w-auto" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        variant="custom"
        size="md"
        onClick={handleClick}
        className="block md:inline-flex px-6 py-4 md:!px-5 md:!py-2 text-2xl md:text-base border-4 md:border-3 !w-full md:!w-auto !text-neo-black uppercase tracking-wider transition-all duration-300 bg-white hover:bg-white/80 md:hover:bg-bold-blue md:hover:text-white gap-2"
        style={{ width: '100%' }}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-2xl leading-none font-bold">{currentLang.flag}</span>
        <span>{currentLang.code === 'sr' ? 'RS' : currentLang.code.toUpperCase()}</span>
      </Button>

      {/* Invisible bridge to prevent dropdown from closing when moving mouse through gap */}
      {!isMobile && isOpen && (
        <div 
          className="absolute right-0 top-full min-w-[160px] h-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      {isMobile ? (
        // Mobile: static positioning, flows naturally in menu
        <div 
          className={`mt-2 bg-white border-3 border-neo-black shadow-neo-lg rounded-[10px] overflow-hidden w-full transition-all duration-300 ease-out ${
            isOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
                setIsClickMode(false);
              }}
              className={`w-full px-4 py-3 flex items-center justify-between gap-2 hover:bg-bold-blue hover:text-white transition-all border-b-3 border-neo-black last:border-b-0 ${
                language === lang.code ? 'bg-bold-pink text-white' : 'bg-white text-neo-black'
              }`}
            >
              <span className="text-2xl leading-none">{lang.flag}</span>
              <span className="font-bold text-sm flex-1 text-center">{lang.name}</span>
              {language === lang.code ? (
                <Check className="w-5 h-5 flex-shrink-0" strokeWidth={3} />
              ) : (
                <span className="w-5 h-5 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      ) : (
        // Desktop: absolute positioning for dropdown
        <div 
          className={`absolute right-0 mt-2 bg-white border-3 border-neo-black shadow-neo-lg rounded-[10px] overflow-hidden z-50 min-w-[160px] transition-all duration-300 ease-out ${
            isOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
                setIsClickMode(false);
              }}
              className={`w-full px-4 py-3 flex items-center justify-between gap-2 hover:bg-bold-blue hover:text-white transition-all border-b-3 border-neo-black last:border-b-0 ${
                language === lang.code ? 'bg-bold-pink text-white' : 'bg-white text-neo-black'
              }`}
            >
              <span className="text-2xl leading-none">{lang.flag}</span>
              <span className="font-bold text-sm flex-1 text-center">{lang.name}</span>
              {language === lang.code ? (
                <Check className="w-5 h-5 flex-shrink-0" strokeWidth={3} />
              ) : (
                <span className="w-5 h-5 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

