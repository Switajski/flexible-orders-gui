import React, { PropTypes } from 'react'
import { Table } from 'elemental'
import { itemIsDue } from './isDueSpecification'

import LineItem from './LineItem'
import { SHOW_DUE_ITEMS_ONLY } from './actions'

export default function Document(props) {
    const items = props.document.items
    items.sort((a, b) => a.position - b.position)
    if (props.filter.includes(SHOW_DUE_ITEMS_ONLY))
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
                            due={itemIsDue(item, props.childrenByParent)} />)}
                </tbody>
            </Table>
        </div>
    )
}

Document.propTypes = {
    childrenByParent: PropTypes.object,
    document: PropTypes.object
}