import './styles/index.css';
import { matchFallbackSun } from './intro/sun-layout.js';
import { initBoot } from './app/bootstrap.js';

const isDevMode = new URLSearchParams(window.location.search).has('dev');
const intro = initBoot(isDevMode);
if (intro && !isDevMode) matchFallbackSun(intro);

// Content and controls are usable before downloading any WebGL code.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const compact = window.matchMedia('(max-width: 900px)');
if (intro && (isDevMode || (!motion.matches && !compact.matches && !navigator.connection?.saveData))) {
  const enhance = async () => {
    if (!intro.isConnected) return;
    if (document.hidden) {
      document.addEventListener('visibilitychange', enhance, { once: true });
      return;
    }
    try {
      const { initSolarSystem } = await import('./intro/index.js');
      if (intro.isConnected) initSolarSystem(isDevMode);
    } catch (error) {
      // The CSS sun and fully functional portfolio remain available.
      console.warn('Using the static intro:', error);
    }
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(enhance, { timeout: 1500 });
  else window.setTimeout(enhance, 100);
}
