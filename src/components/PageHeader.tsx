import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Navigation from './Navigation';
import {
  version,
} from '../types';

type PageHeaderProps = {
  version?: version,
}

const PageHeader: React.FC<PageHeaderProps> = ({
  version,
}) => {
  return (
    <Box my={4}>
      <Grid
        container
        alignItems="center"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={4}
        >
          <Typography
            variant="h2"
          >
            Explorer
          </Typography>
          {version ? (
            <Typography
              align="left"
              color="textSecondary"
              display="block"
              variant="overline"
              style={{
                marginLeft: 76,
                marginTop: -16
              }}
            >
              API v0.{version.v}.{version['@'].toString().substr(6, 16)}
            </Typography>
          ) : undefined}
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
        >
          <Navigation />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PageHeader;