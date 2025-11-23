import imgColor from "figma:asset/1fe9b16076e783edc9ab94cbbea456ad3f4343c0.png";

function ScribblesMiscellaneous() {
  return (
    <div className="opacity-80 relative size-full" data-name="Scribbles - Miscellaneous">
      <div className="absolute bg-white inset-[2.76%_-0.04%_4.44%_1.02%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.005px_-8.615px] mask-size-[625.445px_313.113px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none h-[312.5px] rotate-[180deg] scale-y-[-100%] w-[625px]">
          <ScribblesMiscellaneous />
        </div>
      </div>
    </div>
  );
}