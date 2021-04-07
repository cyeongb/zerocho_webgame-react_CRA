import React, { useReducer, createContext, useMemo, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
export const CODE = {
  //지뢰 상태에 대한 코드
  MINE: -7, //지뢰있는칸
  NORMAL: -1, //일반 칸
  QUESTION: -2, // ?
  FLAG: -3, //깃발
  QUESTION_MINE: -4, //지뢰칸+깃발
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0이상이면 다  OPENED
};

export const TableContext = createContext({
  //createContext()는 함수.
  // tableContext에 default value를 넣어줄수 있습니다.
  // 초기값은 별 의미없으니 모양만 맞춤
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0, // 게임시간
  result: "",
  halted: true,
  opendedCoount: 0, //연 갯수
  data: {
    row: 0, //세로
    cell: 0, //가로
    mine: 0, //지뢰
  },
};

//지뢰배치함수
const plantMine = (row, cell, mine) => {
  console.log("가로:" + cell + "세로:" + row + "지뢰:" + mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      //0~98까지의 숫자배열 만듬
      return i;
    });

  const shuffledMine = [];
  while (candidate.length > row * cell - mine) {
    //지뢰 갯수만큼
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffledMine.push(chosen); //1개씩 지뢰갯수만큼 shuffledMine배열을 채웁니다
  }

  const data = [];

  for (let i = 0; i < row; i++) {
    const rowdata = [];
    data.push(rowdata);
    for (let j = 0; j < cell; j++) {
      rowdata.push(CODE.NORMAL); //NORMAL 칸으로 2차원 배열 만듬(100칸)
    }
  }

  //지뢰 크기만큼 랜덤으로 지뢰 심어주기[first,secnod]
  for (let k = 0; k < shuffledMine.length; k++) {
    const first = Math.floor(shuffledMine[k] / cell);
    const second = shuffledMine[k] % cell;
    data[first][second] = CODE.MINE;
  }
  return data; // == tableData
};

// ----------------------------------  action들
export const START_GAME = "START_GAME"; //게임 시작
export const OPEN_CELL = "OPEN_CELL"; //칸을 클릭
export const CLICK_MINE = "CLICK_MINE"; //지뢰를 클릭했을 때
export const FLAG_CELL = "FLAG_CELL"; //깃발 클릭
export const QUESTION_CELL = "QUESTION_CELL"; //물음표 클릭
export const NORMALIZE_CELL = "NORMALIZE_CELL"; //일반칸으로 되돌림
export const INCREMENT_TIMER = "INCREMENT_TIMER"; //시간 증가

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        // 지뢰심는 함수 plantMine
        data: { cell: action.cell, row: action.row, mine: action.mine },

        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false, //지뢰 클릭 시 게임 멈추는 용도
        timer: 0,
        result: "",
      };

    case OPEN_CELL: {
      const tableData = [...state.tableData]; //불변성을 유지하기위해 복사한 객체

      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      let openedCount = 0;
      console.log("tableData.length>" + tableData.length);

      const checkAround = (row, cell) => {
        console.log("row>" + row + "cell>" + cell);
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          return;
        }
        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][cell])
        ) {
          return;
        }
        if (checked.includes(row + "/" + cell)) {
          //한번 열었던 칸은 무시
          return;
        } else {
          checked.concat(row + "/" + cell);
          //열었던 칸이라고 표시.
        }
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]]; //연 칸의 주변칸

        if (tableData[row - 1]) {
          around = around.concat(
            [tableData[row - 1][cell - 1]],
            [tableData[row - 1][cell]],
            [tableData[row - 1][cell + 1]]
          );
        }
        if (tableData[row + 1]) {
          around = around.concat(
            [tableData[row + 1][cell - 1]],
            [tableData[row + 1][cell]],
            [tableData[row + 1][cell + 1]]
          );
        }

        const count = around.filter((v) => {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;

        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.concat([row - 1, cell - 1]);
              near.concat([row - 1, cell]);
              near.concat([row - 1, cell + 1]);
            }
            near.concat([row, cell - 1]);
            near.concat([row, cell + 1]);

            if (row + 1 < tableData.length) {
              near.concat([row + 1, cell - 1]);
              near.concat([row + 1, cell]);
              near.concat([row + 1, cell + 1]);
            }

            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]); //n[0]:row n[1]: cell
              }
            });
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };

      checkAround(action.row, action.cell);

      let halted = false;
      let result = "";

      if (
        state.data.row * state.data.cell - state.data.mine ===
        state.openedCount + openedCount
      ) {
        //지뢰빼고 다 열었으면 승리
        halted = true;
        result = `지뢰찾기 성공 ! | ${state.timer}초걸렸습니다`;
      }

      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }

    // 지뢰를 클릭했을 때
    case CLICK_MINE: {
      let result = "";
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE; //불변성을 지키기위해 두번에 걸쳐 데이터를 담음
      result = `지뢰찾기 실패 ! | ${state.timer}초걸렸습니다`;
      return {
        ...state,
        tableData,
        halted: true,
        result,
      };
    }

    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }

    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }

    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }

    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }

    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(
    () => ({
      tableData,
      halted,
      dispatch,
    }),
    [tableData, halted] //dispatch는 바뀌지 않습니다
  );

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <>
      <TableContext.Provider value={value}>
        {/**contextAPI가 Provider를 제공합니다.
         * <Provider>로 묶은 안에 컴포넌트들의 데이터에 접근할 수 있습니다.
         * value= 데이터 , 데이터들을 자식 컴포넌트에서 접근할수 있습니다
         * 다만 단점은, re-rendering이 될때마다 컴포넌트가 다시 만들어집니다.
         *  그 자식 컴포넌트들도 다 다시 만들어져서 성능이 떨어집니다
         * 그래서 useMemo로 캐싱을 해줍니다.
         * */}
        <Form />
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    </>
  );
};

export default MineSearch;
