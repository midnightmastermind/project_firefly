
import React from "react";
import { CustomText } from "./CustomText";
import { CustomButton } from "./CustomButton";
import { CustomContainer } from "./CustomContainer";
import { useNode } from "@craftjs/core";
import { Card } from "@blueprintjs/core";

export const CustomCard = ({ backgroundColor, padding = 20 }) => {
  const { connectors: {connect, drag} } = useNode();
  return (
    <Card ref={ref => connect(drag(ref))} backgroundColor={backgroundColor} padding={padding}>
      <div className="text-only">
        <CustomText text="Title" fontSize={20} />
        <CustomText text="Subtitle" fontSize={15} />
      </div>
      <div className="buttons-only">
        <CustomButton size="small">Learn more</CustomButton>
      </div>
    </Card>
  );
};