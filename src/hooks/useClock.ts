import { useEffect, useState } from 'react';

export function useClock(locale: string, place: string) {
  const [label, setLabel] = useState('…');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const day = now.toLocaleDateString(locale, { weekday: 'long' });
      const time = now.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setLabel(`${day}, ${time} · ${place}`);
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [locale, place]);

  return label;
}
