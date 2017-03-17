export const SHOWING_DUE_ITEMS_ONLY = 'SHOWING_DUE_ITEMS_ONLY';
export const CLEARING_DUE_FILTER = 'CLEARING_DUE_FILTER'
export const SHOWING_ERROR = 'SHOWING_ERROR'
export const FETCHED_DOCS = 'FETCHED_DOCS'
export const FETCHING_DOCS = 'FETCHING_DOCS'

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

export const fetchDocs = documents => {
    return {
        type: FETCHED_DOCS,
        documents: documents
    }
}

export const fetchingDocs = {
    type: FETCHING_DOCS
}