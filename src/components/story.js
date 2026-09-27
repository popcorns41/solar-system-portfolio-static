import { responsiveParagraph } from './responsive-copy.js';

export function renderStory(section, box) {
  box.classList.add('story-copy');
  box.innerHTML = `
    <h1>${section.title}</h1>
    <hr class="section-divider" />
    ${section.blocks.map(block => `
      ${block.heading ? `<h3>${block.heading}</h3>` : ''}
      ${responsiveParagraph(block.desktop, block.mobile)}
    `).join('')}
  `;
}
