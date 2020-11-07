import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../store';
import Tabs from './Tabs';
import { tabs } from './Tabs.constants';

describe('Components/Tabs', () => {
  test('should render as expected, without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <Tabs />
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should display the appropriate tabpanel, when activating each tab', () => {
    const { getAllByText, getByTestId } = render(
      <Provider store={store}>
        <Tabs />
      </Provider>,
    );

    // Activate the Players tab
    fireEvent.click(getAllByText(tabs.PLAYERS.label)[0]);
    expect(getByTestId(`tabpanel--${tabs.PLAYERS.id}`)).toBeTruthy();

    // Activate the Gamess tab
    fireEvent.click(getAllByText(tabs.GAMES.label)[0]);
    expect(getByTestId(`tabpanel--${tabs.GAMES.id}`)).toBeTruthy();
  });
});
