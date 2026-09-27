import { imageManifest } from '../generated/image-manifest.js';
import { youtubeEmbedUrl } from '../utils/video-url.js';

function createImage(item) {
  const image = new Image();
  image.loading = 'lazy';
  image.decoding = 'async';
  image.alt = item.alt;
  const asset = imageManifest[item.src];
  if (asset) {
    image.width = asset.width;
    image.height = asset.height;
    image.srcset = asset.variants.map(v => `${v.url} ${v.width}w`).join(', ');
    image.sizes = '(max-width: 740px) calc(100vw - 80px), (max-width: 900px) 650px, (max-width: 1440px) 45vw, 660px';
    image.src = asset.variants[0].url;
  } else image.src = item.src;
  return image;
}

function createVideo(item) {
  const youtube = youtubeEmbedUrl(item.url);
  const embedded = youtube || item.type === 'iframe';
  const element = document.createElement(embedded ? 'iframe' : 'video');
  element.className = 'media-video';
  if (youtube && item.url.includes('/shorts/')) element.classList.add('media-video--portrait');
  else if (item.type === 'iframe') element.classList.add('media-video--social');
  if (embedded) {
    element.src = youtube || item.url;
    element.title = item.description;
    element.loading = 'lazy';
    element.referrerPolicy = 'strict-origin-when-cross-origin';
    element.allowFullscreen = true;
    element.allow = 'autoplay; encrypted-media; picture-in-picture';
    if (!youtube) element.setAttribute('scrolling', 'no');
  } else {
    element.controls = true;
    element.preload = 'metadata';
    if (item.poster) element.poster = item.poster;
    const source = document.createElement('source');
    source.src = item.url;
    source.type = item.mimeType || 'video/mp4';
    element.appendChild(source);
  }
  return { element, embedded };
}

export function renderMedia(section, box) {
  const fragment = document.createDocumentFragment();
  for (const [index, item] of (section.images || []).entries()) {
    const figure = document.createElement('figure');
    figure.className = 'media-item media-image';
    figure.appendChild(createImage(item));
    const caption = document.createElement('figcaption');
    caption.innerHTML = `Image ${index + 1}: ${item.caption}`;
    figure.appendChild(caption);
    fragment.appendChild(figure);
  }
  for (const [index, item] of (section.videos || []).entries()) {
    const figure = document.createElement('figure');
    figure.className = 'media-item';
    const { element, embedded } = createVideo(item);
    figure.appendChild(element);
    const caption = document.createElement('figcaption');
    caption.innerHTML = `Video ${index + 1}: ${item.description}`;
    figure.appendChild(caption);
    if (embedded) {
      const link = document.createElement('a');
      link.className = 'media-open-link';
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open video in a new tab';
      figure.appendChild(link);
    }
    fragment.appendChild(figure);
  }
  box.replaceChildren(fragment);
}
