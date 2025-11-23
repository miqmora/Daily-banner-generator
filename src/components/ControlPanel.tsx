import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BannerConfig } from '../types/banner';
import { Button } from './ui/button';
import { FlipHorizontal, FlipVertical, Shuffle, X } from 'lucide-react';
import { Toggle } from './ui/toggle';

interface ControlPanelProps {
  config: BannerConfig;
  updateConfig: (updates: Partial<BannerConfig>) => void;
  onClose?: () => void;
}

export function ControlPanel({ config, updateConfig, onClose }: ControlPanelProps) {
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const handleRandomizeColors = () => {
    updateConfig({
      gradientStart: getRandomColor(),
      gradientEnd: getRandomColor(),
      scribbleColor: getRandomColor(),
      scribbleColor2: getRandomColor(),
      arrowColor: getRandomColor(),
      wordmarkHue: Math.floor(Math.random() * 360) - 180,
      logoHue: Math.floor(Math.random() * 360) - 180,
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-5 border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Controls</h2>
          <p className="text-xs text-gray-500 mt-1">Customize layers & properties</p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={handleRandomizeColors} title="Randomize Colors">
            <Shuffle className="w-4 h-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} title="Close Panel">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-8 pb-20">
          {/* Background Colors */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs text-gray-500">
              Background
            </h3>
            
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Gradient Start</Label>
                <div className="flex gap-2 items-center">
                  <div className="relative size-8 rounded-full overflow-hidden shadow-sm border border-gray-200 shrink-0">
                    <Input
                      type="color"
                      value={config.gradientStart}
                      onChange={(e) => updateConfig({ gradientStart: e.target.value })}
                      className="absolute inset-[-50%] w-[200%] h-[200%] p-0 border-none cursor-pointer"
                    />
                  </div>
                  <Input
                    value={config.gradientStart}
                    onChange={(e) => updateConfig({ gradientStart: e.target.value })}
                    className="font-mono text-xs h-8"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Gradient End</Label>
                <div className="flex gap-2 items-center">
                  <div className="relative size-8 rounded-full overflow-hidden shadow-sm border border-gray-200 shrink-0">
                    <Input
                      type="color"
                      value={config.gradientEnd}
                      onChange={(e) => updateConfig({ gradientEnd: e.target.value })}
                      className="absolute inset-[-50%] w-[200%] h-[200%] p-0 border-none cursor-pointer"
                    />
                  </div>
                  <Input
                    value={config.gradientEnd}
                    onChange={(e) => updateConfig({ gradientEnd: e.target.value })}
                    className="font-mono text-xs h-8"
                  />
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Wordmark */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs text-gray-500">
                Wordmark
              </h3>
              <Switch
                checked={config.showWordmark}
                onCheckedChange={(checked) => updateConfig({ showWordmark: checked })}
              />
            </div>

            {config.showWordmark && (
              <div className="space-y-4 pl-3 border-l-2 border-gray-100">
                <div className="space-y-1.5">
                  <Label className="text-xs">Style</Label>
                  <Select
                    value={config.wordmarkStyle}
                    onValueChange={(val: any) => updateConfig({ wordmarkStyle: val })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sticker-purple">Purple Sticker</SelectItem>
                      <SelectItem value="sticker-orange">Orange Sticker</SelectItem>
                      <SelectItem value="sticker-green">Green Sticker</SelectItem>
                      <SelectItem value="sticker-black-white">Black/White Sticker</SelectItem>
                      <SelectItem value="text">Custom Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {config.wordmarkStyle === 'text' && (
                  <div className="space-y-1.5">
                    <Label className="text-xs">Text Content</Label>
                    <Input
                      value={config.wordmarkText}
                      onChange={(e) => updateConfig({ wordmarkText: e.target.value })}
                      placeholder="Enter text..."
                      className="h-8 text-xs"
                    />
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Rotation</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.wordmarkRotation}°</span>
                  </div>
                  <Slider
                    min={-180}
                    max={180}
                    step={1}
                    value={[config.wordmarkRotation]}
                    onValueChange={([value]) => updateConfig({ wordmarkRotation: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Scale</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.wordmarkScale.toFixed(1)}x</span>
                  </div>
                  <Slider
                    min={0.5}
                    max={10}
                    step={0.1}
                    value={[config.wordmarkScale]}
                    onValueChange={([value]) => updateConfig({ wordmarkScale: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Hue Shift</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.wordmarkHue}°</span>
                  </div>
                  <Slider
                    min={-180}
                    max={180}
                    step={5}
                    value={[config.wordmarkHue]}
                    onValueChange={([value]) => updateConfig({ wordmarkHue: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Saturation</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.wordmarkSaturation}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={[config.wordmarkSaturation]}
                    onValueChange={([value]) => updateConfig({ wordmarkSaturation: value })}
                    className="py-1"
                  />
                </div>
              </div>
            )}
          </section>

          <Separator />

          {/* Logo */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs text-gray-500">
                Logo Sticker
              </h3>
              <Switch
                checked={config.showLogo}
                onCheckedChange={(checked) => updateConfig({ showLogo: checked })}
              />
            </div>

            {config.showLogo && (
              <div className="space-y-4 pl-3 border-l-2 border-gray-100">
                <div className="space-y-1.5">
                  <Label className="text-xs">Style</Label>
                  <Select
                    value={config.logoStyle}
                    onValueChange={(val: any) => updateConfig({ logoStyle: val })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="glossy">Glossy Sticker</SelectItem>
                      <SelectItem value="black">Black/White Sticker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Rotation</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.logoRotation}°</span>
                  </div>
                  <Slider
                    min={-180}
                    max={180}
                    step={1}
                    value={[config.logoRotation]}
                    onValueChange={([value]) => updateConfig({ logoRotation: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Scale</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.logoScale.toFixed(1)}x</span>
                  </div>
                  <Slider
                    min={0.5}
                    max={10}
                    step={0.1}
                    value={[config.logoScale]}
                    onValueChange={([value]) => updateConfig({ logoScale: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Hue Shift</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.logoHue}°</span>
                  </div>
                  <Slider
                    min={-180}
                    max={180}
                    step={5}
                    value={[config.logoHue]}
                    onValueChange={([value]) => updateConfig({ logoHue: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Saturation</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.logoSaturation}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={[config.logoSaturation]}
                    onValueChange={([value]) => updateConfig({ logoSaturation: value })}
                    className="py-1"
                  />
                </div>
              </div>
            )}
          </section>

          <Separator />

          {/* Scribbles */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs text-gray-500">
                Scribbles (Primary)
              </h3>
              <Switch
                checked={config.showScribbles}
                onCheckedChange={(checked) => updateConfig({ showScribbles: checked })}
              />
            </div>

            {config.showScribbles && (
              <div className="space-y-4 pl-3 border-l-2 border-gray-100">
                <div className="space-y-1.5">
                  <Label className="text-xs">Pattern</Label>
                  <Select
                    value={config.scribbleStyle}
                    onValueChange={(val: any) => updateConfig({ scribbleStyle: val })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scratches">Heavy Scratches</SelectItem>
                      <SelectItem value="misc">Small Spark</SelectItem>
                      <SelectItem value="scribble1">Selected Circles</SelectItem>
                      <SelectItem value="scribble2">Big Spark</SelectItem>
                      <SelectItem value="scribble3">Squible</SelectItem>
                      <SelectItem value="arrow">Arrows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Blend Mode</Label>
                  <Select
                    value={config.scribbleBlendMode}
                    onValueChange={(val: any) => updateConfig({ scribbleBlendMode: val })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overlay">Overlay</SelectItem>
                      <SelectItem value="screen">Screen</SelectItem>
                      <SelectItem value="soft-light">Soft Light</SelectItem>
                      <SelectItem value="hard-light">Hard Light</SelectItem>
                      <SelectItem value="difference">Difference</SelectItem>
                      <SelectItem value="exclusion">Exclusion</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                 <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Rotation</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.scribbleRotation}°</span>
                  </div>
                  <Slider
                    min={-180}
                    max={180}
                    step={1}
                    value={[config.scribbleRotation]}
                    onValueChange={([value]) => updateConfig({ scribbleRotation: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Scale</Label>
                    <span className="text-xs text-gray-500 font-mono">{(config.scribbleScale || 1).toFixed(1)}x</span>
                  </div>
                  <Slider
                    min={0.1}
                    max={5}
                    step={0.1}
                    value={[config.scribbleScale || 1]}
                    onValueChange={([value]) => updateConfig({ scribbleScale: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs">Mirror</Label>
                  <div className="flex gap-2">
                    <Toggle
                      variant="outline"
                      size="sm"
                      pressed={config.scribbleMirrorX}
                      onPressedChange={(pressed) => updateConfig({ scribbleMirrorX: pressed })}
                      aria-label="Mirror Horizontal"
                      className="h-8 px-2 w-full"
                    >
                      <FlipHorizontal className="h-4 w-4 mr-2" />
                      Horizontal
                    </Toggle>
                    <Toggle
                      variant="outline"
                      size="sm"
                      pressed={config.scribbleMirrorY}
                      onPressedChange={(pressed) => updateConfig({ scribbleMirrorY: pressed })}
                      aria-label="Mirror Vertical"
                      className="h-8 px-2 w-full"
                    >
                      <FlipVertical className="h-4 w-4 mr-2" />
                      Vertical
                    </Toggle>
                  </div>
                </div>

                 <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Opacity</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.scribbleOpacity}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[config.scribbleOpacity]}
                    onValueChange={([value]) => updateConfig({ scribbleOpacity: value })}
                    className="py-1"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Scribbles 2 */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs text-gray-500">
                Scribbles (Secondary)
              </h3>
              <Switch
                checked={config.showScribbles2}
                onCheckedChange={(checked) => updateConfig({ showScribbles2: checked })}
              />
            </div>

            {config.showScribbles2 && (
              <div className="space-y-4 pl-3 border-l-2 border-gray-100">
                <div className="space-y-1.5">
                  <Label className="text-xs">Pattern</Label>
                  <Select
                    value={config.scribbleStyle2}
                    onValueChange={(val: any) => updateConfig({ scribbleStyle2: val })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scratches">Heavy Scratches</SelectItem>
                      <SelectItem value="misc">Small Spark</SelectItem>
                      <SelectItem value="scribble1">Selected Circles</SelectItem>
                      <SelectItem value="scribble2">Big Spark</SelectItem>
                      <SelectItem value="scribble3">Squible</SelectItem>
                      <SelectItem value="arrow">Arrows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Blend Mode</Label>
                  <Select
                    value={config.scribbleBlendMode2}
                    onValueChange={(val: any) => updateConfig({ scribbleBlendMode2: val })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overlay">Overlay</SelectItem>
                      <SelectItem value="screen">Screen</SelectItem>
                      <SelectItem value="soft-light">Soft Light</SelectItem>
                      <SelectItem value="hard-light">Hard Light</SelectItem>
                      <SelectItem value="difference">Difference</SelectItem>
                      <SelectItem value="exclusion">Exclusion</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                 <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Rotation</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.scribbleRotation2}°</span>
                  </div>
                  <Slider
                    min={-180}
                    max={180}
                    step={1}
                    value={[config.scribbleRotation2]}
                    onValueChange={([value]) => updateConfig({ scribbleRotation2: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Scale</Label>
                    <span className="text-xs text-gray-500 font-mono">{(config.scribbleScale2 || 1).toFixed(1)}x</span>
                  </div>
                  <Slider
                    min={0.1}
                    max={5}
                    step={0.1}
                    value={[config.scribbleScale2 || 1]}
                    onValueChange={([value]) => updateConfig({ scribbleScale2: value })}
                    className="py-1"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs">Mirror</Label>
                  <div className="flex gap-2">
                    <Toggle
                      variant="outline"
                      size="sm"
                      pressed={config.scribbleMirrorX2}
                      onPressedChange={(pressed) => updateConfig({ scribbleMirrorX2: pressed })}
                      aria-label="Mirror Horizontal"
                      className="h-8 px-2 w-full"
                    >
                      <FlipHorizontal className="h-4 w-4 mr-2" />
                      Horizontal
                    </Toggle>
                    <Toggle
                      variant="outline"
                      size="sm"
                      pressed={config.scribbleMirrorY2}
                      onPressedChange={(pressed) => updateConfig({ scribbleMirrorY2: pressed })}
                      aria-label="Mirror Vertical"
                      className="h-8 px-2 w-full"
                    >
                      <FlipVertical className="h-4 w-4 mr-2" />
                      Vertical
                    </Toggle>
                  </div>
                </div>

                 <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Opacity</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.scribbleOpacity2}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[config.scribbleOpacity2]}
                    onValueChange={([value]) => updateConfig({ scribbleOpacity2: value })}
                    className="py-1"
                  />
                </div>
              </div>
            )}
          </section>

          <Separator />



           {/* 3D Shapes */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs text-gray-500">
                3D Elements
              </h3>
              <Switch
                checked={config.showShapes}
                onCheckedChange={(checked) => updateConfig({ showShapes: checked })}
              />
            </div>

            {config.showShapes && (
              <div className="space-y-4 pl-3 border-l-2 border-gray-100">
                 <div className="space-y-1.5">
                  <Label className="text-xs">Variant</Label>
                  <Select
                    value={config.shapeStyle}
                    onValueChange={(val: any) => updateConfig({ shapeStyle: val })}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extrusion1">Star</SelectItem>
                      <SelectItem value="extrusion2">Flower</SelectItem>
                      <SelectItem value="shapeB">Stairs</SelectItem>
                      <SelectItem value="shapeC">Wavy</SelectItem>
                      <SelectItem value="shapeD">Spikes</SelectItem>
                      <SelectItem value="cluster">Cluster</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-xs">Scale</Label>
                    <span className="text-xs text-gray-500 font-mono">{(config.shapeScale || 1).toFixed(1)}x</span>
                  </div>
                  <Slider
                    min={0.1}
                    max={5}
                    step={0.1}
                    value={[config.shapeScale || 1]}
                    onValueChange={([value]) => updateConfig({ shapeScale: value })}
                    className="py-1"
                  />
                </div>
              </div>
            )}
          </section>

          <Separator />

          {/* Grain */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 uppercase tracking-wider text-xs text-gray-500">
                Texture
              </h3>
              <Switch
                checked={config.showGrain}
                onCheckedChange={(checked) => updateConfig({ showGrain: checked })}
              />
            </div>
             {config.showGrain && (
                <div className="space-y-3 pl-3 border-l-2 border-gray-100">
                   <div className="flex justify-between">
                    <Label className="text-xs">Intensity</Label>
                    <span className="text-xs text-gray-500 font-mono">{config.grainOpacity}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    value={[config.grainOpacity]}
                    onValueChange={([value]) => updateConfig({ grainOpacity: value })}
                    className="py-1"
                  />
                </div>
             )}
          </section>

        </div>
      </div>
    </div>
  );
}
