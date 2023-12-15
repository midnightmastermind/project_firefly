import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  InputGroup,
  Button,
  HTMLSelect,
  Checkbox,
  RadioGroup,
  Radio,
  FileInput,
  NumericInput,
  Switch,
  Slider,
  Popover
} from '@blueprintjs/core';
import { DateInput3, DateRangeInput3 } from '@blueprintjs/datetime2';
import { TimePicker } from '@blueprintjs/datetime';

import { ChromePicker } from 'react-color';
import 'react-datepicker/dist/react-datepicker.css';
import FormattedDateRange from './FormattedDateRange'; // Adjust the path accordingly

const getDefaultData = () => ({
  // ... (previous data remains unchanged)
  name: 'John Doe',
  gender: 'male',
  subscribe: true,
  paymentMethod: 'credit card',
  birthdate: new Date('1990-01-01'),
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  avatar: null, // File input (set to null for demonstration)
  favoriteColor: '#3498db', // Hex color code
  age: 25,
  password: 'securePassword',
  rating: 8,
  notifications: false,
  appointmentTime: new Date(),
  appointmentTimeRange: { range: [new Date(), new Date()] },
});

const getDefaultSchema = () => [
  // ... (previous field types remain unchanged)
  { type: 'text', variable: 'name', label: 'Name' },
  { type: 'select', variable: 'gender', label: 'Gender', options: ['male', 'female', 'other'] },
  { type: 'checkbox', variable: 'subscribe', label: 'Subscribe to Newsletter' },
  { type: 'radio', variable: 'paymentMethod', label: 'Payment Method', options: ['credit card', 'paypal'] },
  { type: 'header', label: 'Personal Information', headerOption: 'h2' },
  { type: 'date', variable: 'birthdate', label: 'Date of Birth' },
  { type: 'date-range', variable: 'dateRange', label: 'Date Range' },
  { type: 'textarea', variable: 'bio', label: 'Bio' },
  { type: 'file', variable: 'avatar', label: 'Avatar' },
  { type: 'color', variable: 'favoriteColor', label: 'Favorite Color' },
  { type: 'number', variable: 'age', label: 'Age' },
  { type: 'password', variable: 'password', label: 'Password' },
  { type: 'slider', variable: 'rating', label: 'Rating', min: 0, max: 10, step: 1 },
  { type: 'switch', variable: 'notifications', label: 'Receive Notifications' },
  { type: 'time', variable: 'appointmentTime', label: 'Appointment Time', allDayOption: true },
  { type: 'time-range', variable: 'appointmentTimeRange', label: 'Appointment Time Range', allDayOption: true },
];

const exampleTitle = 'ExampleForm';

const defaultCallbackFunction = (formData) => {
  console.log('Form Data:', formData);
};

const ColorPicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (color) => {
    onChange(color.hex);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={<ChromePicker color={value} onChange={handleColorChange} />}
    >
      <InputGroup
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => setIsOpen(true)}
        rightElement={
          <div style={{ backgroundColor: value, width: '20px', height: '20px', borderRadius: '50%' }} />
        }
      />
    </Popover>
  );
};

