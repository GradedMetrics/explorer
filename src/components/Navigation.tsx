import React from 'react';
import {
  NavLink as ReactRouterLink,
  useHistory,
  withRouter,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import FaceIcon from '@material-ui/icons/Face';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import StyleIcon from '@material-ui/icons/Style';
import Loading from './Loading';

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return ({
  link: {
    borderBottom: '2px solid transparent',
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: 'center',
    textDecoration: 'none',
    width: 80,

    '&:hover, &:focus': {
      borderBottomColor: theme.palette.grey[300],
      textDecoration: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1) / 2,
      padding: theme.spacing(1) / 2,
    },
  },
  linkActive: {
    borderBottomColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,

    '&:hover, &:focus': {
      borderBottomColor: theme.palette.secondary.main,
    },
  },
  linkText: {
    display: 'block',
    fontSize: 18,
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      marginTop: theme.spacing(1) / 2,
    },
  },
  toolbar: {
    justifyContent: 'center',
  },
})});

const pages = [{
  icon: <StyleIcon />,
  path: '/expansions',
  text: 'Sets',
}, {
  icon: <FaceIcon />,
  path: '/pokemon',
  text: 'Pokémon',
}, {
  icon: <NaturePeopleIcon />,
  path: '/misc',
  text: 'Misc',
}, {
  icon: <BubbleChartIcon />,
  path: '/stats',
  text: 'Stats'
}, {
  icon: <FormatListNumberedIcon />,
  path: '/rankings',
  text: 'Top 10'
}];

const Navigation = () => {
  const classes = useStyles();

  return (
    <Box alignContent="center">
      <Toolbar className={classes.toolbar} disableGutters>
        {pages.map(({ icon, path, text }) => (
          <Link
            key={path}
            component={ReactRouterLink}
            activeClassName={classes.linkActive}
            className={classes.link}
            to={path}
          >
            <Typography component="span">
              {icon}
              <Typography component="span" className={classes.linkText}>
                {text}
              </Typography>
            </Typography>
          </Link>
        ))}
      </Toolbar>
    </Box>
  );
}

export default withRouter(Navigation);