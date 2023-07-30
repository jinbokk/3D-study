export default class Tail {
  constructor(x, y, vy, color) {
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.friction = 0.98;
    this.color = color;
    this.opacity = 0;
    this.amplitude = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  update(deltaTime) {
    this.vy *= this.friction;
    this.y -= this.vy * deltaTime;

    this.amplitude += 1;
    this.x += Math.cos(this.amplitude) * 3 * this.vy;

    this.opacity = this.vy * 4;
  }
}
