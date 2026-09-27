import { initInfoSections } from './infoSection.js';

export function initBoot(isDevMode = false) {
  initInfoSections();
  const intro = document.getElementById('intro');
  const button = document.getElementById('enterSystem');

  const enter = (target) => {
    window.dispatchEvent(new Event('portfolioEntered'));
    intro?.remove();
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    const heading = target.querySelector('h1');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  };

  // IDs, rather than CSS selectors, also safely handle arbitrary URL fragments.
  const followHash = () => {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); }
    catch { return false; }
    const target = document.getElementById(id);
    if (!target?.classList.contains('info-panel')) return false;
    enter(target);
    return true;
  };
  window.addEventListener('hashchange', followHash);

  document.getElementById('loadingScreen')?.remove();
  if (followHash()) return null;

  button?.addEventListener('click', () => {
    const firstPanel = document.querySelector('#info .info-panel');
    if (firstPanel) enter(firstPanel);
  }, { once: true });

  if (isDevMode) {
    document.getElementById('intro-content').hidden = true;
    document.getElementById('threeCanvas').style.pointerEvents = 'auto';
  }
  return intro;
}
