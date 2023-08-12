import App from "./app/App.js";

const app = new App();

window.addEventListener("load", () => {
  app.render();
});

// test code below
// import Vector from "./app/classes/Vector.js";

// const v1 = new Vector(100, 100);
// const v2 = new Vector(50, 50);

// console.log(v1);
// console.log(v2);
// console.log(v1.add(v2));
// console.log(v1.sub(v2));

// const v3 = Vector.add(v1, v2);
// console.log(v3);
// console.log(v3.multi(v1));

// console.log(v1.dist(v2));
