"use client";

import { useState, useRef, useEffect } from "react";
import { questions } from "@/lib/questions";
import { Answers, QuestionKey } from "@/lib/types";
import QuestionBubble from "./QuestionBubble";
import AnswerButton from "./AnswerButton";

interface ChatFlowProps {
  onComplete: (answers: Answers) => void;
}

interface ChatMessage {
  type: "question" | "answer";
  text: string;
}

const CURRENCIES = ["JPY", "USD", "EUR", "GBP", "CNY"];

export default function ChatFlow({ onComplete }: ChatFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [freeText, setFreeText] = useState("");
  const [salaryValue, setSalaryValue] = useState("");
  const [currency, setCurrency] = useState("JPY");
  const [showQuestion, setShowQuestion] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => setShowQuestion(true), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showQuestion]);

  const handleAnswer = (value: string) => {
    const key = currentQuestion.key;

    setMessages((prev) => [
      ...prev,
      { type: "question", text: currentQuestion.label },
      { type: "answer", text: value },
    ]);

    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    setFreeText("");
    setShowQuestion(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSalarySubmit = () => {
    const num = parseInt(salaryValue.replace(/,/g, ""), 10);
    if (!num || num <= 0) return;

    setMessages((prev) => [
      ...prev,
      { type: "question", text: currentQuestion.label },
      {
        type: "answer",
        text: `${num.toLocaleString()} ${currency}`,
      },
    ]);

    const finalAnswers: Answers = {
      country: (answers.country as string) || "",
      industry: (answers.industry as string) || "",
      role: (answers.role as string) || "",
      experience: (answers.experience as string) || "",
      companyType: (answers.companyType as string) || "",
      qualification: (answers.qualification as string) || "",
      jobChanges: (answers.jobChanges as string) || "",
      specialSkills: (answers.specialSkills as string) || "",
      currentSalary: num,
      currency,
    };

    setShowQuestion(false);
    onComplete(finalAnswers);
  };

  const handleFreeTextSubmit = () => {
    if (!freeText.trim()) return;
    handleAnswer(freeText.trim());
  };

  const getSalaryPlaceholder = () => {
    switch (currency) {
      case "JPY": return "例: 6000000";
      case "USD": return "例: 80000";
      case "EUR": return "例: 65000";
      case "GBP": return "例: 55000";
      case "CNY": return "例: 300000";
      default: return "年収を入力";
    }
  };

  const getSalaryUnit = () => {
    switch (currency) {
      case "JPY": return "円";
      case "USD": return "ドル";
      case "EUR": return "ユーロ";
      case "GBP": return "ポンド";
      case "CNY": return "元";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Past messages */}
      {messages.map((msg, i) =>
        msg.type === "question" ? (
          <div key={i} className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xl">
              👵
            </div>
            <div className="bg-primary text-white rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%]">
              <p className="text-base font-bold">{msg.text}</p>
            </div>
          </div>
        ) : (
          <div key={i} className="flex justify-end">
            <div className="bg-accent text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%]">
              <p className="text-base font-bold">{msg.text}</p>
            </div>
          </div>
        )
      )}

      {/* Current question */}
      <QuestionBubble
        label={currentQuestion.label}
        isVisible={showQuestion}
      />

      {/* Answer area */}
      {showQuestion && (
        <div className="animate-bubble ml-13 flex flex-col gap-3">
          {/* Options */}
          {currentQuestion.options && (
            <div className="flex flex-wrap gap-2">
              {currentQuestion.options.map((opt, i) => (
                <AnswerButton
                  key={opt}
                  label={opt}
                  onClick={handleAnswer}
                  colorIndex={i}
                />
              ))}
            </div>
          )}

          {/* Free text input */}
          {currentQuestion.freeInput && !currentQuestion.salaryInput && (
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFreeTextSubmit()}
                placeholder={currentQuestion.options ? "その他（自由入力）" : "自由に入力してや"}
                className="flex-1 border-2 border-primary/20 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button
                onClick={handleFreeTextSubmit}
                className="bg-accent text-white rounded-full px-5 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
              >
                送信
              </button>
            </div>
          )}

          {/* Salary input */}
          {currentQuestion.salaryInput && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                {CURRENCIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                      currency === c
                        ? "bg-primary text-white border-primary"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={salaryValue}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    setSalaryValue(v);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSalarySubmit()}
                  placeholder={getSalaryPlaceholder()}
                  className="flex-1 border-2 border-primary/20 rounded-full px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                />
                <span className="text-sm font-bold text-primary/60">{getSalaryUnit()}</span>
                <button
                  onClick={handleSalarySubmit}
                  className="bg-accent text-white rounded-full px-5 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  査定開始
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
