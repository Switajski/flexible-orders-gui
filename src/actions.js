export const SHOWING_ERROR = 'SHOWING_ERROR'
export const SET_FILTER = 'SET_FILTER'
export const UNSET_FILTER = 'UNSET_FILTER'

export const showError = msg => {
    return {
        type: SHOWING_ERROR,
        msg: msg
    }
}

export const setFilter = (filter, value) => {
    return {
        type: SET_FILTER,
        filter: filter,
        value: value
    }
}

export const unsetFilter = (filterProp) => {
    return {
        type: UNSET_FILTER,
        filterProp: filterProp
    }
}