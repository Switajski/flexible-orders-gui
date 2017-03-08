import React from 'react'
import { Table } from 'elemental'

export default (props) => {
    props.items.sort((a, b) => a.position - b.position)

    return (
        <div>
            {props.id}
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
                    {props.items.map(item => {
                        let product = {
                            name: '',
                            productNumber: ''
                        }
                        if (item.product){
                            product = item.product
                        }

                        return (
                            <tr key={item.id}>
                                <td><input type="checkbox" /></td>
                                <td>{item.position}</td>
                                <td>{product.productNumber} - {product.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
} 