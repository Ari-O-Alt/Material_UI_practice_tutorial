import { makeStyles } from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export const useForm = (initialFormFieldsValues, validateOnChange = false, validateForm) => {
  const [values, setValues] = React.useState(initialFormFieldsValues);
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value, // the prop we are trying to access here will have the name that is stored inside the "name" attribute of the element we click on, so it will be different all the time
    });

    if (validateOnChange) {
      validateForm({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialFormFieldsValues);
    setErrors({});
  };

  return { values, setValues, handleInputChange, errors, setErrors, resetForm };
};

export const Form = (props) => {
  const { children, ...otherProps } = props; // the onSubmit props will be included in otherProps
  const classes = styles();
  return (
    <form className={classes.root} autoComplete={'off'} {...otherProps}>
      {children}
    </form>
  );
};
