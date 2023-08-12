import "../style/containers/RotateCanvas.css";
import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import { useEffect, useRef } from "react";
import { randomNumBetween } from "../utils/utils";

const RotateCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;
    let engine, render, runner, mouse, mouseConstraint, observer;

    function initIntersectionObserver() {
      observer = new IntersectionObserver(
        (entries) => {
          const canvasEntry = entries[0];

          if (canvasEntry.isIntersecting) {
            runner.enabled = true;
            Render.run(render);
          } else {
            runner.enabled = false;
            Render.stop(render);
          }
        },
        {
          threshold: 0.05,
        }
      );

      observer.observe(canvas);
    }

    function initScene() {
      engine = Engine.create();
      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: "#1b1b19",
        },
      });
      runner = Runner.create({ delta: 1000 / 60 });

      Render.run(render);
      Runner.run(runner, engine);
    }

    function initMouse() {
      mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          render: {
            visible: false,
          },
        },
      });
      Composite.add(engine.world, mouseConstraint);
    }

    function initGround() {
      const segments = 32;
      const deg = (Math.PI * 2) / segments;
      const width = 50;
      const radius = cw / 2 + width / 2;
      const height = radius * Math.tan(deg / 2) * 2;

      for (let i = 0; i < segments; i++) {
        const theta = deg * i;
        const x = radius * Math.cos(theta) + cw / 2;
        const y = radius * Math.sin(theta) + ch / 2;
        addRect(x, y, width, height, { isStatic: true, angle: theta });
      }
    }

    function addRect(x, y, w, h, options = {}) {
      const rect = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, rect);
    }

    function initImageBoxes() {
      const scale = 2.3;

      const imageURLs = [
        "https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white",
        "https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white",
        "https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=black",
        "https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white",
        "https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=Tailwind-CSS&logoColor=white",
        "https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white",
        "https://img.shields.io/badge/React-000000?style=flat-square&logo=React&logoColor=61DAFB",
        "https://img.shields.io/badge/React_Native-000000?style=flat-square&logo=React&logoColor=61DAFB",
        "https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white",
        "https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white",
        "https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=React-Router&logoColor=white",
        "https://img.shields.io/badge/React_Hook_Form-008080?style=flat-square&logo=React&logoColor=white",
        "https://img.shields.io/badge/Ant_Design-0170FE?style=flat-square&logo=Ant-Design&logoColor=white",
        "https://img.shields.io/badge/MUI-0081CB?style=flat-square&logo=MUI&logoColor=white",
        "https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=Bootstrap&logoColor=white",
        "https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=Framer&logoColor=white",
        "https://img.shields.io/badge/GSAP-000000?style=flat-square&logo=GreenSock&logoColor=white",
        "https://img.shields.io/badge/LottieFiles-3CBDB1?style=flat-square&logo=librarything&logoColor=white",
        "https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=Swiper&logoColor=white",
        "https://img.shields.io/badge/Day.js-005F9E?style=flat-square&logo=Google-Calendar&logoColor=white",
        "https://img.shields.io/badge/Moment.js-000000?style=flat-square&logo=Apache&logoColor=white",
        "https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white",
        "https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white",
        "https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white",
        "https://img.shields.io/badge/Axios-5A3F37?style=flat-square&logo=Axios&logoColor=white",
        "https://img.shields.io/badge/Swagger-7B65C4?style=flat-square&logo=Swagger&logoColor=white",
        "https://img.shields.io/badge/Multer-FFD700?style=flat-square&logo=Google-Drive&logoColor=white",
        "https://img.shields.io/badge/Bcrypt-00414D?style=flat-square&logo=AdGuard&logoColor=white",
        "https://img.shields.io/badge/Jsonwebtoken-000000?style=flat-square&logo=JSON-Web-Tokens&logoColor=white",
        "https://img.shields.io/badge/Dotenv-06BEE1?style=flat-square&logo=.env&logoColor=white",
        "https://img.shields.io/badge/Iamport-00BFFF?style=flat-square&logo=Paypal&logoColor=white",
        "https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white",
        "https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=Mongoose&logoColor=white",
        "https://img.shields.io/badge/AWS%20EC2-232F3E?style=flat-square&logo=Amazon-AWS&logoColor=white",
        "https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=PM2&logoColor=white",
        "https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=GitHub-Actions&logoColor=white",
      ];

      const loadedImages = [];

      // eslint-disable-next-line no-unused-vars
      const imageLoad = new Promise((resolve, reject) => {
        let loaded = 0;
        imageURLs.forEach((url) => {
          const image = new Image();
          image.src = url;
          image.onload = () => {
            loaded++;
            loadedImages.push(image);
            if (loaded === imageURLs.length) return resolve();
          };
        });
      });

      imageLoad.then(() => {
        loadedImages.forEach((image, index) => {
          setTimeout(() => {
            addRect(
              randomNumBetween((cw / 2) * 0.5, (cw / 2) * 1.5),
              ch / 5,
              image.width * scale,
              image.height * scale,
              {
                render: {
                  sprite: {
                    texture: image.src,
                    xScale: scale,
                    yScale: scale,
                  },
                },
              }
            );
          }, index * 300);
        });
      });
    }

    initIntersectionObserver();
    initScene();
    initMouse();
    initGround();
    initImageBoxes();

    return () => {
      observer.unobserve(canvas);
      Composite.clear(engine.world);
      Mouse.clearSourceEvents(mouse);
      Runner.stop(runner);
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>Javascript</h1>
        <h2>⭐⭐⭐⭐⭐</h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using &apos;Content here, content here&apos;,
          making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text,
          and a search for &apos;lorem ipsum&apos; will uncover many web sites
          still in their infancy. Various versions have evolved over the years,
          sometimes by accident, sometimes on purpose (injected humour and the
          like).
        </p>
      </aside>
    </div>
  );
};

export default RotateCanvas;
