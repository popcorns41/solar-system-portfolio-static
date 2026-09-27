// A tiny software-rendered icosphere: flat faces, a restricted fiery palette,
// and screen-space dithering evoke early console graphics without loading WebGL.
const SIZE = 256;
const FRAME_INTERVAL = 1000 / 20;
const PALETTE = ['#ad281a', '#c73317', '#df441a', '#ef5c20', '#fa7525', '#ff902f', '#ffab42', '#ffc15a', '#ffd577', '#ffe696', '#fff0b4'];
const normalize = vector => {
  const length = Math.hypot(...vector);
  return vector.map(value => value / length);
};

function createFaces() {
  const t = (1 + Math.sqrt(5)) / 2;
  const vertices = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(normalize);
  let triangles = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ].map(indices => indices.map(index => vertices[index]));
  // 320 triangles give a visibly angular silhouette and broad, readable facets.
  for (let level = 0; level < 2; level++) {
    triangles = triangles.flatMap(([a, b, c]) => {
      const midpoint = (v, w) => normalize(v.map((value, i) => value + w[i]));
      const ab = midpoint(a, b), bc = midpoint(b, c), ca = midpoint(c, a);
      return [[a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]];
    });
  }
  return triangles.map(points => {
    const centre = normalize(points[0].map((_, i) => points.reduce((sum, point) => sum + point[i], 0)));
    const [x, y, z] = centre;
    // The mottling belongs to the surface, so it rotates with the geometry.
    const heat = 0.5 + 0.23 * Math.sin(6 * x + 3 * z) * Math.cos(5 * y - z)
      + 0.17 * Math.sin(13 * y + 7 * z) * Math.cos(9 * x);
    return { points, centre, heat };
  });
}

const faces = createFaces();
const light = normalize([-0.5, 0.65, 1]);

function createPainter(canvas) {
  const context = canvas.getContext('2d');
  if (!context) return null;
  canvas.width = canvas.height = SIZE;
  const tile = document.createElement('canvas');
  tile.width = tile.height = 4;
  const tileContext = tile.getContext('2d');
  tileContext.fillStyle = 'rgba(87, 27, 12, 0.2)';
  tileContext.fillRect(0, 0, 1, 1);
  tileContext.fillRect(2, 2, 1, 1);
  const dither = context.createPattern(tile, 'repeat');

  return angle => {
    const cosine = Math.cos(angle), sine = Math.sin(angle);
    // A tilted axis makes the geometry feel like a rotating object, not a disc.
    const rotate = ([x, y, z]) => {
      const rx = x * cosine + z * sine;
      const rz = z * cosine - x * sine;
      return [rx * 0.966 - y * 0.259, rx * 0.259 + y * 0.966, rz];
    };
    const visible = faces.map(face => ({ ...face, normal: rotate(face.centre) }))
      .filter(face => face.normal[2] > 0)
      .sort((a, b) => a.normal[2] - b.normal[2]);
    context.clearRect(0, 0, SIZE, SIZE);
    context.lineWidth = 0.65; // Seal antialiased seams between adjacent faces.
    context.lineJoin = 'round';
    for (const face of visible) {
      const lighting = Math.max(0, face.normal.reduce((sum, value, i) => sum + value * light[i], 0));
      const tone = Math.min(PALETTE.length - 1, Math.floor((0.1 + lighting * 0.5 + face.heat * 0.4) * PALETTE.length));
      context.beginPath();
      face.points.forEach((point, index) => {
        const [x, y] = rotate(point);
        const px = Math.round(SIZE / 2 + x * (SIZE / 2 - 1));
        const py = Math.round(SIZE / 2 - y * (SIZE / 2 - 1));
        if (index === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.closePath();
      context.fillStyle = context.strokeStyle = PALETTE[tone];
      context.fill();
      context.stroke();
      context.fillStyle = dither;
      context.fill();
    }
  };
}

export function initLowPolySun(intro) {
  const canvas = intro.querySelector('#lowPolySun');
  const paint = createPainter(canvas);
  if (!paint) return;
  let angle = 0.4;
  let frame = null;
  let lastPaint = null;
  let visible = true;
  let disposed = false;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  paint(angle); // Reduced motion still gets the complete, detailed sun.
  intro.classList.add('has-low-poly');

  const animate = time => {
    frame = null;
    if (disposed || !intro.isConnected || document.hidden || !visible || motion.matches) return;
    if (lastPaint === null || time - lastPaint >= FRAME_INTERVAL) {
      if (lastPaint !== null) angle += Math.min(time - lastPaint, 100) * 0.00009;
      paint(angle);
      lastPaint = time;
    }
    frame = requestAnimationFrame(animate);
  };
  const update = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastPaint = null;
    if (!disposed && intro.isConnected && visible && !document.hidden && !motion.matches) {
      frame = requestAnimationFrame(animate);
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  const onPageHide = event => { if (!event.persisted) dispose(); };
  const dispose = () => {
    disposed = true;
    update();
    observer.disconnect();
    document.removeEventListener('visibilitychange', update);
    motion.removeEventListener('change', update);
    window.removeEventListener('portfolioEntered', dispose);
    window.removeEventListener('pagehide', onPageHide);
    intro.removeEventListener('sunEnhanced', dispose);
  };
  observer.observe(intro);
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', update);
  window.addEventListener('portfolioEntered', dispose, { once: true });
  window.addEventListener('pagehide', onPageHide);
  // Retain the last painted frame for the opacity crossfade, then release work.
  intro.addEventListener('sunEnhanced', dispose, { once: true });
  update();
  return dispose;
}
