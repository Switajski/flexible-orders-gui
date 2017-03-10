import documents from './documents'

const indexedDocs = {};
const childrenByParent = {};
documents.forEach((doc) => {
    indexedDocs[doc['id']] = doc
})

export default (state = { documents: indexedDocs }, action) => {
    switch (action.type) {
        case 'REQUEST_PICTURE':
            return state;
        default:
            return state;
    }
}