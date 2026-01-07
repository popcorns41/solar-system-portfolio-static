import {state,settings,sunZoomState} from '/scripts/solarSystem/core/state.js';
import {zoomOutTargetPosition} from '/scripts/solarSystem/core/const.js'
import * as THREE from 'three';

const clock = new THREE.Clock();


export function renderLoop(sun, planets, mouseHandler, outlinePass, camera, controls, composer) {
  const delta = clock.getDelta(); // in seconds
  animate(sun, planets, mouseHandler, outlinePass, camera, controls, composer, delta);
  requestAnimationFrame(() => renderLoop(sun, planets, mouseHandler, outlinePass, camera, controls, composer));
}


// Reset all planets to invisible before we begin
  

const animate = (sun,planets,mouseHandler,outlinePass,camera,controls,composer,delta) =>{
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

  // ******  ROTATION  ******
     //rotating planets around the sun and itself
    sun.rotateY(0.0015 * settings.acceleration);


    for (const p of planets) {
      p.rotateSelf(p.planet, p.rotationSpeed, settings.acceleration);
      p.planet3d.rotateY(p.orbitSpeed * settings.accelerationOrbit);
    }
     mouseHandler.raycaster.setFromCamera(state.ndcRange, camera);

    // Check for intersections
    var intersects = mouseHandler.raycaster.intersectObjects(mouseHandler.raycastTargets);
    const card = document.getElementById('hoverCard');

    outlinePass.selectedObjects = [];

    if (state.hasMouseMove){
      if ((intersects.length > 0) && (state.hoverEnabled == true)) {
        const intersectedObject = intersects[0].object;

        document.body.style.cursor = 'pointer';

        outlinePass.selectedObjects = [intersectedObject];
        mouseHandler.updateCardForHoveredObject(intersectedObject,card);  


        card.style.left = `${mouseHandler.clientMouse.x + 10}px`;
        card.style.top = `${mouseHandler.clientMouse.y + 10}px`;
        card.style.display = 'block';
    }else {
      card.innerText = "";
      card.style.display = "none";
      document.body.style.cursor = 'default';
    }
  }
    

  // ******  ZOOM IN/OUT  ******
  if (state.isMovingTowardsPlanet) {
    camera.position.lerp(state.targetCameraPosition, 0.03);
    if (camera.position.distanceTo(state.targetCameraPosition) < 1) {
      state.isMovingTowardsPlanet = false;
    }
  } else if (state.isZoomingOut) {
    camera.position.lerp(zoomOutTargetPosition, 0.03);

    if (camera.position.distanceTo(zoomOutTargetPosition) < 1) {
        state.isZoomingOut = false;
    }
  }

    controls.update();
    composer.render();
  };

  //helper

 function fadeInPlanet(planetGroup) {
  planetGroup.visible = true;
  const materials = [];
  planetGroup.traverse(child => {
    child.visible = true;
    if (child.material) {
      child.material.transparent = true;
      child.material.opacity = 0;
      materials.push(child.material);
    }
  });
  if (materials.length > 0) {
    fadeInDurations.set(planetGroup.uuid, {
      progress: 0,
      duration: 1.5,
      easing: t => t * t * (3 - 2 * t),
      materials
    });
  }
}
