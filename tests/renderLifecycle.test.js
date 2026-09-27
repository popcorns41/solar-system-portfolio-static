import test from 'node:test';
import assert from 'node:assert/strict';
import { renderLoop } from '../scripts/solarSystem/animation/animate.js';
import { handleResize } from '../scripts/solarSystem/input/eventHandler.js';

test('rendering pauses offscreen, in hidden tabs and for reduced motion, then disposes', () => {
  const originals = Object.fromEntries(['window', 'document', 'IntersectionObserver', 'requestAnimationFrame', 'cancelAnimationFrame'].map(key => [key, globalThis[key]]));
  const callbacks = new Map();
  let nextId = 0;
  let intersection;
  let disconnected = false;
  const motion = Object.assign(new EventTarget(), { matches: false });
  globalThis.window = { matchMedia: () => motion };
  globalThis.document = Object.assign(new EventTarget(), { hidden: false });
  globalThis.requestAnimationFrame = callback => { const id = ++nextId; callbacks.set(id, callback); return id; };
  globalThis.cancelAnimationFrame = id => callbacks.delete(id);
  globalThis.IntersectionObserver = class {
    constructor(callback) { intersection = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  let renders = 0;
  let rotation = 0;
  const intro = { isConnected: true };
  const tick = time => {
    const [id, callback] = callbacks.entries().next().value;
    callbacks.delete(id);
    callback(time);
  };
  try {
    const stop = renderLoop({
      sun: { rotateY: value => { rotation += value; } },
      scene: {}, camera: {}, controls: { update() {} },
      renderer: { render() { renders++; } }, intro,
    });
    assert.equal(callbacks.size, 1);
    tick(0); tick(1000 / 60);
    assert.equal(renders, 2);
    assert.ok(Math.abs(rotation - 0.0015) < 1e-8);
    intersection([{ isIntersecting: false }]);
    assert.equal(callbacks.size, 0);
    intersection([{ isIntersecting: true }]);
    assert.equal(callbacks.size, 1);
    document.hidden = true;
    document.dispatchEvent(new Event('visibilitychange'));
    assert.equal(callbacks.size, 0);
    document.hidden = false;
    document.dispatchEvent(new Event('visibilitychange'));
    assert.equal(callbacks.size, 1);
    motion.matches = true;
    motion.dispatchEvent(new Event('change'));
    assert.equal(callbacks.size, 0);
    motion.matches = false;
    motion.dispatchEvent(new Event('change'));
    tick(100000); // Resuming must not jump forward after a long pause.
    assert.ok(Math.abs(rotation - 0.0015) < 1e-8);
    stop();
    assert.equal(callbacks.size, 0);
    assert.equal(disconnected, true);
    document.dispatchEvent(new Event('visibilitychange'));
    motion.dispatchEvent(new Event('change'));
    assert.equal(callbacks.size, 0);
  } finally {
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  }
});

test('resize uses container dimensions and caps high-density GPU buffers', () => {
  const originalWindow = globalThis.window;
  globalThis.window = { devicePixelRatio: 3 };
  const calls = [];
  const camera = { updateProjectionMatrix: () => calls.push('projection') };
  try {
    handleResize({
      canvas: { parentElement: { getBoundingClientRect: () => ({ width: 844, height: 390 }) } },
      camera,
      renderer: { setPixelRatio: ratio => calls.push(ratio), setSize: (...args) => calls.push(args) },
    });
    assert.equal(camera.aspect, 844 / 390);
    assert.deepEqual(calls, ['projection', 1.5, [844, 390, false]]);
    handleResize({ canvas: { parentElement: { getBoundingClientRect: () => ({ width: 0, height: 0 }) } } });
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
