import { tarotDeck } from '@/data/mockData';
import { TarotCardDraw } from '@/types';

const positions: Array<'过去' | '现在' | '未来'> = ['过去', '现在', '未来'];

type TarotDeckCard = (typeof tarotDeck)[number];

export const hashStringToNumber = (str: string): number => {
  let hash = 2166136261;

  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

export const createSeededRng = (seed: number) => {
  let state = seed >>> 0;

  return {
    random: () => {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return state / 4294967296;
    }
  };
};

export const buildTarotSeed = (input: {
  systemQuestion: string;
  systemAnswer: string;
  timestamp: number;
  randomOffset?: number;
}) => {
  const answerHash = hashStringToNumber(`${input.systemQuestion}|${input.systemAnswer.trim().toLowerCase()}`);
  const offset = input.randomOffset ?? Math.floor(Math.random() * 1000);
  return (answerHash + input.timestamp + offset) >>> 0;
};

export const shuffleWithSeed = (deck: TarotDeckCard[], seed: number): TarotDeckCard[] => {
  const shuffled = [...deck];
  const rng = createSeededRng(seed);

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const drawThreeTarotCards = (seed: number): TarotCardDraw[] => {
  const shuffled = shuffleWithSeed(tarotDeck, seed);
  const orientationRng = createSeededRng(seed ^ 0x9e3779b9);

  return shuffled.slice(0, 3).map((card, idx) => {
    const orientation = orientationRng.random() > 0.5 ? '正位' : '逆位';

    return {
      id: card.id,
      name: card.name,
      position: positions[idx],
      orientation,
      meaning: orientation === '正位' ? card.upright : card.reversed
    };
  });
};
