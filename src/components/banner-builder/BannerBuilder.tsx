import React, { useState, useRef } from "react";
import { ASSETS, BannerElement, ElementType } from "./assets";
import { DraggableElement } from "./DraggableElement";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { 
    Plus, 
    Download, 
    Trash2, 
    Type, 
    Image as ImageIcon, 
    Shapes, 
    PenTool,
    Palette,
    Layers
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";

// Default Banner Size
const BANNER_WIDTH = 1584;
const BANNER_HEIGHT = 396;

export default function BannerBuilder() {
  const [elements, setElements] = useState<BannerElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bgStart, setBgStart] = useState("#539aff");
  const [bgEnd, setBgEnd] = useState("#7ae5e7");
  
  // Refs for calculating center
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedElement = elements.find((el) => el.id === selectedId);

  const addElement = (type: ElementType, assetKey?: string, content?: string, extraProps?: any) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newElement: BannerElement = {
      id,
      type,
      content: content || "",
      x: BANNER_WIDTH / 2 - 100, // Centerish
      y: BANNER_HEIGHT / 2 - 100,
      rotation: 0,
      scale: 1,
      width: 200,
      height: 200,
      zIndex: elements.length + 1,
      assetKey,
      ...extraProps
    };

    setElements([...elements, newElement]);
    setSelectedId(id);
    toast.success("Element added");
  };

  const updateElement = (id: string, changes: Partial<BannerElement>) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...changes } : el)));
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
    toast.success("Element removed");
  };

  // Handlers for adding specific assets
  const addShape = (key: string) => {
      let content = "";
      let width = 300;
      let height = 300;

      if (key.startsWith('extruded')) {
         // Extruded shapes use custom rendering in DraggableElement
         width = key === 'extruded1' ? 400 : 300;
         height = width;
      } else if (key.startsWith('blob')) {
         // SVG Blobs
         // @ts-ignore
         content = ASSETS.svgs[key];
         width = 400;
         height = 400;
      }

      addElement('shape', key, content, { width, height });
  };

  const addScribble = (key: string) => {
      // @ts-ignore
      const src = ASSETS.images[key];
      addElement('image', key, src, { width: 400, height: 400 });
  };

  const addSticker = (key: string) => {
      // @ts-ignore
      const src = ASSETS.images[key];
      let width = 400;
      let height = 120;
      
      if (key === 'stickerWordmark' || key === 'glossySticker') {
          width = 500;
          height = 200;
      }

      addElement('sticker', key, src, { width, height });
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden flex-col md:flex-row">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-slate-100">
           <h1 className="font-bold text-xl text-slate-800">Banner Builder</h1>
           <p className="text-xs text-slate-500">Design your LinkedIn Header</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            
            {/* Background Controls */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <Palette size={16} /> Background
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label className="text-xs">Start Color</Label>
                        <div className="flex items-center gap-2">
                            <Input 
                                type="color" 
                                value={bgStart} 
                                onChange={(e) => setBgStart(e.target.value)}
                                className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden"
                            />
                            <span className="text-xs text-slate-400 uppercase">{bgStart}</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">End Color</Label>
                        <div className="flex items-center gap-2">
                            <Input 
                                type="color" 
                                value={bgEnd} 
                                onChange={(e) => setBgEnd(e.target.value)}
                                className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden"
                            />
                            <span className="text-xs text-slate-400 uppercase">{bgEnd}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Add Elements Tabs */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                    <Plus size={16} /> Add Elements
                </h3>
                
                <Tabs defaultValue="shapes" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="shapes"><Shapes size={14} /></TabsTrigger>
                        <TabsTrigger value="stickers"><Type size={14} /></TabsTrigger>
                        <TabsTrigger value="scribbles"><PenTool size={14} /></TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="shapes" className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => addShape('extruded1')}>
                             <div className="w-8 h-8 bg-slate-200 rounded-md flex items-center justify-center text-xs">3D L</div>
                             <span className="text-xs">Large 3D</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => addShape('extruded2')}>
                             <div className="w-8 h-8 bg-slate-200 rounded-md flex items-center justify-center text-xs">3D M</div>
                             <span className="text-xs">Medium 3D</span>
                        </Button>
                         <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => addShape('blob1')}>
                             <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs">Blob</div>
                             <span className="text-xs">Soft Blob</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => addShape('blob5')}>
                             <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-xs">Grad</div>
                             <span className="text-xs">Gradient</span>
                        </Button>
                    </TabsContent>

                    <TabsContent value="stickers" className="grid grid-cols-1 gap-2">
                        <Button variant="outline" className="h-16 justify-start px-4 gap-3" onClick={() => addSticker('stickerWordmark')}>
                             <div className="w-24 h-8 bg-black text-white flex items-center justify-center text-[10px] font-bold rotate-[-2deg]">LOGO</div>
                             <span className="text-xs">Black Sticker</span>
                        </Button>
                        <Button variant="outline" className="h-16 justify-start px-4 gap-3" onClick={() => addSticker('stickerBlueWhite')}>
                             <div className="w-24 h-8 bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-lg">LOGO</div>
                             <span className="text-xs">Blue Sticker</span>
                        </Button>
                         <Button variant="outline" className="h-16 justify-start px-4 gap-3" onClick={() => addSticker('glossySticker')}>
                             <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-[10px]">★</div>
                             <span className="text-xs">Glossy Shape</span>
                        </Button>
                    </TabsContent>

                     <TabsContent value="scribbles" className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => addScribble('scribblePink')}>
                             <div className="w-8 h-8 border-2 border-pink-400 rounded-sm"></div>
                             <span className="text-xs">Pink Scratch</span>
                        </Button>
                         <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => addScribble('scribblePurple')}>
                             <div className="w-8 h-8 border-2 border-purple-400 rounded-sm"></div>
                             <span className="text-xs">Purple Mark</span>
                        </Button>
                    </TabsContent>
                </Tabs>
            </div>

            <Separator />

            {/* Selected Element Properties */}
            {selectedElement ? (
                <div className="space-y-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                     <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">Edit Selection</h3>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => removeElement(selectedElement.id)}>
                            <Trash2 size={14} />
                        </Button>
                     </div>
                     
                     <div className="space-y-3">
                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <Label className="text-xs">Rotation</Label>
                                <span className="text-xs text-slate-500">{Math.round(selectedElement.rotation)}°</span>
                            </div>
                            <Slider 
                                value={[selectedElement.rotation]} 
                                min={-180} 
                                max={180} 
                                step={1} 
                                onValueChange={([val]) => updateElement(selectedElement.id, { rotation: val })}
                            />
                        </div>

                         <div className="space-y-1">
                            <div className="flex justify-between">
                                <Label className="text-xs">Scale</Label>
                                <span className="text-xs text-slate-500">{selectedElement.scale.toFixed(1)}x</span>
                            </div>
                            <Slider 
                                value={[selectedElement.scale]} 
                                min={0.1} 
                                max={3} 
                                step={0.1} 
                                onValueChange={([val]) => updateElement(selectedElement.id, { scale: val })}
                            />
                        </div>

                         <div className="space-y-1">
                            <div className="flex justify-between">
                                <Label className="text-xs">Layer Order</Label>
                                <span className="text-xs text-slate-500">{selectedElement.zIndex}</span>
                            </div>
                            <Slider 
                                value={[selectedElement.zIndex]} 
                                min={1} 
                                max={20} 
                                step={1} 
                                onValueChange={([val]) => updateElement(selectedElement.id, { zIndex: val })}
                            />
                        </div>
                        
                        {/* Color picker for SVG shapes */}
                        {(selectedElement.type === 'shape' || selectedElement.type === 'svg') && (
                            <div className="space-y-1 pt-2">
                                <Label className="text-xs">Color</Label>
                                <div className="flex gap-2">
                                    <Input 
                                        type="color" 
                                        value={selectedElement.color || "#F682F2"} 
                                        onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                                        className="h-8 w-full"
                                    />
                                     {selectedElement.assetKey?.startsWith('extruded') && (
                                         <Input 
                                            type="color" 
                                            value={selectedElement.secondaryColor || "#FF834C"} 
                                            onChange={(e) => updateElement(selectedElement.id, { secondaryColor: e.target.value })}
                                            className="h-8 w-full"
                                        />
                                     )}
                                </div>
                            </div>
                        )}
                     </div>
                </div>
            ) : (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <p className="text-xs text-slate-500">Select an element on the canvas to edit its properties.</p>
                </div>
            )}

          </div>
        </ScrollArea>

        {/* Download/Export Action */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
            <Button className="w-full gap-2" onClick={() => toast("This feature would export the banner as PNG")}>
                <Download size={16} /> Export Banner
            </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center overflow-auto relative">
         {/* Grid Background Pattern for Editor feel */}
         <div className="absolute inset-0 opacity-5 pointer-events-none" 
              style={{ 
                  backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
              }} 
         />

         {/* The Banner */}
         <div 
            ref={canvasRef}
            className="relative shadow-2xl overflow-hidden select-none"
            style={{
                width: BANNER_WIDTH,
                height: BANNER_HEIGHT,
                // Scale down to fit screen if needed
                transform: 'scale(0.65)', 
                transformOrigin: 'center',
                background: `linear-gradient(to right, ${bgStart}, ${bgEnd})`
            }}
            onClick={() => setSelectedId(null)}
         >
            {/* Global Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[50] opacity-20 mix-blend-overlay">
                <img src={ASSETS.images.grain} className="w-full h-full object-cover" alt="" />
            </div>

            {/* Render Elements */}
            {elements.map((el) => (
                <DraggableElement 
                    key={el.id} 
                    element={el} 
                    isSelected={selectedId === el.id}
                    onSelect={setSelectedId}
                    onChange={updateElement}
                    onRemove={removeElement}
                />
            ))}

            {/* Placeholder Text if empty */}
            {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50 pointer-events-none">
                    <div className="text-center">
                        <p className="text-4xl font-bold mb-2">Start Building</p>
                        <p className="text-xl">Use the sidebar to add shapes and stickers</p>
                    </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}
