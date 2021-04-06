import React, { useState, useRef, useEffect, memo } from "react";
import "./rsp.css";
const Rsp_func = memo(() => {
  const rspCoords = {
    rock: "0",
    scissor: "-140px",
    paper: "-280px",
  };

  const [result, setResult] = useState("");
  const [coord, setCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);
  const interval = useRef();
  //불필요한 렌더링을 막기위한 memo

  const scores = {
    scissor: 1,
    rock: 0,
    paper: -1,
  };

  const computerChoice = (coord) => {
    return Object.entries(rspCoords).find(function (v) {
      return v[1] === coord;
    })[0];
  };

  const changeHand = () => {
    console.log("이미지 좌표:" + coord);
    if (coord === rspCoords.rock) {
      setCoord(rspCoords.scissor);
    } else if (coord === rspCoords.scissor) {
      setCoord(rspCoords.paper);
    } else if (coord === rspCoords.paper) {
      setCoord(rspCoords.rock);
    }
  };

  const onClickBtn = (choice) => () => {
    // high oreder function :onClick 이벤트에 쓰이는 ()=> 를 컴포넌트에 붙여 쓸수 있습니다.
    if (interval.current) {
      clearInterval(interval.current); //클릭하면 멈춰서 누가 이겼는지 눈으로 확인하기 위함입니다.
      interval.current = null;
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(coord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비겼다!");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼다!");
        setScore((prevScore) => prevScore + 10);
      } else {
        setResult("졌다 ㅠㅠ");
        setScore((prevScore) => prevScore - 5);
      }
      setTimeout(() => {
        //결과 확인하는 시간
        interval.current = setInterval(changeHand, 100); //대결 후 잠깐 멈춰지고 다시 움직이게합니다.
      }, 1200);
    }
  };

  useEffect(() => {
    console.log("useEffect coord :", coord);
    //componentDidMount +componentDidUpdate 역할  특정 데이터가 바뀌면 계속 실행됩니다. setTimeout처럼.
    interval.current = setInterval(changeHand, 100);
    return () => {
      // return 은 componentWillUnMount 역할.
      clearInterval(interval.current); //클릭하면 멈춰서 누가 이겼는지 눈으로 확인하기 위함입니다.
    };
  }, [coord]); //이미지가 바뀔때마다 실행

  return (
    <>
      <div
        className="computer"
        style={{
          background: `url(https://sites.google.com/site/hafsrsp/_/rsrc/1468855017636/config/customLogo.gif?revision=2)${coord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn_r" onClick={onClickBtn("rock")}>
          바위
        </button>
        <button id="scissor" className="btn_s" onClick={onClickBtn("scissor")}>
          가위
        </button>
        <button id="paper" className="btn_p" onClick={onClickBtn("paper")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>SCORE:{score}</div>
    </>
  );
});

export default Rsp_func;
