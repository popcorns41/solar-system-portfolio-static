import sunTexture from '/images/sun.jpg';
import * as THREE from 'three';
import {getCachedModel} from '@model/modelCache.js';
import poolBallTexture from '/images/8ball.jpg';


const loadTexture = new THREE.TextureLoader();

export function bootupPlanetConditions(planets){
    planets.forEach((planet) => {
        planet.planet3d.visible = false; // Initially hide them all
    });
}

export function rePositionSun(sun){
    sun.scale.set(1.7, 1.7, 1.7);
    //initial y: -50
    //target y: 40
    sun.position.y=-50;
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


export async function initPlanetObjects() {
  //orginal distances
  // const mercury = await createglbPlanet("mercury",40,0.20);
  //   mercury.planet.rotation.x = -90 * Math.PI / 180;
  //   const venus = await createglbPlanet("venus",65,6.1);
  //   const earth = new createPlanet('Earth', 6.4, 90, 0, poolBallTexture);
  //   const mars = await createglbPlanet("mars",115,4);
  //   const jupiter = await createglbPlanet("jupiter",170,15);
  //   const saturn = await createglbPlanet("saturn",240,1);

    const mercury = await createglbPlanet("mercury",40,0.25);
    mercury.planet.rotation.x = -90 * Math.PI / 180;
    const venus = await createglbPlanet("venus",65,6.8);
    const earth = new createPlanet('Earth', 9, 90, 0, poolBallTexture);
    const mars = await createglbPlanet("mars",125,6.5);
    const jupiter = await createglbPlanet("jupiter",160,15);
    const saturn = await createglbPlanet("saturn",210,1);

    earth.planet.castShadow = true;
    earth.planet.receiveShadow = true;

    mercury.planet.castShadow = true;
    mercury.planet.receiveShadow = true;
    venus.planet.castShadow = true;
    venus.planet.receiveShadow = true;
    mars.planet.castShadow = true;
    mars.planet.receiveShadow = true;
    jupiter.planet.castShadow = true;
    jupiter.planet.receiveShadow = true;

    saturn.planet.castShadow = true;
    saturn.planet.receiveShadow = true;

    const planets = [
      {
        name: 'mercury',
        planet: mercury.planet,
        planet3d: mercury.planet3d,
        meshes: mercury.meshes,
        rotationSpeed: 0.005,
        orbitSpeed: 0.002,
        orbit: mercury.orbit,
        label: "Experience",
        rotateSelf: (mesh, speed, accel) => mesh.rotateZ(speed * accel),
      },
      {
        name: 'venus',
        planet: venus.planet,
        planet3d: venus.planet3d,
        meshes: venus.meshes,
        rotationSpeed: 0.005,
        orbitSpeed: 0.0006,
        orbit: venus.orbit,
        label: "Skill sets/Resume",
        rotateSelf: (mesh, speed, accel) => mesh.rotateY(speed * accel),
      },
      {
        name: 'earth',
        planet: earth.planet,
        planet3d: earth.planet3d,
        meshes: earth.meshes,
        rotationSpeed: 0.005,
        orbitSpeed: 0.001,
        orbit: earth.orbit,
        label: "Robotics",
        rotateSelf: (mesh, speed, accel) => mesh.rotateY(speed * accel),
      },
      {
        name: 'mars',
        planet: mars.planet,
        planet3d: mars.planet3d,
        meshes: mars.meshes,
        rotationSpeed: 0.008,
        orbitSpeed: 0.0012,
        orbit: mars.orbit,
        label: "Extracurricular",
        rotateSelf: (mesh, speed, accel) => mesh.rotateY(speed * accel),
      },
      {
        name: 'jupiter',
        planet: jupiter.planet,
        planet3d: jupiter.planet3d,
        meshes: jupiter.meshes,
        rotationSpeed: 0.005,
        orbitSpeed: 0.0006,
        orbit: jupiter.orbit,
        label: "Childhood",
        rotateSelf: (mesh, speed, accel) => mesh.rotateY(speed * accel),
      },
      {
        name: 'saturn',
        planet: saturn.planet,
        planet3d: saturn.planet3d,
        meshes: saturn.meshes,
        rotationSpeed: 0.01,
        orbitSpeed: 0.0002,
        orbit: saturn.orbit,
        label: "About me",
        rotateSelf: (mesh, speed, accel) => mesh.rotateY(speed * accel),
      }
    ];

    preparePlanetTransparency(planets);

    for (const p of planets){
      p.planet3d.rotateY(-0.5);
    }

    return planets;
}

//helper function to create a planet with GLB model

function createPlanet(planetName, size, position, tilt, texture){

    let material;
    if (texture instanceof THREE.Material){
      material = texture;
    }else {
      material = new THREE.MeshPhongMaterial({
      map: loadTexture.load(texture)
      });
    } 

    const name = planetName;
    const geometry = new THREE.SphereGeometry(size, 32, 20);
    const planet = new THREE.Mesh(geometry, material);
    const planet3d = new THREE.Object3D;
    const planetSystem = new THREE.Group();
    planetSystem.add(planet);
    planet.position.x = position;
    planet.rotation.z = tilt * Math.PI / 180;

    // add orbit path
    const orbitPath = new THREE.EllipseCurve(
      0, 0,            // ax, aY
      position, position, // xRadius, yRadius
      0, 2 * Math.PI,   // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
  );

    const pathPoints = orbitPath.getPoints(100);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });
    const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    planet.orbit = orbit;
    planetSystem.add(orbit);

    //add planet system to planet3d object and to the scene
    planet3d.add(planetSystem);
    const meshes = [planet];
    return {name,planet,planet3d, orbit,meshes};
  }

async function createglbPlanet(name,position,scale){
  
      const planet = await getCachedModel(name);
      planet.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: child.material.map,
            color: child.material.color,
          });
          child.geometry.computeVertexNormals();
        }
      });
  
      const planet3d = new THREE.Object3D;
      const planetSystem = new THREE.Group();
      planetSystem.add(planet);
  
      planet.position.x = position;
      planet.scale.set(scale,scale,scale);
  
      const orbitPath = new THREE.EllipseCurve(
        0, 0,            // ax, aY
        position, position, // xRadius, yRadius
        0, 2 * Math.PI,   // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
      );
  
      const pathPoints = orbitPath.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });
      const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      planet.orbit = orbit;
  
      planetSystem.add(orbit);
  
      planet3d.add(planetSystem);
  
  
      let meshes = [];
      planet.traverse(child => {
        if (child.isMesh) {
          meshes.push(child);
        } 
      });
  
  
      return {name,planet,planet3d,orbit,meshes};
    }


function preparePlanetTransparency(planets){
  for (let i= 0;i<planets.length;i++){
    const planetGroup = planets[i].planet3d;
    planetGroup.traverse(child => {
    if (child.isMesh || child.isLine) {
        child.material.transparent = true;}
      });
  }
}

