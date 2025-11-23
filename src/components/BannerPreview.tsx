import { useState, useEffect } from 'react';
import { BannerConfig } from '../types/banner';
import { ASSETS } from './banner-builder/assets';
import SvgBlobs from '../imports/SvgBlobs';
import { DraggableElement } from './DraggableElement';
import arrowAsset from 'figma:asset/ab0f0072e277b289cd99222e445e76c7c079c397.png';
import heavyScratchesAsset from 'figma:asset/703be059895885fdf9302d8e30e4d0153b6e7a8c.png';

interface BannerPreviewProps {
  config: BannerConfig;
  updateConfig: (updates: Partial<BannerConfig>) => void;
}

export function BannerPreview({ config, updateConfig }: BannerPreviewProps) {
  return (
    <div 
      data-banner-container
      className="relative w-[1584px] h-[396px] overflow-hidden select-none"
      style={{
        background: `linear-gradient(to right, ${config.gradientStart}, ${config.gradientEnd})`,
        color: '#000000', // Ensure safe color for html2canvas (overriding oklch vars)
      }}
    >
      <style>{`
        /* Override global Tailwind styles that use oklch colors */
        [data-banner-container] * {
          outline-color: transparent !important;
          border-color: rgba(0,0,0,0.1); /* Safe fallback */
        }
      `}</style>

      {/* 1. Gradient Blobs (Background Elements) */}
      <DraggableElement
        x={config.blobX}
        y={config.blobY}
        onPositionChange={(x, y) => updateConfig({ blobX: x, blobY: y })}
      >
        <GradientBlobs hue={config.blobHue || 0} />
      </DraggableElement>

      {/* 2. Scribbles (Mid-layer) */}
      {config.showScribbles && (
        <DraggableElement
          x={config.scribbleX}
          y={config.scribbleY}
          onPositionChange={(x, y) => updateConfig({ scribbleX: x, scribbleY: y })}
        >
          <Scribbles 
            style={config.scribbleStyle} 
            color="#FFFFFF"
            blendMode={config.scribbleBlendMode}
            opacity={config.scribbleOpacity}
            rotation={config.scribbleRotation}
            scale={config.scribbleScale || 1}
            mirrorX={config.scribbleMirrorX}
            mirrorY={config.scribbleMirrorY}
          />
        </DraggableElement>
      )}

      {/* 2b. Secondary Scribbles */}
      {config.showScribbles2 && (
        <DraggableElement
          x={config.scribbleX2}
          y={config.scribbleY2}
          onPositionChange={(x, y) => updateConfig({ scribbleX2: x, scribbleY2: y })}
        >
          <Scribbles 
            style={config.scribbleStyle2} 
            color="#FFFFFF"
            blendMode={config.scribbleBlendMode2}
            opacity={config.scribbleOpacity2}
            rotation={config.scribbleRotation2}
            scale={config.scribbleScale2 || 1}
            mirrorX={config.scribbleMirrorX2}
            mirrorY={config.scribbleMirrorY2}
          />
        </DraggableElement>
      )}

      {/* 3. Arrows (Separate Layer) */}
      {config.showArrows && (
        <DraggableElement
          x={config.arrowX}
          y={config.arrowY}
          onPositionChange={(x, y) => updateConfig({ arrowX: x, arrowY: y })}
        >
          <Scribbles 
            style="arrow"
            color={config.arrowColor}
            opacity={config.arrowOpacity}
            rotation={config.arrowRotation}
            scale={config.arrowScale || 1}
            mirrorX={false}
            mirrorY={false}
          />
        </DraggableElement>
      )}

      {/* 4. Extruded Shapes */}
      {config.showShapes && (
        <DraggableElement
          x={config.shapeX}
          y={config.shapeY}
          onPositionChange={(x, y) => updateConfig({ shapeX: x, shapeY: y })}
        >
          <ExtrudedShapes 
            style={config.shapeStyle} 
            scale={config.shapeScale || 1}
            hue={config.shapeHue || 0}
          />
        </DraggableElement>
      )}

      {/* 4b. Shape 2 */}
      {config.showShapes2 && (
        <DraggableElement
          x={config.shapeX2}
          y={config.shapeY2}
          onPositionChange={(x, y) => updateConfig({ shapeX2: x, shapeY2: y })}
        >
          <ExtrudedShapes 
            style={config.shapeStyle2} 
            scale={config.shapeScale2 || 1}
            hue={config.shapeHue2 || 0}
          />
        </DraggableElement>
      )}

      {/* 4c. Shape 3 */}
      {config.showShapes3 && (
        <DraggableElement
          x={config.shapeX3}
          y={config.shapeY3}
          onPositionChange={(x, y) => updateConfig({ shapeX3: x, shapeY3: y })}
        >
          <ExtrudedShapes 
            style={config.shapeStyle3} 
            scale={config.shapeScale3 || 1}
            hue={config.shapeHue3 || 0}
          />
        </DraggableElement>
      )}

      {/* 5. Grain (Texture Overlay) */}
      {config.showGrain && (
        <Grain opacity={config.grainOpacity} />
      )}

      {/* 6. Wordmark (Main Content) */}
      {config.showWordmark && (
        <DraggableElement
          x={config.wordmarkX}
          y={config.wordmarkY}
          onPositionChange={(x, y) => updateConfig({ wordmarkX: x, wordmarkY: y })}
        >
          <Wordmark config={config} />
        </DraggableElement>
      )}

      {/* 7. Logo (Secondary Content) */}
      {config.showLogo && (
        <DraggableElement
          x={config.logoX}
          y={config.logoY}
          onPositionChange={(x, y) => updateConfig({ logoX: x, logoY: y })}
        >
          <Logo config={config} />
        </DraggableElement>
      )}

      {/* Preload Mask Images for html2canvas CORS */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
         <img src={heavyScratchesAsset} crossOrigin="anonymous" alt="" />
         <img src={ASSETS.images.scribbleMix1} crossOrigin="anonymous" alt="" />
         <img src={ASSETS.images.scribbleMix2} crossOrigin="anonymous" alt="" />
         <img src={ASSETS.images.scribbleMix3} crossOrigin="anonymous" alt="" />
         <img src={ASSETS.images.scribbleBlue} crossOrigin="anonymous" alt="" />
         <img src={ASSETS.images.grain} crossOrigin="anonymous" alt="" />
      </div>
    </div>
  );
}

// --- Sub-components ---

const useCorsUrl = (url: string) => {
  const [corsUrl, setCorsUrl] = useState(url);

  useEffect(() => {
    if (!url || url.startsWith('data:') || url.startsWith('blob:')) return;

    let active = true;
    // Fetch with anonymous credentials to match crossOrigin="anonymous"
    fetch(url, { mode: 'cors', credentials: 'anonymous' })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.blob();
      })
      .then(blob => {
        if (active) {
          const objectUrl = URL.createObjectURL(blob);
          setCorsUrl(objectUrl);
        }
      })
      .catch(err => {
        // If fetch fails (e.g. strict CORS), we stick to the original URL.
        // html2canvas might still fail, but we did our best.
        console.warn('Failed to fetch asset with CORS, falling back to original:', url, err);
      });
      
    return () => { 
      active = false;
      if (corsUrl.startsWith('blob:')) {
        URL.revokeObjectURL(corsUrl);
      }
    };
  }, [url]);

  return corsUrl;
};

