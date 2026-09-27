import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { SUN_SCENE, projectedSunBounds } from '../src/intro/sun-layout.js';

test('fallback silhouette matches the projected Three.js sphere across viewport sizes', () => {
  for (const [width, height] of [[390, 844], [1366, 768], [1920, 1080], [844, 390]]) {
    const { camera: settings, radius, elevation } = SUN_SCENE;
    const camera = new THREE.PerspectiveCamera(settings.fov, width / height, 0.1, 1000);
    camera.position.set(settings.x, settings.y, settings.z);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    const bounds = projectedSunBounds(height);
    let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
    const point = new THREE.Vector3();
    // Independently sample the actual sphere projection, not the layout formula.
    for (let latitude = 0; latitude <= 180; latitude++) {
      const phi = latitude * Math.PI / 180;
      for (let longitude = 0; longitude < 360; longitude++) {
        const theta = longitude * Math.PI / 180;
        point.set(radius * Math.sin(phi) * Math.cos(theta), elevation + radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
        point.project(camera);
        const x = (point.x + 1) * width / 2;
        const y = (1 - point.y) * height / 2;
        left = Math.min(left, x); right = Math.max(right, x);
        top = Math.min(top, y); bottom = Math.max(bottom, y);
      }
    }
    assert.ok(Math.abs(bounds.width - (right - left)) < 0.2);
    assert.ok(Math.abs(bounds.height - (bottom - top)) < 0.2);
    assert.ok(Math.abs(bounds.top - top) < 0.2);
    assert.ok(Math.abs((left + right) / 2 - width / 2) < 0.2);
  }
});
