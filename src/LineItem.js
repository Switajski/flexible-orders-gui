import React, { PropTypes } from 'react'
import styled from 'styled-components'
import image from './line-256.png'

const SpanStrikedThrough = styled.span`
background-image: url(${image});
background-size:cover`

const TdWithNoLineWrap = styled.td`
white-space: nowrap;
text-align:right`

export default function LineItem(props) {
    let product = {
        name: '',
        productNumber: ''
    }
    if (props.product) {
        product = props.product
    }

    let QtyTd = () => (<TdWithNoLineWrap>{props.quantity}</TdWithNoLineWrap>)
    if (props.showDueItemsOnly) {
        QtyTd = () => (
            <TdWithNoLineWrap>
                {props.dueQty}
                {(props.dueQty !== props.quantity) &&
                    <SpanStrikedThrough> {props.quantity}</SpanStrikedThrough>}
            </TdWithNoLineWrap>)
    }

    const due = props.dueQty > 0;
    return (
        <tr key={props.id}>
            {due ? <td><input type="checkbox" checked={props.selected} onClick={() => props.onLineItemSelect(props.id)} /></td> : <td></td>}
            <td>{props.position}</td>
            <td>{product.productNumber} - {product.name}</td>
            <QtyTd />
        </tr>
    )

}

LineItem.propTypes = {
    dueQty: PropTypes.number,
}