import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import React from 'react';
import MyButton from '../Controls/MyButton';

const styles = makeStyles((theme) => ({
  dialog: {
    position: 'absolute',
    top: theme.spacing(5),
    padding: theme.spacing(2),
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogButtons: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    },
  },
}));

const MyConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = styles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogContent}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{confirmDialog.title}</Typography>
        <Typography variant='subtitle2'>{confirmDialog.subtitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogButtons}>
        <MyButton
          text='NO'
          color={'default'}
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <MyButton
          text='YES'
          color={'secondary'}
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MyConfirmDialog;
