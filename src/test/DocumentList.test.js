import { shallow } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom';

import { DocumentList } from '../DocumentList'
import { Pill, Card } from 'elemental'
import { createNormalizedTestData } from './testDocuments'
import { showDueItemsOnly } from '../actions'

describe('DocumentList', () => {
    const { documents, lineItems } = createNormalizedTestData();
    const dispatchSpy = jest.fn()
    const list = shallow(
        <DocumentList
            documents={documents}
            lineItems={lineItems}
            dispatch={dispatchSpy}
            filter={[]} />)

    it('should dispatch filter due items only when clicking on the pill (Button)', () => {
        list.find(Pill).simulate('click')
        expect(dispatchSpy).toHaveBeenCalledWith(showDueItemsOnly)
    })

    it('should render initially all documents', () => {
        expect(list.find(Card).length).toBe(19)
    })
})

it('renders with no documents without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DocumentList
        documents={{}}
        lineItems={{}}
        filter={[]} />, div);
});