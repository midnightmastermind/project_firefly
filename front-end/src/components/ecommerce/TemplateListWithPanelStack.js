import React, { useState } from 'react';
import { CardList, Button, Classes } from '@blueprintjs/core';
import TemplateForm from './TemplateForm';
import { PanelStack2 } from '@blueprintjs/core';

const Template = ({ data, onTemplateClick }) => {
  const handleClick = () => {
    onTemplateClick(data);
  };

  return (
    <div onClick={handleClick} style={{ marginBottom: '10px', cursor: 'pointer' }}>
      <h3>{data.name}</h3>
      <p>ID: {data.id}</p>
      <p>Description: {data.description}</p>
      <p>Price: {data.price}</p>
      <p>Image: {data.image}</p>
    </div>
  );
};

const TemplateListWithPanelStack = ({ templateList, displayParams }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const TemplatePanelStack = () => {
    const [currentPanelStack, setCurrentPanelStack] = useState([
      {
        component: () => (
          <TemplateForm templateData={selectedTemplate || {}} />
        ),
        title: selectedTemplate ? 'Edit Template' : 'Add New Template',
      },
    ]);

    const addToPanelStack = (panel) => {
      setCurrentPanelStack((prevStack) => [...prevStack, panel]);
    };

    const removeFromPanelStack = () => {
      setCurrentPanelStack((prevStack) => prevStack.slice(0, -1));
    };

    return (
      <div>
        <PanelStack2
          className="docs-panel-stack-example"
          onOpen={addToPanelStack}
          onClose={removeFromPanelStack}
          renderActivePanelOnly={true}
          stack={currentPanelStack}
        />
        <div className={Classes.DIALOG_FOOTER}>
          <Button onClick={removeFromPanelStack}>Back to List</Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Button intent="primary" onClick={() => handleTemplateClick({})}>
        Add New Template
      </Button>
      <CardList className="new-template-list">
        {templateList.map((template) => (
          <Template key={template.id} data={template} onTemplateClick={handleTemplateClick} />
        ))}
      </CardList>
      {selectedTemplate && <TemplatePanelStack />}
    </div>
  );
};

export default TemplateListWithPanelStack;
