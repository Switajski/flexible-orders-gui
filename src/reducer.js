import {
    CLEARING_DUE_FILTER,
    SHOWING_ERROR,
    SHOWING_DUE_ITEMS_ONLY,
    SET_FILTER, UNSET_FILTER
} from './actions'

const initialState = {
    filter: [SHOWING_DUE_ITEMS_ONLY],
    errors: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOWING_ERROR:
            const newErrors = [...state.errors, action.msg]
            return { ...state, errors: newErrors }
        case SHOWING_DUE_ITEMS_ONLY:
            const filter = state.filter;
            const newFilter = [...filter, SHOWING_DUE_ITEMS_ONLY]
            return { ...state, filter: newFilter }
        case CLEARING_DUE_FILTER:
            const filter2 = state.filter.filter(i => i === CLEARING_DUE_FILTER)
            return { ...state, filter: filter2 }
        case SET_FILTER:
            const newFilters = { ...state.filters, ...action.filter }
            return { ...state, filters: newFilters }
        default:
            return state
    }
}