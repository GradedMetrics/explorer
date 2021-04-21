import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BathtubIcon from '@material-ui/icons/Bathtub';
import ErrorImage from '../assets/404.jpg';

const Error404 = () => {
  let rotation = Math.floor(Math.random()*14) - 7;

  if (rotation === 0) {
    rotation = 7;
  }

  return (
    <Box style={{ overflow: 'hidden' }}>
      <Box textAlign="center" style={{ transform: `rotateZ(${rotation}deg)` }} mb={6}>
        <Typography
          gutterBottom
          variant="h4"
          variantMapping={{ h4: 'h1' }}
        >
          <BathtubIcon fontSize="large" />
          {' '}
          404
        </Typography>
        <Typography>
          There is nothing sensible on this page.
        </Typography>
        <Box mt={2}>
          <img src={ErrorImage} height="600px" alt="Check out my Raichu!" />
        </Box>
      </Box>
    </Box>
  );
}

export default Error404;