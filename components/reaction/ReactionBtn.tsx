import React from "react";

type Props = {
  setReaction: (reaction: string) => void;
};

export default function ReactionSelector({ setReaction }: Props) {
  return (
    <div
      className="absolute bottom-20 transform mx-auto right-0 left-0 w-fit h-fit justify-start items-start rounded-md bg-white px-2 flex"
      style={{
        boxShadow:
          "0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onPointerMove={(e) => e.stopPropagation()}>
      <div className="">
        <ReactionButton reaction="👀" onSelect={setReaction} />
      </div>

      <div className="border-l border-gray-200">
        <ReactionButton reaction="😍" onSelect={setReaction} />
      </div>

      <div className="border-l border-gray-200">
        <ReactionButton reaction="🔥" onSelect={setReaction} />
      </div>

      <div className="border-l border-gray-200">
        <ReactionButton reaction="👍" onSelect={setReaction} />
      </div>
      <div className="border-l border-gray-200">
        <ReactionButton reaction="😱" onSelect={setReaction} />
      </div>

      <div className="border-l border-gray-200">
        <ReactionButton reaction="🙁" onSelect={setReaction} />
      </div>

      <div className="border-l border-gray-200">
        <ReactionButton reaction="😑" onSelect={setReaction} />
      </div>

      <div className="border-l border-gray-200">
        <ReactionButton reaction="😒" onSelect={setReaction} />
      </div>

      <div className="border-l border-gray-200">
        <ReactionButton reaction="🤓" onSelect={setReaction} />
      </div>
    </div>
  );
}

function ReactionButton({
  reaction,
  onSelect,
}: {
  reaction: string;
  onSelect: (reaction: string) => void;
}) {
  return (
    <button
      className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => onSelect(reaction)}>
      {reaction}
    </button>
  );
}
