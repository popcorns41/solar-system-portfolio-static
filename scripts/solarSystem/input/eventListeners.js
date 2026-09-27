import { handleResize } from './eventHandler.js';

export function initEventListeners(context) {
  const resize = () => handleResize(context);
  const observer = new ResizeObserver(resize);
  observer.observe(context.canvas.parentElement);
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);
  resize();
  return () => {
    observer.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('orientationchange', resize);
  };
}
