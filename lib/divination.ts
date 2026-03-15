import { interpretationTemplates, liuyaoHexagrams, tarotDeck } from '@/data/mockData';
import {
  LiuyaoLine,
  LiuyaoResult,
  QuestionCategory,
  QuestionPayload,
  TarotCardDraw,
  TarotResult
} from '@/types';

const positions: Array<'过去' | '现在' | '未来'> = ['过去', '现在', '未来'];

const randomInt = (max: number) => Math.floor(Math.random() * max);

export const createQuestionPayload = (
  question: string,
  category: QuestionCategory,
  type: 'liuyao' | 'tarot'
): QuestionPayload => ({
  id: crypto.randomUUID(),
  question,
  category,
  type,
  createdAt: new Date().toISOString()
});

export const generateLiuyaoResult = (category: QuestionCategory): LiuyaoResult => {
  const lines: LiuyaoLine[] = Array.from({ length: 6 }).map((_, idx) => {
    const yinYang = Math.random() > 0.5 ? '阳' : '阴';
    const isChanging = Math.random() > 0.7;
    return { index: idx + 1, yinYang, isChanging };
  });

  const changingLines = lines.filter((line) => line.isChanging).map((line) => line.index);
  const main = liuyaoHexagrams[randomInt(liuyaoHexagrams.length)];
  const changed = changingLines.length
    ? liuyaoHexagrams[randomInt(liuyaoHexagrams.length)]
    : undefined;
  const templates = interpretationTemplates[category];

  return {
    lines,
    mainHexagram: main.name,
    changingLines,
    changedHexagram: changed?.name,
    summary: `本卦为「${main.name}」，主调为${main.energy}${changed ? `；变卦指向「${changed.name}」` : ''}。`,
    advice: templates.gentle.advice[0],
    interpretationGentle: templates.gentle,
    interpretationSharp: templates.sharp
  };
};

export const generateTarotResult = (category: QuestionCategory): TarotResult => {
  const pool = [...tarotDeck].sort(() => Math.random() - 0.5).slice(0, 3);

  const cards: TarotCardDraw[] = pool.map((card, idx) => {
    const orientation = Math.random() > 0.5 ? '正位' : '逆位';
    return {
      id: card.id,
      name: card.name,
      position: positions[idx],
      orientation,
      meaning: orientation === '正位' ? card.upright : card.reversed
    };
  });

  const templates = interpretationTemplates[category];
  return {
    spreadType: '三张牌阵',
    cards,
    summary: `牌阵显示你正处在「${cards[1].name}」所象征的课题中，未来走势受你当下选择影响明显。`,
    advice: templates.gentle.advice[0],
    interpretationGentle: templates.gentle,
    interpretationSharp: templates.sharp
  };
};
