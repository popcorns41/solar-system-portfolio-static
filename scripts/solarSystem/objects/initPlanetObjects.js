import sunTexture from '/images/sun.jpg';
import * as THREE from 'three';
import poolBallTexture from '/images/8ball.jpg';


const loadTexture = new THREE.TextureLoader();

export function positionSun(sun){
    sun.scale.set(1.7, 1.7, 1.7);
    //initial y: -50
    //target y: 40
    sun.position.y=45;
    sun.position.z=0;
    sun.position.x=0;
}

export function initSun(){

    const sunSize = 697/40; // 40 is the scale factor to make it fit in the scene, 697 is the real diameter of the sun in km
    let sunMat;
    const sunGeom = new THREE.SphereGeometry(sunSize, 64, 64);
    
    sunMat = new THREE.MeshStandardMaterial({
    emissive: 0xFFF88F,
    emissiveMap: loadTexture.load(sunTexture),
    emissiveIntensity: 1,
    color: new THREE.Color(0xFFA500)
    });

    sunMat.transparent = true;

    const sun = new THREE.Mesh(sunGeom, sunMat);

    window.dispatchEvent(new CustomEvent("sunLoaded"));

    //point light in the sun
    const pointLight = new THREE.PointLight(0xFDFFD3 , 1200, 400, 1.4);
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 10;
    pointLight.shadow.camera.far = 20;
    sun.add(pointLight);

    sun.planet = sun;
    window.dispatchEvent(new CustomEvent("sunLoaded"));
    return sun;
}
