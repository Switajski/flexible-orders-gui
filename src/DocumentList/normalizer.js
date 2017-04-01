export function normalizeDocument(doc) {
    const normalizedItems = {};
    doc.items.forEach(item => {
        item.docId = doc['id']
        normalizedItems[item.id] = item;
    })
    // eleminate items, as they are stored separatly
    const { ['items']: removedItems, ...remainingDoc } = doc
    let customer = undefined;
    if (doc.customer) {
        const customerId = doc.customer.customerNumber
        customer = { ...doc.customer, id: customerId }
        delete remainingDoc.customer
        remainingDoc.customerId = customerId
    }

    return {
        document: remainingDoc,
        lineItems: normalizedItems,
        customer: customer
    }
}

