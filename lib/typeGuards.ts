import { DivinationSession, LiuyaoResult, TarotResult } from '@/types';

export const isLiuyaoSession = (session: DivinationSession): session is DivinationSession & { result: LiuyaoResult } => {
  return session.question.type === 'liuyao';
};

export const isTarotSession = (session: DivinationSession): session is DivinationSession & { result: TarotResult } => {
  return session.question.type === 'tarot';
};
