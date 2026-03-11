"use client";

import { useEffect, useState } from "react";
import { Ranking } from "@/lib/types";

interface RankCardProps {
  icon: string;
  label: string;
  ranking: Ranking;
  delay: number;
  bgColor: string;
}

const RANK_COLORS: Record<string, string> = {
  S: "text-yellow",
  A: "text-accent",
  B: "text-cyan",
  C: "text-blue",
  D: "text-primary/40",
};

export default function RankCard({ icon, label, ranking, delay, bgColor }: RankCardProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="rounded-2xl p-5 text-white relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-bold text-sm">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs opacity-70">上位</p>
          <p className="text-2xl font-mono font-bold">
            {100 - ranking.percentile}%
          </p>
        </div>
        {show && (
          <div className={`animate-stamp text-6xl font-display font-bold ${RANK_COLORS[ranking.rank]}`}>
            {ranking.rank}
          </div>
        )}
      </div>
    </div>
  );
}
