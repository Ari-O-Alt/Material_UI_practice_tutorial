import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

const styles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

const MyNotificatonPopup = (props) => {
  const { notify, setNotify } = props;

  const classes = styles();

  const handleOnClose = () => {
    setNotify({ ...notify, isOpen: false });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={classes.root}
      onClose={handleOnClose}
    >
      <Alert severity={notify.type} onClose={handleOnClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default MyNotificatonPopup;
