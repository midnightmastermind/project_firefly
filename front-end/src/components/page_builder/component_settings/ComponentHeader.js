import React from 'react';
import { Button } from '@blueprintjs/core';
import CogButton from '../CogButton'; // Assuming the CogButton component is in a separate file

const ComponentHeader = ({ element, editComponent, onRemoveItem }) => {
  return (
    <div className="component-header">
      {/* CogButton */}
      <CogButton element={element} editComponent={editComponent}/>

      {/* Delete Button */}
      <Button className="delete-button" icon="delete" minimal onClick={() => onRemoveItem(element.i)} />
    </div>
  );
};

export default ComponentHeader;
