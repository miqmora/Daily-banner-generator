import { useState, useRef } from 'react';
import { BannerEditor, BannerEditorHandle } from './components/BannerEditor';
import { ControlPanel } from './components/ControlPanel';
import { BannerConfig } from './types/banner';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { Settings2, Download } from 'lucide-react';

export default function App() {
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const editorRef = useRef<BannerEditorHandle>(null);

  const [config, setConfig] = useState<BannerConfig>({
    gradientStart: '#539aff',
    gradientEnd: '#7ae5e7',
    
    // Wordmark
    showWordmark: true,
    wordmarkStyle: 'sticker-purple',
    wordmarkText: 'BRAND',
    wordmarkRotation: -16,
    wordmarkScale: 1,
    wordmarkHue: 0,
    wordmarkSaturation: 100,
    wordmarkX: 35,
    wordmarkY: 50,

    // Logo
    showLogo: false,
    logoStyle: 'glossy',
    logoRotation: 0,
    logoScale: 1,
    logoHue: 0,
    logoSaturation: 100,
    logoX: 80,
    logoY: 40,

    // Scribbles
    showScribbles: true,
    scribbleStyle: 'scratches',
    scribbleColor: '#f682f2',
    scribbleOpacity: 100,
    scribbleRotation: 0,
    scribbleX: 50,
    scribbleY: 50,

    // Arrows
    showArrows: true,
    arrowColor: '#ffffff',
    arrowOpacity: 70,
    arrowRotation: 0,
    arrowScale: 1,
    arrowX: 20,
    arrowY: 20,

    // Shapes
    showShapes: true,
    shapeStyle: 'extrusion1',
    shapeScale: 1,
    shapeX: 75,
    shapeY: 20,
    
    showShapes2: false,
    shapeStyle2: 'extrusion2',
    shapeScale2: 1,
    shapeX2: 70,
    shapeY2: 25,

    showShapes3: false,
    shapeStyle3: 'extrusion3',
    shapeScale3: 1,
    shapeX3: 80,
    shapeY3: 25,

    // Grain
    showGrain: true,
    grainOpacity: 20,
    grainX: 50,
    grainY: 50,

    // Background Blobs
    blobX: 50,
    blobY: 50,
  });

  const [currentScale, setCurrentScale] = useState(1);

  const updateConfig = (updates: Partial<BannerConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex-none z-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Daily Banner Generator</h1>
            <p className="text-xs text-gray-500 mt-0.5">Hit Generate or Go Funky. Drag to adjust. Tweak via Controls.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => editorRef.current?.download()}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Controls Sidebar */}
        {isControlsOpen && (
          <div className="w-[320px] flex-none h-full flex flex-col border-r border-gray-200 bg-white shadow-xl z-10">
            <ControlPanel 
              config={config} 
              updateConfig={updateConfig} 
              onClose={() => setIsControlsOpen(false)}
            />
          </div>
        )}

        {/* Controls Button (when sidebar is closed) */}
        {!isControlsOpen && (
          <div className="absolute bottom-6 left-6 z-50">
            <Button 
              onClick={() => setIsControlsOpen(true)} 
              className="shadow-lg gap-2 bg-white text-black hover:bg-gray-100 border border-gray-200"
              size="lg"
            >
              <Settings2 className="w-4 h-4" />
              Controls
            </Button>
          </div>
        )}

        {/* Right Side: Editor/Preview */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-5xl h-full max-h-[600px]">
              <BannerEditor ref={editorRef} config={config} updateConfig={updateConfig} onScaleChange={setCurrentScale} />
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}