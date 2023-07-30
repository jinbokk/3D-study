import { Particle } from "./Particle.js";
import { randomNumBetween, hypotenuse } from "../utils.js";

export class CanvasOption {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio;
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.bgColor = "#000000";
  }
}

export class Canvas extends CanvasOption {
  constructor() {
    super();
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    const particleNum = 400;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);
    for (let i = 0; i < particleNum; i++) {
      const r =
        randomNumBetween(1, 10) *
        hypotenuse(window.innerWidth, window.innerHeight) *
        0.001;
      const degree = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(degree);
      const vy = r * Math.sin(degree);
      this.particles.push(new Particle(x, y, vx, vy));
    }
  }

  init() {
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";
  }

  render() {
    let deltaTime;
    let previousTime = performance.now();

    const frame = (currentTime) => {
      requestAnimationFrame(frame);
      deltaTime = currentTime - previousTime;
      previousTime = currentTime;

      // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.ctx.fillStyle = this.bgColor + "50";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.particles.forEach((particle, index) => {
        particle.draw(this.ctx);
        particle.update(deltaTime);

        if (particle.opacity < 0) this.particles.splice(index, 1);
      });
    };

    requestAnimationFrame(frame);
  }
}
