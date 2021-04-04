import React, { memo } from "react";

const Ball = memo(({ number }) => {
  //다른컴포넌트로 컴포넌트를 감싸는것 :hoc(high order) 컴포넌트
  let color;
  if (number < 10) {
    color = "lightred";
  } else if (number < 20) {
    color = "lightgreen";
  } else if (number < 30) {
    color = "lightyellow";
  } else if (number < 40) {
    color = "lightcyan";
  } else {
    color = "lightpink";
  }

  return (
    <div className="ball" style={{ color }}>
      {number}
    </div>
  );
});

export default Ball;
