import React from "react";
import Tr from "./Tr";
const Table = ({ tableData, dispatch }) => {
  console.log("table rendering");
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          //Array(tableData.length).fill() => 길이가 3인 배열을 만듭니다.
          .fill()
          .map((tr, i) => (
            <Tr
              key={i}
              dispatch={dispatch}
              rowIndex={i}
              rowData={tableData[i]}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
