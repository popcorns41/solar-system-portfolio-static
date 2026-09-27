import { icon, loadSkillIconsNear } from './icons.js';

export function renderSkills(section, box) {
  loadSkillIconsNear(box);
  box.classList.add('skills-copy');
  box.innerHTML = `
    <h1>${section.title}</h1>
    <hr class="document-divider" />
    ${section.groups.map(group => `
      <h3>${group.heading}</h3>
      <ul class="skills-list">
        ${group.items.map(item => `
          <li><span class="skill-icon">${item.icon.startsWith('devicon-') ? `<i aria-hidden="true" class="${item.icon}"></i>` : icon(item.icon)}</span><span>${item.name}</span></li>
        `).join('')}
      </ul>
    `).join('')}
  `;
}
