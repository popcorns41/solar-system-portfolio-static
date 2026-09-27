import { languages,platforms,roboticsItems } from './iconDirectories';
import { emailHandler } from './emailHandler';

export function planetDataLeftBox(info,leftBox){
  leftBox.style.overflowY = "auto";
  // Update Left Box
  leftBox.innerHTML = `
    <h1>${info.title}</h1>
    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />
    ${info.paragraphs.map((text, index) => `
      <h3 style="padding: 1rem 0 0.5rem 0;">${info.subtitles[index]}</h3>
      <p>${text}</p>
    `).join('')}
  `;
}

function toYouTubeEmbedUrl(url) {
  try {
    const u = new URL(url);

    // shorts: https://youtube.com/shorts/VIDEO_ID
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.split("/shorts/")[1].split(/[?/]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    // watch: https://www.youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // youtu.be/VIDEO_ID
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1).split(/[?/]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
  } catch (_) {}

  return url;
}

function isYouTubeUrl(url) {
  try {
    const u = new URL(url);
    return (
      u.hostname.includes("youtube.com") ||
      u.hostname === "youtu.be"
    );
  } catch {
    return false;
  }
}

export function planetDataRightBox(info, rightBox) {
  rightBox.style.overflowY = "auto";
  rightBox.innerHTML = "";

  const images = info.imageURLs || [];
  const videos = info.videos || [];

  /*
   * IMAGES
   */
  images.forEach((url, index) => {
    const wrapper = document.createElement("div");

    wrapper.id =
      `${info.title
        .replace(/\s+/g, "-")
        .toLowerCase()}-image${index + 1}`;

    wrapper.style.marginBottom = "1.5rem";

    const img = new Image();

    /*
     * Let the browser decide when this image
     * is close enough to the viewport to fetch.
     */
    img.loading = "lazy";
    img.decoding = "async";

    img.src = url;
    img.alt = `${info.title} Image ${index + 1}`;

    img.style.width = "100%";
    img.style.borderRadius = "10px";

    wrapper.appendChild(img);

    const caption = document.createElement("p");

    caption.style.margin = "2rem 0";
    caption.style.fontSize = "0.9rem";

    caption.innerHTML =
      `Image ${index + 1}: ${
        info.imageDescription?.[index] || ""
      }`;

    wrapper.appendChild(caption);

    /*
     * Only add a divider if another piece of
     * media follows this item.
     */
    const hasMoreImages =
      index < images.length - 1;

    const hasVideos =
      videos.length > 0;

    if (hasMoreImages || hasVideos) {
      appendDivider(wrapper);
    }

    rightBox.appendChild(wrapper);
  });

  /*
   * VIDEOS
   */
  videos.forEach((video, index) => {
    const wrapper = document.createElement("div");

    wrapper.id =
      `${info.title
        .replace(/\s+/g, "-")
        .toLowerCase()}-video${index + 1}`;

    wrapper.style.marginBottom = "1.5rem";

    const url = video.url || "";

    const isYouTube =
      video.type === "youtube" ||
      isYouTubeUrl(url);

    let element;

    /*
     * YouTube
     */
    if (isYouTube) {
      const embedUrl =
        toYouTubeEmbedUrl(url);

      element =
        document.createElement("iframe");

      element.src =
        `${embedUrl}?rel=0&modestbranding=1`;

      element.width = "100%";
      element.height = "445px";

      element.style.border = "none";
      element.style.overflow = "hidden";
      element.style.borderRadius = "10px";

      element.loading = "lazy";

      element.setAttribute(
        "referrerpolicy",
        "strict-origin-when-cross-origin"
      );

      element.setAttribute(
        "allowfullscreen",
        "true"
      );

      element.setAttribute(
        "allow",
        "autoplay; encrypted-media; picture-in-picture"
      );
    }

    /*
     * Other embedded content
     */
    else if (video.type === "iframe") {
      element =
        document.createElement("iframe");

      element.src = url;

      element.width = "100%";
      element.height = "445px";

      element.style.border = "none";
      element.style.overflow = "hidden";
      element.style.borderRadius = "10px";

      element.loading = "lazy";

      element.setAttribute(
        "scrolling",
        "no"
      );

      element.setAttribute(
        "frameborder",
        "0"
      );

      element.setAttribute(
        "allowfullscreen",
        "true"
      );

      element.setAttribute(
        "referrerpolicy",
        "strict-origin-when-cross-origin"
      );

      element.setAttribute(
        "allow",
        "autoplay; encrypted-media; picture-in-picture"
      );
    }

    /*
     * Local video
     */
    else {
      element =
        document.createElement("video");

      element.controls = true;

      /*
       * Do NOT download the complete video
       * when the portfolio boots.
       */
      element.preload = "metadata";

      if (video.poster) {
        element.poster = video.poster;
      }

      element.style.width = "100%";
      element.style.borderRadius = "10px";

      const source =
        document.createElement("source");

      source.src = url;
      source.type =
        video.mimeType || "video/mp4";

      element.appendChild(source);
    }

    wrapper.appendChild(element);

    const caption =
      document.createElement("p");

    caption.style.margin = "0.5rem 0";
    caption.style.fontSize = "0.9rem";

    caption.innerHTML =
      `Video ${index + 1}: ${
        video.description || ""
      }`;

    wrapper.appendChild(caption);

    /*
     * Backup link for external embeds.
     */
    if (
      isYouTube ||
      video.type === "iframe"
    ) {
      const link =
        document.createElement("a");

      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent =
        "Open video in a new tab";

      link.style.display =
        "inline-block";

      link.style.marginBottom =
        "0.75rem";

      wrapper.appendChild(link);
    }

    /*
     * No divider after final item.
     */
    if (index < videos.length - 1) {
      appendDivider(wrapper);
    }

    rightBox.appendChild(wrapper);
  });
}

export function planetLinkHandler(){
      document.querySelectorAll(".planet-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(e.currentTarget.dataset.index, 10);
      window.dispatchEvent(new CustomEvent("planetChange", {
        detail: { index }
      }));
      window.dispatchEvent(new CustomEvent("updateArrows",{
        detail: { index }
      }));
    });
  });
}

