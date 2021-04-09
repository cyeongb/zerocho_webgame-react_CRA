import React from "react";
import { HashRouter, BrowserRouter, Route, Link } from "react-router-dom";
import MineSearch from "../mineSearch/MineSearch";
import Lotto_func from "../lotto/Lotto_func";
import WordRelay_func from "../wordrelay/WordRelay_func";
import Tictactoe from "../tictacto/Tictactoe";
import Rsp_func from "../rsp/Rsp_func";
import Response_func from "../response/Response_func";
import Gugudan from "../gugudan/Gugudan";
import Baseball_func from "../baseball/Baseball_func";
const game_router = () => {
  return (
    // router를 쓰려면 최상위를 Browser , Hash Router로 한번 감싸야합니다.
    <BrowserRouter>
      <h1>GAME WORLD!🎮</h1>
      <div>
        {/*만들고싶은 페이지를 Route컴포넌트 안에 가상 페이지주소를 적고 해 주소에 연결할 컴포넌트를 가져옵니다 
        페이지 라우터는 페이지가 여러개 있는것 같지만 사실 페이지가 하나에서 이루어집니다.
        페이지 주소를 입력하면, 가상 페이지 주소를 이용해서 페이지가 넘어가는 '척'을 합니다.
        react-router-dom의 Link라는 기능으로 가상페이지가 이용 가능합니다.(Link가 Route를 불러줍니다)
        */}
        <Link to="/mineSearch">지뢰찾기</Link>
        <Route path="/mineSearch" component={MineSearch} />
        <Route path="/lotto" component={Lotto_func} />
        <Route path="/wordRelay" component={WordRelay_func} />
        <Route path="/tictactoe" component={Tictactoe} />
        <Route path="/rsp" component={Rsp_func} />
        <Route path="/response" component={Response_func} />
        <Route path="/gugudan" component={Gugudan} />
        <Route path="/baseball" component={Baseball_func} />
      </div>
    </BrowserRouter>
  );
};

export default game_router;
