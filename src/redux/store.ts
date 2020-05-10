import { createStore } from 'redux';
import { IStoreState } from './types';
import { LOAD_SCHEDULE, LOAD_GAME_INFO } from './actionTypes';

const defaultState: IStoreState = {
	gameSchedule: {},
	gameInfo: {},
};

const appReducer = (state = defaultState, action: any): IStoreState => {
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

const store = createStore(appReducer);

export default store;
