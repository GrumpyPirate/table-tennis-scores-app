import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import createMockStore from 'testing/utils';

import PlayersView from './PlayersView';

describe('Components', () => {
  describe('PlayersView', () => {
    const mockStore = createMockStore();
    const windowPromptSpy = jest.fn();

    beforeEach(() => {
      jest.spyOn(window, 'prompt').mockImplementation(windowPromptSpy);
    });

    afterEach(() => {
      windowPromptSpy.mockClear();
    });

    test('should render as expected, without crashing', () => {
      const { container } = render(
        <Provider store={mockStore}>
          <PlayersView />
        </Provider>,
      );

      expect(container).toMatchSnapshot();
    });

    test('should prompt for a player name, when clicking the "Create Player" button', () => {
      render(
        <Provider store={mockStore}>
          <PlayersView />
        </Provider>,
      );

      expect(windowPromptSpy).not.toHaveBeenCalled();

      const button = screen.getByText('Create Player');
      fireEvent.click(button);

      expect(windowPromptSpy).toHaveBeenCalled();
    });
  });
});
