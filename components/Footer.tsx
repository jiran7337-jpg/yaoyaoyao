import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell grid gap-4 text-sm text-slate-400 md:grid-cols-2">
        <div>
          <p className="font-medium text-slate-200">玄机问事 · 易经六爻 + 塔罗问事</p>
          <p className="mt-2">以仪式感与结构化解读，帮助你更清晰地看见当下。</p>
        </div>
        <div className="md:text-right">
          <p>内容仅供娱乐、参考与自我探索。</p>
          <p className="mt-2">
            <Link href="/disclaimer" className="text-accent hover:underline">
              查看完整免责声明
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
