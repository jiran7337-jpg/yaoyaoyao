import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  href: string;
  tag: string;
}

export function DivinationMethodCard({ title, description, href, tag }: Props) {
  return (
    <div className="glass-card p-6">
      <p className="mb-3 inline-block rounded-md bg-white/10 px-2 py-1 text-xs text-accent">{tag}</p>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <Link href={href} className="mt-5 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
        进入 {title}
      </Link>
    </div>
  );
}
