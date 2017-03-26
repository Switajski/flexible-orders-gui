import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
    FETCHING_DOCS,
    FETCH_DOCS_SUCCESS
} from '../actions'

import reducer from '../reducer'
import documents from './testDocuments'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    }) 

    xit('creates FETCH_DOCS_SUCCESS when fetching todos has been done', () => {
        nock('http://localhost:3000')
            .get('/documents')
            .reply(200, { body: documents })

        const expectedActions = [
            { type: FETCHING_DOCS },
            {
                type: FETCH_DOCS_SUCCESS,
                body: { documents: documents }
            }
        ]
        const store = mockStore({ documents: [] })

        return store.dispatch()
            .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
})
