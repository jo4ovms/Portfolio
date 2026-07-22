import { useEffect } from 'react';
import type { Content, Project } from '../content';
import type { PreviewController } from '../hooks/usePreview';
import MagnetLink from './MagnetLink';
import { metaLinkClass } from './styles';

function ProjectLink({
  project,
  preview,
}: {
  project: Project;
  preview: PreviewController;
}) {
  const data = {
    title: project.title,
    desc: project.desc,
    tech: project.tech,
    url: project.href.replace(/^https?:\/\//, ''),
    image: project.image,
  };

  return (
    <MagnetLink
      href={project.href}
      target='_blank'
      rel='noopener'
      className='group inline-flex w-fit items-baseline gap-3 py-[9px] text-[1.05rem] font-medium text-ink no-underline transition-transform duration-[450ms] ease-expo will-change-transform'
      onPointerEnter={(e) => preview.show(data, e)}
      onPointerMove={(e) => preview.move(e)}
      onPointerLeave={() => preview.hide()}
      onFocus={(e) => preview.showAnchored(data, e.currentTarget)}
      onBlur={() => preview.hide()}
    >
      <span className='underline-slide'>{project.title}</span>
      <span className='text-[0.9em] text-faint transition-[transform,color] duration-[450ms] ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ink group-focus-visible:translate-x-[3px] group-focus-visible:-translate-y-[3px] group-focus-visible:text-ink'>
        ↗
      </span>
    </MagnetLink>
  );
}

export default function Hero({
  t,
  preview,
}: {
  t: Content;
  preview: PreviewController;
}) {
  useEffect(() => {
    for (const project of t.projects) {
      if (project.image) new Image().src = project.image;
    }
  }, [t.projects]);

  return (
    <header className='relative z-2 grid min-h-svh place-items-center px-6 py-[72px]'>
      <div className='w-full max-w-[560px]'>
        <p className='mb-7 animate-rise text-[13px] font-medium tracking-[0.02em] text-muted [animation-delay:100ms]'>
          {t.who}
        </p>
        <h1 className='animate-rise text-balance text-[clamp(1.9rem,4.6vw,3rem)] font-medium leading-[1.18] tracking-[-0.022em] [animation-delay:220ms]'>
          {t.headline[0]}
          <br />
          {t.headline[1]}
        </h1>
        <p className='mt-[22px] max-w-[48ch] animate-rise text-pretty text-muted [animation-delay:340ms]'>
          {t.lead}
        </p>
        <nav
          className='mt-11 flex animate-rise flex-col gap-0.5 [animation-delay:460ms]'
          aria-label={t.projectsLabel}
        >
          {t.projects.map((project) => (
            <ProjectLink
              key={project.href}
              project={project}
              preview={preview}
            />
          ))}
        </nav>
        <div className='mt-10 flex animate-rise gap-[26px] [animation-delay:580ms]'>
          <MagnetLink
            className={metaLinkClass}
            href='https://github.com/jo4ovms'
            target='_blank'
            rel='noopener'
          >
            GitHub
          </MagnetLink>
          <MagnetLink className={metaLinkClass} href={t.contactAnchor}>
            {t.metaContact}
          </MagnetLink>
        </div>
      </div>
    </header>
  );
}
