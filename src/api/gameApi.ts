import { GameType, IGameSchedule, GameResponse } from 'src/contexts/types';

export const getGameSchedule = async (gameType: GameType): Promise<[string | null, IGameSchedule?]> => {
  try {
    const response = await fetch(`https://www.atg.se/services/racinginfo/v1/api/products/${gameType}`);
    if (response.ok) {
      const schedules = await response.json();
      return [null, schedules];
    }

    return [response.statusText];
  } catch (e) {
    return ['Unexpected Error'];
  }
};

export const getGameData = async (gameId: string): Promise<[string | null, GameResponse?]> => {
  try {
    const response = await fetch(` https://www.atg.se/services/racinginfo/v1/api/games/${gameId}`);
    if (response.ok) {
      const gameData = await response.json();
      return [null, gameData];
    }

    return [response.statusText];
  } catch (e) {
    return ['Unexpected Error'];
  }
};
