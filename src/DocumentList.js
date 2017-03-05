import React from 'react'
import Document from './Document'

export default (props) => {

    return (<div>
        {Object.keys(props.documents).map(key =>
            (<Document key={key} {...props.documents[key]}/>)
        )}
    </div>)
}

