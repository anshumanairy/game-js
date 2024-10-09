import React from 'react';
import { Box } from '@mui/material';

const EnemyShip = ({ x, y }) => (
  <Box
    className="absolute"
    style={{
      left: x,
      top: y,
      width: 30,
      height: 30,
      transform: 'translateX(-50%)',
    }}
  >
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0 L30 30 L15 20 L0 30 Z" fill="#f54242" />
      <circle cx="15" cy="10" r="3" fill="#42f5f5" />
    </svg>
  </Box>
);

export default EnemyShip;