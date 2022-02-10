import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import { TIME_PER_STAGE } from '../global';

function App() {
  const [state, setState] = useState({
    stage: 1,
    time: TIME_PER_STAGE,
    score: 0,
  });

  const { stage, time, score } = state;

  const goNextStage = useCallback(() => {
    setState(({ stage, time, score }) => ({
      stage: stage + 1,
      time: TIME_PER_STAGE,
      score: score + Math.pow(stage, 3) * time,
    }));
  }, []);

  useEffect(() => {
    const countDown = () => {
      if (time > 0) {
        setState(({ stage, time, score }) => ({ stage, time: time - 1, score }));
      } else {
        alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
        setState({ stage: 1, time: TIME_PER_STAGE, score: 0 });
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
        스테이지: {stage}, 남은 시간: {time}, 점수: {score}
      </header>
      <Board stage={stage} goNextStage={goNextStage}></Board>
    </>
  );
}

export default App;
