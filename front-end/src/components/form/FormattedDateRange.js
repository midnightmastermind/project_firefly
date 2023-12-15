import React from "react";
import { Tag } from "@blueprintjs/core";
import { ArrowRight } from "@blueprintjs/icons";

const FormattedDateRange = ({ range, showTime = false }) => {
  if (range == null || !range[0] || !range[1]) {
    return <Tag minimal>No range</Tag>;
  }

  const [start, end] = range;

  return (
    <div className="docs-date-range">
      <Tag minimal={!showTime} intent="primary">
        {typeof start === "string" ? start : start.toLocaleDateString()}
        {showTime && ` ${start.toLocaleTimeString()}`}
      </Tag>
      <ArrowRight />
      <Tag minimal={!showTime} intent="primary">
        {typeof end === "string" ? end : end.toLocaleDateString()}
        {showTime && ` ${end.toLocaleTimeString()}`}
      </Tag>
    </div>
  );
};

export default FormattedDateRange;

