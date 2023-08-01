import CanvasOption from "./CanvasOption.js";

export default class Tail extends CanvasOption {
  constructor(x, y, vy, color) {
    super();
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.color = color;
    this.friction = 0.98;
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
