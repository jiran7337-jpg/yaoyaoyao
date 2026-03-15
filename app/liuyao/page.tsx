'use client';

import { DisclaimerBlock } from '@/components/DisclaimerBlock';
import { LiuyaoVisualizer } from '@/components/LiuyaoVisualizer';
import { QuestionForm } from '@/components/QuestionForm';
import { createQuestionPayload, generateLiuyaoResult } from '@/lib/divination';
import { saveCurrentSession } from '@/lib/storage';
import { LiuyaoResult, QuestionCategory } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LiuyaoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ritualLines, setRitualLines] = useState(0);
  const [preview, setPreview] = useState<LiuyaoResult | null>(null);

  const handleStart = ({ question, category }: { question: string; category: QuestionCategory }) => {
    setLoading(true);
    setRitualLines(0);
    setPreview(null);

    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setRitualLines(count);
      if (count >= 6) {
        clearInterval(timer);
        const payload = createQuestionPayload(question, category, 'liuyao');
        const result = generateLiuyaoResult(category);
        setPreview(result);
        saveCurrentSession({ question: payload, result });
        setTimeout(() => {
          setLoading(false);
          router.push('/result');
        }, 900);
      }
    }, 350);
  };

  return (
    <div className="container-shell space-y-8 py-10">
      <h1 className="text-3xl font-bold">易经六爻占卜</h1>
      <p className="text-slate-300">静心输入你的问题，点击开始起卦，系统将模拟六次起爻并生成本卦与变卦。</p>
      <QuestionForm onSubmit={handleStart} loading={loading} submitLabel="开始起卦" />

      {loading && (
        <div className="glass-card p-6">
          <p className="text-sm text-slate-300">正在起卦中，请专注你的问题…（{ritualLines}/6）</p>
          <div className="mt-4 grid gap-2">
            {Array.from({ length: ritualLines }).map((_, idx) => (
              <div key={idx} className="h-2 rounded-full bg-accent/70" />
            ))}
          </div>
        </div>
      )}

      {preview && <LiuyaoVisualizer lines={preview.lines} />}
      <DisclaimerBlock />
    </div>
  );
}
