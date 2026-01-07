import { preloadAllModels } from './preloadModels';
import { modelCache } from './modelCache.js';

export async function loadPlanetObjects() {
  const bar = document.getElementById('loading-bar');
  const text = document.getElementById('loading-text');
  const screen = document.getElementById('loading-screen');

  await preloadAllModels((progress) => {
    const percent = Math.floor(progress * 100);
    bar.style.width = `${percent}%`;
    text.textContent = `Loading ${percent}%`;
  });

  // Optional: delay to let the user see 100%
  setTimeout(() => {
    screen.style.opacity = 0;
    screen.style.pointerEvents = 'none';
    const event = new CustomEvent('modelLoaded', { detail: { modelCache } });
    window.dispatchEvent(event);
  }, 500);
}

export function loadSunOnly() {
  const bar = document.getElementById('loading-bar');
  const text = document.getElementById('loading-text');
  const screen = document.getElementById('loading-screen');

  // Simulate loading the sun model
  setTimeout(() => {
    bar.style.width = '100%';
    text.textContent = 'Loading 100%';
    screen.style.opacity = 0;
    screen.style.pointerEvents = 'none';
    const event = new CustomEvent('modelLoaded', { detail: { modelCache } });
    window.dispatchEvent(event);
  }, 500); // Simulated delay for loading
}