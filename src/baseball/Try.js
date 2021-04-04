import React, { memo } from "react";

// import Baseball_clss from "./Baseball_clss";
const Try = ({ tryInfo }) => {
  console.log(tryInfo);
  return (
    <div>
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    </div>
  );
};

export default memo(Try);
//컴포넌트를 memo로 감싸주어서 컴포넌트가 업데이트 될때만 렌더링 되게 함
