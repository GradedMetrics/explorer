import React from 'react';
import {
  NavLink as ReactRouterLink,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Navigation from './Navigation';
import {
  version,
} from '../types';
import {
  getDataReliability,
  getVersion,
} from '../utils/version';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    display: 'inline-block',
    textDecoration: 'none',

    '&:active, &:hover, &:focus': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    }
  },
  linkActive: {
    color: theme.palette.secondary.main,
    cursor: 'default',
    textDecoration: 'none',

    '&:active, &:hover, &:focus': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    }
  },
  subtitle: {
    color: theme.palette.grey[600],
  },
  title: {
    margin: '0 auto',
  },
  version: {
    marginTop: -10,
    textAlign: 'center',
  }
}));

type PageHeaderProps = {
  version?: version,
}

const PageHeader: React.FC<PageHeaderProps> = ({
  version,
}) => {
  const classes = useStyles();

  return (
    <Box my={4}>
      <Box textAlign="center">
        <Link
          activeClassName={classes.linkActive}
          className={classes.link}
          component={ReactRouterLink}
          to="/"
          exact
        >
          <Typography variant="h2">
            <span className={classes.subtitle}>Poké</span>
            Metrics
          </Typography>
          {version ? (
            <Box mt={1}>
              {version.d ? (
                <Typography
                  align="left"
                  color="textSecondary"
                  className={classes.version}
                  display="block"
                  variant="subtitle2"
                  gutterBottom
                >
                  Data updated weekly &middot; {getDataReliability(version)}
                </Typography>
              ) : undefined}
              <Typography
                align="left"
                color="textSecondary"
                className={classes.version}
                display="block"
                variant="subtitle2"
              >
                {getVersion(version)}
              </Typography>
            </Box>
          ) : undefined}
        </Link>
      </Box>
      <Box my={2}>
        <Navigation />
      </Box>
      <Divider />
    </Box>
  );
}

export default PageHeader;