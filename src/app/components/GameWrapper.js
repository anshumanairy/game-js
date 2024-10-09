'use client';

import React, { useEffect, useState } from 'react';
import GameContainer from './GameContainer';

const GameWrapper = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black overflow-hidden"
      style={{ width: windowSize.width, height: windowSize.height }}
    >
      <GameContainer />
    </div>
  );
};

export default GameWrapper;