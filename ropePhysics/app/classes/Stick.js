export default class Stick {
  constructor(p1, p2) {
    this.startPoint = p1;
    this.endPoint = p2;

    this.length = this.startPoint.pos.dist(this.endPoint.pos);

    this.tension = 0.5;
  }

  update() {
    const dx = this.endPoint.pos.x - this.startPoint.pos.x;
    const dy = this.endPoint.pos.y - this.startPoint.pos.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    // const offsetX = ((dist - this.length) * dx) / dist;
    // const offsetY = ((dist - this.length) * dy) / dist;

    // operation optimization
    const diff = (dist - this.length) / dist;
    const offsetX = diff * dx * this.tension;
    const offsetY = diff * dy * this.tension;

    const m = this.startPoint.mass + this.endPoint.mass;
    const m1 = this.endPoint.mass / m;
    const m2 = this.startPoint.mass / m;

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x += (offsetX / 2) * m1;
      this.startPoint.pos.y += (offsetY / 2) * m1;
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x -= (offsetX / 2) * m2;
      this.endPoint.pos.y -= (offsetY / 2) * m2;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 10;
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }
}
