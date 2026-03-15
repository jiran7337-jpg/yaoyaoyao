import { TarotCardDraw } from '@/types';

export function TarotCard({ card }: { card: TarotCardDraw }) {
  return (
    <article className="glass-card p-4 text-center">
      <p className="text-xs text-accent">{card.position}</p>
      <div className="my-3 rounded-xl border border-white/10 bg-gradient-to-b from-violet/20 to-indigo/20 p-6">
        <p className="text-lg font-semibold">{card.name}</p>
        <p className="mt-2 text-sm text-slate-300">{card.orientation}</p>
      </div>
      <p className="text-sm text-slate-300">{card.meaning}</p>
    </article>
  );
}
