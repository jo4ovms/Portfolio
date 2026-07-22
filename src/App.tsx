import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import About from './components/About';
import Contact from './components/Contact';
import Corners from './components/Corners';
import DotField from './components/DotField';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Preview from './components/Preview';
import { content, type Lang } from './content';
import { usePreview } from './hooks/usePreview';

export default function App({ lang }: { lang: Lang }) {
  const t = content[lang];
  const preview = usePreview();

  return (
    <>
      <DotField />
      <Corners t={t} />
      <Hero t={t} preview={preview} />
      <main>
        <Experience t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <Preview controller={preview} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
