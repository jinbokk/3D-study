import Background from "./classes/Background.js";
import Player from "./classes/Player.js";
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

    this.walls = [new Wall({ type: "SMALL" })];

    this.player = new Player();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width =
      window.innerWidth > window.innerHeight
        ? window.innerHeight * 0.9
        : window.innerWidth * 0.9;
    App.canvas.style.width = width + "px";
    App.canvas.style.height = width * (3 / 4) + "px";
  }

  render() {
    let delta;
    let previous = performance.now();

    const frame = (current) => {
      requestAnimationFrame(frame);
      App.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      delta = current - previous;

      if (delta < App.interval) return;

      // Background Image
      this.backgrounds.forEach((background) => {
        background.draw();
        background.update();
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
            new Wall({ type: Math.random() > 0.3 ? "SMALL" : "BIG" })
          );
        }

        if (this.walls[i].isColliding(this.player.boundingBox)) {
          // console.log("Colliding !");
          this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`
        } else {
          this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`

        }
      }

      // Player
      this.player.update();
      this.player.draw();

      previous = current - (delta % App.interval);
    };
    requestAnimationFrame(frame);
  }
}
