import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import { TIME_PER_STAGE } from '../global';

function App() {
  const [state, setState] = useState({
    stage: 1,
    time: TIME_PER_STAGE,
  });

  const { stage, time } = state;

  const goNextStage = useCallback(() => {
    setState(({ stage }) => ({ stage: stage + 1, time: TIME_PER_STAGE }));
  }, []);

  useEffect(() => {
    const countDown = () => {
      if (time > 0) {
        setState(({ stage, time }) => ({ stage, time: time - 1 }));
      } else {
        alert(`GAME OVER!\n스테이지: ${stage}`);
        setState({ stage: 1, time: TIME_PER_STAGE });
      }
    };

    const timer = setTimeout(countDown, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [stage, time]);

  return (
    <>
      <header>
        스테이지: {stage}, 남은 시간: {time}
      </header>
      <Board stage={stage} goNextStage={goNextStage}></Board>
    </>
  );
}

export default App;
