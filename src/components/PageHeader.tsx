import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
          md={4}
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
          md={8}
        >
          <Typography
            align="right"
            display="block"
            variant="caption"
          >
            This app aims to add quality of life improvements to <a href="https://psacard.com" rel="noreferrer noopener">PSA</a>'s population report.
            {' '}
            It is not associated with PSA in any way. Have a suggestion or a problem? Message <a href="https://instagram.com/pichucollector" rel="noreferrer noopener">@pichucollector</a> about it on Instagram.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PageHeader;