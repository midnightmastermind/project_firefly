import React from "react";
import { Button } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
export const CustomButton = ({ size, children }) => {
  const { connectors: {connect, drag} } = useNode();
  return <Button ref={ref => connect(drag(ref))} minimal={true} style={{ padding: "10px", margin: "5px" }} text={children} />;
};
