import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import {state,settings} from '/scripts/solarSystem/core/state.js';

export function initSetup(){
    console.log("Create the scene");
    const scene = new THREE.Scene();


    const colour = new THREE.Color(0x121212);
    scene.background = colour;

    console.log("Create a perspective projection camera");
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.set(-175, 115, 5);

    const canvas = document.getElementById('threeCanvas');

    let renderer;

    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    } catch (e) {
    console.error("WebGL initialization failed:", e);
    document.body.innerHTML = `
        <div style="color:white;text-align:center;padding:2rem;">
        <h1>⚠️ WebGL Not Supported</h1>
        <div style="margin-top: 0.5rem; font-size: 1.2rem;">
            <p>Your device or browser does not support WebGL rendering.</p>
            <p>Try updating your browser,using a different device</p>
            <P>or enabling hardware acceleration on your browser.</p>
        </div>

        <div style="margin-top: 5rem; padding: 1rem;">
            <h2 style="margin-top: 2rem;">Continue to the static website?</h2>

            <button style="margin-top: 1rem;" class="button-style">
            🏗️ Under Construction
        </button>
        </div>
        
        </div>`;
    }

    console.log("Create the renderer");

    renderer.setClearColor(0x000000, 0); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // ******  SHADOWS  ******
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows

    console.log("Create an orbit control");
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.75;
    controls.screenSpacePanning = false;
    controls.maxDistance = 600;
    
    return {
        scene,
        camera,
        renderer,
        controls,
        canvas
    };
}

export function postProcessSetup(renderer,scene,camera){
    const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
        format: THREE.RGBAFormat,  
        type: THREE.UnsignedByteType,
        depthBuffer: true,
        stencilBuffer: false
    });

    const composer = new EffectComposer(renderer, renderTarget);
    composer.addPass(new RenderPass(scene, camera));
    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms['resolution'].value.set(
        1 / (window.innerWidth * pixelRatio),
        1 / (window.innerHeight * pixelRatio)
    );

    composer.addPass(fxaaPass);

    // ******  OUTLINE PASS  ******
    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.edgeStrength = 3;
    outlinePass.edgeGlow = 1;
    outlinePass.visibleEdgeColor.set(0xFFFFFF);
    outlinePass.hiddenEdgeColor.set(0x190a05);
    composer.addPass(outlinePass);

    // ******  BLOOM PASS  ******
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.0001, 0.4, 0.001);
    bloomPass.renderToScreen = true;
    bloomPass.clear = false;
    bloomPass.threshold = 1;
    bloomPass.radius = 0.9;
    composer.addPass(bloomPass);

    return {
        composer,
        outlinePass,
        fxaaPass
    };
}

export function lightingSetup(scene){
    console.log("Add the ambient light");
    var lightAmbient = new THREE.AmbientLight(0x222222, 6); 


    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.2);

    scene.add(lightAmbient);
    scene.add(hemiLight);
}


export function initPlanetsToScene(scene,sun,planets){
    scene.add(sun);
    planets.forEach((planet) => {
        scene.add(planet.planet3d); // Add to the scene
    });
    window.dispatchEvent(new CustomEvent("planetsLoaded"));
}

export function devStateSetup(){
    state.hoverEnabled = true;
    settings.accelerationOrbit = 1;
}