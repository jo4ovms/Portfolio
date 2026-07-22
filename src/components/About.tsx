import type { Content } from '../content';
import { useReveal } from '../hooks/useReveal';
import { headingClass, paragraphClass, sectionClass } from './styles';

function Paragraph({ text, index }: { text: string; index: number }) {
  const ref = useReveal<HTMLParagraphElement>(index * 80);

  return (
    <p
      ref={ref}
      className={index > 0 ? `mt-[18px] ${paragraphClass}` : paragraphClass}
    >
      {text}
    </p>
  );
}

export default function About({ t }: { t: Content }) {
  const headingRef = useReveal<HTMLHeadingElement>();

  return (
    <section className={sectionClass} aria-labelledby='about-title'>
      <h2 ref={headingRef} id='about-title' className={headingClass}>
        {t.aboutTitle}
      </h2>
      {t.about.map((paragraph, index) => (
        <Paragraph key={index} text={paragraph} index={index} />
      ))}
    </section>
  );
}
