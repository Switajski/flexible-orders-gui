import React from 'react'

export default (Component) => {
    return (props) => {
        if (props.items.length > 2)
            return (<Component {...props} />)
        return (<Component {...props} deactivated={true} />)
    }
}