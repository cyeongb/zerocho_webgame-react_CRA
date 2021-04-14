import React, { Route, memo } from "react";
import MineSearch from "../mineSearch/MineSearch";
import LottoFunc from "../lotto/Lotto_func";
import WordRelayFunc from "../wordrelay/WordRelay_func";
import Tictactoe from "../tictacto/Tictactoe";
import RspFunc from "../rsp/Rsp_func";
import ResponseFunc from "../response/Response_func";
import Gugudan from "../gugudan/Gugudan";
import BaseballFunc from "../baseball/Baseball_func";

const GameMatcher = memo((props) => {
  console.log("props:", props.match.params.name);
  // react-router는 눈속임이기때문에 실재 브라우저의 객체와 다른 객체를 사용합니다.
  // 그래서 props에 브라우저와는 별도의 history 객체가 존재합니다
  // history객체의 search는 url에 [/game/mineSearch?query=10&name=mine]이렇게 key+value값의  query string 데이터를 전달할 때 그 객체가 search안에 들어갑니다
  let paramName = props.match.params.name;
  switch (paramName) {
    case "mineSearch":
      return <MineSearch />;
    case "lotto":
      return <LottoFunc />;
    case "wordRelay":
      return <WordRelayFunc />;
    case "tictactoe":
      return <Tictactoe />;
    case "rsp":
      return <RspFunc />;
    case "response":
      return <ResponseFunc />;
    case "gugudan":
      return <Gugudan />;
    case "baseball":
      return <BaseballFunc />;
    default: {
      <GameMatcher />;
    }
  }
  return (
    <>
      <div>일치하는 게임이 없습니다.</div>
    </>
  );
});

export default GameMatcher;
