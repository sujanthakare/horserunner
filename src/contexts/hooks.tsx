import { useCallback } from 'react';
import { useGameContext } from './gameContext';

export const useGameSchedules = () => {
  const { data, loadGameSchedule } = useGameContext();

  return {
    schedules: data ? data.gameSchedule : {},
    loadGameSchedule,
  };
};

export const useGameInfo = (gameId: string) => {
  const { data, loadGameInfo } = useGameContext();

  const loadGameInfoWithGameId = useCallback(() => {
    return loadGameInfo(gameId);
  }, [gameId]);
  return {
    gameInfo: data.gameInfo[gameId],
    loadGameInfo: loadGameInfoWithGameId,
  };
};
