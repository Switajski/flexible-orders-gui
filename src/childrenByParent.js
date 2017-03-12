export default (documents) => {
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