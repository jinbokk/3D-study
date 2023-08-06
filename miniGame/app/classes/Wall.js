import App from "../App.js";
import { randomNumBetween } from "../utils.js";
import BoundingBox from "./BoundingBox.js";

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img");
    this.type = config.type; // "BIG","SMALL"

    switch (this.type) {
      case "BIG":
        this.sizeX = 18 / 30;
        this.sx = this.img.width * (9 / 30);
        break;
      case "SMALL":
        this.sizeX = 9 / 30;
        this.sx = this.img.width * (0 / 30);
        break;
    }

    this.width = App.height * this.sizeX;
    this.height = App.height;
    this.gapY = randomNumBetween(App.height * 0.15, App.height * 0.35);
    this.x = App.width;
    this.vx = -5;
    this.y1 = -this.height + randomNumBetween(40, App.height - this.gapY - 40);
    this.y2 = this.y1 + this.height + this.gapY;

    this.generatedNext = false;
    this.gapNextX = App.width * randomNumBetween(0.7, 0.85);

    this.boundingBoxTop = new BoundingBox(
      this.x + 30,
      this.y1 + 30,
      this.width - 60,
      this.height - 60
    );

    this.boundingBoxBottom = new BoundingBox(
      this.x + 30,
      this.y2 + 30,
      this.width - 60,
      this.height - 60
    );
  }

  get isOutside() {
    return this.x + this.width < 0;
  }

  get canGenerateNext() {
    return !this.generatedNext && this.x + this.width < this.gapNextX;
  }

  update() {
    this.x += this.vx;

    this.boundingBoxTop.x = this.x + 30;
    this.boundingBoxBottom.x = this.x + 30;
  }

  isCollidingWith(target) {
    return (
      this.boundingBoxTop.isCollidingWith(target) ||
      this.boundingBoxBottom.isCollidingWith(target)
    );
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y1,
      this.width,
      this.height
    );

    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y2,
      this.width,
      this.height
    );

    this.boundingBoxTop.draw();
    this.boundingBoxBottom.draw();
  }
}
