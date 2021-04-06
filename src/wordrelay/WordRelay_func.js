
import React, { useState, useRef } from "react";

const WordRelay = () => {
  const [word, setWord] = useState("우리감비");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [next, setNext] = useState(`${word}다음에 올 말은?`);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (word[word.length - 1] === value[0]) {
      setResult("NICE!");
      setWord(value);
      setValue("");
      setNext(`${word}다음에 올 말은?`);
    } else {
      setResult("NOPE.");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <>
      {word}
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          placeholder={next}
        />
        <button>NEXT!</button>
      </form>
      <div>
        <b>{result}</b>
      </div>
    </>
  );
};

export default WordRelay;

