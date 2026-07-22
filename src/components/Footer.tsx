import type { Content } from '../content';

export default function Footer({ t }: { t: Content }) {
  return (
    <footer className='relative z-2 mx-auto max-w-[720px] px-6 pb-8 pt-5'>
      <p className='text-[12.5px] text-faint'>{t.footer}</p>
    </footer>
  );
}
