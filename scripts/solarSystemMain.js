import { initSetup } from './solarSystem/core/initCanvasSetup.js';
import { initSun, positionSun } from './solarSystem/objects/initPlanetObjects.js';
import { initEventListeners } from './solarSystem/input/eventListeners.js';
import { renderLoop } from './solarSystem/animation/animate.js';

export function initSolarSystem(isDev = false) {
  const intro = document.getElementById('intro');
  if (!intro) return;
  const context = initSetup(); // Failure is caught by the optional enhancement loader.
  const { scene, renderer, controls } = context;
  const { sun, ready } = initSun();
  if (!isDev) positionSun(sun);
  scene.add(sun);
  const removeListeners = initEventListeners(context);
  const stop = renderLoop({ ...context, sun, intro });
  let disposed = false;
  let revealFrame = null;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (revealFrame !== null) cancelAnimationFrame(revealFrame);
    stop();
    removeListeners();
    controls.dispose();
    sun.geometry.dispose();
    sun.material.emissiveMap.dispose();
    sun.material.dispose();
    renderer.dispose();
    intro.classList.remove('has-webgl');
    window.removeEventListener('portfolioEntered', dispose);
    window.removeEventListener('pagehide', onPageHide);
  };
  // Preserve resources for the back/forward cache; visibility pauses rendering.
  const onPageHide = (event) => { if (!event.persisted) dispose(); };
  window.addEventListener('portfolioEntered', dispose, { once: true });
  window.addEventListener('pagehide', onPageHide);
  ready.then(() => {
    if (disposed || !intro.isConnected) return;
    // Upload and draw the loaded texture before exposing the canvas.
    renderer.render(scene, context.camera);
    revealFrame = requestAnimationFrame(() => {
      if (!disposed && intro.isConnected) intro.classList.add('has-webgl');
    });
  }).catch(() => {
    // Keep the fallback fully visible if the texture cannot be downloaded.
    dispose();
  });
  return dispose;
}
