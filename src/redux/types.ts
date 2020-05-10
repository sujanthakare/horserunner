import { IGameSchedule, GameResponse } from 'src/types';

export interface IStoreState {
	gameSchedule: IGameSchedule;
	gameInfo: {
		[x: string]: GameResponse;
	};
}
