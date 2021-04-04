import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";
const getNumbers = () => {
  console.log("getNumbers()");
  const candidate = Array(45) //45크기의 배열
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      //셔플: 매번 숫자를 섞어서 그 중 첫번째 숫자를 shuffle이라는 배열에 담습니다.
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1]; //마지막 숫자를 보너스숫자로
  const lottoNums = shuffle.slice(0, 6).sort((a, b) => a - b); //오름차순
  return [...lottoNums, bonusNumber];
};
const Lotto_func = () => {
  const memoNumbers = useMemo(() => getNumbers(), []);
  //useMemo()로 return된 값들이 기억되어서 다시 실행되지 않습니다.
  // useMemo는 함수의 결과값(return)을 기억합니다.
  const [lottoNums, setLottoNums] = useState(memoNumbers);
  const [lottoNumber, setLottoNumber] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]); //useRef는 일반 값(파라미터)을 기억합니다.

  const onClickRedo = useCallback(() => {
    //useCallback은 함수를 기억해 둡니다. 자식컴포넌트에 함수로 넘길때에는 필수로 적용해야합니다.
    //클릭시 처음 state로 초기화.
    console.log("onClickRedo()");
    setLottoNums(getNumbers());
    setLottoNumber([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = []; //timeouts.current가 빈배열로 바뀜
  }, [lottoNums]);
  //두번째 인자를 해당 state값으로 채우지 않으면 첫 state값을 계속 기억합니다.
  // 두번째 인자로 lottoNums를 넣었으니 매번 다른 lottoNums의 state값을 기억할것입니다.

  useEffect(
    () => {
      for (let i = 0; i < lottoNums.length - 1; i++) {
        //먼저 보너스공 제외하고 공 6개를 가져옵니다.
        timeouts.current[i] = setTimeout(() => {
          //lottoNumber배열에 lottoNums에서 담아놓은 숫자 6개를 담습니다.
          //여기서 timeouts.current는 배열이 바뀌는게 아니고 요소를 넣어주는 작용입니다.
          setLottoNumber((prevState) => {
            return {
              lottoNumber: [...prevState.lottoNumber, lottoNums[i]],
            };
          });
        }, (i + 1) * 1000); //첫번째공은 1초, 두번째공은 2초.. 이렇게 나타납니다.
      }

      timeouts.current[6] = setTimeout(() => {
        setBonus(lottoNums[6]);
        setRedo(true);
      }, 8000);
      return () => {
        //return은 componentWillUnmount입니다.
        timeouts.current.forEach((v) => {
          clearTimeout(v);
          //setTimeout은 잘못되면 메모리 문제가 생길수 있기때문에 컴포넌트가 없어지는 과정에서 clear를 해주어야합니다.
        });
      };
    },
    [timeouts.current] //이게 [] 빈배열이면 componentDidMount와 같습니다
    //[]안에 요소가 있으면 componentDidMount+componentDidUpdate입니다.
  );

  useEffect(() => {
    console.log("로또숫자 생성중...");
  }, [lottoNums]);

  return (
    <>
      <h2>L O T T O 💲🔴🟠🟡🟢🔵🟣</h2>
      <div id="result">
        {lottoNumber.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <h2>BONUS ! 🔻 </h2>
      <div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>one more?</button>}
        {/* redo=true이면 onClickRedo버튼이 활성화 됩니다. */}
      </div>
    </>
  );
};

export default Lotto_func;
