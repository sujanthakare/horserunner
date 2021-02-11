import React, { useEffect, useState } from 'react';
import { GameType, GameInfo } from 'src/contexts/types';
import { useGameSchedules } from 'src/contexts/hooks';
import { Tab, Loader } from 'semantic-ui-react';
import Game from './Game';

interface IProps {
  gameType?: GameType;
}

const GameSchedule: React.FC<IProps> = (props) => {
  const { gameType } = props;

  const [isLoading, setIsLoading] = useState(false);
  const { schedules, loadGameSchedule } = useGameSchedules();

  useEffect(() => {
    const loadData = async () => {
      if (gameType) {
        setIsLoading(true);
        await loadGameSchedule(gameType);
        setIsLoading(false);
      }
    };

    loadData();
  }, [gameType, loadGameSchedule]);

  if (isLoading) {
    return <Loader active />;
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
    <Tab
      panes={[
        {
          menuItem: 'Upcoming',
          render: () => {
            return renderGames(schedules.upcoming);
          },
        },
        {
          menuItem: 'Results',
          render: () => {
            return renderGames(schedules.results);
          },
        },
      ]}
    />
  );
};

export default GameSchedule;
