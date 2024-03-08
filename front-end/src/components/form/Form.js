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
  { type: 'text', name: 'name', label: 'Name' },
  { type: 'select', name: 'gender', label: 'Gender', options: ['male', 'female', 'other'] },
  { type: 'checkbox', name: 'subscribe', label: 'Subscribe to Newsletter' },
  { type: 'radio', name: 'paymentMethod', label: 'Payment Method', options: ['credit card', 'paypal'] },
  { type: 'header', label: 'Personal Information', headerOption: 'h2' },
  { type: 'date', name: 'birthdate', label: 'Date of Birth' },
  { type: 'date-range', name: 'dateRange', label: 'Date Range' },
  { type: 'textarea', name: 'bio', label: 'Bio' },
  { type: 'file', name: 'avatar', label: 'Avatar' },
  { type: 'color', name: 'favoriteColor', label: 'Favorite Color' },
  { type: 'number', name: 'age', label: 'Age' },
  { type: 'password', name: 'password', label: 'Password' },
  { type: 'slider', name: 'rating', label: 'Rating', min: 0, max: 10, step: 1 },
  { type: 'switch', name: 'notifications', label: 'Receive Notifications' },
  { type: 'time', name: 'appointmentTime', label: 'Appointment Time', allDayOption: true },
  { type: 'time-range', name: 'appointmentTimeRange', label: 'Appointment Time Range', allDayOption: true },
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
  const [noSaveState, setNoSaveState] = useState(false);
  useEffect(() => {
    if (externalData) {
      setFormData(externalData);
      setEditedFields({});
      setEditableFields([]);
    }
  }, [externalData]);

  useEffect(() => {
    setNoSaveState(noSave);
  }, [noSave])

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Track edits per field
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [name]: value !== externalData[name],
    }));
  };

  const handleDateChange = (name, dateOrRange) => {
    handleInputChange(name, dateOrRange);
  };

  const handleButtonClick = (name) => {
    if (!editableFields.includes(name)) {
      console.log("editing");
      setEditableFields([...editableFields, name]);
    }
  };

  const handleSaveField = (name) => {
    console.log(`save field: ${name}`);
    // Implement the logic to save the specific field

    // Remove the saved field from editableFields
    setEditableFields(editableFields.filter(item => item !== name));
  };

  console.log(soloSave);
  console.log(noSave);
  return (
    <div className="form-component-container">
      {title && <h2>{title}</h2>}
      <div className="form-component-wrapper">
        <div className="form-component">
          {schema.map((field) => (
            <FormGroup key={(field.variable || field.name)} label={
              <Tag
                minimal
                className="dynamic-form-label"
              >{field.label}</Tag>
            }
              className={`${soloSave ? 'solo-form-group' : ''}`}
            >
              <>
                {field.type.toLowerCase() === 'text' && (
                  <InputGroup
                    type="text"
                    disabled={soloSave && !editableFields.includes((field.variable || field.name))}
                    value={formData[(field.variable || field.name)] || ''}
                    onChange={(e) => handleInputChange((field.variable || field.name), e.target.value)}
                  />
                )}
                {field.type.toLowerCase() === 'time' && !field.allDayOption && (
                  <DateInput3
                    value={formData[(field.variable || field.name)] || ''}
                    formatDate={(date) => date.toLocaleTimeString()}
                    parseDate={(str) => new Date(str)}
                    onChange={(date) => handleDateChange((field.variable || field.name), date)}
                    timePrecision="minute"
                  />
                )}
                {field.type.toLowerCase() === 'datetime-range' && (
                  <div>
                    <Checkbox
                      checked={formData[(field.variable || field.name)]?.allDay || false}
                      onChange={(e) => {
                        const allDay = e.target.checked;
                        const existingRange = formData[(field.variable || field.name)]?.range || [];
                        const updatedValue = {
                          range: allDay ? [existingRange[0], existingRange[1]] : existingRange,
                          allDay,
                        };
                        handleInputChange((field.variable || field.name), updatedValue);
                      }}
                    >
                      All Day
                    </Checkbox>
                    <DateRangeInput3
                      value={formData[(field.variable || field.name)]?.range || []}
                      formatDate={(date) => date.toLocaleDateString()}
                      parseDate={(str) => new Date(str)}
                      onChange={(selectedRange) => {
                        const allDay = formData[(field.variable || field.name)]?.allDay || false;
                        const updatedValue = {
                          range: allDay ? [selectedRange[0], selectedRange[1]] : selectedRange,
                          allDay,
                        };
                        handleInputChange((field.variable || field.name), updatedValue);
                      }}
                      timePrecision="minute"
                      shortcuts={false}
                      singleMonthOnly={true}
                      allowSingleDayRange={true}
                    />
                    <FormattedDateRange
                      range={formData[(field.variable || field.name)]?.range || []}
                      showTime={!formData[(field.variable || field.name)]?.allDay}
                    />
                  </div>
                )}
                {field.type.toLowerCase() === 'header' && (
                  <field.headerOption key={field.label}>
                    {field.label}
                  </field.headerOption>
                )}
                {field.type.toLowerCase() === 'select' && (
                  <HTMLSelect
                    options={field.options}
                    value={formData[(field.variable || field.name)] || ''}
                    onChange={(e) => handleInputChange((field.variable || field.name), e.target.value)}
                  />
                )}
                {field.type.toLowerCase() === 'checkbox' && (
                  <Checkbox
                    checked={formData[(field.variable || field.name)] || false}
                    onChange={() => handleInputChange((field.variable || field.name), !formData[(field.variable || field.name)])}
                  >
                    {field.label}
                  </Checkbox>
                )}
                {field.type.toLowerCase() === 'radio' && (
                  <RadioGroup
                    selectedValue={formData[(field.variable || field.name)] || ''}
                    onChange={(e) => handleInputChange((field.variable || field.name), e.target.value)}
                  >
                    {field.options.map((option) => (
                      <Radio key={option} label={option} value={option} />
                    ))}
                  </RadioGroup>
                )}
                {field.type.toLowerCase() === 'date' && (
                  <DateInput3
                    value={formData[(field.variable || field.name)]}
                    //formatDate={(date) => date.toLocaleDateString()}
                    //parseDate={(str) => new Date(str)}
                    minDate={new Date('1900-01-01')}
                    onChange={(date) => handleDateChange((field.variable || field.name), date)}
                  />
                )}
                {field.type.toLowerCase() === 'time' && !field.allDayOption && (
                  // <TimePicker
                  //   value={formData[(field.variable || field.name)] || null}
                  //   onChange={(selectedTime) => handleInputChange((field.variable || field.name), selectedTime)}
                  //   precision="minute"
                  // />
                  <div>Time</div>
                )}
                {field.type.toLowerCase() === 'textarea' && (
                  <TextArea
                    value={formData[(field.variable || field.name)] || ''}
                    onChange={(e) => handleInputChange((field.variable || field.name), e.target.value)}
                  />
                )}
                {field.type.toLowerCase() === 'file' && (
                  <FileInput
                    text={"File"}
                    onInputChange={(e) => handleInputChange((field.variable || field.name), e.target.files[0])}
                  />
                )}
                {field.type.toLowerCase() === 'color' && (
                  <ColorPicker
                    value={formData[(field.variable || field.name)] || ''}
                    onChange={(color) => handleInputChange((field.variable || field.name), color)}
                  />
                )}
                {field.type.toLowerCase() === 'number' && (
                  <NumericInput
                    value={formData[(field.variable || field.name)] || 0}
                    onValueChange={(value) => handleInputChange((field.variable || field.name), value)}
                  />
                )}
                {field.type.toLowerCase() === 'password' && (
                  <InputGroup
                    type="password"
                    value={formData[(field.variable || field.name)] || ''}
                    onChange={(e) => handleInputChange((field.variable || field.name), e.target.value)}
                  />
                )}
                {field.type.toLowerCase() === 'slider' && (
                  <Slider
                    value={formData[(field.variable || field.name)] || 0}
                    min={field.min || 0}
                    max={field.max || 100}
                    stepSize={field.step || 1}
                    onChange={(value) => handleInputChange((field.variable || field.name), value)}
                  />
                )}
                {field.type.toLowerCase() === 'switch' && (
                  <Switch
                    checked={formData[(field.variable || field.name)] || false}
                    onChange={() => handleInputChange((field.variable || field.name), !formData[(field.variable || field.name)])}
                  />
                )}
              </>
              {soloSave && <Button
                minimal
                icon={editableFields.includes((field.variable || field.name)) ? "tick" : "edit"}
                intent={editedFields[(field.variable || field.name)] ? 'success' : 'none'}
                onClick={() => handleButtonClick((field.variable || field.name))}
                style={{ marginRight: '5px' }}
              />}
              {editableFields.includes((field.variable || field.name)) && (
                <Button
                  minimal
                  icon="cross"
                  intent="danger"
                  onClick={() => setEditableFields(editableFields.filter(item => item !== (field.variable || field.name)))}
                />
              )}
            </FormGroup>
          ))}
          {(!soloSave && !noSaveState) && (
            <Button intent="primary" onClick={() => callbackFunction(formData)}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;