import React from 'react';
import { Box, Typography } from '@mui/material';

const ScoreBoard = ({ score, level }) => {
  return (
    <Box className="absolute top-0 left-0 right-0 flex justify-between p-4">
      <Typography variant="h5" className="text-white font-bold px-4 py-2 bg-purple-900 rounded-lg">
        Score: {score}
      </Typography>
      <Typography variant="h5" className="text-white font-bold px-4 py-2 bg-purple-900 rounded-lg">
        Level: {level}
      </Typography>
    </Box>
  );
};

export default ScoreBoard;