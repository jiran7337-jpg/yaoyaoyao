import { DivinationMethodCard } from '@/components/DivinationMethodCard';

export default function DivinationPage() {
  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-bold">选择占卜方式</h1>
      <p className="mt-3 text-slate-300">先确认你想要的体验：逻辑结构更强的六爻，或画面感更直接的塔罗。</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <DivinationMethodCard title="六爻占卜" tag="本卦/变卦" href="/liuyao" description="模拟六次起爻，生成卦象趋势与建议。" />
        <DivinationMethodCard title="塔罗问事" tag="三张牌阵" href="/tarot" description="洗牌抽三张牌，查看过去现在未来的关联。" />
      </div>
    </div>
  );
}
