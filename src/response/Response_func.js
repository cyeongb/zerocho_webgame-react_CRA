import React, { useState, useCallback, useRef } from "react";
import "./response.css";
const Response_func = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("click and start");
  const [result, setResult] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  // hooks에서는 this의 속성들을 표현할 때 ref를 사용합니다.
  // ref에서는 값이 바뀌어도 렌더링 하지 않습니다. 변하는 값을 잠시 저장해 둡니다.
  const timeout = useRef(null);
  // const startTime = useRef(0);
  // const endTime = useRef(0);

  //useCallback 으로 데이터가 바뀔때만 컴포넌트를 실행하게 합니다.
  const onClickScreen = useCallback(() => {
    if (state === "waiting") {
      setTimeout(() => {
        let start = new Date();
        console.log("start.getUTCMilliseconds()>", start.getUTCMilliseconds());
        setState("now");
        setMessage("CLICK NOW !!!");
        setStartTime(start.getUTCMilliseconds());
        console.log("startTime>", startTime);
      }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤
      setState("ready");
      setMessage("색이 바뀌면 빨리 클릭하세요");
    } else if (state === "ready") {
      //성급하게 클릭했을 시
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("실패ㅡ.ㅜ  아직 색이 안바꼈어요 ! ");
    } else if (state === "now") {
      let end = new Date();
      console.log("end.getUTCMilliseconds()>", end.getUTCMilliseconds());
      setEndTime(end.getUTCMilliseconds());
      console.log("endTime>", endTime);
      setState("waiting");
      setMessage("반응속도 체크하기 GO! ");
      setResult((prevResult) => {
        return [...prevResult, endTime, startTime];
      });
    }
  }, [state]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  const renderAverage = () => {
    console.log("result > ", result);
    return result.length === 0 ? null : (
      <>
        <div>평균시간 : {result.reduce((a, c) => c - a)}ms</div>
        <button onClick={onReset}>RESET</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      <div>{renderAverage()}</div>
    </>
  );
};

export default Response_func;
