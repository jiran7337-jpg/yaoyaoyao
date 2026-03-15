'use client';

import { categoryHints } from '@/data/mockData';
import { QuestionCategory } from '@/types';
import { useMemo, useState } from 'react';

interface Props {
  onSubmit: (payload: { question: string; category: QuestionCategory }) => void;
  loading?: boolean;
  submitLabel?: string;
}

const categories: QuestionCategory[] = ['感情', '事业', '财运', '学业', '人际', '综合'];

export function QuestionForm({ onSubmit, loading, submitLabel = '开始' }: Props) {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState<QuestionCategory>('综合');
  const [error, setError] = useState('');

  const counterText = useMemo(() => `${question.length}/100`, [question.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();

    if (!trimmed) {
      setError('问题不能为空');
      return;
    }
    if (trimmed.length < 10) {
      setError('请更具体描述你的问题');
      return;
    }
    if (trimmed.length > 100) {
      setError('问题字数请控制在 100 字以内');
      return;
    }

    setError('');
    onSubmit({ question: trimmed, category });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6">
      <div>
        <label className="mb-2 block text-sm text-slate-300">你的问题（10-100字）</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：我是否应该换工作？这段关系未来会如何发展？"
          className="h-28 w-full rounded-xl border border-white/15 bg-bg/70 p-3 text-sm outline-none ring-accent/40 transition focus:ring"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>{counterText}</span>
          <span>{error}</span>
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
        {loading ? '处理中...' : submitLabel}
      </button>
    </form>
  );
}
