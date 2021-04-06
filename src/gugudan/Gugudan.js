import React, { useState, useRef } from "react";

const Gugudan = () => {
  const [firstNum, setFirstNum] = useState(Math.ceil(Math.random() * 9));
  const [secondNum, setSecondNum] = useState(Math.ceil(Math.random() * 9));
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (parseInt(input) === firstNum * secondNum) {
      setResult("ANSWER:" + input);
      setFirstNum(Math.ceil(Math.random() * 9));
      setSecondNum(Math.ceil(Math.random() * 9));
      setInput("");
      setCount(count + 1);
      ref.current.focus();
    } else {
      setResult("WRONG!");
      ref.current.focus();
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <h2>Gu gu dan Question</h2>
      <form onSubmit={onSubmit}>
        <div>
          {firstNum} X {secondNum} =
          <input
            ref={ref}
            type="number"
            placeholder="answer"
            value={input}
            onChange={onChange}
          />
        </div>

        <button onClick={onSubmit}>ANSWER</button>
      </form>
      <div>CORRECT COUNT :{count}</div>
      <div className="rs">
        <b>{result}</b>
      </div>
    </>
  );
};

export default Gugudan;
