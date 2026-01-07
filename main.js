// src/main.js


import './scripts/browsing.js';
import './scripts/dynamicInfoBox.js';
import './scripts/uiDynamics.js';
const params = new URLSearchParams(window.location.search);
const isDevMode = params.has('dev');
const isStaticMode = params.has('static');

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener("DOMContentLoaded", async () => {
   if (!isStaticMode) {
    const { loadPlanetObjects } = await import('./modelLoader/loadingHandler.js');
    loadPlanetObjects();
  } else {
    const { loadSunOnly } = await import('./modelLoader/loadingHandler.js');
    loadSunOnly();
  }
  
  // ✅ Register listener before calling load functions
  window.addEventListener("modelLoaded", async () => {
    console.log("dev mode?", isDevMode);
    const { initSolarSystem } = await import('/scripts/solarSystemMain.js');
    initSolarSystem(isDevMode, isStaticMode);

    const { initBoot } = await import('./scripts/boot.js');
    initBoot(isDevMode, isStaticMode);
  });
});





