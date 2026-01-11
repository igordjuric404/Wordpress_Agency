import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import Hoverable from './hoverable';

// ===========================================
// BUTTON VARIANTS
// Naming convention:
// - default/inverse: core variants
// - soft-*: pastel background colors
// - bold-*: vibrant/saturated colors
// - custom: full control via className
// ===========================================

type ButtonVariant = 
  | 'default'      // Black bg, white text
  | 'inverse'      // White bg, black text
  | 'soft-pink' | 'soft-green' | 'soft-yellow' | 'soft-blue' | 'soft-purple'
  | 'bold-pink' | 'bold-green' | 'bold-yellow' | 'bold-blue' | 'bold-purple'
  | 'custom'       // No default styles, full className control
  // Legacy aliases (for backward compatibility)
  | 'primary' | 'secondary' | 'outline'
  | 'vibrant-pink' | 'vibrant-blue' | 'vibrant-green' | 'vibrant-yellow' | 'vibrant-purple';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  to?: string;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'default', 
    size = 'md', 
    href, 
    to,
    fullWidth = false,
    className = '',
    disabled = false,
    ...props 
  }, ref) => {
    
    const baseStyles = `
      inline-flex items-center justify-center font-display font-black uppercase tracking-widest
      border-3 border-neo-black rounded-[10px]
      transition-all duration-300
    `;

    const variants: Record<ButtonVariant, string> = {
      // Core variants
      default: 'bg-neo-black text-white hover:bg-bold-pink',
      inverse: 'bg-white text-neo-black hover:bg-soft-yellow',
      
      // Soft (pastel) variants
      'soft-pink': 'bg-soft-pink text-neo-black hover:bg-soft-pink/80',
      'soft-green': 'bg-soft-green text-neo-black hover:bg-soft-green/80',
      'soft-yellow': 'bg-soft-yellow text-neo-black hover:bg-soft-yellow/80',
      'soft-blue': 'bg-soft-blue text-neo-black hover:bg-soft-blue/80',
      'soft-purple': 'bg-soft-purple text-neo-black hover:bg-soft-purple/80',
      
      // Bold (vibrant) variants
      'bold-pink': 'bg-bold-pink text-white hover:bg-bold-pink/90',
      'bold-green': 'bg-bold-green text-neo-black hover:bg-bold-green/90',
      'bold-yellow': 'bg-bold-yellow text-neo-black hover:bg-bold-yellow/90',
      'bold-blue': 'bg-bold-blue text-white hover:bg-bold-blue/90',
      'bold-purple': 'bg-bold-purple text-white hover:bg-bold-purple/90',
      
      // Custom (no styles, use className)
      custom: '',
      
      // Legacy aliases (map to new system)
      primary: 'bg-neo-black text-white hover:bg-bold-pink',
      secondary: 'bg-white text-neo-black hover:bg-soft-yellow',
      outline: 'bg-transparent text-neo-black hover:bg-white',
      'vibrant-pink': 'bg-bold-pink text-white hover:bg-bold-pink/90',
      'vibrant-blue': 'bg-bold-blue text-white hover:bg-bold-blue/90',
      'vibrant-green': 'bg-bold-green text-neo-black hover:bg-bold-green/90',
      'vibrant-yellow': 'bg-bold-yellow text-neo-black hover:bg-bold-yellow/90',
      'vibrant-purple': 'bg-bold-purple text-white hover:bg-bold-purple/90',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const combinedStyles = `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.trim();

    // External link
    if (href) {
      return (
        <Hoverable as="span" className="inline-block" disabled={disabled}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedStyles}
          >
            {children}
          </a>
        </Hoverable>
      );
    }

    // Internal link
    if (to) {
      return (
        <Hoverable as="span" className="inline-block" disabled={disabled}>
          <Link to={to} className={combinedStyles.replace('inline-flex', 'flex')}>
            {children}
          </Link>
        </Hoverable>
      );
    }

    // Button
    return (
      <Hoverable as="button" ref={ref as React.Ref<HTMLElement>} className={combinedStyles} disabled={disabled} {...props}>
        {children}
      </Hoverable>
    );
  }
);

Button.displayName = 'Button';

export default Button;
