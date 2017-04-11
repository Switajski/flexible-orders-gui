import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { App } from '../App'
import configReducers from '../configReducers'

let store = createStore(
  configReducers()
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <App errors={[]} />
  </Provider>, div);
});