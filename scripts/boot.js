import { initInfoSections } from "./infoSection.js";
export function initBoot(isDev){
  init(isDev);
}

async function init(isDevMode) {
  lockScroll();

  const loadingText = document.getElementById("loadingText");

  if (loadingText) {
    loadingText.textContent = "loading portfolio";
  }

  /*
   * Only block initial startup on the Sun.
   *
   * Images, video and the PDF are no longer part
   * of the critical loading path.
   */
  await waitForSun();

  /*
   * Build the page once the intro asset is ready.
   */
  if (!isDevMode) {
    initHomePage();
    initInfoSections();
  } else {
    initDevHomePage();
  }

  /*
   * Handle direct links after the panels exist.
   */
  const hash = window.location.hash;

  if (hash) {
    const target = document.querySelector(hash);

    if (target && target.classList.contains("info-panel")) {
      await finishLoadingScreen();

      skipIntroAndGoTo(target);
      return;
    }
  }

  /*
   * Normal intro.
   */
  const intro = document.getElementById("intro");

  if (intro) {
    intro.style.opacity = "1";
  }

  enterStaticPageFunctionality();

  /*
   * Everything required for the intro is now ready.
   */
  await finishLoadingScreen();
}

// --- button behavior ---
function enterStaticPageFunctionality() {
  const btn = document.getElementById("enterSystem");
  const intro = document.getElementById("intro");

  lockScroll();

  btn.addEventListener("click", () => {
    btn.disabled = true;

    const firstPanel = document.getElementById("panel-6");
    if (!firstPanel) return;

    unlockScroll();

    const finishIntro = () => {
      intro?.remove();

      requestAnimationFrame(() => {
        firstPanel.scrollIntoView({
          behavior: "auto",
          block: "start"
        });
      });
    };

    waitForSmoothScrollToFinish(firstPanel, finishIntro);

    firstPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function waitForSmoothScrollToFinish(targetElement, callback) {
  let finished = false;

  const done = () => {
    if (finished) return;
    finished = true;

    window.removeEventListener("scrollend", done);
    callback();
  };

  // Browser-level scroll completion event
  window.addEventListener("scrollend", done, { once: true });

  // Fallback for browsers where scrollend is unreliable
  waitUntilElementAtTop(targetElement, done);
}

//fallback 
function waitUntilElementAtTop(element, callback) {
  const tolerance = 2;
  let stableFrames = 0;

  function check() {
    const rect = element.getBoundingClientRect();

    if (Math.abs(rect.top) <= tolerance) {
      stableFrames++;
    } else {
      stableFrames = 0;
    }

    if (stableFrames >= 5) {
      callback();
      return;
    }

    requestAnimationFrame(check);
  }

  requestAnimationFrame(check);
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

    introText.style.opacity = '1';
    introText.style.transform = 'translateY(0)';

    introInstructions.style.opacity = '1';
    introInstructions.style.transform = 'translateY(0)';

    const generateButton = document.getElementById("enterSystem");
    if (!generateButton) return;
    generateButton.style.opacity = "1";
    generateButton.style.pointerEvents = "auto";
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

function waitForSun() {
  // Sun might already have loaded before boot.js reached this point
  if (window.__sunReady) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener(
      "sunLoaded",
      () => {
        resolve();
      },
      { once: true }
    );
  });
}

function finishLoadingScreen() {
  return new Promise((resolve) => {
    const loadingScreen = document.getElementById("loadingScreen");

    if (!loadingScreen) {
      resolve();
      return;
    }

    // Give the browser a couple frames to actually paint
    // the completed page before uncovering it.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loadingScreen.classList.add("loaded");

        loadingScreen.addEventListener(
          "transitionend",
          () => {
            loadingScreen.remove();
            resolve();
          },
          { once: true }
        );
      });
    });
  });
}

function updateLoadingProgress(progress) {
  const loadingProgress = document.getElementById("loadingProgress");

  if (!loadingProgress) return;

  loadingProgress.textContent = `${progress}%`;
}