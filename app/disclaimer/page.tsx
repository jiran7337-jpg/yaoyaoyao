import { DisclaimerBlock } from '@/components/DisclaimerBlock';

export default function DisclaimerPage() {
  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-bold">免责声明与使用边界</h1>
      <p className="mt-3 text-slate-300">请在使用前阅读以下说明，确保理性参考占卜内容。</p>
      <div className="mt-6">
        <DisclaimerBlock />
      </div>
      <div className="mt-6 glass-card p-6 text-sm leading-7 text-slate-300">
        <p>本站不提供医疗、法律、投资或心理治疗服务，不应被视作专业结论。</p>
        <p>对于关系、职业、财务等重大现实决策，请优先结合现实证据与专业意见。</p>
        <p>犀利版解读旨在帮助识别盲点，不含羞辱、诅咒、极端行为指令。</p>
      </div>
    </div>
  );
}
