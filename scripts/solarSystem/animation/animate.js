import {state,settings,sunZoomState} from '/scripts/solarSystem/core/state.js';
import {zoomOutTargetPosition} from '/scripts/solarSystem/core/const.js'
import * as THREE from 'three';

const clock = new THREE.Clock();


export function renderLoop(sun, planets, outlinePass, camera, controls, composer) {
  const delta = clock.getDelta(); // in seconds
  animate(sun, planets, outlinePass, camera, controls, composer, delta);
  requestAnimationFrame(() => renderLoop(sun, planets, outlinePass, camera, controls, composer));
}


// Reset all planets to invisible before we begin
  

const animate = (sun,planets,outlinePass,camera,controls,composer,delta) =>{
  // ******  sequence Animations  ******
  if (sunZoomState.active) {
    sunZoomState.progress += delta / sunZoomState.duration;
    const t = Math.min(sunZoomState.progress, 1);
    const easedT = sunZoomState.easingFn(t);

    // Animate position
    sun.position.y = sunZoomState.startY + (sunZoomState.targetY - sunZoomState.startY) * easedT;

    // Animate scale only for 'downZoom'
    if (sunZoomState.mode === "downZoom") {
      const scale = sunZoomState.startScale + (sunZoomState.targetScale - sunZoomState.startScale) * easedT;
      sun.scale.set(scale, scale, scale);
    }

    // Animation complete
    if (t >= 1) {
      sunZoomState.active = false;

      if (sunZoomState.mode === "downZoom") {
        window.dispatchEvent(new CustomEvent("sunZoomComplete"));
      } else if (sunZoomState.mode === "sunrise") {
        window.dispatchEvent(new CustomEvent("sunRose"));
      }

      sunZoomState.mode = null;
    }
  }

  controls.update();
  composer.render();
};
