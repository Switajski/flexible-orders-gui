import React from 'react'
import { Card } from 'elemental'

import Document from './Document'
import withDueFilter from './withDueFilter'

export default (props) => {

    return (<div>
        {Object.keys(props.documents).map(key => {
            const doc = props.documents[key];
            const CardWithDueFilter = withDueFilter(Card, doc, props.childrenByParent);

            return (<CardWithDueFilter key={key}>
                <Document {...doc} />
            </CardWithDueFilter>)
        })}
    </div>)
}

