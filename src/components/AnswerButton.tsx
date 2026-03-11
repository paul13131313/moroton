"use client";

interface AnswerButtonProps {
  label: string;
  onClick: (value: string) => void;
  colorIndex: number;
}

const COLORS = [
  "border-accent hover:bg-accent",
  "border-cyan hover:bg-cyan",
  "border-blue hover:bg-blue",
  "border-yellow hover:bg-yellow",
];

export default function AnswerButton({ label, onClick, colorIndex }: AnswerButtonProps) {
  const colorClass = COLORS[colorIndex % COLORS.length];

  return (
    <button
      onClick={() => onClick(label)}
      className={`border-2 ${colorClass} rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:text-white hover:scale-105 active:scale-95`}
    >
      {label}
    </button>
  );
}
