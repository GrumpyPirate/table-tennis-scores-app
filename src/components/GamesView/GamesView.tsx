import { ResponsiveLine, Serie } from '@nivo/line';
import React, { FunctionComponent, useMemo } from 'react';
import { useSelector } from 'react-redux';

import LogGameForm from 'components/LogGameForm/LogGameForm';
import TabHeader from 'components/TabHeader/TabHeader';
import { selectAllPlayerScoresByTimestamp, selectScoreMinMax } from 'store/selectors/scores';

import {
  AspectRatio,
  CreateGameResult,
  GraphWrapper,
  maxGamesToDisplay,
  ScoresVis,
} from './GamesView.constants';

const GamesView: FunctionComponent = () => {
  const allPlayerScoresByTimestamp = useSelector(selectAllPlayerScoresByTimestamp);
  const [minScore, maxScore] = useSelector(selectScoreMinMax);

  /**
   * Format the data for the graph.
   * - There's one series (line) per player.
   * - Each data point per series (player) must be that player's score for that date.
   *  - This means that there will be gaps, as not every player is involved in each game.
   *    We can work around this by applying their previous game's score.
   *  [
   *    {
   *      id: 'Player name',
   *      data: [
   *        {
   *          x: (unix timestamp),
   *          y: (player's score for that timestamp)
   *        }
   *      ]
   *    }
   *    ...*n
   *  ]
   */
  const graphData = useMemo<Serie[]>(
    () =>
      allPlayerScoresByTimestamp.map<Serie>(({ name, scoresByTimestamp }) => ({
        id: name,
        data: scoresByTimestamp.slice(-maxGamesToDisplay).map(([timestamp, score]) => ({
          x: timestamp,
          y: score,
        })),
      })),
    [allPlayerScoresByTimestamp],
  );

  return (
    <>
      <TabHeader title={`Scores (last ${maxGamesToDisplay} games shown)`} />
      <ScoresVis>
        <AspectRatio>
          <GraphWrapper>
            <ResponsiveLine
              animate={false}
              axisBottom={{
                legend: 'Date',
                legendPosition: 'middle',
                legendOffset: 52,
                tickRotation: -45,
                format: (timestamp) =>
                  new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  }).format(new Date(timestamp)),
              }}
              axisLeft={{
                legend: 'Points',
                legendPosition: 'middle',
                legendOffset: -30,
              }}
              colors={{
                scheme: 'category10',
              }}
              curve="monotoneX"
              data={graphData}
              enableSlices="x"
              legends={[
                {
                  anchor: 'right',
                  direction: 'column',
                  translateX: 100,
                  translateY: 0,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                },
              ]}
              margin={{ left: 50, right: 160, top: 40, bottom: 70 }}
              pointSize={6}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              theme={{
                background: '#fff',
                grid: {
                  line: {
                    width: 3,
                  },
                },
              }}
              xScale={{ type: 'point' }}
              xFormat={(timestamp) =>
                new Intl.DateTimeFormat('en-GB', {
                  day: 'numeric',
                  month: 'short',
                }).format(new Date(timestamp))
              }
              yScale={{
                min: minScore,
                max: maxScore,
                type: 'linear',
              }}
            />
          </GraphWrapper>
        </AspectRatio>
      </ScoresVis>
      <CreateGameResult>
        <LogGameForm />
      </CreateGameResult>
    </>
  );
};

export default GamesView;
