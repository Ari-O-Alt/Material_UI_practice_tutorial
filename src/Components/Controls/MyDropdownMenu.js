import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

const MyDropdownMenu = (props) => {
  const { name, label, value, onHandleChange, options, error = null } = props;

  return (
    <FormControl variant='outlined' {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} label={label} value={value} onChange={onHandleChange}>
        <MenuItem value=''>None</MenuItem>
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option.id}>
              {option.title}
            </MenuItem>
          );
        })}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default MyDropdownMenu;
