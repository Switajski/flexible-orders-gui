import documents from './documents'
import { SHOW_DUE_ITEMS_ONLY } from './actions'

const indexedDocs = {};
// documents.forEach((doc) => {
//     indexedDocs[doc['id']] = doc
// })

export default { 
    documents: indexedDocs, 
    filter: [SHOW_DUE_ITEMS_ONLY],
    errors: []
}