import React, { useEffect, useState } from 'react';
import { GameType, GameRace } from 'src/types';
import { useGameInfo } from 'src/redux/hooks';
import { Spin, Card, Collapse, Row } from 'antd';
import moment from 'moment';
import Race from './Race';
import Box from './components/Box';

interface IProps {
	gameId: string;
	gameType?: GameType;
}

const Game = (props: IProps) => {
	const { gameId, gameType } = props;

	const [isLoading, setIsLoading] = useState(false);
	const { gameInfo, loadGameSchedules } = useGameInfo(gameId);

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			await loadGameSchedules();
			setIsLoading(false);
		};

		loadData();
	}, [loadGameSchedules]);

	const renderHeader = (race: GameRace) => {
		const { number, scheduledStartTime, name } = race;

		return (
			<Row>
				<Box bg="#6ea2d1">
					<b>{number}</b>
				</Box>
				<Box>{moment(scheduledStartTime).format('DD MMM YYYY, HH:mm')}</Box>
				{name && <Box>{name}</Box>}
			</Row>
		);
	};

	const renderGameInfo = () => {
		if (isLoading) {
			return <Spin />;
		}

		if (!gameInfo) {
			return null;
		}

		return (
			<>
				<Collapse defaultActiveKey={['0']}>
					{gameInfo.races.map((race, index) => {
						return (
							<Collapse.Panel header={renderHeader(race)} key={index}>
								<Race race={race} gameType={gameType} />
							</Collapse.Panel>
						);
					})}
				</Collapse>
			</>
		);
	};

	return <Card style={{ marginBottom: 30 }}>{renderGameInfo()}</Card>;
};

export default Game;
