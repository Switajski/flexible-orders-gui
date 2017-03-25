import React, { PropTypes } from 'react'
import { Table } from 'elemental'
import { itemIsDue, dueQty } from './isDueSpecification'
import Address from './Address'
import Customer from './Customer'

import LineItem from './LineItem'

export default function Document(props) {
    const items = props.lineItems

    items.sort((a, b) => a.position - b.position)
    if (props.showDueItemsOnly)
        items.filter(item => itemIsDue(item, props.childrenByParent))

    return (
        <div>
            <h4>{props.document.id}</h4>
            {props.document.customer &&
                <Customer {...props.document.customer} />}
            {props.document.invoiceAddress &&
                <Address {...props.document.invoiceAddress} heading={'Invoice address'} />}
            {props.document.shippingAddress &&
                <Address {...props.document.shippingAddress} heading={'Shipping address'} />}
            {props.document.purchaseAgreement && props.document.purchaseAgreement.shippingAddress &&
                <Address {...props.document.purchaseAgreement.shippingAddress} heading={'Shipping address'} />}
            <Table>
                <colgroup>
                    <col width="20" />
                    <col width="20" />
                    <col width="" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <th><label><input type="checkbox" onClick={() => {
                            props.lineItems.forEach((item) => 
                            props.onLineItemSelect(item.id))
                        }} /></label></th>
                        <th>Pos</th>
                        <th>Product</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(function (item) {
                        return <LineItem {...item}
                            key={item.id}
                            selected={props.selectedLineItems.indexOf(item.id) > -1 ? true : false}
                            onLineItemSelect={props.onLineItemSelect}
                            dueQty={dueQty(item, props.childrenByParent)}
                            showDueItemsOnly={props.showDueItemsOnly} />

                    })}
                </tbody>
            </Table>
        </div>
    )
}

Document.propTypes = {
    childrenByParent: PropTypes.func,
    document: PropTypes.object,
    filter: PropTypes.array,
    selected: PropTypes.bool
}