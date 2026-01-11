import type { ReactNode } from 'react';

// ===========================================
// SECTION BACKGROUND VARIANTS
// Naming convention:
// - white: default white background
// - surface: subtle gray background
// - inverse: black background with white text
// ===========================================

type SectionBackground = 'white' | 'surface' | 'inverse' | 'gray' | 'blue';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: SectionBackground;
  noPadding?: boolean;
}

export default function Section({ 
  children, 
  className = '', 
  id,
  background = 'white',
  noPadding = false
}: SectionProps) {
  
  const backgrounds: Record<SectionBackground, string> = {
    white: 'bg-transparent',
    surface: 'bg-neo-gray',
    inverse: 'bg-neo-black text-white',
    // Legacy aliases
    gray: 'bg-neo-gray',
    blue: 'bg-neo-black text-white', // Note: 'blue' was misleading, kept for compatibility
  };

  return (
    <section 
      id={id}
      className={`${backgrounds[background]} ${className}`}
    >
      <div className={`neo-container ${noPadding ? '' : 'py-6 md:py-8'}`}>
        {children}
      </div>
    </section>
  );
}
