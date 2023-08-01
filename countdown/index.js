import Particle from "./classes/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let particles = [];

function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

function createRing() {
  let particleNum = 2000;

  for (let i = 0; i < particleNum; i++) {
    particles.push(new Particle());
  }
}

function render() {
  let previousTime = performance.now();
  let delta;

  const frame = (currentTime) => {
    requestAnimationFrame(frame);
    delta = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // particles = particles.filter((particle) => {
    //   particle.update(delta);
    //   particle.draw(ctx);

    //   // return true to keep the particle, false to remove it
    //   return particle.opacity >= 0;
    // });

    for (let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i];
      particle.update(delta);
      particle.draw(ctx);

      if (particle.opacity < 0) {
        particles.splice(i, 1);
      }
    }
  };

  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => {
  init();
});

let isAnimating = false;

window.addEventListener("click", () => {
  if (isAnimating) return;

  isAnimating = true;

  const countdownOption = {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: "Power4.easeOut",
  };

  const instruction = document.querySelector(".instruction");
  const count = document.querySelectorAll("span");

  gsap.to(instruction, { opacity: 0, duration: 0.2 });
  gsap.fromTo(count[0], { opacity: 0, scale: 5 }, countdownOption);
  gsap.fromTo(
    count[1],
    { opacity: 0, scale: 5 },
    {
      ...countdownOption,
      delay: 1,
      onStart: () => (count[0].style.opacity = 0),
    }
  );
  gsap.fromTo(
    count[2],
    { opacity: 0, scale: 5 },
    {
      ...countdownOption,
      delay: 2,
      onStart: () => (count[1].style.opacity = 0),
    }
  );

  const ringImg = document.querySelector(".background");
  gsap.fromTo(
    ringImg,
    { opacity: 1 },
    {
      opacity: 0,
      duration: 1,
      delay: 3,
      onStart: () => {
        count[2].style.opacity = 0;
        createRing();
      },
      onComplete: () => {
        gsap.to(instruction, { opacity: 1, duration: 0.2 });
        gsap.to(ringImg, { opacity: 1, duration: 0.5 });
        isAnimating = false;
      },
    }
  );
});
