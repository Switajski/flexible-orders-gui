import React from 'react'

export default (Component, document, childrenByParent) => {
    let due = false;
    document.items.forEach(item => {
        if (childrenByParent[item.id]) {
            const summedQtyOfChildren =
                childrenByParent[item.id].reduce((acc, child) => acc + child.quantity);
            if (summedQtyOfChildren < item.quantity)
                due = true;
        } else {
            due = true;
        }
    })
    if (due)
        return (props) =>
            (<Component {...props} />)

    return () => (<div></div>);
}