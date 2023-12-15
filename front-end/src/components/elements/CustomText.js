import React from "react";
import { Text as BlueprintText } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
export const CustomText = ({ text, fontSize }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={ref => connect(drag(ref))}>
      <BlueprintText style={{ fontSize: `${fontSize}px` }}>{text}</BlueprintText>
    </div>
  );
};