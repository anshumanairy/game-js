import React from 'react';
import { Box } from '@mui/material';

const Bullet = ({ x, y }) => (
  <Box
    className="absolute bg-yellow-500 rounded-full"
    style={{
      left: x,
      top: y,
      width: 5,
      height: 10,
      transform: 'translateX(-50%)',
    }}
  />
);

export default Bullet;