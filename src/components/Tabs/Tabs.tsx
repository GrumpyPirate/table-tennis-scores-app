import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import GamesView from 'components/GamesView/GamesView';
import PlayersView from 'components/PlayersView/PlayersView';
import { AppDispatch } from 'store';
import { readAllGameResults } from 'store/slices/gameResults';
import { readAllPlayers } from 'store/slices/players';

import { Tab, TabButton, TabList, tabs } from './Tabs.constants';

const Tabs: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState(tabs.PLAYERS.id);

  /**
   * Use a side-effect to:
   *  - Fetch the list of all players, after the first render
   */
  useEffect(() => {
    dispatch(readAllPlayers());
    dispatch(readAllGameResults());
  }, [dispatch]);

  return (
    <>
      <nav>
        <TabList>
          {Object.values(tabs).map(({ id, label }) => (
            <Tab key={`tab--${id}`}>
              <TabButton
                type="button"
                onClick={() => {
                  setActiveTab(id);
                }}
                isActive={activeTab === id}
              >
                {label}
              </TabButton>
            </Tab>
          ))}
        </TabList>
      </nav>
      <section>
        {activeTab === tabs.PLAYERS.id && (
          <div data-testid={`tabpanel--${tabs.PLAYERS.id}`}>
            <PlayersView />
          </div>
        )}
        {activeTab === tabs.GAMES.id && (
          <div data-testid={`tabpanel--${tabs.GAMES.id}`}>
            <GamesView />
          </div>
        )}
      </section>
    </>
  );
};

export default Tabs;
