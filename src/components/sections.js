import { sections } from '../content/sections.js';
import { renderStory } from './story.js';
import { renderDissertation } from './dissertation.js';
import { renderSkills } from './skills.js';
import { renderContact } from './contact.js';
import { renderMedia } from './media.js';
import { renderDocument } from './document.js';

const renderers = {
  story: renderStory,
  dissertation: renderDissertation,
  skills: renderSkills,
  contact: renderContact,
};

export function createSection(section) {
  const render = renderers[section.type];
  if (!render) throw new Error(`Unknown section type: ${section.type}`);

  const panel = document.createElement('section');
  panel.id = section.id;
  panel.className = `info-panel ${section.type}-panel`;
  panel.setAttribute('aria-labelledby', `${section.id}-heading`);
  const layout = document.createElement('div');
  layout.className = 'infoSection';
  const left = document.createElement('div');
  left.className = 'info-box infoBoxLeft';
  left.tabIndex = 0;
  // Preserve existing card IDs as well as public section anchors.
  if (section.id.startsWith('panel-')) left.id = `infoBoxLeft-${section.id.slice(6)}`;
  render(section, left);
  left.querySelector('h1').id = `${section.id}-heading`;
  layout.appendChild(left);

  if (section.document || section.images?.length || section.videos?.length) {
    const right = document.createElement('div');
    right.className = 'info-box infoBoxRight';
    if (section.id.startsWith('panel-')) right.id = `infoBoxRight-${section.id.slice(6)}`;
    if (section.document) renderDocument(right, section.document);
    else renderMedia(section, right);
    layout.appendChild(right);
  }
  panel.appendChild(layout);
  return panel;
}

export function initInfoSections(container = document.getElementById('info')) {
  if (container) container.replaceChildren(...sections.map(createSection));
}
