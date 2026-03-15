'use client';

import { HistoryList } from '@/components/HistoryList';
import { getHistoryRecords, clearHistoryRecords, deleteHistoryRecord } from '@/lib/storage';
import { HistoryRecord } from '@/types';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [active, setActive] = useState<HistoryRecord | null>(null);

  const refresh = () => setRecords(getHistoryRecords());

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="container-shell space-y-6 py-10">
      <h1 className="text-3xl font-bold">历史记录</h1>
      <p className="text-slate-300">记录保存在当前浏览器 localStorage 中，可查看详情、删除单条或清空。</p>

      <HistoryList
        records={records}
        onDelete={(id) => {
          deleteHistoryRecord(id);
          if (active?.id === id) setActive(null);
          refresh();
        }}
        onClear={() => {
          clearHistoryRecords();
          setActive(null);
          refresh();
        }}
      />

      {records.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="mb-3 text-lg font-semibold text-accent">查看历史详情</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {records.map((record) => (
              <button
                key={record.id}
                onClick={() => setActive(record)}
                className="rounded-lg border border-white/20 px-3 py-2 text-xs hover:bg-white/10"
              >
                {record.type === 'liuyao' ? '六爻' : '塔罗'} · {new Date(record.createdAt).toLocaleDateString('zh-CN')}
              </button>
            ))}
          </div>
          {active ? (
            <div className="space-y-2 text-sm text-slate-200">
              <p>
                <span className="text-slate-400">问题：</span>
                {active.question}
              </p>
              <p>
                <span className="text-slate-400">类别：</span>
                {active.category}
              </p>
              <p>
                <span className="text-slate-400">摘要：</span>
                {active.resultSummary}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-300">点击上方任意记录查看详情。</p>
          )}
        </div>
      )}
    </div>
  );
}
