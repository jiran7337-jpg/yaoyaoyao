import { DivinationSession } from '@/types';

export function ResultSection({ session }: { session: DivinationSession }) {
  return (
    <section className="glass-card p-6 text-sm">
      <h2 className="text-lg font-semibold text-accent">问事信息</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <p>
          <span className="text-slate-400">问题：</span>
          {session.question.question}
        </p>
        <p>
          <span className="text-slate-400">类别：</span>
          {session.question.category}
        </p>
        <p>
          <span className="text-slate-400">方式：</span>
          {session.question.type === 'liuyao' ? '易经六爻' : '塔罗问事'}
        </p>
        <p>
          <span className="text-slate-400">时间：</span>
          {new Date(session.question.createdAt).toLocaleString('zh-CN')}
        </p>
        {session.question.type === 'tarot' && session.question.systemQuestion && (
          <p>
            <span className="text-slate-400">系统提问：</span>
            {session.question.systemQuestion}
          </p>
        )}
        {session.question.type === 'tarot' && session.question.systemAnswer && (
          <p>
            <span className="text-slate-400">你的回答：</span>
            {session.question.systemAnswer}
          </p>
        )}
      </div>
    </section>
  );
}
