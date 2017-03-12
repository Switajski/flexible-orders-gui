export default (document, childrenByParent) => {

    const dues = document.items.map(item => {
        if (childrenByParent[item.id] === undefined) {
            return true;
        } else {
            const summedQtyOfChildren =
                childrenByParent[item.id].reduce((acc, child) => acc + child.quantity);
            return (summedQtyOfChildren < item.quantity)
        }
    })

    return dues.reduce((acc = false, bool) => {
        if (bool)
            return acc = true;
        return acc;
    })
}
