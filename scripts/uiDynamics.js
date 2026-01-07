

function updateCircleRadius() {
  const vh = window.innerHeight;
  const scaledR = Math.min(47, Math.max(10, vh * 0.06)); // clamp to safe bounds
  const circle = document.querySelector('#planetCenter circle');
  circle.setAttribute('r', scaledR.toFixed(2));
}
window.addEventListener('DOMContentLoaded', updateCircleRadius);
// Update on resize
window.addEventListener('resize', updateCircleRadius);