import React from "react";
import { Table, Column, Cell } from "@blueprintjs/table";

const ListTable = ({ data }) => {
  return (
    <Table numRows={data.length}>
      <Column name="Column 1">
        {(rowIndex) => <Cell>{data[rowIndex].column1}</Cell>}
      </Column>
      <Column name="Column 2">
        {(rowIndex) => <Cell>{data[rowIndex].column2}</Cell>}
      </Column>
      {/* Add more columns as needed based on your data structure */}
    </Table>
  );
};

export default ListTable;