import {preloadAssets} from "./mediaHandler/mediaCache.js";


function isMobile() {
  return window.innerWidth <= 768;
}

function addStaticParam() {
  const url = new URL(window.location.href);
  url.searchParams.set("static", ""); // value-less param
  window.location.href = url.toString();
}

export function initBoot(isDev,isStatic){
  if (isMobile() && !(isStatic)) {
    const overlay = document.getElementById('mobileOverlay');
    const btn = document.getElementById('continueAnywayBtn');
    overlay.style.display = 'flex';

    btn.addEventListener('click', () => {
      addStaticParam();
    });
  }else{
    init(isDev,isStatic);
  }
}

function init(isDevMode,isStaticMode){
    if (!(isDevMode)){
      initHomePage();
    }else{
      initDevHomePage();
    }
  preloadAssets();
  if (isStaticMode){
    enterStaticPageFunctionality();
  }else{
    enterSystemFunctionality();
  }
}

function enterStaticPageFunctionality(){
  document.getElementById("enterSystem").addEventListener("click", () => {
    const title = document.getElementById('title');
    const intro_content = document.getElementById('intro-content');
    const planetUI = document.getElementById('planetCenter');

    planetUI.style.pointerEvents = "none";

    title.style.transition = "0.5s opacity ease";
    intro_content.style.transition = "0.5s opacity ease";

    title.style.opacity = "0";
    intro_content.style.opacity = "0";

    window.dispatchEvent(new CustomEvent("circularBorder"), { detail: { delay: 0 } });
    window.dispatchEvent(new CustomEvent("beginPlanetTransform", {
      detail: { translateY: 41 }
    }));

    const startIndex = 6;
    window.dispatchEvent(new CustomEvent("infoChange",{
      detail:{index:startIndex}
    }));

    window.planetIndex = startIndex;
  });
}

function enterSystemFunctionality(){
  document.getElementById("enterSystem").addEventListener("click", () => {
    console.log("button pressed!")

    const introText = document.getElementById('introText');
    const intro_content = document.getElementById('intro-content');

    introText.style.display = 'none';
    intro_content.style.display = 'none';

    window.dispatchEvent(new CustomEvent("solarTransformDownZoomOutCue"));

    window.addEventListener("sunZoomComplete", () => {
      console.log("Sun transform complete! Starting next sequence...");
      //intro.style.opacity='0';
      const revealEvent = new  CustomEvent("revealPlanets",{
        detail: {delay:1000}
      });
      setTimeout(()=>{window.dispatchEvent(revealEvent)},500);

      window.addEventListener("planetsInView", () => {
        document.getElementById('threeCanvas').style.pointerEvents = 'auto';
        window.dispatchEvent(new CustomEvent("beginTutorial"));
      });
    });
  });
}


function initDevHomePage(){
  const intro_content = document.getElementById('intro-content');
  intro_content.style.display = 'none';
  document.getElementById('threeCanvas').style.pointerEvents = 'auto';
}

function initHomePage(){
  console.log("DOM fully loaded and parsed, starting boot process");

    window.addEventListener('sunLoaded', () => {console.log("sun loaded, starting animation");});

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
      window.dispatchEvent(new Event("beginSunrise"));
    }, 3000);

    window.addEventListener("sunRose", () => {
      console.log("sun has arisen B-)")
      const generateButton = document.getElementById("enterSystem");
      generateButton.style.opacity = "1";
      generateButton.style.pointerEvents = "auto";
    });
}

