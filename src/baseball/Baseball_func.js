import React, { useState, createRef, memo } from "react";
import Try from "./Try";
const Baseball_func = () => {
  const getNumbers = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
      const pick = numbers.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(pick);
    }
    return array;
  };

  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const [count, setCount] = useState(0);

  const onChangeInput = (e) => {
    console.log("answer > ", answer);
    setValue(e.currentTarget.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (value === answer.join("")) {
      setResult("Home Run ⚾");
      setTries([...tries, { try: value, result: "Home Run ⚾!!" }]);

      alert(`${value} 홈런 ! 한판 더?`);

      setValue("");
      setAnswer(getNumbers());
      setTries([]);

      inputRef.current.focus();
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        //10번 이상 틀리면 -- 게임오버
        setResult(`FAIL !  답 : ${answer.join(",")}`);

        alert("Continue?");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);

        inputRef.current.focus();
      } else {
        // 숫자 입력 시 10번 이내 기회 제공
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1; //위치와 숫자가 맞으면 스트라이크
          } else if (answer.includes(answerArray[i])) {
            ball += 1; // 숫자만 포함되어있으면 볼
          }
        }
        setTries([
          ...tries,
          { try: value, result: `Strike : ${strike} , Ball : ${ball} ` },
        ]);
        setValue("");

        inputRef.current.focus();
      }
    }
    setCount(count + 1);
  };

  const inputRef = createRef();

  return (
    <>
      <h1>결과 :{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          maxLength={4}
          placeholder="숫자 4자리를 적으세요"
          value={value}
          onChange={onChangeInput}
        />
      </form>
      <div>총 시도 : {tries.length}</div>
      <p>
        10번 넘게 시도하면 실패입니다.
        <br />
        {10 - count}번 남았습니다.
      </p>
      <ol type="1">
        {tries.map((v, i) => {
          //key 값에는 index값을 사용하는걸 지양함. key를 기준으로 데이터가 수정,삭제되기때문에 문제가 생긴다고 함
          return <Try key={i} tryInfo={v} />;
        })}
      </ol>
    </>
  );
};

export default memo(Baseball_func);
