import svgPaths from "./svg-huw0uszkcl";

function ExtrudedPlaceholder() {
  return (
    <div className="relative size-[463.975px]" data-name="Extruded Placeholder">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 464 464">
        <g id="Extruded Placeholder">
          <path d={svgPaths.p293fc380} fill="var(--fill-0, #0E0E0E)" id="Extrusion" />
          <path d={svgPaths.p25e9d580} fill="url(#paint0_linear_29_1318)" id="Placeholder" stroke="var(--stroke-0, #0E0E0E)" strokeWidth="8.28526" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_29_1318" x1="353.859" x2="71.8053" y1="324.466" y2="187.537">
            <stop stopColor="#ADEA71" />
            <stop offset="1" stopColor="#19B5A6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function ShapeC() {
  return (
    <div className="relative size-full" data-name="Shape C">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.2716335356235504)+(var(--transform-inner-height)*0.9624007940292358)))] items-center justify-center left-[-151.94px] top-[-105.55px] w-[calc(1px*((var(--transform-inner-height)*0.2716335356235504)+(var(--transform-inner-width)*0.9624007940292358)))]" style={{ "--transform-inner-width": "463.96875", "--transform-inner-height": "463.96875" } as React.CSSProperties}>
        <div className="flex-none rotate-[344.238deg]">
          <ExtrudedPlaceholder />
        </div>
      </div>
    </div>
  );
}