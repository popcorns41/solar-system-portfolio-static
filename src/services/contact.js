import { emailConfig } from '../config/email.js';

async function sendContactForm(form) {
  const { default: emailjs } = await import('@emailjs/browser');
  emailjs.init(emailConfig.publicKey);
  return emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form);
}

// Inject a sender in tests; the live network request stays in one place.
export function bindContactForm(form, send = sendContactForm) {
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';
  const button = form.querySelector('[type="submit"]');
  const label = button.textContent;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = 'Sending...';
    try {
      await send(form);
      showToast('✅ Message sent! I will get back to you soon.');
      form.reset();
    } catch (error) {
      console.error('Message failed:', error);
      alert('Message failed to send. Please try again later.');
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
