import React from 'react';
import { Card, Button, Slider, H5, Tag } from "@blueprintjs/core";

export const SettingsPanel = () => {  
  return  (    
    <Card style={{ background: "rgba(0, 0, 0, 0.06)", marginTop: "16px", padding: "16px" }}>
      <div style={{ paddingBottom: "16px" }}>
        <H5>Selected</H5>
        <Tag intent="primary">Selected</Tag>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <H5>Prop</H5>
        <Slider
          min={7}
          max={50}
          stepSize={1}
          labelStepSize={10}
        />
      </div>
      <Button intent="danger" text="Delete" />
    </Card>
  ) 
}
