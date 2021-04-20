import React from 'react';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MUIModal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const useStyles = makeStyles((theme) => ({
  modal: {
    background: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    boxSizing: 'border-box',
    padding: theme.spacing(2, 4, 3),
    position: 'absolute',
    right: `calc(50% - ${theme.breakpoints.values.md / 2}px)`,
    top: 50,
    width: theme.breakpoints.values.md,
  },
}));

type ModalProps = {
  children: any
  isHelp?: boolean
  mobileLink?: string
  opener: React.ReactNode | string
}

const Modal: React.FC<ModalProps> = ({
  children,
  isHelp = false,
  mobileLink,
  opener,
}) => {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState<boolean>(false);

  if (mobileLink) {
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