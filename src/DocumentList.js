import React, { Component } from 'react'
import Document from './Document'

export default (props) => {

    return (<div>
        {Object.keys(props.documents).map(key =>
            (<Document {...props.documents[key]} />)
        )}
    </div>)
}

