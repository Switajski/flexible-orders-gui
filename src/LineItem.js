import React from 'react'
import { SHOW_DUE_ITEMS_ONLY } from './actions'

export default function LineItem(props) {
    let product = {
        name: '',
        productNumber: ''
    }
    if (props.product) {
        product = props.product
    }

    return (
        <tr key={props.id}>
            {props.due ? <td><input type="checkbox" /></td> : <td></td>}
            <td>{props.position}</td>
            <td>{product.productNumber} - {product.name}</td>
            <td>{props.quantity}</td>
        </tr>
    )
    
}