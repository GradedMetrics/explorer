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
    color: theme.palette.text.primary,
    cursor: 'default',
    textDecoration: 'none',

    '&:active, &:hover, &:focus': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    }
  },
  subtitle: {
    color: theme.palette.grey[600],
    display: 'block',
    marginBottom: -23,
    marginLeft: -88,
  },
  title: {
    margin: '0 auto',
  },
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
          <Typography
            variant="h2"
          >
            <span className={classes.subtitle}>Grade</span>
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
                marginTop: -16,
                width: 130,
              }}
            >
              API v0.{version.v}.{version['@'].toString().substr(6, 16)}
            </Typography>
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