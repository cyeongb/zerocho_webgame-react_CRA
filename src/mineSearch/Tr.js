import React, { useContext, memo } from "react";
import Td from "./Td";
import { TableContext } from "./MineSearch";

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[0] && //&& 한 이유는 tableData[0]이 undefined일수도 있기떄문에
        Array(tableData.length)
          .fill()
          .map((td, i) => <Td rowIndex={rowIndex} cellIndex={i} />)}
    </tr>
  );
});

export default Tr;
