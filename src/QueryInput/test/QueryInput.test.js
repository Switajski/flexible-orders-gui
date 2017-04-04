import React from 'react'
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'

import Autosuggest from 'react-autosuggest'

import { QueryInput } from '../index'
import StatusSuggestion from '../StatusSuggestion'
import { initialState } from '../initialState'

describe('QueryInput', () => {
    const dispatchSpy = jest.fn()
    const input = shallow(
        <QueryInput dispatch={dispatchSpy} {...initialState} />
    )

    it('should suggest status', () => {
        input.find('input').simulate('keydown', { which: 's' })
        expect(input.find(Item).length).toBe(1)
    })
})

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<QueryInput {...initialState} />, div);
});