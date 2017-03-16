export const dueQty = (item, retrieveChildrenOfItem) => {
    if (retrieveChildrenOfItem(item.id).length === 0) {
        return item.quantity;
    } else {
        const summedQtyOfChildren =
            retrieveChildrenOfItem(item.id).reduce((acc, child) => {
                return acc + child.quantity
            }, 0);
        return (item.quantity - summedQtyOfChildren)
    }
}

export const itemIsDue = (item, retrieveChildrenOfItem) => {
    return 0 < dueQty(item, retrieveChildrenOfItem); 
}

export const documentIsDue = (document, retrieveChildrenOfItem) => {
    const dues = document.items.map(item => itemIsDue(item, retrieveChildrenOfItem))

    return dues.reduce((acc = false, bool) => {
        if (bool)
            return acc = true;
        return acc;
    })
}