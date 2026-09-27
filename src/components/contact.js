import { icon } from './icons.js';
import { bindContactForm } from '../services/contact.js';

export function renderContact(section, box) {
  box.classList.add('contact-copy');
  box.innerHTML = `
    <h1>${section.title}</h1>
    <hr class="section-divider contact-divider" />
    <div class="contact-icons">
      ${section.links.map(link => `<a href="${link.url}" id="${link.icon}-icon" aria-label="${link.label}" class="contact-icon" target="_blank" rel="noopener noreferrer">${icon(link.icon)}</a>`).join('')}
    </div>
    <hr class="contact-form-divider" />
    <form id="contactForm" name="contact_form" method="post" action="#">
      ${section.fields.map(field => field.type === 'textarea'
        ? `<textarea name="${field.name}" aria-label="${field.label}" placeholder="${field.label}" rows="5" required></textarea>`
        : `<input type="${field.type}" name="${field.name}" aria-label="${field.label}" placeholder="${field.label}" required />`
      ).join('')}
      <button class="infoButton" type="submit">${section.submitLabel}</button>
    </form>
  `;
  bindContactForm(box.querySelector('form'));
}
