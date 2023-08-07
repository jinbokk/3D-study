import Vector from "./Vector.js";

export default class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.prevPos = new Vector(x, y);

    this.gravity = new Vector(0, 1);
    this.friction = 0.97;

    this.pinned = false;

    this.mass = 1;

    this.lightImg = document.querySelector("#light-img");
    this.lightSize = 15;
  }

  update(mouse) {
    if (this.pinned) return;

    //? velocity
    let vel = Vector.sub(this.pos, this.prevPos);

    this.prevPos.setXY(this.pos.x, this.pos.y);

    vel.multi(this.friction);
    vel.add(this.gravity);

    let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);
    const dist = Math.sqrt(dx * dx + dy * dy);

    const direction = new Vector(dx / dist, dy / dist);

    const force = Math.max((mouse.radius - dist) / mouse.radius, 0);

    if (force > 0.9) this.pos.setXY(mouse.pos.x, mouse.pos.y);
    else {
      this.pos.add(vel);
      this.pos.add(direction.multi(force).multi(10));
    }
  }

  draw(ctx) {
    // ctx.fillStyle = "#000";
    // ctx.beginPath();
    // ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    //? performance optimization
    ctx.style = "#999";
    ctx.fillRect(
      this.pos.x - this.mass,
      this.pos.y - this.mass,
      this.mass * 2,
      this.mass * 2
    );
  }

  drawLight(ctx) {
    ctx.drawImage(
      this.lightImg,
      this.pos.x - this.lightSize / 2,
      this.pos.y - this.lightSize / 2,
      this.lightSize,
      this.lightSize
    );
  }
}
