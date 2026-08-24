"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle, XCircle, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  moduleTitle: string;
}

export function ModuleDetailClient({ moduleTitle }: Props) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const sampleQuestion = {
    question: `Which core AWS architectural principle is best exemplified by ${moduleTitle}?`,
    options: [
      "Monolithic single-server scaling",
      "Decoupled, highly available distributed architecture",
      "Manual capacity forecasting and fixed hardware allocation",
      "Unencrypted public endpoints without IAM access control",
    ],
    correctAnswer: 1,
    explanation:
      "Modern AWS services are designed to support decoupled, fault-tolerant, and resilient cloud-native architectures that automatically scale across multiple Availability Zones.",
  };

  const handleSelect = (idx: number) => {
    if (!submitted) setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === sampleQuestion.correctAnswer) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FF9900", "#10B981", "#FFFFFF"],
      });
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div className="p-8 rounded-3xl bg-navy-900/70 border border-aws-orange/30 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-aws-orange" />
          <span>Knowledge Checkpoint</span>
        </h2>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-aws-orange/20 text-aws-orange border border-aws-orange/40 font-bold">
          Quick Quiz
        </span>
      </div>

      <p className="text-xs text-slate-200 font-medium leading-relaxed">
        {sampleQuestion.question}
      </p>

      {/* Options */}
      <div className="space-y-2.5">
        {sampleQuestion.options.map((opt, idx) => {
          let btnClass = "bg-navy-950/80 border-white/10 hover:border-white/30 text-slate-300";
          if (selectedOption === idx) {
            btnClass = "bg-navy-800 border-aws-orange text-white shadow-md";
          }
          if (submitted) {
            if (idx === sampleQuestion.correctAnswer) {
              btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-semibold";
            } else if (selectedOption === idx) {
              btnClass = "bg-red-950/80 border-red-500 text-red-300";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center font-mono text-[10px] text-slate-400">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>
              {submitted && idx === sampleQuestion.correctAnswer && (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              {submitted && selectedOption === idx && idx !== sampleQuestion.correctAnswer && (
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {!submitted ? (
          <button
            onClick={handleCheck}
            disabled={selectedOption === null}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-aws-orange hover:bg-aws-orange-light disabled:opacity-40 text-black font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verify Answer</span>
          </button>
        ) : (
          <div className="w-full space-y-3">
            <div className="p-3 rounded-xl bg-navy-950 border border-white/10 text-xs text-slate-300 leading-relaxed font-sans">
              <strong className="text-aws-orange">Explanation: </strong>
              {sampleQuestion.explanation}
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-mono border border-white/10 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Question</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
