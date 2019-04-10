'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Header } from 'semantic-ui-react';
import PensionFromContributionsForm from './PensionFromContributionsForm';

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
        <Provider store={store}>
        <Header>Pension Calculator</Header>
        <PensionFromContributionsForm />
        </Provider>
    );
  }
};

