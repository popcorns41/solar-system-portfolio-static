import {planetData} from './mediaHandler/planetInfoData.js'


export function initInfoSections() {
    const infoSection = document.querySelector("#info");
  if (!infoSection) return;

  // Clear anything currently inside
  infoSection.innerHTML = "";

  const frag = document.createDocumentFragment();

  for (let i = planetData.length - 1; i >= 0; i--) {
    // legacy entry — skip it
    if (i === 2) continue;

    const planet = planetData[i];

    const panel = document.createElement("div");
    panel.className = "info-panel";
    panel.id = `panel-${i}`;

    panel.innerHTML = `
        <div style="text-align:center; padding: 2rem;">
        <h2 style="margin:0 0 0.5rem 0;">
            ${planet?.title ?? `Item ${i + 1}`}
        </h2>
        <p style="margin:0; opacity:0.85;">
            Panel ${i + 1} of ${planetData.length}
        </p>
        </div>
    `;

    frag.appendChild(panel);
    }

    infoSection.appendChild(frag);
}