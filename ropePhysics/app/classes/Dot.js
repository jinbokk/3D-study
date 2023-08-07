import Vector from "./Vector.js";

export default class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.prevPos = new Vector(x, y);

    this.gravity = new Vector(0, 1);
    this.friction = 0.97;

    this.pinned = false;

    this.mass = 1;
  }

  update() {
    if (this.pinned) return;

    //? velocity
    let vel = Vector.sub(this.pos, this.prevPos);

    this.prevPos.setXY(this.pos.x, this.pos.y);

    vel.multi(this.friction);
    vel.add(this.gravity);
    this.pos.add(vel);
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
