export function renderLoop({ sun, scene, camera, controls, renderer, intro }) {
  let frame = null;
  let visible = true;
  let previousTime = null;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animate = (time) => {
    frame = null;
    if (document.hidden || !visible || !intro.isConnected || motion.matches) return;
    const delta = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    sun.rotateY(0.09 * delta);
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(animate);
  };
  const update = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = null;
    if (!document.hidden && visible && intro.isConnected && !motion.matches) {
      frame = requestAnimationFrame(animate);
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  observer.observe(intro);
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', update);
  update();
  return () => {
    if (frame !== null) cancelAnimationFrame(frame);
    observer.disconnect();
    document.removeEventListener('visibilitychange', update);
    motion.removeEventListener('change', update);
  };
}
