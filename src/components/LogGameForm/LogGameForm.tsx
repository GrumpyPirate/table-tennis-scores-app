import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Button/Button';
import { AppDispatch, RootState } from 'store';
import selectPlayersSortedByName from 'store/selectors/players/players';
import { createGameResult } from 'store/slices/gameResults';

import { Field, FieldRow, FormHeading } from './LogGameForm.constants';

const LogGameForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const playersSortedByName = useSelector(selectPlayersSortedByName);
  const { isFetching } = useSelector((state: RootState) => ({
    isFetching: state.gameResults.isFetching,
  }));

  const logGameForm = useFormik({
    initialValues: {
      date: '',
      player1: '',
      player2: '',
      player1Score: 0,
      player2Score: 0,
    },
    onSubmit: ({ date, player1, player2, player1Score, player2Score }) => {
      const formattedDate = (date ? new Date(date) : new Date()).toISOString();

      dispatch(
        createGameResult({
          date: formattedDate,
          player1: {
            id: player1,
            score: player1Score,
          },
          player2: {
            id: player2,
            score: player2Score,
          },
        }),
      );
    },
  });

  return (
    <>
      <FormHeading>Log a game</FormHeading>

      <form onSubmit={logGameForm.handleSubmit}>
        {/* date */}
        <Field>
          <label htmlFor="date">Game Date</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={logGameForm.handleChange}
            value={logGameForm.values.date}
          />
        </Field>

        <FieldRow>
          {/* player1 */}
          <Field>
            <label htmlFor="player1">Player 1</label>
            <select
              id="player1"
              name="player1"
              required
              onChange={logGameForm.handleChange}
              value={logGameForm.values.player1}
            >
              {playersSortedByName.map(({ id, name }) => (
                <option key={`player1-option-${id}`} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </Field>

          {/* player1Score */}
          <Field>
            <label htmlFor="player1Score">Score</label>
            <input
              id="player1Score"
              name="player1Score"
              type="number"
              min={0}
              step={1}
              onChange={logGameForm.handleChange}
              required
              value={logGameForm.values.player1Score}
            />
          </Field>
        </FieldRow>

        <FieldRow>
          {/* player2 */}
          <Field>
            <label htmlFor="player2">Player 2</label>
            <select
              id="player2"
              name="player2"
              required
              onChange={logGameForm.handleChange}
              value={logGameForm.values.player2}
            >
              {playersSortedByName.map(({ id, name }) => (
                <option key={`player2-option-${id}`} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </Field>

          {/* player2Score */}
          <Field>
            <label htmlFor="player2Score">Score</label>
            <input
              id="player2Score"
              name="player2Score"
              type="number"
              min={0}
              step={1}
              required
              onChange={logGameForm.handleChange}
              value={logGameForm.values.player2Score}
            />
          </Field>
        </FieldRow>

        <div>
          <Button type="submit" disabled={isFetching}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default LogGameForm;
