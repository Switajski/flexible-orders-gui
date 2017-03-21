import React from 'react'
import { Glyph } from 'elemental'

export default function Customer(props) {
    return (<div>
        {props.customerNumber} - {props.companyName} <Glyph icon="mail" /> {props.email}
    </div>)
}