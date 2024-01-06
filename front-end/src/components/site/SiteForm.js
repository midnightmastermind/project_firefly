import React from 'react';
import DynamicForm from 'components/form/Form'; // Adjust the path accordingly

const siteSchema = [
  { type: 'text', variable: 'title', label: 'Site Title' },
  { type: 'text', variable: 'domain', label: 'Domain' },
  { type: 'switch', variable: 'status', label: 'Site Status' },
];

const SiteForm = ({ callbackFunction, data, title }) => {
    console.log(data);
  return (
    <DynamicForm
      schema={siteSchema}
      callbackFunction={callbackFunction}
      data={data}
      title={title || 'Site Form'}
      soloSave
    />
  );
};

export default SiteForm;
