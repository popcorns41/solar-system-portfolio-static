// src/main.js


import './scripts/dynamicInfoBox.js';
const params = new URLSearchParams(window.location.search);
const isDevMode = params.has('dev');

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener("DOMContentLoaded", async () => {

    const { initSolarSystem } = await import('/scripts/solarSystemMain.js');
    initSolarSystem(isDevMode);

    const { initBoot } = await import('./scripts/boot.js');
    initBoot(isDevMode);
});





