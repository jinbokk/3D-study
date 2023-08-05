import App from "../App.js";
import BoundingBox from "./BoundingBox.js";

export default class Player {
  constructor() {
    this.img = document.querySelector("#player-img");
    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = 100;
    this.height = this.width * (32 / 32);
    this.sy = 0;
    this.sw = this.img.width / 8;
    this.sh = this.img.height;

    // Animation & Speed
    this.frameX = 0;
    this.counter = 0;

    // Falling
    this.vy = -7;
    this.gravity = 0.3;
    App.canvas.addEventListener("click", () => {
      if (this.vy < -7) {
        this.vy += -2;
      } else if (this.vy > 10) {
        this.vy += -10;
      } else {
        this.vy += -7;
      }
    });

    // Bounding Box
    this.boundingBox = new BoundingBox(
      this.x + 10,
      this.y,
      this.width - 35,
      this.height - 10
    );
  }

  update() {
    // Animation & Speed
    this.counter += 1;

    if (this.counter % 3 === 0) {
      this.frameX = ++this.frameX % 8;
      this.counter = 0;
    }

    //Falling
    this.vy += this.gravity;
    this.y += this.vy;

    // Sync Bounding Box Y
    this.boundingBox.y = this.y;
  }

  draw() {
    this.sx = (this.img.width / 8) * this.frameX;

    App.ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.x,
      this.y - 10,
      this.width,
      this.height
    );

    this.boundingBox.draw();
  }
}
