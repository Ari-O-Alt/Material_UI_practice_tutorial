import { Checkbox, FormControlLabel, FormControl } from '@material-ui/core';
import React from 'react';

const MyCheckbox = (props) => {
  const { value, name, label, onHandleChange } = props;

  // function that gives us back the props we need on the event.target ("name" and "value" instead of "name" and "checked", found on the event.target of a checkbox)
  const convertEventTarget = (theName, checkedProp) => {
    return {
      target: { name: theName, value: checkedProp },
    };
  };

  return (
    <FormControl>
      <FormControlLabel control={<Checkbox name={name} color={'primary'} checked={value} onChange={(event) => onHandleChange(convertEventTarget(name, event.target.checked))} />} label={label} />
    </FormControl>
  );
};

export default MyCheckbox;
