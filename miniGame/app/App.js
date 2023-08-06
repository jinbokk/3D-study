import Background from "./classes/Background.js";
import Coin from "./classes/Coin.js";
import GameHandler from "./classes/GameHandler.js";
import Player from "./classes/Player.js";
import Score from "./classes/Score.js";
import Wall from "./classes/Wall.js";

export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = window.devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60; // 60FPS
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector("#bg3-img"), speed: -1 }),
      new Background({ img: document.querySelector("#bg2-img"), speed: -2 }),
      new Background({ img: document.querySelector("#bg1-img"), speed: -4 }),
    ];

    this.gameHandler = new GameHandler(this);
    this.reset();
  }

  reset() {
    this.walls = [new Wall({ type: "SMALL" })];
    this.player = new Player();
    this.coins = [];
    this.score = new Score();
  }

  init() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    // Background Image Init
    this.backgrounds.forEach((background) => {
      background.draw();
    });
  }

  render() {
    let delta;
    let previous = performance.now();

    const frame = (current) => {
      requestAnimationFrame(frame);

      delta = current - previous;

      if (delta < App.interval) return;

      if (this.gameHandler._status !== "PLAYING") return;

      App.ctx.clearRect(0, 0, App.width, App.height);

      // Background Image
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      // Wall image
      for (let i = this.walls.length - 1; i >= 0; i--) {
        this.walls[i].draw();
        this.walls[i].update();

        // Degenerate Wall
        if (this.walls[i].isOutside) {
          this.walls.splice(i, 1);
          continue;
        }

        // Generate Wall
        if (this.walls[i].canGenerateNext) {
          this.walls[i].generatedNext = true;
          this.walls.push(
            new Wall({ type: Math.random() > 0.5 ? "SMALL" : "BIG" })
          );

          // Generate Coins
          if (Math.random() < 0.8) {
            const x = this.walls[i + 1].x + this.walls[i + 1].width / 2;
            const y = this.walls[i + 1].y2 - this.walls[i + 1].gapY / 2;
            const vx = this.walls[i + 1].vx;
            const xOffset = 10;

            if (this.walls[i + 1].type === "SMALL") {
              this.coins.push(
                new Coin(x - 55 + xOffset, y, vx),
                new Coin(x + xOffset, y, vx),
                new Coin(x + 55 + xOffset, y, vx)
              );
            }

            if (this.walls[i + 1].type === "BIG") {
              this.coins.push(
                new Coin(x - 150 + xOffset, y, vx),
                new Coin(x - 75 + xOffset, y, vx),
                new Coin(x + xOffset, y, vx),
                new Coin(x + 75 + xOffset, y, vx),
                new Coin(x + 150 + xOffset, y, vx)
              );
            }
          }
        }

        // if (this.walls[i].isCollidingWith(this.player.boundingBox)) {
        //   this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`;
        // } else {
        //   this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`;
        // }

        if (this.walls[i].isCollidingWith(this.player.boundingBox)) {
          document.querySelector(".distance").innerHTML =
            Math.floor(this.score.distCount) + "m";
          document.querySelector(".coin").innerHTML =
            this.score.coinCount + "coin";
          this.gameHandler.status = "FINISHED";

          // prevent side-effect in for-loop
          break;
        }
      }

      // Player
      this.player.update();
      this.player.draw();

      if (
        this.player.y > App.height ||
        this.player.y + this.player.height < 0
      ) {
        this.gameHandler.status = "FINISHED";
      }
      // Coin
      for (let i = this.coins.length - 1; i >= 0; i--) {
        this.coins[i].update();
        this.coins[i].draw();

        if (this.coins[i].x + this.coins[i].width < 0) {
          this.coins.splice(i, 1);
          continue;
        }

        if (
          this.coins[i].boundingBox.isCollidingWith(this.player.boundingBox)
        ) {
          this.score.coinCount += 1;
          this.coins.splice(i, 1);
        }
      }

      this.score.update();
      this.score.draw();

      previous = current - (delta % App.interval);
    };
    requestAnimationFrame(frame);
  }
}
