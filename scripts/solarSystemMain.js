//script imports
import {initSetup,postProcessSetup,lightingSetup,initPlanetsToScene,devStateSetup} from '/scripts/solarSystem/core/initCanvasSetup.js';
import {initSun,initPlanetObjects,bootupPlanetConditions,rePositionSun} from '/scripts/solarSystem/objects/initPlanetObjects.js';
import {MouseHandler} from '/scripts/solarSystem/input/mouse.js';
import { initEventListeners } from './solarSystem/input/eventListeners.js';
import {offsets} from '/scripts/solarSystem/core/const.js';
import {renderLoop} from '/scripts/solarSystem/animation/animate.js'

export async function initSolarSystem(isDev,isStatic){
  // ******  SETUP  ******
  const { scene, camera, renderer, controls, canvas } = initSetup();
  const { composer,outlinePass,fxaaPass } = postProcessSetup(renderer, scene, camera);
  lightingSetup(scene);

  // ******  SUN  ******

  const sun = initSun();
  let planets;
  if ((isStatic)){
    planets = [];
  }else{
    planets = await initPlanetObjects();
  }

  initPlanetsToScene(scene,sun,planets);
  if (!(isDev)){
    rePositionSun(sun);
    bootupPlanetConditions(planets);
  }else{
    devStateSetup();
  }
     // mouse movement
  const mouseHandler = new MouseHandler({sun,planets,camera,controls,outlinePass,offsets,canvas});

  //attach click events to canvas
  mouseHandler.attach(); 
  renderLoop(sun,planets,mouseHandler,outlinePass,camera,controls,composer);
  initEventListeners({canvas, renderer, camera, fxaaPass,sun,planets,controls,composer});
}



  


 