import Particle from "./classes/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1;

let canvasWidth, canvasHeight;

const particles = [];
const particlesNum = 100;

function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  ctx.scale(dpr, dpr);
}

function createConfetti({ x, y, deg, colors }) {
  x = x * innerWidth;
  y = y * innerHeight;

  for (let i = 0; i < particlesNum; i++) {
    particles.push(new Particle(x, y, deg, colors));
  }
}

let previousTime = performance.now();
let deltaTime;

function render() {
  function frame(currentTime) {
    window.requestAnimationFrame(frame);
    deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(deltaTime);
      particles[i].draw(ctx);
    }

    if (particles.opacity < 0) particles.splice(i, 0);
  }

  window.requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => {
  init();
});

window.addEventListener("click", () => {
  createConfetti({
    x: 0, // 0 ~ 1
    y: 0.5, // 0 ~ 1
    deg: -50,
    colors: ["#34ebcc", "#eb34d5", "#eb3434", "#ebd834"],
  });

  createConfetti({
    x: 1, // 0 ~ 1
    y: 0.5, // 0 ~ 1
    deg: -140,
    colors: ["#34ebcc", "#eb34d5", "#eb3434", "#ebd834"],
  });
});