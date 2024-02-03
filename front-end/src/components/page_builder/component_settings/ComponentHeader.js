import React from 'react';
import { Button } from '@blueprintjs/core';
import CogButton from '../CogButton'; // Assuming the CogButton component is in a separate file

const ComponentHeader = ({ onDelete }) => {
  return (
    <div className="component-header" style={{ position: 'absolute', width: '100%', justifyContent: 'space-between' }}>
      {/* CogButton */}
      <CogButton />

      {/* Delete Button */}
      <Button icon="delete" minimal onClick={onDelete} />
    </div>
  );
};

export default ComponentHeader;
