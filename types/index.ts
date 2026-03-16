export type DivinationType = 'liuyao' | 'tarot';
export type QuestionCategory = '感情' | '事业' | '财运' | '学业' | '人际' | '综合';

export interface QuestionPayload {
  id: string;
  question: string;
  category: QuestionCategory;
  type: DivinationType;
  createdAt: string;
  systemQuestion?: string;
  systemAnswer?: string;
  seed?: number;
}

export interface InterpretationContent {
  coreJudgment: string;
  currentState: string;
  risk: string;
  trend: string;
  advice: string[];
}

export interface LiuyaoLine {
  index: number;
  yinYang: '阴' | '阳';
  isChanging: boolean;
}

export interface LiuyaoResult {
  lines: LiuyaoLine[];
  mainHexagram: string;
  changingLines: number[];
  changedHexagram?: string;
  summary: string;
  advice: string;
  interpretationGentle: InterpretationContent;
  interpretationSharp: InterpretationContent;
}

export interface TarotCardDraw {
  id: string;
  name: string;
  position: '过去' | '现在' | '未来';
  orientation: '正位' | '逆位';
  meaning: string;
}

export interface TarotResult {
  spreadType: '三张牌阵';
  cards: TarotCardDraw[];
  summary: string;
  advice: string;
  interpretationGentle: InterpretationContent;
  interpretationSharp: InterpretationContent;
}

export interface DivinationSession {
  question: QuestionPayload;
  result: LiuyaoResult | TarotResult;
}

export interface HistoryRecord {
  id: string;
  type: DivinationType;
  category: QuestionCategory;
  question: string;
  resultSummary: string;
  createdAt: string;
  session: DivinationSession;
}
