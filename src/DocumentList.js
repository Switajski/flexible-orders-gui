import React from 'react'
import { Card } from 'elemental'
import styled from 'styled-components'

import Document from './Document'
import isDue from './documentIsDueSpecification'
import { withOverlay } from './Components/withOverlay'
import { SHOW_DUE_ITEMS_ONLY, DUE_MARK_DONE } from './Actions'

const H2AlignedInMiddle = styled.h2`
    text-align:center;
    vertical-align: middle;`

export default (props) => {

    return (<div>
        {Object.keys(props.documents).map(key => {
            const doc = props.documents[key];
            const due = isDue(doc, props.childrenByParent)
            if (due && (props.filter == SHOW_DUE_ITEMS_ONLY)) {
                return <Card key={key}><Document {...doc} /></Card>
            }

            if (!due && props.filter == DUE_MARK_DONE) {
                const ComponentWithOverlay = withOverlay(Document, <H2AlignedInMiddle>Done</H2AlignedInMiddle>);
                return (props) => (<ComponentWithOverlay {...props} key={key} />)
            }

            return <Card key={key}><Document {...doc} /></Card>
        })}
    </div>)
}

