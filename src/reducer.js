import {
    SHOWING_ERROR,
    SET_FILTER, UNSET_FILTER
} from './actions'

const initialState = {
    errors: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOWING_ERROR:
            const newErrors = [...state.errors, action.msg]
            return { ...state, errors: newErrors }
        case SET_FILTER:
            const splitted = action.filter.split(':')
            const newFilters = { ...state.filters, [action.filter]: action.value }
            return { ...state, filters: newFilters }
        case UNSET_FILTER:
            const filtersWithRemovedItem = { ...state.filters }
            delete filtersWithRemovedItem[action.filterProp]
            return { ...state, filters: filtersWithRemovedItem }
        default:
            return state
    }
}