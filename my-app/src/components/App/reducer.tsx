import { TIME_PER_STAGE } from '../../global';

export const reducer = (
  state: {
    isPlaying: boolean;
    stage: number;
    time: number;
    score: number;
    isClear: boolean;
  },
  action: { type: string }
) => {
  switch (action.type) {
    case 'CLEAR':
      return {
        ...state,
        score: state.score + Math.pow(state.stage, 3) * state.time,
        isPlaying: false,
        isClear: true,
      };
    case 'STAGE_UP':
      return {
        ...state,
        score: state.score + Math.pow(state.stage, 3) * state.time,
        stage: state.stage + 1,
        time: TIME_PER_STAGE,
      };
    case 'WRONG_ANSWER':
      return {
        ...state,
        time: state.time - 3 >= 0 ? state.time - 3 : 0,
      };
    case 'COUNT_DOWN':
      return {
        ...state,
        time: state.time - 1,
      };
    case 'RESTART':
      return {
        stage: 1,
        time: TIME_PER_STAGE,
        score: 0,
        isPlaying: true,
        isClear: false,
      };
    case 'GAME_OVER':
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
};
