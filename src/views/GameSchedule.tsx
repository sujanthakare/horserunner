import React, { useEffect, useState } from 'react';
import { GameType, GameInfo } from 'src/types';
import { useGameSchedules } from 'src/redux/hooks';
import { Spin, Tabs } from 'antd';
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

	const renderGames = (games?: Array<GameInfo>) => {
		if (!games || !games.length) {
			return <h3>No data</h3>;
		}

		return games.map((game) => {
			return <Game key={game.id} gameId={game.id} />;
		});
	};

	return (
		<>
			<h1>{gameType}</h1>

			<Tabs defaultActiveKey="upcoming">
				<Tabs.TabPane tab="Upcoming" key="upcoming">
					{renderGames(schedules.upcoming)}
				</Tabs.TabPane>
				<Tabs.TabPane tab="Results" key="results">
					{renderGames(schedules.results)}
				</Tabs.TabPane>
			</Tabs>
		</>
	);
};

export default GameSchedule;
