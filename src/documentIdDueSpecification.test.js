import isDue from './documentIsDueSpecification';

import initialState from './initialState';
import indexOnChildrenByParent from './childrenByParent'

const childrenByParent = indexOnChildrenByParent(initialState.documents);

it('B11 should not be due', () => {
  const due = isDue(initialState.documents['B11'], childrenByParent)
  expect(due).toBeFalsy()
});

it('B21 should be due', () => {
  const due = isDue(initialState.documents['B21'], childrenByParent)
  expect(due).toBeTruthy()
});