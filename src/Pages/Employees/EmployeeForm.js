import { Grid } from '@material-ui/core';
import React from 'react';
import MyButton from '../../Components/Controls/MyButton';
import MyCheckbox from '../../Components/Controls/MyCheckbox';
import MyDatePicker from '../../Components/Controls/MyDatePicker';
import MyDropdownMenu from '../../Components/Controls/MyDropdownMenu';
import MyInput from '../../Components/Controls/MyInput';
import MyRadioGroup from '../../Components/Controls/MyRadioGroup';
import { useForm, Form } from '../../Components/useForm';
import * as EmployeeService from '../../Services/employeeService';

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
];

const initialFormFieldsValues = {
  id: 0,
  fullName: '',
  mobile: '',
  email: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
};

const EmployeeForm = () => {
  // method for form validation - real time validation for single inputs
  // we pass it the values object wich stores all the inout values at that point in time
  const validateForm = (fieldValues = values) => {
    let possibleErrors = { ...errors };
    // if a specific props exists inside our fieldValues object, we check if it hold any value
    // if it does, we have no error, if it doesn't, we have an error message
    if ('fullName' in fieldValues) {
      possibleErrors.fullName = fieldValues.fullName ? '' : 'Please enter a name';
    }
    if ('email' in fieldValues) {
      possibleErrors.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid';
    }
    if ('mobile' in fieldValues) {
      possibleErrors.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 digits are required for the phone number';
    }
    if ('departmentId' in fieldValues) {
      possibleErrors.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'Please enter a value';
    }

    // we set all the errors in our error state
    setErrors({ ...possibleErrors });

    // this checks if this function is called onChange of the input or on the button submit
    /*    if (fieldValues === values) { */
    return Object.values(possibleErrors).every((property) => property === ''); // this function will return an array with all the prop names on the possibleErrors object; we then check if all the props have the value of an empty string; if they do, it means the whole form is error free (has been filled) and the function returns TRUE
    /*  } */
  };

  const { values, handleInputChange, errors, setErrors, resetForm } = useForm(initialFormFieldsValues, true, validateForm);

  const departmentOptions = EmployeeService.getDepartmentCollection();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // if this function returns true, therefore the form is error free, submit the form
      window.alert('Hello!');
      EmployeeService.insertEmployee(values);
      resetForm();
    }
  };

  return (
    /*-------------------------------------------------------------------------------- form start */
    <Form onSubmit={handleSubmit}>
      {/* ------------------------------------------------------------------------------ whole grid */}
      <Grid container={true}>
        {/* ---------------------------------------------------------- left side of the  grid */}
        <Grid item={true} xs={6}>
          {/* -------------------- name input */}
          <MyInput name='fullName' label={'Full Name'} value={values.fullName} onHandleChange={handleInputChange} error={errors.fullName} />
          {/* -------------------- email input */}
          <MyInput label={'Email'} name='email' value={values.email} onHandleChange={handleInputChange} error={errors.email} />
          {/* -------------------- mobile input */}
          <MyInput label={'Mobile'} name='mobile' value={values.mobile} onHandleChange={handleInputChange} error={errors.mobile} />
          {/* -------------------- city input */}
          <MyInput label={'City'} name='city' value={values.city} onHandleChange={handleInputChange} />
        </Grid>
        {/* ---------------------------------------------------------- right side of the  grid */}
        <Grid item={true} xs={6}>
          {/* -------------------- gender input */}
          <MyRadioGroup name='gender' label='Gender' value={values.gender} onHandleChange={handleInputChange} genderItems={genderItems} />
          {/* -------------------- department dropdown */}
          <MyDropdownMenu name='departmentId' label='Department' value={values.departmentId} onHandleChange={handleInputChange} options={departmentOptions} error={errors.departmentId} />
          {/* -------------------- date picker */}
          <MyDatePicker name='hireDate' label='Date Picker' value={values.hireDate} onHandleChange={handleInputChange} />
          {/* -------------------- is permanent checkbox */}
          <MyCheckbox value={values.isPermanent} name='isPermanent' label='Is Permanent Employee' onHandleChange={handleInputChange} />
          {/* -------------------- submit and reset buttons */}
          <div>
            <MyButton text='SUBMIT' type='submit' />
            <MyButton text='RESET' color='default' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
    /*-------------------------------------------------------------------------------- form end */
  );
};

export default EmployeeForm;
