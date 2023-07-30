import { randomNumBetween } from "../utils.js";

export default class Particle {
  constructor(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = randomNumBetween(0.6, 1);
    this.gravity = 0.02;
    this.friction = 0.93;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  update(deltaTime) {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.opacity -= 0.002 * deltaTime;
  }
}
