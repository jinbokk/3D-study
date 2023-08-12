import App from "../App.js";
import BoundingBox from "./BoundingBox.js";

export default class Coin {
  constructor(x, y, vx) {
    this.img = document.querySelector("#coin-img");
    this.width = 40;
    this.height = this.width * (60.1 / 61);
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.sy = 0;
    this.sw = this.img.width / 10;
    this.sh = this.img.height;

    this.counter = 0;
    this.frameX = 0;

    this.vx = vx;

    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
  }

  update() {
    if (++this.counter % 3 === 0) {
      this.frameX = ++this.frameX % 10;
      this.counter = 0;
    }

    this.x += this.vx;

    this.boundingBox.x = this.x;
  }

  draw() {
    this.sx = (this.img.width / 10) * this.frameX;

    this.boundingBox;
    // this.boundingBox.draw();

    App.ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
