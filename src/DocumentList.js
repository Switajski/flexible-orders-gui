import React from 'react'
import Document from './Document'
import withDueFilter from './withDueFilter'
import styled from 'styled-components'

const Grid = styled.div`
    display: grid
`

export default (props) => {

    return (<Grid>
        {Object.keys(props.documents).map(key => {
            const DocumentWithDueFilter = withDueFilter(Document);
            return (<DocumentWithDueFilter key={key} {...props.documents[key]}/>)
        })}
    </Grid>)
}

