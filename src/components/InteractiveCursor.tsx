import React, { useEffect, useState } from 'react';

export const InteractiveCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only on fine pointers (desktop mouse), completely disable on mobile / touchscreen
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest<HTMLElement>(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer'
      );
      setIsHovering(!!interactiveEl);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Gentle, minimal tech halo that only appears faintly when hovering interactive elements */}
      {isHovering && (
        <div
          className="fixed rounded-full pointer-events-none transition-transform duration-100 ease-out will-change-transform"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '28px',
            height: '28px',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            backgroundColor: 'rgba(56, 189, 248, 0.05)',
          }}
        />
      )}
    </div>
  );
};
