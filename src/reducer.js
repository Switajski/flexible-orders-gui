import documents from './documents'
import { SHOW_DUE_ITEMS_ONLY, DUE_ITEMS_FILTER_CLEAR } from './Actions'

const indexedDocs = {};
documents.forEach((doc) => {
    indexedDocs[doc['id']] = doc
})

export default (state = { documents: indexedDocs, filter: undefined }, action) => {
    switch (action.type) {
        case SHOW_DUE_ITEMS_ONLY:
            return { ...state, filter: SHOW_DUE_ITEMS_ONLY }
        case DUE_ITEMS_FILTER_CLEAR:
            return {...state, filter: undefined}
        case 'REQUEST_PICTURE':
            return state;
        default:
            return state;
    }
}