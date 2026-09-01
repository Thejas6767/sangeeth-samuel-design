import { FONT_MONO } from './constants';

interface Props {
  index: number;
  total?: number;
  label: string;
  dark?: boolean;
  className?: string;
}

export function ChapterMark({ index, total = 8, label, dark = true, className = '' }: Props) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className={`pointer-events-none absolute flex select-none items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] ${className}`} style={{ fontFamily: FONT_MONO, color: dark ? 'rgba(140,140,135,.62)' : 'rgba(87,86,79,.7)' }}>
      <span className="h-1 w-1 rounded-full bg-current opacity-60" />
      <span>{pad(index)} / {pad(total)} — {label}</span>
    </div>
  );
}
