import { useCallback } from 'react';
import { GameType } from 'src/types';
import { useSelector, useDispatch } from 'react-redux';
import { getGameSchedule, getGameInfo } from './selectors';
import { LOAD_SCHEDULE, LOAD_GAME_INFO } from './actionTypes';
import gameService from './gameService';

export const useGameSchedules = () => {
	const dispatch = useDispatch();
	const schedules = useSelector(getGameSchedule);
	const loadGameSchedules = useCallback(
		async (gameType: GameType) => {
			const [error, gameSchedules] = await gameService.getGameSchedule(gameType);
			dispatch({
				type: LOAD_SCHEDULE,
				payload: gameSchedules,
			});
			return error;
		},
		[dispatch],
	);
	return {
		schedules,
		loadGameSchedules,
	};
};

export const useGameInfo = (gameId: string) => {
	const dispatch = useDispatch();
	const gameInfoMap = useSelector(getGameInfo);

	const loadGameSchedules = useCallback(async () => {
		const [error, data] = await gameService.getGameData(gameId);
		dispatch({
			type: LOAD_GAME_INFO,
			payload: {
				[gameId]: data,
			},
		});

		return error;
	}, [dispatch, gameId]);
	return {
		gameInfo: gameInfoMap[gameId],
		loadGameSchedules,
	};
};
