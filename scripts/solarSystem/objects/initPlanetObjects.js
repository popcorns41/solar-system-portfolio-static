import * as THREE from 'three';
import { SUN_SCENE } from '../sunLayout.js';

export function positionSun(sun) {
  sun.position.set(0, SUN_SCENE.elevation, 0);
}

export function initSun() {
  let texture;
  const ready = new Promise((resolve, reject) => {
    texture = new THREE.TextureLoader().load(
      `${import.meta.env.BASE_URL}images/sun-1024.webp`, resolve, undefined, reject,
    );
  });
  const geometry = new THREE.SphereGeometry(SUN_SCENE.radius, 48, 48);
  const material = new THREE.MeshStandardMaterial({
    emissive: 0xFFF88F,
    emissiveMap: texture,
    emissiveIntensity: 1,
    color: 0xFFA500,
  });
  return { sun: new THREE.Mesh(geometry, material), ready };
}
