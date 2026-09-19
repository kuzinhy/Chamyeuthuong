import React, { useEffect, useState, useRef } from 'react';

export const InteractiveCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only on fine pointers (desktop mouse), completely disable on mobile / touchscreen
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateCursorPosition);
      }

      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest<HTMLElement>(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer'
      );
      const hovering = !!interactiveEl;
      setIsHovering(prev => (prev !== hovering ? hovering : prev));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible || !isHovering) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* High-performance GPU accelerated halo */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-opacity duration-150 ease-out will-change-transform"
        style={{
          width: '28px',
          height: '28px',
          transform: `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`,
          border: '1px solid rgba(2, 132, 199, 0.35)',
          backgroundColor: 'rgba(56, 189, 248, 0.06)',
        }}
      />
    </div>
  );
};
