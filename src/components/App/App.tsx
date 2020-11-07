import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';

import Container from 'components/Grid/Container/Container';
import Tabs from 'components/Tabs/Tabs';
import store from 'store';

import { AppTitle, Content, GlobalStyles, Page } from './App.constants';

const App: FunctionComponent = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Page>
      <Content>
        <Container>
          <AppTitle>🏓 Epic Tennis Battle 🏓</AppTitle>
          <Tabs />
        </Container>
      </Content>
    </Page>
  </Provider>
);

export default App;
