export const dueQty = (item, childrenOfItemSelector) => {
    if (childrenOfItemSelector(item.id).length === 0) {
        return item.quantity;
    } else {
        const summedQtyOfChildren =
            childrenOfItemSelector(item.id).reduce((acc, child) => {
                return acc + child.quantity
            }, 0);
        return (item.quantity - summedQtyOfChildren)
    }
}

export const itemIsDue = (item, childrenOfItemSelector) => {
    return 0 < dueQty(item, childrenOfItemSelector); 
}

/**
 * TODO: is the parameter of allItems replaceable a state provided by a higher order function?
 * @param {*} allItems 
 * @param {*} childrenOfItemSelector 
 */
export const documentIsDue = (lineItems, childrenOfItemSelector) => {
    const dues = lineItems.map(item => itemIsDue(item, childrenOfItemSelector))

    return dues.reduce((acc = false, bool) => {
        if (bool)
            return acc = true;
        return acc;
    })
}