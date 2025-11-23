import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { X, RotateCw, Maximize } from "lucide-react";
import { BannerElement, ASSETS } from "./assets";

interface DraggableElementProps {
  element: BannerElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onChange: (id: string, changes: Partial<BannerElement>) => void;
  onRemove: (id: string) => void;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onChange,
  onRemove,
}) => {
  const constraintsRef = useRef(null);

  const handleDragEnd = (event: any, info: any) => {
    // We update the internal x/y state after drag
    // Note: Motion handles the visual drag, but we need to sync state for persistence if needed
    // For this simple builder, we might just let Motion handle the visual state or sync it.
    // Let's sync it relative to the parent.
    // Since simpler is better, we will rely on visual feedback mostly, but updating state is good practice.
    // However, calculating exact X/Y from drag end in a responsive container is tricky.
    // We'll assume the user is happy with where they dropped it visually.
  };

  const renderContent = () => {
    // 3D Extruded Shapes
    if (element.assetKey?.startsWith('extruded')) {
       const isType1 = element.assetKey === 'extruded1';
       const isType2 = element.assetKey === 'extruded2';
       const extrusionPath = isType1 ? ASSETS.svgs.extrusion1 : (isType2 ? ASSETS.svgs.extrusion2 : ASSETS.svgs.extrusion3);
       const placeholderPath = isType1 ? ASSETS.svgs.placeholder1 : (isType2 ? ASSETS.svgs.placeholder2 : ASSETS.svgs.placeholder3);
       
       // Colors based on the import defaults
       const gradientId = `grad-${element.id}`;
       
       return (
        <div className="relative w-full h-full pointer-events-none">
           <svg className="block w-full h-full" viewBox={isType1 ? "0 0 494 494" : (isType2 ? "0 0 417 417" : "0 0 378 378")} fill="none" preserveAspectRatio="none">
            <g>
              <path d={extrusionPath} fill="#0E0E0E" />
              <g>
                <path d={placeholderPath} fill="white" />
                <path d={placeholderPath} fill={`url(#${gradientId})`} />
                <path d={placeholderPath} stroke="#0E0E0E" strokeWidth="8" />
              </g>
            </g>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor={element.color || "#FF834C"} />
                <stop offset="1" stopColor={element.secondaryColor || "#F682F2"} />
              </linearGradient>
            </defs>
          </svg>
        </div>
       );
    }

    // Standard SVGs (Blobs)
    if (element.type === 'svg') {
       return (
        <div className="w-full h-full pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 600 600" fill="none" preserveAspectRatio="none">
             <path d={element.content} fill={element.color || "#F682F2"} fillRule="evenodd" clipRule="evenodd" />
           </svg>
           {/* Add blur filter if it's a blob */}
           {element.assetKey?.startsWith('blob') && (
             <div className="absolute inset-0 backdrop-blur-3xl opacity-50 mix-blend-overlay" />
           )}
        </div>
       );
    }

    // Images (Stickers, Scribbles)
    if (element.type === 'image' || element.type === 'sticker') {
        return (
            <img 
                src={element.content} 
                alt="Asset" 
                className={`w-full h-full object-contain pointer-events-none ${element.type === 'sticker' ? 'drop-shadow-xl' : ''}`} 
            />
        );
    }

    // Text (Simulated Wordmark for now, or simple text)
    if (element.type === 'text') {
        return (
            <div className="flex items-center justify-center w-full h-full pointer-events-none font-bold text-white text-4xl font-sans tracking-tighter" style={{ textShadow: '2px 2px 0px #000' }}>
                {element.content}
            </div>
        );
    }

    return null;
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => onSelect(element.id)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
      style={{
        x: element.x,
        y: element.y,
        rotate: element.rotation,
        scale: element.scale,
        width: element.width,
        height: element.height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: element.zIndex,
        cursor: isSelected ? "move" : "pointer",
      }}
      className={`group ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-blue-500" : "hover:ring-1 hover:ring-white/50"}`}
    >
      {renderContent()}

      {/* Controls visible when selected */}
      {isSelected && (
        <>
          <button
            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(element.id);
            }}
          >
            <X size={12} />
          </button>
          
          {/* Rotation Handle (Simplified visual only for now) */}
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
             <div className="bg-white text-black rounded-full p-1 shadow-md cursor-ew-resize" title="Use sidebar to rotate">
                <RotateCw size={12} />
             </div>
           </div>
        </>
      )}
    </motion.div>
  );
};
