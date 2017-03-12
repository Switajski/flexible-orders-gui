import React from 'react'
import styled from 'styled-components'
import withOverlay from './Components/withOverlay'

const H2AlignedInMiddle = styled.h2`
    text-align:center;
    vertical-align: middle;`

export default (Component, document, childrenByParent) => {
    
    if (isDue(document, childrenByParent))
        return (props) =>
            (<Component {...props} />)

    const ComponentWithOverlay = withOverlay(Component, <H2AlignedInMiddle>Done</H2AlignedInMiddle>);

    return (props) => (
        <ComponentWithOverlay {...props} />
    )
}

export function isDue(document, childrenByParent){
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
    return due
}
