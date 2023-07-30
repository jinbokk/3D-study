import Particle from "./Particle.js";
import Tail from "./Tail.js";
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
    this.tails = [];
    this.createTails();
    this.particles = [];
    this.createParticles();
  }

  createParticles(x, y, color) {
    const particleNum = 330;
    for (let i = 0; i < particleNum; i++) {
      const r =
        randomNumBetween(1, 10) *
        hypotenuse(window.innerWidth, window.innerHeight) *
        0.0001;
      const degree = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(degree);
      const vy = r * Math.sin(degree);
      this.particles.push(new Particle(x, y, vx, vy, color));
    }
  }

  createTails() {
    const x = randomNumBetween(this.canvasWidth * 0.1, this.canvasWidth * 0.85);
    const y = this.canvasHeight;
    const vy = randomNumBetween(0.4, 0.9);
    const color = `${randomNumBetween(50, 255)}, ${randomNumBetween(
      50,
      255
    )}, ${randomNumBetween(50, 255)}`;

    this.tails.push(new Tail(x, y, vy, color));
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

      this.ctx.fillStyle = this.bgColor + "30";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      if (Math.random() < 0.03) this.createTails();

      this.tails.forEach((tail, index) => {
        tail.draw(this.ctx);
        tail.update(deltaTime);

        if (tail.vy < 0.08) {
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.color);
        }
      });

      this.particles.forEach((particle, index) => {
        particle.draw(this.ctx);
        particle.update(deltaTime);

        if (particle.opacity < 0) this.particles.splice(index, 1);
      });
    };

    requestAnimationFrame(frame);
  }
}
