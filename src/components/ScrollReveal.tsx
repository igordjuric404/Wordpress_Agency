import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

// ===========================================
// NEO-BRUTALIST SCROLL REVEAL ANIMATIONS
// Punchy, tactile, bouncy - NOT elegant fades
// ===========================================

type AnimationType = 
  | 'pop'        // Scale bounce from small
  | 'slam'       // Quick drop with overshoot
  | 'wiggle'     // Slight rotation wobble
  | 'snap'       // Sharp horizontal snap
  | 'bounce'     // Vertical bounce in
  | 'twist';     // Rotate and scale in

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}

// Bouncy spring config for playful feel
const bouncySpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 15,
};

const snappySpring = {
  type: 'spring' as const,
  stiffness: 600,
  damping: 20,
};

const elasticSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 10,
};

// Animation variants - each one punchy and physical
const animationVariants: Record<AnimationType, Variants> = {
  // Pop: scale from 0.85 with bounce overshoot
  pop: {
    hidden: { 
      scale: 0.85, 
      opacity: 0,
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: bouncySpring,
    },
  },
  
  // Slam: drops down fast with slight overshoot
  slam: {
    hidden: { 
      y: -30, 
      opacity: 0,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: snappySpring,
    },
  },
  
  // Wiggle: slight rotation wobble as it appears
  wiggle: {
    hidden: { 
      rotate: -3, 
      scale: 0.95, 
      opacity: 0,
    },
    visible: { 
      rotate: 0, 
      scale: 1, 
      opacity: 1,
      transition: elasticSpring,
    },
  },
  
  // Snap: horizontal snap from the side
  snap: {
    hidden: { 
      x: -20, 
      opacity: 0,
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: snappySpring,
    },
  },
  
  // Bounce: vertical bounce up
  bounce: {
    hidden: { 
      y: 25, 
      opacity: 0,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: bouncySpring,
    },
  },
  
  // Twist: rotate and scale simultaneously
  twist: {
    hidden: { 
      rotate: 4, 
      scale: 0.9, 
      opacity: 0,
    },
    visible: { 
      rotate: 0, 
      scale: 1, 
      opacity: 1,
      transition: elasticSpring,
    },
  },
};

export default function ScrollReveal({ 
  children, 
  animation = 'pop',
  delay = 0,
  className = '',
  once = true,
  margin = '-30%', // Trigger when element is further into viewport
}: ScrollRevealProps) {
  const variants = animationVariants[animation];
  
  // Add delay to the visible transition
  const variantsWithDelay: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(typeof variants.visible === 'object' && 'transition' in variants.visible 
          ? variants.visible.transition 
          : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variantsWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for groups of items
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  margin?: string;
  delay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.08,
  margin = '-30%', // Trigger when element is further into viewport
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item for use inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  useOwnViewport?: boolean;
  margin?: string;
  delay?: number;
}

export function StaggerItem({ 
  children, 
  animation = 'pop',
  className = '',
  useOwnViewport = false,
  margin = '-30%', // Trigger when element is further into viewport
  delay = 0,
}: StaggerItemProps) {
  if (useOwnViewport) {
    // Each item detects its own viewport
    const variantsWithDelay: Variants = {
      hidden: animationVariants[animation].hidden,
      visible: {
        ...animationVariants[animation].visible,
        transition: {
          ...(typeof animationVariants[animation].visible === 'object' && 'transition' in animationVariants[animation].visible 
            ? animationVariants[animation].visible.transition 
            : {}),
          delay,
        },
      },
    };
    
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin }}
        variants={variantsWithDelay}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
  
  // Default: rely on parent container for viewport detection
  return (
    <motion.div
      variants={animationVariants[animation]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

