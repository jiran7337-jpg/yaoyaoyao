import { LiuyaoLine } from '@/types';

export function LiuyaoVisualizer({ lines }: { lines: LiuyaoLine[] }) {
  const reversed = [...lines].reverse();

  return (
    <div className="glass-card p-5">
      <h3 className="mb-4 text-base font-semibold text-accent">六爻卦象（上→下）</h3>
      <div className="space-y-3">
        {reversed.map((line, idx) => (
          <div key={line.index} className="flex items-center gap-3">
            <span className="w-10 text-xs text-slate-400">{6 - idx}爻</span>
            <div className="flex-1">
              {line.yinYang === '阳' ? (
                <div className="h-3 rounded-full bg-accent/80" />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-3 rounded-full bg-slate-300/90" />
                  <div className="h-3 rounded-full bg-slate-300/90" />
                </div>
              )}
            </div>
            {line.isChanging && <span className="rounded bg-violet/30 px-2 py-1 text-xs text-violet-200">动爻</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
