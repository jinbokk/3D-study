import * as THREE from "three";
import Card from "./Card";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import { gsap } from "gsap";

window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  /** Renderer */
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
  camera.position.z = 25;

  /** Controls */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;
  controls.rotateSpeed = 0.8;
  controls.enableDamping = true;
  controls.dampingFactor = 0.3;
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI / 2 - Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3;

  /** Ambient Light */
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
  ambientLight.position.set(-5, -5, -5);
  scene.add(ambientLight);

  /** Directional Light */
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
  const directionalLight2 = directionalLight1.clone();

  directionalLight1.position.set(1, 1, 3);
  directionalLight2.position.set(-1, 1, -3);

  scene.add(directionalLight1, directionalLight2);

  /** Card */
  const card = new Card({
    width: 9,
    height: 14.8,
    radius: 0.5,
    color: "darkgray",
  });

  card.mesh.rotation.z = Math.PI * 0.1;

  scene.add(card.mesh);
  scene.add(card.wireframe);

  gsap.to(card.mesh.rotation, {
    y: -Math.PI * 2,
    duration: 3,
    ease: "back.out(2)",
  });

  /** Card Color */
  const colors = ["red", "green", "yellow", "blue"];
  const container = document.querySelector(".container");

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.addEventListener("click", () => {
      gsap.to(card.mesh.material.color, {
        r: new THREE.Color(color).r,
        g: new THREE.Color(color).g,
        b: new THREE.Color(color).b,
        duration: 1,
      });
      gsap.to(card.mesh.rotation, {
        y: card.mesh.rotation.y - Math.PI * 2,
        duration: 1.5,
        ease: "back.out(2)",
      });
    });

    container.appendChild(button);
  });

  /** Render function */
  function render() {
    renderer.render(scene, camera);

    controls.update();
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

  /** GUI */
  const gui = new GUI();

  const cardFolder = gui.addFolder("Card");
  cardFolder
    .add(card.mesh.material, "roughness", 0, 1, 0.01)
    .name("material.roughness");
  cardFolder
    .add(card.mesh.material, "metalness", 0, 1, 0.01)
    .name("material.metalness");

  const wireframeFolder = gui.addFolder("Wireframe");
  wireframeFolder.add(card.wireframe, "visible");
}
