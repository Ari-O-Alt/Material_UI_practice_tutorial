import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';

const MyRadioGroup = (props) => {
  const { name, label, value, genderItems, onHandleChange } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row={true} aria-label='gender' name={name} value={value} onChange={onHandleChange}>
        {genderItems.map((genderItem, index) => {
          return <FormControlLabel key={index} value={genderItem.id} control={<Radio />} label={genderItem.title} />;
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default MyRadioGroup;
// eslint-disable-next-line no-lone-blocks
{
  /*  <FormControl>
      <FormLabel>Gender</FormLabel>
      <RadioGroup row={true} name='gender' value={gender} onChange={onHandleChange}>
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='other' control={<Radio />} label='Other' />
      </RadioGroup>
    </FormControl> */
}
