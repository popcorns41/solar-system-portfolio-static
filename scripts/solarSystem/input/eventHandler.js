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