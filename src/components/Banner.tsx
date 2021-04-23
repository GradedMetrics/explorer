import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  banner: {
    background: theme.palette.primary.main,
    borderBottom: `${theme.spacing(1)}px solid ${theme.palette.grey[200]}`,
    boxShadow: `0 0 1px 0 ${theme.palette.grey[700]}`,
    color: theme.palette.primary.contrastText,
  },
  icon: {
    marginRight: theme.spacing(1),
  }
}))

type BannerProps = {
  icon?: React.ReactNode
  text: string
}

const Banner: React.FC<BannerProps> = ({
  icon,
  text
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner} py={2}>
      <Container maxWidth="md">
        <Typography align="center">
          {icon ? (
            <Box component="span" display="inline-block" className={classes.icon}>
              {icon}
            </Box>
          ) : undefined}
          {text}
        </Typography>
      </Container>
    </Box>
  )
}

export default Banner;