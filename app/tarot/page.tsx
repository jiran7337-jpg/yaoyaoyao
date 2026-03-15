'use client';

import { DisclaimerBlock } from '@/components/DisclaimerBlock';
import { QuestionForm } from '@/components/QuestionForm';
import { TarotSpread } from '@/components/TarotSpread';
import { createQuestionPayload, generateTarotResult } from '@/lib/divination';
import { saveCurrentSession } from '@/lib/storage';
import { QuestionCategory, TarotResult } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TarotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [preview, setPreview] = useState<TarotResult | null>(null);

  const handleDraw = ({ question, category }: { question: string; category: QuestionCategory }) => {
    setLoading(true);
    setStatus('正在洗牌…');
    setPreview(null);

    setTimeout(() => setStatus('抽取过去、现在、未来三张牌…'), 700);

    setTimeout(() => {
      const payload = createQuestionPayload(question, category, 'tarot');
      const result = generateTarotResult(category);
      setPreview(result);
      saveCurrentSession({ question: payload, result });
      setStatus('牌阵已形成，正在进入解读…');
      setTimeout(() => {
        setLoading(false);
        router.push('/result');
      }, 900);
    }, 1600);
  };

  return (
    <div className="container-shell space-y-8 py-10">
      <h1 className="text-3xl font-bold">塔罗问事占卜</h1>
      <p className="text-slate-300">先输入问题，点击开始抽牌。默认牌阵：过去 / 现在 / 未来。</p>

      <QuestionForm onSubmit={handleDraw} loading={loading} submitLabel="洗牌并抽牌" />

      {loading && <div className="glass-card p-6 text-sm text-slate-200">{status}</div>}
      {preview && <TarotSpread cards={preview.cards} />}
      <DisclaimerBlock />
    </div>
  );
}
