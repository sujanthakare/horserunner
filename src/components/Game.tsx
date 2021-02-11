import React, { useEffect, useState } from 'react';
import { GameRace } from 'src/contexts/types';
import moment from 'moment';
import Box from '../lib/box';
import { useGameInfo } from 'src/contexts/hooks';
import Race from './Race';
import { Card, Loader } from 'semantic-ui-react';

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
      <Card raised style={{ minWidth: 480, padding: 5 }}>
        <div style={{ display: 'flex' }}>
          <Box bg="#6ea2d1">
            <h2 style={{ padding: '1rem 2rem' }}>{number}</h2>
          </Box>
          <Box>
            <Box>
              <h3>{moment(scheduledStartTime).format('DD MMM YYYY, HH:mm')}</h3>
            </Box>
            {name && (
              <Box>
                <h4>{name}</h4>
              </Box>
            )}
          </Box>
        </div>
      </Card>
    );
  };

  const renderGameInfo = () => {
    if (isLoading) {
      return <Loader active />;
    }

    if (!gameInfo) {
      return null;
    }

    return gameInfo.races.map((race, index) => {
      return (
        <Card style={{ padding: '1rem', width: 'auto' }} key={index}>
          {renderHeader(race)}
          <Race race={race} />
        </Card>
      );
    });
  };

  return <div style={{ padding: '1rem' }}>{renderGameInfo()}</div>;
};

export default Game;
