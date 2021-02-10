import React, { useCallback, useContext, useReducer } from 'react';
import { getGameData, getGameSchedule } from 'src/api/gameApi';
import { GameResponse, GameType, IGameSchedule } from 'src/contexts/types';
const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
const LOAD_GAME_INFO = 'LOAD_GAME_INFO';

export interface IGameData {
  gameSchedule: IGameSchedule;
  gameInfo: {
    [x: string]: GameResponse;
  };
}

const defaultState: IGameData = {
  gameSchedule: {},
  gameInfo: {},
};

const gameReducer = (state = defaultState, action: any) => {
  const { type, payload } = action;

  if (type === LOAD_SCHEDULE) {
    return {
      ...state,
      gameSchedule: payload,
    };
  }

  if (type === LOAD_GAME_INFO) {
    return {
      ...state,
      gameInfo: {
        ...state.gameInfo,
        ...payload,
      },
    };
  }

  return state;
};

export interface IGameContext {
  data: IGameData;
  loadGameInfo: (gameId: string) => Promise<string | null>;
  loadGameSchedule: (gameType: GameType) => Promise<string | null>;
}

export const GameContext = React.createContext({} as IGameContext);

export const GameContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultState);

  const loadGameSchedule = useCallback(async (gameType: GameType) => {
    const [error, gameSchedules] = await getGameSchedule(gameType);

    dispatch({
      type: LOAD_SCHEDULE,
      payload: gameSchedules,
    });

    return error;
  }, []);

  const loadGameInfo = useCallback(async (gameId: string) => {
    const [error, data] = await getGameData(gameId);

    dispatch({
      type: LOAD_GAME_INFO,
      payload: {
        [gameId]: data,
      },
    });

    return error;
  }, []);

  return (
    <GameContext.Provider
      value={{
        data: state,
        loadGameInfo,
        loadGameSchedule,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const gameContext = useContext(GameContext);
  return gameContext;
};
