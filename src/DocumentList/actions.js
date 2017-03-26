export const FETCH_DOCS_SUCCESS = 'FETCH_DOCS_SUCCESS'
export const FETCH_DOCS_FAILED = 'FETCH_DOCS_FAILED'
export const FETCHING_DOCS = 'FETCHING_DOCS'
export const SELECT_LINE_ITEM = 'SELECT_LINE_ITEM'

export const selectLineItem = id => {
    return {
        type: SELECT_LINE_ITEM,
        id: id
    }
}

export const fetchDocsSuccess = documents => {
    return {
        type: FETCH_DOCS_SUCCESS,
        documents: documents
    }
}

export const fetchDocsFailed = msg => {
    return {
        type: FETCH_DOCS_FAILED,
        message: msg
    }
}

export const fetchingDocs = {
    type: FETCHING_DOCS
}