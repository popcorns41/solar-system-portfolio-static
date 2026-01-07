import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export function loadGLBModel(url) {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        resolve(gltf);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the GLB model:', error, "path", url);
        reject(error);
      }
    );
  });
}