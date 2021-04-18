import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

const MyPopup = (props) => {
  const { title, children, isPopupOpen, setIsPopupOpen } = props;
  return (
    <Dialog open={isPopupOpen} maxWidth='md'>
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default MyPopup;
