export default class GameHandler {
  constructor(app) {
    this._status = "READY"; // READY,PLAYING,FINISHED
    this.app = app;
    this.init();
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;

    switch (value) {
      case "READY":
        this.showReadyScreen();
        break;
      // case "PLAYING":
      case "FINISHED":
        this.showFinishScreen();
    }
  }

  init() {
    this.readyScreen = document.querySelector(".ready-screen");
    this.startBg = this.readyScreen.querySelector(".start-bg");
    this.startBtn = this.readyScreen.querySelector(".start-btn");
    this.startBtn.addEventListener("click", () => {
      this.hideReadyScreen();
    });

    this.finishScreen = document.querySelector(".finish-screen");
    this.distanceResult = document.querySelector(".distance");
    this.coinResult = document.querySelector(".coin");
    this.replayBtn = document.querySelector(".replay-btn");
    this.replayBtn.addEventListener("click", () => {
      this.hideFinishScreen();
    });

    this.status = "READY";
  }

  showReadyScreen() {
    gsap.to(this.startBg, {
      scale: 1,
      rotation: 720,
      opacity: 1,
      duration: 0.5,
    });
    gsap.to(this.startBtn, {
      scale: 1,
      duration: 1,
      ease: "elastic.out(2, 0.5)",
      delay: 0.5,
    });
  }

  hideReadyScreen() {
    gsap.to(this.readyScreen, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      onComplete: () => {
        this.status = "PLAYING";
      },
    });
  }

  showFinishScreen() {
    gsap.fromTo(
      this.finishScreen,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        pointerEvents: "all",
      }
    );

    gsap.fromTo(
      this.distanceResult,
      { opacity: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 1,
      }
    );

    gsap.fromTo(
      this.coinResult,
      { opacity: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 1.1,
      }
    );

    gsap.fromTo(
      this.replayBtn,
      { opacity: 0 },
      {
        opacity: 1,
        scale: 1,
        rotation: 720,
        duration: 0.5,
        delay: 1.3,
      }
    );
  }

  hideFinishScreen() {
    gsap.to(this.finishScreen, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      onComplete: () => {
        this.status = "PLAYING";
        this.app.reset();
      },
    });
  }
}
