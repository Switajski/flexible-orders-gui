/**
 * returns an object with 
 *  item id as property with
 *  an array of children items assigned
 */
function indexedItemsOnParent(documents) {
    const childrenByParent = {};
    Object.keys(documents).forEach(key => documents[key].items.forEach(item => {
        if (item.predecessor) {
            if (childrenByParent[item.predecessor] === undefined)
                childrenByParent[item.predecessor] = []
            childrenByParent[item.predecessor].push(item);
        }
    }))
    return childrenByParent;
}

export default function createClosureRetrieveChildrenOfItem(documents){
    const itemsByParent = indexedItemsOnParent(documents)
    return (id) => itemsByParent[id] ? itemsByParent[id] : []
}