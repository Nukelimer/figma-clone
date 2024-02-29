import CursorSVG from "@/public/assets/CursorSVG";
import { log } from "console";

type Props = {
  message: string;
  x: number;
  y: number;
  color: string;
};

function Cursor({ x, y, message, color }: Props) {
  return (
    <div
      className=" pointer-events-none absolute top-0 left-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
      <CursorSVG color={color} />

          <div className="absolute top-4 left-3 rounded-md text-sm leading-relaxed" style={{backgroundColor: color}}>
              
              {message && <div className="w-[340px] text-white p-2 whitespace-wrap text-left ">{message}</div>}

          </div>
    </div>
  );
}

export default Cursor;
