import React from "react";
import { Section } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
export const CustomContainer = ({ backgroundColor, padding = 0, children }) => {
  const { connectors: {connect, drag} } = useNode();
  return (
    <Section ref={ref => connect(drag(ref))} style={{ margin: "5px 0", backgroundColor, padding: `${padding}px` }}>
      {children}
    </Section>
  );
};
