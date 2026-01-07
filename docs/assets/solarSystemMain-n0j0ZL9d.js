import{ae as de,g as v,af as C,ag as D,Q as G,ah as Z,V as d,ai as pe,aj as fe,X as me,E as N,Y as ge,z as I,ak as V,al as w,am as k,an as x,ao as T,ap as j,aq as $,C as S,ar as J,x as ve,as as _e,w as W,at as be,f as xe,au as we,W as Se,av as Te,aw as ye,ax as Me,ay as Ee,az as De,aA as Ce,aB as ee,v as te,i as Pe,P as Be,aC as Le,O as ie,U as se,aD as ae,u as re,J as oe,t as Oe,aE as Re,aF as Ae}from"./modelCache-BLv4r0qo.js";const Q={type:"change"},Y={type:"start"},ne={type:"end"},A=new pe,X=new fe,ke=Math.cos(70*me.DEG2RAD),_=new v,b=2*Math.PI,f={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},U=1e-6;class ze extends de{constructor(e,t=null){super(e,t),this.state=f.NONE,this.target=new v,this.cursor=new v,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:C.ROTATE,MIDDLE:C.DOLLY,RIGHT:C.PAN},this.touches={ONE:D.ROTATE,TWO:D.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new v,this._lastQuaternion=new G,this._lastTargetPosition=new v,this._quat=new G().setFromUnitVectors(e.up,new v(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Z,this._sphericalDelta=new Z,this._scale=1,this._panOffset=new v,this._rotateStart=new d,this._rotateEnd=new d,this._rotateDelta=new d,this._panStart=new d,this._panEnd=new d,this._panDelta=new d,this._dollyStart=new d,this._dollyEnd=new d,this._dollyDelta=new d,this._dollyDirection=new v,this._mouse=new d,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Fe.bind(this),this._onPointerDown=Ue.bind(this),this._onPointerUp=je.bind(this),this._onContextMenu=Ve.bind(this),this._onMouseWheel=Ye.bind(this),this._onKeyDown=He.bind(this),this._onTouchStart=Ge.bind(this),this._onTouchMove=Ze.bind(this),this._onMouseDown=Ne.bind(this),this._onMouseMove=Ie.bind(this),this._interceptControlDown=We.bind(this),this._interceptControlUp=Qe.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Q),this.update(),this.state=f.NONE}update(e=null){const t=this.object.position;_.copy(t).sub(this.target),_.applyQuaternion(this._quat),this._spherical.setFromVector3(_),this.autoRotate&&this.state===f.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=b:i>Math.PI&&(i-=b),s<-Math.PI?s+=b:s>Math.PI&&(s-=b),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(_.setFromSpherical(this._spherical),_.applyQuaternion(this._quatInverse),t.copy(this.target).add(_),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const n=_.length();o=this._clampDistance(n*this._scale);const l=n-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const n=new v(this._mouse.x,this._mouse.y,0);n.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const h=new v(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(n),this.object.updateMatrixWorld(),o=_.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(A.origin.copy(this.object.position),A.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(A.direction))<ke?this.object.lookAt(this.target):(X.setFromNormalAndCoplanarPoint(this.object.up,this.target),A.intersectPlane(X,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>U||8*(1-this._lastQuaternion.dot(this.object.quaternion))>U||this._lastTargetPosition.distanceToSquared(this.target)>U?(this.dispatchEvent(Q),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?b/60*this.autoRotateSpeed*e:b/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){_.setFromMatrixColumn(t,0),_.multiplyScalar(-e),this._panOffset.add(_)}_panUp(e,t){this.screenSpacePanning===!0?_.setFromMatrixColumn(t,1):(_.setFromMatrixColumn(t,0),_.crossVectors(this.object.up,_)),_.multiplyScalar(e),this._panOffset.add(_)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;_.copy(s).sub(this.target);let r=_.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,n=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/n)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(b*this._rotateDelta.x/t.clientHeight),this._rotateUp(b*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(b*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-b*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(b*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-b*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(b*this._rotateDelta.x/t.clientHeight),this._rotateUp(b*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,n=(e.pageY+t.y)*.5;this._updateZoomParameters(o,n)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new d,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Ue(a){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(a.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(a)&&(this._addPointer(a),a.pointerType==="touch"?this._onTouchStart(a):this._onMouseDown(a)))}function Fe(a){this.enabled!==!1&&(a.pointerType==="touch"?this._onTouchMove(a):this._onMouseMove(a))}function je(a){switch(this._removePointer(a),this._pointers.length){case 0:this.domElement.releasePointerCapture(a.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ne),this.state=f.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ne(a){let e;switch(a.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case C.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(a),this.state=f.DOLLY;break;case C.ROTATE:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=f.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=f.ROTATE}break;case C.PAN:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=f.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=f.PAN}break;default:this.state=f.NONE}this.state!==f.NONE&&this.dispatchEvent(Y)}function Ie(a){switch(this.state){case f.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(a);break;case f.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(a);break;case f.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(a);break}}function Ye(a){this.enabled===!1||this.enableZoom===!1||this.state!==f.NONE||(a.preventDefault(),this.dispatchEvent(Y),this._handleMouseWheel(this._customWheelEvent(a)),this.dispatchEvent(ne))}function He(a){this.enabled!==!1&&this._handleKeyDown(a)}function Ge(a){switch(this._trackPointer(a),this._pointers.length){case 1:switch(this.touches.ONE){case D.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(a),this.state=f.TOUCH_ROTATE;break;case D.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(a),this.state=f.TOUCH_PAN;break;default:this.state=f.NONE}break;case 2:switch(this.touches.TWO){case D.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(a),this.state=f.TOUCH_DOLLY_PAN;break;case D.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(a),this.state=f.TOUCH_DOLLY_ROTATE;break;default:this.state=f.NONE}break;default:this.state=f.NONE}this.state!==f.NONE&&this.dispatchEvent(Y)}function Ze(a){switch(this._trackPointer(a),this.state){case f.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(a),this.update();break;case f.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(a),this.update();break;case f.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(a),this.update();break;case f.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(a),this.update();break;default:this.state=f.NONE}}function Ve(a){this.enabled!==!1&&a.preventDefault()}function We(a){a.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Qe(a){a.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const O={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class B{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Xe=new ge(-1,1,1,-1,0,1);class Ke extends I{constructor(){super(),this.setAttribute("position",new V([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new V([0,2,0,0,2,0],2))}}const qe=new Ke;class H{constructor(e){this._mesh=new N(qe,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Xe)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class le extends B{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof w?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=k.clone(e.uniforms),this.material=new w({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new H(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class K extends B{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,n;this.inverse?(o=0,n=1):(o=1,n=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(n),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class $e extends B{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Je{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new d);this._width=i.width,this._height=i.height,t=new x(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:T}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new le(O),this.copyPass.material.blending=j,this.clock=new $}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const n=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(n.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(n.EQUAL,1,4294967295)}this.swapBuffers()}K!==void 0&&(o instanceof K?i=!0:o instanceof $e&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new d);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const et={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new S(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class P extends B{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new d(e.x,e.y):new d(256,256),this.clearColor=new S(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new x(r,o,{type:T}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const g=new x(r,o,{type:T});g.texture.name="UnrealBloomPass.h"+u,g.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(g);const m=new x(r,o,{type:T});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),o=Math.round(o/2)}const n=et;this.highPassUniforms=k.clone(n.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new w({uniforms:this.highPassUniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new d(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new v(1,1,1),new v(1,1,1),new v(1,1,1),new v(1,1,1),new v(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=k.clone(O.uniforms),this.blendMaterial=new w({uniforms:this.copyUniforms,vertexShader:O.vertexShader,fragmentShader:O.fragmentShader,blending:J,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new S,this._oldClearAlpha=1,this._basic=new ve,this._fsQuad=new H(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new d(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let n=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=n.texture,this.separableBlurMaterials[l].uniforms.direction.value=P.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=P.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),n=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new w({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new d(.5,.5)},direction:{value:new d(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new w({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}P.BlurDirectionX=new d(1,0);P.BlurDirectionY=new d(0,1);class tt extends B{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new S}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}class M extends B{constructor(e,t,i,s){super(),this.renderScene=t,this.renderCamera=i,this.selectedObjects=s!==void 0?s:[],this.visibleEdgeColor=new S(1,1,1),this.hiddenEdgeColor=new S(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.patternTexture=null,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this._selectionCache=new Set,this.resolution=e!==void 0?new d(e.x,e.y):new d(256,256);const r=Math.round(this.resolution.x/this.downSampleRatio),o=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new x(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new _e,this.depthMaterial.side=W,this.depthMaterial.depthPacking=be,this.depthMaterial.blending=j,this.prepareMaskMaterial=this._getPrepareMaskMaterial(),this.prepareMaskMaterial.side=W,this.prepareMaskMaterial.fragmentShader=u(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new x(this.resolution.x,this.resolution.y,{type:T}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new x(r,o,{type:T}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new x(r,o,{type:T}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new x(Math.round(r/2),Math.round(o/2),{type:T}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this._getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new x(r,o,{type:T}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new x(Math.round(r/2),Math.round(o/2),{type:T}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const n=4,l=4;this.separableBlurMaterial1=this._getSeparableBlurMaterial(n),this.separableBlurMaterial1.uniforms.texSize.value.set(r,o),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this._getSeparableBlurMaterial(l),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(r/2),Math.round(o/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=l,this.overlayMaterial=this._getOverlayMaterial();const h=O;this.copyUniforms=k.clone(h.uniforms),this.materialCopy=new w({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:j,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new S,this.oldClearAlpha=1,this._fsQuad=new H(null),this.tempPulseColor1=new S,this.tempPulseColor2=new S,this.textureMatrix=new xe;function u(g,m){const y=m.isPerspectiveCamera?"perspective":"orthographic";return g.replace(/DEPTH_TO_VIEW_Z/g,y+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this._fsQuad.dispose()}setSize(e,t){this.renderTargetMaskBuffer.setSize(e,t),this.renderTargetDepthBuffer.setSize(e,t);let i=Math.round(e/this.downSampleRatio),s=Math.round(t/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(i,s),this.renderTargetBlurBuffer1.setSize(i,s),this.renderTargetEdgeBuffer1.setSize(i,s),this.separableBlurMaterial1.uniforms.texSize.value.set(i,s),i=Math.round(i/2),s=Math.round(s/2),this.renderTargetBlurBuffer2.setSize(i,s),this.renderTargetEdgeBuffer2.setSize(i,s),this.separableBlurMaterial2.uniforms.texSize.value.set(i,s)}render(e,t,i,s,r){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,r&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this._updateSelectionCache(),this._changeVisibilityOfSelectedObjects(!1);const n=this.renderScene.background,l=this.renderScene.overrideMaterial;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this._updateTextureMatrix(),this._changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this._selectionCache.clear(),this.renderScene.background=n,this.renderScene.overrideMaterial=l,this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this._fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const h=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(h),this.tempPulseColor2.multiplyScalar(h)}this._fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=M.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=M.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=M.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=M.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,r&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}this.renderToScreen&&(this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=i.texture,e.setRenderTarget(null),this._fsQuad.render(e))}_updateSelectionCache(){const e=this._selectionCache;function t(i){i.isMesh&&e.add(i)}e.clear();for(let i=0;i<this.selectedObjects.length;i++)this.selectedObjects[i].traverse(t)}_changeVisibilityOfSelectedObjects(e){const t=this._visibilityCache;for(const i of this._selectionCache)e===!0?i.visible=t.get(i):(t.set(i,i.visible),i.visible=e)}_changeVisibilityOfNonSelectedObjects(e){const t=this._visibilityCache,i=this._selectionCache;function s(r){if(r.isMesh||r.isSprite){if(!i.has(r)){const o=r.visible;(e===!1||t.get(r)===!0)&&(r.visible=e),t.set(r,o)}}else(r.isPoints||r.isLine)&&(e===!0?r.visible=t.get(r):(t.set(r,r.visible),r.visible=e))}this.renderScene.traverse(s)}_updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}_getPrepareMaskMaterial(){return new w({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new d(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <batching_pars_vertex>
				#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <batching_vertex>
					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif

					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}_getEdgeDetectionMaterial(){return new w({uniforms:{maskTexture:{value:null},texSize:{value:new d(.5,.5)},visibleEdgeColor:{value:new v(1,1,1)},hiddenEdgeColor:{value:new v(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}_getSeparableBlurMaterial(e){return new w({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new d(.5,.5)},direction:{value:new d(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}_getOverlayMaterial(){return new w({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:J,depthTest:!1,depthWrite:!1,transparent:!0})}}M.BlurDirectionX=new d(1,0);M.BlurDirectionY=new d(0,1);const it={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new d(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},p={isZoomingOut:!1,isMovingTowardsPlanet:!1,targetCameraPosition:new v,hoverEnabled:!1,hasMouseMove:!1,offset:0,ndcRange:new d},E={accelerationOrbit:0,acceleration:1},c={active:!1,mode:null,progress:0,duration:2.5,startY:0,targetY:0,startScale:1,targetScale:1,easingFn:a=>a};function st(){console.log("Create the scene");const a=new we,e=new S(1184274);a.background=e,console.log("Create a perspective projection camera");var t=new Se(45,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(-175,115,5);const i=document.getElementById("threeCanvas");let s;try{s=new Te({canvas:i,antialias:!0,alpha:!0,preserveDrawingBuffer:!0})}catch(o){console.error("WebGL initialization failed:",o),document.body.innerHTML=`
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
        
        </div>`}console.log("Create the renderer"),s.setClearColor(0,0),s.setSize(window.innerWidth,window.innerHeight),s.setPixelRatio(window.devicePixelRatio),s.shadowMap.enabled=!0,s.shadowMap.type=ye,console.log("Create an orbit control");const r=new ze(t,s.domElement);return r.enableDamping=!0,r.dampingFactor=.75,r.screenSpacePanning=!1,r.maxDistance=600,{scene:a,camera:t,renderer:s,controls:r,canvas:i}}function at(a,e,t){const i=new x(window.innerWidth,window.innerHeight,{format:Ee,type:Me,depthBuffer:!0,stencilBuffer:!1}),s=new Je(a,i);s.addPass(new tt(e,t));const r=new le(it),o=a.getPixelRatio();r.material.uniforms.resolution.value.set(1/(window.innerWidth*o),1/(window.innerHeight*o)),s.addPass(r);const n=new M(new d(window.innerWidth,window.innerHeight),e,t);n.edgeStrength=3,n.edgeGlow=1,n.visibleEdgeColor.set(16777215),n.hiddenEdgeColor.set(1640965),s.addPass(n);const l=new P(new d(window.innerWidth,window.innerHeight),1e-4,.4,.001);return l.renderToScreen=!0,l.clear=!1,l.threshold=1,l.radius=.9,s.addPass(l),{composer:s,outlinePass:n,fxaaPass:r}}function rt(a){console.log("Add the ambient light");var e=new De(2236962,6);const t=new Ce(16777215,2236962,.2);a.add(e),a.add(t)}function ot(a,e,t){a.add(e),t.forEach(i=>{a.add(i.planet3d)}),window.dispatchEvent(new CustomEvent("planetsLoaded"))}function nt(){p.hoverEnabled=!0,E.accelerationOrbit=1}const lt="/solar-system-portfolio/images/sun.jpg",ht="/solar-system-portfolio/images/8ball.jpg",he=new Pe;function ut(a){a.forEach(e=>{e.planet3d.visible=!1})}function ct(a){a.scale.set(1.7,1.7,1.7),a.position.y=-50,a.position.z=0,a.position.x=0}function dt(){let e;const t=new ee(17.425,64,64);e=new te({emissive:16775311,emissiveMap:he.load(lt),emissiveIntensity:1,color:new S(16753920)}),e.transparent=!0;const i=new N(t,e);window.dispatchEvent(new CustomEvent("sunLoaded"));const s=new Be(16646099,1200,400,1.4);return s.shadow.mapSize.width=1024,s.shadow.mapSize.height=1024,s.shadow.camera.near=10,s.shadow.camera.far=20,i.add(s),i.planet=i,window.dispatchEvent(new CustomEvent("sunLoaded")),i}async function pt(){const a=await L("mercury",40,.25);a.planet.rotation.x=-90*Math.PI/180;const e=await L("venus",65,6.8),t=new ft("Earth",9,90,0,ht),i=await L("mars",125,6.5),s=await L("jupiter",160,15),r=await L("saturn",210,1);t.planet.castShadow=!0,t.planet.receiveShadow=!0,a.planet.castShadow=!0,a.planet.receiveShadow=!0,e.planet.castShadow=!0,e.planet.receiveShadow=!0,i.planet.castShadow=!0,i.planet.receiveShadow=!0,s.planet.castShadow=!0,s.planet.receiveShadow=!0,r.planet.castShadow=!0,r.planet.receiveShadow=!0;const o=[{name:"mercury",planet:a.planet,planet3d:a.planet3d,meshes:a.meshes,rotationSpeed:.005,orbitSpeed:.002,orbit:a.orbit,label:"Experience",rotateSelf:(n,l,h)=>n.rotateZ(l*h)},{name:"venus",planet:e.planet,planet3d:e.planet3d,meshes:e.meshes,rotationSpeed:.005,orbitSpeed:6e-4,orbit:e.orbit,label:"Skill sets/Resume",rotateSelf:(n,l,h)=>n.rotateY(l*h)},{name:"earth",planet:t.planet,planet3d:t.planet3d,meshes:t.meshes,rotationSpeed:.005,orbitSpeed:.001,orbit:t.orbit,label:"Robotics",rotateSelf:(n,l,h)=>n.rotateY(l*h)},{name:"mars",planet:i.planet,planet3d:i.planet3d,meshes:i.meshes,rotationSpeed:.008,orbitSpeed:.0012,orbit:i.orbit,label:"Extracurricular",rotateSelf:(n,l,h)=>n.rotateY(l*h)},{name:"jupiter",planet:s.planet,planet3d:s.planet3d,meshes:s.meshes,rotationSpeed:.005,orbitSpeed:6e-4,orbit:s.orbit,label:"Childhood",rotateSelf:(n,l,h)=>n.rotateY(l*h)},{name:"saturn",planet:r.planet,planet3d:r.planet3d,meshes:r.meshes,rotationSpeed:.01,orbitSpeed:2e-4,orbit:r.orbit,label:"About me",rotateSelf:(n,l,h)=>n.rotateY(l*h)}];mt(o);for(const n of o)n.planet3d.rotateY(-.5);return o}function ft(a,e,t,i,s){let r;s instanceof Oe?r=s:r=new Re({map:he.load(s)});const o=a,n=new ee(e,32,20),l=new N(n,r),h=new ie,u=new se;u.add(l),l.position.x=t,l.rotation.z=i*Math.PI/180;const m=new ae(0,0,t,t,0,2*Math.PI,!1,0).getPoints(100),y=new I().setFromPoints(m),z=new re({color:16777215,transparent:!0,opacity:.5}),R=new oe(y,z);return R.rotation.x=Math.PI/2,l.orbit=R,u.add(R),h.add(u),{name:o,planet:l,planet3d:h,orbit:R,meshes:[l]}}async function L(a,e,t){const i=await Le(a);i.traverse(m=>{m.isMesh&&(m.material=new te({map:m.material.map,color:m.material.color}),m.geometry.computeVertexNormals())});const s=new ie,r=new se;r.add(i),i.position.x=e,i.scale.set(t,t,t);const n=new ae(0,0,e,e,0,2*Math.PI,!1,0).getPoints(100),l=new I().setFromPoints(n),h=new re({color:16777215,transparent:!0,opacity:.5}),u=new oe(l,h);u.rotation.x=Math.PI/2,i.orbit=u,r.add(u),s.add(r);let g=[];return i.traverse(m=>{m.isMesh&&g.push(m)}),{name:a,planet:i,planet3d:s,orbit:u,meshes:g}}function mt(a){for(let e=0;e<a.length;e++)a[e].planet3d.traverse(i=>{(i.isMesh||i.isLine)&&(i.material.transparent=!0)})}class gt{constructor({sun:e,planets:t,camera:i,controls:s,outlinePass:r,offsets:o,canvas:n}){this.raycaster=new Ae,this.sun=e,this.sunMat=e.material,this.planets=t,this.camera=i,this.controls=s,this.outlinePass=r,this.offsets=o,this.canvas=n,this.raycastTargets=this.planets.flatMap(l=>l.meshes),this.raycastTargets.unshift(this.sun),this.clientMouse=new d,this.onClick=this.onClick.bind(this),this.onMouseMove=this.onMouseMove.bind(this)}onClick(e){e.preventDefault(),p.ndcRange.x=e.clientX/window.innerWidth*2-1,p.ndcRange.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(p.ndcRange,this.camera);var t=this.raycaster.intersectObjects(this.raycastTargets);if(t.length>0){const i=t[0].object,s=_t(i,this.sunMat,this.planets);let r=null;if(s===0?r=this.sun:s>0&&(r=this.planets[s-1]),r){window.planetIndex=s,p.offset=this.offsets[s];const o=new CustomEvent("infoChange",{detail:{index:window.planetIndex}});window.dispatchEvent(o),E.accelerationOrbit=0;const n=new v;if(r!==this.sun){const h=new CustomEvent("changeSunOpacity",{detail:{opacity:0,duration:1e3}});this.canvas.dispatchEvent(h),r.planet.getWorldPosition(n)}window.dispatchEvent(new CustomEvent("circularBorder")),p.isMovingTowardsPlanet=!0,this.controls.target.copy(n),this.camera.lookAt(n),p.targetCameraPosition.copy(n).add(this.camera.position.clone().sub(n).normalize().multiplyScalar(p.offset));const l=new CustomEvent("hideOutofViewPlanets",{detail:{selectedPlanet:r,delay:300}});this.canvas.dispatchEvent(l),setTimeout(()=>{window.dispatchEvent(new CustomEvent("beginPlanetTransform",{detail:{translateY:37.5}}))},1e3),document.body.style.cursor="default",p.hoverEnabled=!1,p.hasMouseMove=!1,document.getElementById("hoverCard").style.display="none",this.outlinePass.selectedObjects=[]}}}onMouseMove(e){p.hoverEnabled&&(e.preventDefault(),p.hasMouseMove=!0,this.clientMouse.x=e.clientX,this.clientMouse.y=e.clientY,p.ndcRange.x=e.clientX/window.innerWidth*2-1,p.ndcRange.y=-(e.clientY/window.innerHeight)*2+1)}updateCardForHoveredObject(e,t){if(e===this.sun){t.innerText="Contact me";return}for(const i of this.planets)if(i.meshes.includes(e)){t.innerText=i.label;return}console.log(e,"not found!"),t.innerText="",t.style.display="none"}attach(){this.canvas.addEventListener("click",this.onClick,!1),this.canvas.addEventListener("mousemove",this.onMouseMove,!1)}detach(){this.canvas.removeEventListener("click",this.onClick),this.canvas.removeEventListener("mousemove",this.onMouseMove)}}function vt(a,e){let t=a;for(;t;){if(t===e)return!0;t=t.parent}return!1}function _t(a,e,t){if(a.material===e)return 0;for(let i=0;i<t.length;i++)if(t[i].planet&&vt(a,t[i].planet))return i+1;return null}function bt(a){c.active=!0,c.mode="sunrise",c.progress=0,c.duration=8,c.startY=a.position.y,c.targetY=45,c.startScale=a.scale.x,c.targetScale=a.scale.x,c.easingFn=e=>1-Math.pow(1-e,2)}function xt(a){c.active=!0,c.mode="downZoom",c.progress=0,c.duration=2.5,c.startY=a.position.y,c.targetY=0,c.startScale=a.scale.x,c.targetScale=1,c.easingFn=e=>e*e*(3-2*e)}function wt(a,e,t=1e3){if(!a)return;a.transparent=!0;const i=a.opacity,s=performance.now();function r(o){const n=o-s,l=Math.min(n/t,1),h=l*l*(3-2*l);a.opacity=i+(e-i)*h,l<1&&requestAnimationFrame(r)}requestAnimationFrame(r)}function St(a,e,t){const i=a===e;e.material.transparent=!0,e.material.opacity=i?1:0,t.forEach(s=>{const r=s.planet;if(!r)return;const o=s===a;r.traverse(n=>{(n.isMesh||n.isLine)&&n.material&&((Array.isArray(n.material)?n.material:[n.material]).forEach(h=>{h.transparent=!0,h.opacity=o?1:0}),n.visible=!0)})})}function Tt(a,e,t=300,i=1e3){console.log("selectedPlanet",a);for(let s=e.length-1;s>=0;s--){const r=e[s].planet3d,n=e[s].planet===a.planet;setTimeout(()=>{if(n){if(a.orbit&&a.orbit.material){let u=function(g){const m=g-h,y=Math.min(m/i,1),z=y*y*(3-2*y);l.opacity=1-z,y<1?requestAnimationFrame(u):a.orbit.visible=!1};const l=a.orbit.material;l.transparent=!0;const h=performance.now();requestAnimationFrame(u)}}else yt(r)},(e.length-1-s)*t)}}function yt(a){return new Promise(e=>{a.traverse(t=>{if(t.isMesh||t.isLine){let r=function(o){const n=o-s,l=Math.min(n/200,1),h=1-l*l*(3-2*l);t.material.opacity=h,l<1?requestAnimationFrame(r):(t.visible=!1,e())};const s=performance.now();requestAnimationFrame(r)}})})}function Mt(a,e=1e3,t=()=>{}){a.forEach((i,s)=>{setTimeout(()=>{Et(i.planet3d),s===a.length-1&&setTimeout(()=>{window.dispatchEvent(new CustomEvent("planetsInView")),t()},e)},s*e)})}function Et(a){a.visible=!0,a.traverse(e=>{if((e.isMesh||e.isLine)&&e.material){let r=function(o){const n=o-s,l=Math.min(n/i,1),h=l*l*(3-2*l);t.forEach(u=>{u.opacity=h}),l<1&&requestAnimationFrame(r)};e.visible=!0;const t=Array.isArray(e.material)?e.material:[e.material];t.forEach(o=>{o.transparent=!0,o.opacity=0,o.depthWrite===!1&&(o.depthWrite=!0),o.color&&o.color.a!==void 0&&(o.color.a=1)});const i=800,s=performance.now();requestAnimationFrame(r)}})}function Dt({event:a,sun:e,planets:t,controls:i,camera:s,offsets:r,canvas:o}){const n=a.detail.index;let l;n==0?l=e:l=t[n-1],p.offset=r[n],l.planet.visible=!0,l.planet.traverse(u=>{u.visible=!0,u.material&&(u.material.transparent=!0,u.material.opacity=1)}),St(l,e,t);const h=new v;l.planet.getWorldPosition(h),i.target.copy(h),s.lookAt(h),p.targetCameraPosition.copy(h).add(s.position.clone().sub(h).normalize().multiplyScalar(p.offset)),s.position.copy(p.targetCameraPosition)}async function Ct(a,e){p.isZoomingOut=!0,console.log("zoom out received!");const t=new CustomEvent("changeSunOpacity",{detail:{opacity:1,duration:2e3}});a.dispatchEvent(t),e.accelerationOrbit=1;const i=new CustomEvent("revealPlanets",{detail:{delay:1e3}});setTimeout(()=>{window.dispatchEvent(i)},500)}function F({canvas:a,renderer:e,camera:t,fxaaPass:i,composer:s}){const r=window.devicePixelRatio||1;t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setPixelRatio(r),e.setSize(window.innerWidth,window.innerHeight,!1),a.style.width="100vw",a.style.height="100vh",s.setSize(window.innerWidth,window.innerHeight),i&&i.material.uniforms.resolution.value.set(1/(window.innerWidth*r),1/(window.innerHeight*r)),console.log("resize triggered!")}const ue=[90,40,40,43,50,65,90],q=new v(-175,115,5);function Pt({canvas:a,renderer:e,camera:t,fxaaPass:i,sun:s,planets:r,controls:o,composer:n}){window.addEventListener("beginTutorial",()=>{setTimeout(()=>{document.getElementById("tutorialCard").classList.add("show")},500)}),document.getElementById("closeTutorial").addEventListener("click",()=>{const h=document.getElementById("tutorialCard");h.style.display="none"}),a.addEventListener("changeSunOpacity",h=>wt(s.material,h.detail.opacity,h.detail.duration)),a.addEventListener("hideOutofViewPlanets",h=>Tt(h.detail.selectedPlanet,r,h.detail.delay)),window.addEventListener("zoomOutNeeded",()=>{Ct(a,E)}),window.addEventListener("beginSunrise",()=>{bt(s)}),window.addEventListener("solarTransformDownZoomOutCue",()=>{xt(s),E.accelerationOrbit=1}),window.addEventListener("revealPlanets",h=>{Mt(r,h.detail.delay,()=>{p.hoverEnabled=!0})}),window.addEventListener("resize",F({canvas:a,renderer:e,camera:t,fxaaPass:i,composer:n})),window.addEventListener("orientationchange",F({canvas:a,renderer:e,camera:t,fxaaPass:i,composer:n})),window.addEventListener("planetChange",h=>{Dt({event:h,sun:s,planets:r,controls:o,camera:t,offsets:ue,canvas:a})}),new ResizeObserver(()=>{console.log("Element resized!"),F({canvas:a,renderer:e,camera:t,fxaaPass:i,composer:n})}).observe(document.getElementById("threeCanvas"))}const Bt=new $;function ce(a,e,t,i,s,r,o){const n=Bt.getDelta();Lt(a,e,t,i,s,r,o,n),requestAnimationFrame(()=>ce(a,e,t,i,s,r,o))}const Lt=(a,e,t,i,s,r,o,n)=>{if(c.active){c.progress+=n/c.duration;const u=Math.min(c.progress,1),g=c.easingFn(u);if(a.position.y=c.startY+(c.targetY-c.startY)*g,c.mode==="downZoom"){const m=c.startScale+(c.targetScale-c.startScale)*g;a.scale.set(m,m,m)}u>=1&&(c.active=!1,c.mode==="downZoom"?window.dispatchEvent(new CustomEvent("sunZoomComplete")):c.mode==="sunrise"&&window.dispatchEvent(new CustomEvent("sunRose")),c.mode=null)}a.rotateY(.0015*E.acceleration);for(const u of e)u.rotateSelf(u.planet,u.rotationSpeed,E.acceleration),u.planet3d.rotateY(u.orbitSpeed*E.accelerationOrbit);t.raycaster.setFromCamera(p.ndcRange,s);var l=t.raycaster.intersectObjects(t.raycastTargets);const h=document.getElementById("hoverCard");if(i.selectedObjects=[],p.hasMouseMove)if(l.length>0&&p.hoverEnabled==!0){const u=l[0].object;document.body.style.cursor="pointer",i.selectedObjects=[u],t.updateCardForHoveredObject(u,h),h.style.left=`${t.clientMouse.x+10}px`,h.style.top=`${t.clientMouse.y+10}px`,h.style.display="block"}else h.innerText="",h.style.display="none",document.body.style.cursor="default";p.isMovingTowardsPlanet?(s.position.lerp(p.targetCameraPosition,.03),s.position.distanceTo(p.targetCameraPosition)<1&&(p.isMovingTowardsPlanet=!1)):p.isZoomingOut&&(s.position.lerp(q,.03),s.position.distanceTo(q)<1&&(p.isZoomingOut=!1)),r.update(),o.render()};async function At(a,e){const{scene:t,camera:i,renderer:s,controls:r,canvas:o}=st(),{composer:n,outlinePass:l,fxaaPass:h}=at(s,t,i);rt(t);const u=dt();let g;e?g=[]:g=await pt(),ot(t,u,g),a?nt():(ct(u),ut(g));const m=new gt({sun:u,planets:g,camera:i,controls:r,outlinePass:l,offsets:ue,canvas:o});m.attach(),ce(u,g,m,l,i,r,n),Pt({canvas:o,renderer:s,camera:i,fxaaPass:h,sun:u,planets:g,controls:r,composer:n})}export{At as initSolarSystem};
//# sourceMappingURL=solarSystemMain-n0j0ZL9d.js.map
