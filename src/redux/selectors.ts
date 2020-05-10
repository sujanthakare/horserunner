import { IStoreState } from './types';
import { createSelector } from 'reselect';

const gameScheduleSelector = (state: IStoreState) => state.gameSchedule;
const gameInfoSelector = (state: IStoreState) => state.gameInfo;

export const getGameSchedule = createSelector(gameScheduleSelector, (schedules) => schedules);
export const getGameInfo = createSelector(gameInfoSelector, (gameInfo) => gameInfo);
