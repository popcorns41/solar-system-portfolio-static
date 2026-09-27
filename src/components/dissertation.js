import { responsiveParagraph } from './responsive-copy.js';

export function renderDissertation(section, box) {
  box.classList.add('dissertation-summary');
  box.setAttribute('aria-label', 'Dissertation summary');
  box.innerHTML = `
    <h1>${section.title}</h1>
    <hr />
    <p class="dissertation-meta">${section.meta}</p>
    <h2 class="dissertation-title">${section.projectTitle}</h2>
    <div class="dissertation-grade"><strong>${section.grade}</strong><span>${section.gradeLabel}</span></div>
    <h3>${section.abstract.heading}</h3>
    ${responsiveParagraph(section.abstract.desktop, section.abstract.mobile)}
    <h3>${section.stackHeading}</h3>
    <ul class="dissertation-stack" aria-label="Technical stack">${section.stack.map(item => `<li>${item}</li>`).join('')}</ul>
    <h3>${section.resultsHeading}</h3>
    <ul class="dissertation-results">${section.results.map(item => `<li>${item}</li>`).join('')}</ul>
    <p class="dissertation-note">${section.note}</p>
  `;
}
