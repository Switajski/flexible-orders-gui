import reducer from '../reducer'
import {
    setFilter,
    SET_FILTER
} from '../actions'
import { STATUS, STATUS_DUE_ITEMS_ONLY } from '../Filter'

describe('reducer set filters', () => {
    it('status filter should be set', () => {
        const reduced = reducer({}, setFilter(STATUS, STATUS_DUE_ITEMS_ONLY))
        expect(reduced).toEqual({filters: {'Status': STATUS_DUE_ITEMS_ONLY}})
    })
});