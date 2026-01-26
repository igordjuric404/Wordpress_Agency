import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const letterContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 10,
    },
  },
};


const colors = [
  'text-bold-pink',
  'text-bold-green',
  'text-bold-blue',
  'text-bold-purple',
  'text-bold-yellow',
  'text-bold-orange',
];


export default function LoadingOverlay() {
  const [activeColor, setActiveColor] = useState(0);

  // Cycle colors rapidly for that "jumpy" feel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColor((prev) => (prev + 1) % colors.length);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#fcfbf5] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%', 
        transition: { 
          duration: 0.8, 
          ease: [0.76, 0, 0.24, 1] // Custom ease for snappy slide up
        } 
      }}
    >
      <div className="relative">
        {/* Main Text */}
        <motion.h1
          variants={letterContainerVariants}
          initial="initial"
          animate="animate"
          className="text-6xl md:text-8xl font-display font-black uppercase tracking-tight relative z-10 flex"
        >
          {['N', 'e', 'o', 'P', 'r', 'e', 's', 's'].map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="relative inline-block"
            >
               {/* Shadow layer */}
               <motion.span
                  className="absolute top-1 left-1 md:top-2 md:left-2 text-neo-black opacity-100 select-none z-0"
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              
              {/* Vibrant layer */}
              <motion.span
                className={`relative z-10 block ${colors[(i + activeColor) % colors.length]}`}
                style={{
                  WebkitTextStroke: '3px #111111',
                  textShadow: 'none', // We use a separate layer for shadow to make it hard/brutalist
                }}
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "linear",
                }}
              >
                {letter}
              </motion.span>
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Loading bar */}
      <motion.div 
        className="mt-12 w-64 h-6 border-4 border-neo-black p-1 bg-white shadow-neo-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div 
          className="h-full bg-neo-black"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}
