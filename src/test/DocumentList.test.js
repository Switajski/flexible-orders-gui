import { shallow } from 'enzyme'
import React from 'react'

import { DocumentList } from '../DocumentList'
import { Pill, Card } from 'elemental'
import documents from './testDocuments'
import { showDueItemsOnly } from '../actions'

describe('DocumentList', () => {
        const dispatchSpy = jest.fn()
        const list = shallow(
            <DocumentList
                documents={documents}
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
