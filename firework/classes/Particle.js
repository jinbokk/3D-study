import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "../utils.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, color) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = randomNumBetween(0.8, 1);
    this.gravity = 0.02;
    this.friction = 0.93;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
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
