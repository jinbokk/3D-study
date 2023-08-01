import { hexToRgb, randomNumBetween } from "../utils.js";

export default class Particle {
  constructor(x, y, deg = -50, colors) {
    this.x = x;
    this.y = y;

    this.particleWidth = 12;
    this.particleWidthDelta = randomNumBetween(0, 360);
    this.particleHeight = 12;
    this.particleHeightDelta = randomNumBetween(0, 360);

    this.angle = (Math.PI / 180) * randomNumBetween(deg - 30, deg + 30);
    this.radius = randomNumBetween(0.5, 5);

    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);

    this.friction = 0.88;
    this.gravity = 0.1;
    this.opacity = 1;

    this.particleRotation = randomNumBetween(0, 360);
    this.particleRotationDelta = randomNumBetween(-1, 1);

    this.colors = colors || ["#FF577F", "#FF884B", "#FFD384", "#FFF9B0"];
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length - 1))]
    );
  }

  draw(ctx) {
    ctx.translate(
      this.x + this.particleWidth * 1.4,
      this.y + this.particleHeight * 1.4
    );
    ctx.rotate((Math.PI / 180) * this.particleRotation);
    ctx.translate(
      -this.x - this.particleWidth * 1.4,
      -this.y - this.particleHeight * 1.4
    );

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    ctx.fillRect(
      this.x,
      this.y,
      this.particleWidth * Math.cos((Math.PI / 180) * this.particleWidthDelta),
      this.particleHeight * Math.sin((Math.PI / 180) * this.particleHeightDelta)
    );

    ctx.resetTransform();
  }

  update(deltaTime) {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;

    this.particleWidthDelta += 0.2 * deltaTime;
    this.particleHeightDelta += 0.2 * deltaTime;

    this.particleRotation += this.particleRotationDelta * deltaTime;

    this.opacity -= 0.001 * deltaTime;
  }
}
