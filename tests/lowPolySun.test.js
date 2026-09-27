import test from 'node:test';
import assert from 'node:assert/strict';
import { initLowPolySun } from '../src/intro/low-poly-sun.js';

function withSunEnvironment(reducedMotion, run) {
  const keys = ['window', 'document', 'IntersectionObserver', 'requestAnimationFrame', 'cancelAnimationFrame'];
  const originals = Object.fromEntries(keys.map(key => [key, globalThis[key]]));
  const frames = new Map();
  const motion = Object.assign(new EventTarget(), { matches: reducedMotion });
  let nextId = 0, paints = 0, intersection, disconnected = false;
  const context = {
    clearRect() { paints++; }, beginPath() {}, moveTo() {}, lineTo() {},
    closePath() {}, fill() {}, stroke() {}, fillRect() {}, createPattern() { return {}; },
  };
  const canvas = { getContext: () => context };
  const classes = new Set();
  const intro = Object.assign(new EventTarget(), {
    isConnected: true, querySelector: () => canvas, classList: { add: name => classes.add(name) },
  });
  globalThis.window = Object.assign(new EventTarget(), { matchMedia: () => motion });
  globalThis.document = Object.assign(new EventTarget(), { hidden: false, createElement: () => ({ getContext: () => context }) });
  globalThis.IntersectionObserver = class {
    constructor(callback) { intersection = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  globalThis.requestAnimationFrame = callback => { const id = ++nextId; frames.set(id, callback); return id; };
  globalThis.cancelAnimationFrame = id => frames.delete(id);
  const tick = time => {
    const [id, callback] = frames.entries().next().value;
    frames.delete(id);
    callback(time);
  };
  try {
    run({ intro, motion, frames, classes, tick,
      visible: value => intersection([{ isIntersecting: value }]),
      paints: () => paints, disconnected: () => disconnected,
    });
  } finally {
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  }
}

test('retro sun limits painting, pauses when unused, and stops after WebGL takes over', () => {
  withSunEnvironment(false, ({ intro, motion, frames, classes, tick, visible, paints, disconnected }) => {
    initLowPolySun(intro);
    assert.ok(classes.has('has-low-poly'));
    assert.equal(paints(), 1, 'paint before scheduling animation');
    tick(0); tick(16); tick(32);
    assert.equal(paints(), 2, 'do not paint at the full display refresh rate');
    tick(50);
    assert.equal(paints(), 3);
    visible(false);
    assert.equal(frames.size, 0);
    visible(true);
    assert.equal(frames.size, 1);
    document.hidden = true;
    document.dispatchEvent(new Event('visibilitychange'));
    assert.equal(frames.size, 0);
    document.hidden = false;
    document.dispatchEvent(new Event('visibilitychange'));
    motion.matches = true;
    motion.dispatchEvent(new Event('change'));
    assert.equal(frames.size, 0);
    motion.matches = false;
    motion.dispatchEvent(new Event('change'));
    assert.equal(frames.size, 1);
    intro.dispatchEvent(new Event('sunEnhanced'));
    assert.equal(frames.size, 0);
    assert.ok(disconnected());
    document.dispatchEvent(new Event('visibilitychange'));
    motion.dispatchEvent(new Event('change'));
    assert.equal(frames.size, 0, 'a disposed fallback must never restart');
  });
});

test('reduced motion gets a static retro sun and entering the portfolio cleans up', () => {
  withSunEnvironment(true, ({ intro, frames, paints, disconnected }) => {
    initLowPolySun(intro);
    assert.equal(paints(), 1);
    assert.equal(frames.size, 0);
    window.dispatchEvent(new Event('portfolioEntered'));
    assert.ok(disconnected());
    assert.equal(frames.size, 0);
  });
});
