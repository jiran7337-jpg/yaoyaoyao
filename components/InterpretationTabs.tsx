'use client';

import { InterpretationContent } from '@/types';

interface Props {
  style: 'gentle' | 'sharp';
  onChange: (v: 'gentle' | 'sharp') => void;
  gentle: InterpretationContent;
  sharp: InterpretationContent;
}

function InterpretationBlock({ data }: { data: InterpretationContent }) {
  return (
    <div className="space-y-4 text-sm leading-7 text-slate-200">
      <div>
        <h4 className="font-semibold text-accent">1. 问题核心判断</h4>
        <p>{data.coreJudgment}</p>
      </div>
      <div>
        <h4 className="font-semibold text-accent">2. 当前真实状态</h4>
        <p>{data.currentState}</p>
      </div>
      <div>
        <h4 className="font-semibold text-accent">3. 最大风险点</h4>
        <p>{data.risk}</p>
      </div>
      <div>
        <h4 className="font-semibold text-accent">4. 后续发展趋势</h4>
        <p>{data.trend}</p>
      </div>
      <div>
        <h4 className="font-semibold text-accent">5. 具体建议</h4>
        <ul className="list-disc pl-5">
          {data.advice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function InterpretationTabs({ style, onChange, gentle, sharp }: Props) {
  const active = style === 'gentle' ? gentle : sharp;

  return (
    <section className="glass-card p-6">
      <div className="mb-5 flex gap-2">
        <button
          onClick={() => onChange('gentle')}
          className={`rounded-lg px-3 py-2 text-sm ${style === 'gentle' ? 'bg-accent text-bg' : 'bg-white/10 text-slate-200'}`}
        >
          高情商版
        </button>
        <button
          onClick={() => onChange('sharp')}
          className={`rounded-lg px-3 py-2 text-sm ${style === 'sharp' ? 'bg-violet text-white' : 'bg-white/10 text-slate-200'}`}
        >
          犀利版
        </button>
      </div>
      <InterpretationBlock data={active} />
    </section>
  );
}
