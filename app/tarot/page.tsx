'use client';

import { DisclaimerBlock } from '@/components/DisclaimerBlock';
import { TarotSpread } from '@/components/TarotSpread';
import { categoryHints } from '@/data/mockData';
import { tarotSystemQuestions } from '@/data/tarotQuestions';
import { createQuestionPayload, generateTarotResult } from '@/lib/divination';
import { saveCurrentSession } from '@/lib/storage';
import { buildTarotSeed } from '@/lib/tarot';
import { QuestionCategory, TarotResult } from '@/types';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const categories: QuestionCategory[] = ['感情', '事业', '财运', '学业', '人际', '综合'];

const quickAnswers = ['开心', '平静', '有点焦虑', '蓝色', '晴天', '最近很忙'];

export default function TarotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [preview, setPreview] = useState<TarotResult | null>(null);

  const [category, setCategory] = useState<QuestionCategory>('综合');
  const [coreQuestion, setCoreQuestion] = useState('');
  const [coreError, setCoreError] = useState('');

  const [systemQuestion, setSystemQuestion] = useState('');
  const [systemAnswer, setSystemAnswer] = useState('');
  const [step, setStep] = useState<'question' | 'mini' | 'ready'>('question');

  const counterText = useMemo(() => `${coreQuestion.length}/100`, [coreQuestion.length]);

  const pickSystemQuestion = () => {
    const index = Math.floor(Math.random() * tarotSystemQuestions.length);
    return tarotSystemQuestions[index];
  };

  const handleQuestionNext = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = coreQuestion.trim();

    if (!trimmed) {
      setCoreError('问题不能为空');
      return;
    }
    if (trimmed.length < 10) {
      setCoreError('请更具体描述你的问题');
      return;
    }
    if (trimmed.length > 100) {
      setCoreError('问题字数请控制在 100 字以内');
      return;
    }

    setCoreError('');
    setSystemAnswer('');
    setSystemQuestion(pickSystemQuestion());
    setStep('mini');
  };

  const handleConfirmMiniAnswer = () => {
    if (!systemAnswer.trim()) {
      return;
    }
    setStep('ready');
  };

  const handleDraw = () => {
    if (!systemQuestion || !systemAnswer.trim()) {
      return;
    }

    setLoading(true);
    setStatus('正在根据你的回答生成洗牌种子…');
    setPreview(null);

    const timestamp = Date.now();
    const randomOffset = Math.floor(Math.random() * 1000);
    const seed = buildTarotSeed({
      systemQuestion,
      systemAnswer,
      timestamp,
      randomOffset
    });

    setTimeout(() => setStatus('正在进行有序洗牌…'), 700);

    setTimeout(() => {
      const payload = createQuestionPayload(coreQuestion.trim(), category, 'tarot', {
        systemQuestion,
        systemAnswer: systemAnswer.trim(),
        seed
      });
      const result = generateTarotResult(category, seed);
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
      <p className="text-slate-300">请先输入核心问题，再回答系统随机问题，然后进行洗牌与抽牌。</p>

      <form onSubmit={handleQuestionNext} className="glass-card space-y-4 p-6">
        <div>
          <label className="mb-2 block text-sm text-slate-300">你的核心问题（10-100字）</label>
          <textarea
            value={coreQuestion}
            onChange={(e) => setCoreQuestion(e.target.value)}
            placeholder="例如：我是否应该换工作？这段关系未来会如何发展？"
            className="h-28 w-full rounded-xl border border-white/15 bg-bg/70 p-3 text-sm outline-none ring-accent/40 transition focus:ring"
            disabled={loading}
          />
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>{counterText}</span>
            <span>{coreError}</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">问题类型</label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-lg border px-3 py-2 text-xs transition ${
                  category === item ? 'border-accent bg-accent/20 text-accent' : 'border-white/20 hover:bg-white/10'
                }`}
                disabled={loading}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">{categoryHints[category]}</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-violet px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-40"
        >
          继续：获取系统随机提问
        </button>
      </form>

      {step !== 'question' && (
        <section className="glass-card space-y-4 p-6">
          <h2 className="text-lg font-semibold text-accent">系统随机提问</h2>
          <p className="rounded-lg border border-white/15 bg-white/5 p-3 text-slate-100">{systemQuestion}</p>

          <div className="space-y-3">
            <label className="block text-sm text-slate-300">你的简短回答</label>
            <input
              value={systemAnswer}
              onChange={(e) => setSystemAnswer(e.target.value)}
              placeholder="输入你的回答（至少 1 个字）"
              className="w-full rounded-xl border border-white/15 bg-bg/70 p-3 text-sm outline-none ring-accent/40 transition focus:ring"
              disabled={loading}
            />
            <div className="flex flex-wrap gap-2">
              {quickAnswers.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSystemAnswer(item)}
                  className="rounded-lg border border-white/20 px-3 py-1 text-xs hover:bg-white/10"
                  disabled={loading}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {step === 'mini' && (
            <button
              type="button"
              onClick={handleConfirmMiniAnswer}
              disabled={!systemAnswer.trim() || loading}
              className="w-full rounded-xl bg-accent px-4 py-3 font-medium text-bg transition hover:opacity-90 disabled:opacity-40"
            >
              确认回答，准备洗牌
            </button>
          )}

          {step === 'ready' && (
            <button
              type="button"
              onClick={handleDraw}
              disabled={loading}
              className="w-full rounded-xl bg-violet px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-40"
            >
              洗牌并抽取三张牌
            </button>
          )}
        </section>
      )}

      {loading && <div className="glass-card p-6 text-sm text-slate-200">{status}</div>}
      {preview && <TarotSpread cards={preview.cards} />}
      <DisclaimerBlock />
    </div>
  );
}
