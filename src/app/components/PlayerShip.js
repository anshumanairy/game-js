import React from 'react';
import { Box } from '@mui/material';

const PlayerShip = ({ x, y }) => (
  <Box
    className="absolute"
    style={{
      left: x,
      top: y,
      width: 40,
      height: 40,
      transform: 'translateX(-50%)',
    }}
  >
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0 L40 40 L20 30 L0 40 Z" fill="#4287f5" />
      <circle cx="20" cy="15" r="5" fill="#f54242" />
    </svg>
  </Box>
);

export default PlayerShip;