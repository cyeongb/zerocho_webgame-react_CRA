import React, { useCallback, memo, useEffect, useRef } from "react";
import { CLICK_CELL } from "./Tictactoe"; // export한 action을 가져옵니다

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log("Td rendering");

  const onClickTd = useCallback(() => {
    console.log("rowIndex :" + rowIndex + " cellIndex :" + cellIndex);

    if (cellData) {
      //이미 클릭을 해서 해당 td에 cellData가 있으면 재생성 안되게 막습니다
      return;
    }

    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });

    //몇번째줄(row), 몇번째 칸(cell)을 클릭했는지에 대한 action을 만들어서 reducer에 전달합니다.
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
