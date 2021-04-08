import React, { useState, useCallback, useContext, memo } from "react";
import { START_GAME, TableContext } from "./MineSearch";

const Form = memo(() => {
  const [row, setRow] = useState(10); //세로
  const [cell, setCell] = useState(10); //가로
  const [mine, setMine] = useState(row + cell);

  const { dispatch } = useContext(TableContext);

  // contextAPI를 useContext로 가져와서 사용
  const value = useContext(TableContext);

  //row
  const onChangeRow = useCallback((e) => {
    setRow(e.currentTarget.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.currentTarget.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.currentTarget.value);
  }, []);

  const onClickBtn = useCallback(
    (e) => {
      //클릭할때 전해줄 데이터들 = action
      dispatch({ type: START_GAME, row, cell, mine });
    },
    [row, cell, mine]
  );

  return (
    <>
      <input
        type="number"
        placeholder="세로길이"
        value={row}
        onChange={onChangeRow}
      />
      <input
        type="number"
        placeholder="가로길이"
        value={cell}
        onChange={onChangeCell}
      />
      <input
        type="number"
        placeholder="지뢰수"
        value={mine}
        onChange={onChangeMine}
      />
      <button onClick={onClickBtn}>START!</button>
    </>
  );
});

export default Form;
