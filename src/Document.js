import React, { PropTypes } from 'react'
import { Table } from 'elemental'
import { itemIsDue, dueQty } from './isDueSpecification'

import LineItem from './LineItem'
import { SHOWING_DUE_ITEMS_ONLY } from './actions'

export default function Document(props) {
    const items = props.document.items
    const showDueItemsOnly = props.filter.includes(SHOWING_DUE_ITEMS_ONLY)
    
    items.sort((a, b) => a.position - b.position)
    if (showDueItemsOnly)
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
                    {props.document.items.map(item =>
                        <LineItem {...item}
                            key={item.id}
                            dueQty={dueQty(item, props.childrenByParent)}
                            showDueItemsOnly={showDueItemsOnly} />)}
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