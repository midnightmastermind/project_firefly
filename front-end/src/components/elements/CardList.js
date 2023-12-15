import React, { useState } from 'react';
import { Card, Elevation, Icon, Dialog, Classes } from '@blueprintjs/core';

const CardList = ({ data, displayParams }) => {
  const [selectedData, setSelectedData] = useState(null);

  const handleCogClick = (rowData) => {
    setSelectedData(rowData);
  };

  const handleCloseDialog = () => {
    setSelectedData(null);
  };

  // Function to render a single row based on the specified type
  const renderRow = (rowData, displayParams) => {
    return (
      <Card elevation={Elevation.TWO} style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {displayParams.map(param => (
            <div key={param.type} style={{ marginRight: '10px' }}>
              {renderColumn(param.type, rowData[param.key])}
            </div>
          ))}

          {/* Cog Icon for Dialog */}
          <Icon icon="cog" iconSize={20} className={Classes.INTENT_PRIMARY} onClick={() => handleCogClick(rowData)} />
        </div>
      </Card>
    );
  };

  // Function to render a single column based on the specified type
  const renderColumn = (type, value) => {
    switch (type) {
      case 'image':
        return <img src={value} alt="item" style={{ maxWidth: '100%' }} />;
      case 'content':
        return <p>{value}</p>;
      case 'text':
        return <span>{value}</span>;
      default:
        return null;
    }
  };

  // Dialog for displaying content
  const renderDialog = () => {
    return (
      <Dialog
        isOpen={selectedData !== null}
        title={`Details for ${selectedData ? selectedData.id : ''}`}
        onClose={handleCloseDialog}
        className={Classes.DARK}
      >
        {/* Display content based on the selected data and displayParams */}
        {selectedData && (
          <div>
            {displayParams.map(param => (
              <div key={param.type} style={{ marginBottom: '10px' }}>
                <strong>{param.type}:</strong> {selectedData[param.key]}
              </div>
            ))}
          </div>
        )}
      </Dialog>
    );
  };

  return (
    <div>
      {Object.values(data).map(rowData => renderRow(rowData, displayParams))}
      {renderDialog()}
    </div>
  );
};

export default CardList;
