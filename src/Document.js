import React from 'react'
import LineItem from './LineItem'

export default (props) => {
    
    return (<div>{props.id}
        {props.items.map(item => (
            <LineItem {...item} />
        ))}
    </div>)
} 