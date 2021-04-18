import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';

const MyDatePicker = (props) => {
  const { name, label, value, onHandleChange } = props;

  // function that gives us back the props we need on the event.target ("name" and "value" instead of "name" and "checked", found on the event.target of a checkbox)
  const convertEventTarget = (theName, theDate) => {
    return {
      target: { name: theName, value: theDate },
    };
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker disableToolbar={true} variant='inline' inputVariant='outlined' label={label} format='MMM/dd/yyyy' name={name} value={value} onChange={(date) => onHandleChange(convertEventTarget(name, date))} />
    </MuiPickersUtilsProvider>
  );
};

export default MyDatePicker;
