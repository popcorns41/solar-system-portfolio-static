import { modelPaths } from './modelPaths.js';
import { loadGLBModel } from './GLBLoader.js';
import { cacheModel } from './modelCache.js';

export async function preloadAllModels(onProgress = () => {}) {
  const names = Object.keys(modelPaths);
  let loaded = 0;

  for (const name of names) {
    const path = modelPaths[name];
    const gltf = await loadGLBModel(path);
    cacheModel(name, gltf);
    loaded++;
    onProgress(loaded / names.length);
  }
}