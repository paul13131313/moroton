"use client";

import { useEffect, useState } from "react";

interface SalaryDisplayProps {
  amount: number;
  currency: string;
  currentSalary: number;
  reaction: "underpaid" | "fair" | "overpaid";
}

function formatCurrency(amount: number, currency: string): string {
  const locale = currency === "JPY" ? "ja-JP" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function SalaryDisplay({
  amount,
  currency,
  currentSalary,
  reaction,
}: SalaryDisplayProps) {
  const [displayAmount, setDisplayAmount] = useState(0);
  const diff = amount - currentSalary;

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = amount / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), amount);
      setDisplayAmount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [amount]);

  const reactionEmoji =
    reaction === "underpaid" ? "😤" : reaction === "fair" ? "😊" : "🤑";
  const reactionText =
    reaction === "underpaid"
      ? "あんた安う使われとるで！もっともらい！"
      : reaction === "fair"
      ? "ええ線いっとるやん、まあまあやな"
      : "あんたよう貰っとるなぁ！ええ会社やわ";

  const diffColor =
    diff > 0 ? "text-accent" : diff < 0 ? "text-cyan" : "text-primary";

  return (
    <div className="text-center py-4 lg:py-3">
      <p className="text-sm font-bold text-primary/60 mb-1">あんたの適正年収は…</p>
      <p className="text-4xl md:text-5xl lg:text-4xl font-mono font-bold text-primary animate-count">
        {formatCurrency(displayAmount, currency)}
      </p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className={`text-xl font-mono font-bold ${diffColor}`}>
          {diff > 0 ? "+" : ""}
          {formatCurrency(diff, currency)}
        </span>
        <span className="text-xs text-primary/60">との差額</span>
      </div>
      <div className="mt-3 bg-primary text-white rounded-2xl px-4 py-3 inline-flex items-center gap-2">
        <span className="text-2xl">{reactionEmoji}</span>
        <span className="text-lg">👵</span>
        <p className="font-bold text-sm text-left">{reactionText}</p>
      </div>
    </div>
  );
}
