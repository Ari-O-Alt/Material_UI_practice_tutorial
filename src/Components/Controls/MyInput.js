import { TextField } from '@material-ui/core';
import React from 'react';

const MyInput = (props) => {
  const {
    name,
    label,
    value,
    onHandleChange,
    error = null,
    ...otherProps
  } = props; // error prop will be null by default

  return (
    <TextField
      variant={'outlined'}
      label={label}
      name={name}
      value={value}
      onChange={onHandleChange}
      {...otherProps}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default MyInput;
