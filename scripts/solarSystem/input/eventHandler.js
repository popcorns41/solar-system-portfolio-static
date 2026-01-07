import {Vector3} from 'three';
import {state} from '/scripts/solarSystem/core/state.js';
import {hideAllExceptSelected} from  '/scripts/solarSystem/animation/sequenceAnim.js';

//sequenceAnim functions are called on directly due to poor eventDispatch performances at 0 delay time
export function planetChange({event,sun,planets,controls,camera,offsets,canvas}){
    const index = event.detail.index;
    let selected;
    // Determine the selected planet based on the index
    if (index == 0) {
        selected = sun;
    }else{
        selected = planets[index - 1];
    }
    state.offset = offsets[index];

    selected.planet.visible = true;
        selected.planet.traverse(child => {
        child.visible = true; // <- make child renderable
        if (child.material) {
        child.material.transparent = true;
        child.material.opacity = 1;
        }
    });

    hideAllExceptSelected(selected,sun,planets);
    const planetPosition = new Vector3();
    selected.planet.getWorldPosition(planetPosition);

    // Update camera target and position

    controls.target.copy(planetPosition);
    camera.lookAt(planetPosition);
    state.targetCameraPosition.copy(planetPosition).add(
    camera.position.clone().sub(planetPosition).normalize().multiplyScalar(state.offset)
    );
    
    camera.position.copy(state.targetCameraPosition);
  }

  export async function handleZoomOut(canvas,settings) {
    state.isZoomingOut = true;
    console.log("zoom out received!");
    const bringBackSunEvent = new CustomEvent("changeSunOpacity",{
      detail:{opacity:1,duration:2000}
    });
    canvas.dispatchEvent(bringBackSunEvent);
    settings.accelerationOrbit = 1;

    const revealEvent = new  CustomEvent("revealPlanets",{
        detail: {delay:1000}
      });
    setTimeout(() => {
      window.dispatchEvent(revealEvent);
    }, 500);
  }

  export function handleResize({canvas, renderer, camera, fxaaPass, composer}) {
  const dpr = window.devicePixelRatio || 1;

  // Update camera aspect ratio & projection matrix
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size and pixel ratio
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  canvas.style.width = '100vw';
  canvas.style.height = '100vh';

  composer.setSize(window.innerWidth, window.innerHeight);

  // Update FXAA pass resolution uniforms
  if (fxaaPass) {
    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (window.innerWidth * dpr),
      1 / (window.innerHeight * dpr)
    );
  }

  console.log("resize triggered!");
}