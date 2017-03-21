export function createClosureRetrieveChildrenOfItem(allLineItems) {
    return itemId => 
        Object.keys(allLineItems)
            .map(key => allLineItems[key])
            .filter((item) => item.predecessor === itemId)
    
}

export function createClosureRetrieveLineItemsByDocId(allLineItems) {
    return docId => 
        Object.keys(allLineItems)
            .map(key => allLineItems[key])
            .filter(li => li.docId === docId)
    
}