import CanvasOption from "./CanvasOption.js";
import { randomNumBetween, hypotenuse } from "../../CountDown/utils.js";
import Particle from "./Particle.js";
import Tail from "./Tail.js";
import Spark from "./Spark.js";

export default class Canvas extends CanvasOption {
  constructor() {
    super();
    this.tails = [];
    this.particles = [];
    this.sparks = [];
  }

  createParticles(x, y, color) {
    const particleNum = 500;
    for (let i = 0; i < particleNum; i++) {
      const r =
        randomNumBetween(1, 9) *
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
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;

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

      // this.ctx.fillStyle = this.bgColor;

      // an afterimage(Image burn-in) remains
      this.ctx.fillStyle = this.bgColor + 30;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // tree grow effect idea...?
      this.ctx.fillStyle = `rgba(255, 255, 255, ${
        this.particles.length / 80000
      })`;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      if (Math.random() < 0.03) this.createTails();

      this.tails.forEach((tail, index) => {
        tail.draw();
        tail.update(deltaTime);

        for (let i = 0; i < 5; i++) {
          const vx = randomNumBetween(-0.08, 0.08);
          const vy = randomNumBetween(-0.08, 0.08);
          const opacity = 0.8;
          this.sparks.push(
            new Spark(tail.x, tail.y, vx, vy, opacity, tail.color)
          );
        }

        if (tail.vy < 0.08) {
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.color);
        }
      });

      this.particles.forEach((particle, index) => {
        particle.draw();
        particle.update(deltaTime);

        if (Math.random() < 0.1) {
          this.sparks.push(
            new Spark(particle.x, particle.y, 0, 0, 0.25, "255, 255, 0")
          );
        }

        if (particle.opacity < 0) this.particles.splice(index, 1);
      });

      this.sparks.forEach((spark, index) => {
        spark.draw();
        spark.update(deltaTime);

        if (spark.opacity < 0) {
          this.sparks.splice(index, 1);
        }
      });
    };

    requestAnimationFrame(frame);
  }
}
