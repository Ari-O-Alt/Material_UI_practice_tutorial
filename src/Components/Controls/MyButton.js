import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
}));

const MyButton = (props) => {
  const { text, size, color, variant, onHandleClick, ...otherProps } = props;

  const classes = styles();

  return (
    // with {... otherProps} we can add extra props to the component; see the type="submit" prop in EmployeeForm
    <Button variant={variant || 'contained'} size={size || 'large'} color={color || 'primary'} onClick={onHandleClick} classes={{ root: classes.root }} {...otherProps}>
      {text}
    </Button>
  );
};

export default MyButton;
