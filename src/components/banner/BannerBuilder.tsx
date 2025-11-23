import { useState } from "react";
import { BannerPreview } from "./BannerPreview";
import { ControlPanel } from "./ControlPanel";

export type BannerState = {
  template: "shapes" | "wordmark" | "logo";
  backgroundStart: string;
  backgroundEnd: string;
  showScribbles: boolean;
  showArrows: boolean;
  showShapes: boolean;
  showLogo: boolean;
  showWordmark: boolean;
  customLogo: string | null;
  customWordmark: string | null;
};

export const defaultState: BannerState = {
  template: "shapes",
  backgroundStart: "#539aff",
  backgroundEnd: "#7ae5e7",
  showScribbles: true,
  showArrows: true,
  showShapes: true,
  showLogo: true,
  showWordmark: true,
  customLogo: null,
  customWordmark: null,
};

export function BannerBuilder() {
  const [state, setState] = useState<BannerState>(defaultState);

  const updateState = (updates: Partial<BannerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-background overflow-hidden">
      <aside className="w-full md:w-80 flex-shrink-0 border-r bg-card h-full overflow-y-auto">
        <ControlPanel state={state} updateState={updateState} />
      </aside>
      <main className="flex-1 flex items-center justify-center bg-neutral-100 p-8 overflow-auto">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-full">
            <BannerPreview state={state} />
        </div>
      </main>
    </div>
  );
}
