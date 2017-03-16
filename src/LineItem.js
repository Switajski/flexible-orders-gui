import React, { PropTypes } from 'react'

export default function LineItem(props) {
    let product = {
        name: '',
        productNumber: ''
    }
    if (props.product) {
        product = props.product
    }

    let QtyTd = () => (<td>{props.quantity}</td>)
    if (props.showDueItemsOnly) {
        QtyTd = () => (
            <td>
                {(props.dueQty === props.quantity || props.dueQty === 0) ? '' : props.dueQty + '/'}{props.quantity}
            </td>)
    }

    const due = props.dueQty > 0;
    return (
        <tr key={props.id}>
            {due ? <td><input type="checkbox" /></td> : <td></td>}
            <td>{props.position}</td>
            <td>{product.productNumber} - {product.name}</td>
            <QtyTd />
        </tr>
    )

}

LineItem.propTypes = {
    dueQty: PropTypes.number,
}