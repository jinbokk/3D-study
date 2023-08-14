import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(2, 2, 4);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  // controls.autoRotateSpeed = 100;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.maxDistance = 10;
  controls.minDistance = 2;

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const cubeGeometry = new THREE.IcosahedronGeometry(1);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: "red",
    emissive: 0x111111,
    // wireframe: true,
    // color: "white",
    // transparent: true,
    // opacity: 0.5,
    // wireframe: true,
    // side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  const cubeWireGeometry = new THREE.WireframeGeometry(cubeGeometry);
  const cubeWireMaterial = new THREE.LineBasicMaterial({
    color: "black",
    transparent: true,
    opacity: 0.3,
  });
  const cubeWire = new THREE.LineSegments(cubeWireGeometry, cubeWireMaterial);
  scene.add(cubeWire);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshLambertMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.4,
    color: 0xaaaaaa,
  });
  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
  scene.add(skeleton);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  // directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const clock = new THREE.Clock();

  function render() {
    const elapsedTime = clock.getElapsedTime();

    cube.rotation.x = elapsedTime;
    cube.rotation.y = elapsedTime;
    cubeWire.rotation.x = elapsedTime;
    cubeWire.rotation.y = elapsedTime;

    skeleton.rotation.x = elapsedTime * 1.5;
    skeleton.rotation.y = elapsedTime * 1.5;

    renderer.render(scene, camera);
    // cube.rotation.x = THREE.MathUtils.degToRad(45);
    // cube.rotation.x += 0.01;
    // cube.rotation.x = Date.now() / 1000;
    // cube.rotation.x = clock.getElapsedTime();
    // cube.rotation.x += clock.getDelta();
    // cube.position.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x);

    controls.update();

    requestAnimationFrame(render);
  }

  render();

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    controls.update();
  }

  window.addEventListener("resize", handleResize);

  const gui = new GUI();
  // gui.add(cube.position, "y", -3, 3, 0.1);
  const cubeFolder = gui.addFolder("Cube");
  cubeFolder.add(cube.position, "x").min(-3).max(3).step(0.1);
  cubeFolder.add(cube.position, "y").min(-3).max(3).step(0.1);
  cubeFolder.add(cube, "visible");
  cubeFolder.addColor({ color: "ff0000" }, "color").onChange((value) => {
    cube.material.color.set(value);
  });

  const skeletonFolder = gui.addFolder("Skeleton");
  skeletonFolder.add(skeleton.position, "x").min(-3).max(3).step(0.1);
  skeletonFolder.add(skeleton.position, "y").min(-3).max(3).step(0.1);
  skeletonFolder.add(skeleton, "visible");

  const sceneFolder = gui.addFolder("Scene");
  sceneFolder.add(axesHelper, "visible");
}
