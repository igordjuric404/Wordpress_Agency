import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'pink' | 'green' | 'yellow' | 'blue' | 'purple';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-white border-neo-black text-neo-black',
    pink: 'bg-bold-pink text-white border-neo-black',
    green: 'bg-bold-green text-neo-black border-neo-black',
    yellow: 'bg-bold-yellow text-neo-black border-neo-black',
    blue: 'bg-bold-blue text-white border-neo-black',
    purple: 'bg-bold-purple text-white border-neo-black',
  };

  return (
    <span
      className={`
        inline-block px-3 py-1 text-xs font-display font-black uppercase tracking-wider
        border-2 shadow-neo-sm ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}

