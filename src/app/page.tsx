"use client";

import { useState } from "react";
import { Answers, EstimateResult } from "@/lib/types";
import ChatFlow from "@/components/ChatFlow";
import Loading from "@/components/Loading";
import ResultScreen from "@/components/ResultScreen";

type Phase = "chat" | "loading" | "result";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("chat");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [currentSalary, setCurrentSalary] = useState(0);
  const [error, setError] = useState("");

  const handleComplete = async (answers: Answers) => {
    setPhase("loading");
    setCurrentSalary(answers.currentSalary);
    setError("");

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) throw new Error("API error");

      const data: EstimateResult = await res.json();
      setResult(data);
      setPhase("result");
    } catch {
      setError("査定に失敗したわ…もう一回やってみてや");
      setPhase("chat");
    }
  };

  return (
    <main className="min-h-dvh">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-white">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">👵</span>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight leading-none">
              あんたなんぼなん？
            </h1>
            <p className="text-[10px] opacity-60">年収査定AI</p>
          </div>
          {/* CMYK dots */}
          <div className="ml-auto flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan" />
            <div className="w-2.5 h-2.5 rounded-full bg-magenta" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Intro */}
        {phase === "chat" && (
          <div className="mb-6 text-center">
            <p className="text-4xl mb-2">👵💬</p>
            <h2 className="font-display text-2xl font-bold text-primary">
              あんた、なんぼなん？
            </h2>
            <p className="text-sm text-primary/50 mt-2">
              質問に答えたら適正年収を査定したるわ
            </p>
          </div>
        )}

        {error && (
          <div className="bg-accent/10 text-accent rounded-xl px-4 py-3 mb-4 text-sm font-bold">
            {error}
          </div>
        )}

        {phase === "chat" && <ChatFlow onComplete={handleComplete} />}
        {phase === "loading" && <Loading />}
        {phase === "result" && result && (
          <ResultScreen result={result} currentSalary={currentSalary} />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-6">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs text-primary/30">
            あんたなんぼなん？ — AI年収査定ツール
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {["#00A3D7", "#E61A7C", "#FFEF41", "#003DA6"].map((c) => (
              <div
                key={c}
                className="w-8 h-1 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
