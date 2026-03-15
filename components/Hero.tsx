import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/70 px-6 py-16 shadow-violetGlow sm:px-10">
      <p className="mb-4 inline-block rounded-full border border-accent/50 px-4 py-1 text-xs text-accent">
        易经六爻 × 塔罗问事
      </p>
      <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">以仪式感看见问题核心，做更清晰的选择</h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        玄机问事融合东方玄学与西方塔罗，围绕感情、事业、财运等主题，为你提供结构化占卜解读与行动建议。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/divination" className="rounded-xl bg-accent px-5 py-3 font-medium text-bg shadow-glow transition hover:opacity-90">
          开始占卜
        </Link>
        <Link href="/divination" className="rounded-xl border border-white/20 px-5 py-3 text-slate-100 transition hover:bg-white/10">
          选择六爻 / 塔罗
        </Link>
      </div>
    </section>
  );
}
