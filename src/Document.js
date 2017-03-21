import React, { PropTypes } from 'react'
import { Table } from 'elemental'
import { itemIsDue, dueQty } from './isDueSpecification'

import LineItem from './LineItem'

export default function Document(props) {
    const items = props.lineItems
    
    items.sort((a, b) => a.position - b.position)
    if (props.showDueItemsOnly)
        items.filter(item => itemIsDue(item, props.childrenByParent))

    return (
        <div>
            {props.document.id}
            <Table>
                <colgroup>
                    <col width="20" />
                    <col width="20" />
                    <col width="" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <th><label><input type="checkbox" /></label></th>
                        <th>Pos</th>
                        <th>Product</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item =>
                        <LineItem {...item}
                            key={item.id}
                            dueQty={dueQty(item, props.childrenByParent)}
                            showDueItemsOnly={props.showDueItemsOnly} />)}
                </tbody>
            </Table>
        </div>
    )
}

Document.propTypes = {
    childrenByParent: PropTypes.func,
    document: PropTypes.object,
    filter: PropTypes.array
}