const DynamicForm = ({
  schema = getDefaultSchema(),
  callbackFunction = defaultCallbackFunction,
  data: externalData,
  title,
}) => {
  const [formData, setFormData] = useState(externalData || getDefaultData());

  useEffect(() => {
    setFormData(externalData || getDefaultData());
  }, [externalData]);

  const handleInputChange = (variable, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [variable]: value,
    }));
  };

  const handleDateChange = (variable, dateOrRange) => {
    // Check if it's a date range
    if (Array.isArray(dateOrRange)) {
      // If 'allDay' property exists, retain its value; otherwise, default to false
      const allDay = dateOrRange[0].allDay !== undefined ? dateOrRange[0].allDay : false;
      const updatedValue = { range: dateOrRange, allDay };
      handleInputChange(variable, updatedValue);
    } else {
      // If it's a single date, check if 'allDay' property exists in the current value
      const allDay = dateOrRange.allDay !== undefined ? dateOrRange.allDay : false;
      const updatedValue = dateOrRange.allDay !== undefined ? dateOrRange : { ...dateOrRange, allDay };
      handleInputChange(variable, updatedValue);
    }
  };

  return (
    <div className="form-component">
      <h2>{title || exampleTitle}</h2>
      {schema.map((field) => (
        <FormGroup key={field.variable} label={field.label}>
          {field.type === 'time' && !field.allDayOption && (
            <DateInput3
              value={formData[field.variable] || ''}
              formatDate={(date) => date.toLocaleTimeString()}
              parseDate={(str) => new Date(str)}
              onChange={(date) => handleDateChange(field.variable, date)}
              timePrecision="minute"
            />
          )}
          {field.type === 'datetime-range' && (
            <div>
              <Checkbox
                checked={formData[field.variable]?.allDay || false}
                onChange={(e) => {
                  const allDay = e.target.checked;
                  const existingRange = formData[field.variable]?.range || [];
                  const updatedValue = {
                    range: allDay ? [existingRange[0], existingRange[1]] : existingRange,
                    allDay,
                  };
                  handleInputChange(field.variable, updatedValue);
                }}
              >
                All Day
              </Checkbox>
              <DateRangeInput3
                value={formData[field.variable]?.range || []}
                formatDate={(date) => date.toLocaleDateString()}
                parseDate={(str) => new Date(str)}
                onChange={(selectedRange) => {
                  const allDay = formData[field.variable]?.allDay || false;
                  const updatedValue = {
                    range: allDay ? [selectedRange[0], selectedRange[1]] : selectedRange,
                    allDay,
                  };
                  handleInputChange(field.variable, updatedValue);
                }}
                timePrecision="minute"
                shortcuts={false}
                singleMonthOnly={true}
                allowSingleDayRange={true}
              />
              <FormattedDateRange range={formData[field.variable]?.range || []} showTime={!formData[field.variable]?.allDay} />
            </div>
          )}
          {field.type === 'header' && (
            <field.headerOption key={field.label}>
              {field.label}
            </field.headerOption>
          )}
          {field.type === 'text' && (
            <InputGroup
              type="text"
              value={formData[field.variable] || ''}
              onChange={(e) => handleInputChange(field.variable, e.target.value)}
            />
          )}
          {field.type === 'select' && (
            <HTMLSelect
              options={field.options}
              value={formData[field.variable] || ''}
              onChange={(e) => handleInputChange(field.variable, e.target.value)}
            />
          )}
          {field.type === 'checkbox' && (
            <Checkbox
              checked={formData[field.variable] || false}
              onChange={() => handleInputChange(field.variable, !formData[field.variable])}
            >
              {field.label}
            </Checkbox>
          )}
          {field.type === 'radio' && (
            <RadioGroup
              selectedValue={formData[field.variable] || ''}
              onChange={(e) => handleInputChange(field.variable, e.target.value)}
            >
              {field.options.map((option) => (
                <Radio key={option} label={option} value={option} />
              ))}
            </RadioGroup>
          )}
          {field.type === 'date' && (
            <DateInput3
              value={formData[field.variable] || ''}
              formatDate={(date) => date.toLocaleDateString()}
              parseDate={(str) => new Date(str)}
              onChange={(date) => handleDateChange(field.variable, date)}
            />
          )}
          {field.type === 'time' && !field.allDayOption && (
            <TimePicker
              value={formData[field.variable] || null}
              onChange={(selectedTime) => handleInputChange(field.variable, selectedTime)}
              precision="minute"
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              value={formData[field.variable] || ''}
              onChange={(e) => handleInputChange(field.variable, e.target.value)}
            />
          )}
          {field.type === 'file' && (
            <FileInput
              text={field.label}
              onInputChange={(e) => handleInputChange(field.variable, e.target.files[0])}
            />
          )}
          {field.type === 'color' && (
            <ColorPicker value={formData[field.variable] || ''} onChange={(color) => handleInputChange(field.variable, color)} />
          )}
          {field.type === 'number' && (
            <NumericInput
              value={formData[field.variable] || 0}
              onValueChange={(value) => handleInputChange(field.variable, value)}
            />
          )}
          {field.type === 'password' && (
            <InputGroup
              type="password"
              value={formData[field.variable] || ''}
              onChange={(e) => handleInputChange(field.variable, e.target.value)}
            />
          )}
          {field.type === 'slider' && (
            <Slider
              value={formData[field.variable] || 0}
              min={field.min || 0}
              max={field.max || 100}
              stepSize={field.step || 1}
              onChange={(value) => handleInputChange(field.variable, value)}
            />
          )}
          {field.type === 'switch' && (
            <Switch
              checked={formData[field.variable] || false}
              onChange={() => handleInputChange(field.variable, !formData[field.variable])}
            />
          )}
        </FormGroup>
      ))}
      <Button intent="primary" onClick={() => callbackFunction(formData)}>
        Submit
      </Button>
    </div>
  );
};

export default DynamicForm;
