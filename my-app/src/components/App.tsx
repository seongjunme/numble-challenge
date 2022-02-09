import React, { useState } from 'react';
import Board from './Board';

function App() {
  const [stage, setStage] = useState(1);
  const goNextStage = () => setStage((prev) => prev + 1);
  return (
    <>
      <header>Stage: {stage}</header>
      <Board stage={stage} goNextStage={goNextStage}></Board>
    </>
  );
}

export default App;
