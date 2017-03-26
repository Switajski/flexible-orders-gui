import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import qiReducer from './QueryInput/reducer'
import { Provider } from 'react-redux';

import './styles.min.css';

const reducers = combineReducers({
  query: qiReducer,
  docList: reducer
})

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
