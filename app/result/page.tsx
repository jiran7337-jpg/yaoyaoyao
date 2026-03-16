'use client';

import Link from 'next/link';
import { DisclaimerBlock } from '@/components/DisclaimerBlock';
import { InterpretationTabs } from '@/components/InterpretationTabs';
import { LiuyaoVisualizer } from '@/components/LiuyaoVisualizer';
import { ResultSection } from '@/components/ResultSection';
import { TarotSpread } from '@/components/TarotSpread';
import { isLiuyaoSession, isTarotSession } from '@/lib/typeGuards';
import { getCurrentSession, saveHistoryRecord } from '@/lib/storage';
import { DivinationSession } from '@/types';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const [session, setSession] = useState<DivinationSession | null>(null);
  const [style, setStyle] = useState<'gentle' | 'sharp'>('gentle');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSession(getCurrentSession());
  }, []);

  if (!session) {
    return (
      <div className="container-shell py-16">
        <div className="glass-card p-8 text-center">
          <p className="text-slate-300">暂无占卜结果，请先开始一次占卜。</p>
          <Link href="/divination" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-bg">
            去占卜
          </Link>
        </div>
      </div>
    );
  }

  const result = session.result;

  return (
    <div className="container-shell space-y-6 py-10">
      <h1 className="text-3xl font-bold">问事结果</h1>

      <ResultSection session={session} />

      {isLiuyaoSession(session) ? (
        <section className="grid gap-4 md:grid-cols-2">
          <LiuyaoVisualizer lines={session.result.lines} />
          <div className="glass-card p-6 text-sm leading-7 text-slate-200">
            <p>
              <span className="text-slate-400">本卦：</span>
              {session.result.mainHexagram}
            </p>
            <p>
              <span className="text-slate-400">动爻：</span>
              {session.result.changingLines.length ? session.result.changingLines.join('、') : '无'}
            </p>
            <p>
              <span className="text-slate-400">变卦：</span>
              {session.result.changedHexagram ?? '无'}
            </p>
            <p className="mt-3">{session.result.summary}</p>
            <p className="mt-3 text-accent">建议：{session.result.advice}</p>
          </div>
        </section>
      ) : isTarotSession(session) ? (
        <section className="glass-card p-6">
          <TarotSpread cards={session.result.cards} />
          <p className="mt-4 text-sm text-slate-200">{session.result.summary}</p>
          <p className="mt-2 text-sm text-accent">建议：{session.result.advice}</p>
        </section>
      ) : null}

      <InterpretationTabs
        style={style}
        onChange={setStyle}
        gentle={result.interpretationGentle}
        sharp={result.interpretationSharp}
      />

      <div className="flex flex-wrap gap-3">
        <Link href="/divination" className="rounded-lg bg-violet px-4 py-2 text-sm">
          再测一次
        </Link>
        <button
          onClick={() => {
            saveHistoryRecord(session);
            setSaved(true);
          }}
          className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
        >
          保存记录
        </button>
        <Link href="/" className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
          返回首页
        </Link>
        {saved && <span className="text-sm text-emerald-300">已保存到历史记录</span>}
      </div>

      <DisclaimerBlock />
    </div>
  );
}
