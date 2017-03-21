export function normalizeDocument(doc) {
    const normalizedItems = {};

    doc.items.forEach(item => {
        item.docId = doc['id']
        normalizedItems[item.id] = item;
    })
    // eleminate items, as they are stored separatly
    const { ['items']: removedItems, ...remainingDoc } = doc

    return {document: remainingDoc, lineItems: normalizedItems}
}

