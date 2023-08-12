import { randomNumBetween } from "../utils.js";

export default class Particle {
  constructor() {
    this.rAlpha = randomNumBetween(0, 80);
    this.r = window.innerHeight / 4;
    this.rFriction = randomNumBetween(0.85, 1.02);

    this.angleAlpha = randomNumBetween(10, 150);
    this.angle = randomNumBetween(0, 360);
    this.angleFriction = randomNumBetween(0.98, 1.02);

    this.opacity = randomNumBetween(0.5, 1);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  update(delta) {
    this.rAlpha *= this.rFriction;
    this.r += this.rAlpha * delta;

    this.angleAlpha *= this.angleFriction;
    this.angle += this.angleAlpha * delta;

    this.x =
      window.innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y =
      window.innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

    this.opacity -= 0.5 * delta;
  }
}
