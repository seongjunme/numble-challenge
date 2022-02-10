import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import { TIME_PER_STAGE, MAX_STAGE } from '../global';

function App() {
  const [state, setState] = useState({
    isPlaying: true,
    stage: 1,
    time: TIME_PER_STAGE,
    score: 0,
    isClear: false,
  });

  const { isPlaying, stage, time, score, isClear } = state;

  const goNextStage = useCallback(() => {
    if (stage >= MAX_STAGE) {
      alert(`DONE!`);
      setState((prev) => ({ ...prev, isPlaying: false, isClear: true }));
      return;
    } else {
      setState(({ stage, time, score, ...rest }) => ({
        stage: stage + 1,
        time: TIME_PER_STAGE,
        score: score + Math.pow(stage, 3) * time,
        ...rest,
      }));
    }
  }, [stage]);

  const decreaseTime = useCallback(() => {
    setState(({ time, ...rest }) => ({ time: time - 3 >= 0 ? time - 3 : 0, ...rest }));
  }, []);

  useEffect(() => {
    const countDown = () => {
      if (isPlaying) {
        setState(({ time, ...rest }) => ({ time: time - 1, ...rest }));
      }
      if (!(isPlaying || isClear)) {
        alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
        setState({ stage: 1, time: TIME_PER_STAGE, score: 0, isPlaying: true, isClear: false });
      }
    };

    const timer = setInterval(countDown, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, score, stage, isClear]);

  useEffect(() => {
    if (time <= 0) {
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, [time]);

  return (
    <>
      <header>
        스테이지: {stage}, 남은 시간: {time}, 점수: {score}
      </header>
      <Board stage={stage} goNextStage={goNextStage} decreaseTime={decreaseTime}></Board>
    </>
  );
}

export default App;
