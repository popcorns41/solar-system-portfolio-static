import * as THREE from 'three';
import { SUN_SCENE } from '../sunLayout.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initSetup() {
  const scene = new THREE.Scene();
  const canvas = document.getElementById('threeCanvas');
  const camera = new THREE.PerspectiveCamera(SUN_SCENE.camera.fov, 1, 0.1, 1000);
  camera.position.set(SUN_SCENE.camera.x, SUN_SCENE.camera.y, SUN_SCENE.camera.z);
  // Native antialiasing is sufficient for the intro's single sphere. No full-screen
  // outline, bloom or FXAA buffers, shadow maps, or preserved drawing buffer.
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.75;
  controls.maxDistance = 600;
  scene.add(new THREE.AmbientLight(0x222222, 6));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 0.2));
  return { scene, camera, renderer, controls, canvas };
}
