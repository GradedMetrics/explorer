import React from 'react';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MUIModal from '@material-ui/core/Modal';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

type ModalProps = {
  children: any
  inline?: boolean
  isHelp?: boolean
  mobileLink?: string
  opener: React.ReactNode | string
}

const useStyles = makeStyles((theme) => ({
  modal: {
    background: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    boxSizing: 'border-box',
    maxHeight: '90%',
    overflow: 'auto',
    padding: theme.spacing(2, 4, 3),
    position: 'absolute',
    right: ({ mobileLink }: ModalProps) => mobileLink ? `calc(50% - ${(theme.breakpoints.values.md) / 2}px)` : `5%`,
    top: 50,
    width: ({ mobileLink }: ModalProps) => mobileLink ? theme.breakpoints.values.md : '90%',
  },
  inline: {
    '&.MuiButton-root': {
      minWidth: 'initial',
      padding: 0,
      textDecoration: 'underline',
      width: 'auto',
    },
  },
}));

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    inline = false,
    isHelp = false,
    mobileLink,
    opener,
  } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles(props);
  const [isOpen, setOpen] = React.useState<boolean>(false);

  if (mobileLink && matches) {
    return (
      <Link
        component={ReactRouterLink}
        to={mobileLink!}
      >
        <Typography variant="button" color="primary">
          {isHelp ? (
            <>
              <ContactSupportIcon />
              {' '}
              {opener}
            </>
          ) : opener}
        </Typography>
      </Link>
    )
  }

  return (
    <>
      <Button
        type="button"
        color="primary"
        onClick={() => setOpen(true)}
        className={inline ? classes.inline : undefined}
      >
        {isHelp ? (
          <>
            <ContactSupportIcon />
            {' '}
            {opener}
          </>
        ) : opener}
      </Button>
      <MUIModal
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <Box className={classes.modal}>
          {children}
        </Box>
      </MUIModal>
    </>
  )
}

export default Modal;