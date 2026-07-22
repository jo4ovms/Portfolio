import type { Content, ExperienceItem } from '../content';
import { useReveal } from '../hooks/useReveal';
import { headingClass, sectionClass } from './styles';

function Row({ item, index }: { item: ExperienceItem; index: number }) {
  const ref = useReveal<HTMLLIElement>(index * 80);

  return (
    <li
      ref={ref}
      className={`grid grid-cols-[92px_1fr_auto] items-baseline gap-x-4 gap-y-2 border-b border-line/50 py-5 max-[720px]:grid-cols-1 max-[720px]:gap-y-1.5${index === 0 ? ' border-t' : ''}`}
    >
      <span className='text-[13.5px] text-muted tabular-nums'>
        {item.years}
      </span>
      <p>
        <span className='text-[1rem] font-semibold'>{item.title}</span>
        <span className='text-[0.92rem] text-muted'> · {item.role}</span>
      </p>
      <span className='justify-self-end whitespace-nowrap rounded-full border border-line px-[9px] py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-muted max-[720px]:order-first max-[720px]:justify-self-start'>
        {item.status}
      </span>
      <p className='col-start-2 max-w-[60ch] text-pretty text-[0.95rem] text-muted max-[720px]:col-start-1'>
        {item.desc}
      </p>
      {item.tech && (
        <p className='col-start-2 text-[11px] tracking-[0.02em] text-faint max-[720px]:col-start-1'>
          {item.tech}
        </p>
      )}
    </li>
  );
}

export default function Experience({ t }: { t: Content }) {
  const headingRef = useReveal<HTMLHeadingElement>();

  return (
    <section className={sectionClass} aria-labelledby='experience-title'>
      <h2 ref={headingRef} id='experience-title' className={headingClass}>
        {t.experienceTitle}
      </h2>
      <ol className='list-none p-0'>
        {t.experience.map((item, index) => (
          <Row key={item.title} item={item} index={index} />
        ))}
      </ol>
    </section>
  );
}
