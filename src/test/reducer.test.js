import reducer from '../reducer'
import {
    showDueItemsOnly,
    SHOWING_DUE_ITEMS_ONLY
} from '../actions'

describe('reducer SHOWING_DUE_ITEMS_ONLY', () => {
    it('filter state should be set', () => {
        const reduced = reducer({ filter: [] }, showDueItemsOnly)
        expect(reduced).toEqual({ filter: [SHOWING_DUE_ITEMS_ONLY] })
    }) 
});