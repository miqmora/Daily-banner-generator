import svgPaths from "./svg-7wrmkukqde";

function ExtrudedPlaceholder() {
  return (
    <div className="relative size-[435.41px]" data-name="Extruded Placeholder">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436 436">
        <g clipPath="url(#clip0_29_1314)" id="Extruded Placeholder">
          <g id="Extrusion">
            <path d={svgPaths.p2e10a400} fill="var(--fill-0, #0E0E0E)" />
            <path d={svgPaths.p2e10a400} fill="var(--fill-0, #0E0E0E)" />
            <path d={svgPaths.p3ceaab40} fill="var(--fill-0, #0E0E0E)" />
            <path d={svgPaths.p18a87a00} fill="var(--fill-0, #0E0E0E)" />
            <path d={svgPaths.p3bdf7a80} fill="var(--fill-0, #0E0E0E)" />
            <path d={svgPaths.p316df730} fill="var(--fill-0, #0E0E0E)" />
          </g>
          <path d={svgPaths.p1f167a80} fill="url(#paint0_linear_29_1314)" id="Placeholder" stroke="var(--stroke-0, #0E0E0E)" strokeWidth="7.77518" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_29_1314" x1="397.973" x2="35.0623" y1="325.345" y2="157.637">
            <stop stopColor="#F64A37" />
            <stop offset="1" stopColor="#F2DA49" />
          </linearGradient>
          <clipPath id="clip0_29_1314">
            <rect fill="white" height="435.41" width="435.41" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function ShapeB() {
  return (
    <div className="relative size-full" data-name="Shape B">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.2564487159252167)+(var(--transform-inner-height)*0.9665578603744507)))] items-center justify-center left-[-102.04px] top-[-113.04px] w-[calc(1px*((var(--transform-inner-height)*0.2564487159252167)+(var(--transform-inner-width)*0.9665578603744507)))]" style={{ "--transform-inner-width": "435.40625", "--transform-inner-height": "435.40625" } as React.CSSProperties}>
        <div className="flex-none rotate-[345.141deg]">
          <ExtrudedPlaceholder />
        </div>
      </div>
    </div>
  );
}