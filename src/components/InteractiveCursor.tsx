import React, { useEffect, useState, useRef } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
  symbol: string;
}

interface MagneticState {
  isMagnetized: boolean;
  element: HTMLElement | null;
  centerX: number;
  centerY: number;
  pullFactor: number;
  elementType: 'button' | 'card' | 'link' | 'interactive';
  width: number;
  height: number;
}

export const InteractiveCursor: React.FC = () => {
  const [rawMousePos, setRawMousePos] = useState({ x: -100, y: -100 });
  const [pulledTargetPos, setPulledTargetPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [magneticState, setMagneticState] = useState<MagneticState>({
    isMagnetized: false,
    element: null,
    centerX: 0,
    centerY: 0,
    pullFactor: 0,
    elementType: 'interactive',
    width: 0,
    height: 0,
  });
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const sparkleIdCounter = useRef(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices that have a precise mouse cursor (disable on touch screens)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const { clientX: x, clientY: y } = e;
      setRawMousePos({ x, y });

      // 1. Detect directly hovered element
      const target = e.target as HTMLElement | null;
      let interactiveEl = target?.closest<HTMLElement>(
        'button, a, input, textarea, select, [role="button"], .lumi-card, .lumi-card-hover, .lumi-postcard-hover, .lumi-polaroid-hover, .lumi-tag-hover, .interactive-hover, .cursor-pointer'
      );

      let foundDirectly = !!interactiveEl;
      let minDistance = 110; // Magnetic detection radius in px

      // 2. If not directly hovered, look for nearby hoverable cards & buttons in proximity
      if (!interactiveEl) {
        const candidateElements = document.querySelectorAll<HTMLElement>(
          'button, a, .lumi-card, .lumi-card-hover, .lumi-postcard-hover, .lumi-polaroid-hover, .lumi-tag-hover, [role="button"]'
        );

        candidateElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Quick bounding box check with proximity margin
          if (
            x >= rect.left - 80 &&
            x <= rect.right + 80 &&
            y >= rect.top - 80 &&
            y <= rect.bottom + 80
          ) {
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(cx - x, cy - y);
            if (dist < minDistance) {
              minDistance = dist;
              interactiveEl = el;
            }
          }
        });
      }

      setIsHovering(!!interactiveEl);

      // 3. Compute Magnetic Pull towards center
      if (interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distToCenter = Math.hypot(centerX - x, centerY - y);
        
        const isCard = interactiveEl.classList.contains('lumi-card') || 
                       interactiveEl.classList.contains('lumi-card-hover') ||
                       interactiveEl.classList.contains('lumi-postcard-hover') ||
                       interactiveEl.classList.contains('lumi-polaroid-hover') ||
                       rect.width > 280;
        
        const isButton = interactiveEl.tagName === 'BUTTON' || 
                         interactiveEl.getAttribute('role') === 'button' ||
                         interactiveEl.classList.contains('lumi-tag-hover');

        // Determine pull strength: cards get a gentle, smooth magnetic attraction; buttons get a firm snap
        let pullFactor = 0;
        if (foundDirectly) {
          pullFactor = isButton ? 0.38 : (isCard ? 0.22 : 0.30);
        } else {
          // Soft falloff based on distance
          const normalized = Math.max(0, 1 - (distToCenter / (minDistance + 40)));
          pullFactor = (isButton ? 0.28 : 0.16) * Math.pow(normalized, 1.5);
        }

        const pulledX = x + (centerX - x) * pullFactor;
        const pulledY = y + (centerY - y) * pullFactor;

        setPulledTargetPos({ x: pulledX, y: pulledY });
        setMagneticState({
          isMagnetized: pullFactor > 0.05,
          element: interactiveEl,
          centerX,
          centerY,
          pullFactor,
          elementType: isButton ? 'button' : (isCard ? 'card' : 'interactive'),
          width: rect.width,
          height: rect.height,
        });
      } else {
        setPulledTargetPos({ x, y });
        setMagneticState({
          isMagnetized: false,
          element: null,
          centerX: 0,
          centerY: 0,
          pullFactor: 0,
          elementType: 'interactive',
          width: 0,
          height: 0,
        });
      }

      // 4. Sparkle emission on mouse motion
      const dx = x - lastSpawnPos.current.x;
      const dy = y - lastSpawnPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 32) {
        lastSpawnPos.current = { x, y };
        const symbols = ['✦', '♥', '✨', '•', '⋆'];
        const colors = ['#f43f5e', '#fb7185', '#f59e0b', '#38bdf8', '#fbbf24'];
        
        const newSparkle: SparkleParticle = {
          id: ++sparkleIdCounter.current,
          x: x + (Math.random() * 16 - 8),
          y: y + (Math.random() * 16 - 8),
          size: Math.random() * 8 + 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          opacity: 1,
          symbol: symbols[Math.floor(Math.random() * symbols.length)]
        };

        setSparkles(prev => [...prev.slice(-12), newSparkle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Smooth lerp follower for soft luminous aura with magnetic pulling
  useEffect(() => {
    let currentX = rawMousePos.x;
    let currentY = rawMousePos.y;

    const animateFollower = () => {
      // If magnetized, ease faster into the magnetic orbit
      const ease = magneticState.isMagnetized 
        ? (magneticState.elementType === 'button' ? 0.32 : 0.24) 
        : (isHovering ? 0.20 : 0.14);

      currentX += (pulledTargetPos.x - currentX) * ease;
      currentY += (pulledTargetPos.y - currentY) * ease;
      setFollowerPos({ x: currentX, y: currentY });

      // Decay sparkles opacity
      setSparkles(prev => 
        prev
          .map(s => ({ ...s, opacity: s.opacity - 0.04, y: s.y - 0.5 }))
          .filter(s => s.opacity > 0)
      );

      requestRef.current = requestAnimationFrame(animateFollower);
    };

    requestRef.current = requestAnimationFrame(animateFollower);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [pulledTargetPos, magneticState, isHovering, rawMousePos]);

  if (!isVisible) return null;

  // Calculate dynamic size & styling of the magnetic aura
  const isMagnet = magneticState.isMagnetized;
  const isCardMagnet = isMagnet && magneticState.elementType === 'card';
  const auraWidth = isMagnet ? (isCardMagnet ? 60 : 50) : (isHovering ? 44 : 26);
  const auraHeight = isMagnet ? (isCardMagnet ? 60 : 50) : (isHovering ? 44 : 26);

  // Offset the dot slightly towards the magnetic pull for physical feel
  const dotX = rawMousePos.x + (pulledTargetPos.x - rawMousePos.x) * 0.45;
  const dotY = rawMousePos.y + (pulledTargetPos.y - rawMousePos.y) * 0.45;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      
      {/* Outer Luminous Magnetic Aura */}
      <div 
        className="fixed rounded-full pointer-events-none transition-all duration-150 ease-out will-change-transform"
        style={{
          left: `${followerPos.x}px`,
          top: `${followerPos.y}px`,
          width: `${auraWidth}px`,
          height: `${auraHeight}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : (isMagnet ? 1.15 : 1)})`,
          background: isMagnet
            ? 'radial-gradient(circle, rgba(244, 63, 94, 0.32) 0%, rgba(251, 113, 133, 0.15) 55%, transparent 75%)'
            : (isHovering 
                ? 'radial-gradient(circle, rgba(244, 63, 94, 0.22) 0%, rgba(251, 113, 133, 0.08) 60%, transparent 80%)' 
                : 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)'),
          border: isMagnet
            ? '1.5px solid rgba(244, 63, 94, 0.75)'
            : (isHovering ? '1.5px solid rgba(244, 63, 94, 0.5)' : '1px solid rgba(244, 63, 94, 0.2)'),
          boxShadow: isMagnet
            ? '0 0 20px rgba(244, 63, 94, 0.45), inset 0 0 10px rgba(251, 113, 133, 0.2)'
            : (isHovering ? '0 0 12px rgba(244, 63, 94, 0.25)' : 'none'),
        }}
      />

      {/* Magnetic Tether Indicator Ring (Visible when drawn towards an element) */}
      {isMagnet && (
        <div
          className="fixed rounded-full pointer-events-none animate-ping opacity-30"
          style={{
            left: `${followerPos.x}px`,
            top: `${followerPos.y}px`,
            width: '28px',
            height: '28px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f43f5e',
            animationDuration: '1.8s',
          }}
        />
      )}

      {/* Tiny Core Glow Dot (Physical center with magnetic pull) */}
      <div 
        className="fixed rounded-full pointer-events-none transition-all duration-75 ease-out will-change-transform"
        style={{
          left: `${dotX}px`,
          top: `${dotY}px`,
          width: isMagnet ? '9px' : (isHovering ? '7px' : '5px'),
          height: isMagnet ? '9px' : (isHovering ? '7px' : '5px'),
          transform: `translate(-50%, -50%) scale(${isClicking ? 1.4 : 1})`,
          backgroundColor: isMagnet ? '#e11d48' : (isHovering ? '#f43f5e' : '#fb7185'),
          boxShadow: isMagnet 
            ? '0 0 10px rgba(225, 29, 72, 0.9), 0 0 4px #ffffff'
            : '0 0 7px rgba(244, 63, 94, 0.8)'
        }}
      />

      {/* Floating Sparkle Heart Particles */}
      {sparkles.map(sparkle => (
        <span
          key={sparkle.id}
          className="fixed select-none pointer-events-none font-bold"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            fontSize: `${sparkle.size}px`,
            color: sparkle.color,
            opacity: sparkle.opacity,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
            transition: 'opacity 0.05s linear',
            textShadow: `0 0 6px ${sparkle.color}`
          }}
        >
          {sparkle.symbol}
        </span>
      ))}

    </div>
  );
};

