"use client";

export default function SuggestChip({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm px-3 py-1.5 rounded-full border border-green-300 bg-white hover:bg-green-50 text-green-700 transition"
    >
      {text}
    </button>
  );
}
