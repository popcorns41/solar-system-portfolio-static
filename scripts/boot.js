import {preloadAssets} from "./mediaHandler/mediaCache.js";


export function initBoot(isDev){
  init(isDev);
}

function init(isDevMode){
    if (!(isDevMode)){
      initHomePage();
    }else{
      initDevHomePage();
    }
  preloadAssets();
  enterStaticPageFunctionality();
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

