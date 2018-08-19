import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Grid from './canvas/grid';
import Palette from './tools/palette';

import './../styles/App.css';

import store from './../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Palette />
          <Grid />
        </div>
      </Provider>
    );
  }
}

export default App;
