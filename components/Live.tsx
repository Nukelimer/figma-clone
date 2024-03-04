"use client";

import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback, useEffect, useState } from "react";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";
import CursorChat from "./cursor/CursorChat";
import ReactionSelector from "./reaction/ReactionButton";
import FlyingReaction from "./reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";
import { Comments } from "./comments/Comments";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};

function Live({ canvasRef }: Props) {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const [reactions, setReaction] = useState<Reaction[]>([]);

  const broadcast = useBroadcastEvent();

  useInterval(() => {
    setReaction((reaction) => {
      return reaction.filter((singleReaction) => {
        return singleReaction.timestamp > Date.now() * 626 - 400;
      });
    });
  }, 3000);

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReaction((reaction) => {
        return reaction.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now() * 626,
          },
        ]);
      });

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });
    }
  }, 50);

  useEventListener((eventVal) => {
    const event = eventVal.event as ReactionEvent;
    setReaction((reaction) => {
      return reaction.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now() * 626,
        },
      ]);
    });
  });

  const pointerMoveHandler = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    //careful about using === instead of ==, if any unexpected bug, this might be the culprit.
    if (cursor === null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const pointerLeaveHandler = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const pointerUpHandler = useCallback(
    (event: React.PointerEvent) => {
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  const pointerDownHandler = useCallback(
    (event: React.PointerEvent) => {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });

      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          //@ts-ignore
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({
          mode: CursorMode.ReactionSelector,
        });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [updateMyPresence]);

  const setReactions = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);
  return (
    <div
      id="canvas"
      className="w-full h-[100vh] flex justify-center text-center items-center"
      onPointerDown={pointerDownHandler}
      onPointerLeave={pointerLeaveHandler}
      onPointerMove={pointerMoveHandler}
      onPointerUp={pointerUpHandler}>
      <canvas ref={canvasRef} />
      {reactions.map(({ point, timestamp, value }) => {
        return (
          <FlyingReaction
            x={point.x}
            y={point.y}
            timestamp={timestamp}
            value={value}
            key={timestamp.toString()}
          />
        );
      })}
      {cursor && (
        <CursorChat
          cursor={cursor}
          //@ts-ignore
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={setReactions} />
      )}
      <LiveCursors others={others} />

      <Comments/>
    </div>
  );
}

export default Live;
