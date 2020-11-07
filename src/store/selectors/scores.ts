import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';

export const selectAllPlayerScoresByTimestamp = createSelector(
  (state: RootState) => state.players.allPlayers,
  (state: RootState) => state.gameResults.allGameResults,
  /**
   * Result structure should be:
   * [
   *  {
   *    id: '3337d9ef-7456-5e13-b16a-f044b6926a32'
   *    name: 'Player One',
   *    scoresByTimestamp: [
   *      [timestamp, score]
   *    ]
   *  }
   * ]
   */
  (allPlayers, allGameResults) =>
    allPlayers.map<{
      id: string;
      name: string;
      scoresByTimestamp: [number, number][];
    }>((currentPlayer) => ({
      id: currentPlayer.id,
      name: currentPlayer.name,
      scoresByTimestamp: allGameResults.reduce<[number, number][]>(
        (scoresAcc, currentGame, gameIndex) => {
          const playerIsInvolvedInGame =
            currentGame.player1.id === currentPlayer.id ||
            currentGame.player2.id === currentPlayer.id;
          const gameTimestamp = new Date(currentGame.date).valueOf();

          // Player not involved in game
          if (!playerIsInvolvedInGame) {
            // If it's the first game in the whole season, initialise the player's score to 0
            if (gameIndex === 0) {
              return [...scoresAcc, [gameTimestamp, 0]];
            }

            // Get the previous game's score, apply that to this timestamp
            const [, previousScore] = scoresAcc[gameIndex - 1];
            return [...scoresAcc, [gameTimestamp, previousScore]];
          }

          // Determine which of the two players they are
          const playerNumber = currentGame.player1.id === currentPlayer.id ? 1 : 2;

          // Work out whether they won or not
          let newScore = gameIndex === 0 ? 0 : scoresAcc[gameIndex - 1][1];

          switch (playerNumber) {
            case 1:
              newScore =
                currentGame.player1.score > currentGame.player2.score ? newScore + 1 : newScore - 1;
              break;
            case 2:
              newScore =
                currentGame.player1.score > currentGame.player2.score ? newScore - 1 : newScore + 1;
              break;
            default:
              break;
          }

          return [...scoresAcc, [gameTimestamp, newScore]];
        },
        [],
      ),
    })),
);

export const selectAllPlayerScores = createSelector(
  (state: RootState) => state.players.allPlayers,
  (state: RootState) => state.gameResults.allGameResults,
  (allPlayers, allGameResults) =>
    allPlayers.map(({ id }) => {
      // Get this player's total wins/losses across all games
      const [totalWins, totalLosses] = allGameResults
        .filter(({ player1, player2 }) => player1.id === id || player2.id === id)
        .reduce<[number, number]>(
          ([accWins, accLosses], { player1, player2 }) => {
            // Determine which of the 2 players this is. There's probably a much, much cleaner way of
            // doing this.
            const playerNumber = player1.id === id ? 1 : 2;

            switch (playerNumber) {
              case 1:
                return player1.score > player2.score
                  ? [accWins + 1, accLosses]
                  : [accWins, accLosses + 1];
              case 2:
                return player1.score > player2.score
                  ? [accWins, accLosses + 1]
                  : [accWins + 1, accLosses];
              default:
                return [accWins, accLosses];
            }
          },
          [0, 0],
        );

      return {
        id,
        wins: totalWins,
        losses: totalLosses,
        score: totalWins - totalLosses,
      };
    }),
);

/**
 * Determines the minimum/maximum score across all players.
 * This must be calculated from all scores over time, as the maximum/minimums will change between games.
 */
export const selectScoreMinMax = createSelector(
  selectAllPlayerScoresByTimestamp,
  (allPlayerScoresByTimestamp) =>
    allPlayerScoresByTimestamp.reduce<[number, number]>(
      (currMinMaxScore, { scoresByTimestamp }) => {
        const [playerMinScore, playerMaxScore] = scoresByTimestamp.reduce<[number, number]>(
          (currPlayerMinMaxScores, [, score]) => {
            const [currPlayerMinScore, currPlayerMaxScore] = currPlayerMinMaxScores;
            const newMinScore = score < currPlayerMinScore ? score : currPlayerMinScore;
            const newMaxScore = score > currPlayerMaxScore ? score : currPlayerMaxScore;

            return [newMinScore, newMaxScore];
          },
          [0, 0],
        );

        const [currMinScore, currMaxScore] = currMinMaxScore;
        const newMinScore = playerMinScore < currMinScore ? playerMinScore : currMinScore;
        const newMaxScore = playerMaxScore > currMaxScore ? playerMaxScore : currMaxScore;

        return [newMinScore, newMaxScore];
      },
      [0, 0],
    ),
);
