import React, { Component } from "react";
import Ball from "./Ball";

function getNumbers() {
  console.log("getNumbers()");
  const candidate = Array(45) //45크기의 배열
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      //셔플: 매번 숫자를 섞어서 그 중 첫번째 숫자를 shuffle이라는 배열에 담습니다.
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1]; //마지막 숫자를 보너스숫자로
  const lottoNums = shuffle.slice(0, 6).sort((a, b) => a - b); //오름차순
  return [...lottoNums, bonusNumber];
}

class Lotto_clss extends Component {
  state = {
    lottoNums: getNumbers(), //당첨 숫자를 미리 뽑아놓습니다
    lottoNumber: [], //당첨 숫자중  앞의 6개 숫자
    bonus: null, //보너스 7번째 숫자
    redo: false, //재실행
  };
  timeouts = [];

  runTimeouts = () => {
    //6개 당첨숫자
    console.log("runTimeouts()");
    const { lottoNums } = this.state; //this.state는 이렇게 구조분해하는게 보기에 좋습니다.
    for (let i = 0; i < lottoNums.length - 1; i++) {
      //먼저 보너스공 제외하고 공 6개를 가져옵니다.
      this.timeouts[i] = setTimeout(() => {
        //lottoNumber배열에 lottoNums에서 담아놓은 숫자 6개를 담습니다.
        this.setState((prevState) => {
          return {
            lottoNumber: [...prevState.lottoNumber, lottoNums[i]],
            //push로 하는게 아니라, 예전 state 값을 이용해서 새로운 배열에 데이터를 담습니다
          };
        });
      }, (i + 1) * 1000); //첫번째공은 1초, 두번째공은 2초.. 이렇게 나타납니다.
    }
    this.timeouts[6] = setTimeout(() => {
      //7번째 보너스숫자
      this.setState({
        bonus: lottoNums[6],
        redo: true,
      });
    }, 8000);
  };

  componentDidMount() {
    //첫번째 렌더링시 동작
    console.log("componentDidMount()");
    this.runTimeouts();
    console.log("로또 숫자 생성중..");
  }

  componentDidUpdate(pevProps, prevState) {
    //setState할때마다 실행됩니다.
    console.log("componentDidUpdate()");
    if (this.state.lottoNumber.length === 0) {
      //lottoNumber배열에 아무 숫자도 안담겨있는경우에 실행합니다
      // onClickRedo를 눌렀을때 실행됩니다.
      this.runTimeouts();
    }
    if (prevState.lottoNums !== this.state.lottoNums) {
      console.log("로또 숫자 생성중..");
    }
    console.log("로또 숫자 생성중..");
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
      //setTimeout은 잘못되면 메모리 문제가 생길수 있기때문에 컴포넌트가 없어지는 과정에서 clear를 해주어야합니다.
    });
  }

  onClickRedo = () => {
    //클릭시 처음 state로 초기화.
    console.log("onClickRedo()");

    this.setState({
      lottoNums: getNumbers(),
      lottoNumber: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    return (
      <>
        <h2>L O T T O 💲🔴🟠🟡🟢🔵🟣</h2>
        <div id="result">
          {lottoNumber.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <h2>BONUS ! 🔻 </h2>
        <div>
          {bonus && <Ball number={bonus} />}
          {redo && <Button onClick={this.onClickRedo}>one more?</Button>}
          {/* redo=true이면 onClickRedo버튼이 활성화 됩니다. */}
        </div>
      </>
    );
  }
}

export default Lotto_clss;
