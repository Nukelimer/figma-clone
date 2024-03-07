import CursorSVG from "@/public/assets/CursorSVG";
import { CursorChatProps, CursorMode } from "@/types/type";

function CursorChat({
  
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
    });
  };
  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,

        // @ts-ignore
        previousMessage: cursorState.message,
        message: "",
      });
    } else if (e.key === "Escape") {
      setCursorState({
        mode: CursorMode.Hidden,
      });
    }
  };

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}>
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />
          <div className="absolute left-2 top-5 bg-blue-400 px-4 text-sm leading-relaxed text-white rounded-md"
          
            onKeyUp={(e) => {
            e.stopPropagation()
          }}
          >
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}

            <input
              className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-100 py-2 outline-none"
              autoFocus={true}
              onChange={changeHandler}
              onKeyDown={keyDownHandler}
              placeholder={
                cursorState.previousMessage ? "" : "type your message..."
              }
              value={cursorState.message}
              maxLength={100}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CursorChat;
