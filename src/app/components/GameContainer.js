'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import { initializeGame, updateGameState, movePlayer, shootBullet } from '../utils/gameLogic';

const GameContainer = () => {
  const [gameState, setGameState] = useState(initializeGame());
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!isGameOver) {
        setGameState((prevState) => updateGameState(prevState, setIsGameOver));
      }
    }, 1000 / 60); // 60 FPS

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && isGameOver) {
        handleStartGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameOver]);

  const handleStartGame = () => {
    setGameState(initializeGame());
    setIsGameOver(false);
  };

  const handlePlayerMove = useCallback((direction) => {
    setGameState((prevState) => movePlayer(prevState, direction));
  }, []);

  const handlePlayerShoot = useCallback(() => {
    setGameState((prevState) => shootBullet(prevState));
  }, []);

  return (
    <Box className="w-full h-full flex flex-col items-center justify-center">
      <GameBoard 
        gameState={gameState} 
        onPlayerMove={handlePlayerMove}
        onPlayerShoot={handlePlayerShoot}
      />
      <ScoreBoard score={gameState.score} level={gameState.level} />
      {isGameOver && (
        <Box className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <Box className="text-center p-4 bg-gray-800 rounded-lg">
            <Typography variant="h4" className="mb-4 text-red-500">
              Game Over
            </Typography>
            <Typography variant="h6" className="mb-4 text-white">
              Score: {gameState.score}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleStartGame}
              className="px-4 py-2"
            >
              Restart Game
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GameContainer;