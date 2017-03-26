import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Pill } from 'elemental'
import { shallow } from 'enzyme'
import { showDueItemsOnly } from '../actions'

import { App } from '../App'
import configReducers from '../configReducers'

let store = createStore(
  configReducers()
);

describe('DocumentList', () => {
  const dispatchSpy = jest.fn()
  const list = shallow(
    <App dispatch={dispatchSpy} errors={[]} />
  )
  it('should dispatch filter due items only when clicking on the pill (Button)', () => {
    list.find(Pill).simulate('click')
    expect(dispatchSpy).toHaveBeenCalledWith(showDueItemsOnly)
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <App errors={[]} />
  </Provider>, div);
});