import { useEffect, useRef } from "react";
import "../style/containers/Nudake.css";
import image1 from "../assets/nudake-1.jpg";
import image2 from "../assets/nudake-2.jpg";
import image3 from "../assets/nudake-3.jpg";
import { getAngle, getDistance } from "../utils/utils";

const Nudake = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d");

    const imgSrcs = [image1, image2, image3];
    let currentIndex = 0;
    let prevPos = { x: 0, y: 0 };

    let canvasWidth, canvasHeight;

    function resize() {
      canvasWidth = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      drawImage();
    }

    function drawImage() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const image = new Image();
      image.src = imgSrcs[currentIndex];
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      };
    }

    function onMouseDown(e) {
      console.log("down");
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("mouseleave", onMouseUp);
      canvas.addEventListener("mousemove", onMouseMove);

      prevPos = { x: e.offsetX, y: e.offsetY };
    }
    function onMouseUp() {
      console.log("up");
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
    }
    function onMouseMove(e) {
      console.log("move");
      drawCircles(e);
    }

    function drawCircles(e) {
      const nextPos = { x: e.offsetX, y: e.offsetY };
      const dist = getDistance(prevPos, nextPos);
      const angle = getAngle(prevPos, nextPos);

      for (let i = 0; i < dist; i++) {
        const x = prevPos.x + Math.cos(angle) * i;
        const y = prevPos.y + Math.sin(angle) * i;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      prevPos = nextPos;
    }

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("resize", resize);
    window.addEventListener("resize", resize);
    resize();

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);

      canvas.removeEventListener("resize", resize);
      window.removeEventListener("resize");
    };
  }, []);

  return (
    <div className="nudake">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Nudake;
