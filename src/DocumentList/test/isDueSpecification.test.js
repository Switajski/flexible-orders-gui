import { documentIsDue, dueQty } from '../isDueSpecification';
import { createNormalizedTestData } from './testDocuments';
import { createClosureRetrieveChildrenOfItem, createClosureRetrieveLineItemsByDocId } from '../selectors'

describe('DocumentList', () => {
  const { documents, lineItems } = createNormalizedTestData()
  const retrieveChildrenByParent = createClosureRetrieveChildrenOfItem(lineItems)
  const retrieveLineItemsByDocId = createClosureRetrieveLineItemsByDocId(lineItems);

  it('B11 should not be due', () => {
    const due = documentIsDue(
      retrieveLineItemsByDocId('B11'),
      retrieveChildrenByParent
    )
    expect(due).toBeFalsy()
  });

  it('B21 should be due', () => {
    const due = documentIsDue(
      retrieveLineItemsByDocId('B21'), 
      retrieveChildrenByParent)
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
      expect(dueQty(lineItems['32'], retrieveChildrenByParent)).toBe(5)
    });
})