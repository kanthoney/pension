'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from 'semantic-ui-react';

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (<Header>Pension Calculator</Header>);
  }
};

