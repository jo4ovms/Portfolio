import type { Content } from '../content';
import { useReveal } from '../hooks/useReveal';
import MagnetLink from './MagnetLink';
import { headingClass, metaLinkClass } from './styles';

export default function Contact({ t }: { t: Content }) {
  const headingRef = useReveal<HTMLHeadingElement>();
  const bodyRef = useReveal<HTMLDivElement>(80);

  return (
    <section
      id={t.contactAnchor.slice(1)}
      className='relative z-2 mx-auto max-w-[720px] scroll-mt-12 px-6 py-[clamp(72px,12vh,128px)]'
      aria-labelledby='contact-title'
    >
      <h2 ref={headingRef} id='contact-title' className={headingClass}>
        {t.contactTitle}
      </h2>
      <div ref={bodyRef}>
        <p className='-mt-3 mb-6 max-w-[60ch] text-pretty text-muted'>
          {t.contactLead}
        </p>
        <MagnetLink
          className='underline-slide mt-1.5 inline-block text-[clamp(1.15rem,3vw,1.7rem)] font-semibold tracking-[-0.015em] text-ink no-underline transition-transform duration-[450ms] ease-expo will-change-transform'
          href={`mailto:${t.email}`}
        >
          {t.email}
        </MagnetLink>
        <div className='mt-[30px] flex gap-[26px]'>
          <a
            className={metaLinkClass}
            href='https://github.com/jo4ovms'
            target='_blank'
            rel='noopener'
          >
            GitHub ↗
          </a>
          <a
            className={metaLinkClass}
            href='https://www.linkedin.com/in/joaovictormacieldossantos/'
            target='_blank'
            rel='noopener'
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
