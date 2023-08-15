import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

import GUI from "lil-gui";

window.addEventListener("load", () => {
  init();
});

async function init() {
  const gui = new GUI();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.shadowMap.enabled = true;

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.set(0, 1, 7);

  /** Controls */
  const controls = new OrbitControls(camera, renderer.domElement);

  /** Font */
  const fontLoader = new FontLoader();

  const font = await fontLoader.loadAsync(
    "./assets/fonts/Shadows Into Light_Regular.json"
  );

  // fontLoader.load("./assets/fonts/Kalam_Regular.json", (font) => {
  //   /** Text */
  //   const textGeometry = new TextGeometry("HELLO", {
  //     font: font,
  //     size: 0.5,
  //     height: 0.1,
  //   });
  //   const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

  //   const text = new THREE.Mesh(textGeometry, textMaterial);

  //   scene.add(text);
  // });

  /** Text */
  const textGeometry = new TextGeometry("3D Text & Light map", {
    font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });

  const textMaterial = new THREE.MeshPhongMaterial({
    // emissive: "white",
    // emissiveIntensity: 0.3,
  });

  const text = new THREE.Mesh(textGeometry, textMaterial);

  text.castShadow = true;

  textGeometry.center();

  scene.add(text);

  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / 2,
  //   -(textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) / 2,
  //   -(textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) / 2
  // );

  /** Texture */
  const textureLoader = new THREE.TextureLoader().setPath("./assets/textures/");

  const textTexture = textureLoader.load("holographic.jpeg");

  textMaterial.map = textTexture;

  /** Plane */
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);

  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.position.z = -5;

  plane.receiveShadow = true;

  scene.add(plane);

  /** AmbientLight */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

  scene.add(ambientLight);

  /** SpotLight */
  const spotLight = new THREE.SpotLight(
    "white",
    30,
    30,
    Math.PI * 0.15,
    0.1,
    0.5
  );

  spotLight.position.set(0, 0, 3);
  spotLight.target.position.set(0, 0, -3);

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.radius = 10;

  const spotLightTexture = textureLoader.load("gradient.jpg");

  spotLightTexture.colorSpace = THREE.SRGBColorSpace;

  spotLight.map = spotLightTexture;

  scene.add(spotLight, spotLight.target);

  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * -10;

    spotLight.target.position.set(x, y, -2);
  });

  const spotLightFolder = gui.addFolder("SpotLight");

  spotLightFolder
    .add(spotLight, "angle")
    .min(0)
    .max(Math.PI / 2)
    .step(0.01);

  spotLightFolder
    .add(spotLight.position, "z")
    .min(1)
    .max(10)
    .step(0.01)
    .name("position.z");

  spotLightFolder.add(spotLight, "distance").min(1).max(30).step(0.01);

  spotLightFolder.add(spotLight, "decay").min(0).max(10).step(0.01);

  spotLightFolder.add(spotLight, "penumbra").min(0).max(1).step(0.01);

  spotLightFolder
    .add(spotLight.shadow, "radius")
    .min(1)
    .max(20)
    .step(0.01)
    .name("shadow.radius");

  /** PointLight */
  // const pointLight = new THREE.PointLight(0xffffff, 10);
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  // pointLight.position.set(3, 0, 2);

  // scene.add(pointLight);
  // scene.add(pointLight, pointLightHelper);

  // gui.add(pointLight.position, "x", -2, 3, 0.1);
  // gui.add(pointLight, "intensity", 0, 10, 1);

  /** PostProcessing - Bloom */
  const composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);

  composer.addPass(renderPass);

  const unrealBloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1,
    0.5,
    0
  );

  composer.addPass(unrealBloomPass);

  const unrealBloomPassFolder = gui.addFolder("UnrealBloomPass");

  unrealBloomPassFolder
    .add(unrealBloomPass, "strength")
    .min(0)
    .max(3)
    .step(0.01);

  unrealBloomPassFolder.add(unrealBloomPass, "radius").min(0).max(1).step(0.01);

  unrealBloomPassFolder
    .add(unrealBloomPass, "threshold")
    .min(0)
    .max(1)
    .step(0.01);

  /** PostProcessing - Glitch*/
  // const glitchPass = new GlitchPass();
  // console.log(glitchPass);
  // composer.addPass(glitchPass);

  // const glitchFolder = gui.addFolder("Glitch");
  // glitchFolder.add(glitchPass, "curF", 0, 100, 1);

  // const filmPass = new FilmPass();
  // composer.addPass(filmPass);
  // const outputPass = new OutputPass();
  // composer.addPass(outputPass);

  function animate() {
    composer.render();

    requestAnimationFrame(animate);
  }

  animate();

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.render();
  }

  window.addEventListener("resize", handleResize);
}