function GradientBlobs({ hue }: { hue: number }) {
  return (
    <div className="w-[1584px] h-[396px] pointer-events-none">
      <div className="w-full h-full pointer-events-auto">
        <SvgBlobs hue={hue} />
      </div>
    </div>
  );
}

function Scribbles({ style, color, blendMode, opacity, rotation, scale = 1, mirrorX = false, mirrorY = false }: { 
  style: BannerConfig['scribbleStyle'], 
  color: string, 
  blendMode?: string,
  opacity: number, 
  rotation: number,
  scale?: number,
  mirrorX?: boolean,
  mirrorY?: boolean
}) {
  const scaleX = mirrorX ? -1 : 1;
  const scaleY = mirrorY ? -1 : 1;

  const containerStyle: React.CSSProperties = {
    opacity: opacity / 100,
    transform: `rotate(${rotation}deg) scale(${scale}) scaleX(${scaleX}) scaleY(${scaleY})`,
    mixBlendMode: (blendMode || 'overlay') as any,
  };

  // Determine the asset URL based on style
  let assetUrl = '';
  if (style === 'scratches') assetUrl = heavyScratchesAsset;
  else if (style === 'scribble1') assetUrl = ASSETS.images.scribbleMix1;
  else if (style === 'scribble2') assetUrl = ASSETS.images.scribbleMix2;
  else if (style === 'scribble3') assetUrl = ASSETS.images.scribbleMix3;
  else if (style === 'arrow') assetUrl = arrowAsset;
  else assetUrl = ASSETS.images.scribbleBlue; // default/misc

  const corsUrl = useCorsUrl(assetUrl);

  if (style === 'scratches') {
    return (
      <div 
        className="w-[2052px] h-[1450px] pointer-events-none"
        style={{ 
          ...containerStyle,
          marginLeft: '-450px', // Center offset for larger size
          marginTop: '-320px',
        }}
      >
         <div className="w-full h-full rotate-[170deg] scale-y-[-1]">
           <div 
            className="absolute left-[55px] top-[23px] w-[1950px] h-[1400px] pointer-events-auto"
            style={{
              backgroundColor: color,
              maskImage: `url('${corsUrl}')`,
              maskSize: 'contain',
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
              WebkitMaskImage: `url('${corsUrl}')`,
              WebkitMaskSize: 'contain',
              WebkitMaskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
            }}
           />
         </div>
      </div>
    );
  }

  if (style === 'scribble1') {
    // Large Illustration
    return (
      <div 
        className="w-[1200px] h-[615px] pointer-events-none"
        style={containerStyle}
      >
         <div 
          className="absolute inset-0 pointer-events-auto"
          style={{
            backgroundColor: color,
            maskImage: `url('${corsUrl}')`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url('${corsUrl}')`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
         />
      </div>
    );
  }

  if (style === 'scribble2') {
    // Misc 1 (Vertical-ish)
    return (
      <div 
        className="w-[388px] h-[786px] pointer-events-none"
        style={containerStyle}
      >
         <div 
          className="absolute inset-0 pointer-events-auto"
          style={{
            backgroundColor: color,
            maskImage: `url('${corsUrl}')`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url('${corsUrl}')`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
         />
      </div>
    );
  }

  if (style === 'scribble3') {
    // Misc 2 (Horizontal-ish)
    return (
      <div 
        className="w-[625px] h-[312px] pointer-events-none"
        style={containerStyle}
      >
         <div 
          className="absolute inset-0 pointer-events-auto"
          style={{
            backgroundColor: color,
            maskImage: `url('${corsUrl}')`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url('${corsUrl}')`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
         />
      </div>
    );
  }

  if (style === 'arrow') {
    return (
      <div 
        className="w-[500px] h-[500px] pointer-events-none overflow-hidden"
        style={containerStyle}
      >
        <div className="absolute inset-0 pointer-events-auto">
           <img 
             src={corsUrl}
             crossOrigin="anonymous"
             className="w-full h-full object-contain"
             alt="Arrow"
             draggable={false}
           />
        </div>
      </div>
    );
  }

  // Default 'misc'
  return (
    <div 
      className="w-[164px] h-[180px] pointer-events-none"
      style={containerStyle}
    >
      <div 
        className="absolute inset-0 pointer-events-auto"
        style={{
          backgroundColor: color,
          maskImage: `url('${corsUrl}')`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url('${corsUrl}')`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}


function ExtrudedShapes({ style, scale = 1, hue = 0 }: { style: BannerConfig['shapeStyle'], scale?: number, hue?: number }) {
  const content = (() => {
    if (style === 'extrusion1') {
      return (
         <div className="w-[493px] h-[493px] rotate-[40deg] pointer-events-none">
          <svg viewBox="0 0 494 494" className="w-full h-full pointer-events-none">
            <path d={ASSETS.svgs.extrusion1} fill="#1F1F1F" className="pointer-events-auto" />
            <path d={ASSETS.svgs.placeholder1} fill="white" stroke="#1F1F1F" strokeWidth="8" className="pointer-events-auto" />
          </svg>
         </div>
      );
    }
    
    if (style === 'extrusion2') {
      return (
        <div className="w-[377px] h-[377px] rotate-[33deg] pointer-events-none">
          <svg viewBox="0 0 378 378" className="w-full h-full pointer-events-none">
            <path d={ASSETS.svgs.extrusion2} fill="#1F1F1F" className="pointer-events-auto" />
            <path d={ASSETS.svgs.placeholder2} fill="#F682F2" stroke="#1F1F1F" strokeWidth="6" className="pointer-events-auto" />
          </svg>
        </div>
      );
    }

    if (style === 'extrusion3') {
      return (
        <div className="w-[416px] h-[416px] rotate-[4deg] pointer-events-none">
          <svg viewBox="0 0 417 417" className="w-full h-full pointer-events-none">
            <path d={ASSETS.svgs.extrusion3} fill="#1F1F1F" className="pointer-events-auto" />
            <path d={ASSETS.svgs.placeholder3} fill="#7AE5E7" stroke="#1F1F1F" strokeWidth="7" className="pointer-events-auto" />
          </svg>
        </div>
      );
    }

    if (style === 'shapeB') {
      return (
        <div className="w-[436px] h-[436px] pointer-events-none">
          <img 
            src={ASSETS.images.shapeB} 
            crossOrigin="anonymous"
            alt="Shape B" 
            className="w-full h-full object-contain pointer-events-auto drop-shadow-xl" 
            draggable={false}
          />
        </div>
      );
    }

    if (style === 'shapeC') {
      return (
        <div className="w-[464px] h-[464px] rotate-[0deg] pointer-events-none">
          <svg viewBox="0 0 464 464" className="w-full h-full pointer-events-none">
            <g className="pointer-events-auto">
              <path d={ASSETS.svgs.shapeC_p293fc380} fill="#1F1F1F" />
              <path d={ASSETS.svgs.shapeC_p25e9d580} fill="url(#paint0_linear_shapeC)" stroke="#1F1F1F" strokeWidth="8.28526" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_shapeC" x1="353.859" x2="71.8053" y1="324.466" y2="187.537">
                <stop stopColor="#ADEA71" />
                <stop offset="1" stopColor="#19B5A6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    // Shape D (Spikes)
    if (style === 'shapeD') {
      return (
        <div className="w-[355px] h-[353px] pointer-events-none">
          <img 
            src={ASSETS.images.shapeD} 
            crossOrigin="anonymous"
            alt="Spikes" 
            className="w-full h-full object-contain pointer-events-auto drop-shadow-xl" 
            draggable={false}
          />
        </div>
      );
    }

    // Cluster case removed per user request
    return null;
  })();

  if (!content) return null;

  return (
    <div style={{ transform: `scale(${scale})`, filter: `hue-rotate(${hue}deg)` }} className="pointer-events-none">
      {content}
    </div>
  );
}

function Grain({ opacity }: { opacity: number }) {
  const corsUrl = useCorsUrl(ASSETS.images.grain);

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
      style={{ opacity: opacity / 100 }}
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${corsUrl})`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}

function Wordmark({ config }: { config: BannerConfig }) {
  const style = {
    transform: `rotate(${config.wordmarkRotation}deg) scale(${config.wordmarkScale})`,
    filter: `hue-rotate(${config.wordmarkHue}deg) saturate(${config.wordmarkSaturation}%)`
  };

  const commonImgProps = {
    style: {
      ...style,
      width: '900px',
      height: 'auto',
      maxWidth: 'none',
    },
    className: "object-contain drop-shadow-xl pointer-events-auto",
    alt: "Wordmark",
    draggable: false,
    crossOrigin: "anonymous" as const
  };

  if (config.wordmarkStyle === 'sticker-color') {
    return <img src={ASSETS.images.stickerDailyMotionPurple} {...commonImgProps} />;
  }

  if (config.wordmarkStyle === 'sticker-black-white') {
    return <img src={ASSETS.images.stickerDailyMotionBlack} {...commonImgProps} />;
  }

  // Text fallback
  return (
    <div style={style} className="pointer-events-none">
      <div className="bg-white px-12 py-6 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto whitespace-nowrap">
        <h1 className="text-6xl font-bold tracking-tighter text-black">
          {config.wordmarkText || "YOUR BRAND"}
        </h1>
      </div>
    </div>
  );
}

function Logo({ config }: { config: BannerConfig }) {
  const style = {
    transform: `rotate(${config.logoRotation}deg) scale(${config.logoScale})`,
    filter: `hue-rotate(${config.logoHue}deg) saturate(${config.logoSaturation}%)`
  };

  if (config.logoStyle === 'black') {
    return (
      <img 
        src={ASSETS.images.logoBlack} 
        crossOrigin="anonymous"
        style={{
          ...style,
          width: '557px',
          height: 'auto',
          maxWidth: 'none',
        }}
        className="object-contain drop-shadow-xl pointer-events-auto"
        alt="Logo"
        draggable={false}
      />
    );
  }

  return (
    <img 
      src={ASSETS.images.glossySticker} 
      crossOrigin="anonymous"
      style={{
        ...style,
        width: '557px',
        height: 'auto',
        maxWidth: 'none', // Prevent squishing
      }}
      className="object-contain drop-shadow-2xl pointer-events-auto"
      alt="Logo"
      draggable={false}
    />
  );
}
