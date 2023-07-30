import {randomNumBetween} from "../utils.js";

export class Particle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.speed = 0.1;
    this.vx = vx;
    this.vy = vy;
    this.opacity = randomNumBetween(0.6, 1);
    this.gravity = 0.08;
    this.friction = 0.93;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  update(deltaTime) {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.speed * this.vx * deltaTime;
    this.y += this.speed * this.vy * deltaTime;
    this.opacity -= 0.002 * deltaTime;
  }
}
