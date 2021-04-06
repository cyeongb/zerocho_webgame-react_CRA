import React, { memo } from "react";
import Td from "./Td";
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log("Tr  rendering");
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((v, i) => (
          <Td // useMemo(<Td></Td>,[rowData[i]]) 이렇게 컴포넌트를 기억할수도 있습니다 : 해당칸의 데이터가 바뀌었을때만 동작.
            key={i}
            dispatch={dispatch}
            rowIndex={rowIndex}
            cellIndex={i}
            cellData={rowData[i]}
          ></Td>
        ))}
    </tr>
  );
});

export default Tr;
