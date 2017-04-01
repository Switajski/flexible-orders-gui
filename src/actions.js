export const SHOWING_DUE_ITEMS_ONLY = 'SHOWING_DUE_ITEMS_ONLY';
export const CLEARING_DUE_FILTER = 'CLEARING_DUE_FILTER'
export const SHOWING_ERROR = 'SHOWING_ERROR'
export const SET_FILTER = 'SET_FILTER'
export const UNSET_FILTER = 'UNSET_FILTER'

export const showError = msg => {
    return {
        type: SHOWING_ERROR,
        msg: msg
    }
}

export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter: filter
    }
}

export const unsetFilter = (filterProp) => {
    return {
        type: UNSET_FILTER,
        filterProp: filterProp
    }
}

export const showDueItemsOnly = {
    type: SHOWING_DUE_ITEMS_ONLY
}

export const clearDueItemsFilter = {
    type: CLEARING_DUE_FILTER
}