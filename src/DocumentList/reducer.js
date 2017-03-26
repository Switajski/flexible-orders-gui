import {
    SELECT_LINE_ITEM,
    FETCH_DOCS_SUCCESS,
    FETCHING_DOCS,
    FETCH_DOCS_FAILED
} from './actions'

// TODO: only test data - remove after docs are fetched from server
import { createNormalizedTestData } from './test/testDocuments'

const { documents, lineItems } = createNormalizedTestData()

const initialState = {
    documents: documents,
    lineItems: lineItems,
    selectedLineItems: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_LINE_ITEM:
            let selectedLineItems;
            if (state.selectedLineItems.indexOf(action.id) > -1)
                selectedLineItems = state.selectedLineItems.filter(i => i !== action.id)
            else selectedLineItems = [...state.selectedLineItems, action.id]
            return { ...state, selectedLineItems }
        case FETCHING_DOCS:
            return { ...state, FETCHING_DOCS: true }
        case FETCH_DOCS_SUCCESS:
            return {
                ...state,
                documents: action.documents,
                FETCHING_DOCS: false
            }
        case FETCH_DOCS_FAILED:
            const errs = [...state.errors, action.message]
            return {
                ...state,
                errors: errs,
                FETCHING_DOCS: false
            }
        default:
            return state;
    }
}