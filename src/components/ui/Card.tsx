import { forwardRef, type ReactNode } from 'react';
import Hoverable from './hoverable';

// ===========================================
// CARD BACKGROUND VARIANTS
// Naming convention:
// - white: default white background
// - soft-*: pastel backgrounds
// ===========================================

type CardBackground = 
  | 'white'
  | 'soft-pink' | 'soft-green' | 'soft-yellow' | 'soft-blue' | 'soft-purple' | 'soft-orange'
  // Legacy aliases
  | 'pastel-pink' | 'pastel-green' | 'pastel-yellow' | 'pastel-blue' | 'pastel-purple';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
  background?: CardBackground;
}

const Card = forwardRef<HTMLElement, CardProps>(({ 
  children, 
  className = '', 
  hoverable = false,
  onClick,
  as: Component = 'div',
  background = 'white'
}, ref) => {
  
  const backgrounds: Record<CardBackground, string> = {
    white: 'bg-white',
    // New naming
    'soft-pink': 'bg-soft-pink',
    'soft-green': 'bg-soft-green',
    'soft-yellow': 'bg-soft-yellow',
    'soft-blue': 'bg-soft-blue',
    'soft-purple': 'bg-soft-purple',
    'soft-orange': 'bg-soft-orange',
    // Legacy aliases
    'pastel-pink': 'bg-soft-pink',
    'pastel-green': 'bg-soft-green',
    'pastel-yellow': 'bg-soft-yellow',
    'pastel-blue': 'bg-soft-blue',
    'pastel-purple': 'bg-soft-purple',
  };

  const cardStyles = `
    ${backgrounds[background]} border-3 border-neo-black p-6 rounded-[10px]
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  if (hoverable) {
    return (
      <Hoverable
        as={Component}
        ref={ref as React.Ref<HTMLElement>}
        className={`${cardStyles} block`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
      >
        {children}
      </Hoverable>
    );
  }

  return (
    <Component
      ref={ref as never}
      className={`${cardStyles} shadow-neo`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export default Card;
