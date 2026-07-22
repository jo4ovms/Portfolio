import type { Content } from '../content';
import { useClock } from '../hooks/useClock';

export default function Corners({ t }: { t: Content }) {
  const clock = useClock(t.locale, t.place);

  return (
    <>
      <p className='fixed left-[26px] top-[22px] z-3 animate-fade text-[12.5px] tracking-[0.02em] text-muted tabular-nums'>
        {clock}
      </p>
      <p className='fixed bottom-[22px] left-[26px] z-3 animate-fade text-[12.5px] tracking-[0.02em] text-faint [@media(hover:none)]:hidden'>
        {t.hint}
      </p>
      <a
        href={t.toggle.href}
        lang={t.toggle.hreflang}
        hrefLang={t.toggle.hreflang}
        className='fixed right-[26px] top-[22px] z-3 animate-fade text-[12px] font-semibold tracking-[0.08em] text-muted no-underline transition-colors duration-300 hover:text-ink focus-visible:text-ink'
      >
        {t.toggle.label}
      </a>
    </>
  );
}
