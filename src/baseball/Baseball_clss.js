import React, { PureComponent, createRef } from "react";
//PureComponent : shouldComponentUpdate기능을 구현한 컴포넌트로, 바뀐 컴포넌트만 업데이트 함 하지만 객체나 배열판단은 어려움
import Try from "./Try";

function getNumbers() {
  //숫자 4개를  겹치지않고 랜덤하게 뽑는 함수

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const pick = numbers.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(pick);
  }
  return array;
}

class Baseball_clss extends PureComponent {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
    count: 0,
  };

  onChangeInput = (e) => {
    console.log("this.state.answer > ", this.state.answer);
    this.setState({ value: e.target.value });
  };

  onSubmitForm = (e) => {
    const { value, answer, tries } = this.state;
    e.preventDefault();

    if (value === answer.join("")) {
      this.setState((prevState) => {
        return {
          //게임 성공 시
          result: "Home Run ⚾",
          tries: [...prevState.tries, { try: value, result: "Home Run ⚾!!" }],
        };
      }); //push 대신 새로운 배열 만듬

      alert(`${value} 홈런 ! 한판 더?`);

      this.setState({ value: "", answer: getNumbers(), tries: [] }); //게임 리셋
      this.inputRef.current.focus();
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        //10번 이상 틀리면 -- 게임오버
        this.setState({
          result: `FAIL !  답 : ${answer.join(",")}`,
        });
        alert("Continue?");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        // 숫자 입력 시 10번 이내 기회 제공
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1; //위치와 숫자가 맞으면 스트라이크
          } else if (answer.includes(answerArray[i])) {
            ball += 1; // 숫자만 포함되어있으면 볼
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `Strike : ${strike} , Ball : ${ball} `,
              },
            ],
            value: "",
          };
        });
        this.inputRef.current.focus();
      }
    }
    this.state.count += 1;
  };

  inputRef = createRef();

  render() {
    const { result, value, tries } = this.state;

    return (
      <>
        <h1>결과 : {result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>TRY :{tries.length}</div>
        <p>
          {" "}
          10번 넘게 시도하면 실패입니다.
          <br />
          {10 - this.state.count}번 남았습니다
        </p>
        <ol type="1">
          {tries.map((v, i) => {
            //key 값에는 index값을 사용하는걸 지양함. key를 기준으로 데이터가 수정,삭제되기때문에 문제가 생긴다고 함
            return <Try key={i} tryInfo={v} />;
          })}
        </ol>
      </>
    );
  }
}

export default Baseball_clss;
