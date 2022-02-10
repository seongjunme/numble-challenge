import { useReducer, useEffect, useCallback, useRef } from 'react';
import { reducer } from './reducer';
import Board from '../Board';
import { TIME_PER_STAGE, MAX_STAGE } from '../../global';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isPlaying: true,
    stage: 1,
    time: TIME_PER_STAGE,
    score: 0,
    isClear: false,
  });
  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  const { isPlaying, stage, time, score, isClear } = state;

  useEffect(() => {
    const countDown = () => {
      if (isPlaying) {
        dispatch({ type: 'COUNT_DOWN' });
      }
      if (!(isPlaying || isClear)) {
        alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
        dispatch({ type: 'RESTART' });
      }
    };

    timer.current = setInterval(countDown, 1000);

    return () => {
      clearTimeout(timer.current as NodeJS.Timeout);
    };
  }, [isPlaying, score, stage, isClear]);

  useEffect(() => {
    if (time > 0) return;
    clearTimeout(timer.current as NodeJS.Timeout);
    dispatch({ type: 'GAME_OVER' });
  }, [time]);

  const goNextStage = useCallback(() => {
    if (stage >= MAX_STAGE) {
      dispatch({ type: 'CLEAR' });
    }

    dispatch({ type: 'STAGE_UP' });
  }, [stage]);

  const decreaseTime = useCallback(() => {
    dispatch({ type: 'WRONG_ANSWER' });
  }, []);

  return (
    <>
      <header>
        스테이지: {stage}, 남은 시간: {time}, 점수: {score}
      </header>
      {isClear ? (
        <div>DONE!</div>
      ) : (
        <Board stage={stage} goNextStage={goNextStage} decreaseTime={decreaseTime}></Board>
      )}
    </>
  );
}

export default App;
