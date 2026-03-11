"use client";

import { EstimateResult } from "@/lib/types";
import SalaryDisplay from "./SalaryDisplay";
import DeviationBar from "./DeviationBar";
import RankCard from "./RankCard";
import ShareCard from "./ShareCard";

interface ResultScreenProps {
  result: EstimateResult;
  currentSalary: number;
}

export default function ResultScreen({ result, currentSalary }: ResultScreenProps) {
  return (
    <div className="animate-bubble flex flex-col gap-6">
      {/* Salary */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <SalaryDisplay
          amount={result.estimatedSalary}
          currency={result.currency}
          currentSalary={currentSalary}
          reaction={result.reaction}
        />
      </div>

      {/* Deviation */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <DeviationBar value={result.deviationValue} />
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RankCard
          icon="🌍"
          label="全世界の労働者"
          ranking={result.rankings.global}
          delay={200}
          bgColor="#00A3D7"
        />
        <RankCard
          icon="🇯🇵"
          label="国内の労働者"
          ranking={result.rankings.domestic}
          delay={500}
          bgColor="#E61A7C"
        />
        <RankCard
          icon="🏢"
          label="同業界内"
          ranking={result.rankings.industry}
          delay={800}
          bgColor="#003DA6"
        />
      </div>

      {/* AI Comment */}
      <div className="bg-primary text-white rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">👵</span>
          <p className="font-bold text-lg">オバちゃんの総評</p>
        </div>
        <p className="text-base leading-relaxed">{result.comment}</p>
      </div>

      {/* Share */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <p className="text-center font-bold text-sm text-primary/60 mb-4">結果をシェアする</p>
        <ShareCard result={result} currentSalary={currentSalary} />
      </div>

      {/* Retry */}
      <div className="text-center pb-8">
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-primary/40 hover:text-primary underline transition-colors"
        >
          もう一回やる
        </button>
      </div>
    </div>
  );
}