export function contactMeSection(box) {
  box.style.overflowY = "auto";
  box.innerHTML = `
    <h1>Contact Me</h1>
    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem; padding-bottom: 2rem" />
    <div class="contact-icons" style="display: flex; justify-content: center; gap: 3rem; margin-bottom: 2rem;">
      <div style="text-align: center;">
        <a href="https://www.linkedin.com/in/oliver-hill-7143b3110/" id="linkedin-icon" class="contact-icon" target="_blank" rel="noopener noreferrer" style="color: white;">
          <i class="devicon-linkedin-plain" style="font-size: 2.5rem;"></i>
        </a>
      </div>
      <div style="text-align: center;">
        <a href="https://github.com/popcorns41" id="github-icon" class="contact-icon" target="_blank" rel="noopener noreferrer" style="color: white;">
          <i class="devicon-github-original" style="font-size: 2.5rem;"></i>
        </a>
      </div>
    </div>

    <hr style="border: none; border-top: 1px solid #ccc; margin: 2rem 0;" />

    <form id="contactForm" name="contact_form" style="display: flex; flex-direction: column; gap: 1rem;" method="post" action="#">
  <input 
    type="text" 
    name="user_name" 
    placeholder="Your Name" 
    required
    style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;" 
  />
  
  <input 
    type="email" 
    name="user_email" 
    placeholder="Your Email" 
    required
    style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;" 
  />
  
  <textarea 
    name="message" 
    placeholder="Your Message" 
    rows="5" 
    required
    style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; resize: vertical;">
  </textarea>
  
  <button class="infoButton" type="submit">
    Send Message
  </button>
</form>
  `;

  emailHandler(box, true);
}

