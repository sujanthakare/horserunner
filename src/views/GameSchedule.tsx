import React, { useEffect, useState } from 'react';
import { GameType } from 'src/types';
import { useGameSchedules } from 'src/redux/hooks';
import { Spin } from 'antd';
import Game from './Game';

interface IProps {
	gameType?: GameType;
}

const GameSchedule = (props: IProps) => {
	const { gameType } = props;

	const [isLoading, setIsLoading] = useState(false);
	const { schedules, loadGameSchedules } = useGameSchedules();

	useEffect(() => {
		const loadData = async () => {
			if (gameType) {
				setIsLoading(true);
				await loadGameSchedules(gameType);
				setIsLoading(false);
			}
		};

		loadData();
	}, [gameType, loadGameSchedules]);

	if (isLoading) {
		return <Spin />;
	}

	if (!schedules.upcoming) {
		return <h4>Nothing found</h4>;
	}

	return (
		<>
			{gameType && (
				<>
					<h2>{gameType}</h2>
					<h3>Upcoming</h3>
				</>
			)}
			{schedules.upcoming.map((game) => {
				return <Game key={game.id} gameId={game.id} gameType={gameType} />;
			})}
		</>
	);
};

export default GameSchedule;
