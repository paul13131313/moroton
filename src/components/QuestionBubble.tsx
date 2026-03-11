"use client";

interface QuestionBubbleProps {
  label: string;
  isVisible: boolean;
}

export default function QuestionBubble({ label, isVisible }: QuestionBubbleProps) {
  if (!isVisible) return null;

  return (
    <div className="animate-bubble flex items-start gap-3 mb-2">
      <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xl">
        👵
      </div>
      <div className="bg-primary text-white rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] shadow-lg">
        <p className="text-base leading-relaxed font-bold">{label}</p>
      </div>
    </div>
  );
}
