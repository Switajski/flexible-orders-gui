
export const itemIsDue = (item, childrenByParent) => {
    return 0 < dueQty(item, childrenByParent); 
}

export const documentIsDue = (document, childrenByParent) => {
    const dues = document.items.map(item => itemIsDue(item, childrenByParent))

    return dues.reduce((acc = false, bool) => {
        if (bool)
            return acc = true;
        return acc;
    })
}

export const dueQty = (item, childrenByParent) => {
    if (childrenByParent[item.id] === undefined) {
        return item.quantity;
    } else {
        const summedQtyOfChildren =
            childrenByParent[item.id].reduce((acc, child) => {
                return acc + child.quantity
            }, 0);
        return (item.quantity - summedQtyOfChildren)
    }
}