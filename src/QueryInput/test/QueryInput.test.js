import React from 'react'
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'

import Autosuggest from 'react-autosuggest'

import { QueryInput } from '../index'
import StatusSuggestion from '../StatusSuggestion'
import { initialState } from '../initialState'
import TestUtils from 'react-addons-test-utils'

describe('QueryInput', () => {
    const dispatchSpy = jest.fn()
    const input = shallow(
        <QueryInput dispatch={dispatchSpy} {...initialState} />
    )

    it('should suggest status', () => {
        input.find(Autosuggest).simulate('keydown', { which: 's' })
        setTimeout(() => {
            expect(input.find(StatusSuggestion).length).toBe(1)
        }, 500)
    })

    it('should suggest status', () => {
        input.find(Autosuggest).simulate('keydown', { which: 'f' })
        setTimeout(() => {
            expect(input.find(StatusSuggestion).length).toBe(0)
        }, 500)
    })
})

it('renders Autosuggest', () => {
    TestUtils.renderIntoDocument(<QueryInput {...initialState} />);
});

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<QueryInput {...initialState} />, div);
});