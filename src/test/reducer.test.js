import reducer from '../reducer';
import { showDueItemsOnly, SHOW_DUE_ITEMS_ONLY } from '../actions'

describe('reducer SHOW_DUE_ITEMS_ONLY', () => {
    it('filter state should be set', () => {
        const reduced = reducer({ filter: [] }, showDueItemsOnly)
        expect(reduced).toEqual({ filter: [SHOW_DUE_ITEMS_ONLY] })
    })
});
