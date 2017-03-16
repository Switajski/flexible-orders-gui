import { documentIsDue, dueQty } from '../isDueSpecification';

import initialState from '../initialState';
import indexOnChildrenByParent from '../childrenByParent'

const childrenByParent = indexOnChildrenByParent(initialState.documents);

it('B11 should not be due', () => {
  const due = documentIsDue(initialState.documents['B11'], childrenByParent)
  expect(due).toBeFalsy()
});

it('B21 should be due', () => {
  const due = documentIsDue(initialState.documents['B21'], childrenByParent)
  expect(due).toBeTruthy()
});

it(`Item of AB11 should be partly due:
 AB11:
 #32 10  -> L11#45 2
         -> L12#49 3
         -----------
       due: 10-2-3=5

 #34 15  -> L11#46 2
         -> L12#48 3
         -----------
      due: 15-2-3=10

 #31 30  -> L14#54 5
         -> L15#57 15
 #30 12  -> L13#52 1
 #33 5   -> L13#51 5`
  , () => {
    const item32 = initialState.documents['AB11'].items.filter(item => item.id === 32)[0]
    const result = dueQty(item32, childrenByParent)
    expect(result).toBe(5)
  });