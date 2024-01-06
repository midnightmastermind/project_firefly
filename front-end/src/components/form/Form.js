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
  Popover,
  Tag,
  TextArea
} from '@blueprintjs/core';
import { DateInput3, DateRangeInput3 } from '@blueprintjs/datetime2';
import { TimePicker } from '@blueprintjs/datetime';

import { ChromePicker } from 'react-color';
import 'react-datepicker/dist/react-datepicker.css';
import FormattedDateRange from './FormattedDateRange'; // Adjust the path accordingly

const exampleTitle = 'ExampleForm';

const getDefaultData = () => ({
  name: 'John Doe',
  gender: 'male',
  subscribe: true,
  paymentMethod: 'credit card',
  birthdate: '1990-01-01',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  avatar: null,
  favoriteColor: '#3498db',
  age: 25,
  password: 'securePassword',
  rating: 8,
  notifications: false,
  appointmentTime: new Date(),
  appointmentTimeRange: { range: [new Date(), new Date()] },
});

const getDefaultSchema = () => [
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
  soloSave = false,
  noSave = false
}) => {
  const [formData, setFormData] = useState(externalData || getDefaultData());
  const [editedFields, setEditedFields] = useState({});
  const [editableFields, setEditableFields] = useState([]);

  useEffect(() => {
    if (externalData) {
      setFormData(externalData);
      setEditedFields({});
      setEditableFields([]);
    }
  }, [externalData]);

  const handleInputChange = (variable, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [variable]: value,
    }));

    // Track edits per field
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [variable]: value !== externalData[variable],
    }));
  };

  const handleDateChange = (variable, dateOrRange) => {
    handleInputChange(variable, dateOrRange);
  };

  const handleButtonClick = (variable) => {
    if (!editableFields.includes(variable)) {
      console.log("editing");
      setEditableFields([...editableFields, variable]);
    }
  };

  const handleSaveField = (variable) => {
    console.log(`save field: ${variable}`);
    // Implement the logic to save the specific field

    // Remove the saved field from editableFields
    setEditableFields(editableFields.filter(item => item !== variable));
  };

  return (
    <div className="form-component">
      {title && <h2>{title}</h2>}
      {schema.map((field) => (
        <FormGroup key={field.variable} label={
            <Tag
              minimal
              className="dynamic-form-label"
            >{field.label}</Tag>
          }
          className={`${soloSave ? 'solo-form-group' : ''}`}
        >
          <>
            {field.type === 'text' && (
              <InputGroup
                type="text"
                disabled={soloSave && !editableFields.includes(field.variable)}
                value={formData[field.variable] || ''}
                onChange={(e) => handleInputChange(field.variable, e.target.value)}
              />
            )}
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
                <FormattedDateRange
                  range={formData[field.variable]?.range || []}
                  showTime={!formData[field.variable]?.allDay}
                />
              </div>
            )}
            {field.type === 'header' && (
              <field.headerOption key={field.label}>
                {field.label}
              </field.headerOption>
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
                value={formData[field.variable]}
                //formatDate={(date) => date.toLocaleDateString()}
                //parseDate={(str) => new Date(str)}
                minDate={new Date('1900-01-01')}
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
              <TextArea
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
              <ColorPicker
                value={formData[field.variable] || ''}
                onChange={(color) => handleInputChange(field.variable, color)}
              />
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
          </>
          {soloSave && <Button
            minimal
            icon={editableFields.includes(field.variable) ? "tick" : "edit"}
            intent={editedFields[field.variable] ? 'success' : 'none'}
            onClick={() => handleButtonClick(field.variable)}
            style={{ marginRight: '5px' }}
          />}
          {editableFields.includes(field.variable) && (
            <Button
              minimal
              icon="cross"
              intent="danger"
              onClick={() => setEditableFields(editableFields.filter(item => item !== field.variable))}
            />
          )}
        </FormGroup>
      ))}
      {(!soloSave || !noSave)  && (
        <Button intent="primary" onClick={() => callbackFunction(formData)}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default DynamicForm;