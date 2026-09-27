import { icon } from './icons.js';
import { observeOnce } from '../utils/observe-once.js';

export function renderDocument(box, { url, heading, title, filename, onDemand = false }) {
  box.classList.add('pdf-box');
  box.innerHTML = `
    <div class="top-bar">
      <h2>${heading}</h2>
      <div class="tooltip-container">
        <a class="download-button" href="${url}" download="${filename}" aria-label="Download ${heading}">${icon('download')}</a>
        <div class="tooltip">Download PDF</div>
      </div>
    </div>
    <hr class="document-divider" />
    <div class="pdf-placeholder">
      <p>Read the document here, or open it in a new tab.</p>
      <button class="infoButton pdf-preview-button" type="button" aria-expanded="false">Load PDF preview</button>
    </div>
    <iframe class="resumeFrame" title="${title}"></iframe>
    <a class="pdf-open-link" href="${url}" target="_blank" rel="noopener noreferrer">Open PDF in a new tab</a>
  `;
  const frame = box.querySelector('iframe');
  const button = box.querySelector('.pdf-preview-button');
  const load = () => {
    if (frame.hasAttribute('src')) return;
    frame.src = `${url}#view=Fit`;
    box.classList.add('pdf-loaded');
    button.setAttribute('aria-expanded', 'true');
  };
  button.addEventListener('click', load, { once: true });
  // The large dissertation and all mobile PDFs remain opt-in.
  if (!onDemand && !window.matchMedia('(max-width: 900px)').matches) observeOnce(box, load);
}
