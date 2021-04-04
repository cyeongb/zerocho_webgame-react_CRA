import React, { Component } from "react";
const rspCoords = {
  rock: "0",
  scissor: "-142px",
  paper: "-284px",
};

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

class Rsp_clss extends Component {
  // 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
  // (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
  // 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸
  state = {
    result: "",
    coord: rspCoords.rock,
    score: 0,
  };

  interval;

  componentDidMount() {
    // 컴포넌트가 처음! 성공적으로 렌더링 되면 이 메서드를 실행합니다.
    // 리렌더링이 일어나면 실행되지 않습니다.
    // 여기에 비동기 요청을 많이 합니다.
    console.log("componentDidMount()");
    this.interval = setInterval(this.changeHand, 400);
    //setInterval은 일정 시간마다 반복작업을 해 줍니다.
  }

  componentDidUpdate() {
    //컴포넌트가 re-rendering될때 실행됩니다.
    console.log("componentDidUpdate()");
  }

  componentWillUnmount() {
    //컴포넌트가 제거되기 직전,(부모 컴포넌트가 자식 컴포넌트를 제거할때) 비동기처리 요청정리를 많이 합니다.
    console.log("componentWillUnmount()");
    clearInterval(this.interval);
    // clearing을 안해주면 계속 돌아가서 메모리 부하가 됩니다.
  }

  changeHand = () => {
    const { coord } = this.state;

    if (coord === rspCoords.rock) {
      this.setState({ coord: rspCoords.scissor });
    } else if (coord === rspCoords.scissor) {
      this.setState({ coord: rspCoords.paper });
    } else if (coord === rspCoords.paper) {
      this.setState({ coord: rspCoords.rock });
    }
  };

  onClickBtn = (choice) => () => {
    // high oreder function :onClick 이벤트에 쓰이는 ()=> 를 컴포넌트에 붙여 쓸수 있습니다.
    const { coord } = this.state;

    clearInterval(this.interval); //클릭하면 멈춰서 누가 이겼는지 눈으로 확인하기 위함입니다.
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(coord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({ result: "비겼다!" });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼다!",
          score: prevState.score + 10, //이기면 옛날 점수에 10점을 더해줍니다.
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌다 ㅠㅠ ",
          score: prevState.score - 5,
        };
      });
    }
    setTimeout(() => {
      //결과 확인하는 시간
      this.interval = setInterval(this.changeHand, 100); //대결 후 잠깐 멈춰지고 다시 움직이게합니다.
    }, 1200);
  };

  render() {
    const { result, score, coord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://imgnn.seoul.co.kr/img/upload/2011/07/25/SSI_20110725110811_V.jpg) ${coord}0`,
          }}
        />
        <div>
          <button id="rock" className="btn_r" onClick={this.onClickBtn("rock")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn_s"
            onClick={this.onClickBtn("scissor")}
          >
            가위
          </button>
          <button
            id="paper"
            className="btn_p"
            onClick={this.onClickBtn("paper")}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>SCORE:{score}</div>
      </>
    );
  }
}

export default Rsp_clss;
