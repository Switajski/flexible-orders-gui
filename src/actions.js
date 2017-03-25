export const SHOWING_DUE_ITEMS_ONLY = 'SHOWING_DUE_ITEMS_ONLY';
export const CLEARING_DUE_FILTER = 'CLEARING_DUE_FILTER'
export const SHOWING_ERROR = 'SHOWING_ERROR'
export const FETCH_DOCS_SUCCESS = 'FETCH_DOCS_SUCCESS'
export const FETCH_DOCS_FAILED = 'FETCH_DOCS_FAILED'
export const FETCHING_DOCS = 'FETCHING_DOCS'
export const SELECT_LINE_ITEM = 'SELECT_LINE_ITEM'

export const showDueItemsOnly = {
    type: SHOWING_DUE_ITEMS_ONLY
}

export const clearDueItemsFilter = {
    type: CLEARING_DUE_FILTER
}

export const showError = msg => {
    return {
        type: SHOWING_ERROR,
        msg: msg
    }
}

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