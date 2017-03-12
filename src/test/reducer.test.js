import reducer from '../reducer';
import { showDueItemsOnly } from '../Actions'
import { initialState } from '../initialState'

describe('reducer SHOW_DUE_ITEMS_ONLY', () => {
    it('filter state should be set', () => {
        const reduced = reducer({ filter: undefined }, showDueItemsOnly)
        expect(reduced).toEqual({ filter: showDueItemsOnly.type })
    })
});
