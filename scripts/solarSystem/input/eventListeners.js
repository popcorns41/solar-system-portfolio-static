import {handleResize} from '/scripts/solarSystem/input/eventHandler.js';

export function initEventListeners({canvas, renderer, camera, fxaaPass,composer}){
    window.addEventListener('orientationchange',  handleResize({canvas,renderer,camera,fxaaPass,composer}));

    const observer = new ResizeObserver(() => {
        console.log('Element resized!');
        // Your resize logic (camera.aspect, renderer.setSize, etc.)
        handleResize({canvas,renderer,camera,fxaaPass,composer});
    });

    observer.observe(document.getElementById('threeCanvas'));
}