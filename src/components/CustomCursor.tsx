import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isInput = target.tagName.toLowerCase() === 'input' || 
                      target.tagName.toLowerCase() === 'textarea' || 
                      target.isContentEditable;
      setIsHidden(isInput);
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  if (isHidden) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[99999]"
      style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)' }}
    >
      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
    </div>
  );
}