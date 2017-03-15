
export const itemIsDue = (item, childrenByParent) => {
    if (childrenByParent[item.id] === undefined) {
        return true;
    } else {
        const summedQtyOfChildren =
            childrenByParent[item.id].reduce((acc, child) => {
                return acc + child.quantity
            }, 0);
        return (summedQtyOfChildren < item.quantity)
    }
}

export const documentIsDue = (document, childrenByParent) => {
    const dues = document.items.map(item => itemIsDue(item, childrenByParent))

    return dues.reduce((acc = false, bool) => {
        if (bool)
            return acc = true;
        return acc;
    })
}
