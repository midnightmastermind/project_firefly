import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

const renderNumericInput = (label, property, elementStyle, handleInputChange) => {
  let value = elementStyle && elementStyle[property]; // Ensure the value is a number
  if (typeof value === 'string') {
    value = parseFloat(value); // Extract numeric value from string
  }

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue)) {
      handleInputChange(property, `${newValue}px`); // Reapply with 'px' at the end
    }
  };

  return (
    <FormGroup label={label}>
      <InputGroup
        value={value}
        onChange={handleChange}
        placeholder="Enter a number"
        type="number"
      />
    </FormGroup>
  );
};

export default renderNumericInput;
