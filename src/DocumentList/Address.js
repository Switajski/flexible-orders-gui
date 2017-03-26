import React from 'react'

export default function Address(props) {
    return (<div> 
        {props.name1} {props.name1}<br />
        {props.street} <br />
        {props.postalCode} {props.city}<br />
        {props.country}
    </div>)
}