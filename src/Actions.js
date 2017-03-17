export const SHOW_DUE_ITEMS_ONLY = 'showDueItemsOnly';
export const DUE_ITEMS_FILTER_CLEAR = 'DUE_ITEMS_FILTER_CLEAR'
export const DUE_MARK_DONE = 'DUE_MARK_DONE'
export const SHOW_ERROR = 'SHOW_ERROR'
export const LOAD_DOCUMENTS = 'LOAD_DOCUMENTS'
export const REQUESTING_DOCS = 'REQUESTING_DOCS'

export const showDueItemsOnly = {
    type: SHOW_DUE_ITEMS_ONLY
}

export const dueItemsFilterClear = {
    type: DUE_ITEMS_FILTER_CLEAR
}

export const dueMarkDone = {
    type: DUE_MARK_DONE
}

export const showError = msg => {
    return {
        type: SHOW_ERROR,
        msg: msg
    }
}

export const loadDocuments = documents => {
    return {
        type: LOAD_DOCUMENTS,
        documents: documents
    }
}

export const requestDocs = {
    type: REQUESTING_DOCS
}