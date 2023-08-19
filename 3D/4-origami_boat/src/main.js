import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";

window.addEventListener("load", () => {
  init();
});

const canvas = document.querySelector("#canvas");

async function init() {
  /** Params */
  const params = {
    waveColor: "#00ffff",
    wireframeColor: "gray",
    backgroundColor: "#ffffff",
    fogColor: "#f0f0f0",
  };

  /** Renderer */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  // const effect = new OutlineEffect(renderer);

  /** Scene */
  const scene = new THREE.Scene();

  /** Camera */
  const camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 50, 180);

  /** Controls */
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableRotate = false;
  // controls.enablePan = false;
  // controls.enableZoom = false;

  /** Origami Boat */
  const gltfLoader = new GLTFLoader();
  const boatGltf = await gltfLoader.loadAsync(
    "/models/origami_-_ships_and_boats/scene.gltf"
  );
  const boatMesh = boatGltf.scene.getObjectByName("Plane010");
  boatMesh.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  boatMesh.position.set(0, 0, 70);
  boatMesh.scale.set(0.5, 0.5, 0.5);
  scene.add(boatMesh);

  boatMesh.update = function () {
    const elapsedTime = clock.getElapsedTime();
    boatMesh.position.x = Math.sin(elapsedTime * 3);

    boatMesh.rotation.x = Math.sin(elapsedTime * 2) * 0.05;
    boatMesh.rotation.y =
      (Math.PI / 180) * 45 + Math.sin(elapsedTime * 2) * 0.05;
    boatMesh.rotation.z = Math.sin(elapsedTime * 2) * 0.05;
  };

  /** Wave */
  const waveGeometry = new THREE.PlaneGeometry(2000, 2000, 120, 102);
  const waveMaterial = new THREE.MeshStandardMaterial({
    // wireframe: true,
    // color: "#00ffff",
    color: params.waveColor,
  });
  const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
  waveMesh.rotateX(-Math.PI / 2);
  waveMesh.receiveShadow = true;
  scene.add(waveMesh);

  // const waveWireframeGeometry = new THREE.WireframeGeometry(waveMesh);
  // const waveWireframe = new THREE.LineSegments(waveWireframeGeometry);
  // waveWireframeGeometry.attributes.position.needsUpdate = true;
  // scene.add(waveWireframe);

  const waveWireframe = waveMesh.clone();
  waveWireframe.material = waveMesh.material.clone();
  waveWireframe.material.wireframe = true;
  waveWireframe.material.transparent = true;
  waveWireframe.material.color = new THREE.Color(params.wireframeColor);
  waveWireframe.material.opacity = 0.1;
  scene.add(waveWireframe);

  /** Wave Height */
  const initialWaveHeight = [];
  const waveHeight = 3.5;
  for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
    const z =
      waveGeometry.attributes.position.getZ(i) +
      (Math.random() - 0.5) * waveHeight;
    waveGeometry.attributes.position.setZ(i, z);
    initialWaveHeight.push(z);
  }

  waveMesh.update = function () {
    const elapsedTime = clock.getElapsedTime();
    for (let i = 0; i < initialWaveHeight.length; i++) {
      const z =
        initialWaveHeight[i] * Math.sin(elapsedTime * 2 + i ** 2) * waveHeight;
      waveGeometry.attributes.position.setZ(i, z);
    }
    waveGeometry.attributes.position.needsUpdate = true;
  };

  /** Fog */
  scene.fog = new THREE.FogExp2(params.fogColor, 0.005);
  // scene.fog = new THREE.Fog(0xffffff, 0, 300);

  /** Ambient Light */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  /** Point Light */
  const pointLight = new THREE.PointLight(0xffffff, 10000);
  pointLight.position.set(-15, 60, 150);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.radius = 5;
  scene.add(pointLight);
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 5, "#ff0000");
  // scene.add(pointLightHelper);

  /** Directional Light */
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 5;
  scene.add(directionalLight);

  /** Render function */
  const clock = new THREE.Clock();

  function render() {
    renderer.render(scene, camera);
    waveMesh.update();
    boatMesh.update();
    // camera.lookAt(0, 0, 70);

    requestAnimationFrame(render);
  }
  render();

  /** Resize function */
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);

  /** ScrollTrigger */
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  tl.to(params, {
    waveColor: "#4268ff",
    wireframeColor: "white",
    onUpdate: () => {
      waveMaterial.color = new THREE.Color(params.waveColor);
      waveWireframe.material.color = new THREE.Color(params.wireframeColor);
    },
    duration: 1.5,
  })
    .to(
      params,
      {
        backgroundColor: "#2a2a2a",
        onUpdate: () => {
          scene.background = new THREE.Color(params.backgroundColor);
        },
        duration: 1.5,
      },
      "<"
    )
    .to(
      params,
      {
        fogColor: "#2a2a2a",
        onUpdate: () => {
          scene.fog.color = new THREE.Color(params.fogColor);
        },
        duration: 1.5,
      },
      "<"
    );
  // .to(camera.position, {
  //   x: 100,
  //   z: 150,
  //   duration: 2.5,
  // })
  // .to(boatMesh.position, {
  //   z: 150,
  //   duration: 2,
  // })
  // .to(camera.position, {
  //   x: -100,
  //   duration: 2,
  // })
  // .to(camera.position, {
  //   x: 0,
  //   y: 40,
  //   z: 170,
  //   duration: 2,
  // });

  gsap.to(".title", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".wrapper",
      scrub: true,
      pin: true,
      end: "+1000",
    },
  });
}
