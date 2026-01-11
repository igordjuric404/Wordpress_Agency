import { useEffect, useRef, useCallback } from 'react';

// Vibrant brand colors for random spark colors
const SPARK_COLORS = [
  '#FF2D95', // bold-pink
  '#00E676', // bold-green
  '#FFB703', // bold-yellow
  '#00B2FF', // bold-blue
  '#A100FF', // bold-purple
];

function getRandomColor(): string {
  return SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
}

export default function ClickSpark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const animateSpark = useCallback(() => {
    if (!svgRef.current) return;
    
    const sparks = Array.from(svgRef.current.children) as SVGLineElement[];
    const size = 30; // y1 value
    const offset = `${size / 2}px`;

    sparks.forEach((spark, i) => {
      const deg = `calc(${i} * (360deg / ${sparks.length}))`;

      spark.animate(
        [
          {
            strokeDashoffset: size * 3,
            transform: `rotate(${deg}) translateY(${offset})`,
          },
          {
            strokeDashoffset: size,
            transform: `rotate(${deg}) translateY(0)`,
          },
        ],
        {
          duration: 660,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          fill: 'forwards',
        }
      );
    });
  }, []);

  const setSparkPosition = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    containerRef.current.style.left = `${e.clientX - 25}px`; // Center the 50px SVG
    containerRef.current.style.top = `${e.clientY - 25}px`;
  }, []);

  const setRandomColor = useCallback(() => {
    if (!svgRef.current) return;
    svgRef.current.style.stroke = getRandomColor();
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    setSparkPosition(e);
    setRandomColor();
    animateSpark();
  }, [setSparkPosition, setRandomColor, animateSpark]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <svg
        ref={svgRef}
        width="50"
        height="50"
        viewBox="0 0 100 100"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        stroke="#FF2D95"
        style={{ transform: 'rotate(-20deg)' }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="30"
            x2="50"
            y2="4"
            strokeDasharray="30"
            strokeDashoffset="30"
            style={{ transformOrigin: 'center' }}
          />
        ))}
      </svg>
    </div>
  );
}

