export function handleResize({ canvas, renderer, camera, scene }) {
  const { width, height } = canvas.parentElement.getBoundingClientRect();
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(width, height, false);
  // Resizing clears the buffer; preserve a static frame when motion is paused.
  if (scene) renderer.render(scene, camera);
}
