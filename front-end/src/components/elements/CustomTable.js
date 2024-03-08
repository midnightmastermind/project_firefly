import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Column, Table2, Cell, TableLoadingOption, EditableCell2 } from "@blueprintjs/table";
import { HotkeysProvider } from "@blueprintjs/core";

const loadingOptions = [TableLoadingOption.CELLS,TableLoadingOption.COLUMN_HEADERS,TableLoadingOption.ROW_HEADERS];

const CustomTable = (props) => {
    const footerTheme = useSelector((state) => state.theme.footer);
    const [data, setData] = useState(null);
    const [numDataRows, setNumDataRows] = useState(0);

    useEffect(() => {
        let fetchedData = props.data;
        if (fetchedData) {
          setData(fetchedData);
          setNumDataRows(fetchedData.length);
        }
    }, [props]);

    const handleClick = (selection) => {
      if (props.cellClick) {
        props.cellClick(data[selection[0].rows[0]]);
      }
    }
    const createCell = (columnData) => (rowIndex) => {
        if (!data[rowIndex])
          return

        return (
          <Cell className="custom-table-cell" key={rowIndex + columnData}>{data[rowIndex][columnData]}</Cell>
        );
      };
      
      const createColumn = (columnData, colIndex) => {
        console.log(columnData, colIndex);
        return (
          <Column
            className="custom-table-column"
            name={columnData}
            key={colIndex}
            cellRenderer={createCell(columnData)}
          />
        );
      };

      const infiniteLoad = ({ rowIndexEnd }) => {
        console.log(rowIndexEnd);
        rowIndexEnd + 1 >= data.length && setNumDataRows(numDataRows + 200);
      }
      const createColumns = (columnsData) => {
        console.log(columnsData[0])
        return columnsData ? Object.keys(columnsData[0]).map(createColumn) : [];
      };

      const createTable = (data, numDataRows) => {
        return (
          <HotkeysProvider>
            <Table2 onVisibleCellsChange={infiniteLoad} className="custom-table" numRows={data.length} onSelection={handleClick}>
              {createColumns(data)}
            </Table2>
          </HotkeysProvider>
        );
      };
    console.log(data);
  
    return (
        <div className="table-container" css={css`
            background-color: ${footerTheme.backgroundColor};
            color: ${footerTheme.color};
            bottom: 0px;
            height: 500px;
        `}>
            {data && data.length > 0 && createTable(data, numDataRows)}
        </div>
    );
}

export default CustomTable;
