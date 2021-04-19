import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import MyButton from '../Controls/MyButton';

const styles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '0px',
  },
}));

const MyPopup = (props) => {
  const { title, children, isPopupOpen, setIsPopupOpen } = props;
  const classes = styles();
  return (
    <Dialog
      open={isPopupOpen}
      maxWidth='md'
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component={'div'} style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <MyButton color='secondary' text='X'></MyButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default MyPopup;
