import documents from './documents'

const indexedDocs = {};
documents.forEach((doc) => {
    indexedDocs[doc['id']] = doc
})

export default { documents: indexedDocs, filter: [] }