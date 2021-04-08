import React, { useContext, useCallback, memo } from "react";
import {
  CLICK_MINE,
  CODE,
  FLAG_CELL,
  NORMALIZE_CELL,
  OPEN_CELL,
  QUESTION_CELL,
  TableContext,
} from "./MineSearch";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "black",
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: "white",
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: "yellow",
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: "red",
      };
    default:
      return {
        background: "white",
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "지뢰";
    case CODE.CLICKED_MINE:
      return "💥";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "🚩";

    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return "❔";
    default:
      return code || ""; //return이 0 이면 빈칸
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  // table 데이터는 contextAPI를 이용해서 받고,
  // 몇번째 줄,칸인지는 props를 이용해서 표시합니다

  const onClickTd = useCallback(() => {
    if (halted) {
      //게임이 끝남
      return;
    }
    // eslint-disable-next-line default-case
    switch (
      tableData[rowIndex][cellIndex] //클릭 시 cell 상태별 분기처리
    ) {
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return; //이 칸들은 클릭 안되게

      case CODE.NORMAL: {
        //일반칸은 누르면  OPEN_CELL
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      }
      case CODE.MINE: {
        //지뢰칸을 누르면 CLICK_MINE
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      }
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  // 오른쪽 클릭
  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault(); //우클릭 시 메뉴뜨기 방지

      if (halted) {
        return;
      }

      // case에 따라 서로 순환이 됩니다
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          return;

        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          return;

        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted]
  );
  return (
    <RealTd
      onClickTd={onClickTd}
      onRightClickTd={onRightClickTd}
      data={tableData[rowIndex][cellIndex]}
    />
  );
});
const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
  console.log("realTd rendering");
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(data)}
    </td>
  );
});

export default Td;
