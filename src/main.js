import './styles/index.css';
import { matchFallbackSun } from './intro/sun-layout.js';
import { initLowPolySun } from './intro/low-poly-sun.js';
import { initBoot } from './app/bootstrap.js';

const parameters = new URLSearchParams(window.location.search);
const isDevMode = parameters.has('dev');
const previewRetroSun = parameters.get('sun') === 'retro';
const intro = initBoot(isDevMode);
if (intro && !isDevMode) {
  matchFallbackSun(intro);
  initLowPolySun(intro);
}

// Content and controls are usable before downloading any WebGL code.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const compact = window.matchMedia('(max-width: 900px)');
if (intro && (isDevMode || (!previewRetroSun && !motion.matches && !compact.matches && !navigator.connection?.saveData))) {
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
      // The low-poly sun and fully functional portfolio remain available.
      console.warn('Using the static intro:', error);
    }
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(enhance, { timeout: 1500 });
  else window.setTimeout(enhance, 100);
}
