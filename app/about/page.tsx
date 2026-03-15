export default function AboutPage() {
  return (
    <div className="container-shell py-10">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold">关于玄机问事</h1>
        <p className="mt-4 leading-7 text-slate-300">
          玄机问事是一个中文问事占卜体验项目，融合易经六爻与塔罗牌阵，通过结构化输出帮助你理解问题核心。
          V1 专注“可运行、可体验、可扩展”，后续可接入 AI 解读、会员系统、支付与更丰富的占卜流派。
        </p>
        <p className="mt-4 leading-7 text-slate-300">
          我们重视边界：不宣称绝对准确，不制造恐慌，不替代专业判断；希望在神秘感与现实行动之间，给你一个更平衡的观察视角。
        </p>
      </div>
    </div>
  );
}
