import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";
import "./tictacto.css";

//const [state, dispatch] = useReducer(reducer, initialState);

const initialState = {
  //state들의 모음
  winner: "",
  turn: "O",
  tableData: [
    //3x3 2차원배열
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1], //recentCell 초기값으로 없는 칸으로 설정
};

//action이름은 상수로 밖에 빼놓는것이 좋습니다.
// export를 붙여서 모듈로 만듭니다.
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  //action이 실행될때 state값을 변경하고 싶을때 reducer를 사용합니다.
  //action이 dipatch될때마다 실행=> action의 type별로 action(winner값 변경하는 액션)을 실행합니다.
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state, //state값 복사해서 새로운 state객체 만듬(불변성 유지 ! )
        winner: action.winner, //그리고 바뀌는 부분만 바꾼다
        //state.winner = action.winner 이렇게 객체에 직접 대입은ㄴㄴ x
      };

    case CLICK_CELL: {
      const tableData = [...state.tableData]; //tableData에 데이터를 넣기 위해서 얕은복사를 먼저 해줍니다
      tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결할 수 있습니다.
      tableData[action.row][action.cell] = state.turn; //현재 턴
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell], // 현재 클릭한 cell의 데이터 기억하기
      };
    }

    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O", //기존 턴이 O면 X로바꿈 아니면 O로,
      };
    }

    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const Tictactoe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    // 컴포넌트에 넣는 함수들은 다 useCallback을 사용합니다.
    dispatch({ type: SET_WINNER, winner: "O" }); //dispatch안에 들어가는것들은 action 객체입니다.
    //dispatch는 비동기이기때문에 현재 state값을 확인해보면 바뀌기 전의 state값을 확인할수 있습니다.(state값이 비동기적으로 작용)
    //이게 실행되면 action객체들을 전달해주는데, 이 action객체가 dispatch될때마다 reducer함수가 실행됩니다.
  }, []);

  //비동기인 state를 처리할때는 useEffect를 사용합니다.
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      // row가 마이너스이면 실행 x
      return;
    }
    let win = false;
    //이기는 8가지의 경우를 체크합니다
    if (
      // 가로줄 검사
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      // 새로줄 검사
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      //대각선
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    console.log("win >" + win + "tableData >" + tableData);
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
      //현재 turn인 사람이 winner
    } else {
      let all = true;

      // 무승부검사 : 테이블이 다 찼는지
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            //일단 칸이 다 차있다고 설정해놓고, tableData의 모든 칸을 검사해서 하나라도 비었으면 all을 false로 변경
            all = false;
          }
        });
      });

      if (all) {
        //모든 칸이 다 찼을경우 게임 리셋
        dispatch({ type: SET_WINNER, winner: null });
        dispatch({ type: RESET_GAME });
      } else {
        //클릭해서 이긴게 아니면 턴이 바뀝니다
        dispatch({ type: CHANGE_TURN }); //dispatch될때마다 턴이 바뀝니다
      }
    }
  }, [recentCell]);
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default Tictactoe;
