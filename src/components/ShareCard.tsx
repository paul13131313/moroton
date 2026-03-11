"use client";

import { useRef, useCallback } from "react";
import { EstimateResult } from "@/lib/types";

interface ShareCardProps {
  result: EstimateResult;
  currentSalary: number;
}

function formatCurrency(amount: number, currency: string): string {
  const locale = currency === "JPY" ? "ja-JP" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ShareCard({ result, currentSalary }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const w = 1200;
    const h = 630;
    canvas.width = w;
    canvas.height = h;

    // Background
    ctx.fillStyle = "#1A1919";
    ctx.fillRect(0, 0, w, h);

    // CMYK accent bars
    const colors = ["#00A3D7", "#E61A7C", "#FFEF41", "#003DA6"];
    colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * (w / 4), h - 8, w / 4, 8);
    });

    // Title
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "bold 32px 'Space Grotesk', sans-serif";
    ctx.fillText("あんたなんぼなん？ — 年収査定", 60, 70);

    // Obachan
    ctx.font = "60px sans-serif";
    ctx.fillText("👵", 60, 160);

    // Estimated salary
    ctx.fillStyle = "#FFEF41";
    ctx.font = "bold 72px 'DM Mono', monospace";
    ctx.fillText(formatCurrency(result.estimatedSalary, result.currency), 150, 155);

    ctx.fillStyle = "#F8F8F8";
    ctx.font = "bold 20px 'Noto Sans JP', sans-serif";
    ctx.fillText("適正年収", 150, 190);

    // Diff
    const diff = result.estimatedSalary - currentSalary;
    ctx.fillStyle = diff > 0 ? "#E61A7C" : "#00A3D7";
    ctx.font = "bold 36px 'DM Mono', monospace";
    ctx.fillText(
      `${diff > 0 ? "+" : ""}${formatCurrency(diff, result.currency)}`,
      60,
      270
    );

    // Deviation
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "bold 20px 'Noto Sans JP', sans-serif";
    ctx.fillText(`偏差値: ${result.deviationValue}`, 60, 330);

    // Rankings
    const ranks = [
      { icon: "🌍", label: "全世界", data: result.rankings.global },
      { icon: "🇯🇵", label: "国内", data: result.rankings.domestic },
      { icon: "🏢", label: "業界内", data: result.rankings.industry },
    ];

    const rankColors = ["#00A3D7", "#E61A7C", "#003DA6"];
    ranks.forEach((r, i) => {
      const x = 60 + i * 380;
      const y = 380;

      ctx.fillStyle = rankColors[i];
      ctx.beginPath();
      ctx.roundRect(x, y, 350, 140, 16);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "28px sans-serif";
      ctx.fillText(`${r.icon} ${r.label}`, x + 20, y + 45);

      ctx.font = "bold 24px 'DM Mono', monospace";
      ctx.fillText(`上位${100 - r.data.percentile}%`, x + 20, y + 90);

      ctx.fillStyle = "#FFEF41";
      ctx.font = "bold 60px 'Space Grotesk', sans-serif";
      ctx.fillText(r.data.rank, x + 260, y + 100);

      ctx.fillStyle = "#FFFFFF";
    });

    // URL
    ctx.fillStyle = "#F8F8F8";
    ctx.globalAlpha = 0.5;
    ctx.font = "16px 'DM Mono', monospace";
    ctx.fillText("moroton.vercel.app", w - 230, h - 20);
    ctx.globalAlpha = 1;

    return canvas.toDataURL("image/png");
  }, [result, currentSalary]);

  const handleShare = () => {
    const dataUrl = generateImage();
    if (!dataUrl) return;

    const text = `適正年収: ${formatCurrency(result.estimatedSalary, result.currency)} (偏差値${result.deviationValue})\n「あんたなんぼなん？」で年収査定してみた！`;
    const url = "https://moroton.vercel.app";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleSave = () => {
    const dataUrl = generateImage();
    if (!dataUrl) return;

    const link = document.createElement("a");
    link.download = "moroton-result.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="py-6">
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleShare}
          className="bg-primary text-white rounded-full px-6 py-3 font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          シェアする
        </button>
        <button
          onClick={handleSave}
          className="border-2 border-primary rounded-full px-6 py-3 font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2"
        >
          📷 画像を保存
        </button>
      </div>
    </div>
  );
}
