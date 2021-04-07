import React, { useState, useCallback, useContext } from "react";
import { TableContext } from "./MineSearch";

const Form = () => {
  const [ver, setVer] = useState(10); //세로
  const [hor, setHor] = useState(10); //가로
  const [mine, setMine] = useState(ver + hor);

  // contextAPI를 useContext로 가져와서 사용
  const value = useContext(TableContext);

  //row
  const onChangeVer = useCallback((e) => {
    setVer(e.currentTarget.value);
  }, []);

  const onChangeHor = useCallback((e) => {
    setHor(e.currentTarget.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.currentTarget.value);
  }, []);

  const onClickBtn = useCallback(
    (e) => {
      //클릭할때 전해줄 데이터들 = action
      dispatch({ type: START_GAME, ver, hor, mine });
    },
    [ver, hor, mine]
  );

  return (
    <>
      <input
        type="number"
        placeholder="세로길이"
        value={ver}
        onChange={onChangeVer}
      />
      <input
        type="number"
        placeholder="가로길이"
        value={hor}
        onChange={onChangeHor}
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
};

export default Form;
