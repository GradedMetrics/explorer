import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Link } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  banner: {
    background: theme.palette.grey[800],
    borderBottom: `${theme.spacing(1)}px solid ${theme.palette.grey[200]}`,
    boxShadow: `0 0 1px 0 ${theme.palette.grey[700]}`,
    color: theme.palette.primary.contrastText,

    '&:hover': {
      background: theme.palette.grey[900],
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(3),

    '& .MuiButton-text': {
      minWidth: 44,
      padding: 0,
      width: 44,
    },

    '& svg': {
      fill: '#bdbdbd',
    },

    '&:hover svg': {
      fill: theme.palette.secondary.light,
    }
  }
}))

type BannerProps = {
  dismissibleId?: string
  href?: string
  icon?: React.ReactNode
  text: string
}

const Banner: React.FC<BannerProps> = ({
  dismissibleId,
  href,
  icon,
  text
}) => {
  const classes = useStyles();
  const [isDismissed, setDismissed] = React.useState<boolean>(dismissibleId ? !!localStorage.getItem(dismissibleId) : false);

  const onDismissClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!dismissibleId) return;
    event.preventDefault();
    event.stopPropagation();
    localStorage.setItem(dismissibleId, '1');
    setDismissed(true);
  }

  if (isDismissed) {
    return <></>;
  }

  const content = (
    <Box className={classes.banner} py={2}>
      <Container maxWidth="md">
        <Box className={classes.container}>
          {icon ? (
            <Box component="span" className={classes.icon}>
              {icon}
            </Box>
          ) : undefined}
          <Typography>
            {text}
          </Typography>
          {dismissibleId ? (
            <Box component="span" className={classes.button}>
              <Button type="button" onClick={onDismissClick} variant="text">
                <CloseIcon />
              </Button>
            </Box>
          ) : undefined}
        </Box>
      </Container>
    </Box>
  );

  if (href) {
    return (
      <Link href={href} color="inherit">
        {content}
      </Link>
    )
  }

  return content;
}

export default Banner;