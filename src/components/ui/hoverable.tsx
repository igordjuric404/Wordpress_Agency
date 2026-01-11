import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

interface HoverableProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'button' | 'a' | 'span' | 'article' | 'section';
  children: ReactNode;
  disabled?: boolean;
}

/**
 * Reusable wrapper for neobrutalist hover effects
 * Shadow stays fixed, only the element moves
 * Shadow matches exact button dimensions
 */
const Hoverable = forwardRef<HTMLElement, HoverableProps>(
  ({ as: Component = 'div', children, disabled = false, className = '', ...props }, ref) => {
    // Determine wrapper display based on component type and className
    const hasFlexClass = className.includes('flex') || className.includes('h-full');
    const hasFullWidth = className.includes('w-full');
    const isBlockElement = Component === 'div' || Component === 'article' || Component === 'section';
    // Use block display when full width is needed, otherwise use inline-block
    const wrapperDisplay = hasFlexClass ? 'flex' : (hasFullWidth ? 'block' : (isBlockElement ? 'block' : 'inline-block'));
    
    // Outer wrapper: holds the shadow (doesn't move)
    // Use relative positioning so the pseudo-element shadow can be positioned absolutely
    const wrapperClassName = `neo-shadow-wrapper ${disabled ? 'opacity-50' : ''} ${hasFlexClass ? 'h-full' : ''} ${hasFullWidth ? 'w-full neo-shadow-wrapper-full' : ''}`.trim();
    
    // Inner element: gets transformed (moves)
    // Use transform-gpu to force GPU layer from the start (prevents sub-pixel shifts)
    const innerTransition = `transition-transform duration-150 ease-in-out transform-gpu relative z-10`.trim();
    const innerHoverEffects = disabled
      ? 'hover:translate-x-0 hover:translate-y-0'
      : 'hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[4px] active:translate-y-[4px]';
    
    const innerClassName = `${innerTransition} ${className} ${innerHoverEffects}`.trim();

    return (
      <span 
        className={wrapperClassName} 
        style={{ 
          display: wrapperDisplay, 
          position: 'relative',
          width: hasFullWidth ? '100%' : undefined
        } as React.CSSProperties}
      >
        <Component 
          ref={ref as never} 
          className={innerClassName}
          style={{
            // Transform transition (fast for hover movement) + color transitions (smooth for state changes)
            transitionProperty: 'transform, background-color, color, border-color',
            transitionDuration: '150ms, 300ms, 300ms, 300ms',
            transitionTimingFunction: 'ease-in-out, ease-in-out, ease-in-out, ease-in-out',
            // Force GPU compositing from the start to prevent sub-pixel shifts
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            ...(props.style || {})
          }}
          {...props}
        >
          {children}
        </Component>
      </span>
    );
  }
);

Hoverable.displayName = 'Hoverable';

export default Hoverable;

