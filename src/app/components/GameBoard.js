'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import PlayerShip from './PlayerShip';
import EnemyShip from './EnemyShip';
import Bullet from './Bullet';
import Stars from './Stars';
import LivesDisplay from './LivesDisplay';

const GameBoard = ({ gameState, onPlayerMove, onPlayerShoot }) => {
  const [keysPressed, setKeysPressed] = useState({});
  const [lastShootTime, setLastShootTime] = useState(0);
  const boardRef = useRef(null);

  const handlePlayerShoot = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastShootTime >= 1000 / gameState.fireRate) {
      onPlayerShoot();
      setLastShootTime(currentTime);
    }
  }, [onPlayerShoot, gameState.fireRate, lastShootTime]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
      if (e.key === ' ') {
        handlePlayerShoot();
      }
    };

    const handleKeyUp = (e) => {
      setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const boardRect = boardRef.current.getBoundingClientRect();
      const touchX = touch.clientX - boardRect.left;
      
      if (touchX < boardRect.width / 2) {
        onPlayerMove('left');
      } else {
        onPlayerMove('right');
      }
      handlePlayerShoot();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    boardRef.current.addEventListener('touchstart', handleTouchStart);

    const moveInterval = setInterval(() => {
      if (keysPressed.ArrowLeft || keysPressed.a || keysPressed.A) onPlayerMove('left');
      if (keysPressed.ArrowRight || keysPressed.d || keysPressed.D) onPlayerMove('right');
      if (keysPressed[' ']) {
        handlePlayerShoot();
      }
    }, 1000 / 60); // 60 FPS

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      boardRef.current.removeEventListener('touchstart', handleTouchStart);
      clearInterval(moveInterval);
    };
  }, [onPlayerMove, handlePlayerShoot, keysPressed]);

  const gradientColor = `hsl(${(gameState.level * 30) % 360}, 70%, 20%)`;

  return (
    <Box 
      ref={boardRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${gradientColor}, #000000)`
      }}
    >
      <Stars />
      <LivesDisplay lives={gameState.lives} />
      
      <PlayerShip x={gameState.player.x} y={gameState.player.y} />
      
      {gameState.enemies.map((enemy, index) => (
        <EnemyShip key={index} x={enemy.x} y={enemy.y} />
      ))}

      {gameState.bullets.map((bullet, index) => (
        <Bullet key={index} x={bullet.x} y={bullet.y} />
      ))}
    </Box>
  );
};

export default GameBoard;