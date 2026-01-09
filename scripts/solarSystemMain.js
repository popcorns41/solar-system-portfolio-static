//script imports
import {initSetup,postProcessSetup,lightingSetup,initPlanetsToScene} from '/scripts/solarSystem/core/initCanvasSetup.js';
import {initSun,positionSun} from '/scripts/solarSystem/objects/initPlanetObjects.js';
import { initEventListeners } from './solarSystem/input/eventListeners.js';
import {renderLoop} from '/scripts/solarSystem/animation/animate.js'

export async function initSolarSystem(isDev){
  // ******  SETUP  ******
  const { scene, camera, renderer, controls, canvas } = initSetup();
  const { composer,outlinePass,fxaaPass } = postProcessSetup(renderer, scene, camera);
  lightingSetup(scene);

  // ******  SUN  ******

  const sun = initSun();
  let planets;
  planets = [];

  initPlanetsToScene(scene,sun,planets);
  if (!(isDev)){
    positionSun(sun);
  }

  //attach click events to canvas
  renderLoop(sun,planets,outlinePass,camera,controls,composer);
  initEventListeners({canvas, renderer, camera, fxaaPass,sun,planets,controls,composer});
}



  


 