import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { BannerPreview } from './BannerPreview';
import { BannerConfig } from '../types/banner';

interface BannerEditorProps {
  config: BannerConfig;
  updateConfig: (updates: Partial<BannerConfig>) => void;
}

export interface BannerEditorHandle {
  download: () => void;
}

export const BannerEditor = forwardRef<BannerEditorHandle, BannerEditorProps & { onScaleChange?: (scale: number) => void }>(({ config, updateConfig, onScaleChange }, ref) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const [generatingType, setGeneratingType] = useState<'normal' | 'funky' | null>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = 1584;
        // Calculate scale, maxing out at 1 (don't upscale if container is huge)
        // and subtracting a bit of padding to be safe
        const newScale = Math.min((containerWidth - 48) / targetWidth, 1); 
        setScale(newScale);
        onScaleChange?.(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [onScaleChange]);

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const getNonOverlappingPositions = (count: number) => {
    const positions: {x: number, y: number}[] = [];
    for (let i = 0; i < count; i++) {
      let x = 0, y = 0;
      let valid = false;
      let attempts = 0;
      while (!valid && attempts < 50) {
        // Try to distribute across the canvas (10% to 90%)
        x = 10 + Math.random() * 80;
        y = 15 + Math.random() * 70;
        
        valid = true;
        for (const p of positions) {
          // Calculate distance (considering aspect ratio somewhat)
          const dist = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow((y - p.y), 2));
          // Enforce ~25% distance separation
          if (dist < 25) {
            valid = false;
            break;
          }
        }
        attempts++;
      }
      // If we failed to find a valid spot after 50 attempts, just use the last random one
      positions.push({x, y});
    }
    return positions;
  };

  const generateFunkyConfig = (): Partial<BannerConfig> => {
    const singleShapes = ['extrusion1', 'extrusion2', 'shapeB', 'shapeC', 'shapeD'];
    const randomShape = singleShapes[Math.floor(Math.random() * singleShapes.length)];
    const randomShape2 = singleShapes[Math.floor(Math.random() * singleShapes.length)];
    const randomShape3 = singleShapes[Math.floor(Math.random() * singleShapes.length)];
    
    const scribbleStyles = ['scratches', 'misc', 'scribble1', 'scribble2', 'scribble3'];
    const randomScribble = scribbleStyles[Math.floor(Math.random() * scribbleStyles.length)];
    const randomScribble2 = scribbleStyles[Math.floor(Math.random() * scribbleStyles.length)];
    
    const blendModes = ['overlay', 'screen', 'soft-light', 'hard-light', 'difference', 'exclusion'];
    const randomBlendMode = blendModes[Math.floor(Math.random() * blendModes.length)];
    const randomBlendMode2 = blendModes[Math.floor(Math.random() * blendModes.length)];

    const wordmarkStyles = ['sticker-color', 'sticker-black-white'];
    const randomWordmarkStyle = wordmarkStyles[Math.floor(Math.random() * wordmarkStyles.length)];

    const logoStyles = ['glossy', 'black'];
    const randomLogoStyle = logoStyles[Math.floor(Math.random() * logoStyles.length)];

    // Extreme Cluster Logic
    const centerX = Math.random() * 100; // Anywhere
    const centerY = Math.random() * 100; // Anywhere

    // Extreme Scales
    const baseShapeScale = 0.4 + Math.random() * 2.0; // 0.4 to 2.4

    // Extreme Radius
    const radiusBase = 5 + Math.random() * 25; // 5% to 30% spread
    const radius = radiusBase * baseShapeScale; // Scale radius with shapes
    const radiusY = radius * 4; // Aspect correction for 1584x396 ratio
    
    const rotation = Math.random() * 360;
    const toRad = (d: number) => d * (Math.PI / 180);

    const shapeX = centerX + Math.cos(toRad(rotation)) * radius;
    const shapeY = centerY + Math.sin(toRad(rotation)) * radiusY;

    const shapeX2 = centerX + Math.cos(toRad(rotation + 120)) * radius;
    const shapeY2 = centerY + Math.sin(toRad(rotation + 120)) * radiusY;

    const shapeX3 = centerX + Math.cos(toRad(rotation + 240)) * radius;
    const shapeY3 = centerY + Math.sin(toRad(rotation + 240)) * radiusY;

    const showShapes = Math.random() > 0.1;

    // Overlap prevention
    const restrictedStyles = ['scribble2', 'scribble3', 'misc', 'arrow'];
    const activeRestricted: string[] = [];
    if (restrictedStyles.includes(randomScribble)) activeRestricted.push('scribble');
    if (restrictedStyles.includes(randomScribble2)) activeRestricted.push('scribble2');
    activeRestricted.push('arrow'); // Always active in Funky

    const positions = getNonOverlappingPositions(activeRestricted.length);
    let posIndex = 0;

    let scribbleX = Math.random() * 100;
    let scribbleY = Math.random() * 100;
    if (restrictedStyles.includes(randomScribble)) {
      scribbleX = positions[posIndex].x;
      scribbleY = positions[posIndex].y;
      posIndex++;
    }

    let scribbleX2 = Math.random() * 100;
    let scribbleY2 = Math.random() * 100;
    if (restrictedStyles.includes(randomScribble2)) {
      scribbleX2 = positions[posIndex].x;
      scribbleY2 = positions[posIndex].y;
      posIndex++;
    }

    const arrowX = positions[posIndex].x;
    const arrowY = positions[posIndex].y;

    return {
      // Colors
      gradientStart: getRandomColor(),
      gradientEnd: getRandomColor(),
      scribbleColor: '#FFFFFF', // Force white
      scribbleColor2: '#FFFFFF',
      scribbleBlendMode: randomBlendMode as any,
      scribbleBlendMode2: randomBlendMode2 as any,
      arrowColor: getRandomColor(),
      
      // Wordmark Style
      wordmarkStyle: randomWordmarkStyle as any,
      
      // Logo Style
      logoStyle: randomLogoStyle as any,
      
      // Rotations & Transforms - EXTREME
      wordmarkRotation: Math.floor(Math.random() * 90) - 45, // -45 to 45 (Reduced from 360 to avoid upside down)
      logoRotation: Math.floor(Math.random() * 360),
      scribbleRotation: Math.floor(Math.random() * 360),
      scribbleRotation2: Math.floor(Math.random() * 360),
      scribbleMirrorX: Math.random() > 0.5,
      scribbleMirrorY: Math.random() > 0.5,
      scribbleMirrorX2: Math.random() > 0.5,
      scribbleMirrorY2: Math.random() > 0.5,
      arrowRotation: Math.floor(Math.random() * 360),
      
      // Scales - Uniform for scribbles, exception for "Selected Circles" (scribble1)
      wordmarkScale: 0.6 + Math.random() * 0.8, 
      logoScale: Math.random() > 0.8 
        ? 1.4 + Math.random() * 1.1  // Rare: Large scale
        : 0.5 + Math.random() * 0.9, // Common: Normal scale
      scribbleScale: randomScribble === 'scribble1' 
        ? 1.5 + Math.random() * 1.0  // Allow bigger for Selected Circles
        : 1, 
      scribbleScale2: randomScribble2 === 'scribble1' 
        ? 1.5 + Math.random() * 1.0 
        : 1,
      arrowScale: 1,
      
      // Effects
      wordmarkHue: Math.floor(Math.random() * 360) - 180,
      logoHue: Math.floor(Math.random() * 360) - 180,
      
      // Variants
      shapeStyle: randomShape as any,
      shapeStyle2: randomShape2 as any,
      shapeStyle3: randomShape3 as any,
      scribbleStyle: randomScribble as any,
      scribbleStyle2: randomScribble2 as any,
      
      // Toggles (Always show scribbles/arrows for "Funky" feel)
      showWordmark: Math.random() > 0.1,
      showLogo: Math.random() > 0.1,
      showScribbles: true,
      showScribbles2: true,
      showArrows: true,
      showShapes: showShapes,
      showShapes2: showShapes && Math.random() > 0.2, // High chance if shapes are on
      showShapes3: showShapes && Math.random() > 0.4, // Moderate chance if shapes are on
      showGrain: Math.random() > 0.05,

      // Positions (Wild, allowing cropping)
      wordmarkX: -20 + Math.random() * 140, // -20% to 120%
      wordmarkY: -20 + Math.random() * 140,
      logoX: -20 + Math.random() * 140,
      logoY: -20 + Math.random() * 140,
      scribbleX,
      scribbleY,
      scribbleX2,
      scribbleY2,
      arrowX,
      arrowY,
      
      // Cluster logic applied
      shapeX,
      shapeY,
      shapeX2,
      shapeY2,
      shapeX3,
      shapeY3,
      
      // Extreme shape scales
      shapeScale: baseShapeScale,
      shapeScale2: baseShapeScale,
      shapeScale3: baseShapeScale,

      shapeHue: Math.floor(Math.random() * 360),
      shapeHue2: Math.floor(Math.random() * 360),
      shapeHue3: Math.floor(Math.random() * 360),
      
      // Background Blobs - Random hue for Crazy mode
      blobHue: Math.floor(Math.random() * 360),
      
      // Opacities
      scribbleOpacity: 50 + Math.floor(Math.random() * 50),
      scribbleOpacity2: 50 + Math.floor(Math.random() * 50),
      arrowOpacity: 50 + Math.floor(Math.random() * 50),
      grainOpacity: 10 + Math.floor(Math.random() * 20),
    };
  };

  const generateNormalConfig = (): Partial<BannerConfig> => {
    // 3 Presets from Figma Designs
    const presets = [
      {
        // Orange Design
        name: 'orange',
        gradientStart: '#ff834c',
        gradientEnd: '#f682f2',
        baseHue: 20, // Orange
      },
      {
        // Green Design
        name: 'green',
        gradientStart: '#19b5a6',
        gradientEnd: '#adea71',
        baseHue: 170, // Teal
      },
      {
        // Purple Design
        name: 'purple',
        gradientStart: '#7e5eff',
        gradientEnd: '#f682f2',
        baseHue: 260, // Purple
      }
    ];

    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    
    const baseHue = randomPreset.baseHue;
    const gradientStart = randomPreset.gradientStart;
    const gradientEnd = randomPreset.gradientEnd;

    // Rule: Avoid white 3D elements (extrusion1) and Stairs (shapeB). Added extrusion3 (cyan).
    const singleShapes = ['extrusion2', 'extrusion3', 'shapeC', 'shapeD'];
    const shuffledShapes = [...singleShapes].sort(() => 0.5 - Math.random());
    
    const primaryScribbles = ['scratches', 'scribble1'];
    const secondaryScribbles = ['misc', 'scribble2', 'scribble3']; // Small Spark, Big Spark, Squible (Arrow removed to avoid duplicates)
    
    const randomScribble = primaryScribbles[Math.floor(Math.random() * primaryScribbles.length)];
    const randomScribble2 = secondaryScribbles[Math.floor(Math.random() * secondaryScribbles.length)];

    const blendModes = ['overlay', 'screen', 'soft-light', 'hard-light']; 
    const randomBlendMode = blendModes[Math.floor(Math.random() * blendModes.length)];
    const randomBlendMode2 = blendModes[Math.floor(Math.random() * blendModes.length)];

    const wordmarkStyles = ['sticker-color', 'sticker-black-white'];
    const randomWordmarkStyle = wordmarkStyles[Math.floor(Math.random() * wordmarkStyles.length)];

    const logoStyles = ['glossy', 'black'];
    const randomLogoStyle = logoStyles[Math.floor(Math.random() * logoStyles.length)];

    // Decision: Show Cluster or Standard Layout?
    const showCluster = Math.random() > 0.5;

    let layoutConfig: Partial<BannerConfig> = {};

    if (showCluster) {
      // --- CLUSTER MODE ---
      // 1. Shapes: 3 distinct
      const shapeStyle = shuffledShapes[0];
      const shapeStyle2 = shuffledShapes[1];
      const shapeStyle3 = shuffledShapes[2];
      
      // Define base scale for shapes in cluster
      const baseShapeScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
      const avgShapeScale = baseShapeScale; // Since all are same size roughly

      // 2. Position: Right 1/3
      const centerX = 66 + Math.random() * 19; 
      const centerY = 40 + Math.random() * 20;

      // 3. Flower Petal Layout
      // Adjust radius based on scale to ensure elements always touch/overlap
      const radiusBase = 8 + Math.random() * 3; // 8% to 11% base spread
      const radius = radiusBase * baseShapeScale;
      const radiusY = radius * 4; // Correct for 1:4 aspect ratio
      const rotation = Math.random() * 360;
      const toRad = (d: number) => d * (Math.PI / 180);

      const shapeX = centerX + Math.cos(toRad(rotation)) * radius;
      const shapeY = centerY + Math.sin(toRad(rotation)) * radiusY;

      const shapeX2 = centerX + Math.cos(toRad(rotation + 120)) * radius;
      const shapeY2 = centerY + Math.sin(toRad(rotation + 120)) * radiusY;

      const shapeX3 = centerX + Math.cos(toRad(rotation + 240)) * radius;
      const shapeY3 = centerY + Math.sin(toRad(rotation + 240)) * radiusY;

      // Rule: Logo OR Wordmark on top (Black/White)
      const useLogoOnTop = Math.random() > 0.5;
      
      let logoConfig = {};
      let wordmarkConfig = {};

      if (useLogoOnTop) {
        // Logo: 50% of avg shape scale
        const logoSize = avgShapeScale * 0.5;
        logoConfig = {
          showLogo: true,
          logoStyle: 'black',
          logoX: centerX,
          logoY: centerY,
          logoScale: logoSize,
        };
        wordmarkConfig = {
          showWordmark: false, // Avoid showing on left
        };
      } else {
        // Wordmark: 75% of avg shape scale
        const wordmarkSize = avgShapeScale * 0.75;
        logoConfig = {
          showLogo: false, // Avoid showing on left
        };
        wordmarkConfig = {
          showWordmark: true,
          wordmarkStyle: 'sticker-black-white',
          wordmarkX: centerX,
          wordmarkY: centerY,
          wordmarkScale: wordmarkSize,
        };
      }

      layoutConfig = {
        showShapes: true,
        showShapes2: true,
        showShapes3: true,
        shapeStyle: shapeStyle as any,
        shapeStyle2: shapeStyle2 as any,
        shapeStyle3: shapeStyle3 as any,
        shapeX, shapeY,
        shapeX2, shapeY2,
        shapeX3, shapeY3,
        
        // Explicit scales
        shapeScale: baseShapeScale,
        shapeScale2: baseShapeScale,
        shapeScale3: baseShapeScale,
        
        ...logoConfig,
        ...wordmarkConfig,
        
        // Different Hues
        shapeHue: Math.floor(Math.random() * 360),
        shapeHue2: Math.floor(Math.random() * 360),
        shapeHue3: Math.floor(Math.random() * 360),
      };
    } else {
      // --- STANDARD MODE (No Cluster) ---
      // Logic to separate Wordmark and Logo
      const isWordmarkLeft = Math.random() > 0.5;
      
      const leftX = 20 + Math.random() * 10;
      const rightX = 70 + Math.random() * 10;

      const wordmarkX = isWordmarkLeft ? leftX : rightX;
      const logoX = isWordmarkLeft ? rightX : leftX;

      const wordmarkY = 40 + Math.random() * 20;
      const logoY = 40 + Math.random() * 20;

      // Visibility logic
      // Ensure MUTUALLY EXCLUSIVE: Only Wordmark OR Logo, never both
      const showWordmark = Math.random() > 0.5;
      const showLogo = !showWordmark;

      layoutConfig = {
        showShapes: false,
        showShapes2: false,
        showShapes3: false,
        // Reset hues just in case
        shapeHue: 0, shapeHue2: 0, shapeHue3: 0,

        showLogo,
        logoStyle: randomLogoStyle as any,
        logoX, logoY,

        showWordmark,
        wordmarkX, wordmarkY,
      };
    }

    // Overlap prevention
    const restrictedStyles = ['scribble2', 'scribble3', 'misc', 'arrow'];
    const activeRestricted: string[] = [];
    if (restrictedStyles.includes(randomScribble)) activeRestricted.push('scribble');
    if (restrictedStyles.includes(randomScribble2)) activeRestricted.push('scribble2');
    activeRestricted.push('arrow'); // Always active in Normal

    const positions = getNonOverlappingPositions(activeRestricted.length);
    let posIndex = 0;

    let scribbleX = Math.random() * 30; // Mostly left (Default)
    let scribbleY = Math.random() * 100;
    if (restrictedStyles.includes(randomScribble)) {
      scribbleX = positions[posIndex].x;
      scribbleY = positions[posIndex].y;
      posIndex++;
    }

    let scribbleX2 = Math.random() * 100;
    let scribbleY2 = Math.random() * 100;
    if (restrictedStyles.includes(randomScribble2)) {
      scribbleX2 = positions[posIndex].x;
      scribbleY2 = positions[posIndex].y;
      posIndex++;
    }

    const arrowX = positions[posIndex].x;
    const arrowY = positions[posIndex].y;

    return {
      // Colors
      gradientStart,
      gradientEnd,
      
      wordmarkStyle: randomWordmarkStyle as any,
      
      scribbleColor: '#FFFFFF',
      scribbleColor2: '#FFFFFF',
      scribbleBlendMode: randomBlendMode as any,
      scribbleBlendMode2: randomBlendMode2 as any,
      arrowColor: getRandomColor(),
      
      // Rotations
      wordmarkRotation: Math.floor(Math.random() * 20) - 10,
      logoRotation: Math.floor(Math.random() * 20) - 10,
      scribbleRotation: Math.floor(Math.random() * 360),
      scribbleRotation2: Math.floor(Math.random() * 360),
      scribbleMirrorX: Math.random() > 0.5,
      scribbleMirrorY: Math.random() > 0.5,
      scribbleMirrorX2: Math.random() > 0.5,
      scribbleMirrorY2: Math.random() > 0.5,
      arrowRotation: Math.floor(Math.random() * 60) - 30,
      
      // Scales
      wordmarkScale: 0.5 + Math.random() * 0.35,
      logoScale: 0.5 + Math.random() * 0.35,
      
      scribbleScale: randomScribble === 'scribble1' 
        ? 1.5 + Math.random() * 1.0  // Allow bigger for Selected Circles
        : 1,
      scribbleScale2: 1,
      arrowScale: 1,
      
      // Effects
      wordmarkHue: randomWordmarkStyle === 'sticker-color' 
        ? baseHue - 280 
        : Math.floor(Math.random() * 360) - 180,
      logoHue: Math.floor(Math.random() * 360) - 180,
      
      // Variants
      scribbleStyle: randomScribble as any,
      scribbleStyle2: randomScribble2 as any,
      
      // Toggles
      showScribbles: true,
      showScribbles2: true,
      showArrows: true,
      showGrain: Math.random() > 0.1,

      // Positions
      scribbleX,
      scribbleY,
      scribbleX2,
      scribbleY2,
      
      arrowX,
      arrowY,
      
      // Spread layout config
      ...layoutConfig,
      
      // Background Blobs
      blobHue: baseHue,

      // Opacities
      scribbleOpacity: 40 + Math.floor(Math.random() * 40),
      scribbleOpacity2: 40 + Math.floor(Math.random() * 40),
      arrowOpacity: 40 + Math.floor(Math.random() * 40),
      grainOpacity: 10 + Math.floor(Math.random() * 15),
    };
  };

  const updateConfigRef = useRef(updateConfig);
  updateConfigRef.current = updateConfig;

  const handleSpin = (generator: () => Partial<BannerConfig>, type: 'normal' | 'funky') => {
    if (generatingType) return;
    
    setGeneratingType(type);
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1

      // Ease out function: fast start, slow end
      const currentInterval = 50 + Math.pow(progress, 3) * 350;

      updateConfigRef.current(generator());

      if (progress < 1) {
        setTimeout(() => {
          requestAnimationFrame(animate);
        }, currentInterval);
      } else {
        setGeneratingType(null);
      }
    };

    animate();
  };

  const handleFunkyGenerate = () => handleSpin(generateFunkyConfig, 'funky');
  const handleNormalGenerate = () => handleSpin(generateNormalConfig, 'normal');

  useEffect(() => {
    // Auto-generate with normal config on mount for a nicer first impression
    handleNormalGenerate();
  }, []);

  const handleDownload = async () => {
    if (!bannerRef.current) return;

    const toastId = toast.loading('Generating high-res export...');

    try {
      // Import html-to-image which has better CSS support
      const { toPng } = await import('html-to-image');

      const exportWidth = 1584;
      const exportHeight = 396;

      // Step 1: Temporarily remove scale transform for accurate capture
      const exportWrapper = document.querySelector('[data-export-wrapper]') as HTMLElement;
      const originalWrapperTransform = exportWrapper?.style.transform || '';
      const originalWrapperMarginTop = exportWrapper?.style.marginTop || '';
      const originalWrapperMarginBottom = exportWrapper?.style.marginBottom || '';
      const originalWrapperBoxShadow = exportWrapper?.style.boxShadow || '';
      
      if (exportWrapper) {
        exportWrapper.style.transform = 'scale(1)';
        exportWrapper.style.marginTop = '0';
        exportWrapper.style.marginBottom = '0';
        exportWrapper.style.boxShadow = 'none';
      }

      // Small delay to let the DOM settle after transform change
      await new Promise(resolve => setTimeout(resolve, 100));

      // Step 2: Capture with html-to-image at 2x for quality
      const dataUrl = await toPng(bannerRef.current, {
        quality: 1.0,
        pixelRatio: 2, // 2x for better quality
        width: exportWidth,
        height: exportHeight,
        cacheBust: true,
        skipFonts: false,
        includeQueryParams: true,
        filter: (node) => {
          // Filter out the preload div
          if (node instanceof HTMLElement && node.style.opacity === '0' && node.style.position === 'absolute') {
            return false;
          }
          return true;
        },
        style: {
          // Ensure exact dimensions
          width: `${exportWidth}px`,
          height: `${exportHeight}px`,
        }
      });

      // Step 3: Restore original styles
      if (exportWrapper) {
        exportWrapper.style.transform = originalWrapperTransform;
        exportWrapper.style.marginTop = originalWrapperMarginTop;
        exportWrapper.style.marginBottom = originalWrapperMarginBottom;
        exportWrapper.style.boxShadow = originalWrapperBoxShadow;
      }

      // Step 4: Create canvas and resize to exact dimensions
      const img = new Image();
      img.src = dataUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = exportWidth;
      finalCanvas.height = exportHeight;
      const ctx = finalCanvas.getContext('2d', { alpha: false });
      
      if (ctx) {
        // Draw at exact size (downscale from 2x for anti-aliasing)
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, exportWidth, exportHeight);
      }

      // Step 5: Generate filename with timestamp
      const now = new Date();
      const to2 = (value: number) => value.toString().padStart(2, '0');
      const timestamp = [
        now.getFullYear().toString().slice(-2),
        to2(now.getMonth() + 1),
        to2(now.getDate()),
        to2(now.getMinutes()),
        to2(now.getSeconds()),
      ].join('');

      // Step 6: Download
      const link = document.createElement('a');
      link.download = `Daily-Banner-${timestamp}.png`;
      link.href = finalCanvas.toDataURL('image/png', 1.0);
      link.click();
      
      toast.success('Download started!', { id: toastId });
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.', { id: toastId });
    }
  };

  useImperativeHandle(ref, () => ({
    download: handleDownload
  }));

  return (
    <div className="flex flex-col justify-center h-full gap-6">
      <div 
        ref={containerRef}
        className="flex items-center justify-center overflow-visible relative"
      >
        <div 
          data-export-wrapper
          style={{
            width: '1584px',
            height: '396px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out',
            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.25)',
            marginTop: `-${(396 * (1 - scale)) / 2}px`,
            marginBottom: `-${(396 * (1 - scale)) / 2}px`,
          }}
        >
          <div ref={bannerRef} className="w-full h-full">
            <BannerPreview config={config} updateConfig={updateConfig} />
          </div>
        </div>
      </div>

      <div 
        className="flex items-center justify-between z-10 mx-auto"
        style={{ width: `${1584 * scale}px`, maxWidth: '100%' }}
      >
        <div className="w-32" />
        <div className="flex gap-2">
          <Button 
            onClick={handleFunkyGenerate} 
            disabled={!!generatingType}
            size="sm" 
            variant="secondary"
            className="w-32 transition-all duration-300 border border-gray-200 bg-white hover:bg-gray-50 text-gray-900"
          >
            <span className={`mr-1 ${generatingType === 'funky' ? 'animate-spin' : ''}`}>🔥</span>
            {generatingType === 'funky' ? 'Going funky...' : 'Go Funky'}
          </Button>
          <Button 
            onClick={handleNormalGenerate} 
            disabled={!!generatingType}
            size="sm" 
            className="w-36 transition-all duration-300"
          >
            <span className={`mr-1 ${generatingType === 'normal' ? 'animate-pulse' : ''}`}>✨</span>
            {generatingType === 'normal' ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>
    </div>
  );
});