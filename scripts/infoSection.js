import {planetData} from './mediaHandler/planetInfoData.js'
import * as HANDLER from './mediaHandler/mediaDisplayHandler.js'


export function initInfoSections() {
  const infoSection = document.querySelector("#info");
  if (!infoSection) return;

  // Clear anything currently inside
  infoSection.innerHTML = "";

  const frag = document.createDocumentFragment();

  for (let index = planetData.length - 1; index >= 0; index--) {
    const info = planetData[index];

    const panel = document.createElement("div");
    panel.className = "info-panel";
    panel.id = `panel-${index}`;



    panel.innerHTML = `
      <div class="infoSection">
        <div class="info-box infoBoxLeft" id="infoBoxLeft-${index}"></div>
        <div class="info-box infoBoxRight" id="infoBoxRight-${index}"></div>
      </div>
    `;

    frag.appendChild(panel);

    // Grab the boxes we just created inside this panel
    const leftBox = panel.querySelector(`#infoBoxLeft-${index}`);
    const rightBox = panel.querySelector(`#infoBoxRight-${index}`);

    // Populate based on index rules
    if (index === 0) {
      HANDLER.contactMeSection(leftBox);
      rightBox.style.display = "none";
    } else if (index === 2) {
      HANDLER.SkillSetList(leftBox);
      HANDLER.pdfResumeSection(rightBox);
    } else {
      HANDLER.planetDataLeftBox(info, leftBox);
      HANDLER.planetDataRightBox(info, rightBox);
    }
  }

  infoSection.appendChild(frag);
}