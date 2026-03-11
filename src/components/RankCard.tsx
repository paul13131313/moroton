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
      className="rounded-2xl p-4 text-white relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="font-bold text-xs">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] opacity-70">上位</p>
          <p className="text-xl font-mono font-bold">
            {100 - ranking.percentile}%
          </p>
        </div>
        {show && (
          <div className={`animate-stamp text-5xl font-display font-bold ${RANK_COLORS[ranking.rank]}`}>
            {ranking.rank}
          </div>
        )}
      </div>
    </div>
  );
}
