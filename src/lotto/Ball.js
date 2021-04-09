import React, { memo } from "react";

const Ball = memo(({ number }) => {
  //다른컴포넌트로 컴포넌트를 감싸는것 :hoc(high order) 컴포넌트
  let color;
  if (number < 10) {
    color = "red";
  } else if (number < 20) {
    color = "green";
  } else if (number < 30) {
    color = "orange";
  } else if (number < 40) {
    color = "cyan";
  } else {
    color = "pink";
  }

  return (
    <div className="ball" style={{ color }}>
      {number}
    </div>
  );
});

export default Ball;
