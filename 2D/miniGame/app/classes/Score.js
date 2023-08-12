import App from "../App.js";
import Coin from "./Coin.js";

export default class Score {
  constructor() {
    this.coin = new Coin(App.width - 50, 50, 0);
    // this.coin.frameX = 0;

    this.distCount = 0;
    this.coinCount = 0;
  }

  update() {
    this.distCount += 0.03;
  }

  draw() {
    this.coin.draw();

    App.ctx.font = "48px Lilita One";
    App.ctx.fillStyle = "#f1f1f1";
    App.ctx.textAlign = "right";
    App.ctx.fillText(this.coinCount, App.width - 90, 66);

    App.ctx.textAlign = "left";
    App.ctx.fillText(Math.floor(this.distCount) + "m", 40, 66);
  }
}
