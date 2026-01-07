export const settings = {
    accelerationOrbit: 0,
    acceleration: 1
  };

export const sunZoomState = {
  active: false,
  mode: null, // 'downZoom' | 'sunrise'
  progress: 0,
  duration: 2.5, // in seconds, can override per mode
  startY: 0,
  targetY: 0,
  startScale: 1,
  targetScale: 1,
  easingFn: (t) => t, // placeholder
};

