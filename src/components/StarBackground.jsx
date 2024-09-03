import { useEffect, useRef } from "react";
import "./../App.css";

const StarBackground = () => {
  const starsRef = useRef([]);
  const starContainerRef = useRef(null);

  useEffect(() => {
    const numStars = 300;
    const width = window.innerWidth;
    const height = window.innerHeight;

    starsRef.current = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4,
      speed: Math.random() * 0.7,
      blinkSpeed: Math.random() * 0.02 + 0.02,
      opacity: Math.random(),
      blinkDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    const moveStars = () => {
      starsRef.current.forEach((star) => {
        star.y += star.speed;
        if (star.y > window.innerHeight) star.y = -10;

        star.opacity += star.blinkSpeed * star.blinkDirection;
        if (star.opacity <= 0) {
          star.opacity = 0;
          star.blinkDirection = 1;
        } else if (star.opacity >= 1) {
          star.opacity = 1;
          star.blinkDirection = -1;
        }
      });

      if (starContainerRef.current) {
        starContainerRef.current.innerHTML = starsRef.current
          .map(
            (star) =>
              `<div style="position: absolute; top: ${star.y}px; left: ${star.x}px; width: ${star.radius}px; height: ${star.radius}px; border-radius: 50%; background-color: rgba(255, 255, 255, ${star.opacity});"></div>`
          )
          .join("");
      }

      requestAnimationFrame(moveStars);
    };

    requestAnimationFrame(moveStars);
  }, []);

  return <div className="star-container" ref={starContainerRef} />;
};

export default StarBackground;
