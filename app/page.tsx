import { DisclaimerBlock } from '@/components/DisclaimerBlock';
import { DivinationMethodCard } from '@/components/DivinationMethodCard';
import { Hero } from '@/components/Hero';

const steps = ['输入问题', '选择占卜方式', '完成起卦 / 抽牌', '查看结构化解读'];

export default function HomePage() {
  return (
    <div className="container-shell space-y-12 py-10">
      <Hero />

      <section className="grid gap-4 md:grid-cols-2">
        <DivinationMethodCard
          title="六爻占卜"
          tag="东方玄学"
          href="/liuyao"
          description="通过六次起爻形成卦象，查看本卦、变爻与趋势建议，适合分析决策结构与局势变化。"
        />
        <DivinationMethodCard
          title="塔罗问事"
          tag="西方塔罗"
          href="/tarot"
          description="使用三张牌阵（过去/现在/未来）聚焦问题核心，看见当下盲点与可执行行动。"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="glass-card p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-accent">网站做什么</h2>
          <p className="mt-3 text-sm text-slate-300 leading-7">
            玄机问事为你提供一段有仪式感的问事流程：从问题输入、起卦/抽牌到结构化解读，帮助你从情绪中抽离，重新组织事实与行动路径。
          </p>
          <p className="mt-3 text-sm text-slate-300">适合咨询：感情、复合、暧昧关系、事业选择、财运、学业、人际关系、近期决策。</p>
        </article>
        <article className="glass-card p-6">
          <h2 className="text-xl font-semibold text-accent">解读风格</h2>
          <p className="mt-3 text-sm text-slate-300">支持高情商版与犀利版切换：前者温和共情，后者直指核心但保持克制。</p>
        </article>
      </section>

      <section className="glass-card p-6">
        <h2 className="text-xl font-semibold text-accent">使用流程</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={step} className="rounded-xl border border-white/10 bg-bg/40 p-4 text-sm">
              <p className="text-xs text-slate-400">STEP {idx + 1}</p>
              <p className="mt-1">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <DisclaimerBlock />
    </div>
  );
}
