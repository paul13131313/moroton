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
    <div className="animate-bubble flex flex-col gap-4 lg:gap-3">
      {/* Top row: Salary + Deviation side by side on PC */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-3">
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 lg:p-5 shadow-lg">
          <SalaryDisplay
            amount={result.estimatedSalary}
            currency={result.currency}
            currentSalary={currentSalary}
            reaction={result.reaction}
          />
        </div>
        <div className="lg:col-span-2 bg-white rounded-3xl p-4 lg:p-5 shadow-lg flex flex-col justify-center">
          <DeviationBar value={result.deviationValue} />
        </div>
      </div>

      {/* Rankings: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

      {/* Bottom row: Comment + Share side by side on PC */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-3">
        <div className="lg:col-span-3 bg-primary text-white rounded-3xl p-4 lg:p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">👵</span>
            <p className="font-bold text-base">オバちゃんの総評</p>
          </div>
          <p className="text-sm leading-relaxed">{result.comment}</p>
        </div>
        <div className="lg:col-span-2 bg-white rounded-3xl p-4 lg:p-5 shadow-lg flex flex-col justify-center">
          <p className="text-center font-bold text-sm text-primary/60 mb-3">結果をシェアする</p>
          <ShareCard result={result} currentSalary={currentSalary} />
          <div className="text-center mt-3">
            <button
              onClick={() => window.location.reload()}
              className="text-xs text-primary/40 hover:text-primary underline transition-colors"
            >
              もう一回やる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
