export default class CanvasOption {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio;
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.bgColor = "#000000";
  }
}