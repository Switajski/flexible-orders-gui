import React from 'react'
import { Card } from 'elemental'

import Document from './Document'
import withDueFilter from './withDueFilter'

export default (props) => {

    return (<div>
        {Object.keys(props.documents).map(key => {
            const DocumentWithDueFilter = withDueFilter(Document);
            return (<Card key={key}>
                <DocumentWithDueFilter {...props.documents[key]} />
            </Card>)
        })}
    </div>)
}

