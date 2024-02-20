import React, { useState } from 'react';
import { Button, Divider, FormGroup, HTMLSelect } from '@blueprintjs/core';

import FileManager from './FileManager';

const CsvMappingComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fieldMappings, setFieldsMappings] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [mappingObjects, setMappingObjects] = useState([
    { fieldName: 'ProductID', csvHeader: '' },
    ...fieldMappings,
  ]);

  const handleFileChange = (file) => {
    setSelectedFile(file);

    // Assuming FileManager provides a method to get file headers
    // Replace getHeadersFromCsv with the actual method from FileManager
    getHeadersFromCsv(file).then((headers) => {
      setFileHeaders(headers);
      initializeMappingObjects(headers);
    });
  };
  const getHeadersFromCsv = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const content = event.target.result;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
  
        resolve(headers);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsText(file);
    });
  };
  
  const initializeMappingObjects = (headers) => {
    const initialMappingObjects = fieldMappings.map((mapping) => ({
      ...mapping,
      csvHeader: '',
    }));

    setMappingObjects([{ fieldName: 'ProductID', csvHeader: '' }, ...initialMappingObjects]);
  };

  const handleHeaderChange = (index, selectedHeader) => {
    setMappingObjects((prevMappings) => {
      const newMappings = [...prevMappings];
      newMappings[index].csvHeader = selectedHeader;
      return newMappings;
    });
  };

  const renderMappingFields = () => {
    return mappingObjects.map((mapping, index) => (
      <FormGroup key={mapping.fieldName} label={mapping.fieldName} labelFor={`${mapping.fieldName}-dropdown`}>
        <HTMLSelect
          id={`${mapping.fieldName}-dropdown`}
          value={mapping.csvHeader}
          onChange={(e) => handleHeaderChange(index, e.target.value)}
        >
          <option value="" label="Select Header" />
          {fileHeaders.map((header) => (
            <option key={header} value={header} label={header} />
          ))}
        </HTMLSelect>
      </FormGroup>
    ));
  };

  return (
    <div>
      {!selectedFile && <FileManager onSelectFile={handleFileChange} />}
      {selectedFile && (
        <div>
          <Divider />
          <h3>Field Mapping</h3>
          {renderMappingFields()}
          <Divider />
          <Button intent="primary" onClick={() => console.log(mappingObjects)}>
            Save Mapping
          </Button>
        </div>
      )}
    </div>
  );
};

export default CsvMappingComponent;
