// Both versions are authored locally. CSS exposes only the version appropriate
// to the viewport, including to assistive technology, and responds to resizing.
export function responsiveParagraph(fullText, shortText) {
  if (!shortText) return `<p>${fullText}</p>`;
  return `<p class="copy-desktop">${fullText}</p><p class="copy-mobile">${shortText}</p>`;
}