export function SkillSetList(box) {
  box.style.overflowY = "auto";
  box.innerHTML = `
    <h1>Skill Sets</h1>
    <hr style="border: none; border-top: 1px solid #ccc; margin: 1rem 0;" />
    <h3 style="padding: 0.5rem 0 1rem 0;">Programming Languages</h3>
    <ul style="list-style: none; padding: 0;">
      ${languages
        .map(
          lang => `
          <li style="display: flex; align-items: center; margin-bottom: 1rem;">
            <i class="${lang.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
            <span style="font-size: 1.1rem;">${lang.name}</span>
          </li>`
        )
        .join('')}
    </ul>
    <h3 style="padding: 0.5rem 0 1rem 0;">Development Platforms</h3>
    <ul style="list-style: none; padding: 0;">
      ${platforms
        .map(
          platform => `
            <li style="display: flex; align-items: center; margin-bottom: 1rem;">
              <i class="${platform.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
              <span style="font-size: 1.1rem;">${platform.name}</span>
            </li>
          `
        )
        .join('')}
    </ul>
    <h3 style="padding: 0.5rem 0 1rem 0;">General Robotics</h3>
    <ul style="list-style: none; padding: 0;">
      ${roboticsItems
        .map(
          item => `
            <li style="display: flex; align-items: center; margin-bottom: 1rem;">
              <i class="${item.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
              <span style="font-size: 1.1rem;">${item.name}</span>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}

export function pdfResumeSection(box) {
  pdfDocumentSection(box, {
    url: './pdfs/ohResume.pdf',
    heading: 'PDF Resume',
    title: 'Oliver Hill Resume',
    filename: 'oliverHillResume.pdf',
  });
}

export function pdfDocumentSection(box, { url, heading, title, filename }) {
  const pdfURL = `${url}#view=Fit`;

  box.classList.add('pdf-box');
  box.style.overflowY = "hidden";

  box.innerHTML = `
    <div class="top-bar">

      <h2>${heading}</h2>

      <div class="tooltip-container">

        <button
          class="downloadPDF download-button"
          type="button"
          aria-label="Download ${heading}"
        >
          <i class="fa-solid fa-download"></i>
        </button>

        <div class="tooltip">
          Download PDF
        </div>

      </div>
    </div>

    <hr
      style="
        border: none;
        border-top: 1px solid #ccc;
        margin: 1rem 0;
      "
    />

    <iframe
      class="resumeFrame"
      data-src="${pdfURL}"
      width="100%"
      height="100%"
      style="border: none;"
      title="${title}"
    >
    </iframe>
    <a class="pdf-open-link" href="${url}" target="_blank" rel="noopener noreferrer">Open PDF in a new tab</a>
  `;

  const frame =
    box.querySelector(".resumeFrame");

  const btn =
    box.querySelector(".downloadPDF");

  if (frame) {
    deferIframeLoad(frame);
  }

  if (btn) {
    btn.addEventListener(
      "click",
      () => downloadPDF(pdfURL, filename)
    );
  }
}

function downloadPDF(pdfURL, filename) {
  const downloadURL =
    pdfURL.split("#")[0];

  const link =
    document.createElement("a");

  link.href = downloadURL;

  link.download =
    filename;

  document.body.appendChild(link);

  link.click();

  link.remove();
}

function appendDivider(parent) {
  const hr = document.createElement("hr");

  hr.style.border = "none";
  hr.style.borderTop =
    "1px solid #ccc";

  hr.style.margin =
    "0.5rem 0";

  parent.appendChild(hr);
}

function deferIframeLoad(frame) {
  const src = frame.dataset.src;

  if (!src) return;

  /*
   * Older browser fallback.
   */
  if (!("IntersectionObserver" in window)) {
    frame.src = src;
    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          return;
        }

        frame.src = src;

        observer.disconnect();
      },
      {
        /*
         * Start loading shortly BEFORE
         * the résumé actually appears.
         */
        rootMargin: "700px 0px"
      }
    );

  observer.observe(frame);
}
