import React, { Component } from "react";
//import "./response.css";
//import styled from "styled-components";

// styled.div`
//   width: 300px;
//   height: 200px;
//   text-align: center;
//   user-select: none;
//   .waiting{
//     background-color: aquamarine;
//     }
//     .ready{
//     background-color:yellowgreen;
//     color:brown;
//     }
//     .now{
//     background-color:palevioletred;
// }
// `;

class Response_clss extends Component {
  state = {
    state: "waiting",
    message: "click and start",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state } = this.state;

    if (state === "waiting") {
      timeout.current = setTimeout(() => {
        this.setState({
          state: "now",
          message: "CLICK NOW !!!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤
      this.setState({
        state: "ready",
        message: "색이 바뀌면 빨리 클릭하세요",
      });
    } else if (state === "ready") {
      //성급하게 클릭했을 시
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "실패ㅡ.ㅜ  아직 색이 안바꼈어요 ! ",
      });
    } else if (state === "now") {
      this.endTime.current = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          result: [...prevState.result, this.endTime, this.startTime],
          message: "반응속도 체크하기 GO! ",
        };
      });
    }
  };

  onReset = () => {
    this.setState({ result: [] });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균시간 : {result.reduce((a, c) => a + c / result.length)}ms</div>
        <button onClick={onReset}>RESET</button>
      </>
    );
  };
  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onclick={this.onClickScreen}>
          {message}
        </div>
        <div>{this.renderAverage()}</div>
      </>
    );
  }
}

export default Response_clss;
