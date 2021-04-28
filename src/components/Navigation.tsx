import React from 'react';
import {
  NavLink as ReactRouterLink,
  withRouter,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import FaceIcon from '@material-ui/icons/Face';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import StyleIcon from '@material-ui/icons/Style';

const useStyles = makeStyles((theme) => ({
  link: {
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'initial',
    width: 80,

    '&:hover, &:focus': {
      borderBottomColor: theme.palette.grey[300],
      textDecoration: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      boxSizing: 'border-box',
      height: 59,
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
  linkDrawer: {
    borderRight: '4px solid transparent',
    minWidth: 180,
    textDecoration: 'none',
  },
  linkDrawerActive: {
    borderRightColor: theme.palette.secondary.main,
  },
  toolbar: {
    justifyContent: 'center',
  },
}));

const pages = [{
  exact: true,
  icon: <LocalFloristIcon />,
  isHidden: true,
  path: '/',
  text: 'Home',
}, {
  icon: <StyleIcon />,
  path: '/sets',
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
  icon: <CallSplitIcon />,
  path: '/variants',
  text: 'Variants',
}, {
  icon: <BubbleChartIcon />,
  isHiddenMobile: true,
  path: '/stats',
  text: 'Stats'
}, {
  icon: <FormatListNumberedIcon />,
  isHiddenMobile: true,
  path: '/rankings',
  text: 'Top 10'
}];

const Navigation = () => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  return (
    <Box alignContent="center">
      <Toolbar className={classes.toolbar} disableGutters>
        {(isMobileDisplay ? pages.filter(page => !page.isHiddenMobile && !page.isHidden) : pages.filter(page => !page.isHidden)).map(({ icon, path, text }) => (
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
        {isMobileDisplay ? (
          <>
            <Button
              className={classes.link}
              onClick={() => setDrawerOpen(true)}
            >
              <Typography component="span">
                <MoreVertIcon fontSize="large" />
              </Typography>
            </Button>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
              {pages.map(({ exact, icon, path, text }) => (
                <ListItem
                  button
                  component={ReactRouterLink}
                  activeClassName={classes.linkDrawerActive}
                  className={classes.linkDrawer}
                  onClick={() => setDrawerOpen(false)}
                  key={path}
                  to={path}
                  exact={exact}
                >
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              </List>
            </Drawer>
          </>
        ) : undefined}
      </Toolbar>
    </Box>
  );
}

export default withRouter(Navigation);