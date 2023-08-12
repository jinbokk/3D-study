import { hexToRgb, randomNumBetween } from "../utils.js";

export default class Particle {
  constructor(x, y, deg = -50, colors, shapes, spread, mode) {
    this.x = window.innerWidth * x;
    this.y = window.innerHeight * y;

    this.particleWidth = mode === "parade" ? 12 : 7;
    this.particleWidthDelta = randomNumBetween(0, 360);
    this.particleHeight = mode === "parade" ? 12 : 7;
    this.particleHeightDelta = randomNumBetween(0, 360);

    this.angle = (Math.PI / 180) * randomNumBetween(deg - spread, deg + spread);
    this.radius = randomNumBetween(0.5, 5);

    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);

    this.friction = mode === "parade" ? 0.88 : 0.86;
    this.gravity = mode === "parade" ? 0.1 : 0.02;
    this.opacity = 1;

    this.particleRotation = randomNumBetween(0, 360);
    this.particleRotationDelta = randomNumBetween(-1, 1);

    this.colors = colors || ["#FF577F", "#FF884B", "#FFD384", "#FFF9B0"];
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length))]
    );

    this.shapes = shapes || ["square"];

    this.shape =
      this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];

    this.mode = mode;
  }

  drawSquare(ctx) {
    ctx.fillRect(
      this.x,
      this.y,
      this.particleWidth * Math.cos((Math.PI / 180) * this.particleWidthDelta),
      this.particleHeight * Math.sin((Math.PI / 180) * this.particleHeightDelta)
    );
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(
        this.particleWidth *
          Math.cos((Math.PI / 180) * this.particleWidthDelta) *
          0.8
      ),
      Math.abs(
        this.particleHeight *
          Math.sin((Math.PI / 180) * this.particleHeightDelta) *
          0.8
      ),
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
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

    switch (this.shape) {
      case "square":
        this.drawSquare(ctx);
        break;
      case "circle":
        this.drawCircle(ctx);
        break;
    }

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

    if (
      this.x < 0 ||
      this.x > window.innerWidth ||
      this.y < 0 ||
      this.y > window.innerHeight
    ) {
      this.opacity = 0; // 입자의 투명도를 0으로 설정하여 보이지 않게 합니다.
    }
  }
}
