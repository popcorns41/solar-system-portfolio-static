// Shared by the lightweight fallback and the optional Three.js scene.
export const SUN_SCENE = {
  camera: { x: -175, y: 115, z: 5, fov: 45 },
  radius: (697 / 40) * 1.7,
  elevation: 45,
};

export function projectedSunBounds(height) {
  const { camera, radius, elevation } = SUN_SCENE;
  const distance = Math.hypot(camera.x, camera.y, camera.z);
  const horizontalDistance = Math.hypot(camera.x, camera.z);
  // Camera looks at the origin. Project the sphere's tangent silhouette, rather
  // than its centre plane, so even the slight perspective elongation matches.
  const y = elevation * horizontalDistance / distance;
  const depth = distance - elevation * camera.y / distance;
  const denominator = depth * depth - radius * radius;
  const focal = height / (2 * Math.tan(camera.fov * Math.PI / 360));
  const tangent = radius * Math.sqrt(y * y + denominator);
  const upper = focal * (y * depth + tangent) / denominator;
  const lower = focal * (y * depth - tangent) / denominator;
  return {
    top: height / 2 - upper,
    width: 2 * focal * radius / Math.sqrt(denominator),
    height: upper - lower,
  };
}

export function matchFallbackSun(intro) {
  const update = () => {
    const bounds = projectedSunBounds(intro.getBoundingClientRect().height);
    for (const [property, value] of Object.entries(bounds)) {
      intro.style.setProperty(`--sun-${property}`, `${value}px`);
    }
  };
  update();
  const observer = new ResizeObserver(update);
  observer.observe(intro);
  window.addEventListener('portfolioEntered', () => observer.disconnect(), { once: true });
}
