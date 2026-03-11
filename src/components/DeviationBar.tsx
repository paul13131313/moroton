"use client";

import { useEffect, useState } from "react";

interface DeviationBarProps {
  value: number;
}

export default function DeviationBar({ value }: DeviationBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const clamped = Math.max(25, Math.min(75, value));
      const pct = ((clamped - 25) / 50) * 100;
      setWidth(pct);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const getLabel = () => {
    if (value >= 70) return "上位2%";
    if (value >= 60) return "上位15%";
    if (value >= 50) return "平均以上";
    if (value >= 40) return "平均以下";
    return "下位15%";
  };

  return (
    <div className="py-3">
      <div className="flex items-end justify-between mb-2">
        <p className="text-sm font-bold text-primary/60">年収偏差値</p>
        <p className="text-xs text-primary/40">{getLabel()}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-5 bg-primary/10 rounded-full overflow-hidden relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20" />
          <div
            className="h-full bg-gradient-to-r from-cyan via-accent to-magenta rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          />
        </div>
        <span className="text-3xl font-mono font-bold text-primary min-w-[50px] text-right">
          {value}
        </span>
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-primary/30 font-bold">
        <span>25</span>
        <span>50</span>
        <span>75</span>
      </div>
    </div>
  );
}
