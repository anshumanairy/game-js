import React, { useEffect, useRef } from 'react';
import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants';

const Stars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = [];

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        size: Math.random() * 2,
        speed: Math.random() * 3 + 1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = 'white';

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > GAME_HEIGHT) {
          star.y = 0;
          star.x = Math.random() * GAME_WIDTH;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      className="absolute inset-0"
    />
  );
};

export default Stars;