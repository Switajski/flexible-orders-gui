import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Pill } from 'elemental'
import { shallow } from 'enzyme'
import { showDueItemsOnly } from '../QueryInput/actions'

import App from '../App'
import configReducers from '../configReducers'

let store = createStore(
  configReducers()
);

describe('DocumentList', () => {
  const dispatchSpy = jest.fn()
  const list = shallow(<Provider store={store}>
    <App
      dispatch={dispatchSpy}
    />
  </Provider>)
  it('should dispatch filter due items only when clicking on the pill (Button)', () => {
    console.log(list.find(Pill))
    list.find(Pill).simulate('click')
    expect(dispatchSpy).toHaveBeenCalledWith(showDueItemsOnly)
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});