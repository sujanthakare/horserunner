import React, { useState } from 'react';
import { GameType } from './contexts/types';
import { GameContextProvider } from './contexts/gameContext';
import Select from './lib/select';
import GameSchedule from './components/GameSchedule';

const gameTypeOptions = [
  { value: GameType.V75, text: GameType.V75 },
  { value: GameType.V65, text: GameType.V65 },
  { value: GameType.V64, text: GameType.V64 },
  { value: GameType.V4, text: GameType.V4 },
];

function App() {
  const [gameType, setGameType] = useState<GameType>(GameType.V75);

  return (
    <GameContextProvider>
      <h2>Horse Runner</h2>
      <div style={{ margin: 20 }}>
        <Select
          placeholder="Select game type"
          options={gameTypeOptions}
          style={{ width: 200 }}
          value={gameType}
          onChange={(e) => setGameType(e.currentTarget.value as GameType)}
        />
      </div>

      <GameSchedule gameType={gameType} />
    </GameContextProvider>
  );
}

export default App;
