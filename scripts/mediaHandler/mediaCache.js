export const assetCache = new Map();

const assets = {
    images: [
      { id: 'cRobot', url: './info_images/childhoodRobot.jpeg' },
      { id: 'cvModel', url: './info_images/cv_model.jpeg' },
      { id: 'floorGeneral', url: './info_images/floorGeneral.jpeg' },
      { id: 'kpTeam', url: './info_images/kaPaoTeam.jpeg' },
      { id: 'ppGroup', url: './info_images/poolPalGroup.jpg' },
      { id: 'ppRobot', url: './info_images/poolpallRobot.jpeg' },
      { id: 'rAssemblyChildhood', url: './info_images/robotAssemblyChildhood.jpg' },
      { id: 'poolPalApp', url: './info_images/poolPalApp.png' }, 
      { id: 'stepHandShake', url: './info_images/stepHandShake.jpg' },
      { id: 'stepProgramme', url: './info_images/stepProgramme.jpeg' },
      { id: 'salexLTD', url: './info_images/SalexLTD.jpeg' },
    ],
    videos: [
      { id: 'poolpalShot', url: './info_images/poolpal_shot.mp4' },
    ],
    pdfs: [
      { id: 'cvPDF', url: './pdfs/ohResume.pdf#view=Fit' },
    ]
  };

// Preload images
const preloadImage = (key, url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      assetCache.set(key, img);
      resolve();
    };
    img.onerror = (err) => {
      console.error(`Failed to preload image: ${url}`, err);
      reject(err);
    };
    img.src = url;
  });
};

const preloadVideo = (key, url) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.src = url;

    video.oncanplaythrough = () => {
      assetCache.set(key, video);
      resolve();
    };
    video.onerror = (err) => {
      console.error(`Failed to preload video: ${url}`, err);
      reject(err);
    };
  });
};

const preloadPDF = async (key, url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    assetCache.set(key, objectURL);
  } catch (error) {
    console.error(`Failed to preload PDF: ${url}`, error);
    throw error;
  }
};

export async function preloadAssets() {
  const loaders = [];

  for (const { id, url } of assets.images) {
    loaders.push(preloadImage(id, url));
  }
  for (const { id, url } of assets.videos) {
    loaders.push(preloadVideo(id, url));
  }
  for (const { id, url } of assets.pdfs) {
    loaders.push(preloadPDF(id, url));
  }

  const results = await Promise.allSettled(loaders);
  results.forEach((res, i) => {
    if (res.status === 'rejected') {
      console.warn(`Asset ${i} failed to load`, res.reason);
    }
  });
}