import { SHOW_DUE_ITEMS_ONLY, DUE_ITEMS_FILTER_CLEAR, DUE_MARK_DONE } from './Actions'
import initialState from './initialState'

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_DUE_ITEMS_ONLY:
            const filter = state.filter;
            const newFilter = [...filter, SHOW_DUE_ITEMS_ONLY]
            return { ...state, filter: newFilter }
        case DUE_ITEMS_FILTER_CLEAR:
            const filter2 = state.filter.filter(i => i === DUE_ITEMS_FILTER_CLEAR)
            return { ...state, filter: filter2 }
        case DUE_MARK_DONE:
            return { ...state, filter: DUE_MARK_DONE }
        case 'REQUEST_PICTURE':
            return state;
        default:
            return state;
    }
}