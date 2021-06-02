import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  note: {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
  inner: {
    display: 'flex',
  },
  iconWrapper: {
    flex: '0 0 32px',
    marginRight: theme.spacing(1),
  }
}))

type BannerProps = {
  icon?: React.ReactNode
  text: string
}

const Note: React.FC<BannerProps> = ({
  icon,
  text
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={1} className={classes.note}>
      <Box p={2} className={classes.inner}>
        {icon ? (
          <Box className={classes.iconWrapper}>
            {icon}
          </Box>
        ) : undefined}
        <Typography variant="body1">
          {text}
        </Typography>
      </Box>
    </Paper>
  )
}

export default Note;