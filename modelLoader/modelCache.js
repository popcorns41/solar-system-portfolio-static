export const modelCache = new Map();

export function cacheModel(name, gltf) {
  modelCache.set(name, gltf);
}

export function getCachedModel(name) {
  return modelCache.get(name)?.scene.clone(); // clone to avoid mutations
}

export function isModelCached(name) {
  return modelCache.has(name);
}
