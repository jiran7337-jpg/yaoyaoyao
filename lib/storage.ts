import { DivinationSession, HistoryRecord } from '@/types';

const SESSION_KEY = 'mystic_current_session';
const HISTORY_KEY = 'mystic_history_records';

const isClient = () => typeof window !== 'undefined';

export const saveCurrentSession = (session: DivinationSession) => {
  if (!isClient()) return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getCurrentSession = (): DivinationSession | null => {
  if (!isClient()) return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DivinationSession;
  } catch {
    return null;
  }
};

export const clearCurrentSession = () => {
  if (!isClient()) return;
  localStorage.removeItem(SESSION_KEY);
};

export const getHistoryRecords = (): HistoryRecord[] => {
  if (!isClient()) return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as HistoryRecord[];
  } catch {
    return [];
  }
};

export const saveHistoryRecord = (session: DivinationSession) => {
  if (!isClient()) return;
  const current = getHistoryRecords();
  const summary = 'summary' in session.result ? session.result.summary : '';
  const record: HistoryRecord = {
    id: session.question.id,
    type: session.question.type,
    category: session.question.category,
    question: session.question.question,
    resultSummary: summary,
    createdAt: session.question.createdAt,
    session
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([record, ...current]));
};

export const deleteHistoryRecord = (id: string) => {
  if (!isClient()) return;
  const next = getHistoryRecords().filter((item) => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
};

export const clearHistoryRecords = () => {
  if (!isClient()) return;
  localStorage.removeItem(HISTORY_KEY);
};
