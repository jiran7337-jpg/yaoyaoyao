'use client';

import { HistoryRecord } from '@/types';

interface Props {
  records: HistoryRecord[];
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function HistoryList({ records, onDelete, onClear }: Props) {
  if (!records.length) {
    return <div className="glass-card p-6 text-sm text-slate-300">暂无历史记录，先去完成一次占卜吧。</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={onClear} className="rounded-lg border border-rose-400/30 px-3 py-2 text-sm text-rose-200 hover:bg-rose-400/10">
          清空全部
        </button>
      </div>
      {records.map((record) => (
        <article key={record.id} className="glass-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-accent">
                {record.type === 'liuyao' ? '易经六爻' : '塔罗问事'} · {record.category}
              </p>
              <h3 className="mt-1 font-medium">{record.question}</h3>
              <p className="mt-2 text-sm text-slate-300">{record.resultSummary}</p>
              <p className="mt-2 text-xs text-slate-400">{new Date(record.createdAt).toLocaleString('zh-CN')}</p>
            </div>
            <button onClick={() => onDelete(record.id)} className="rounded-lg border border-white/20 px-3 py-2 text-xs hover:bg-white/10">
              删除
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
