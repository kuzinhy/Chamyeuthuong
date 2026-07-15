import { useState, useRef, ReactNode, MouseEvent } from 'react';

interface GlowWrapperProps {
  children: ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(6, 182, 212, 0.45)" (cyan) or "rgba(139, 92, 246, 0.45)" (indigo)
  radialSize?: number; // Radial circle size in pixels
  borderRadius?: string; // Tailwind class name for rounded corners
  innerBg?: string; // Tailwind class for container background
  staticBorderColor?: string; // Default border color when not hovered
}

export default function GlowWrapper({
  children,
  className = '',
  glowColor = 'rgba(6, 182, 212, 0.45)',
  radialSize = 200,
  borderRadius = 'rounded-3xl',
  innerBg = 'bg-slate-900/30',
  staticBorderColor = 'rgba(255, 255, 255, 0.08)'
}: GlowWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Extract a very transparent version of glowColor for the internal spotlight
  const lightGlowColor = glowColor.replace(/[\d.]+\)$/, '0.04)');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${borderRadius} p-[1px] overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(${radialSize}px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`
          : staticBorderColor
      }}
    >
      {/* Inner container to match roundings */}
      <div className={`relative z-10 w-full h-full ${borderRadius} ${innerBg} overflow-hidden`}>
        {/* Subtle background spotlight that follows the mouse */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${radialSize * 1.5}px circle at ${coords.x}px ${coords.y}px, ${lightGlowColor}, transparent 65%)`,
          }}
        />
        
        {/* Actual children content */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
