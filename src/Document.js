import React from 'react'
import LineItem from './LineItem'
import styled from 'styled-components'

const Card = styled.div`
    padding: 0.7em;
    border: 1px grey solid;
    max-width: 14em;
    background-color: white;
`

export default (props) => {
    
    return (<Card>{props.id}
        {props.items.map(item => (
            <LineItem {...item} />
        ))}
    </Card>)
} 