import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "../utils.js";

export default class Tail extends CanvasOption {
  constructor(color) {
    super();
    this.x = randomNumBetween(this.canvasWidth * 0.1, this.canvasWidth * 0.85);
    this.y = this.canvasHeight;
    this.vy = randomNumBetween(0.4, 0.9);
    this.friction = 0.98;
    this.color = color;
    this.opacity = 0;
    this.amplitude = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update(deltaTime) {
    this.vy *= this.friction;
    this.y -= this.vy * deltaTime;

    this.amplitude += 1;
    this.x += Math.cos(this.amplitude) * 3 * this.vy;

    this.opacity = this.vy * 4;
  }
}
