import React from 'react';
import Typography from '@material-ui/core/Typography';

type VariantProps = {
  children: React.ReactNode,
}

const Variant: React.FC<VariantProps> = ({ children }) => (
  <Typography
    color="secondary"
    display="inline"
    variant="body1"
    variantMapping={{ body1: 'span', }}
  >
    {children}
  </Typography>
)

export default Variant;