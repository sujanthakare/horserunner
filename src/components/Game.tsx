import React, { useEffect, useState } from 'react';
import { GameRace } from 'src/contexts/types';
import moment from 'moment';
import Box from '../lib/box';
import { useGameInfo } from 'src/contexts/hooks';
import Race from './Race';
import { Card } from 'semantic-ui-react';

interface IProps {
  gameId: string;
}

const Game = (props: IProps) => {
  const { gameId } = props;

  const [isLoading, setIsLoading] = useState(false);
  const { gameInfo, loadGameInfo } = useGameInfo(gameId);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await loadGameInfo();
      setIsLoading(false);
    };

    loadData();
  }, [loadGameInfo]);

  const renderHeader = (race: GameRace) => {
    const { number, scheduledStartTime, name } = race;

    return (
      <>
        <Box bg="#6ea2d1">
          <b>{number}</b>
        </Box>
        <Box>{moment(scheduledStartTime).format('DD MMM YYYY, HH:mm')}</Box>
        {name && <Box>{name}</Box>}
      </>
    );
  };

  const renderGameInfo = () => {
    if (isLoading) {
      return <p>LOADING</p>;
    }

    if (!gameInfo) {
      return null;
    }

    return gameInfo.races.map((race, index) => {
      return (
        <Card style={{ padding: '1rem', width: 'auto' }}>
          {renderHeader(race)}
          <Race race={race} />
        </Card>
      );
    });
  };

  return <div style={{ padding: '1rem' }}>{renderGameInfo()}</div>;
};

export default Game;
