import { ReactNode, useRef, useState, useCallback } from 'react';

interface DraggableElementProps {
  children: ReactNode;
  x: number; // Percentage of banner width (0-100)
  y: number; // Percentage of banner height (0-100)
  onPositionChange: (x: number, y: number) => void;
  disabled?: boolean;
}

export function DraggableElement({ children, x, y, onPositionChange, disabled = false }: DraggableElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0, elementX: 0, elementY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    
    // Get the banner container (1584x396)
    const banner = (e.currentTarget as HTMLElement).closest('[data-banner-container]');
    if (!banner) return;
    
    const rect = banner.getBoundingClientRect();
    
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      elementX: x,
      elementY: y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartPos.current.x;
      const deltaY = moveEvent.clientY - dragStartPos.current.y;
      
      // Convert pixel delta to percentage
      const percentDeltaX = (deltaX / rect.width) * 100;
      const percentDeltaY = (deltaY / rect.height) * 100;
      
      const newX = dragStartPos.current.elementX + percentDeltaX;
      const newY = dragStartPos.current.elementY + percentDeltaY;
      
      // Clamp to 0-100%
      const clampedX = Math.max(0, Math.min(100, newX));
      const clampedY = Math.max(0, Math.min(100, newY));
      
      onPositionChange(clampedX, clampedY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [x, y, onPositionChange, disabled]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        cursor: disabled ? 'default' : isDragging ? 'grabbing' : 'grab',
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      className={isDragging ? 'z-50' : ''}
    >
      {children}
    </div>
  );
}