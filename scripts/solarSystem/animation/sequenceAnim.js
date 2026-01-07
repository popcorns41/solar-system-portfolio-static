import { sunZoomState } from "../core/state";

export function solarStartSunrise(sun) {
  sunZoomState.active = true;
  sunZoomState.mode = "sunrise";
  sunZoomState.progress = 0;
  sunZoomState.duration = 8;

  sunZoomState.startY = sun.position.y;
  sunZoomState.targetY = 45;

  sunZoomState.startScale = sun.scale.x;
  sunZoomState.targetScale = sun.scale.x; // no scaling in sunrise

  sunZoomState.easingFn = (t) => 1 - Math.pow(1 - t, 2); // ease-out
}

export function solarTransformDownZoomOut(sun) {
  sunZoomState.active = true;
  sunZoomState.mode = "downZoom";
  sunZoomState.progress = 0;
  sunZoomState.duration = 2.5;

  sunZoomState.startY = sun.position.y;
  sunZoomState.targetY = 0;

  sunZoomState.startScale = sun.scale.x;
  sunZoomState.targetScale = 1;

  sunZoomState.easingFn = (t) => t * t * (3 - 2 * t); // smoothstep
}

export  function fadeSunOpacity(sunMat,targetOpacity, duration = 1000) {
    if (!sunMat) return;

    sunMat.transparent = true;
    const startOpacity = sunMat.opacity;
    const startTime = performance.now();

    function fadeStep(currentTime) {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = t * t * (3 - 2 * t); // smoothstep easing

      sunMat.opacity = startOpacity + (targetOpacity - startOpacity) * easedT;

      if (t < 1) {
        requestAnimationFrame(fadeStep);
      }
    }

    requestAnimationFrame(fadeStep);
  }

export function hideAllExceptSelected(selected,sun,planets) {
  const isSunSelected = selected === sun;
  sun.material.transparent = true;
  sun.material.opacity = isSunSelected ? 1 : 0;

  planets.forEach((planetObj) => {
    const mesh = planetObj.planet;

    if (!mesh) return;

    const isSelected = planetObj === selected;

    mesh.traverse(child => {
      if ((child.isMesh || child.isLine) && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(mat => {
          mat.transparent = true;
          mat.opacity = isSelected ? 1 : 0;
        });

        child.visible = true; // Always keep children visible to prevent render bugs
      }
    });
  });
}



export function sequentialHideUnselected(selectedPlanet, planets, delay = 300,duration=1000) {
  console.log("selectedPlanet",selectedPlanet);
    for (let i = planets.length - 1; i >= 0; i--) {
      const planet3d = planets[i].planet3d;
      const planet = planets[i].planet;
      const isSelected = planet === selectedPlanet.planet;

      setTimeout(() => {
        if (isSelected) {
          if (selectedPlanet.orbit && selectedPlanet.orbit.material) {
            const orbitMaterial = selectedPlanet.orbit.material;
            orbitMaterial.transparent = true;

            const startTime = performance.now();

            function fadeOrbit(currentTime) {
              const elapsed = currentTime - startTime;
              const t = Math.min(elapsed / duration, 1);
              const easedT = t * t * (3 - 2 * t);

              orbitMaterial.opacity = 1 - easedT;

              if (t < 1) {
                requestAnimationFrame(fadeOrbit);
              } else {
                selectedPlanet.orbit.visible = false;
              }
            }

            requestAnimationFrame(fadeOrbit);
          }
        } else {
          hidePlanet(planet3d);
        }
      }, (planets.length - 1 - i) * delay); // reverse order
    }
  }

  //helper functions

function hidePlanet(planetGroup) {
return new Promise((resolve) => {
    planetGroup.traverse(child => {
    if (child.isMesh || child.isLine) {
        const duration = 200;
        const startTime = performance.now();

        function fade(currentTime) {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = 1 - (t * t * (3 - 2 * t)); // smoothstep fade-out

        child.material.opacity = easedT;

        if (t < 1) {
            requestAnimationFrame(fade);
        } else {
            child.visible = false;
            resolve(); 
        }
        }

        requestAnimationFrame(fade);
    }
    });
});
}

export function sequentialReveal(planets, delay = 1000,onComplete = () => {}) {
    planets.forEach((planet, index) => {
      setTimeout(() => {
        revealPlanet(planet.planet3d);

        // After the last planet, fire the event
        if (index === planets.length - 1) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("planetsInView"));
            onComplete();
          }, delay); // wait for the final reveal animation
        }

      }, index * delay);
    });
  }

function revealPlanet(planetGroup) {
planetGroup.visible = true;

planetGroup.traverse(child => {
    if ((child.isMesh || child.isLine) && child.material) {
    child.visible = true;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach(mat => {
        mat.transparent = true;

        // Force reset opacity in case it’s stuck
        mat.opacity = 0;

        // Reset potential side-effects
        if (mat.depthWrite === false) mat.depthWrite = true;
        if (mat.color && mat.color.a !== undefined) mat.color.a = 1.0;
    });

    const duration = 800;
    const startTime = performance.now();

    function fade(currentTime) {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * t * (3 - 2 * t); // smoothstep

        materials.forEach(mat => {
        mat.opacity = easedT;
        });

        if (t < 1) {
        requestAnimationFrame(fade);
        }
    }

    requestAnimationFrame(fade);
    }
});
}