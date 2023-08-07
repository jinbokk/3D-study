import Dot from "./classes/Dot.js";
import Stick from "./classes/Stick.js";

export default class App {
  static width = window.innerWidth;
  static height = window.innerHeight;
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;

  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.dots = [
      new Dot(400, 50),
      new Dot(500, 50),
      new Dot(600, 50),
      new Dot(700, 50),
    ];
    this.sticks = [
      new Stick(this.dots[0], this.dots[1]),
      new Stick(this.dots[1], this.dots[2]),
      new Stick(this.dots[2], this.dots[3]),
    ];

    this.dots[0].pinned = true;

    this.dots[1].mass = 50;
  }

  resize() {
    App.width = window.innerWidth;
    App.height = window.innerHeight;

    this.canvas.style.width = App.width + "px";
    this.canvas.style.height = App.height + "px";

    this.canvas.width = App.width * App.dpr;
    this.canvas.height = App.height * App.dpr;
    this.ctx.scale(App.dpr, App.dpr);
  }

  render() {
    let prev = performance.now();
    let delta;

    const frame = (current) => {
      requestAnimationFrame(frame);
      delta = current - prev;
      if (delta < this.interval) return;
      prev = current - (delta % this.interval);

      this.ctx.clearRect(0, 0, App.width, App.height);

      this.dots.forEach((dot) => {
        dot.update();
        dot.draw(this.ctx);
      });

      this.sticks.forEach((stick) => {
        stick.update();
        stick.draw(this.ctx);
      });
    };
    requestAnimationFrame(frame);
  }
}
