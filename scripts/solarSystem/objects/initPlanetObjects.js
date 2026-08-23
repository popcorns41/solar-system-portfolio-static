import sunTexture from "/images/sun.jpg";
import * as THREE from "three";

const loadingManager = new THREE.LoadingManager();
const loadTexture = new THREE.TextureLoader(loadingManager);

loadingManager.onLoad = () => {
  console.log("Sun assets loaded");

  window.__sunReady = true;

  window.dispatchEvent(
    new CustomEvent("sunLoaded")
  );
};

export function positionSun(sun) {
  sun.scale.set(1.7, 1.7, 1.7);
  sun.position.set(0, 45, 0);
}

export function initSun() {
  const sunSize = 697 / 40;

  const sunGeom = new THREE.SphereGeometry(
    sunSize,
    64,
    64
  );

  const sunMat = new THREE.MeshStandardMaterial({
    emissive: 0xFFF88F,
    emissiveMap: loadTexture.load(sunTexture),
    emissiveIntensity: 1,
    color: new THREE.Color(0xFFA500),
    transparent: true
  });

  const sun = new THREE.Mesh(sunGeom, sunMat);

  const pointLight = new THREE.PointLight(
    0xFDFFD3,
    1200,
    400,
    1.4
  );

  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 10;
  pointLight.shadow.camera.far = 20;

  sun.add(pointLight);

  sun.planet = sun;

  return sun;
}