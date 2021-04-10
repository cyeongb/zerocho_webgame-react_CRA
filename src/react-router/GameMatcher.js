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

  switch (props.match.params.name) {
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
      <div>게임매치</div>
    </>
  );
});

export default GameMatcher;
