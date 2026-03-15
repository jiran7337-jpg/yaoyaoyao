import { TarotCardDraw } from '@/types';
import { TarotCard } from './TarotCard';

export function TarotSpread({ cards }: { cards: TarotCardDraw[] }) {
  return (
    <section>
      <h3 className="mb-4 text-base font-semibold text-accent">三张牌阵：过去 / 现在 / 未来</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <TarotCard key={card.id + card.position} card={card} />
        ))}
      </div>
    </section>
  );
}
