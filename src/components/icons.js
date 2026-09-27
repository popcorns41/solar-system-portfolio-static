import { observeOnce } from '../utils/observe-once.js';

// Small inline icons avoid downloading a full icon font for a handful of controls.
const paths = {
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  robot: '<rect x="4" y="7" width="16" height="14" rx="3"/><path d="M12 3v4M1 12h3m16 0h3M8 16h8"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/>',
  signal: '<path d="m8 21 4-10 4 10M8 6a6 6 0 0 0 0 9m8-9a6 6 0 0 1 0 9M5 3a10 10 0 0 0 0 15M19 3a10 10 0 0 1 0 15"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>',
  github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-1.6-.8-2 3-.3 6-1.5 6-6 0-1.3-.5-2.5-1.3-3.4.2-1 .1-2.3-.3-3.4-1.4 0-3 .8-4 1.5a13 13 0 0 0-6 0C7.6 4 6 3.2 4.6 3.2c-.4 1.1-.5 2.4-.3 3.4C3.5 7.5 3 8.7 3 10c0 4.5 3 5.7 6 6-.5.4-.8 1-.8 2v4"/>',
};
export function icon(name) {
  return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.robot}</svg>`;
}

export function loadSkillIconsNear(box) {
  const load = () => {
    if (document.getElementById('skill-icon-styles')) return;
    const link = document.createElement('link');
    link.id = 'skill-icon-styles';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/devicon.min.css';
    document.head.appendChild(link);
  };
  observeOnce(box, load);
}
