import React from 'react';
import { Typography, Space } from 'antd';
import { useEditor } from '@craftjs/core';


const Toolbox = () => {
  const { connectors } = useEditor();

  const handleDragStart = (event, component) => {
    event.dataTransfer.setData('application/json', JSON.stringify({ component }));
  };

  return (
    <div style={{ padding: '16px' }}>
      <Space direction="vertical" size={12}>
        <Typography.Text>Drag to add</Typography.Text>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'CustomButtonComponent')}
          style={{ border: '1px solid #000', padding: '8px' }}
        >
          Button
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'CustomTextComponent')}
          style={{ border: '1px solid #000', padding: '8px' }}
        >
          Text
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'CustomInputComponent')}
          style={{ border: '1px solid #000', padding: '8px' }}
        >
          Input
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'CustomCardComponent')}
          style={{ border: '1px solid #000', padding: '8px' }}
        >
          Card
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'CustomImageComponent')}
          style={{ border: '1px solid #000', padding: '8px' }}
        >
          Image
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'CustomVideoComponent')}
          style={{ border: '1px solid #000', padding: '8px' }}
        >
          Video
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'CustomSoundComponent')}
          style={{ border: '1px solid #000', padding: '8px' }}
        >
          Sound
        </div>
      </Space>
    </div>
  );
};

export default Toolbox;