import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { BannerState } from "./BannerBuilder";
import { Upload, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  state: BannerState;
  updateState: (updates: Partial<BannerState>) => void;
}

export function ControlPanel({ state, updateState }: ControlPanelProps) {
  const handleImageUpload = (key: "customLogo" | "customWordmark", e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      updateState({ [key]: url });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Banner Controls</h2>
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => updateState({
                backgroundStart: "#539aff",
                backgroundEnd: "#7ae5e7",
                showScribbles: true,
                showArrows: true,
                showShapes: true,
                showLogo: true,
                showWordmark: true
            })}
            title="Reset Defaults"
        >
            <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="elements">Elements</TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
                <Label>Template Style</Label>
                <Select 
                    value={state.template} 
                    onValueChange={(v: any) => updateState({ template: v })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="shapes">3D Shapes</SelectItem>
                        <SelectItem value="wordmark">Wordmark & Scribbles</SelectItem>
                        <SelectItem value="logo">Logo & Wordmark</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div className="space-y-2">
                <Label>Background Gradient</Label>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Start Color</Label>
                        <div className="flex items-center gap-2">
                            <Input 
                                type="color" 
                                value={state.backgroundStart} 
                                onChange={(e) => updateState({ backgroundStart: e.target.value })}
                                className="h-10 w-10 p-1 cursor-pointer"
                            />
                            <span className="text-xs font-mono">{state.backgroundStart}</span>
                        </div>
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">End Color</Label>
                        <div className="flex items-center gap-2">
                            <Input 
                                type="color" 
                                value={state.backgroundEnd} 
                                onChange={(e) => updateState({ backgroundEnd: e.target.value })}
                                className="h-10 w-10 p-1 cursor-pointer"
                            />
                            <span className="text-xs font-mono">{state.backgroundEnd}</span>
                        </div>
                    </div>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="elements" className="space-y-6">
            <Card>
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm">Visibility</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="show-arrows">Arrows</Label>
                        <Switch 
                            id="show-arrows" 
                            checked={state.showArrows}
                            onCheckedChange={(c) => updateState({ showArrows: c })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="show-scribbles">Scribbles</Label>
                        <Switch 
                            id="show-scribbles" 
                            checked={state.showScribbles}
                            onCheckedChange={(c) => updateState({ showScribbles: c })}
                        />
                    </div>
                     {state.template === 'shapes' && (
                        <div className="flex items-center justify-between">
                            <Label htmlFor="show-shapes">3D Shapes</Label>
                            <Switch 
                                id="show-shapes" 
                                checked={state.showShapes}
                                onCheckedChange={(c) => updateState({ showShapes: c })}
                            />
                        </div>
                    )}
                    {state.template === 'logo' && (
                        <div className="flex items-center justify-between">
                            <Label htmlFor="show-logo">Logo Sticker</Label>
                            <Switch 
                                id="show-logo" 
                                checked={state.showLogo}
                                onCheckedChange={(c) => updateState({ showLogo: c })}
                            />
                        </div>
                    )}
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-wordmark">Wordmark</Label>
                        <Switch 
                            id="show-wordmark" 
                            checked={state.showWordmark}
                            onCheckedChange={(c) => updateState({ showWordmark: c })}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm">Custom Assets</CardTitle>
                    <CardDescription>Upload your own images</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-4">
                    <div className="space-y-2">
                        <Label>Wordmark Image</Label>
                        <div className="flex gap-2">
                            <Input 
                                id="wordmark-upload" 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload("customWordmark", e)}
                            />
                            <Button variant="outline" className="w-full" onClick={() => document.getElementById("wordmark-upload")?.click()}>
                                <Upload className="mr-2 h-4 w-4" /> Upload
                            </Button>
                            {state.customWordmark && (
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => updateState({ customWordmark: null })}
                                >
                                    x
                                </Button>
                            )}
                        </div>
                    </div>
                    
                    {(state.template === 'logo' || state.template === 'shapes') && (
                         <div className="space-y-2">
                            <Label>Logo/Icon Image</Label>
                             <div className="flex gap-2">
                                <Input 
                                    id="logo-upload" 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleImageUpload("customLogo", e)}
                                />
                                <Button variant="outline" className="w-full" onClick={() => document.getElementById("logo-upload")?.click()}>
                                    <Upload className="mr-2 h-4 w-4" /> Upload
                                </Button>
                                 {state.customLogo && (
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => updateState({ customLogo: null })}
                                    >
                                        x
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
