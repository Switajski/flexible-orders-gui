import React from 'react'
import { Card } from 'elemental'

import Document from './Document'
import withDueFilter, { isDue } from './withDueFilter'
import { SHOW_DUE_ITEMS_ONLY } from './Actions'

export default (props) => {

    return (<div>
        {Object.keys(props.documents).map(key => {
            const doc = props.documents[key];
            if (props.filter == SHOW_DUE_ITEMS_ONLY) {
                if (isDue(doc, props.childrenByParent))
                    return <Card><Document {...doc} /></Card>
                else return <div />
            } else return <Card><Document {...doc} /></Card>
        })}
    </div>)
}

