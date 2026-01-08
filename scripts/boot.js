import {preloadAssets} from "./mediaHandler/mediaCache.js";
import { initInfoSections } from "./infoSection.js";
export function initBoot(isDev){
  init(isDev);
}

function init(isDevMode){
    if (!(isDevMode)){
      initHomePage();
      initInfoSections();
    }else{
      initDevHomePage();
    }
  preloadAssets();

  // 1) Lock scroll by default (intro experience)
  lockScroll();
  const hash = window.location.hash; 
  if (hash) {
    const target = document.querySelector(hash);
    if (target && target.classList.contains("info-panel")) {
      skipIntroAndGoTo(target);
      return;
    }
  }

  enterStaticPageFunctionality();
}

// --- Your button behavior ---
function enterStaticPageFunctionality() {
  const btn = document.getElementById("enterSystem");
  const intro = document.getElementById("intro");

  // Lock scrolling immediately (do this once on load)
  lockScroll();

  btn.addEventListener("click", () => {
    // Prevent double clicks doing weird stuff
    btn.disabled = true;

    // Enable scrolling
    unlockScroll();

    // Find the first panel (first in DOM order)
    const firstPanel = document.getElementById("panel-6");

    if (firstPanel) {
      // Smooth scroll to the first panel
      firstPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Make it impossible to scroll back: remove the intro section
    // (wait a moment so scrollIntoView has time to start)
    setTimeout(() => {
      if (intro) intro.remove();
      // Ensure we're still aligned at the top of the first panel after removal
      if (firstPanel) firstPanel.scrollIntoView({ behavior: "auto", block: "start" });
    }, 500);
  });
}


function initDevHomePage(){
  const intro_content = document.getElementById('intro-content');
  intro_content.style.display = 'none';
  document.getElementById('threeCanvas').style.pointerEvents = 'auto';
}

function initHomePage(){
  console.log("DOM fully loaded and parsed, starting boot process");

    const introText = document.getElementById('introText');
    const introInstructions = document.getElementById('instruction');

    document.getElementById('threeCanvas').style.pointerEvents = 'none';

    // Step 1: Show title
    setTimeout(() => {
      introText.style.opacity = '1';
      introText.style.transform = 'translateY(0)';
    }, 200);

    // Step 2: Show instructions later
    setTimeout(() => {
      introInstructions.style.opacity = '1';
      introInstructions.style.transform = 'translateY(0)';
      
    }, 1500);

    setTimeout(() => {
      const generateButton = document.getElementById("enterSystem");
      generateButton.style.opacity = "1";
      generateButton.style.pointerEvents = "auto";
    }, 2500);
}

// --- Scroll lock helpers ---

function skipIntroAndGoTo(panelEl) {
  // enable scrolling + remove intro (your desired behavior)
  unlockScroll();

  const intro = document.getElementById("intro");
  if (intro) intro.remove();

  // jump (or smooth scroll) to target
  panelEl.scrollIntoView({ behavior: "auto", block: "start" });
}

function preventDefault(e) {
  e.preventDefault();
}

function preventScrollKeys(e) {
  // keys that scroll the page
  const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Spacebar"];
  if (keys.includes(e.key)) {
    e.preventDefault();
  }
}

function lockScroll() {
  // stop scrollbars + overscroll bounce
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // stop wheel/touch/keys
  window.addEventListener("wheel", preventDefault, { passive: false });
  window.addEventListener("touchmove", preventDefault, { passive: false });
  window.addEventListener("keydown", preventScrollKeys, { passive: false });
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

  window.removeEventListener("wheel", preventDefault);
  window.removeEventListener("touchmove", preventDefault);
  window.removeEventListener("keydown", preventScrollKeys);
}