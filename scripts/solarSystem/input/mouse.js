import {Raycaster,Vector2,Vector3} from 'three';
import {state,settings} from '/scripts/solarSystem/core/state.js';

export class MouseHandler {
  constructor({
    sun,
    planets,
    camera,
    controls,
    outlinePass,
    offsets,
    canvas
  }) {
    this.raycaster =  new Raycaster();
    this.sun = sun;
    this.sunMat = sun.material;
    this.planets = planets;
    this.camera = camera;
    this.controls = controls;
    this.outlinePass = outlinePass;
    this.offsets = offsets;
    this.canvas = canvas;
    this.raycastTargets = this.planets.flatMap(p => p.meshes);
    this.raycastTargets.unshift(this.sun);
    this.clientMouse = new Vector2();

    // Bind event handlers
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onClick(event) {
    event.preventDefault();
  
      state.ndcRange.x = (event.clientX / window.innerWidth) * 2 - 1;
      state.ndcRange.y = - (event.clientY / window.innerHeight) * 2 + 1;
  
      this.raycaster.setFromCamera(state.ndcRange, this.camera);
      var intersects = this.raycaster.intersectObjects(this.raycastTargets);
  
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const selectedPlanetIndex = identifyPlanet(clickedObject,this.sunMat, this.planets);
        let selectedPlanet = null;
        if (selectedPlanetIndex === 0) {
          selectedPlanet = this.sun;
        } else if (selectedPlanetIndex > 0) {
          selectedPlanet = this.planets[selectedPlanetIndex - 1];
        }
  
        if (selectedPlanet) {
          window.planetIndex = selectedPlanetIndex;
          state.offset = this.offsets[selectedPlanetIndex];
          const indexAnnouncementEvent = new CustomEvent("infoChange",
            {
              detail: {index: window.planetIndex}
            }
          )
          window.dispatchEvent(indexAnnouncementEvent);
          settings.accelerationOrbit = 0;
  
          const planetPosition = new Vector3();
  
          if (!(selectedPlanet === this.sun)) {
            const fadeSunRequiredAnnouncement = new CustomEvent("changeSunOpacity",
                {
                    detail: {opacity: 0,duration: 1000}

                }
            );
            this.canvas.dispatchEvent(fadeSunRequiredAnnouncement);
            //fadeSunOpacity(sunMat, 0, 1000);
            selectedPlanet.planet.getWorldPosition(planetPosition);
          }
  
          window.dispatchEvent(new CustomEvent("circularBorder"));
          
          state.isMovingTowardsPlanet = true;
          this.controls.target.copy(planetPosition);
          this.camera.lookAt(planetPosition);
          state.targetCameraPosition.copy(planetPosition).add(
            this.camera.position.clone().sub(planetPosition).normalize().multiplyScalar(state.offset)
          );
          // Wait for sequential hide to complete before moving camera
          const sequentialHideEvent = new CustomEvent("hideOutofViewPlanets",
                {
                    detail: {selectedPlanet: selectedPlanet,delay:300}
                }
            );
            this.canvas.dispatchEvent(sequentialHideEvent);

          setTimeout(()=>{
            window.dispatchEvent(new CustomEvent("beginPlanetTransform",
              {
                detail: {translateY: 37.5}
              }
            ));
          },1000)


          
          document.body.style.cursor = 'default';
          state.hoverEnabled = false;
          state.hasMouseMove = false;
          document.getElementById('hoverCard').style.display = 'none';
          this.outlinePass.selectedObjects = [];
        }
      }
  }

  onMouseMove(event) {
    if (!(state.hoverEnabled)) return;

    event.preventDefault();
    state.hasMouseMove = true;
    this.clientMouse.x = event.clientX;
    this.clientMouse.y = event.clientY;
    
    state.ndcRange.x = (event.clientX / window.innerWidth) * 2 - 1;
    state.ndcRange.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }


  updateCardForHoveredObject(object,card) {
    // Check sun first (not in planets array)
    if (object === this.sun) {
      card.innerText = "Contact me";
      return;
    }

    // Check planets array
    for (const planet of this.planets) {
      if (planet.meshes.includes(object)) {
        card.innerText = planet.label;
        return;
      }
    }

    console.log(object,"not found!");
    // Default fallback if nothing matches
    card.innerText = "";
    card.style.display = "none";
}

  attach() {
    this.canvas.addEventListener('click', this.onClick, false);
    this.canvas.addEventListener('mousemove', this.onMouseMove, false);
  }

  detach() {
    this.canvas.removeEventListener('click', this.onClick);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  }
}

//helper functions

     function isDescendantOf(object, potentialAncestor) {
    let current = object;
    while (current) {
      if (current === potentialAncestor) return true;
      current = current.parent;
    }
    return false;
  }

  function identifyPlanet(clickedObject, sunMat, planets) {
    if (clickedObject.material === sunMat) {
      return 0;
    }

    for (let i = 0; i < planets.length; i++) {
      if (planets[i].planet && isDescendantOf(clickedObject, planets[i].planet)) {
        return i+1;
      }
    }
    return null;
  }

