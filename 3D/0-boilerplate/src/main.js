import * as THREE from "three";

window.addEventListener("load", () => {
  init();
});

function init() {
  /** Renderer */
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  /** Scene */
  const scene = new THREE.Scene();

  /** Camera */
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.z = 5;

  /** Render function */
  function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  render();

  /** Resize function */
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}
