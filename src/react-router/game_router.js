import React from "react";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Link,
  Switch,
} from "react-router-dom";
// HashRouter: 주소에 #이 생깁니다. ex)http://localhost:3000/#/wordRelay
// ㄴ 새로고침을 해도 해당 화면이 그대로 보입니다.
// 그런데 검색엔진이 인식하지 못하고 주소가 이상해서 잘 안쓴다고 합니다.

import GameMatcher from "./GameMatcher";
const game_router = () => {
  return (
    // router를 쓰려면 최상위를 Browser , Hash Router로 한번 감싸야합니다.
    <BrowserRouter>
      <h1>GAME WORLD!🎮</h1>
      <div>
        {/*만들고싶은 페이지를 Route컴포넌트 안에 가상 페이지주소를 적고 해당 주소에 연결할 컴포넌트를 가져옵니다 
        페이지 라우터는 페이지가 여러개 있는것 같지만 사실 페이지가 하나에서 이루어집니다.
        페이지 주소를 입력하면, 가상 페이지 주소를 이용해서 페이지가 넘어가는 '척'을 합니다.(Link의 눈속임)
        react-router-dom의 Link라는 기능으로 가상페이지가 이용 가능합니다.(Link가 Route를 불러줍니다)
        */}
        <Link to="/game/mineSearch"> 지뢰찾기</Link>
        <br />
        <Link to="/game/lotto">로또</Link>
        <br />
        <Link to="/game/wordRelay">끝말잇기</Link>
        <br />
        <Link to="/game/tictactoe">틱택토</Link>
        <br />
        <Link to="/game/rsp">가위바위보</Link>
        <br />
        <Link to="/game/response">빨리누르기</Link>
        <br />
        <Link to="/game/gugudan">구구단</Link>
        <br />
        <Link to="/game/baseball">숫자야구</Link>
        <br />
        <hr />
      </div>
      <div>
        {/*route들이 너무 많아도 문제이기때문에 그럴떄 dynamic route matching을 사용합니다. 
        :이 붙은 params는 동적으로 바뀝니다
        */}
        <Switch>
          {/* Switch는 route중 일치하는 한개의 route만 내보냅니다 */}
          {/* <Route path="/game/:name" component={GameMatcher} /> */}
          <Route
            exact //exact를 붙이면 path명이 조금이라도 다를경우 다음으로 넘어갑니다
            path="/game/:name"
            render={(props) => <GameMatcher {...props} />} // render로 props를 넘겨주는게 더 좋다고합니다
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default game_router;
