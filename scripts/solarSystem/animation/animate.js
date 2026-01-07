export function renderLoop(sun, planets, outlinePass, camera, controls, composer) {
  animate(sun, controls, composer);
  requestAnimationFrame(() => renderLoop(sun, planets, outlinePass, camera, controls, composer));
}


// Reset all planets to invisible before we begin
  

const animate = (sun,controls,composer) =>{
  sun.rotateY(0.0015 * 1);

  controls.update();
  composer.render();
};
