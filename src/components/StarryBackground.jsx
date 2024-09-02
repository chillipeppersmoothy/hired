import { useEffect, useState } from "react";
import "./../App.css";

const StarBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const numStars = 300;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const starsArray = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4,
      speed: Math.random() * 3,
    }));

    setStars(starsArray);
  }, []);

  useEffect(() => {
    const moveStars = () => {
      const updatedStars = stars.map((star) => {
        star.y += star.speed;
        if (star.y > window.innerHeight) star.y = -10;
        return star;
      });
      setStars(updatedStars);
    };

    const intervalId = setInterval(moveStars, 20);
    return () => clearInterval(intervalId);
  }, [stars]);

  return (
    <div className="star-container">
      {stars.map((star, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: star.y,
            left: star.x,
            width: star.radius,
            height: star.radius,
            borderRadius: "50%",
            backgroundColor: "#fff",
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
